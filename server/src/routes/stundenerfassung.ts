import { FastifyInstance } from "fastify";
import { db, schema } from "../db/index.js";
import { eq, desc, asc, like, sql, and, or } from "drizzle-orm";
import { nanoid } from "nanoid";
import { validateStundenerfassung } from "../services/validationRules.js";

export default async function stundenerfassungRoutes(app: FastifyInstance) {
  // SUMMARY - Stunden pro User (must be before /:id route)
  app.get("/api/stundenerfassung/summary", async (req) => {
    const result = await db.select({
      userId: schema.stundenerfassung.userId,
      userName: schema.stundenerfassung.userName,
      totalStunden: sql<number>`sum(stunden)`,
      eintraege: sql<number>`count(*)`,
    }).from(schema.stundenerfassung).groupBy(schema.stundenerfassung.userId);
    return result;
  });

  // LIST
  app.get("/api/stundenerfassung", async (req) => {
    const { page = "1", limit = "25", search = "", sort = "datum", order = "desc", userId = "", fuerWen = "" } = req.query as Record<string, string>;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const conditions = [];
    if (userId) conditions.push(eq(schema.stundenerfassung.userId, userId));
    if (fuerWen) conditions.push(eq(schema.stundenerfassung.fuerWen, fuerWen));
    if (search) {
      conditions.push(
        or(
          like(schema.stundenerfassung.userName, `%${search}%`),
          like(schema.stundenerfassung.beschreibung, `%${search}%`),
          like(schema.stundenerfassung.fuerWen, `%${search}%`),
          like(schema.stundenerfassung.kategorie, `%${search}%`)
        )
      );
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    // Dynamic sort
    const sortColumns: Record<string, any> = {
      datum: schema.stundenerfassung.datum,
      userName: schema.stundenerfassung.userName,
      fuerWen: schema.stundenerfassung.fuerWen,
      stunden: schema.stundenerfassung.stunden,
      kategorie: schema.stundenerfassung.kategorie,
      createdAt: schema.stundenerfassung.createdAt,
    };
    const sortCol = sortColumns[sort] || schema.stundenerfassung.datum;
    const orderBy = order === "asc" ? asc(sortCol) : desc(sortCol);

    const [data, [{ total }]] = await Promise.all([
      db.select().from(schema.stundenerfassung).where(where).orderBy(orderBy).limit(parseInt(limit)).offset(offset),
      db.select({ total: sql<number>`count(*)` }).from(schema.stundenerfassung).where(where),
    ]);

    return { data, total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) };
  });

  // GET
  app.get("/api/stundenerfassung/:id", async (req) => {
    const { id } = req.params as { id: string };
    const entry = await db.select().from(schema.stundenerfassung).where(eq(schema.stundenerfassung.id, id)).get();
    if (!entry) throw { statusCode: 404, message: "Eintrag nicht gefunden" };
    return entry;
  });

  // CREATE - mit Validation Rule: User, Stunden, Datum, Für wen sind Pflicht
  app.post("/api/stundenerfassung", async (req) => {
    const body = req.body as any;
    // Run validation rules before insert
    await validateStundenerfassung(body);
    if (!body.userId || !body.stunden || !body.datum || !body.fuerWen) {
      throw { statusCode: 400, message: "Bitte füllen Sie alle Pflichtfelder aus: User, Stunden, Datum und Für wen hast du gearbeitet." };
    }
    const now = new Date().toISOString();
    const entry = { id: nanoid(), ...body, createdAt: now, updatedAt: now };
    await db.insert(schema.stundenerfassung).values(entry);
    return entry;
  });

  // UPDATE
  app.put("/api/stundenerfassung/:id", async (req) => {
    const { id } = req.params as { id: string };
    const body = req.body as any;
    // Run validation rules before update
    await validateStundenerfassung(body);
    if (body.userId === "" || body.stunden === null || body.datum === "" || body.fuerWen === "") {
      throw { statusCode: 400, message: "Bitte füllen Sie alle Pflichtfelder aus: User, Stunden, Datum und Für wen hast du gearbeitet." };
    }
    await db.update(schema.stundenerfassung).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(schema.stundenerfassung.id, id));
    return db.select().from(schema.stundenerfassung).where(eq(schema.stundenerfassung.id, id)).get();
  });

  // DELETE
  app.delete("/api/stundenerfassung/:id", async (req) => {
    const { id } = req.params as { id: string };
    await db.delete(schema.stundenerfassung).where(eq(schema.stundenerfassung.id, id));
    return { success: true };
  });

}
