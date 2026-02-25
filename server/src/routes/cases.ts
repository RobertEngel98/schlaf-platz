import { FastifyInstance } from "fastify";
import { db, schema } from "../db/index.js";
import { eq, like, or, desc, sql, and } from "drizzle-orm";
import { nanoid } from "nanoid";

export default async function caseRoutes(app: FastifyInstance) {
  // LIST
  app.get("/api/cases", async (req) => {
    const { page = "1", limit = "25", search = "", status = "", recordType = "" } = req.query as Record<string, string>;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const conditions = [];
    if (search) conditions.push(like(schema.cases.subject, `%${search}%`));
    if (status) conditions.push(eq(schema.cases.status, status));
    if (recordType) conditions.push(eq(schema.cases.recordType, recordType));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, [{ total }]] = await Promise.all([
      db.select().from(schema.cases).where(where).orderBy(desc(schema.cases.createdAt)).limit(parseInt(limit)).offset(offset),
      db.select({ total: sql<number>`count(*)` }).from(schema.cases).where(where),
    ]);

    return { data, total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) };
  });

  // GET
  app.get("/api/cases/:id", async (req) => {
    const { id } = req.params as { id: string };
    const c = await db.select().from(schema.cases).where(eq(schema.cases.id, id)).get();
    if (!c) throw { statusCode: 404, message: "Fall nicht gefunden" };
    return c;
  });

  // CREATE
  app.post("/api/cases", async (req) => {
    const body = req.body as any;
    const now = new Date().toISOString();
    const c = { id: nanoid(), ...body, createdAt: now, updatedAt: now };
    await db.insert(schema.cases).values(c);
    return c;
  });

  // UPDATE
  app.put("/api/cases/:id", async (req) => {
    const { id } = req.params as { id: string };
    const body = req.body as any;
    await db.update(schema.cases).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(schema.cases.id, id));
    return db.select().from(schema.cases).where(eq(schema.cases.id, id)).get();
  });

  // DELETE
  app.delete("/api/cases/:id", async (req) => {
    const { id } = req.params as { id: string };
    await db.delete(schema.cases).where(eq(schema.cases.id, id));
    return { success: true };
  });
}
