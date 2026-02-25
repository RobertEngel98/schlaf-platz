import type { FastifyInstance } from "fastify";
import { eq, like, and, or, desc, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db, schema } from "../db/index.js";
import { validateLeadCreate, validateLeadUpdate } from "../services/validationRules.js";
import { afterLeadInsert, afterLeadUpdate } from "../services/flowAutomations.js";

// Simple spam detection patterns
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|lottery|prize|winner|crypto.?free)\b/i,
  /(.)\1{5,}/, // Repeated characters
  /(http[s]?:\/\/){2,}/, // Multiple URLs
];

function isSpam(text: string): boolean {
  return SPAM_PATTERNS.some((pattern) => pattern.test(text));
}

export default async function leadsRoutes(app: FastifyInstance) {
  // ==========================================================================
  // GET /api/leads - Liste mit Pagination & Suche
  // ==========================================================================
  app.get("/api/leads", async (request) => {
    const {
      page = "1",
      limit = "25",
      search = "",
      status = "",
      source = "",
    } = request.query as {
      page?: string;
      limit?: string;
      search?: string;
      status?: string;
      source?: string;
    };

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(schema.leads.firstName, `%${search}%`),
          like(schema.leads.lastName, `%${search}%`),
          like(schema.leads.company, `%${search}%`),
          like(schema.leads.email, `%${search}%`),
          like(schema.leads.phone, `%${search}%`)
        )
      );
    }

    if (status) {
      conditions.push(eq(schema.leads.status, status));
    }

    if (source) {
      conditions.push(eq(schema.leads.source, source));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [items, totalResult] = await Promise.all([
      db
        .select()
        .from(schema.leads)
        .where(where)
        .orderBy(desc(schema.leads.updatedAt))
        .limit(limitNum)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.leads)
        .where(where),
    ]);

    const total = totalResult[0]?.count ?? 0;

    return {
      data: items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  });

  // ==========================================================================
  // GET /api/leads/:id - Einzelner Lead
  // ==========================================================================
  app.get("/api/leads/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const lead = await db.query.leads.findFirst({
      where: eq(schema.leads.id, id),
    });

    if (!lead) {
      return reply.code(404).send({ error: "Lead nicht gefunden" });
    }

    return lead;
  });

  // ==========================================================================
  // POST /api/leads - Neuen Lead erstellen
  // ==========================================================================
  app.post("/api/leads", async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>;
      const now = new Date().toISOString();
      const id = nanoid();

      // Run validation rules before insert
      await validateLeadCreate(body);

      if (!body.lastName) {
        return reply.code(400).send({ error: "Nachname ist erforderlich" });
      }

      // Spam check on relevant fields
      const spamCheckFields = [
        body.firstName,
        body.lastName,
        body.company,
        body.description,
        body.email,
      ]
        .filter(Boolean)
        .join(" ");

      if (isSpam(spamCheckFields)) {
        return reply.code(400).send({
          error: "Der Lead wurde als potenzieller Spam erkannt. Bitte überprüfen Sie die Eingaben.",
        });
      }

      const newLead = {
        id,
        recordType: (body.recordType as string) || "Lead",
        salutation: (body.salutation as string) || null,
        firstName: (body.firstName as string) || null,
        lastName: body.lastName as string,
        company: (body.company as string) || null,
        email: (body.email as string) || null,
        phone: (body.phone as string) || null,
        mobilePhone: (body.mobilePhone as string) || null,
        status: (body.status as string) || "Neu",
        source: (body.source as string) || null,
        street: (body.street as string) || null,
        city: (body.city as string) || null,
        postalCode: (body.postalCode as string) || null,
        state: (body.state as string) || null,
        country: (body.country as string) || null,
        keyAccountManagerId: (body.keyAccountManagerId as string) || null,
        lossReason: (body.lossReason as string) || null,
        campaignId: (body.campaignId as string) || null,
        nurtureStage: (body.nurtureStage as string) || null,
        ownerId: (body.ownerId as string) || request.userId || null,
        description: (body.description as string) || null,
        convertedAccountId: null,
        convertedContactId: null,
        convertedOpportunityId: null,
        convertedDate: null,
        createdAt: now,
        updatedAt: now,
      };

      await db.insert(schema.leads).values(newLead);

      // Fire-and-forget flow automation
      afterLeadInsert(newLead).catch(err => console.error('Flow error:', err));

      return reply.code(201).send(newLead);
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Erstellen des Leads" });
    }
  });

  // ==========================================================================
  // PUT /api/leads/:id - Lead aktualisieren
  // ==========================================================================
  app.put("/api/leads/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const body = request.body as Record<string, unknown>;

      const existing = await db.query.leads.findFirst({
        where: eq(schema.leads.id, id),
      });

      if (!existing) {
        return reply.code(404).send({ error: "Lead nicht gefunden" });
      }

      // Run validation rules before update
      await validateLeadUpdate(body, existing);

      // Validation: Loss Reason required when setting to Verloren
      if (body.status === "Verloren" && !body.lossReason && !existing.lossReason) {
        return reply.code(400).send({
          error: "Ein Verlustgrund (Loss Reason) ist erforderlich, wenn der Lead auf 'Verloren' gesetzt wird.",
        });
      }

      const updateData = {
        ...body,
        updatedAt: new Date().toISOString(),
      };

      // Remove fields that shouldn't be updated
      delete updateData.id;
      delete updateData.createdAt;

      await db.update(schema.leads).set(updateData).where(eq(schema.leads.id, id));

      const updated = await db.query.leads.findFirst({
        where: eq(schema.leads.id, id),
      });

      // Fire-and-forget flow automation
      if (updated) {
        afterLeadUpdate(updated, existing).catch(err => console.error('Flow error:', err));
      }

      return updated;
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Aktualisieren des Leads" });
    }
  });

  // ==========================================================================
  // DELETE /api/leads/:id - Lead löschen
  // ==========================================================================
  app.delete("/api/leads/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const existing = await db.query.leads.findFirst({
        where: eq(schema.leads.id, id),
      });

      if (!existing) {
        return reply.code(404).send({ error: "Lead nicht gefunden" });
      }

      await db.delete(schema.leads).where(eq(schema.leads.id, id));

      return { success: true, message: "Lead gelöscht" };
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Löschen des Leads" });
    }
  });
}
