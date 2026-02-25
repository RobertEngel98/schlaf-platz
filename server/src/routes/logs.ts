import { FastifyInstance } from "fastify";
import { db, schema } from "../db/index.js";
import { eq, desc, sql, and } from "drizzle-orm";
import { nanoid } from "nanoid";

export default async function logRoutes(app: FastifyInstance) {
  // LIST
  app.get("/api/logs", async (req) => {
    const { page = "1", limit = "50", type = "", severity = "" } = req.query as Record<string, string>;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const conditions = [];
    if (type) conditions.push(eq(schema.logs.type, type));
    if (severity) conditions.push(eq(schema.logs.severity, severity));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, [{ total }]] = await Promise.all([
      db.select().from(schema.logs).where(where).orderBy(desc(schema.logs.createdAt)).limit(parseInt(limit)).offset(offset),
      db.select({ total: sql<number>`count(*)` }).from(schema.logs).where(where),
    ]);

    return { data, total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) };
  });

  // CREATE
  app.post("/api/logs", async (req) => {
    const body = req.body as any;
    const log = { id: nanoid(), ...body, createdAt: new Date().toISOString() };
    await db.insert(schema.logs).values(log);
    return log;
  });

  // DELETE old logs (Batch - like LogBatchController in SF)
  app.delete("/api/logs/cleanup", async (req) => {
    const { olderThanDays = "90" } = req.query as Record<string, string>;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - parseInt(olderThanDays));
    const result = await db.delete(schema.logs).where(sql`created_at < ${cutoff.toISOString()}`);
    return { success: true, message: `Logs älter als ${olderThanDays} Tage gelöscht` };
  });
}
