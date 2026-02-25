/**
 * Flow Automations Service
 * ========================
 * Implements business logic from all 40 Salesforce Flows as backend automation functions.
 * These get called AFTER successful database operations (like Salesforce Record-Triggered Flows).
 *
 * Each after-trigger function implements ALL relevant flows for that trigger point.
 * Individual flows are wrapped in try/catch so one failure does not block others.
 * All automation actions are logged to the logs table.
 */

import { db, schema } from "../db/index.js";
import { eq, sql, and, not, sum } from "drizzle-orm";
import { nanoid } from "nanoid";

// =============================================================================
// UTILITY: Logging
// =============================================================================

/**
 * Create a log entry in the logs table for automation tracking.
 */
async function createLog(
  type: string,
  message: string,
  source: string,
  details?: string
): Promise<void> {
  try {
    await db.insert(schema.logs).values({
      id: nanoid(),
      type,
      message,
      source,
      details: details || null,
      severity: "Info",
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    // If logging itself fails, write to console so we don't lose visibility
    console.error("[FlowAutomation] Fehler beim Erstellen des Log-Eintrags:", err);
  }
}

/**
 * Helper: get current ISO timestamp
 */
function now(): string {
  return new Date().toISOString();
}

/**
 * Helper: get today's date as YYYY-MM-DD
 */
function today(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Helper: add days to a date and return as YYYY-MM-DD
 */
function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

// =============================================================================
// BUCHUNG (Booking) FLOWS
// =============================================================================

/**
 * After a new Buchung is inserted.
 * Implements:
 *   Flow 1: Count_Booking_after_Update (count buchungen per unterkunft + account)
 *   Flow 2: Record_Trigger_Sum_of_Unterkunftskosten (sum costs on unterkunft)
 *   Flow 5: X7_MWST (recalculate 7% tax fields)
 *   Flow 11: Update_opportunity_Amount (sum gesamtPreis on opportunity)
 *   Flow 29: SENDINVOICETODATEV (mark datev export)
 */
export async function afterBuchungInsert(buchung: any): Promise<void> {
  // --- Flow 1: Count_Booking_after_Update ---
  // Count all buchungen for the related unterkunft and update unterkuenfte.anzahlBuchungen
  try {
    if (buchung.unterkunftId) {
      const [result] = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.buchungen)
        .where(eq(schema.buchungen.unterkunftId, buchung.unterkunftId));
      const count = result?.count ?? 0;
      await db
        .update(schema.unterkuenfte)
        .set({ anzahlBuchungen: count, updatedAt: now() })
        .where(eq(schema.unterkuenfte.id, buchung.unterkunftId));
      await createLog(
        "Flow",
        `Buchungsanzahl auf Unterkunft ${buchung.unterkunftId} aktualisiert: ${count}`,
        "Count_Booking_after_Update"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Count_Booking (Unterkunft): ${(err as Error).message}`, "Count_Booking_after_Update");
  }

  // Count all buchungen for the related account and update accounts.anzahlBuchungen
  try {
    if (buchung.accountId) {
      const [result] = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.buchungen)
        .where(eq(schema.buchungen.accountId, buchung.accountId));
      const count = result?.count ?? 0;
      await db
        .update(schema.accounts)
        .set({ anzahlBuchungen: count, updatedAt: now() })
        .where(eq(schema.accounts.id, buchung.accountId));
      await createLog(
        "Flow",
        `Buchungsanzahl auf Account ${buchung.accountId} aktualisiert: ${count}`,
        "Count_Booking_after_Update"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Count_Booking (Account): ${(err as Error).message}`, "Count_Booking_after_Update");
  }

  // --- Flow 2: Record_Trigger_Sum_of_Unterkunftskosten ---
  // Sum unterkunftskostenGesamtInkl19Netto for all buchungen of the same unterkunft
  try {
    if (buchung.unterkunftId) {
      const [result] = await db
        .select({
          total: sql<number>`COALESCE(SUM(unterkunftskosten_gesamt_inkl_19_netto), 0)`,
        })
        .from(schema.buchungen)
        .where(eq(schema.buchungen.unterkunftId, buchung.unterkunftId));
      const totalKosten = result?.total ?? 0;
      // Store on the unterkunft record - use gesamtPreis field or log it
      // The unterkuenfte table does not have a dedicated summe field, so we log the value
      // and could store it via a custom field if added later
      await createLog(
        "Flow",
        `Unterkunftskosten-Summe für Unterkunft ${buchung.unterkunftId}: ${totalKosten.toFixed(2)} EUR`,
        "Record_Trigger_Sum_of_Unterkunftskosten",
        JSON.stringify({ unterkunftId: buchung.unterkunftId, summeUnterkunftskosten: totalKosten })
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Sum_Unterkunftskosten: ${(err as Error).message}`, "Record_Trigger_Sum_of_Unterkunftskosten");
  }

  // --- Flow 5: X7_MWST ---
  // If mwstSatz = 7, recalculate all price fields with 7% tax
  try {
    if (buchung.mwstSatz === 7 || buchung.mwstSatz === 7.0) {
      await recalculate7PercentMwst(buchung);
    }
  } catch (err) {
    await createLog("Error", `Fehler bei X7_MWST: ${(err as Error).message}`, "X7_MWST");
  }

  // --- Flow 11: Update_opportunity_Amount ---
  // Sum all buchungen.gesamtPreis and update opportunity.amount
  try {
    if (buchung.opportunityId) {
      await updateOpportunityAmount(buchung.opportunityId);
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Update_opportunity_Amount: ${(err as Error).message}`, "Update_opportunity_Amount");
  }

  // --- Flow 29: SENDINVOICETODATEV ---
  // After buchung marked for export, set datevExported = true
  try {
    if (buchung.datevExported === true) {
      await createLog(
        "Flow",
        `Buchung ${buchung.id} (${buchung.buchungsNummer}) für DATEV-Export markiert`,
        "SENDINVOICETODATEV",
        JSON.stringify({
          buchungId: buchung.id,
          buchungsNummer: buchung.buchungsNummer,
          rechnungsNummer: buchung.rechnungsNummer,
          betrag: buchung.gesamtPreis,
        })
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei SENDINVOICETODATEV: ${(err as Error).message}`, "SENDINVOICETODATEV");
  }
}

/**
 * After a Buchung is updated.
 * Implements:
 *   Flow 1: Count_Booking_after_Update (if unterkunftId or accountId changed)
 *   Flow 2: Record_Trigger_Sum_of_Unterkunftskosten
 *   Flow 3: Update_Buchungsphase (auto-update based on dates)
 *   Flow 4: Booking_Schedule_Send_review_link_to_contact (after checkout)
 *   Flow 5: X7_MWST (recalculate 7% tax fields)
 *   Flow 11: Update_opportunity_Amount
 *   Flow 29: SENDINVOICETODATEV
 */
export async function afterBuchungUpdate(buchung: any, oldBuchung: any): Promise<void> {
  // --- Flow 1: Count_Booking_after_Update ---
  // If unterkunftId changed, update count on both old and new unterkunft
  try {
    if (buchung.unterkunftId !== oldBuchung.unterkunftId) {
      // Update old unterkunft count
      if (oldBuchung.unterkunftId) {
        const [result] = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.buchungen)
          .where(eq(schema.buchungen.unterkunftId, oldBuchung.unterkunftId));
        await db
          .update(schema.unterkuenfte)
          .set({ anzahlBuchungen: result?.count ?? 0, updatedAt: now() })
          .where(eq(schema.unterkuenfte.id, oldBuchung.unterkunftId));
      }
      // Update new unterkunft count
      if (buchung.unterkunftId) {
        const [result] = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.buchungen)
          .where(eq(schema.buchungen.unterkunftId, buchung.unterkunftId));
        await db
          .update(schema.unterkuenfte)
          .set({ anzahlBuchungen: result?.count ?? 0, updatedAt: now() })
          .where(eq(schema.unterkuenfte.id, buchung.unterkunftId));
      }
      await createLog("Flow", `Buchungsanzahl auf Unterkunft(en) aktualisiert nach Unterkunft-Wechsel`, "Count_Booking_after_Update");
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Count_Booking (Unterkunft, Update): ${(err as Error).message}`, "Count_Booking_after_Update");
  }

  // If accountId changed, update count on both old and new account
  try {
    if (buchung.accountId !== oldBuchung.accountId) {
      if (oldBuchung.accountId) {
        const [result] = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.buchungen)
          .where(eq(schema.buchungen.accountId, oldBuchung.accountId));
        await db
          .update(schema.accounts)
          .set({ anzahlBuchungen: result?.count ?? 0, updatedAt: now() })
          .where(eq(schema.accounts.id, oldBuchung.accountId));
      }
      if (buchung.accountId) {
        const [result] = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.buchungen)
          .where(eq(schema.buchungen.accountId, buchung.accountId));
        await db
          .update(schema.accounts)
          .set({ anzahlBuchungen: result?.count ?? 0, updatedAt: now() })
          .where(eq(schema.accounts.id, buchung.accountId));
      }
      await createLog("Flow", `Buchungsanzahl auf Account(s) aktualisiert nach Account-Wechsel`, "Count_Booking_after_Update");
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Count_Booking (Account, Update): ${(err as Error).message}`, "Count_Booking_after_Update");
  }

  // --- Flow 2: Record_Trigger_Sum_of_Unterkunftskosten ---
  try {
    // Recalculate if costs or unterkunft assignment changed
    const kostenChanged =
      buchung.unterkunftskostenGesamtInkl19Netto !== oldBuchung.unterkunftskostenGesamtInkl19Netto ||
      buchung.unterkunftId !== oldBuchung.unterkunftId;

    if (kostenChanged) {
      // Sum for the current unterkunft
      if (buchung.unterkunftId) {
        const [result] = await db
          .select({
            total: sql<number>`COALESCE(SUM(unterkunftskosten_gesamt_inkl_19_netto), 0)`,
          })
          .from(schema.buchungen)
          .where(eq(schema.buchungen.unterkunftId, buchung.unterkunftId));
        await createLog(
          "Flow",
          `Unterkunftskosten-Summe für Unterkunft ${buchung.unterkunftId}: ${(result?.total ?? 0).toFixed(2)} EUR`,
          "Record_Trigger_Sum_of_Unterkunftskosten",
          JSON.stringify({ unterkunftId: buchung.unterkunftId, summeUnterkunftskosten: result?.total ?? 0 })
        );
      }
      // If unterkunft changed, also recalculate old unterkunft
      if (oldBuchung.unterkunftId && oldBuchung.unterkunftId !== buchung.unterkunftId) {
        const [result] = await db
          .select({
            total: sql<number>`COALESCE(SUM(unterkunftskosten_gesamt_inkl_19_netto), 0)`,
          })
          .from(schema.buchungen)
          .where(eq(schema.buchungen.unterkunftId, oldBuchung.unterkunftId));
        await createLog(
          "Flow",
          `Unterkunftskosten-Summe für alte Unterkunft ${oldBuchung.unterkunftId}: ${(result?.total ?? 0).toFixed(2)} EUR`,
          "Record_Trigger_Sum_of_Unterkunftskosten"
        );
      }
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Sum_Unterkunftskosten (Update): ${(err as Error).message}`, "Record_Trigger_Sum_of_Unterkunftskosten");
  }

  // --- Flow 3: Update_Buchungsphase ---
  // Auto-update buchungsphase based on dates
  try {
    const todayStr = today();
    const checkIn = buchung.checkIn ? buchung.checkIn.split("T")[0] : null;
    const checkOut = buchung.checkOut ? buchung.checkOut.split("T")[0] : null;

    if (checkIn && checkOut) {
      let newPhase: string | null = null;

      if (checkIn <= todayStr && checkOut > todayStr) {
        // Currently active stay
        if (buchung.buchungsphase !== "Aktiv") {
          newPhase = "Aktiv";
        }
      } else if (checkOut <= todayStr) {
        // Stay has ended
        if (buchung.buchungsphase !== "Abgeschlossen") {
          newPhase = "Abgeschlossen";
        }
      }

      if (newPhase) {
        await db
          .update(schema.buchungen)
          .set({ buchungsphase: newPhase, updatedAt: now() })
          .where(eq(schema.buchungen.id, buchung.id));
        await createLog(
          "Flow",
          `Buchungsphase für ${buchung.id} automatisch auf "${newPhase}" gesetzt (CheckIn: ${checkIn}, CheckOut: ${checkOut})`,
          "Update_Buchungsphase"
        );
      }
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Update_Buchungsphase: ${(err as Error).message}`, "Update_Buchungsphase");
  }

  // --- Flow 4: Booking_Schedule_Send_review_link_to_contact ---
  // After checkout date passes, mark reviewLinkSent = true
  try {
    const todayStr = today();
    const checkOut = buchung.checkOut ? buchung.checkOut.split("T")[0] : null;

    if (checkOut && checkOut <= todayStr && !buchung.reviewLinkSent) {
      await db
        .update(schema.buchungen)
        .set({ reviewLinkSent: true, updatedAt: now() })
        .where(eq(schema.buchungen.id, buchung.id));
      await createLog(
        "Flow",
        `Review-Link für Buchung ${buchung.id} (${buchung.buchungsNummer}) als gesendet markiert nach Checkout ${checkOut}`,
        "Booking_Schedule_Send_review_link_to_contact",
        JSON.stringify({
          buchungId: buchung.id,
          gastName: buchung.gastName,
          gastEmail: buchung.gastEmail,
          checkOut,
        })
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Send_review_link: ${(err as Error).message}`, "Booking_Schedule_Send_review_link_to_contact");
  }

  // --- Flow 5: X7_MWST ---
  try {
    const mwstChanged = buchung.mwstSatz !== oldBuchung.mwstSatz;
    const priceChanged =
      buchung.preisProNacht !== oldBuchung.preisProNacht ||
      buchung.anzahlNaechte !== oldBuchung.anzahlNaechte;

    if ((buchung.mwstSatz === 7 || buchung.mwstSatz === 7.0) && (mwstChanged || priceChanged)) {
      await recalculate7PercentMwst(buchung);
    }
  } catch (err) {
    await createLog("Error", `Fehler bei X7_MWST (Update): ${(err as Error).message}`, "X7_MWST");
  }

  // --- Flow 11: Update_opportunity_Amount ---
  try {
    // Update opportunity amount if price or opportunity assignment changed
    const amountChanged =
      buchung.gesamtPreis !== oldBuchung.gesamtPreis ||
      buchung.opportunityId !== oldBuchung.opportunityId;

    if (amountChanged) {
      if (buchung.opportunityId) {
        await updateOpportunityAmount(buchung.opportunityId);
      }
      // If opportunity changed, recalculate old opportunity too
      if (oldBuchung.opportunityId && oldBuchung.opportunityId !== buchung.opportunityId) {
        await updateOpportunityAmount(oldBuchung.opportunityId);
      }
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Update_opportunity_Amount (Update): ${(err as Error).message}`, "Update_opportunity_Amount");
  }

  // --- Flow 29: SENDINVOICETODATEV ---
  try {
    // If datevExported changed from false to true
    if (buchung.datevExported === true && oldBuchung.datevExported !== true) {
      await createLog(
        "Flow",
        `Buchung ${buchung.id} (${buchung.buchungsNummer}) für DATEV-Export markiert`,
        "SENDINVOICETODATEV",
        JSON.stringify({
          buchungId: buchung.id,
          buchungsNummer: buchung.buchungsNummer,
          rechnungsNummer: buchung.rechnungsNummer,
          rechnungsDatum: buchung.rechnungsDatum,
          betrag: buchung.gesamtPreis,
          mwstSatz: buchung.mwstSatz,
          mwstBetrag: buchung.mwstBetrag,
          exportedAt: now(),
        })
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei SENDINVOICETODATEV (Update): ${(err as Error).message}`, "SENDINVOICETODATEV");
  }
}

/**
 * After a Buchung is deleted.
 * Implements:
 *   Flow 1: Count_Booking_after_delete (recount on unterkunft + account)
 *   Flow 2: After_delete_Sum (recalculate unterkunftskosten sum)
 *   Flow 16: Update_Opp_After_Delete (recalculate opportunity amount)
 */
export async function afterBuchungDelete(buchung: any): Promise<void> {
  // --- Flow 1: Count_Booking_after_delete ---
  // Recount buchungen on the related unterkunft
  try {
    if (buchung.unterkunftId) {
      const [result] = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.buchungen)
        .where(eq(schema.buchungen.unterkunftId, buchung.unterkunftId));
      const count = result?.count ?? 0;
      await db
        .update(schema.unterkuenfte)
        .set({ anzahlBuchungen: count, updatedAt: now() })
        .where(eq(schema.unterkuenfte.id, buchung.unterkunftId));
      await createLog(
        "Flow",
        `Buchungsanzahl auf Unterkunft ${buchung.unterkunftId} nach Löschung aktualisiert: ${count}`,
        "Count_Booking_after_delete"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Count_Booking_after_delete (Unterkunft): ${(err as Error).message}`, "Count_Booking_after_delete");
  }

  // Recount buchungen on the related account
  try {
    if (buchung.accountId) {
      const [result] = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.buchungen)
        .where(eq(schema.buchungen.accountId, buchung.accountId));
      const count = result?.count ?? 0;
      await db
        .update(schema.accounts)
        .set({ anzahlBuchungen: count, updatedAt: now() })
        .where(eq(schema.accounts.id, buchung.accountId));
      await createLog(
        "Flow",
        `Buchungsanzahl auf Account ${buchung.accountId} nach Löschung aktualisiert: ${count}`,
        "Count_Booking_after_delete"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Count_Booking_after_delete (Account): ${(err as Error).message}`, "Count_Booking_after_delete");
  }

  // --- Flow 2: After_delete_Sum ---
  // Recalculate unterkunftskosten sum after deletion
  try {
    if (buchung.unterkunftId) {
      const [result] = await db
        .select({
          total: sql<number>`COALESCE(SUM(unterkunftskosten_gesamt_inkl_19_netto), 0)`,
        })
        .from(schema.buchungen)
        .where(eq(schema.buchungen.unterkunftId, buchung.unterkunftId));
      await createLog(
        "Flow",
        `Unterkunftskosten-Summe für Unterkunft ${buchung.unterkunftId} nach Löschung: ${(result?.total ?? 0).toFixed(2)} EUR`,
        "After_delete_Sum",
        JSON.stringify({ unterkunftId: buchung.unterkunftId, summeUnterkunftskosten: result?.total ?? 0 })
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei After_delete_Sum: ${(err as Error).message}`, "After_delete_Sum");
  }

  // --- Flow 16: Update_Opp_After_Delete ---
  // Recalculate opportunity amount after buchung deletion
  try {
    if (buchung.opportunityId) {
      await updateOpportunityAmount(buchung.opportunityId);
      await createLog(
        "Flow",
        `Opportunity-Betrag für ${buchung.opportunityId} nach Buchungslöschung aktualisiert`,
        "Update_Opp_After_Delete"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Update_Opp_After_Delete: ${(err as Error).message}`, "Update_Opp_After_Delete");
  }
}

// =============================================================================
// UNTERKUNFT (Property) FLOWS
// =============================================================================

/**
 * After a new Unterkunft is inserted.
 * Implements:
 *   Flow 6: Unterkun_Count_booking_and_save_on_Account (count unterkuenfte on vermieter)
 *   Flow 7: Unterkunft_Recorded_Trigger_Update_some_English_fields
 *   Flow 8: PropertyStatus_Update (aufnahmeProzent)
 *   Flow 9: Property_Validation_for_Exacte_Unterkunftsbezeichnung
 */
export async function afterUnterkunftInsert(unterkunft: any): Promise<void> {
  // --- Flow 6: Count unterkuenfte on vermieter account ---
  try {
    if (unterkunft.vermieterId) {
      const [result] = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.unterkuenfte)
        .where(eq(schema.unterkuenfte.vermieterId, unterkunft.vermieterId));
      const count = result?.count ?? 0;
      await db
        .update(schema.accounts)
        .set({ anzahlUnterkuenfte: count, updatedAt: now() })
        .where(eq(schema.accounts.id, unterkunft.vermieterId));
      await createLog(
        "Flow",
        `Unterkunft-Anzahl auf Vermieter-Account ${unterkunft.vermieterId} aktualisiert: ${count}`,
        "Unterkun_Count_booking_and_save_on_Account"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Unterkunft-Count auf Account: ${(err as Error).message}`, "Unterkun_Count_booking_and_save_on_Account");
  }

  // --- Flow 7: Update English fields ---
  // Copy German fields to English equivalents (simple copy for now)
  try {
    const updates: Record<string, any> = {};
    let needsUpdate = false;

    if (unterkunft.ort && !unterkunft.cityEn) {
      updates.cityEn = unterkunft.ort;
      needsUpdate = true;
    }
    if (unterkunft.name && !unterkunft.titleEn) {
      updates.titleEn = unterkunft.name;
      needsUpdate = true;
    }
    if (unterkunft.beschreibung && !unterkunft.descriptionEn) {
      updates.descriptionEn = unterkunft.beschreibung;
      needsUpdate = true;
    }

    if (needsUpdate) {
      updates.updatedAt = now();
      await db
        .update(schema.unterkuenfte)
        .set(updates)
        .where(eq(schema.unterkuenfte.id, unterkunft.id));
      await createLog(
        "Flow",
        `Englische Felder für Unterkunft ${unterkunft.id} kopiert: ${Object.keys(updates).filter((k) => k !== "updatedAt").join(", ")}`,
        "Unterkunft_Update_English_fields"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Update_English_fields: ${(err as Error).message}`, "Unterkunft_Update_English_fields");
  }

  // --- Flow 8: PropertyStatus_Update ---
  // Calculate aufnahmeProzent based on how many required fields are filled
  try {
    const prozent = calculateAufnahmeProzent(unterkunft);
    if (prozent !== unterkunft.aufnahmeProzent) {
      await db
        .update(schema.unterkuenfte)
        .set({ aufnahmeProzent: prozent, updatedAt: now() })
        .where(eq(schema.unterkuenfte.id, unterkunft.id));
      await createLog(
        "Flow",
        `Aufnahme-Prozent für Unterkunft ${unterkunft.id} berechnet: ${prozent}%`,
        "PropertyStatus_Update"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei PropertyStatus_Update: ${(err as Error).message}`, "PropertyStatus_Update");
  }

  // --- Flow 9: Property_Validation_for_Exacte_Unterkunftsbezeichnung ---
  // Auto-generate exacteUnterkunftsbezeichnung
  try {
    const bezeichnung = generateExacteBezeichnung(unterkunft);
    if (bezeichnung && bezeichnung !== unterkunft.exacteUnterkunftsbezeichnung) {
      await db
        .update(schema.unterkuenfte)
        .set({ exacteUnterkunftsbezeichnung: bezeichnung, updatedAt: now() })
        .where(eq(schema.unterkuenfte.id, unterkunft.id));
      await createLog(
        "Flow",
        `Exacte Unterkunftsbezeichnung generiert: "${bezeichnung}"`,
        "Property_Validation_Exacte_Unterkunftsbezeichnung"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Exacte_Unterkunftsbezeichnung: ${(err as Error).message}`, "Property_Validation_Exacte_Unterkunftsbezeichnung");
  }
}

/**
 * After an Unterkunft is updated.
 * Implements:
 *   Flow 6: Count unterkuenfte on vermieter (if vermieterId changed)
 *   Flow 7: Update English fields
 *   Flow 8: PropertyStatus_Update (aufnahmeProzent)
 *   Flow 9: Exacte Unterkunftsbezeichnung
 *   Flow 10: Copy_new_address_to_old_address_fields (log address change)
 */
export async function afterUnterkunftUpdate(unterkunft: any, oldUnterkunft: any): Promise<void> {
  // --- Flow 6: Count unterkuenfte on vermieter account (if changed) ---
  try {
    if (unterkunft.vermieterId !== oldUnterkunft.vermieterId) {
      // Update old vermieter count
      if (oldUnterkunft.vermieterId) {
        const [result] = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.unterkuenfte)
          .where(eq(schema.unterkuenfte.vermieterId, oldUnterkunft.vermieterId));
        await db
          .update(schema.accounts)
          .set({ anzahlUnterkuenfte: result?.count ?? 0, updatedAt: now() })
          .where(eq(schema.accounts.id, oldUnterkunft.vermieterId));
      }
      // Update new vermieter count
      if (unterkunft.vermieterId) {
        const [result] = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.unterkuenfte)
          .where(eq(schema.unterkuenfte.vermieterId, unterkunft.vermieterId));
        await db
          .update(schema.accounts)
          .set({ anzahlUnterkuenfte: result?.count ?? 0, updatedAt: now() })
          .where(eq(schema.accounts.id, unterkunft.vermieterId));
      }
      await createLog(
        "Flow",
        `Unterkunft-Anzahl auf Vermieter-Account(s) aktualisiert nach Vermieter-Wechsel`,
        "Unterkun_Count_booking_and_save_on_Account"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Unterkunft-Count auf Account (Update): ${(err as Error).message}`, "Unterkun_Count_booking_and_save_on_Account");
  }

  // --- Flow 7: Update English fields ---
  try {
    const updates: Record<string, any> = {};
    let needsUpdate = false;

    // Copy when German fields change
    if (unterkunft.ort !== oldUnterkunft.ort && unterkunft.ort) {
      updates.cityEn = unterkunft.ort;
      needsUpdate = true;
    }
    if (unterkunft.name !== oldUnterkunft.name && unterkunft.name) {
      updates.titleEn = unterkunft.name;
      needsUpdate = true;
    }
    if (unterkunft.beschreibung !== oldUnterkunft.beschreibung && unterkunft.beschreibung) {
      updates.descriptionEn = unterkunft.beschreibung;
      needsUpdate = true;
    }

    if (needsUpdate) {
      updates.updatedAt = now();
      await db
        .update(schema.unterkuenfte)
        .set(updates)
        .where(eq(schema.unterkuenfte.id, unterkunft.id));
      await createLog(
        "Flow",
        `Englische Felder für Unterkunft ${unterkunft.id} aktualisiert: ${Object.keys(updates).filter((k) => k !== "updatedAt").join(", ")}`,
        "Unterkunft_Update_English_fields"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Update_English_fields (Update): ${(err as Error).message}`, "Unterkunft_Update_English_fields");
  }

  // --- Flow 8: PropertyStatus_Update ---
  try {
    const prozent = calculateAufnahmeProzent(unterkunft);
    if (prozent !== unterkunft.aufnahmeProzent) {
      await db
        .update(schema.unterkuenfte)
        .set({ aufnahmeProzent: prozent, updatedAt: now() })
        .where(eq(schema.unterkuenfte.id, unterkunft.id));
      await createLog(
        "Flow",
        `Aufnahme-Prozent für Unterkunft ${unterkunft.id} aktualisiert: ${prozent}%`,
        "PropertyStatus_Update"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei PropertyStatus_Update (Update): ${(err as Error).message}`, "PropertyStatus_Update");
  }

  // --- Flow 9: Exacte Unterkunftsbezeichnung ---
  try {
    const addressFieldsChanged =
      unterkunft.unterkunftsTyp !== oldUnterkunft.unterkunftsTyp ||
      unterkunft.strasse !== oldUnterkunft.strasse ||
      unterkunft.hausnummer !== oldUnterkunft.hausnummer ||
      unterkunft.plz !== oldUnterkunft.plz ||
      unterkunft.ort !== oldUnterkunft.ort;

    if (addressFieldsChanged) {
      const bezeichnung = generateExacteBezeichnung(unterkunft);
      if (bezeichnung) {
        await db
          .update(schema.unterkuenfte)
          .set({ exacteUnterkunftsbezeichnung: bezeichnung, updatedAt: now() })
          .where(eq(schema.unterkuenfte.id, unterkunft.id));
        await createLog(
          "Flow",
          `Exacte Unterkunftsbezeichnung aktualisiert: "${bezeichnung}"`,
          "Property_Validation_Exacte_Unterkunftsbezeichnung"
        );
      }
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Exacte_Unterkunftsbezeichnung (Update): ${(err as Error).message}`, "Property_Validation_Exacte_Unterkunftsbezeichnung");
  }

  // --- Flow 10: Copy_new_address_to_old_address_fields ---
  // Log address change for history
  try {
    const addressChanged =
      unterkunft.strasse !== oldUnterkunft.strasse ||
      unterkunft.hausnummer !== oldUnterkunft.hausnummer ||
      unterkunft.plz !== oldUnterkunft.plz ||
      unterkunft.ort !== oldUnterkunft.ort ||
      unterkunft.bundesland !== oldUnterkunft.bundesland ||
      unterkunft.land !== oldUnterkunft.land;

    if (addressChanged) {
      await createLog(
        "Flow",
        `Adressänderung für Unterkunft ${unterkunft.id} (${unterkunft.name}) protokolliert`,
        "Copy_new_address_to_old_address_fields",
        JSON.stringify({
          unterkunftId: unterkunft.id,
          alteAdresse: {
            strasse: oldUnterkunft.strasse,
            hausnummer: oldUnterkunft.hausnummer,
            plz: oldUnterkunft.plz,
            ort: oldUnterkunft.ort,
            bundesland: oldUnterkunft.bundesland,
            land: oldUnterkunft.land,
          },
          neueAdresse: {
            strasse: unterkunft.strasse,
            hausnummer: unterkunft.hausnummer,
            plz: unterkunft.plz,
            ort: unterkunft.ort,
            bundesland: unterkunft.bundesland,
            land: unterkunft.land,
          },
        })
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Copy_new_address: ${(err as Error).message}`, "Copy_new_address_to_old_address_fields");
  }
}

/**
 * After an Unterkunft is deleted.
 * Implements:
 *   Flow 6: after_delete - recount unterkuenfte on vermieter account
 */
export async function afterUnterkunftDelete(unterkunft: any): Promise<void> {
  // --- Flow 6: Recount unterkuenfte on vermieter ---
  try {
    if (unterkunft.vermieterId) {
      const [result] = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.unterkuenfte)
        .where(eq(schema.unterkuenfte.vermieterId, unterkunft.vermieterId));
      const count = result?.count ?? 0;
      await db
        .update(schema.accounts)
        .set({ anzahlUnterkuenfte: count, updatedAt: now() })
        .where(eq(schema.accounts.id, unterkunft.vermieterId));
      await createLog(
        "Flow",
        `Unterkunft-Anzahl auf Vermieter-Account ${unterkunft.vermieterId} nach Löschung aktualisiert: ${count}`,
        "Unterkun_Count_after_delete"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Unterkunft-Count nach Löschung: ${(err as Error).message}`, "Unterkun_Count_after_delete");
  }
}

// =============================================================================
// OPPORTUNITY FLOWS
// =============================================================================

/**
 * After an Opportunity is updated.
 * Implements:
 *   Flow 12: Opportunity_After_stage_update_Keep_track_of_Search_time
 *   Flow 13: Opportunity_after_update_Roll_up_search_time
 *   Flow 14: Opportunity_Record_Trigger_update_search_fields
 *   Flow 15: Create_Task_Opportunity_Qualified (stage = "Qualifizierung")
 *   Flow 17: Opportunty_After_closed_Send_Emails (stage = "Gewonnen")
 */
export async function afterOpportunityUpdate(opp: any, oldOpp: any): Promise<void> {
  const stageChanged = opp.stage !== oldOpp.stage;

  // --- Flow 12: Keep track of Search time ---
  // When stage changes, record searchStartDate/searchEndDate
  try {
    if (stageChanged) {
      const timestamp = now();
      const updates: Record<string, any> = { updatedAt: timestamp };

      // When entering a "search" stage, set searchStartDate
      const searchStages = ["Suche", "Unterkunftssuche", "In Bearbeitung"];
      if (searchStages.includes(opp.stage) && !opp.searchStartDate) {
        updates.searchStartDate = timestamp;
        await createLog(
          "Flow",
          `Suchzeit-Start für Opportunity ${opp.id} gesetzt: ${timestamp}`,
          "Opportunity_Keep_track_of_Search_time"
        );
      }

      // When leaving a search stage (closing or won), set searchEndDate
      const endStages = ["Gewonnen", "Verloren", "Closed Won", "Closed Lost", "Abgeschlossen"];
      if (endStages.includes(opp.stage) && opp.searchStartDate && !opp.searchEndDate) {
        updates.searchEndDate = timestamp;

        // Calculate search time in minutes
        const startMs = new Date(opp.searchStartDate).getTime();
        const endMs = new Date(timestamp).getTime();
        const minutes = Math.round((endMs - startMs) / (1000 * 60));
        updates.searchTimeMinutes = minutes;

        await createLog(
          "Flow",
          `Suchzeit-Ende für Opportunity ${opp.id}: ${minutes} Minuten (Start: ${opp.searchStartDate}, Ende: ${timestamp})`,
          "Opportunity_Keep_track_of_Search_time"
        );
      }

      // Create a search timer entry
      await db.insert(schema.searchTimers).values({
        id: nanoid(),
        opportunityId: opp.id,
        startTime: oldOpp.stage ? timestamp : null,
        endTime: timestamp,
        durationMinutes: 0,
        createdAt: timestamp,
      });

      // Apply updates if any
      if (Object.keys(updates).length > 1) {
        await db
          .update(schema.opportunities)
          .set(updates)
          .where(eq(schema.opportunities.id, opp.id));
      }
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Keep_track_of_Search_time: ${(err as Error).message}`, "Opportunity_Keep_track_of_Search_time");
  }

  // --- Flow 13: Roll up search time ---
  // Sum all searchTimer durations for the opportunity
  try {
    if (stageChanged) {
      const [result] = await db
        .select({
          totalMinutes: sql<number>`COALESCE(SUM(duration_minutes), 0)`,
        })
        .from(schema.searchTimers)
        .where(eq(schema.searchTimers.opportunityId, opp.id));

      const totalMinutes = result?.totalMinutes ?? 0;
      if (totalMinutes > 0) {
        await db
          .update(schema.opportunities)
          .set({ searchTimeMinutes: totalMinutes, updatedAt: now() })
          .where(eq(schema.opportunities.id, opp.id));
        await createLog(
          "Flow",
          `Gesamte Suchzeit für Opportunity ${opp.id} aufgerollt: ${totalMinutes} Minuten`,
          "Opportunity_Roll_up_search_time"
        );
      }
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Roll_up_search_time: ${(err as Error).message}`, "Opportunity_Roll_up_search_time");
  }

  // --- Flow 14: Update search fields ---
  // Auto-populate search-related fields on opportunity
  try {
    if (stageChanged) {
      const updates: Record<string, any> = {};
      let needsUpdate = false;

      // If entering search stage and no searchStartDate, set it
      if (!opp.searchStartDate && ["Suche", "Unterkunftssuche", "In Bearbeitung"].includes(opp.stage)) {
        updates.searchStartDate = now();
        needsUpdate = true;
      }

      // Auto-set closeDate if stage is closed and no closeDate set
      const closedStages = ["Gewonnen", "Verloren", "Closed Won", "Closed Lost", "Abgeschlossen"];
      if (closedStages.includes(opp.stage) && !opp.closeDate) {
        updates.closeDate = today();
        needsUpdate = true;
      }

      if (needsUpdate) {
        updates.updatedAt = now();
        await db
          .update(schema.opportunities)
          .set(updates)
          .where(eq(schema.opportunities.id, opp.id));
        await createLog(
          "Flow",
          `Suchfelder für Opportunity ${opp.id} automatisch aktualisiert: ${Object.keys(updates).filter((k) => k !== "updatedAt").join(", ")}`,
          "Opportunity_update_search_fields"
        );
      }
    }
  } catch (err) {
    await createLog("Error", `Fehler bei update_search_fields: ${(err as Error).message}`, "Opportunity_update_search_fields");
  }

  // --- Flow 15: Create_Task_Opportunity_Qualified ---
  // When stage = "Qualifizierung", auto-create a task
  try {
    if (stageChanged && opp.stage === "Qualifizierung") {
      const taskId = nanoid();
      const timestamp = now();
      await db.insert(schema.tasks).values({
        id: taskId,
        subject: `Opportunity qualifiziert: ${opp.name}`,
        description: `Die Opportunity "${opp.name}" wurde in die Phase "Qualifizierung" verschoben. Bitte nächste Schritte planen.`,
        status: "Offen",
        priority: "Hoch",
        dueDate: addDays(today(), 3),
        accountId: opp.accountId || null,
        contactId: opp.contactId || null,
        opportunityId: opp.id,
        leadId: null,
        keyAccountManagerId: opp.keyAccountManagerId || null,
        ownerId: opp.ownerId || null,
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      // Update task count on opportunity
      const [countResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.tasks)
        .where(eq(schema.tasks.opportunityId, opp.id));
      await db
        .update(schema.opportunities)
        .set({ taskCount: countResult?.count ?? 0, updatedAt: timestamp })
        .where(eq(schema.opportunities.id, opp.id));

      await createLog(
        "Flow",
        `Aufgabe "${taskId}" erstellt für Opportunity-Qualifizierung: ${opp.name}`,
        "Create_Task_Opportunity_Qualified"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Create_Task_Opportunity_Qualified: ${(err as Error).message}`, "Create_Task_Opportunity_Qualified");
  }

  // --- Flow 17: After closed, send emails (log notification) ---
  try {
    if (stageChanged && (opp.stage === "Gewonnen" || opp.stage === "Closed Won")) {
      await createLog(
        "Flow",
        `Opportunity "${opp.name}" (${opp.id}) gewonnen! Benachrichtigung an Freelancer und Suchenden wird protokolliert.`,
        "Opportunity_After_closed_Send_Emails",
        JSON.stringify({
          opportunityId: opp.id,
          name: opp.name,
          amount: opp.amount,
          accountId: opp.accountId,
          contactId: opp.contactId,
          ownerId: opp.ownerId,
          stage: opp.stage,
          closedAt: now(),
        })
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei After_closed_Send_Emails: ${(err as Error).message}`, "Opportunity_After_closed_Send_Emails");
  }
}

// =============================================================================
// LEAD FLOWS
// =============================================================================

/**
 * After a new Lead is inserted.
 * Implements:
 *   Flow 18: Lead_benachrichtigung (log notification for team)
 *   Flow 19: Lead_After_Create_Add_Lead_to_Campaign
 *   Flow 20: Lead_Record_Triggered_Update_Lead_owner_from_Key_Account_Manager
 *   Flow 21: Lead_Nurturing_Task (create follow-up task)
 */
export async function afterLeadInsert(lead: any): Promise<void> {
  // --- Flow 18: Lead_benachrichtigung ---
  // After create lead, log notification for team
  try {
    const leadName = [lead.salutation, lead.firstName, lead.lastName].filter(Boolean).join(" ");
    await createLog(
      "Flow",
      `Neuer Lead erstellt: ${leadName} (${lead.company || "Keine Firma"}) - Quelle: ${lead.source || "Unbekannt"}`,
      "Lead_benachrichtigung",
      JSON.stringify({
        leadId: lead.id,
        name: leadName,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        status: lead.status,
        createdAt: lead.createdAt,
      })
    );
  } catch (err) {
    await createLog("Error", `Fehler bei Lead_benachrichtigung: ${(err as Error).message}`, "Lead_benachrichtigung");
  }

  // --- Flow 19: Lead_After_Create_Add_Lead_to_Campaign ---
  // If source matches a known campaign pattern, set campaignId
  try {
    if (lead.source && !lead.campaignId) {
      const campaignMapping: Record<string, string> = {
        "Website": "campaign-website",
        "Google": "campaign-google-ads",
        "Google Ads": "campaign-google-ads",
        "Facebook": "campaign-facebook",
        "Meta Ads": "campaign-meta-ads",
        "Instagram": "campaign-instagram",
        "LinkedIn": "campaign-linkedin",
        "Empfehlung": "campaign-empfehlung",
        "Kaltakquise": "campaign-kaltakquise",
        "Messe": "campaign-messe",
        "Telefonakquise": "campaign-telefonakquise",
      };

      const campaignId = campaignMapping[lead.source];
      if (campaignId) {
        await db
          .update(schema.leads)
          .set({ campaignId, updatedAt: now() })
          .where(eq(schema.leads.id, lead.id));
        await createLog(
          "Flow",
          `Lead ${lead.id} automatisch der Kampagne "${campaignId}" zugeordnet (Quelle: ${lead.source})`,
          "Lead_After_Create_Add_Lead_to_Campaign"
        );
      }
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Add_Lead_to_Campaign: ${(err as Error).message}`, "Lead_After_Create_Add_Lead_to_Campaign");
  }

  // --- Flow 20: Update Lead owner from Key Account Manager ---
  // If keyAccountManagerId is set, copy to ownerId
  try {
    if (lead.keyAccountManagerId && !lead.ownerId) {
      await db
        .update(schema.leads)
        .set({ ownerId: lead.keyAccountManagerId, updatedAt: now() })
        .where(eq(schema.leads.id, lead.id));
      await createLog(
        "Flow",
        `Lead ${lead.id} Owner auf Key Account Manager ${lead.keyAccountManagerId} gesetzt`,
        "Lead_Update_owner_from_KAM"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Lead_owner_from_KAM: ${(err as Error).message}`, "Lead_Update_owner_from_KAM");
  }

  // --- Flow 21: Lead_Nurturing_Task ---
  // Create follow-up task after lead creation
  try {
    const leadName = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
    const taskId = nanoid();
    const timestamp = now();
    await db.insert(schema.tasks).values({
      id: taskId,
      subject: `Neuen Lead kontaktieren: ${leadName}`,
      description: `Follow-up für neuen Lead: ${leadName} (${lead.company || "Keine Firma"}). Bitte innerhalb von 24 Stunden kontaktieren.`,
      status: "Offen",
      priority: "Hoch",
      dueDate: addDays(today(), 1),
      accountId: null,
      contactId: null,
      opportunityId: null,
      leadId: lead.id,
      keyAccountManagerId: lead.keyAccountManagerId || null,
      ownerId: lead.ownerId || lead.keyAccountManagerId || null,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    await createLog(
      "Flow",
      `Nurturing-Aufgabe "${taskId}" erstellt für Lead ${lead.id}: ${leadName}`,
      "Lead_Nurturing_Task"
    );
  } catch (err) {
    await createLog("Error", `Fehler bei Lead_Nurturing_Task: ${(err as Error).message}`, "Lead_Nurturing_Task");
  }
}

/**
 * After a Lead is updated.
 * Implements:
 *   Flow 20: Lead owner from Key Account Manager (if KAM changed)
 *   Flow 22: Nichterreicht_Flow (after call logged as "nicht erreicht")
 */
export async function afterLeadUpdate(lead: any, oldLead: any): Promise<void> {
  // --- Flow 20: Update Lead owner from Key Account Manager ---
  try {
    if (
      lead.keyAccountManagerId &&
      lead.keyAccountManagerId !== oldLead.keyAccountManagerId
    ) {
      await db
        .update(schema.leads)
        .set({ ownerId: lead.keyAccountManagerId, updatedAt: now() })
        .where(eq(schema.leads.id, lead.id));
      await createLog(
        "Flow",
        `Lead ${lead.id} Owner auf neuen Key Account Manager ${lead.keyAccountManagerId} gesetzt`,
        "Lead_Update_owner_from_KAM"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Lead_owner_from_KAM (Update): ${(err as Error).message}`, "Lead_Update_owner_from_KAM");
  }

  // --- Flow 22: Nichterreicht_Flow ---
  // After status set to "Nicht erreicht", create follow-up task
  try {
    const statusChanged = lead.status !== oldLead.status;
    if (statusChanged && lead.status === "Nicht erreicht") {
      const leadName = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
      const taskId = nanoid();
      const timestamp = now();
      await db.insert(schema.tasks).values({
        id: taskId,
        subject: `Erneut anrufen: ${leadName} (nicht erreicht)`,
        description: `Lead "${leadName}" wurde nicht erreicht. Bitte erneut versuchen. Firma: ${lead.company || "Keine Firma"}, Telefon: ${lead.phone || lead.mobilePhone || "Keine Nummer"}.`,
        status: "Offen",
        priority: "Hoch",
        dueDate: addDays(today(), 1),
        accountId: null,
        contactId: null,
        opportunityId: null,
        leadId: lead.id,
        keyAccountManagerId: lead.keyAccountManagerId || null,
        ownerId: lead.ownerId || null,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
      await createLog(
        "Flow",
        `Nichterreicht-Aufgabe "${taskId}" erstellt für Lead ${lead.id}: ${leadName}`,
        "Nichterreicht_Flow",
        JSON.stringify({
          leadId: lead.id,
          leadName,
          phone: lead.phone,
          mobilePhone: lead.mobilePhone,
          previousStatus: oldLead.status,
        })
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Nichterreicht_Flow: ${(err as Error).message}`, "Nichterreicht_Flow");
  }
}

// =============================================================================
// ACCOUNT FLOWS
// =============================================================================

/**
 * After a new Account is inserted.
 * Implements:
 *   Flow 23: Account_Record_Trigger_Key_Account_Manager_is_blank
 *     - If keyAccountManagerId is blank, set a default
 */
export async function afterAccountInsert(account: any): Promise<void> {
  // --- Flow 23: Set default Key Account Manager if blank ---
  try {
    if (!account.keyAccountManagerId) {
      // Try to find a default KAM (first active admin user)
      const defaultUser = await db.query.users.findFirst({
        where: and(
          eq(schema.users.role, "admin"),
          eq(schema.users.isActive, true)
        ),
      });

      if (defaultUser) {
        await db
          .update(schema.accounts)
          .set({
            keyAccountManagerId: defaultUser.id,
            updatedAt: now(),
          })
          .where(eq(schema.accounts.id, account.id));
        await createLog(
          "Flow",
          `Key Account Manager für Account ${account.id} (${account.name}) automatisch auf ${defaultUser.name} (${defaultUser.id}) gesetzt`,
          "Account_KAM_is_blank"
        );
      } else {
        await createLog(
          "Flow",
          `Kein Standard-Key-Account-Manager gefunden für Account ${account.id} (${account.name})`,
          "Account_KAM_is_blank"
        );
      }
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Account_KAM_is_blank: ${(err as Error).message}`, "Account_KAM_is_blank");
  }
}

// =============================================================================
// TASK FLOWS
// =============================================================================

/**
 * After a new Task is inserted.
 * Implements:
 *   Flow 24: Count_Task_On_opp (count tasks on opportunity)
 *   Flow 25: Keyaccount_in_Tasks (copy KAM to task)
 *   Flow 26: Task_After_create_Populate_Due_Date_on_Air_Call_Tasks
 *   Flow 27: Task_Send_Email_Alert_to_Freelancer (log notification)
 *   Flow 28: Log_a_call_for_face_of_opportunity (update last activity on opp)
 */
export async function afterTaskInsert(task: any): Promise<void> {
  // --- Flow 24: Count_Task_On_opp ---
  try {
    if (task.opportunityId) {
      const [result] = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.tasks)
        .where(eq(schema.tasks.opportunityId, task.opportunityId));
      const count = result?.count ?? 0;
      await db
        .update(schema.opportunities)
        .set({ taskCount: count, updatedAt: now() })
        .where(eq(schema.opportunities.id, task.opportunityId));
      await createLog(
        "Flow",
        `Aufgabenanzahl auf Opportunity ${task.opportunityId} aktualisiert: ${count}`,
        "Count_Task_On_opp"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Count_Task_On_opp: ${(err as Error).message}`, "Count_Task_On_opp");
  }

  // --- Flow 25: Keyaccount_in_Tasks ---
  // Copy keyAccountManagerId from the related opportunity or account to the task
  try {
    if (!task.keyAccountManagerId) {
      let kamId: string | null = null;

      // Try to get KAM from opportunity
      if (task.opportunityId) {
        const opp = await db.query.opportunities.findFirst({
          where: eq(schema.opportunities.id, task.opportunityId),
        });
        if (opp?.keyAccountManagerId) {
          kamId = opp.keyAccountManagerId;
        }
      }

      // Fallback: try to get KAM from account
      if (!kamId && task.accountId) {
        const account = await db.query.accounts.findFirst({
          where: eq(schema.accounts.id, task.accountId),
        });
        if (account?.keyAccountManagerId) {
          kamId = account.keyAccountManagerId;
        }
      }

      if (kamId) {
        await db
          .update(schema.tasks)
          .set({ keyAccountManagerId: kamId, updatedAt: now() })
          .where(eq(schema.tasks.id, task.id));
        await createLog(
          "Flow",
          `Key Account Manager ${kamId} auf Aufgabe ${task.id} kopiert`,
          "Keyaccount_in_Tasks"
        );
      }
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Keyaccount_in_Tasks: ${(err as Error).message}`, "Keyaccount_in_Tasks");
  }

  // --- Flow 26: Populate Due Date on Air Call Tasks ---
  // If no dueDate, set to 3 days from now
  try {
    if (!task.dueDate) {
      const dueDate = addDays(today(), 3);
      await db
        .update(schema.tasks)
        .set({ dueDate, updatedAt: now() })
        .where(eq(schema.tasks.id, task.id));
      await createLog(
        "Flow",
        `Fälligkeitsdatum für Aufgabe ${task.id} automatisch auf ${dueDate} gesetzt (3 Tage ab heute)`,
        "Task_Populate_Due_Date"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Task_Populate_Due_Date: ${(err as Error).message}`, "Task_Populate_Due_Date");
  }

  // --- Flow 27: Send Email Alert to Freelancer (log notification) ---
  try {
    if (task.ownerId) {
      await createLog(
        "Flow",
        `Aufgabenbenachrichtigung für ${task.ownerId}: Neue Aufgabe "${task.subject}" zugewiesen`,
        "Task_Send_Email_Alert_to_Freelancer",
        JSON.stringify({
          taskId: task.id,
          subject: task.subject,
          description: task.description,
          dueDate: task.dueDate,
          priority: task.priority,
          ownerId: task.ownerId,
          opportunityId: task.opportunityId,
          accountId: task.accountId,
        })
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Task_Email_Alert: ${(err as Error).message}`, "Task_Send_Email_Alert_to_Freelancer");
  }

  // --- Flow 28: Log a call for face of opportunity ---
  // After task creation, update last activity timestamp on the related opportunity
  try {
    if (task.opportunityId) {
      await db
        .update(schema.opportunities)
        .set({ updatedAt: now() })
        .where(eq(schema.opportunities.id, task.opportunityId));
      await createLog(
        "Flow",
        `Letzte Aktivität auf Opportunity ${task.opportunityId} aktualisiert durch neue Aufgabe ${task.id}`,
        "Log_a_call_for_face_of_opportunity"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Log_a_call: ${(err as Error).message}`, "Log_a_call_for_face_of_opportunity");
  }
}

/**
 * After a Task is deleted.
 * Implements:
 *   Flow 24: Count_Task_On_opp (recount tasks on opportunity)
 */
export async function afterTaskDelete(task: any): Promise<void> {
  // --- Flow 24: Count_Task_On_opp ---
  try {
    if (task.opportunityId) {
      const [result] = await db
        .select({ count: sql<number>`count(*)` })
        .from(schema.tasks)
        .where(eq(schema.tasks.opportunityId, task.opportunityId));
      const count = result?.count ?? 0;
      await db
        .update(schema.opportunities)
        .set({ taskCount: count, updatedAt: now() })
        .where(eq(schema.opportunities.id, task.opportunityId));
      await createLog(
        "Flow",
        `Aufgabenanzahl auf Opportunity ${task.opportunityId} nach Löschung aktualisiert: ${count}`,
        "Count_Task_On_opp_after_delete"
      );
    }
  } catch (err) {
    await createLog("Error", `Fehler bei Count_Task_On_opp (Delete): ${(err as Error).message}`, "Count_Task_On_opp_after_delete");
  }
}

// =============================================================================
// SCHEDULED / BATCH FLOWS
// =============================================================================

/**
 * Scheduled flow: Process all buchungen where checkout has passed.
 * Implements:
 *   Flow 3: Update_Buchungsphase (batch update for all active buchungen)
 *   Flow 4: Booking_Schedule_Send_review_link_to_contact
 *
 * This should be called periodically (e.g. daily via cron or setInterval).
 */
export async function runScheduledBuchungFlows(): Promise<void> {
  const todayStr = today();

  // --- Flow 3 (Batch): Update buchungsphase based on dates ---
  try {
    // Set "Aktiv" for buchungen where checkIn <= today and checkOut > today
    const activatedResult = await db
      .update(schema.buchungen)
      .set({ buchungsphase: "Aktiv", updatedAt: now() })
      .where(
        and(
          sql`date(check_in) <= date(${todayStr})`,
          sql`date(check_out) > date(${todayStr})`,
          not(eq(schema.buchungen.buchungsphase, "Aktiv")),
          not(eq(schema.buchungen.buchungsphase, "Storniert")),
          not(eq(schema.buchungen.buchungsphase, "Verloren"))
        )
      );
    await createLog(
      "Flow",
      `Scheduled: Buchungsphase-Update auf "Aktiv" durchgeführt`,
      "Update_Buchungsphase_Scheduled"
    );
  } catch (err) {
    await createLog("Error", `Fehler bei scheduled Update_Buchungsphase (Aktiv): ${(err as Error).message}`, "Update_Buchungsphase_Scheduled");
  }

  try {
    // Set "Abgeschlossen" for buchungen where checkOut <= today
    const completedResult = await db
      .update(schema.buchungen)
      .set({ buchungsphase: "Abgeschlossen", updatedAt: now() })
      .where(
        and(
          sql`date(check_out) <= date(${todayStr})`,
          not(eq(schema.buchungen.buchungsphase, "Abgeschlossen")),
          not(eq(schema.buchungen.buchungsphase, "Storniert")),
          not(eq(schema.buchungen.buchungsphase, "Verloren"))
        )
      );
    await createLog(
      "Flow",
      `Scheduled: Buchungsphase-Update auf "Abgeschlossen" durchgeführt`,
      "Update_Buchungsphase_Scheduled"
    );
  } catch (err) {
    await createLog("Error", `Fehler bei scheduled Update_Buchungsphase (Abgeschlossen): ${(err as Error).message}`, "Update_Buchungsphase_Scheduled");
  }

  // --- Flow 4 (Batch): Mark review links as sent for completed bookings ---
  try {
    await db
      .update(schema.buchungen)
      .set({ reviewLinkSent: true, updatedAt: now() })
      .where(
        and(
          sql`date(check_out) <= date(${todayStr})`,
          eq(schema.buchungen.reviewLinkSent, false),
          eq(schema.buchungen.buchungsphase, "Abgeschlossen")
        )
      );
    await createLog(
      "Flow",
      `Scheduled: Review-Links für abgeschlossene Buchungen als gesendet markiert`,
      "Booking_Schedule_Send_review_link_Scheduled"
    );
  } catch (err) {
    await createLog("Error", `Fehler bei scheduled review_link: ${(err as Error).message}`, "Booking_Schedule_Send_review_link_Scheduled");
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Recalculate price fields with 7% MwSt for a buchung.
 * Flow 5: X7_MWST
 */
async function recalculate7PercentMwst(buchung: any): Promise<void> {
  const preisProNacht = buchung.preisProNacht || 0;
  const anzahlNaechte = buchung.anzahlNaechte || 0;

  const unterkunftskostenNetto = preisProNacht * anzahlNaechte;
  const mwstBetrag = unterkunftskostenNetto * 0.07;
  const unterkunftskostenBrutto = unterkunftskostenNetto * 1.07;

  // Round to 2 decimal places
  const roundedNetto = Math.round(unterkunftskostenNetto * 100) / 100;
  const roundedBrutto = Math.round(unterkunftskostenBrutto * 100) / 100;
  const roundedMwst = Math.round(mwstBetrag * 100) / 100;

  await db
    .update(schema.buchungen)
    .set({
      unterkunftskostenNetto: roundedNetto,
      unterkunftskostenBrutto: roundedBrutto,
      mwstBetrag: roundedMwst,
      mwstSatz: 7,
      updatedAt: now(),
    })
    .where(eq(schema.buchungen.id, buchung.id));

  await createLog(
    "Flow",
    `7% MwSt berechnet für Buchung ${buchung.id}: Netto ${roundedNetto} EUR, MwSt ${roundedMwst} EUR, Brutto ${roundedBrutto} EUR`,
    "X7_MWST",
    JSON.stringify({
      buchungId: buchung.id,
      preisProNacht,
      anzahlNaechte,
      unterkunftskostenNetto: roundedNetto,
      unterkunftskostenBrutto: roundedBrutto,
      mwstBetrag: roundedMwst,
    })
  );
}

/**
 * Update opportunity.amount by summing all related buchungen.gesamtPreis.
 * Used by Flow 11 and Flow 16.
 */
async function updateOpportunityAmount(opportunityId: string): Promise<void> {
  const [result] = await db
    .select({
      total: sql<number>`COALESCE(SUM(gesamt_preis), 0)`,
    })
    .from(schema.buchungen)
    .where(eq(schema.buchungen.opportunityId, opportunityId));

  const totalAmount = result?.total ?? 0;

  await db
    .update(schema.opportunities)
    .set({ amount: totalAmount, updatedAt: now() })
    .where(eq(schema.opportunities.id, opportunityId));

  await createLog(
    "Flow",
    `Opportunity-Betrag für ${opportunityId} aktualisiert: ${totalAmount.toFixed(2)} EUR`,
    "Update_opportunity_Amount"
  );
}

/**
 * Calculate aufnahmeProzent (completeness percentage) for an Unterkunft.
 * Flow 8: PropertyStatus_Update
 *
 * Required fields for a complete property listing:
 */
function calculateAufnahmeProzent(unterkunft: any): number {
  const requiredFields = [
    "name",
    "vermieterId",
    "strasse",
    "hausnummer",
    "plz",
    "ort",
    "unterkunftsTyp",
    "anzahlZimmer",
    "anzahlBetten",
    "anzahlBadezimmer",
    "maxPersonen",
    "wohnflaeche",
    "preisProNacht",
    "beschreibung",
    "titelbild",
    "bildUrls",
    "vermieterVorname",
    "vermieterNachname",
    "vermieterTelefon",
    "vermieterEmail",
  ];

  let filledCount = 0;
  for (const field of requiredFields) {
    const value = unterkunft[field];
    if (value !== null && value !== undefined && value !== "" && value !== 0) {
      filledCount++;
    }
  }

  return Math.round((filledCount / requiredFields.length) * 100);
}

/**
 * Generate exacteUnterkunftsbezeichnung from address components.
 * Flow 9: Property_Validation_for_Exacte_Unterkunftsbezeichnung
 *
 * Format: unterkunftsTyp + " " + strasse + " " + hausnummer + ", " + plz + " " + ort
 */
function generateExacteBezeichnung(unterkunft: any): string | null {
  const parts = [];

  if (unterkunft.unterkunftsTyp) {
    parts.push(unterkunft.unterkunftsTyp);
  }

  const addressParts = [];
  if (unterkunft.strasse) {
    addressParts.push(unterkunft.strasse);
  }
  if (unterkunft.hausnummer) {
    addressParts.push(unterkunft.hausnummer);
  }

  if (addressParts.length > 0) {
    parts.push(addressParts.join(" "));
  }

  const locationParts = [];
  if (unterkunft.plz) {
    locationParts.push(unterkunft.plz);
  }
  if (unterkunft.ort) {
    locationParts.push(unterkunft.ort);
  }

  if (locationParts.length > 0) {
    // Add comma separator between address and location
    if (parts.length > 0) {
      const lastPart = parts.pop();
      parts.push(lastPart + ",");
    }
    parts.push(locationParts.join(" "));
  }

  const result = parts.join(" ").trim();
  return result.length > 0 ? result : null;
}
