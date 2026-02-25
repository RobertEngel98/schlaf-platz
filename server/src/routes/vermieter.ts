import { FastifyInstance } from "fastify";
import { db, schema } from "../db/index.js";
import { eq, like, desc, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export default async function vermieterRoutes(app: FastifyInstance) {
  // LIST
  app.get("/api/vermieter", async (req) => {
    const { search = "", status = "" } = req.query as Record<string, string>;

    const conditions = [];
    if (search) conditions.push(like(schema.vermieterUebersicht.name, `%${search}%`));
    if (status) conditions.push(eq(schema.vermieterUebersicht.status, status));

    const where = conditions.length > 0 ? conditions.reduce((a, b) => sql`${a} AND ${b}`) : undefined;

    const data = await db.select().from(schema.vermieterUebersicht).where(where).orderBy(desc(schema.vermieterUebersicht.createdAt));
    return data;
  });

  // GET
  app.get("/api/vermieter/:id", async (req) => {
    const { id } = req.params as { id: string };
    const v = await db.select().from(schema.vermieterUebersicht).where(eq(schema.vermieterUebersicht.id, id)).get();
    if (!v) throw { statusCode: 404, message: "Vermieter nicht gefunden" };
    return v;
  });

  // CREATE
  app.post("/api/vermieter", async (req) => {
    const body = req.body as any;
    const now = new Date().toISOString();
    const v = { id: nanoid(), ...body, createdAt: now, updatedAt: now };
    await db.insert(schema.vermieterUebersicht).values(v);
    return v;
  });

  // UPDATE
  app.put("/api/vermieter/:id", async (req) => {
    const { id } = req.params as { id: string };
    const body = req.body as any;
    await db.update(schema.vermieterUebersicht).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(schema.vermieterUebersicht.id, id));
    return db.select().from(schema.vermieterUebersicht).where(eq(schema.vermieterUebersicht.id, id)).get();
  });

  // DELETE
  app.delete("/api/vermieter/:id", async (req) => {
    const { id } = req.params as { id: string };
    await db.delete(schema.vermieterUebersicht).where(eq(schema.vermieterUebersicht.id, id));
    return { success: true };
  });
}
