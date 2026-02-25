// =============================================================================
// Salesforce Validation Rules - Replicated as reusable validation functions
// =============================================================================
// All 13 Salesforce Validation Rules implemented with EXACT German error messages.
// Each function throws a ValidationError if the rule is violated.
// =============================================================================

/**
 * Custom error class for validation failures.
 * Carries a 400 status code for use in HTTP responses.
 */
export class ValidationError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// =============================================================================
// Helper: Check if a value is blank (null, undefined, empty string, whitespace)
// =============================================================================
function isBlank(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  return false;
}

// =============================================================================
// SPAM DETECTION HELPERS (Rule #2: To_Avoid_spam_Lead)
// =============================================================================

/** List of disposable / throwaway email domains */
const DISPOSABLE_EMAIL_DOMAINS = [
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "tempmail.com",
  "throwaway.email",
  "temp-mail.org",
  "fakeinbox.com",
  "sharklasers.com",
  "guerrillamailblock.com",
  "grr.la",
  "dispostable.com",
  "yopmail.com",
  "trashmail.com",
  "trashmail.net",
  "trashmail.org",
  "mailnesia.com",
  "maildrop.cc",
  "discard.email",
  "tempail.com",
  "mohmal.com",
  "getnada.com",
  "emailondeck.com",
  "33mail.com",
  "mailcatch.com",
  "10minutemail.com",
  "minutemail.com",
  "tempr.email",
  "burnermail.io",
  "harakirimail.com",
];

/** Known spam keywords (case-insensitive matching) */
const SPAM_KEYWORDS = [
  "viagra",
  "cialis",
  "casino",
  "lottery",
  "prize",
  "winner",
  "crypto scam",
  "free bitcoin",
  "forex trading",
  "make money fast",
  "click here",
  "buy now",
  "act now",
  "limited time",
  "nigerian prince",
  "wire transfer",
  "dear friend",
  "congratulations you won",
  "online pharmacy",
  "weight loss",
  "earn extra cash",
  "double your income",
];

/**
 * Checks a single text field for spam patterns.
 * Returns true if the text is likely spam.
 */
function isSpamText(text: string): boolean {
  if (!text || typeof text !== "string") return false;

  // 1. Check for repeated characters (e.g. "aaaaaa", "!!!!!!") - 4+ repetitions
  if (/(.)\1{3,}/i.test(text)) return true;

  // 2. Check for too many URLs (2 or more)
  const urlCount = (text.match(/https?:\/\//gi) || []).length;
  if (urlCount >= 2) return true;

  // 3. Check for known spam keywords
  const lowerText = text.toLowerCase();
  for (const keyword of SPAM_KEYWORDS) {
    if (lowerText.includes(keyword)) return true;
  }

  // 4. Check for all-caps text longer than 50 characters (ignoring spaces)
  const capsOnly = text.replace(/[^A-Z]/g, "");
  const alphaOnly = text.replace(/[^A-Za-z]/g, "");
  if (alphaOnly.length > 50 && capsOnly.length === alphaOnly.length) return true;

  return false;
}

/**
 * Checks if an email address uses a disposable domain.
 */
function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return DISPOSABLE_EMAIL_DOMAINS.includes(domain);
}

// =============================================================================
// RULE #1: check_Stage (Opportunity)
// =============================================================================
// When the Opportunity stage changes, a task must be created.
// The caller is responsible for checking taskCount / actually creating the task.
// This validator ensures the stage change is accompanied by a task.
// =============================================================================

/**
 * Validates an Opportunity stage change.
 *
 * @param data - The new/updated Opportunity data
 * @param oldData - The existing Opportunity data (before update)
 * @param options.hasRelatedTask - Whether a task has been created for this stage change
 *
 * @throws ValidationError if the stage changes and no task has been created
 */
export function validateOpportunityStageChange(
  data: Record<string, unknown>,
  oldData?: Record<string, unknown>,
  options?: { hasRelatedTask?: boolean }
): void {
  // Only applies when the stage is actually changing
  if (!oldData || !data.stage) return;
  if (data.stage === oldData.stage) return;

  // If the caller explicitly confirms no task was created, reject
  if (options && options.hasRelatedTask === false) {
    throw new ValidationError("Bitte eine Aufgabe Erstellen !");
  }
}

// =============================================================================
// RULE #2: To_Avoid_spam_Lead (Lead)
// =============================================================================
// When a Lead is created, check all text fields for spam patterns.
// =============================================================================

/**
 * Validates a Lead on creation for spam patterns.
 * Checks all text fields for: repeated chars, multiple URLs, known spam words,
 * all-caps text > 50 chars, and disposable email domains.
 *
 * @param data - The Lead data being created
 * @throws ValidationError if spam patterns are detected
 */
export function validateLeadCreate(data: Record<string, unknown>): void {
  // Rule #2: Spam detection
  const textFields: string[] = [
    data.firstName,
    data.lastName,
    data.company,
    data.email,
    data.phone,
    data.mobilePhone,
    data.street,
    data.city,
    data.state,
    data.country,
    data.description,
    data.source,
  ].filter((v): v is string => typeof v === "string" && v.length > 0);

  for (const field of textFields) {
    if (isSpamText(field)) {
      throw new ValidationError("spam lead not allowed");
    }
  }

  // Check email for disposable domains
  if (typeof data.email === "string" && isDisposableEmail(data.email)) {
    throw new ValidationError("spam lead not allowed");
  }
}

// =============================================================================
// RULE #3: Loss_Reason_eintragen (Opportunity)
// =============================================================================
// When an Opportunity is set to "Verloren" or "Closed Lost", lossReason must
// be filled.
// =============================================================================

/**
 * Validates that an Opportunity has a lossReason when moved to a lost stage.
 * Applied during both create and update.
 *
 * @param data - The Opportunity data
 * @param oldData - The existing Opportunity data (for updates)
 * @throws ValidationError if stage is lost and lossReason is blank
 */
export function validateOpportunityLossReason(
  data: Record<string, unknown>,
  oldData?: Record<string, unknown>
): void {
  const stage = (data.stage ?? oldData?.stage) as string | undefined;
  const lostStages = ["Verloren", "Closed Lost"];

  if (stage && lostStages.includes(stage)) {
    const lossReason = data.lossReason ?? oldData?.lossReason;
    if (isBlank(lossReason)) {
      throw new ValidationError(
        "Bitte gib einen Loss Reason ein damit du du die Opportunity Verschieben kannst."
      );
    }
  }
}

// =============================================================================
// RULE #4: Lead_auf_Verloren_setzen_nur_mit_Reason (Lead)
// =============================================================================
// When a Lead status is set to "Verloren", lossReason must be filled.
// =============================================================================

/**
 * Validates that a Lead has a lossReason when status is set to "Verloren".
 *
 * @param data - The updated Lead data
 * @param oldData - The existing Lead data (before update)
 * @throws ValidationError if status is "Verloren" and lossReason is blank
 */
export function validateLeadUpdate(
  data: Record<string, unknown>,
  oldData?: Record<string, unknown>
): void {
  const status = (data.status ?? oldData?.status) as string | undefined;

  if (status === "Verloren") {
    const lossReason = data.lossReason ?? oldData?.lossReason;
    if (isBlank(lossReason)) {
      throw new ValidationError(
        "Bitte Grund angeben warum der Lead Verloren wurde!"
      );
    }
  }
}

// =============================================================================
// RULE #5: Buchung_Verloren_Grund_eintragen (Buchung)
// RULE #8: Key_Contact_fields (Buchung)
// RULE #9: Steuersatz_Reinigung_Unterkunft_Mandtory (Buchung)
// RULE #12: Probewoche_beachten (Buchung)
// RULE #13: Ursprungsbuchung (Buchung)
// =============================================================================

/** Record types that count as "new" or "first" bookings for Probewoche rule */
const NEW_BOOKING_RECORD_TYPES = ["Buchung", "Feste_Objekt_Buchung"];

/** Record types that are follow-up types requiring an Ursprungsbuchung */
const FOLLOWUP_RECORD_TYPES = ["Gutschriften", "Stornos", "Schaden"];

/**
 * Validates a Buchung on creation.
 * Applies rules: #8 (Key_Contact_fields), #9 (Steuersatz_Reinigung),
 * #12 (Probewoche_beachten), #13 (Ursprungsbuchung).
 *
 * @param data - The Buchung data being created
 * @throws ValidationError if any validation rule is violated
 */
export function validateBuchungCreate(data: Record<string, unknown>): void {
  const recordType = (data.recordType as string) || "Buchung";

  // -------------------------------------------------------------------------
  // Rule #8: Key_Contact_fields
  // accountId, baustellenleiterCapo, kontaktUnterkunft must not be blank
  // -------------------------------------------------------------------------
  if (isBlank(data.accountId) || isBlank(data.baustellenleiterCapo) || isBlank(data.kontaktUnterkunft)) {
    throw new ValidationError(
      "Kontakt - Account, Baustellenleiter/Capo vor ORT and Kontakt - Unterkunft not be blank."
    );
  }

  // -------------------------------------------------------------------------
  // Rule #9: Steuersatz_Reinigung_Unterkunft_Mandtory
  // If reinigungskosten > 0, steuersatzReinigung must be selected
  // -------------------------------------------------------------------------
  const reinigungskosten = data.reinigungskosten as number | null | undefined;
  if (reinigungskosten !== null && reinigungskosten !== undefined && reinigungskosten > 0) {
    if (isBlank(data.steuersatzReinigung)) {
      throw new ValidationError("Select Steuersatz Reinigung Unterkunft");
    }
  }

  // -------------------------------------------------------------------------
  // Rule #12: Probewoche_beachten
  // For new bookings (Buchung, Feste_Objekt_Buchung): if anzahlNaechte > 7
  // and probewochtUeberspringen is NOT true, reject.
  // -------------------------------------------------------------------------
  if (NEW_BOOKING_RECORD_TYPES.includes(recordType)) {
    const anzahlNaechte = data.anzahlNaechte as number | null | undefined;
    const probewochtUeberspringen = data.probewochtUeberspringen === true;

    if (anzahlNaechte !== null && anzahlNaechte !== undefined && anzahlNaechte > 7 && !probewochtUeberspringen) {
      throw new ValidationError(
        "Du hast eine Neue Buchung oder Erstbuchung eingetragen. Damit du direkt mehr als 7 Nächte buchen kannst, musst du aktiv den Haken setzen, dadurch haftest du selber, falls etwas schief geht. Wenn du das Risiko nicht tragen willst, mache eine Probe Buchung."
      );
    }
  }

  // -------------------------------------------------------------------------
  // Rule #13: Ursprungsbuchung
  // For follow-up types (Gutschriften, Stornos, Schaden):
  // ursprungsbuchungId must not be blank.
  // -------------------------------------------------------------------------
  if (FOLLOWUP_RECORD_TYPES.includes(recordType)) {
    if (isBlank(data.ursprungsbuchungId)) {
      throw new ValidationError(
        "Fehlermeldung: Ursprungsbuchung muss ausgefüllt werden."
      );
    }
  }
}

/**
 * Validates a Buchung on update.
 * Applies rules: #5 (Buchung_Verloren_Grund_eintragen), #8 (Key_Contact_fields),
 * #9 (Steuersatz_Reinigung).
 *
 * @param data - The updated Buchung data
 * @param oldData - The existing Buchung data (before update)
 * @throws ValidationError if any validation rule is violated
 */
export function validateBuchungUpdate(
  data: Record<string, unknown>,
  oldData?: Record<string, unknown>
): void {
  // Merge: use new value if provided, otherwise fall back to old value
  const merged = (field: string): unknown =>
    field in data ? data[field] : oldData?.[field];

  // -------------------------------------------------------------------------
  // Rule #5: Buchung_Verloren_Grund_eintragen
  // When buchungsphase = "Verloren", lossReason must not be blank
  // -------------------------------------------------------------------------
  const buchungsphase = merged("buchungsphase") as string | undefined;
  if (buchungsphase === "Verloren") {
    const lossReason = merged("lossReason");
    if (isBlank(lossReason)) {
      throw new ValidationError(
        "Bitte gib einen grund an warum die Buchung verloren ist, bitte so exact wie es geht damit wir draus lernen."
      );
    }
  }

  // -------------------------------------------------------------------------
  // Rule #8: Key_Contact_fields
  // accountId, baustellenleiterCapo, kontaktUnterkunft must not be blank
  // -------------------------------------------------------------------------
  const accountId = merged("accountId");
  const baustellenleiterCapo = merged("baustellenleiterCapo");
  const kontaktUnterkunft = merged("kontaktUnterkunft");

  if (isBlank(accountId) || isBlank(baustellenleiterCapo) || isBlank(kontaktUnterkunft)) {
    throw new ValidationError(
      "Kontakt - Account, Baustellenleiter/Capo vor ORT and Kontakt - Unterkunft not be blank."
    );
  }

  // -------------------------------------------------------------------------
  // Rule #9: Steuersatz_Reinigung_Unterkunft_Mandtory
  // If reinigungskosten > 0, steuersatzReinigung must be selected
  // -------------------------------------------------------------------------
  const reinigungskosten = merged("reinigungskosten") as number | null | undefined;
  if (reinigungskosten !== null && reinigungskosten !== undefined && reinigungskosten > 0) {
    const steuersatzReinigung = merged("steuersatzReinigung");
    if (isBlank(steuersatzReinigung)) {
      throw new ValidationError("Select Steuersatz Reinigung Unterkunft");
    }
  }
}

// =============================================================================
// RULE #6: Vermieterfeld (Unterkunft)
// RULE #10: Freelancer_eintragung (Unterkunft)
// RULE #11: Unterkunftsaufnahme_100_Prozent_Vollstae (Unterkunft)
// =============================================================================

/**
 * Validates an Unterkunft on creation.
 * Applies rules: #6 (Vermieterfeld), #10 (Freelancer_eintragung).
 *
 * @param data - The Unterkunft data being created
 * @throws ValidationError if any validation rule is violated
 */
export function validateUnterkunftCreate(data: Record<string, unknown>): void {
  // -------------------------------------------------------------------------
  // Rule #6: Vermieterfeld
  // vermieterId must not be blank on create or update
  // -------------------------------------------------------------------------
  if (isBlank(data.vermieterId)) {
    throw new ValidationError(
      "Bitte lege Vermieter Account an. Du kannst nichts speichern wenn du dies nicht getan hast."
    );
  }

  // -------------------------------------------------------------------------
  // Rule #10: Freelancer_eintragung
  // freelancerId must not be blank on create
  // -------------------------------------------------------------------------
  if (isBlank(data.freelancerId)) {
    throw new ValidationError("Wer hat die Unterkunft erstellt ?");
  }
}

/**
 * Validates an Unterkunft on update.
 * Applies rules: #6 (Vermieterfeld), #11 (Unterkunftsaufnahme_100_Prozent_Vollstae).
 *
 * @param data - The updated Unterkunft data
 * @param oldData - The existing Unterkunft data (before update)
 * @throws ValidationError if any validation rule is violated
 */
export function validateUnterkunftUpdate(
  data: Record<string, unknown>,
  oldData?: Record<string, unknown>
): void {
  // Merge: use new value if provided, otherwise fall back to old value
  const merged = (field: string): unknown =>
    field in data ? data[field] : oldData?.[field];

  // -------------------------------------------------------------------------
  // Rule #6: Vermieterfeld
  // vermieterId must not be blank on create or update
  // -------------------------------------------------------------------------
  const vermieterId = merged("vermieterId");
  if (isBlank(vermieterId)) {
    throw new ValidationError(
      "Bitte lege Vermieter Account an. Du kannst nichts speichern wenn du dies nicht getan hast."
    );
  }

  // -------------------------------------------------------------------------
  // Rule #11: Unterkunftsaufnahme_100_Prozent_Vollstae
  // When status = "100% fertig" or aufnahmeProzent = 100, ALL mandatory
  // fields must be filled.
  // -------------------------------------------------------------------------
  const status = merged("status") as string | undefined;
  const aufnahmeProzent = merged("aufnahmeProzent") as number | undefined;

  if (status === "100% fertig" || aufnahmeProzent === 100) {
    const mandatoryFields: Array<{ key: string; label: string }> = [
      { key: "vermieterId", label: "Vermieter" },
      { key: "strasse", label: "Straße" },
      { key: "plz", label: "PLZ" },
      { key: "ort", label: "Ort" },
      { key: "unterkunftsTyp", label: "Unterkunftstyp" },
      { key: "anzahlZimmer", label: "Anzahl Zimmer" },
      { key: "anzahlBetten", label: "Anzahl Betten" },
      { key: "maxPersonen", label: "Max. Personen" },
      { key: "preisProNacht", label: "Preis pro Nacht" },
      { key: "vermieterVorname", label: "Vermieter Vorname" },
      { key: "vermieterNachname", label: "Vermieter Nachname" },
      { key: "vermieterTelefon", label: "Vermieter Telefon" },
    ];

    const hasEmptyMandatory = mandatoryFields.some(({ key }) => {
      const value = merged(key);
      // For numeric fields: 0 is considered blank (no rooms, no beds, etc.)
      if (typeof value === "number") return value === 0 || isNaN(value);
      return isBlank(value);
    });

    if (hasEmptyMandatory) {
      throw new ValidationError(
        'Der Status "100% fertig" kann nicht gesetzt werden. Bitte füllen Sie alle Pflichtfelder aus: Vermieter-Infos, Adresse, Unterkunftsdetails, Kapazitäten, Ausstattung, Preise und Zusatzinformationen.'
      );
    }
  }
}

// =============================================================================
// RULE #7: Pflichtfelder (Stundenerfassung)
// =============================================================================

/**
 * Validates a Stundenerfassung entry (create or update).
 * userId, stunden, datum, and fuerWen must all be filled.
 *
 * @param data - The Stundenerfassung data
 * @throws ValidationError if any required field is blank
 */
export function validateStundenerfassung(data: Record<string, unknown>): void {
  if (isBlank(data.userId) || isBlank(data.stunden) || isBlank(data.datum) || isBlank(data.fuerWen)) {
    throw new ValidationError(
      "Bitte füllen Sie alle Pflichtfelder aus: User, Stunden, Datum und Für wen hast du gearbeitet."
    );
  }

  // Also check that stunden is a valid positive number
  if (typeof data.stunden === "number" && (data.stunden <= 0 || isNaN(data.stunden))) {
    throw new ValidationError(
      "Bitte füllen Sie alle Pflichtfelder aus: User, Stunden, Datum und Für wen hast du gearbeitet."
    );
  }
}

// =============================================================================
// COMBINED VALIDATORS - Convenience functions that run all applicable rules
// for a given entity and operation in one call.
// =============================================================================

/**
 * Runs ALL Opportunity validation rules for an update operation.
 * Combines: #1 (check_Stage), #3 (Loss_Reason_eintragen).
 */
export function validateOpportunityUpdate(
  data: Record<string, unknown>,
  oldData: Record<string, unknown>,
  options?: { hasRelatedTask?: boolean }
): void {
  validateOpportunityStageChange(data, oldData, options);
  validateOpportunityLossReason(data, oldData);
}

/**
 * Runs ALL Lead validation rules for a create operation.
 * Combines: #2 (To_Avoid_spam_Lead).
 * Note: Rule #4 (loss reason) does not apply on create since status starts as "Neu".
 */
export function validateLeadCreateAll(data: Record<string, unknown>): void {
  validateLeadCreate(data);
}

/**
 * Runs ALL Lead validation rules for an update operation.
 * Combines: #4 (Lead_auf_Verloren_setzen_nur_mit_Reason).
 */
export function validateLeadUpdateAll(
  data: Record<string, unknown>,
  oldData?: Record<string, unknown>
): void {
  validateLeadUpdate(data, oldData);
}

/**
 * Runs ALL Buchung validation rules for a create operation.
 * Combines: #8, #9, #12, #13.
 */
export function validateBuchungCreateAll(data: Record<string, unknown>): void {
  validateBuchungCreate(data);
}

/**
 * Runs ALL Buchung validation rules for an update operation.
 * Combines: #5, #8, #9.
 */
export function validateBuchungUpdateAll(
  data: Record<string, unknown>,
  oldData?: Record<string, unknown>
): void {
  validateBuchungUpdate(data, oldData);
}

/**
 * Runs ALL Unterkunft validation rules for a create operation.
 * Combines: #6, #10.
 */
export function validateUnterkunftCreateAll(data: Record<string, unknown>): void {
  validateUnterkunftCreate(data);
}

/**
 * Runs ALL Unterkunft validation rules for an update operation.
 * Combines: #6, #11.
 */
export function validateUnterkunftUpdateAll(
  data: Record<string, unknown>,
  oldData?: Record<string, unknown>
): void {
  validateUnterkunftUpdate(data, oldData);
}

/**
 * Runs ALL Stundenerfassung validation rules.
 * Combines: #7.
 */
export function validateStundenerfassungAll(data: Record<string, unknown>): void {
  validateStundenerfassung(data);
}
