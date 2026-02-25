import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, Trash2, Building2, MapPin, Phone, MessageSquare, CheckSquare as CheckSquareIcon } from "lucide-react";
import ActivityTimeline from "../components/ActivityTimeline";
import QuickActions from "../components/QuickActions";
import RecordHighlights from "../components/RecordHighlights";
import RecordTabs from "../components/RecordTabs";
import DetailSection, { DetailField } from "../components/DetailSection";
import {
  SldsPrimaryButton,
  SldsOutlineButton,
  sldsInput,
  sldsSelect,
  sldsTextarea,
} from "../components/SalesforceField";

interface Account {
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
  anzahlBuchungen: number;
  anzahlUnterkuenfte: number;
  vermieterNummer?: string;
  vermieterStatus?: string;
  steuerNummer?: string;
  iban?: string;
  bic?: string;
  bankName?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const emptyAccount: Partial<Account> = {
  recordType: "Account_Standart",
  name: "",
  phone: "",
  email: "",
  website: "",
  billingStreet: "",
  billingCity: "",
  billingPostalCode: "",
  billingCountry: "Deutschland",
  description: "",
};

export default function AccountDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "neu";
  const [account, setAccount] = useState<Partial<Account>>(emptyAccount);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    if (!isNew && id) {
      fetch(`/api/accounts/${id}`, { credentials: "include" })
        .then((r) => r.json())
        .then((data) => { setAccount(data); setLoading(false); })
        .catch(() => { setError("Account nicht gefunden"); setLoading(false); });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const url = isNew ? "/api/accounts" : `/api/accounts/${id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(account),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Fehler beim Speichern");
        return;
      }
      const saved = await res.json();
      if (isNew) navigate(`/accounts/${saved.id}`, { replace: true });
      else setAccount(saved);
    } catch {
      setError("Verbindungsfehler");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Account wirklich löschen?")) return;
    await fetch(`/api/accounts/${id}`, { method: "DELETE", credentials: "include" });
    navigate("/accounts");
  };

  const update = (field: string, value: any) => setAccount((prev) => ({ ...prev, [field]: value }));

  if (loading) return <div className="p-4 sm:p-8 text-gray-500">Laden...</div>;

  const highlightFields = [
    {
      label: "Typ",
      value: account.recordType === "Account_Vermieter" ? "Vermieter" : "Kunde",
    },
    { label: "Telefon", value: account.phone || "–" },
    { label: "E-Mail", value: account.email || "–" },
    { label: "Stadt", value: account.billingCity || "–" },
    { label: "Buchungen", value: String(account.anzahlBuchungen ?? 0) },
  ];

  const detailsContent = (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-[13px]">
          {error}
        </div>
      )}

      {/* Basisdaten */}
      <DetailSection title="Basisdaten" icon={<Building2 className="w-4 h-4" />}>
        <DetailField label="Name" required>
          <input
            value={account.name || ""}
            onChange={(e) => update("name", e.target.value)}
            className={sldsInput}
          />
        </DetailField>
        <DetailField label="Typ">
          <select
            value={account.recordType || ""}
            onChange={(e) => update("recordType", e.target.value)}
            className={sldsSelect}
          >
            <option value="Account_Standart">Kunde</option>
            <option value="Account_Vermieter">Vermieter</option>
          </select>
        </DetailField>
        <DetailField label="Telefon">
          <input
            value={account.phone || ""}
            onChange={(e) => update("phone", e.target.value)}
            className={sldsInput}
          />
        </DetailField>
        <DetailField label="E-Mail">
          <input
            type="email"
            value={account.email || ""}
            onChange={(e) => update("email", e.target.value)}
            className={sldsInput}
          />
        </DetailField>
        <DetailField label="Website">
          <input
            value={account.website || ""}
            onChange={(e) => update("website", e.target.value)}
            className={sldsInput}
          />
        </DetailField>
        <DetailField label="Branche">
          <input
            value={account.industry || ""}
            onChange={(e) => update("industry", e.target.value)}
            className={sldsInput}
          />
        </DetailField>
      </DetailSection>

      {/* Rechnungsadresse */}
      <DetailSection title="Rechnungsadresse" icon={<MapPin className="w-4 h-4" />}>
        <DetailField label="Straße" fullWidth>
          <input
            value={account.billingStreet || ""}
            onChange={(e) => update("billingStreet", e.target.value)}
            className={sldsInput}
          />
        </DetailField>
        <DetailField label="PLZ">
          <input
            value={account.billingPostalCode || ""}
            onChange={(e) => update("billingPostalCode", e.target.value)}
            className={sldsInput}
          />
        </DetailField>
        <DetailField label="Stadt">
          <input
            value={account.billingCity || ""}
            onChange={(e) => update("billingCity", e.target.value)}
            className={sldsInput}
          />
        </DetailField>
        <DetailField label="Bundesland">
          <input
            value={account.billingState || ""}
            onChange={(e) => update("billingState", e.target.value)}
            className={sldsInput}
          />
        </DetailField>
        <DetailField label="Land">
          <input
            value={account.billingCountry || ""}
            onChange={(e) => update("billingCountry", e.target.value)}
            className={sldsInput}
          />
        </DetailField>
      </DetailSection>

      {/* Vermieter-Daten */}
      {account.recordType === "Account_Vermieter" && (
        <DetailSection title="Vermieter-Daten">
          <DetailField label="Vermieter-Nummer">
            <input
              value={account.vermieterNummer || ""}
              onChange={(e) => update("vermieterNummer", e.target.value)}
              className={sldsInput}
            />
          </DetailField>
          <DetailField label="Status">
            <select
              value={account.vermieterStatus || ""}
              onChange={(e) => update("vermieterStatus", e.target.value)}
              className={sldsSelect}
            >
              <option value="">-- Wählen --</option>
              <option value="Aktiv">Aktiv</option>
              <option value="Inaktiv">Inaktiv</option>
              <option value="Gekündigt">Gekündigt</option>
            </select>
          </DetailField>
          <DetailField label="Steuernummer">
            <input
              value={account.steuerNummer || ""}
              onChange={(e) => update("steuerNummer", e.target.value)}
              className={sldsInput}
            />
          </DetailField>
          <DetailField label="IBAN">
            <input
              value={account.iban || ""}
              onChange={(e) => update("iban", e.target.value)}
              className={sldsInput}
            />
          </DetailField>
          <DetailField label="BIC">
            <input
              value={account.bic || ""}
              onChange={(e) => update("bic", e.target.value)}
              className={sldsInput}
            />
          </DetailField>
          <DetailField label="Bank">
            <input
              value={account.bankName || ""}
              onChange={(e) => update("bankName", e.target.value)}
              className={sldsInput}
            />
          </DetailField>
        </DetailSection>
      )}

      {/* Beschreibung */}
      <DetailSection title="Beschreibung">
        <DetailField label="Beschreibung" fullWidth>
          <textarea
            value={account.description || ""}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
            className={sldsTextarea}
          />
        </DetailField>
      </DetailSection>
    </div>
  );

  const relatedContent = (
    <div className="bg-white rounded-lg border border-[#e5e5e5] p-6 text-[13px] text-[#706e6b]">
      Keine Related Lists vorhanden
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <RecordHighlights
        backPath="/accounts"
        icon={<Building2 className="w-5 h-5 text-white" />}
        iconColor="#7F8DE1"
        entityLabel="Account"
        title={isNew ? "Neuer Account" : account.name || ""}
        highlightFields={isNew ? [] : highlightFields}
        actions={
          <>
            {!isNew && (
              <SldsOutlineButton onClick={handleDelete} danger>
                <Trash2 className="w-3.5 h-3.5" />
                Löschen
              </SldsOutlineButton>
            )}
            <SldsPrimaryButton onClick={handleSave} disabled={saving}>
              <Save className="w-3.5 h-3.5" />
              {saving ? "Speichert..." : "Speichern"}
            </SldsPrimaryButton>
          </>
        }
      />

      {!isNew && id && (
        <QuickActions actions={[
          { key: "call", label: "Anruf loggen", icon: <Phone className="w-4 h-4" />, onClick: () => {
            fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
              body: JSON.stringify({ entityType: "account", entityId: id, activityType: "call_logged", title: "Anruf geloggt" })
            }).then(() => {});
          }},
          { key: "comment", label: "Kommentar", icon: <MessageSquare className="w-4 h-4" />, onClick: () => setActiveTab("activity") },
          { key: "task", label: "Neue Aufgabe", icon: <CheckSquareIcon className="w-4 h-4" />, onClick: () => {
            fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
              body: JSON.stringify({ entityType: "account", entityId: id, activityType: "task_created", title: "Aufgabe erstellt" })
            }).then(() => {});
          }},
        ]} />
      )}

      <RecordTabs
        defaultTab="details"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={[
          { key: "details", label: "Details", content: detailsContent },
          { key: "related", label: "Related", content: relatedContent },
          { key: "activity", label: "Aktivitäten", content: !isNew && id ? <ActivityTimeline entityType="account" entityId={id} /> : <div className="p-6 text-[13px] text-[#706e6b]">Erst nach Speichern verfügbar</div> },
        ]}
      />
    </div>
  );
}
