const BASE = "/api";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

async function fetchApi<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOpts } = options;

  let url = `${BASE}${path}`;
  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    }
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    ...fetchOpts,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...fetchOpts.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// Generic CRUD factory
function createCrudApi<T>(entity: string) {
  return {
    list: (params?: Record<string, string | number | undefined>) =>
      fetchApi<{ data: T[]; total?: number; pagination?: { total: number } }>(`/${entity}`, { params })
        .then(res => ({
          data: res.data,
          total: res.total ?? res.pagination?.total ?? 0,
        })),
    get: (id: string) => fetchApi<T>(`/${entity}/${id}`),
    create: (data: Partial<T>) =>
      fetchApi<T>(`/${entity}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<T>) =>
      fetchApi<T>(`/${entity}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchApi(`/${entity}/${id}`, { method: "DELETE" }),
  };
}

// Entity types
export interface Account {
  id: string;
  recordType: string;
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
  shippingStreet?: string;
  shippingCity?: string;
  shippingPostalCode?: string;
  shippingState?: string;
  shippingCountry?: string;
  keyAccountManagerId?: string;
  anzahlBuchungen?: number;
  anzahlUnterkuenfte?: number;
  vermieterNummer?: string;
  vermieterStatus?: string;
  steuerNummer?: string;
  iban?: string;
  bic?: string;
  bankName?: string;
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
  mailingStreet?: string;
  mailingCity?: string;
  mailingPostalCode?: string;
  mailingState?: string;
  mailingCountry?: string;
  baustellenleiterCapo?: string;
  kontaktUnterkunft?: string;
  ownerId?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  account?: Account;
}

export interface Lead {
  id: string;
  recordType?: string;
  salutation?: string;
  firstName?: string;
  lastName: string;
  company?: string;
  email?: string;
  phone?: string;
  mobilePhone?: string;
  status: string;
  source?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
  keyAccountManagerId?: string;
  lossReason?: string;
  campaignId?: string;
  nurtureStage?: string;
  ownerId?: string;
  description?: string;
  convertedAccountId?: string;
  convertedContactId?: string;
  convertedOpportunityId?: string;
  convertedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  id: string;
  recordType?: string;
  name: string;
  accountId?: string;
  contactId?: string;
  stage: string;
  amount?: number;
  closeDate?: string;
  probability?: number;
  lossReason?: string;
  searchTimeMinutes?: number;
  searchStartDate?: string;
  searchEndDate?: string;
  taskCount?: number;
  keyAccountManagerId?: string;
  ownerId?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  account?: Account;
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
  land?: string;
  latitude?: number;
  longitude?: number;
  exacteUnterkunftsbezeichnung?: string;
  unterkunftsTyp?: string;
  status?: string;
  aufnahmeStatus?: string;
  aufnahmeProzent?: number;
  anzahlZimmer?: number;
  anzahlBetten?: number;
  anzahlBadezimmer?: number;
  maxPersonen?: number;
  wohnflaeche?: number;
  preisProNacht?: number;
  preisProNachtInklMwst?: number;
  reinigungskosten?: number;
  reinigungskostenInklMwst?: number;
  kaution?: number;
  provisionProzent?: number;
  provisionBetrag?: number;
  steuersatzUnterkunft?: string;
  steuersatzReinigung?: string;
  mindestaufenthalt?: number;
  mwstSatz?: number;
  kueche?: boolean;
  waschmaschine?: boolean;
  trockner?: boolean;
  wlan?: boolean;
  parkplatz?: boolean;
  aufzug?: boolean;
  balkon?: boolean;
  terrasse?: boolean;
  garten?: boolean;
  klimaanlage?: boolean;
  haustiere?: boolean;
  rauchen?: boolean;
  bettwaesche?: boolean;
  handtuecher?: boolean;
  fernseher?: boolean;
  geschirrspueler?: boolean;
  mikrowelle?: boolean;
  backofen?: boolean;
  kuehlschrank?: boolean;
  kaffeemaschine?: boolean;
  vermieterVorname?: string;
  vermieterNachname?: string;
  vermieterTelefon?: string;
  vermieterEmail?: string;
  vermieterAnrede?: string;
  beschreibung?: string;
  interneNotizen?: string;
  anreiseBeschreibung?: string;
  hausregeln?: string;
  titelbild?: string;
  bildUrls?: string;
  anzahlBuchungen?: number;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
  vermieter?: Account;
}

export interface Buchung {
  id: string;
  buchungsNummer?: string;
  recordType: string;
  accountId?: string;
  contactId?: string;
  opportunityId?: string;
  unterkunftId?: string;
  buchungsphase: string;
  checkIn?: string;
  checkOut?: string;
  anzahlNaechte?: number;
  anzahlGaeste?: number;
  gastName?: string;
  gastTelefon?: string;
  gastEmail?: string;
  preisProNacht?: number;
  gesamtPreis?: number;
  unterkunftskostenNetto?: number;
  unterkunftskostenBrutto?: number;
  reinigungskosten?: number;
  reinigungskostenInklMwst?: number;
  kaution?: number;
  kautionStatus?: string;
  provision?: number;
  provisionProzent?: number;
  mwstSatz?: number;
  mwstBetrag?: number;
  rechnungsNummer?: string;
  rechnungsDatum?: string;
  rechnungsBetrag?: number;
  stornierungsGrund?: string;
  stornierungsDatum?: string;
  schadenBeschreibung?: string;
  schadenBetrag?: number;
  schadenStatus?: string;
  gutschriftGrund?: string;
  gutschriftBetrag?: number;
  istProbewoche?: boolean;
  ownerId?: string;
  beschreibung?: string;
  interneNotizen?: string;
  createdAt: string;
  updatedAt: string;
  account?: Account;
  unterkunft?: Unterkunft;
}

export interface Angebot {
  id: string;
  angebotNummer?: string;
  name: string;
  accountId?: string;
  contactId?: string;
  opportunityId?: string;
  unterkunftId?: string;
  status?: string;
  gueltigBis?: string;
  checkIn?: string;
  checkOut?: string;
  anzahlNaechte?: number;
  anzahlPersonen?: number;
  preisProNacht?: number;
  gesamtPreis?: number;
  reinigungskosten?: number;
  kaution?: number;
  mwstSatz?: number;
  pdfUrl?: string;
  sprache?: string;
  ownerId?: string;
  beschreibung?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stundenerfassung {
  id: string;
  userId: string;
  userName?: string;
  stunden: number;
  datum: string;
  fuerWen: string;
  beschreibung?: string;
  kategorie?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  counts: {
    accounts: number;
    contacts: number;
    leads: number;
    opportunities: number;
    unterkuenfte: number;
    buchungen: number;
    openLeads: number;
    activeBuchungen: number;
  };
  revenue: {
    totalRevenue: number;
    totalProvision: number;
  };
  recentActivity: {
    accounts: { id: string; name: string; recordType: string; createdAt: string }[];
    leads: { id: string; firstName: string | null; lastName: string; company: string | null; status: string; createdAt: string }[];
    buchungen: { id: string; buchungsNummer: string | null; buchungsphase: string; gastName: string | null; checkIn: string | null; checkOut: string | null; gesamtPreis: number | null; createdAt: string }[];
  };
  distributions: {
    buchungenByPhase: { buchungsphase: string; count: number }[];
    leadsByStatus: { status: string; count: number }[];
    opportunitiesByStage: { stage: string; count: number }[];
  };
}

// API endpoints
export const accountsApi = createCrudApi<Account>("accounts");
export const contactsApi = createCrudApi<Contact>("contacts");
export const leadsApi = createCrudApi<Lead>("leads");
export const opportunitiesApi = createCrudApi<Opportunity>("opportunities");
export const unterkuenfteApi = createCrudApi<Unterkunft>("unterkuenfte");
export const buchungenApi = createCrudApi<Buchung>("buchungen");
export const angeboteApi = createCrudApi<Angebot>("angebote");
export const stundenerfassungApi = createCrudApi<Stundenerfassung>("stundenerfassung");

export const dashboardApi = {
  getStats: () => fetchApi<DashboardStats>("/dashboard/stats"),
};

// List Views API
export interface ListView {
  id: string;
  userId: string;
  entity: string;
  name: string;
  isDefault: boolean;
  isPinned: boolean;
  filters: FilterCondition[];
  visibleColumns: string[];
  sortField?: string;
  sortOrder: string;
  viewMode: string;
  kanbanField?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterCondition {
  field: string;
  operator: "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "greater_than" | "less_than" | "is_empty" | "is_not_empty";
  value: string;
}

export const listViewsApi = {
  list: (entity: string) =>
    fetchApi<ListView[]>("/list-views", { params: { entity } }),
  create: (data: Partial<ListView>) =>
    fetchApi<ListView>("/list-views", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<ListView>) =>
    fetchApi<ListView>(`/list-views/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) =>
    fetchApi(`/list-views/${id}`, { method: "DELETE" }),
};
