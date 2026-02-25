import type { FastifyInstance } from "fastify";
import { eq, like, and, or, desc, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db, schema } from "../db/index.js";
import { validateBuchungCreate, validateBuchungUpdate } from "../services/validationRules.js";
import { afterBuchungInsert, afterBuchungUpdate, afterBuchungDelete } from "../services/flowAutomations.js";

export default async function buchungenRoutes(app: FastifyInstance) {
  // ==========================================================================
  // GET /api/buchungen - Liste mit Pagination, Suche & Filter
  // ==========================================================================
  app.get("/api/buchungen", async (request) => {
    const {
      page = "1",
      limit = "25",
      search = "",
      recordType = "",
      buchungsphase = "",
      unterkunftId = "",
      accountId = "",
    } = request.query as {
      page?: string;
      limit?: string;
      search?: string;
      recordType?: string;
      buchungsphase?: string;
      unterkunftId?: string;
      accountId?: string;
    };

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(schema.buchungen.buchungsNummer, `%${search}%`),
          like(schema.buchungen.gastName, `%${search}%`),
          like(schema.buchungen.gastEmail, `%${search}%`)
        )
      );
    }

    if (recordType) {
      conditions.push(eq(schema.buchungen.recordType, recordType));
    }

    if (buchungsphase) {
      conditions.push(eq(schema.buchungen.buchungsphase, buchungsphase));
    }

    if (unterkunftId) {
      conditions.push(eq(schema.buchungen.unterkunftId, unterkunftId));
    }

    if (accountId) {
      conditions.push(eq(schema.buchungen.accountId, accountId));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [items, totalResult] = await Promise.all([
      db
        .select()
        .from(schema.buchungen)
        .where(where)
        .orderBy(desc(schema.buchungen.updatedAt))
        .limit(limitNum)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.buchungen)
        .where(where),
    ]);

    const total = totalResult[0]?.count ?? 0;

    return {
      data: items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  });

  // ==========================================================================
  // GET /api/buchungen/:id - Einzelne Buchung mit Relationen
  // ==========================================================================
  app.get("/api/buchungen/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const buchung = await db.query.buchungen.findFirst({
      where: eq(schema.buchungen.id, id),
      with: {
        account: true,
        contact: true,
        opportunity: true,
        unterkunft: true,
        files: true,
      },
    });

    if (!buchung) {
      return reply.code(404).send({ error: "Buchung nicht gefunden" });
    }

    return buchung;
  });

  // ==========================================================================
  // POST /api/buchungen - Neue Buchung erstellen
  // ==========================================================================
  app.post("/api/buchungen", async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>;
      const now = new Date().toISOString();
      const id = nanoid();

      // Run validation rules before insert
      await validateBuchungCreate(body);

      // Validation: Folgebuchung requires Ursprungsbuchung
      if (body.recordType === "Folgebuchung" && !body.ursprungsbuchungId) {
        return reply.code(400).send({
          error: "Für eine Folgebuchung muss eine Ursprungsbuchung angegeben werden.",
        });
      }

      // Validate Ursprungsbuchung exists if provided
      if (body.ursprungsbuchungId) {
        const ursprung = await db.query.buchungen.findFirst({
          where: eq(schema.buchungen.id, body.ursprungsbuchungId as string),
        });
        if (!ursprung) {
          return reply.code(400).send({ error: "Die angegebene Ursprungsbuchung existiert nicht" });
        }
      }

      // Probewoche logic: auto-set istProbewoche if buchungsphase indicates it
      const istProbewoche =
        body.istProbewoche === true ||
        body.buchungsphase === "Probewoche";

      // Generate Buchungsnummer
      const buchungsNummer =
        (body.buchungsNummer as string) || `BU-${Date.now().toString(36).toUpperCase()}`;

      // Calculate anzahlNaechte if checkIn and checkOut are provided
      let anzahlNaechte = body.anzahlNaechte as number | null;
      if (!anzahlNaechte && body.checkIn && body.checkOut) {
        const checkInDate = new Date(body.checkIn as string);
        const checkOutDate = new Date(body.checkOut as string);
        const diffMs = checkOutDate.getTime() - checkInDate.getTime();
        anzahlNaechte = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
      }

      const newBuchung = {
        id,
        buchungsNummer,
        recordType: (body.recordType as string) || "Buchung",
        accountId: (body.accountId as string) || null,
        contactId: (body.contactId as string) || null,
        opportunityId: (body.opportunityId as string) || null,
        unterkunftId: (body.unterkunftId as string) || null,
        buchungsphase: (body.buchungsphase as string) || "Neu",
        checkIn: (body.checkIn as string) || null,
        checkOut: (body.checkOut as string) || null,
        anzahlNaechte,
        anzahlGaeste: (body.anzahlGaeste as number) || null,
        gastName: (body.gastName as string) || null,
        gastTelefon: (body.gastTelefon as string) || null,
        gastEmail: (body.gastEmail as string) || null,
        preisProNacht: (body.preisProNacht as number) || null,
        gesamtPreis: (body.gesamtPreis as number) || null,
        unterkunftskostenNetto: (body.unterkunftskostenNetto as number) || null,
        unterkunftskostenBrutto: (body.unterkunftskostenBrutto as number) || null,
        unterkunftskostenGesamtInkl19Netto: (body.unterkunftskostenGesamtInkl19Netto as number) || null,
        reinigungskosten: (body.reinigungskosten as number) || null,
        reinigungskostenInklMwst: (body.reinigungskostenInklMwst as number) || null,
        kaution: (body.kaution as number) || null,
        kautionStatus: (body.kautionStatus as string) || null,
        provision: (body.provision as number) || null,
        provisionProzent: (body.provisionProzent as number) || null,
        mwstSatz: (body.mwstSatz as number) || null,
        mwstBetrag: (body.mwstBetrag as number) || null,
        steuersatzReinigung: (body.steuersatzReinigung as string) || null,
        rechnungsNummer: (body.rechnungsNummer as string) || null,
        rechnungsDatum: (body.rechnungsDatum as string) || null,
        rechnungsBetrag: (body.rechnungsBetrag as number) || null,
        fastbillInvoiceId: (body.fastbillInvoiceId as string) || null,
        datevExported: (body.datevExported as boolean) || false,
        vermieterAbrechnungBetrag: (body.vermieterAbrechnungBetrag as number) || null,
        vermieterAbrechnungDatum: (body.vermieterAbrechnungDatum as string) || null,
        vermieterAbrechnungStatus: (body.vermieterAbrechnungStatus as string) || null,
        stornierungsGrund: (body.stornierungsGrund as string) || null,
        stornierungsDatum: (body.stornierungsDatum as string) || null,
        schadenBeschreibung: (body.schadenBeschreibung as string) || null,
        schadenBetrag: (body.schadenBetrag as number) || null,
        schadenStatus: (body.schadenStatus as string) || null,
        gutschriftGrund: (body.gutschriftGrund as string) || null,
        gutschriftBetrag: (body.gutschriftBetrag as number) || null,
        istProbewoche,
        probewochtUeberspringen: (body.probewochtUeberspringen as boolean) || false,
        ursprungsbuchungId: (body.ursprungsbuchungId as string) || null,
        lossReason: (body.lossReason as string) || null,
        baustellenleiterCapo: (body.baustellenleiterCapo as string) || null,
        kontaktUnterkunft: (body.kontaktUnterkunft as string) || null,
        reviewLinkSent: (body.reviewLinkSent as boolean) || false,
        reviewRating: (body.reviewRating as number) || null,
        fileIds: (body.fileIds as string) || null,
        ownerId: (body.ownerId as string) || request.userId || null,
        beschreibung: (body.beschreibung as string) || null,
        interneNotizen: (body.interneNotizen as string) || null,
        createdAt: now,
        updatedAt: now,
      };

      await db.insert(schema.buchungen).values(newBuchung);

      // Update related counters
      if (newBuchung.unterkunftId) {
        const countResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.buchungen)
          .where(eq(schema.buchungen.unterkunftId, newBuchung.unterkunftId));
        const newCount = countResult[0]?.count ?? 0;
        await db
          .update(schema.unterkuenfte)
          .set({ anzahlBuchungen: newCount, updatedAt: now })
          .where(eq(schema.unterkuenfte.id, newBuchung.unterkunftId));
      }

      if (newBuchung.accountId) {
        const countResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.buchungen)
          .where(eq(schema.buchungen.accountId, newBuchung.accountId));
        const newCount = countResult[0]?.count ?? 0;
        await db
          .update(schema.accounts)
          .set({ anzahlBuchungen: newCount, updatedAt: now })
          .where(eq(schema.accounts.id, newBuchung.accountId));
      }

      // Fire-and-forget flow automation
      afterBuchungInsert(newBuchung).catch(err => console.error('Flow error:', err));

      return reply.code(201).send(newBuchung);
    } catch (err: any) {
      request.log.error(err);
      if (err.name === "ValidationError" || err.statusCode === 400) {
        return reply.code(400).send({ error: err.message });
      }
      return reply.code(500).send({ error: "Fehler beim Erstellen der Buchung" });
    }
  });

  // ==========================================================================
  // PUT /api/buchungen/:id - Buchung aktualisieren
  // ==========================================================================
  app.put("/api/buchungen/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const body = request.body as Record<string, unknown>;

      const existing = await db.query.buchungen.findFirst({
        where: eq(schema.buchungen.id, id),
      });

      if (!existing) {
        return reply.code(404).send({ error: "Buchung nicht gefunden" });
      }

      // Run validation rules before update
      await validateBuchungUpdate(body, existing);

      // Validation: Loss Reason required when setting to Verloren
      if (body.buchungsphase === "Verloren" && !body.lossReason && !existing.lossReason) {
        return reply.code(400).send({
          error: "Ein Verlustgrund (Loss Reason) ist erforderlich, wenn die Buchung auf 'Verloren' gesetzt wird.",
        });
      }

      // Recalculate anzahlNaechte if dates changed
      if (body.checkIn && body.checkOut) {
        const checkInDate = new Date(body.checkIn as string);
        const checkOutDate = new Date(body.checkOut as string);
        const diffMs = checkOutDate.getTime() - checkInDate.getTime();
        body.anzahlNaechte = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
      }

      const updateData: any = {
        ...body,
        updatedAt: new Date().toISOString(),
      };

      // Remove fields that shouldn't be updated
      delete updateData.id;
      delete updateData.createdAt;

      await db.update(schema.buchungen).set(updateData).where(eq(schema.buchungen.id, id));

      const updated = await db.query.buchungen.findFirst({
        where: eq(schema.buchungen.id, id),
        with: {
          account: true,
          contact: true,
          unterkunft: true,
        },
      });

      // Fire-and-forget flow automation
      if (updated) {
        afterBuchungUpdate(updated, existing).catch(err => console.error('Flow error:', err));
      }

      return updated;
    } catch (err: any) {
      request.log.error(err);
      if (err.name === "ValidationError" || err.statusCode === 400) {
        return reply.code(400).send({ error: err.message });
      }
      return reply.code(500).send({ error: "Fehler beim Aktualisieren der Buchung" });
    }
  });

  // ==========================================================================
  // DELETE /api/buchungen/:id - Buchung löschen
  // ==========================================================================
  app.delete("/api/buchungen/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const existing = await db.query.buchungen.findFirst({
        where: eq(schema.buchungen.id, id),
      });

      if (!existing) {
        return reply.code(404).send({ error: "Buchung nicht gefunden" });
      }

      // Delete related files first
      await db.delete(schema.bookingFiles).where(eq(schema.bookingFiles.buchungId, id));

      // Delete the booking
      await db.delete(schema.buchungen).where(eq(schema.buchungen.id, id));

      // Update related counters
      const now = new Date().toISOString();
      if (existing.unterkunftId) {
        const countResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.buchungen)
          .where(eq(schema.buchungen.unterkunftId, existing.unterkunftId));
        const newCount = countResult[0]?.count ?? 0;
        await db
          .update(schema.unterkuenfte)
          .set({ anzahlBuchungen: newCount, updatedAt: now })
          .where(eq(schema.unterkuenfte.id, existing.unterkunftId));
      }

      if (existing.accountId) {
        const countResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.buchungen)
          .where(eq(schema.buchungen.accountId, existing.accountId));
        const newCount = countResult[0]?.count ?? 0;
        await db
          .update(schema.accounts)
          .set({ anzahlBuchungen: newCount, updatedAt: now })
          .where(eq(schema.accounts.id, existing.accountId));
      }

      // Fire-and-forget flow automation
      afterBuchungDelete(existing).catch(err => console.error('Flow error:', err));

      return { success: true, message: "Buchung gelöscht" };
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Löschen der Buchung" });
    }
  });
}
