import type { FastifyInstance } from "fastify";
import { eq, and, not, sql, desc, or } from "drizzle-orm";
import { db, schema } from "../db/index.js";

export default async function dashboardRoutes(app: FastifyInstance) {
  // ==========================================================================
  // GET /api/dashboard/stats - Übersicht & Zusammenfassungen
  // ==========================================================================
  app.get("/api/dashboard/stats", async () => {
    // Run all count queries in parallel
    const [
      accountsTotal,
      contactsTotal,
      leadsTotal,
      opportunitiesTotal,
      unterkuenfteTotal,
      buchungenTotal,
      openLeads,
      activeBuchungen,
      revenueResult,
      recentAccounts,
      recentLeads,
      recentBuchungen,
      buchungenByPhase,
      leadsByStatus,
      opportunitiesByStage,
    ] = await Promise.all([
      // Total counts
      db.select({ count: sql<number>`count(*)` }).from(schema.accounts),
      db.select({ count: sql<number>`count(*)` }).from(schema.contacts),
      db.select({ count: sql<number>`count(*)` }).from(schema.leads),
      db.select({ count: sql<number>`count(*)` }).from(schema.opportunities),
      db.select({ count: sql<number>`count(*)` }).from(schema.unterkuenfte),
      db.select({ count: sql<number>`count(*)` }).from(schema.buchungen),

      // Open leads (not Verloren, not Konvertiert)
      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.leads)
        .where(
          and(
            not(eq(schema.leads.status, "Verloren")),
            not(eq(schema.leads.status, "Konvertiert"))
          )
        ),

      // Active buchungen (not Storniert, not Verloren, not Abgeschlossen)
      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.buchungen)
        .where(
          and(
            not(eq(schema.buchungen.buchungsphase, "Storniert")),
            not(eq(schema.buchungen.buchungsphase, "Verloren")),
            not(eq(schema.buchungen.buchungsphase, "Abgeschlossen"))
          )
        ),

      // Revenue totals from buchungen
      db
        .select({
          totalRevenue: sql<number>`COALESCE(SUM(gesamt_preis), 0)`,
          totalProvision: sql<number>`COALESCE(SUM(provision), 0)`,
        })
        .from(schema.buchungen)
        .where(
          and(
            not(eq(schema.buchungen.buchungsphase, "Storniert")),
            not(eq(schema.buchungen.buchungsphase, "Verloren"))
          )
        ),

      // Recent accounts (last 5)
      db
        .select({
          id: schema.accounts.id,
          name: schema.accounts.name,
          recordType: schema.accounts.recordType,
          createdAt: schema.accounts.createdAt,
        })
        .from(schema.accounts)
        .orderBy(desc(schema.accounts.createdAt))
        .limit(5),

      // Recent leads (last 5)
      db
        .select({
          id: schema.leads.id,
          firstName: schema.leads.firstName,
          lastName: schema.leads.lastName,
          company: schema.leads.company,
          status: schema.leads.status,
          createdAt: schema.leads.createdAt,
        })
        .from(schema.leads)
        .orderBy(desc(schema.leads.createdAt))
        .limit(5),

      // Recent buchungen (last 5)
      db
        .select({
          id: schema.buchungen.id,
          buchungsNummer: schema.buchungen.buchungsNummer,
          buchungsphase: schema.buchungen.buchungsphase,
          gastName: schema.buchungen.gastName,
          checkIn: schema.buchungen.checkIn,
          checkOut: schema.buchungen.checkOut,
          gesamtPreis: schema.buchungen.gesamtPreis,
          createdAt: schema.buchungen.createdAt,
        })
        .from(schema.buchungen)
        .orderBy(desc(schema.buchungen.createdAt))
        .limit(5),

      // Buchungen grouped by phase
      db
        .select({
          buchungsphase: schema.buchungen.buchungsphase,
          count: sql<number>`count(*)`,
        })
        .from(schema.buchungen)
        .groupBy(schema.buchungen.buchungsphase),

      // Leads grouped by status
      db
        .select({
          status: schema.leads.status,
          count: sql<number>`count(*)`,
        })
        .from(schema.leads)
        .groupBy(schema.leads.status),

      // Opportunities grouped by stage
      db
        .select({
          stage: schema.opportunities.stage,
          count: sql<number>`count(*)`,
        })
        .from(schema.opportunities)
        .groupBy(schema.opportunities.stage),
    ]);

    return {
      counts: {
        accounts: accountsTotal[0]?.count ?? 0,
        contacts: contactsTotal[0]?.count ?? 0,
        leads: leadsTotal[0]?.count ?? 0,
        opportunities: opportunitiesTotal[0]?.count ?? 0,
        unterkuenfte: unterkuenfteTotal[0]?.count ?? 0,
        buchungen: buchungenTotal[0]?.count ?? 0,
        openLeads: openLeads[0]?.count ?? 0,
        activeBuchungen: activeBuchungen[0]?.count ?? 0,
      },
      revenue: {
        totalRevenue: revenueResult[0]?.totalRevenue ?? 0,
        totalProvision: revenueResult[0]?.totalProvision ?? 0,
      },
      recentActivity: {
        accounts: recentAccounts,
        leads: recentLeads,
        buchungen: recentBuchungen,
      },
      distributions: {
        buchungenByPhase,
        leadsByStatus,
        opportunitiesByStage,
      },
    };
  });
}
