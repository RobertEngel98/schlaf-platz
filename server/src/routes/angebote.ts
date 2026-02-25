import { FastifyInstance } from "fastify";
import { db, schema } from "../db/index.js";
import { eq, like, or, desc, sql, and } from "drizzle-orm";
import { nanoid } from "nanoid";

export default async function angeboteRoutes(app: FastifyInstance) {
  // LIST
  app.get("/api/angebote", async (req) => {
    const { page = "1", limit = "25", search = "", status = "" } = req.query as Record<string, string>;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const conditions = [];
    if (search) conditions.push(like(schema.angebote.name, `%${search}%`));
    if (status) conditions.push(eq(schema.angebote.status, status));

    const where = conditions.length > 0 ? conditions.reduce((a, b) => sql`${a} AND ${b}`) : undefined;

    const [data, [{ total }]] = await Promise.all([
      db.select().from(schema.angebote).where(where).orderBy(desc(schema.angebote.createdAt)).limit(parseInt(limit)).offset(offset),
      db.select({ total: sql<number>`count(*)` }).from(schema.angebote).where(where),
    ]);

    return { data, total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) };
  });

  // GET
  app.get("/api/angebote/:id", async (req) => {
    const { id } = req.params as { id: string };
    const angebot = await db.select().from(schema.angebote).where(eq(schema.angebote.id, id)).get();
    if (!angebot) throw { statusCode: 404, message: "Angebot nicht gefunden" };
    return angebot;
  });

  // CREATE
  app.post("/api/angebote", async (req) => {
    const body = req.body as any;
    const now = new Date().toISOString();
    const id = nanoid();
    // Auto-generate Angebotsnummer
    const [{ total }] = await db.select({ total: sql<number>`count(*)` }).from(schema.angebote);
    const angebotNummer = `ANG-${String(total + 1).padStart(5, "0")}`;
    const angebot = { id, angebotNummer, ...body, createdAt: now, updatedAt: now };
    await db.insert(schema.angebote).values(angebot);
    return angebot;
  });

  // UPDATE
  app.put("/api/angebote/:id", async (req) => {
    const { id } = req.params as { id: string };
    const body = req.body as any;
    await db.update(schema.angebote).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(schema.angebote.id, id));
    return db.select().from(schema.angebote).where(eq(schema.angebote.id, id)).get();
  });

  // DELETE
  app.delete("/api/angebote/:id", async (req) => {
    const { id } = req.params as { id: string };
    await db.delete(schema.activities).where(
      and(eq(schema.activities.entityType, "angebot"), eq(schema.activities.entityId, id))
    );
    await db.delete(schema.angebote).where(eq(schema.angebote.id, id));
    return { success: true };
  });
}
