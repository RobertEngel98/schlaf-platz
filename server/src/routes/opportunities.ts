import type { FastifyInstance } from "fastify";
import { eq, like, and, or, desc, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db, schema } from "../db/index.js";
import { validateOpportunityStageChange } from "../services/validationRules.js";
import { afterOpportunityUpdate } from "../services/flowAutomations.js";

// Stages that represent "closed lost"
const CLOSED_LOST_STAGES = ["Closed Lost", "Verloren"];

export default async function opportunitiesRoutes(app: FastifyInstance) {
  // ==========================================================================
  // GET /api/opportunities - Liste mit Pagination & Suche
  // ==========================================================================
  app.get("/api/opportunities", async (request) => {
    const {
      page = "1",
      limit = "25",
      search = "",
      stage = "",
      accountId = "",
    } = request.query as {
      page?: string;
      limit?: string;
      search?: string;
      stage?: string;
      accountId?: string;
    };

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(schema.opportunities.name, `%${search}%`),
          like(schema.opportunities.description, `%${search}%`)
        )
      );
    }

    if (stage) {
      conditions.push(eq(schema.opportunities.stage, stage));
    }

    if (accountId) {
      conditions.push(eq(schema.opportunities.accountId, accountId));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [items, totalResult] = await Promise.all([
      db
        .select()
        .from(schema.opportunities)
        .where(where)
        .orderBy(desc(schema.opportunities.updatedAt))
        .limit(limitNum)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.opportunities)
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
  // GET /api/opportunities/:id - Einzelne Opportunity
  // ==========================================================================
  app.get("/api/opportunities/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const opportunity = await db.query.opportunities.findFirst({
      where: eq(schema.opportunities.id, id),
      with: {
        account: true,
        contact: true,
        buchungen: true,
        angebote: true,
        searchTimers: true,
      },
    });

    if (!opportunity) {
      return reply.code(404).send({ error: "Opportunity nicht gefunden" });
    }

    return opportunity;
  });

  // ==========================================================================
  // POST /api/opportunities - Neue Opportunity erstellen
  // ==========================================================================
  app.post("/api/opportunities", async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>;
      const now = new Date().toISOString();
      const id = nanoid();

      if (!body.name) {
        return reply.code(400).send({ error: "Name ist erforderlich" });
      }

      const newOpportunity = {
        id,
        recordType: (body.recordType as string) || "Kunde_zu_Vermieter",
        name: body.name as string,
        accountId: (body.accountId as string) || null,
        contactId: (body.contactId as string) || null,
        stage: (body.stage as string) || "Qualifizierung",
        amount: (body.amount as number) || null,
        closeDate: (body.closeDate as string) || null,
        probability: (body.probability as number) || null,
        lossReason: (body.lossReason as string) || null,
        searchTimeMinutes: (body.searchTimeMinutes as number) || 0,
        searchStartDate: (body.searchStartDate as string) || null,
        searchEndDate: (body.searchEndDate as string) || null,
        taskCount: 0,
        keyAccountManagerId: (body.keyAccountManagerId as string) || null,
        ownerId: (body.ownerId as string) || request.userId || null,
        description: (body.description as string) || null,
        createdAt: now,
        updatedAt: now,
      };

      await db.insert(schema.opportunities).values(newOpportunity);

      return reply.code(201).send(newOpportunity);
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Erstellen der Opportunity" });
    }
  });

  // ==========================================================================
  // PUT /api/opportunities/:id - Opportunity aktualisieren
  // ==========================================================================
  app.put("/api/opportunities/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const body = request.body as Record<string, unknown>;

      const existing = await db.query.opportunities.findFirst({
        where: eq(schema.opportunities.id, id),
      });

      if (!existing) {
        return reply.code(404).send({ error: "Opportunity nicht gefunden" });
      }

      // Run validation rules before update
      await validateOpportunityStageChange(body, existing);

      // Validation: check_Stage - when changing stage, a task should be created
      // We auto-create a task when stage changes to track the progress
      const stageChanged = body.stage && body.stage !== existing.stage;
      if (stageChanged) {
        const taskId = nanoid();
        const now = new Date().toISOString();
        await db.insert(schema.tasks).values({
          id: taskId,
          subject: `Stage-Wechsel: ${existing.stage} -> ${body.stage as string}`,
          description: `Opportunity "${existing.name}" wurde von "${existing.stage}" nach "${body.stage as string}" verschoben.`,
          status: "Offen",
          priority: "Normal",
          opportunityId: id,
          accountId: existing.accountId,
          ownerId: request.userId || null,
          createdAt: now,
          updatedAt: now,
        });

        // Update task count
        const taskCountResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.tasks)
          .where(eq(schema.tasks.opportunityId, id));
        body.taskCount = taskCountResult[0]?.count ?? 0;
      }

      // Validation: Loss Reason required when closing as lost
      if (
        body.stage &&
        CLOSED_LOST_STAGES.includes(body.stage as string) &&
        !body.lossReason &&
        !existing.lossReason
      ) {
        return reply.code(400).send({
          error: "Ein Verlustgrund (Loss Reason) ist erforderlich, wenn die Opportunity als 'Verloren' geschlossen wird.",
        });
      }

      const updateData: any = {
        ...body,
        updatedAt: new Date().toISOString(),
      };

      // Remove fields that shouldn't be updated
      delete updateData.id;
      delete updateData.createdAt;

      await db
        .update(schema.opportunities)
        .set(updateData)
        .where(eq(schema.opportunities.id, id));

      const updated = await db.query.opportunities.findFirst({
        where: eq(schema.opportunities.id, id),
        with: {
          account: true,
          contact: true,
        },
      });

      // Fire-and-forget flow automation
      if (updated) {
        afterOpportunityUpdate(updated, existing).catch(err => console.error('Flow error:', err));
      }

      return updated;
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Aktualisieren der Opportunity" });
    }
  });

  // ==========================================================================
  // DELETE /api/opportunities/:id - Opportunity löschen
  // ==========================================================================
  app.delete("/api/opportunities/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const existing = await db.query.opportunities.findFirst({
        where: eq(schema.opportunities.id, id),
      });

      if (!existing) {
        return reply.code(404).send({ error: "Opportunity nicht gefunden" });
      }

      // Delete related search timers first
      await db.delete(schema.searchTimers).where(eq(schema.searchTimers.opportunityId, id));

      await db.delete(schema.opportunities).where(eq(schema.opportunities.id, id));

      return { success: true, message: "Opportunity gelöscht" };
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Löschen der Opportunity" });
    }
  });
}
