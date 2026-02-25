import type { FastifyInstance } from "fastify";
import { like, or } from "drizzle-orm";
import { db, schema } from "../db/index.js";

interface SearchResult {
  type: string;
  id: string;
  title: string;
  subtitle: string;
  url: string;
}

const MAX_PER_ENTITY = 5;
const MAX_TOTAL = 25;

export default async function globalSearchRoutes(app: FastifyInstance) {
  app.get("/api/search", async (request, reply) => {
    const { q = "" } = request.query as { q?: string };

    if (q.length < 2) {
      return reply.code(400).send({ error: "Suchbegriff muss mindestens 2 Zeichen lang sein" });
    }

    const term = `%${q}%`;
    const results: SearchResult[] = [];

    // ---- Accounts ----
    const accountRows = await db
      .select({
        id: schema.accounts.id,
        name: schema.accounts.name,
        email: schema.accounts.email,
        phone: schema.accounts.phone,
        recordType: schema.accounts.recordType,
      })
      .from(schema.accounts)
      .where(
        or(
          like(schema.accounts.name, term),
          like(schema.accounts.email, term),
          like(schema.accounts.phone, term)
        )
      )
      .limit(MAX_PER_ENTITY);

    for (const row of accountRows) {
      results.push({
        type: "account",
        id: row.id,
        title: row.name,
        subtitle: row.email || row.phone || row.recordType,
        url: `/accounts/${row.id}`,
      });
    }

    // ---- Contacts ----
    const contactRows = await db
      .select({
        id: schema.contacts.id,
        firstName: schema.contacts.firstName,
        lastName: schema.contacts.lastName,
        email: schema.contacts.email,
        phone: schema.contacts.phone,
      })
      .from(schema.contacts)
      .where(
        or(
          like(schema.contacts.firstName, term),
          like(schema.contacts.lastName, term),
          like(schema.contacts.email, term),
          like(schema.contacts.phone, term)
        )
      )
      .limit(MAX_PER_ENTITY);

    for (const row of contactRows) {
      results.push({
        type: "contact",
        id: row.id,
        title: [row.firstName, row.lastName].filter(Boolean).join(" "),
        subtitle: row.email || row.phone || "",
        url: `/kontakte/${row.id}`,
      });
    }

    // ---- Leads ----
    const leadRows = await db
      .select({
        id: schema.leads.id,
        firstName: schema.leads.firstName,
        lastName: schema.leads.lastName,
        company: schema.leads.company,
        email: schema.leads.email,
        status: schema.leads.status,
      })
      .from(schema.leads)
      .where(
        or(
          like(schema.leads.firstName, term),
          like(schema.leads.lastName, term),
          like(schema.leads.company, term),
          like(schema.leads.email, term)
        )
      )
      .limit(MAX_PER_ENTITY);

    for (const row of leadRows) {
      results.push({
        type: "lead",
        id: row.id,
        title: [row.firstName, row.lastName].filter(Boolean).join(" "),
        subtitle: row.company || row.email || row.status,
        url: `/leads/${row.id}`,
      });
    }

    // ---- Opportunities ----
    const opportunityRows = await db
      .select({
        id: schema.opportunities.id,
        name: schema.opportunities.name,
        stage: schema.opportunities.stage,
        amount: schema.opportunities.amount,
      })
      .from(schema.opportunities)
      .where(like(schema.opportunities.name, term))
      .limit(MAX_PER_ENTITY);

    for (const row of opportunityRows) {
      results.push({
        type: "opportunity",
        id: row.id,
        title: row.name,
        subtitle: row.stage + (row.amount != null ? ` - ${row.amount} \u20AC` : ""),
        url: `/opportunities/${row.id}`,
      });
    }

    // ---- Buchungen ----
    const buchungRows = await db
      .select({
        id: schema.buchungen.id,
        buchungsNummer: schema.buchungen.buchungsNummer,
        gastName: schema.buchungen.gastName,
        buchungsphase: schema.buchungen.buchungsphase,
      })
      .from(schema.buchungen)
      .where(
        or(
          like(schema.buchungen.buchungsNummer, term),
          like(schema.buchungen.gastName, term)
        )
      )
      .limit(MAX_PER_ENTITY);

    for (const row of buchungRows) {
      results.push({
        type: "buchung",
        id: row.id,
        title: row.buchungsNummer || row.gastName || "Buchung",
        subtitle: row.gastName || row.buchungsphase || "",
        url: `/buchungen/${row.id}`,
      });
    }

    // ---- Unterkuenfte ----
    const unterkunftRows = await db
      .select({
        id: schema.unterkuenfte.id,
        name: schema.unterkuenfte.name,
        ort: schema.unterkuenfte.ort,
        status: schema.unterkuenfte.status,
      })
      .from(schema.unterkuenfte)
      .where(
        or(
          like(schema.unterkuenfte.name, term),
          like(schema.unterkuenfte.ort, term)
        )
      )
      .limit(MAX_PER_ENTITY);

    for (const row of unterkunftRows) {
      results.push({
        type: "unterkunft",
        id: row.id,
        title: row.name,
        subtitle: row.ort || row.status || "",
        url: `/unterkuenfte/${row.id}`,
      });
    }

    // ---- Angebote ----
    const angebotRows = await db
      .select({
        id: schema.angebote.id,
        name: schema.angebote.name,
        angebotNummer: schema.angebote.angebotNummer,
        status: schema.angebote.status,
      })
      .from(schema.angebote)
      .where(
        or(
          like(schema.angebote.name, term),
          like(schema.angebote.angebotNummer, term)
        )
      )
      .limit(MAX_PER_ENTITY);

    for (const row of angebotRows) {
      results.push({
        type: "angebot",
        id: row.id,
        title: row.name,
        subtitle: row.angebotNummer || row.status || "",
        url: `/angebote/${row.id}`,
      });
    }

    // ---- Cases ----
    const caseRows = await db
      .select({
        id: schema.cases.id,
        subject: schema.cases.subject,
        status: schema.cases.status,
      })
      .from(schema.cases)
      .where(like(schema.cases.subject, term))
      .limit(MAX_PER_ENTITY);

    for (const row of caseRows) {
      results.push({
        type: "case",
        id: row.id,
        title: row.subject,
        subtitle: row.status || "",
        url: `/cases/${row.id}`,
      });
    }

    // ---- Tasks ----
    const taskRows = await db
      .select({
        id: schema.tasks.id,
        subject: schema.tasks.subject,
        status: schema.tasks.status,
      })
      .from(schema.tasks)
      .where(like(schema.tasks.subject, term))
      .limit(MAX_PER_ENTITY);

    for (const row of taskRows) {
      results.push({
        type: "task",
        id: row.id,
        title: row.subject,
        subtitle: row.status || "",
        url: `/tasks/${row.id}`,
      });
    }

    // Limit total results
    return { results: results.slice(0, MAX_TOTAL) };
  });
}
