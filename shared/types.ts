// Shared Types for Schlaf-Platz CRM

// Record Types
export type AccountRecordType = "Account_Standart" | "Account_Vermieter";
export type BuchungRecordType = "Buchung" | "Feste_Objekt_Buchung" | "Gutschriften" | "Kaution" | "Schaden" | "Stornos";
export type CaseRecordType = "Standart_Case" | "Anwaltsfall";

// Status Types
export type LeadStatus = "Neu" | "Kontaktiert" | "Qualifiziert" | "Verloren" | "Konvertiert";
export type OpportunityStage = "Qualifizierung" | "Bedarfsanalyse" | "Angebot" | "Verhandlung" | "Gewonnen" | "Verloren";
export type BuchungsPhase = "Neu" | "Bestätigt" | "Aktiv" | "Abgeschlossen" | "Verloren" | "Storniert";
export type UnterkunftStatus = "In Bearbeitung" | "25% fertig" | "50% fertig" | "75% fertig" | "100% fertig" | "Aktiv" | "Inaktiv";
export type AngebotStatus = "Entwurf" | "Gesendet" | "Angenommen" | "Abgelehnt" | "Abgelaufen";
export type TaskStatus = "Offen" | "In Bearbeitung" | "Erledigt" | "Abgebrochen";

// Entity Interfaces
export interface Account {
  id: string;
  recordType: AccountRecordType;
  name: string;
  phone?: string;
  email?: string;
  website?: string;
  industry?: string;
  billingStreet?: string;
  billingCity?: string;
  billingPostalCode?: string;
  billingState?: string;
  billingCountry?: string;
  keyAccountManagerId?: string;
  anzahlBuchungen: number;
  anzahlUnterkuenfte: number;
  ownerId?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  accountId?: string;
  salutation?: string;
  firstName?: string;
  lastName: string;
  email?: string;
  phone?: string;
  mobilePhone?: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  salutation?: string;
  firstName?: string;
  lastName: string;
  company?: string;
  email?: string;
  phone?: string;
  status: LeadStatus;
  source?: string;
  lossReason?: string;
  keyAccountManagerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  id: string;
  name: string;
  accountId?: string;
  contactId?: string;
  stage: OpportunityStage;
  amount?: number;
  closeDate?: string;
  probability?: number;
  lossReason?: string;
  searchTimeMinutes: number;
  taskCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Unterkunft {
  id: string;
  name: string;
  vermieterId?: string;
  freelancerId?: string;
  strasse?: string;
  hausnummer?: string;
  plz?: string;
  ort?: string;
  bundesland?: string;
  land: string;
  latitude?: number;
  longitude?: number;
  status: UnterkunftStatus;
  anzahlZimmer?: number;
  anzahlBetten?: number;
  maxPersonen?: number;
  preisProNacht?: number;
  reinigungskosten?: number;
  kaution?: number;
  anzahlBuchungen: number;
  createdAt: string;
  updatedAt: string;
}

export interface Buchung {
  id: string;
  buchungsNummer?: string;
  recordType: BuchungRecordType;
  accountId?: string;
  contactId?: string;
  opportunityId?: string;
  unterkunftId?: string;
  buchungsphase: BuchungsPhase;
  checkIn?: string;
  checkOut?: string;
  anzahlNaechte?: number;
  anzahlGaeste?: number;
  gastName?: string;
  preisProNacht?: number;
  gesamtPreis?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Angebot {
  id: string;
  angebotNummer?: string;
  name: string;
  accountId?: string;
  opportunityId?: string;
  unterkunftId?: string;
  status: AngebotStatus;
  checkIn?: string;
  checkOut?: string;
  gesamtPreis?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalAccounts: number;
  totalContacts: number;
  totalLeads: number;
  activeLeads: number;
  totalOpportunities: number;
  openOpportunities: number;
  totalOpportunityAmount: number;
  totalUnterkuenfte: number;
  activeUnterkuenfte: number;
  totalBuchungen: number;
  activeBuchungen: number;
  totalRevenue: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
