import { FastifyInstance } from "fastify";
import { db, schema } from "../db/index.js";
import { eq, like, desc, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export default async function freelancerRoutes(app: FastifyInstance) {
  // LIST
  app.get("/api/freelancers", async (req) => {
    const { search = "" } = req.query as Record<string, string>;
    const where = search ? like(schema.freelancers.name, `%${search}%`) : undefined;
    const data = await db.select().from(schema.freelancers).where(where).orderBy(desc(schema.freelancers.createdAt));
    return data;
  });

  // GET
  app.get("/api/freelancers/:id", async (req) => {
    const { id } = req.params as { id: string };
    const f = await db.select().from(schema.freelancers).where(eq(schema.freelancers.id, id)).get();
    if (!f) throw { statusCode: 404, message: "Freelancer nicht gefunden" };
    return f;
  });

  // CREATE
  app.post("/api/freelancers", async (req) => {
    const body = req.body as any;
    const now = new Date().toISOString();
    const f = { id: nanoid(), ...body, createdAt: now, updatedAt: now };
    await db.insert(schema.freelancers).values(f);
    return f;
  });

  // UPDATE
  app.put("/api/freelancers/:id", async (req) => {
    const { id } = req.params as { id: string };
    const body = req.body as any;
    await db.update(schema.freelancers).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(schema.freelancers.id, id));
    return db.select().from(schema.freelancers).where(eq(schema.freelancers.id, id)).get();
  });

  // DELETE
  app.delete("/api/freelancers/:id", async (req) => {
    const { id } = req.params as { id: string };
    await db.delete(schema.freelancers).where(eq(schema.freelancers.id, id));
    return { success: true };
  });
}
