-- Schlaf-Platz CRM - Database Init
-- Basierend auf Salesforce Org 00D7Q000006GHUTUA4

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,
  record_type TEXT NOT NULL DEFAULT 'Account_Standart',
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  industry TEXT,
  billing_street TEXT,
  billing_city TEXT,
  billing_postal_code TEXT,
  billing_state TEXT,
  billing_country TEXT,
  shipping_street TEXT,
  shipping_city TEXT,
  shipping_postal_code TEXT,
  shipping_state TEXT,
  shipping_country TEXT,
  key_account_manager_id TEXT,
  anzahl_buchungen INTEGER DEFAULT 0,
  anzahl_unterkuenfte INTEGER DEFAULT 0,
  vermieter_nummer TEXT,
  vermieter_status TEXT,
  steuer_nummer TEXT,
  iban TEXT,
  bic TEXT,
  bank_name TEXT,
  owner_id TEXT,
  description TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  account_id TEXT REFERENCES accounts(id),
  salutation TEXT,
  first_name TEXT,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  mobile_phone TEXT,
  title TEXT,
  mailing_street TEXT,
  mailing_city TEXT,
  mailing_postal_code TEXT,
  mailing_state TEXT,
  mailing_country TEXT,
  baustellenleiter_capo TEXT,
  kontakt_unterkunft TEXT,
  owner_id TEXT,
  description TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  record_type TEXT DEFAULT 'Lead',
  salutation TEXT,
  first_name TEXT,
  last_name TEXT NOT NULL,
  company TEXT,
  email TEXT,
  phone TEXT,
  mobile_phone TEXT,
  status TEXT NOT NULL DEFAULT 'Neu',
  source TEXT,
  street TEXT,
  city TEXT,
  postal_code TEXT,
  state TEXT,
  country TEXT,
  key_account_manager_id TEXT,
  loss_reason TEXT,
  campaign_id TEXT,
  nurture_stage TEXT,
  owner_id TEXT,
  description TEXT,
  converted_account_id TEXT,
  converted_contact_id TEXT,
  converted_opportunity_id TEXT,
  converted_date TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS opportunities (
  id TEXT PRIMARY KEY,
  record_type TEXT DEFAULT 'Kunde_zu_Vermieter',
  name TEXT NOT NULL,
  account_id TEXT REFERENCES accounts(id),
  contact_id TEXT REFERENCES contacts(id),
  stage TEXT NOT NULL DEFAULT 'Qualifizierung',
  amount REAL,
  close_date TEXT,
  probability INTEGER,
  loss_reason TEXT,
  search_time_minutes INTEGER DEFAULT 0,
  search_start_date TEXT,
  search_end_date TEXT,
  task_count INTEGER DEFAULT 0,
  key_account_manager_id TEXT,
  owner_id TEXT,
  description TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS freelancers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  telefon TEXT,
  rolle TEXT,
  status TEXT DEFAULT 'Aktiv',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS unterkuenfte (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  vermieter_id TEXT REFERENCES accounts(id),
  freelancer_id TEXT REFERENCES freelancers(id),
  strasse TEXT,
  hausnummer TEXT,
  plz TEXT,
  ort TEXT,
  bundesland TEXT,
  land TEXT DEFAULT 'Deutschland',
  latitude REAL,
  longitude REAL,
  exacte_unterkunftsbezeichnung TEXT,
  unterkunfts_typ TEXT,
  status TEXT DEFAULT 'In Bearbeitung',
  aufnahme_status TEXT,
  aufnahme_prozent INTEGER DEFAULT 0,
  anzahl_zimmer INTEGER,
  anzahl_betten INTEGER,
  anzahl_badezimmer INTEGER,
  max_personen INTEGER,
  wohnflaeche REAL,
  preis_pro_nacht REAL,
  preis_pro_nacht_inkl_mwst REAL,
  reinigungskosten REAL,
  reinigungskosten_inkl_mwst REAL,
  kaution REAL,
  provision_prozent REAL,
  provision_betrag REAL,
  steuersatz_unterkunft TEXT,
  steuersatz_reinigung TEXT,
  mindestaufenthalt INTEGER,
  mwst_satz REAL DEFAULT 7,
  kueche INTEGER DEFAULT 0,
  waschmaschine INTEGER DEFAULT 0,
  trockner INTEGER DEFAULT 0,
  wlan INTEGER DEFAULT 0,
  parkplatz INTEGER DEFAULT 0,
  aufzug INTEGER DEFAULT 0,
  balkon INTEGER DEFAULT 0,
  terrasse INTEGER DEFAULT 0,
  garten INTEGER DEFAULT 0,
  klimaanlage INTEGER DEFAULT 0,
  haustiere INTEGER DEFAULT 0,
  rauchen INTEGER DEFAULT 0,
  bettwaesche INTEGER DEFAULT 0,
  handtuecher INTEGER DEFAULT 0,
  fernseher INTEGER DEFAULT 0,
  geschirrspueler INTEGER DEFAULT 0,
  mikrowelle INTEGER DEFAULT 0,
  backofen INTEGER DEFAULT 0,
  kuehlschrank INTEGER DEFAULT 0,
  kaffeemaschine INTEGER DEFAULT 0,
  vermieter_vorname TEXT,
  vermieter_nachname TEXT,
  vermieter_telefon TEXT,
  vermieter_email TEXT,
  vermieter_anrede TEXT,
  title_en TEXT,
  description_en TEXT,
  city_en TEXT,
  google_drive_folder_id TEXT,
  google_drive_folder_url TEXT,
  has_google_drive_folder INTEGER DEFAULT 0,
  anzahl_buchungen INTEGER DEFAULT 0,
  beschreibung TEXT,
  interne_notizen TEXT,
  anreise_beschreibung TEXT,
  hausregeln TEXT,
  titelbild TEXT,
  bild_urls TEXT,
  owner_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS buchungen (
  id TEXT PRIMARY KEY,
  buchungs_nummer TEXT,
  record_type TEXT NOT NULL DEFAULT 'Buchung',
  account_id TEXT REFERENCES accounts(id),
  contact_id TEXT REFERENCES contacts(id),
  opportunity_id TEXT REFERENCES opportunities(id),
  unterkunft_id TEXT REFERENCES unterkuenfte(id),
  buchungsphase TEXT NOT NULL DEFAULT 'Neu',
  check_in TEXT,
  check_out TEXT,
  anzahl_naechte INTEGER,
  anzahl_gaeste INTEGER,
  gast_name TEXT,
  gast_telefon TEXT,
  gast_email TEXT,
  preis_pro_nacht REAL,
  gesamt_preis REAL,
  unterkunftskosten_netto REAL,
  unterkunftskosten_brutto REAL,
  unterkunftskosten_gesamt_inkl_19_netto REAL,
  reinigungskosten REAL,
  reinigungskosten_inkl_mwst REAL,
  kaution REAL,
  kaution_status TEXT,
  provision REAL,
  provision_prozent REAL,
  mwst_satz REAL,
  mwst_betrag REAL,
  steuersatz_reinigung TEXT,
  rechnungs_nummer TEXT,
  rechnungs_datum TEXT,
  rechnungs_betrag REAL,
  fastbill_invoice_id TEXT,
  datev_exported INTEGER DEFAULT 0,
  vermieter_abrechnung_betrag REAL,
  vermieter_abrechnung_datum TEXT,
  vermieter_abrechnung_status TEXT,
  stornierungsgrund TEXT,
  stornierungsdatum TEXT,
  schaden_beschreibung TEXT,
  schaden_betrag REAL,
  schaden_status TEXT,
  gutschrift_grund TEXT,
  gutschrift_betrag REAL,
  ist_probewoche INTEGER DEFAULT 0,
  probewoche_ueberspringen INTEGER DEFAULT 0,
  ursprungsbuchung_id TEXT,
  loss_reason TEXT,
  baustellenleiter_capo TEXT,
  kontakt_unterkunft TEXT,
  review_link_sent INTEGER DEFAULT 0,
  review_rating INTEGER,
  file_ids TEXT,
  owner_id TEXT,
  beschreibung TEXT,
  interne_notizen TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS angebote (
  id TEXT PRIMARY KEY,
  angebot_nummer TEXT,
  name TEXT NOT NULL,
  account_id TEXT REFERENCES accounts(id),
  contact_id TEXT REFERENCES contacts(id),
  opportunity_id TEXT REFERENCES opportunities(id),
  unterkunft_id TEXT REFERENCES unterkuenfte(id),
  status TEXT DEFAULT 'Entwurf',
  gueltig_bis TEXT,
  check_in TEXT,
  check_out TEXT,
  anzahl_naechte INTEGER,
  anzahl_personen INTEGER,
  preis_pro_nacht REAL,
  gesamt_preis REAL,
  reinigungskosten REAL,
  kaution REAL,
  mwst_satz REAL,
  pdf_url TEXT,
  pdf_generated_at TEXT,
  sprache TEXT DEFAULT 'DE',
  owner_id TEXT,
  beschreibung TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS vermieter_uebersicht (
  id TEXT PRIMARY KEY,
  account_id TEXT REFERENCES accounts(id),
  name TEXT NOT NULL,
  anrede TEXT,
  vorname TEXT,
  nachname TEXT,
  telefon TEXT,
  email TEXT,
  iban TEXT,
  bic TEXT,
  bank_name TEXT,
  kontoinhaber TEXT,
  steuer_nummer TEXT,
  ust_id_nr TEXT,
  vertrags_beginn TEXT,
  vertrags_ende TEXT,
  provision_satz REAL,
  anzahl_unterkuenfte INTEGER DEFAULT 0,
  anzahl_buchungen INTEGER DEFAULT 0,
  gesamt_umsatz REAL DEFAULT 0,
  status TEXT DEFAULT 'Aktiv',
  notizen TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS stundenerfassung (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_name TEXT,
  stunden REAL NOT NULL,
  datum TEXT NOT NULL,
  fuer_wen TEXT NOT NULL,
  beschreibung TEXT,
  kategorie TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS search_timers (
  id TEXT PRIMARY KEY,
  opportunity_id TEXT REFERENCES opportunities(id),
  start_time TEXT,
  end_time TEXT,
  duration_minutes INTEGER,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS logs (
  id TEXT PRIMARY KEY,
  type TEXT,
  message TEXT,
  source TEXT,
  details TEXT,
  severity TEXT DEFAULT 'Info',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS booking_files (
  id TEXT PRIMARY KEY,
  buchung_id TEXT REFERENCES buchungen(id),
  filename TEXT NOT NULL,
  original_name TEXT,
  mime_type TEXT,
  size INTEGER,
  url TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Offen',
  priority TEXT DEFAULT 'Normal',
  due_date TEXT,
  account_id TEXT REFERENCES accounts(id),
  contact_id TEXT REFERENCES contacts(id),
  opportunity_id TEXT REFERENCES opportunities(id),
  lead_id TEXT REFERENCES leads(id),
  key_account_manager_id TEXT,
  owner_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cases (
  id TEXT PRIMARY KEY,
  record_type TEXT DEFAULT 'Standart_Case',
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Neu',
  priority TEXT DEFAULT 'Normal',
  origin TEXT,
  account_id TEXT REFERENCES accounts(id),
  contact_id TEXT REFERENCES contacts(id),
  owner_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS list_views (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  entity TEXT NOT NULL,
  name TEXT NOT NULL,
  is_default INTEGER DEFAULT 0,
  is_pinned INTEGER DEFAULT 0,
  filters TEXT,
  visible_columns TEXT,
  sort_field TEXT,
  sort_order TEXT DEFAULT 'asc',
  view_mode TEXT DEFAULT 'table',
  kanban_field TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_list_views_user_entity ON list_views(user_id, entity);

CREATE TABLE IF NOT EXISTS salesforce_anpassungen (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  beschreibung TEXT,
  status TEXT,
  prioritaet TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  old_value TEXT,
  new_value TEXT,
  field_name TEXT,
  user_id TEXT,
  user_name TEXT,
  created_at TEXT NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_activities_entity ON activities(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_accounts_record_type ON accounts(record_type);
CREATE INDEX IF NOT EXISTS idx_accounts_name ON accounts(name);
CREATE INDEX IF NOT EXISTS idx_contacts_account_id ON contacts(account_id);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_opportunities_stage ON opportunities(stage);
CREATE INDEX IF NOT EXISTS idx_opportunities_account_id ON opportunities(account_id);
CREATE INDEX IF NOT EXISTS idx_unterkuenfte_vermieter_id ON unterkuenfte(vermieter_id);
CREATE INDEX IF NOT EXISTS idx_unterkuenfte_status ON unterkuenfte(status);
CREATE INDEX IF NOT EXISTS idx_unterkuenfte_plz ON unterkuenfte(plz);
CREATE INDEX IF NOT EXISTS idx_unterkuenfte_ort ON unterkuenfte(ort);
CREATE INDEX IF NOT EXISTS idx_buchungen_record_type ON buchungen(record_type);
CREATE INDEX IF NOT EXISTS idx_buchungen_buchungsphase ON buchungen(buchungsphase);
CREATE INDEX IF NOT EXISTS idx_buchungen_unterkunft_id ON buchungen(unterkunft_id);
CREATE INDEX IF NOT EXISTS idx_buchungen_account_id ON buchungen(account_id);
CREATE INDEX IF NOT EXISTS idx_buchungen_check_in ON buchungen(check_in);
CREATE INDEX IF NOT EXISTS idx_angebote_account_id ON angebote(account_id);
CREATE INDEX IF NOT EXISTS idx_angebote_opportunity_id ON angebote(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_opportunity_id ON tasks(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);
CREATE INDEX IF NOT EXISTS idx_booking_files_buchung_id ON booking_files(buchung_id);

-- Default Admin User (password: admin)
INSERT OR IGNORE INTO users (id, email, name, password, role, is_active, created_at, updated_at)
VALUES ('admin001', 'info@schlaf-platz.com', 'Admin', 'admin', 'admin', 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO users (id, email, name, password, role, is_active, created_at, updated_at)
VALUES ('admin002', 'robert@talentsuite.io', 'Robert Engel', 'admin', 'admin', 1, datetime('now'), datetime('now'));
