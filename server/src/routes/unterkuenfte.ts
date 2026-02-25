import type { FastifyInstance } from "fastify";
import { eq, like, and, or, desc, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db, schema } from "../db/index.js";
import { validateUnterkunftCreate, validateUnterkunftUpdate } from "../services/validationRules.js";
import { afterUnterkunftInsert, afterUnterkunftUpdate, afterUnterkunftDelete } from "../services/flowAutomations.js";

export default async function unterkuenfteRoutes(app: FastifyInstance) {
  // ==========================================================================
  // GET /api/unterkuenfte - Liste mit Pagination, Suche & Filter
  // ==========================================================================
  app.get("/api/unterkuenfte", async (request) => {
    const {
      page = "1",
      limit = "25",
      search = "",
      status = "",
      ort = "",
      vermieterId = "",
    } = request.query as {
      page?: string;
      limit?: string;
      search?: string;
      status?: string;
      ort?: string;
      vermieterId?: string;
    };

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(schema.unterkuenfte.name, `%${search}%`),
          like(schema.unterkuenfte.ort, `%${search}%`),
          like(schema.unterkuenfte.plz, `%${search}%`),
          like(schema.unterkuenfte.strasse, `%${search}%`)
        )
      );
    }

    if (status) {
      conditions.push(eq(schema.unterkuenfte.status, status));
    }

    if (ort) {
      conditions.push(like(schema.unterkuenfte.ort, `%${ort}%`));
    }

    if (vermieterId) {
      conditions.push(eq(schema.unterkuenfte.vermieterId, vermieterId));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [items, totalResult] = await Promise.all([
      db
        .select()
        .from(schema.unterkuenfte)
        .where(where)
        .orderBy(desc(schema.unterkuenfte.updatedAt))
        .limit(limitNum)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(schema.unterkuenfte)
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
  // GET /api/unterkuenfte/:id - Einzelne Unterkunft mit Vermieter-Relation
  // ==========================================================================
  app.get("/api/unterkuenfte/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const unterkunft = await db.query.unterkuenfte.findFirst({
      where: eq(schema.unterkuenfte.id, id),
      with: {
        vermieter: true,
        freelancer: true,
        buchungen: true,
      },
    });

    if (!unterkunft) {
      return reply.code(404).send({ error: "Unterkunft nicht gefunden" });
    }

    return unterkunft;
  });

  // ==========================================================================
  // POST /api/unterkuenfte - Neue Unterkunft erstellen
  // ==========================================================================
  app.post("/api/unterkuenfte", async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>;
      const now = new Date().toISOString();
      const id = nanoid();

      // Run validation rules before insert
      await validateUnterkunftCreate(body);

      // Validation: Vermieterfeld muss gesetzt sein
      if (!body.vermieterId) {
        return reply.code(400).send({
          error: "Vermieter ist erforderlich. Bitte wählen Sie einen Vermieter-Account aus.",
        });
      }

      // Verify the Vermieter account exists
      const vermieter = await db.query.accounts.findFirst({
        where: eq(schema.accounts.id, body.vermieterId as string),
      });

      if (!vermieter) {
        return reply.code(400).send({ error: "Der angegebene Vermieter-Account existiert nicht" });
      }

      if (!body.name) {
        return reply.code(400).send({ error: "Name ist erforderlich" });
      }

      const newUnterkunft = {
        id,
        name: body.name as string,
        vermieterId: (body.vermieterId as string) || null,
        freelancerId: (body.freelancerId as string) || null,
        strasse: (body.strasse as string) || null,
        hausnummer: (body.hausnummer as string) || null,
        plz: (body.plz as string) || null,
        ort: (body.ort as string) || null,
        bundesland: (body.bundesland as string) || null,
        land: (body.land as string) || "Deutschland",
        latitude: (body.latitude as number) || null,
        longitude: (body.longitude as number) || null,
        exacteUnterkunftsbezeichnung: (body.exacteUnterkunftsbezeichnung as string) || null,
        unterkunftsTyp: (body.unterkunftsTyp as string) || null,
        status: (body.status as string) || "In Bearbeitung",
        aufnahmeStatus: (body.aufnahmeStatus as string) || null,
        aufnahmeProzent: (body.aufnahmeProzent as number) || 0,
        anzahlZimmer: (body.anzahlZimmer as number) || null,
        anzahlBetten: (body.anzahlBetten as number) || null,
        anzahlBadezimmer: (body.anzahlBadezimmer as number) || null,
        maxPersonen: (body.maxPersonen as number) || null,
        wohnflaeche: (body.wohnflaeche as number) || null,
        preisProNacht: (body.preisProNacht as number) || null,
        preisProNachtInklMwst: (body.preisProNachtInklMwst as number) || null,
        reinigungskosten: (body.reinigungskosten as number) || null,
        reinigungskostenInklMwst: (body.reinigungskostenInklMwst as number) || null,
        kaution: (body.kaution as number) || null,
        provisionProzent: (body.provisionProzent as number) || null,
        provisionBetrag: (body.provisionBetrag as number) || null,
        steuersatzUnterkunft: (body.steuersatzUnterkunft as string) || null,
        steuersatzReinigung: (body.steuersatzReinigung as string) || null,
        mindestaufenthalt: (body.mindestaufenthalt as number) || null,
        mwstSatz: (body.mwstSatz as number) ?? 7,
        kueche: (body.kueche as boolean) || false,
        waschmaschine: (body.waschmaschine as boolean) || false,
        trockner: (body.trockner as boolean) || false,
        wlan: (body.wlan as boolean) || false,
        parkplatz: (body.parkplatz as boolean) || false,
        aufzug: (body.aufzug as boolean) || false,
        balkon: (body.balkon as boolean) || false,
        terrasse: (body.terrasse as boolean) || false,
        garten: (body.garten as boolean) || false,
        klimaanlage: (body.klimaanlage as boolean) || false,
        haustiere: (body.haustiere as boolean) || false,
        rauchen: (body.rauchen as boolean) || false,
        bettwaesche: (body.bettwaesche as boolean) || false,
        handtuecher: (body.handtuecher as boolean) || false,
        fernseher: (body.fernseher as boolean) || false,
        geschirrspueler: (body.geschirrspueler as boolean) || false,
        mikrowelle: (body.mikrowelle as boolean) || false,
        backofen: (body.backofen as boolean) || false,
        kuehlschrank: (body.kuehlschrank as boolean) || false,
        kaffeemaschine: (body.kaffeemaschine as boolean) || false,
        vermieterVorname: (body.vermieterVorname as string) || null,
        vermieterNachname: (body.vermieterNachname as string) || null,
        vermieterTelefon: (body.vermieterTelefon as string) || null,
        vermieterEmail: (body.vermieterEmail as string) || null,
        vermieterAnrede: (body.vermieterAnrede as string) || null,
        titleEn: (body.titleEn as string) || null,
        descriptionEn: (body.descriptionEn as string) || null,
        cityEn: (body.cityEn as string) || null,
        googleDriveFolderId: (body.googleDriveFolderId as string) || null,
        googleDriveFolderUrl: (body.googleDriveFolderUrl as string) || null,
        hasGoogleDriveFolder: (body.hasGoogleDriveFolder as boolean) || false,
        anzahlBuchungen: 0,
        beschreibung: (body.beschreibung as string) || null,
        interneNotizen: (body.interneNotizen as string) || null,
        anreiseBeschreibung: (body.anreiseBeschreibung as string) || null,
        hausregeln: (body.hausregeln as string) || null,
        titelbild: (body.titelbild as string) || null,
        bildUrls: (body.bildUrls as string) || null,
        ownerId: (body.ownerId as string) || request.userId || null,
        createdAt: now,
        updatedAt: now,
      };

      await db.insert(schema.unterkuenfte).values(newUnterkunft);

      // Update Vermieter account anzahlUnterkuenfte
      if (newUnterkunft.vermieterId) {
        const countResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.unterkuenfte)
          .where(eq(schema.unterkuenfte.vermieterId, newUnterkunft.vermieterId));
        const newCount = countResult[0]?.count ?? 0;
        await db
          .update(schema.accounts)
          .set({ anzahlUnterkuenfte: newCount, updatedAt: now })
          .where(eq(schema.accounts.id, newUnterkunft.vermieterId));
      }

      // Fire-and-forget flow automation
      afterUnterkunftInsert(newUnterkunft).catch(err => console.error('Flow error:', err));

      return reply.code(201).send(newUnterkunft);
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Erstellen der Unterkunft" });
    }
  });

  // ==========================================================================
  // PUT /api/unterkuenfte/:id - Unterkunft aktualisieren
  // ==========================================================================
  app.put("/api/unterkuenfte/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const body = request.body as Record<string, unknown>;

      const existing = await db.query.unterkuenfte.findFirst({
        where: eq(schema.unterkuenfte.id, id),
      });

      if (!existing) {
        return reply.code(404).send({ error: "Unterkunft nicht gefunden" });
      }

      // Run validation rules before update
      await validateUnterkunftUpdate(body, existing);

      const updateData = {
        ...body,
        updatedAt: new Date().toISOString(),
      };

      // Remove fields that shouldn't be updated
      delete updateData.id;
      delete updateData.createdAt;

      await db.update(schema.unterkuenfte).set(updateData).where(eq(schema.unterkuenfte.id, id));

      const updated = await db.query.unterkuenfte.findFirst({
        where: eq(schema.unterkuenfte.id, id),
        with: { vermieter: true },
      });

      // Fire-and-forget flow automation
      if (updated) {
        afterUnterkunftUpdate(updated, existing).catch(err => console.error('Flow error:', err));
      }

      return updated;
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Aktualisieren der Unterkunft" });
    }
  });

  // ==========================================================================
  // DELETE /api/unterkuenfte/:id - Unterkunft löschen
  // ==========================================================================
  app.delete("/api/unterkuenfte/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const existing = await db.query.unterkuenfte.findFirst({
        where: eq(schema.unterkuenfte.id, id),
      });

      if (!existing) {
        return reply.code(404).send({ error: "Unterkunft nicht gefunden" });
      }

      await db.delete(schema.unterkuenfte).where(eq(schema.unterkuenfte.id, id));

      // Update Vermieter account count
      if (existing.vermieterId) {
        const now = new Date().toISOString();
        const countResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.unterkuenfte)
          .where(eq(schema.unterkuenfte.vermieterId, existing.vermieterId));
        const newCount = countResult[0]?.count ?? 0;
        await db
          .update(schema.accounts)
          .set({ anzahlUnterkuenfte: newCount, updatedAt: now })
          .where(eq(schema.accounts.id, existing.vermieterId));
      }

      // Fire-and-forget flow automation
      afterUnterkunftDelete(existing).catch(err => console.error('Flow error:', err));

      return { success: true, message: "Unterkunft gelöscht" };
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Fehler beim Löschen der Unterkunft" });
    }
  });
}
