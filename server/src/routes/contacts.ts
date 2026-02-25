import { FastifyInstance } from "fastify";
import { db, schema } from "../db/index.js";
import { eq, like, or, desc, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export default async function contactRoutes(app: FastifyInstance) {
  // LIST
  app.get("/api/contacts", async (req, reply) => {
    const { page = "1", limit = "25", search = "", accountId = "" } = req.query as Record<string, string>;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const conditions = [];
    if (search) {
      conditions.push(
        or(
          like(schema.contacts.lastName, `%${search}%`),
          like(schema.contacts.firstName, `%${search}%`),
          like(schema.contacts.email, `%${search}%`)
        )
      );
    }
    if (accountId) conditions.push(eq(schema.contacts.accountId, accountId));

    const where = conditions.length > 0 ? conditions.reduce((a, b) => sql`${a} AND ${b}`) : undefined;

    const [data, [{ total }]] = await Promise.all([
      db.select().from(schema.contacts).where(where).orderBy(desc(schema.contacts.createdAt)).limit(parseInt(limit)).offset(offset),
      db.select({ total: sql<number>`count(*)` }).from(schema.contacts).where(where),
    ]);

    return { data, total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) };
  });

  // GET
  app.get("/api/contacts/:id", async (req) => {
    const { id } = req.params as { id: string };
    const contact = await db.select().from(schema.contacts).where(eq(schema.contacts.id, id)).get();
    if (!contact) throw { statusCode: 404, message: "Kontakt nicht gefunden" };
    return contact;
  });

  // CREATE
  app.post("/api/contacts", async (req) => {
    const body = req.body as any;
    const now = new Date().toISOString();
    const contact = { id: nanoid(), ...body, createdAt: now, updatedAt: now };
    await db.insert(schema.contacts).values(contact);
    return contact;
  });

  // UPDATE
  app.put("/api/contacts/:id", async (req) => {
    const { id } = req.params as { id: string };
    const body = req.body as any;
    await db.update(schema.contacts).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(schema.contacts.id, id));
    return db.select().from(schema.contacts).where(eq(schema.contacts.id, id)).get();
  });

  // DELETE
  app.delete("/api/contacts/:id", async (req) => {
    const { id } = req.params as { id: string };
    await db.delete(schema.contacts).where(eq(schema.contacts.id, id));
    return { success: true };
  });
}
