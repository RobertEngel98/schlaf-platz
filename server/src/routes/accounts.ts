import type { FastifyInstance } from "fastify";
import { eq, like, and, or, desc, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db, schema } from "../db/index.js";
import { afterAccountInsert } from "../services/flowAutomations.js";

export default async function accountsRoutes(app: FastifyInstance) {
  // ==========================================================================
  // GET /api/accounts - Liste mit Pagination & Suche
  // ==========================================================================
  app.get("/api/accounts", async (request) => {
    const { page = "1", limit = "25", search = "", recordType = "" } = request.query as {
      page?: string;
      limit?: string;
      search?: string;
      recordType?: string;
    };

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(schema.accounts.name, `%${search}%`),
          like(schema.accounts.email, `%${search}%`),
          like(schema.accounts.phone, `%${search}%`)
        )
      );
    }

    if (recordType) {
      conditions.push(eq(schema.accounts.recordType, recordType));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [items, totalResult] = await Promise.all([
      db
        .select()
        .from(schema.accounts)
        .where(where)
        .orderBy(desc(schema.accounts.updatedAt))
        .limit(limitNum)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.accounts)
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
  // GET /api/accounts/:id - Einzelner Account
  // ==========================================================================
  app.get("/api/accounts/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const account = await db.query.accounts.findFirst({
      where: eq(schema.accounts.id, id),
      with: {
        contacts: true,
        opportunities: true,
        buchungen: true,
        unterkuenfte: true,
      },
    });

    if (!account) {
      return reply.code(404).send({ error: "Account nicht gefunden" });
    }

    return account;
  });

  // ==========================================================================
  // POST /api/accounts - Neuen Account erstellen
  // ==========================================================================
  app.post("/api/accounts", async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>;
      const now = new Date().toISOString();
      const id = nanoid();

      const newAccount = {
        id,
        recordType: (body.recordType as string) || "Account_Standart",
        name: body.name as string,
        phone: (body.phone as string) || null,
        email: (body.email as string) || null,
        website: (body.website as string) || null,
        industry: (body.industry as string) || null,
        billingStreet: (body.billingStreet as string) || null,
        billingCity: (body.billingCity as string) || null,
        billingPostalCode: (body.billingPostalCode as string) || null,
        billingState: (body.billingState as string) || null,
        billingCountry: (body.billingCountry as string) || null,
        shippingStreet: (body.shippingStreet as string) || null,
        shippingCity: (body.shippingCity as string) || null,
        shippingPostalCode: (body.shippingPostalCode as string) || null,
        shippingState: (body.shippingState as string) || null,
        shippingCountry: (body.shippingCountry as string) || null,
        keyAccountManagerId: (body.keyAccountManagerId as string) || null,
        anzahlBuchungen: (body.anzahlBuchungen as number) || 0,
        anzahlUnterkuenfte: (body.anzahlUnterkuenfte as number) || 0,
        vermieterNummer: (body.vermieterNummer as string) || null,
        vermieterStatus: (body.vermieterStatus as string) || null,
        steuerNummer: (body.steuerNummer as string) || null,
        iban: (body.iban as string) || null,
        bic: (body.bic as string) || null,
        bankName: (body.bankName as string) || null,
        ownerId: (body.ownerId as string) || request.userId || null,
        description: (body.description as string) || null,
        createdAt: now,
        updatedAt: now,
      };

      if (!newAccount.name) {
        return reply.code(400).send({ error: "Name ist erforderlich" });
      }

      await db.insert(schema.accounts).values(newAccount);

      // Fire-and-forget flow automation
      afterAccountInsert(newAccount).catch(err => console.error('Flow error:', err));

      return reply.code(201).send(newAccount);
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Erstellen des Accounts" });
    }
  });

  // ==========================================================================
  // PUT /api/accounts/:id - Account aktualisieren
  // ==========================================================================
  app.put("/api/accounts/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const body = request.body as Record<string, unknown>;

      const existing = await db.query.accounts.findFirst({
        where: eq(schema.accounts.id, id),
      });

      if (!existing) {
        return reply.code(404).send({ error: "Account nicht gefunden" });
      }

      const updateData: any = {
        ...body,
        updatedAt: new Date().toISOString(),
      };

      // Remove fields that shouldn't be updated
      delete updateData.id;
      delete updateData.createdAt;

      await db.update(schema.accounts).set(updateData).where(eq(schema.accounts.id, id));

      const updated = await db.query.accounts.findFirst({
        where: eq(schema.accounts.id, id),
      });

      return updated;
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Aktualisieren des Accounts" });
    }
  });

  // ==========================================================================
  // DELETE /api/accounts/:id - Account löschen
  // ==========================================================================
  app.delete("/api/accounts/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const existing = await db.query.accounts.findFirst({
        where: eq(schema.accounts.id, id),
      });

      if (!existing) {
        return reply.code(404).send({ error: "Account nicht gefunden" });
      }

      await db.delete(schema.accounts).where(eq(schema.accounts.id, id));

      return { success: true, message: "Account gelöscht" };
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Löschen des Accounts" });
    }
  });
}
