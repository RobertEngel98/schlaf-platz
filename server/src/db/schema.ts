import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// ============================================================================
// USERS (CRM Benutzer)
// ============================================================================
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  role: text("role").default("user"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// ACCOUNTS
// ============================================================================
export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  recordType: text("record_type").notNull().default("Account_Standart"),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  industry: text("industry"),
  billingStreet: text("billing_street"),
  billingCity: text("billing_city"),
  billingPostalCode: text("billing_postal_code"),
  billingState: text("billing_state"),
  billingCountry: text("billing_country"),
  shippingStreet: text("shipping_street"),
  shippingCity: text("shipping_city"),
  shippingPostalCode: text("shipping_postal_code"),
  shippingState: text("shipping_state"),
  shippingCountry: text("shipping_country"),
  keyAccountManagerId: text("key_account_manager_id"),
  anzahlBuchungen: integer("anzahl_buchungen").default(0),
  anzahlUnterkuenfte: integer("anzahl_unterkuenfte").default(0),
  vermieterNummer: text("vermieter_nummer"),
  vermieterStatus: text("vermieter_status"),
  steuerNummer: text("steuer_nummer"),
  iban: text("iban"),
  bic: text("bic"),
  bankName: text("bank_name"),
  ownerId: text("owner_id"),
  description: text("description"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// CONTACTS
// ============================================================================
export const contacts = sqliteTable("contacts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").references(() => accounts.id),
  salutation: text("salutation"),
  firstName: text("first_name"),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  mobilePhone: text("mobile_phone"),
  title: text("title"),
  mailingStreet: text("mailing_street"),
  mailingCity: text("mailing_city"),
  mailingPostalCode: text("mailing_postal_code"),
  mailingState: text("mailing_state"),
  mailingCountry: text("mailing_country"),
  baustellenleiterCapo: text("baustellenleiter_capo"),
  kontaktUnterkunft: text("kontakt_unterkunft"),
  ownerId: text("owner_id"),
  description: text("description"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// LEADS
// ============================================================================
export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  recordType: text("record_type").default("Lead"),
  salutation: text("salutation"),
  firstName: text("first_name"),
  lastName: text("last_name").notNull(),
  company: text("company"),
  email: text("email"),
  phone: text("phone"),
  mobilePhone: text("mobile_phone"),
  status: text("status").notNull().default("Neu"),
  source: text("source"),
  street: text("street"),
  city: text("city"),
  postalCode: text("postal_code"),
  state: text("state"),
  country: text("country"),
  keyAccountManagerId: text("key_account_manager_id"),
  lossReason: text("loss_reason"),
  campaignId: text("campaign_id"),
  nurtureStage: text("nurture_stage"),
  ownerId: text("owner_id"),
  description: text("description"),
  convertedAccountId: text("converted_account_id"),
  convertedContactId: text("converted_contact_id"),
  convertedOpportunityId: text("converted_opportunity_id"),
  convertedDate: text("converted_date"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// OPPORTUNITIES
// ============================================================================
export const opportunities = sqliteTable("opportunities", {
  id: text("id").primaryKey(),
  recordType: text("record_type").default("Kunde_zu_Vermieter"),
  name: text("name").notNull(),
  accountId: text("account_id").references(() => accounts.id),
  contactId: text("contact_id").references(() => contacts.id),
  stage: text("stage").notNull().default("Qualifizierung"),
  amount: real("amount"),
  closeDate: text("close_date"),
  probability: integer("probability"),
  lossReason: text("loss_reason"),
  searchTimeMinutes: integer("search_time_minutes").default(0),
  searchStartDate: text("search_start_date"),
  searchEndDate: text("search_end_date"),
  taskCount: integer("task_count").default(0),
  keyAccountManagerId: text("key_account_manager_id"),
  ownerId: text("owner_id"),
  description: text("description"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// FREELANCERS
// ============================================================================
export const freelancers = sqliteTable("freelancers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  telefon: text("telefon"),
  rolle: text("rolle"),
  status: text("status").default("Aktiv"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// UNTERKÜNFTE (Properties)
// ============================================================================
export const unterkuenfte = sqliteTable("unterkuenfte", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  vermieterId: text("vermieter_id").references(() => accounts.id),
  freelancerId: text("freelancer_id").references(() => freelancers.id),
  strasse: text("strasse"),
  hausnummer: text("hausnummer"),
  plz: text("plz"),
  ort: text("ort"),
  bundesland: text("bundesland"),
  land: text("land").default("Deutschland"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  exacteUnterkunftsbezeichnung: text("exacte_unterkunftsbezeichnung"),
  unterkunftsTyp: text("unterkunfts_typ"),
  status: text("status").default("In Bearbeitung"),
  aufnahmeStatus: text("aufnahme_status"),
  aufnahmeProzent: integer("aufnahme_prozent").default(0),
  anzahlZimmer: integer("anzahl_zimmer"),
  anzahlBetten: integer("anzahl_betten"),
  anzahlBadezimmer: integer("anzahl_badezimmer"),
  maxPersonen: integer("max_personen"),
  wohnflaeche: real("wohnflaeche"),
  preisProNacht: real("preis_pro_nacht"),
  preisProNachtInklMwst: real("preis_pro_nacht_inkl_mwst"),
  reinigungskosten: real("reinigungskosten"),
  reinigungskostenInklMwst: real("reinigungskosten_inkl_mwst"),
  kaution: real("kaution"),
  provisionProzent: real("provision_prozent"),
  provisionBetrag: real("provision_betrag"),
  steuersatzUnterkunft: text("steuersatz_unterkunft"),
  steuersatzReinigung: text("steuersatz_reinigung"),
  mindestaufenthalt: integer("mindestaufenthalt"),
  mwstSatz: real("mwst_satz").default(7),
  kueche: integer("kueche", { mode: "boolean" }).default(false),
  waschmaschine: integer("waschmaschine", { mode: "boolean" }).default(false),
  trockner: integer("trockner", { mode: "boolean" }).default(false),
  wlan: integer("wlan", { mode: "boolean" }).default(false),
  parkplatz: integer("parkplatz", { mode: "boolean" }).default(false),
  aufzug: integer("aufzug", { mode: "boolean" }).default(false),
  balkon: integer("balkon", { mode: "boolean" }).default(false),
  terrasse: integer("terrasse", { mode: "boolean" }).default(false),
  garten: integer("garten", { mode: "boolean" }).default(false),
  klimaanlage: integer("klimaanlage", { mode: "boolean" }).default(false),
  haustiere: integer("haustiere", { mode: "boolean" }).default(false),
  rauchen: integer("rauchen", { mode: "boolean" }).default(false),
  bettwaesche: integer("bettwaesche", { mode: "boolean" }).default(false),
  handtuecher: integer("handtuecher", { mode: "boolean" }).default(false),
  fernseher: integer("fernseher", { mode: "boolean" }).default(false),
  geschirrspueler: integer("geschirrspueler", { mode: "boolean" }).default(false),
  mikrowelle: integer("mikrowelle", { mode: "boolean" }).default(false),
  backofen: integer("backofen", { mode: "boolean" }).default(false),
  kuehlschrank: integer("kuehlschrank", { mode: "boolean" }).default(false),
  kaffeemaschine: integer("kaffeemaschine", { mode: "boolean" }).default(false),
  vermieterVorname: text("vermieter_vorname"),
  vermieterNachname: text("vermieter_nachname"),
  vermieterTelefon: text("vermieter_telefon"),
  vermieterEmail: text("vermieter_email"),
  vermieterAnrede: text("vermieter_anrede"),
  titleEn: text("title_en"),
  descriptionEn: text("description_en"),
  cityEn: text("city_en"),
  googleDriveFolderId: text("google_drive_folder_id"),
  googleDriveFolderUrl: text("google_drive_folder_url"),
  hasGoogleDriveFolder: integer("has_google_drive_folder", { mode: "boolean" }).default(false),
  anzahlBuchungen: integer("anzahl_buchungen").default(0),
  beschreibung: text("beschreibung"),
  interneNotizen: text("interne_notizen"),
  anreiseBeschreibung: text("anreise_beschreibung"),
  hausregeln: text("hausregeln"),
  titelbild: text("titelbild"),
  bildUrls: text("bild_urls"),
  ownerId: text("owner_id"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// BUCHUNGEN (Bookings)
// ============================================================================
export const buchungen = sqliteTable("buchungen", {
  id: text("id").primaryKey(),
  buchungsNummer: text("buchungs_nummer"),
  recordType: text("record_type").notNull().default("Buchung"),
  accountId: text("account_id").references(() => accounts.id),
  contactId: text("contact_id").references(() => contacts.id),
  opportunityId: text("opportunity_id").references(() => opportunities.id),
  unterkunftId: text("unterkunft_id").references(() => unterkuenfte.id),
  buchungsphase: text("buchungsphase").notNull().default("Neu"),
  checkIn: text("check_in"),
  checkOut: text("check_out"),
  anzahlNaechte: integer("anzahl_naechte"),
  anzahlGaeste: integer("anzahl_gaeste"),
  gastName: text("gast_name"),
  gastTelefon: text("gast_telefon"),
  gastEmail: text("gast_email"),
  preisProNacht: real("preis_pro_nacht"),
  gesamtPreis: real("gesamt_preis"),
  unterkunftskostenNetto: real("unterkunftskosten_netto"),
  unterkunftskostenBrutto: real("unterkunftskosten_brutto"),
  unterkunftskostenGesamtInkl19Netto: real("unterkunftskosten_gesamt_inkl_19_netto"),
  reinigungskosten: real("reinigungskosten"),
  reinigungskostenInklMwst: real("reinigungskosten_inkl_mwst"),
  kaution: real("kaution"),
  kautionStatus: text("kaution_status"),
  provision: real("provision"),
  provisionProzent: real("provision_prozent"),
  mwstSatz: real("mwst_satz"),
  mwstBetrag: real("mwst_betrag"),
  steuersatzReinigung: text("steuersatz_reinigung"),
  rechnungsNummer: text("rechnungs_nummer"),
  rechnungsDatum: text("rechnungs_datum"),
  rechnungsBetrag: real("rechnungs_betrag"),
  fastbillInvoiceId: text("fastbill_invoice_id"),
  datevExported: integer("datev_exported", { mode: "boolean" }).default(false),
  vermieterAbrechnungBetrag: real("vermieter_abrechnung_betrag"),
  vermieterAbrechnungDatum: text("vermieter_abrechnung_datum"),
  vermieterAbrechnungStatus: text("vermieter_abrechnung_status"),
  stornierungsGrund: text("stornierungsgrund"),
  stornierungsDatum: text("stornierungsdatum"),
  schadenBeschreibung: text("schaden_beschreibung"),
  schadenBetrag: real("schaden_betrag"),
  schadenStatus: text("schaden_status"),
  gutschriftGrund: text("gutschrift_grund"),
  gutschriftBetrag: real("gutschrift_betrag"),
  istProbewoche: integer("ist_probewoche", { mode: "boolean" }).default(false),
  probewochtUeberspringen: integer("probewoche_ueberspringen", { mode: "boolean" }).default(false),
  ursprungsbuchungId: text("ursprungsbuchung_id"),
  lossReason: text("loss_reason"),
  baustellenleiterCapo: text("baustellenleiter_capo"),
  kontaktUnterkunft: text("kontakt_unterkunft"),
  reviewLinkSent: integer("review_link_sent", { mode: "boolean" }).default(false),
  reviewRating: integer("review_rating"),
  fileIds: text("file_ids"),
  ownerId: text("owner_id"),
  beschreibung: text("beschreibung"),
  interneNotizen: text("interne_notizen"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// ANGEBOTE
// ============================================================================
export const angebote = sqliteTable("angebote", {
  id: text("id").primaryKey(),
  angebotNummer: text("angebot_nummer"),
  name: text("name").notNull(),
  accountId: text("account_id").references(() => accounts.id),
  contactId: text("contact_id").references(() => contacts.id),
  opportunityId: text("opportunity_id").references(() => opportunities.id),
  unterkunftId: text("unterkunft_id").references(() => unterkuenfte.id),
  status: text("status").default("Entwurf"),
  gueltigBis: text("gueltig_bis"),
  checkIn: text("check_in"),
  checkOut: text("check_out"),
  anzahlNaechte: integer("anzahl_naechte"),
  anzahlPersonen: integer("anzahl_personen"),
  preisProNacht: real("preis_pro_nacht"),
  gesamtPreis: real("gesamt_preis"),
  reinigungskosten: real("reinigungskosten"),
  kaution: real("kaution"),
  mwstSatz: real("mwst_satz"),
  pdfUrl: text("pdf_url"),
  pdfGeneratedAt: text("pdf_generated_at"),
  sprache: text("sprache").default("DE"),
  ownerId: text("owner_id"),
  beschreibung: text("beschreibung"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// VERMIETER ÜBERSICHT
// ============================================================================
export const vermieterUebersicht = sqliteTable("vermieter_uebersicht", {
  id: text("id").primaryKey(),
  accountId: text("account_id").references(() => accounts.id),
  name: text("name").notNull(),
  anrede: text("anrede"),
  vorname: text("vorname"),
  nachname: text("nachname"),
  telefon: text("telefon"),
  email: text("email"),
  iban: text("iban"),
  bic: text("bic"),
  bankName: text("bank_name"),
  kontoinhaber: text("kontoinhaber"),
  steuerNummer: text("steuer_nummer"),
  ustIdNr: text("ust_id_nr"),
  vertragsBeginn: text("vertrags_beginn"),
  vertragsEnde: text("vertrags_ende"),
  provisionSatz: real("provision_satz"),
  anzahlUnterkuenfte: integer("anzahl_unterkuenfte").default(0),
  anzahlBuchungen: integer("anzahl_buchungen").default(0),
  gesamtUmsatz: real("gesamt_umsatz").default(0),
  status: text("status").default("Aktiv"),
  notizen: text("notizen"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// STUNDENERFASSUNG
// ============================================================================
export const stundenerfassung = sqliteTable("stundenerfassung", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  userName: text("user_name"),
  stunden: real("stunden").notNull(),
  datum: text("datum").notNull(),
  fuerWen: text("fuer_wen").notNull(),
  beschreibung: text("beschreibung"),
  kategorie: text("kategorie"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// SEARCH TIMERS
// ============================================================================
export const searchTimers = sqliteTable("search_timers", {
  id: text("id").primaryKey(),
  opportunityId: text("opportunity_id").references(() => opportunities.id),
  startTime: text("start_time"),
  endTime: text("end_time"),
  durationMinutes: integer("duration_minutes"),
  createdAt: text("created_at").notNull(),
});

// ============================================================================
// LOGS
// ============================================================================
export const logs = sqliteTable("logs", {
  id: text("id").primaryKey(),
  type: text("type"),
  message: text("message"),
  source: text("source"),
  details: text("details"),
  severity: text("severity").default("Info"),
  createdAt: text("created_at").notNull(),
});

// ============================================================================
// BOOKING FILES
// ============================================================================
export const bookingFiles = sqliteTable("booking_files", {
  id: text("id").primaryKey(),
  buchungId: text("buchung_id").references(() => buchungen.id),
  filename: text("filename").notNull(),
  originalName: text("original_name"),
  mimeType: text("mime_type"),
  size: integer("size"),
  url: text("url"),
  createdAt: text("created_at").notNull(),
});

// ============================================================================
// TASKS
// ============================================================================
export const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  subject: text("subject").notNull(),
  description: text("description"),
  status: text("status").default("Offen"),
  priority: text("priority").default("Normal"),
  dueDate: text("due_date"),
  accountId: text("account_id").references(() => accounts.id),
  contactId: text("contact_id").references(() => contacts.id),
  opportunityId: text("opportunity_id").references(() => opportunities.id),
  leadId: text("lead_id").references(() => leads.id),
  keyAccountManagerId: text("key_account_manager_id"),
  ownerId: text("owner_id"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// CASES
// ============================================================================
export const cases = sqliteTable("cases", {
  id: text("id").primaryKey(),
  recordType: text("record_type").default("Standart_Case"),
  subject: text("subject").notNull(),
  description: text("description"),
  status: text("status").default("Neu"),
  priority: text("priority").default("Normal"),
  origin: text("origin"),
  accountId: text("account_id").references(() => accounts.id),
  contactId: text("contact_id").references(() => contacts.id),
  ownerId: text("owner_id"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// LIST VIEWS (Gespeicherte Listenansichten pro Nutzer)
// ============================================================================
export const listViews = sqliteTable("list_views", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  entity: text("entity").notNull(), // 'accounts', 'contacts', 'leads', etc.
  name: text("name").notNull(),
  isDefault: integer("is_default", { mode: "boolean" }).default(false),
  isPinned: integer("is_pinned", { mode: "boolean" }).default(false),
  filters: text("filters"), // JSON: [{field, operator, value}]
  visibleColumns: text("visible_columns"), // JSON: ["name","email",...]
  sortField: text("sort_field"),
  sortOrder: text("sort_order").default("asc"),
  viewMode: text("view_mode").default("table"), // 'table', 'kanban', 'cards'
  kanbanField: text("kanban_field"), // field to group kanban by
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// SALESFORCE ANPASSUNGEN
// ============================================================================
export const salesforceAnpassungen = sqliteTable("salesforce_anpassungen", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  beschreibung: text("beschreibung"),
  status: text("status"),
  prioritaet: text("prioritaet"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ============================================================================
// RELATIONS
// ============================================================================
export const accountsRelations = relations(accounts, ({ many }) => ({
  contacts: many(contacts),
  opportunities: many(opportunities),
  buchungen: many(buchungen),
  unterkuenfte: many(unterkuenfte),
  angebote: many(angebote),
  cases: many(cases),
}));

export const contactsRelations = relations(contacts, ({ one }) => ({
  account: one(accounts, { fields: [contacts.accountId], references: [accounts.id] }),
}));

export const opportunitiesRelations = relations(opportunities, ({ one, many }) => ({
  account: one(accounts, { fields: [opportunities.accountId], references: [accounts.id] }),
  contact: one(contacts, { fields: [opportunities.contactId], references: [contacts.id] }),
  buchungen: many(buchungen),
  angebote: many(angebote),
  searchTimers: many(searchTimers),
}));

export const unterkuenfteRelations = relations(unterkuenfte, ({ one, many }) => ({
  vermieter: one(accounts, { fields: [unterkuenfte.vermieterId], references: [accounts.id] }),
  freelancer: one(freelancers, { fields: [unterkuenfte.freelancerId], references: [freelancers.id] }),
  buchungen: many(buchungen),
}));

export const buchungenRelations = relations(buchungen, ({ one, many }) => ({
  account: one(accounts, { fields: [buchungen.accountId], references: [accounts.id] }),
  contact: one(contacts, { fields: [buchungen.contactId], references: [contacts.id] }),
  opportunity: one(opportunities, { fields: [buchungen.opportunityId], references: [opportunities.id] }),
  unterkunft: one(unterkuenfte, { fields: [buchungen.unterkunftId], references: [unterkuenfte.id] }),
  files: many(bookingFiles),
}));

export const angeboteRelations = relations(angebote, ({ one }) => ({
  account: one(accounts, { fields: [angebote.accountId], references: [accounts.id] }),
  contact: one(contacts, { fields: [angebote.contactId], references: [contacts.id] }),
  opportunity: one(opportunities, { fields: [angebote.opportunityId], references: [opportunities.id] }),
  unterkunft: one(unterkuenfte, { fields: [angebote.unterkunftId], references: [unterkuenfte.id] }),
}));

export const searchTimersRelations = relations(searchTimers, ({ one }) => ({
  opportunity: one(opportunities, { fields: [searchTimers.opportunityId], references: [opportunities.id] }),
}));

export const bookingFilesRelations = relations(bookingFiles, ({ one }) => ({
  buchung: one(buchungen, { fields: [bookingFiles.buchungId], references: [buchungen.id] }),
}));
