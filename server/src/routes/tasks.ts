import { FastifyInstance } from "fastify";
import { db, schema } from "../db/index.js";
import { eq, like, desc, sql, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { afterTaskInsert, afterTaskDelete } from "../services/flowAutomations.js";

export default async function taskRoutes(app: FastifyInstance) {
  // LIST
  app.get("/api/tasks", async (req) => {
    const { page = "1", limit = "25", status = "", opportunityId = "", accountId = "" } = req.query as Record<string, string>;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const conditions = [];
    if (status) conditions.push(eq(schema.tasks.status, status));
    if (opportunityId) conditions.push(eq(schema.tasks.opportunityId, opportunityId));
    if (accountId) conditions.push(eq(schema.tasks.accountId, accountId));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, [{ total }]] = await Promise.all([
      db.select().from(schema.tasks).where(where).orderBy(desc(schema.tasks.createdAt)).limit(parseInt(limit)).offset(offset),
      db.select({ total: sql<number>`count(*)` }).from(schema.tasks).where(where),
    ]);

    return { data, total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) };
  });

  // GET
  app.get("/api/tasks/:id", async (req) => {
    const { id } = req.params as { id: string };
    const task = await db.select().from(schema.tasks).where(eq(schema.tasks.id, id)).get();
    if (!task) throw { statusCode: 404, message: "Aufgabe nicht gefunden" };
    return task;
  });

  // CREATE
  app.post("/api/tasks", async (req) => {
    const body = req.body as any;
    const now = new Date().toISOString();
    const task = { id: nanoid(), ...body, createdAt: now, updatedAt: now };
    await db.insert(schema.tasks).values(task);

    // Update task count on opportunity (Flow: Count_Task_On_opp)
    if (task.opportunityId) {
      const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(schema.tasks).where(eq(schema.tasks.opportunityId, task.opportunityId));
      await db.update(schema.opportunities).set({ taskCount: count, updatedAt: now }).where(eq(schema.opportunities.id, task.opportunityId));
    }

    // Fire-and-forget flow automation
    afterTaskInsert(task).catch(err => console.error('Flow error:', err));

    return task;
  });

  // UPDATE
  app.put("/api/tasks/:id", async (req) => {
    const { id } = req.params as { id: string };
    const body = req.body as any;
    await db.update(schema.tasks).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(schema.tasks.id, id));
    return db.select().from(schema.tasks).where(eq(schema.tasks.id, id)).get();
  });

  // DELETE
  app.delete("/api/tasks/:id", async (req) => {
    const { id } = req.params as { id: string };
    const task = await db.select().from(schema.tasks).where(eq(schema.tasks.id, id)).get();
    await db.delete(schema.tasks).where(eq(schema.tasks.id, id));

    // Update task count on opportunity
    if (task?.opportunityId) {
      const now = new Date().toISOString();
      const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(schema.tasks).where(eq(schema.tasks.opportunityId, task.opportunityId));
      await db.update(schema.opportunities).set({ taskCount: count, updatedAt: now }).where(eq(schema.opportunities.id, task.opportunityId));
    }

    // Fire-and-forget flow automation
    if (task) {
      afterTaskDelete(task).catch(err => console.error('Flow error:', err));
    }

    return { success: true };
  });
}
