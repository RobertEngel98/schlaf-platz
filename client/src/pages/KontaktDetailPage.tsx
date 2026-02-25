import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, Trash2, Users, MapPin, Phone, MessageSquare, CheckSquare as CheckSquareIcon } from "lucide-react";
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

export default function KontaktDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "neu";
  const [kontakt, setKontakt] = useState<any>({ lastName: "" });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/accounts?limit=500", { credentials: "include" }).then(r => r.json()).then(d => setAccounts(d.data || []));
    if (!isNew && id) {
      fetch(`/api/contacts/${id}`, { credentials: "include" })
        .then(r => r.json())
        .then(data => { setKontakt(data); setLoading(false); })
        .catch(() => { setError("Kontakt nicht gefunden"); setLoading(false); });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      const url = isNew ? "/api/contacts" : `/api/contacts/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kontakt),
        credentials: "include",
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Fehler"); return; }
      const saved = await res.json();
      if (isNew) navigate(`/kontakte/${saved.id}`, { replace: true });
      else setKontakt(saved);
    } catch { setError("Verbindungsfehler"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Kontakt wirklich löschen?")) return;
    await fetch(`/api/contacts/${id}`, { method: "DELETE", credentials: "include" });
    navigate("/kontakte");
  };

  const update = (f: string, v: any) => setKontakt((p: any) => ({ ...p, [f]: v }));

  if (loading) return <div className="p-4 sm:p-8 text-gray-500">Laden...</div>;

  const fullName = isNew
    ? "Neuer Kontakt"
    : `${kontakt.firstName || ""} ${kontakt.lastName || ""}`.trim() || "Kontakt";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Record Highlights */}
      <RecordHighlights
        backPath="/kontakte"
        icon={<Users className="w-5 h-5 text-white" />}
        iconColor="#1B96FF"
        entityLabel="Kontakt"
        title={fullName}
        highlightFields={[
          { label: "Account", value: kontakt.account?.name || "—" },
          { label: "E-Mail", value: kontakt.email || "—" },
          { label: "Telefon", value: kontakt.phone || "—" },
          { label: "Mobil", value: kontakt.mobilePhone || "—" },
          { label: "Position", value: kontakt.title || "—" },
        ]}
        actions={
          <>
            {!isNew && (
              <SldsOutlineButton onClick={handleDelete} danger>
                <Trash2 className="w-4 h-4" /> Löschen
              </SldsOutlineButton>
            )}
            <SldsPrimaryButton onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4" /> {saving ? "Speichert..." : "Speichern"}
            </SldsPrimaryButton>
          </>
        }
      />

      {!isNew && id && (
        <QuickActions actions={[
          { key: "call", label: "Anruf loggen", icon: <Phone className="w-4 h-4" />, onClick: () => {
            fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
              body: JSON.stringify({ entityType: "contact", entityId: id, activityType: "call_logged", title: "Anruf geloggt" })
            }).then(() => {});
          }},
          { key: "comment", label: "Kommentar", icon: <MessageSquare className="w-4 h-4" />, onClick: () => setActiveTab("activity") },
          { key: "task", label: "Neue Aufgabe", icon: <CheckSquareIcon className="w-4 h-4" />, onClick: () => {
            fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
              body: JSON.stringify({ entityType: "contact", entityId: id, activityType: "task_created", title: "Aufgabe erstellt" })
            }).then(() => {});
          }},
        ]} />
      )}

      {/* Error banner */}
      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-[13px]">
          {error}
        </div>
      )}

      {/* Tabs */}
      <RecordTabs
        defaultTab="details"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={[
          {
            key: "details",
            label: "Details",
            content: (
              <div className="space-y-4">
                {/* Kontaktdaten */}
                <DetailSection title="Kontaktdaten" icon={<Users className="w-4 h-4" />}>
                  <DetailField label="Anrede">
                    <select
                      value={kontakt.salutation || ""}
                      onChange={e => update("salutation", e.target.value)}
                      className={sldsSelect}
                    >
                      <option value="">-- Wählen --</option>
                      <option value="Herr">Herr</option>
                      <option value="Frau">Frau</option>
                      <option value="Divers">Divers</option>
                    </select>
                  </DetailField>

                  <DetailField label="Account">
                    <select
                      value={kontakt.accountId || ""}
                      onChange={e => update("accountId", e.target.value)}
                      className={sldsSelect}
                    >
                      <option value="">-- Kein Account --</option>
                      {accounts.map((a: any) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </DetailField>

                  <DetailField label="Vorname">
                    <input
                      value={kontakt.firstName || ""}
                      onChange={e => update("firstName", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>

                  <DetailField label="Nachname" required>
                    <input
                      value={kontakt.lastName || ""}
                      onChange={e => update("lastName", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>

                  <DetailField label="E-Mail">
                    <input
                      type="email"
                      value={kontakt.email || ""}
                      onChange={e => update("email", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>

                  <DetailField label="Telefon">
                    <input
                      value={kontakt.phone || ""}
                      onChange={e => update("phone", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>

                  <DetailField label="Mobil">
                    <input
                      value={kontakt.mobilePhone || ""}
                      onChange={e => update("mobilePhone", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>

                  <DetailField label="Titel / Position">
                    <input
                      value={kontakt.title || ""}
                      onChange={e => update("title", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>

                  <DetailField label="Baustellenleiter/Capo">
                    <input
                      value={kontakt.baustellenleiterCapo || ""}
                      onChange={e => update("baustellenleiterCapo", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>

                  <DetailField label="Kontakt Unterkunft">
                    <input
                      value={kontakt.kontaktUnterkunft || ""}
                      onChange={e => update("kontaktUnterkunft", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>
                </DetailSection>

                {/* Adresse */}
                <DetailSection title="Adresse" icon={<MapPin className="w-4 h-4" />}>
                  <DetailField label="Straße" fullWidth>
                    <input
                      value={kontakt.mailingStreet || ""}
                      onChange={e => update("mailingStreet", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>

                  <DetailField label="PLZ">
                    <input
                      value={kontakt.mailingPostalCode || ""}
                      onChange={e => update("mailingPostalCode", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>

                  <DetailField label="Stadt">
                    <input
                      value={kontakt.mailingCity || ""}
                      onChange={e => update("mailingCity", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>

                  <DetailField label="Bundesland">
                    <input
                      value={kontakt.mailingState || ""}
                      onChange={e => update("mailingState", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>

                  <DetailField label="Land">
                    <input
                      value={kontakt.mailingCountry || ""}
                      onChange={e => update("mailingCountry", e.target.value)}
                      className={sldsInput}
                    />
                  </DetailField>
                </DetailSection>

                {/* Beschreibung */}
                <DetailSection title="Beschreibung">
                  <DetailField label="Beschreibung" fullWidth>
                    <textarea
                      value={kontakt.description || ""}
                      onChange={e => update("description", e.target.value)}
                      rows={4}
                      className={sldsTextarea}
                    />
                  </DetailField>
                </DetailSection>
              </div>
            ),
          },
          {
            key: "related",
            label: "Verknüpft",
            content: (
              <div className="bg-white rounded-lg border border-[#e5e5e5] p-8 text-center text-[13px] text-[#706e6b]">
                Keine Related Lists vorhanden
              </div>
            ),
          },
          {
            key: "activity",
            label: "Aktivitäten",
            content: !isNew && id ? <ActivityTimeline entityType="contact" entityId={id} /> : <div className="p-6 text-[13px] text-[#706e6b]">Erst nach Speichern verfügbar</div>,
          },
        ]}
      />
    </div>
  );
}
