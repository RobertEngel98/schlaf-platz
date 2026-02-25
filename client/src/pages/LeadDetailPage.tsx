import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, Trash2, UserPlus, MapPin, Phone, MessageSquare, CheckSquare as CheckSquareIcon } from "lucide-react";
import ActivityTimeline from "../components/ActivityTimeline";
import QuickActions from "../components/QuickActions";
import Badge, { getStatusVariant } from "../components/Badge";
import RecordHighlights from "../components/RecordHighlights";
import RecordPath from "../components/RecordPath";
import RecordTabs from "../components/RecordTabs";
import DetailSection, { DetailField } from "../components/DetailSection";
import { SldsPrimaryButton, SldsOutlineButton, sldsInput, sldsSelect, sldsTextarea } from "../components/SalesforceField";

const STATUSES = ["Neu", "Kontaktiert", "Qualifiziert", "Nichterreicht", "Verloren", "Konvertiert"];
const SOURCES = ["Web", "Telefon", "Empfehlung", "Messe", "Online-Werbung", "Social Media", "Partner", "Sonstige"];

const PATH_STAGES = STATUSES.map(s => ({ key: s, label: s }));

export default function LeadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "neu";
  const [lead, setLead] = useState<any>({ status: "Neu", lastName: "", country: "Deutschland" });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    if (!isNew && id) {
      fetch(`/api/leads/${id}`, { credentials: "include" })
        .then(r => r.json())
        .then(data => { setLead(data); setLoading(false); })
        .catch(() => { setError("Lead nicht gefunden"); setLoading(false); });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      const url = isNew ? "/api/leads" : `/api/leads/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        credentials: "include",
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Fehler"); return; }
      const saved = await res.json();
      if (isNew) navigate(`/leads/${saved.id}`, { replace: true });
      else setLead(saved);
    } catch { setError("Verbindungsfehler"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Lead wirklich löschen?")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE", credentials: "include" });
    navigate("/leads");
  };

  const update = (f: string, v: any) => setLead((p: any) => ({ ...p, [f]: v }));

  if (loading) return <div className="flex items-center justify-center h-full text-[#706e6b]">Laden...</div>;

  // --- DETAILS TAB CONTENT ---
  const detailsContent = (
    <div className="space-y-4 max-w-5xl">
      {error && <div className="p-3 bg-red-50 border border-red-200 text-[13px] text-[#ea001e] rounded">{error}</div>}

      <DetailSection title="Lead-Daten" icon={<UserPlus className="w-4 h-4" />}>
        <DetailField label="Anrede">
          <select value={lead.salutation || ""} onChange={e => update("salutation", e.target.value)} className={sldsSelect}>
            <option value="">-- Wählen --</option>
            <option value="Herr">Herr</option>
            <option value="Frau">Frau</option>
            <option value="Divers">Divers</option>
          </select>
        </DetailField>
        <DetailField label="Firma">
          <input value={lead.company || ""} onChange={e => update("company", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Vorname">
          <input value={lead.firstName || ""} onChange={e => update("firstName", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Nachname" required>
          <input value={lead.lastName || ""} onChange={e => update("lastName", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="E-Mail">
          <input type="email" value={lead.email || ""} onChange={e => update("email", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Telefon">
          <input value={lead.phone || ""} onChange={e => update("phone", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Mobil">
          <input value={lead.mobilePhone || ""} onChange={e => update("mobilePhone", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Quelle">
          <select value={lead.source || ""} onChange={e => update("source", e.target.value)} className={sldsSelect}>
            <option value="">-- Wählen --</option>
            {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </DetailField>
        <DetailField label="Status">
          <select value={lead.status || "Neu"} onChange={e => update("status", e.target.value)} className={sldsSelect}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </DetailField>
        <DetailField label="Nurture-Stufe">
          <select value={lead.nurtureStage || ""} onChange={e => update("nurtureStage", e.target.value)} className={sldsSelect}>
            <option value="">-- Wählen --</option>
            <option value="Kalt">Kalt</option>
            <option value="Warm">Warm</option>
            <option value="Heiß">Heiß</option>
          </select>
        </DetailField>
      </DetailSection>

      {lead.status === "Verloren" && (
        <DetailSection title="Verlustgrund" accentColor="#ea001e">
          <DetailField label="Grund" fullWidth>
            <textarea value={lead.lossReason || ""} onChange={e => update("lossReason", e.target.value)} rows={3} className={sldsTextarea} placeholder="Bitte gib einen Verlustgrund an..." />
          </DetailField>
        </DetailSection>
      )}

      <DetailSection title="Adresse" icon={<MapPin className="w-4 h-4" />}>
        <DetailField label="Straße" fullWidth>
          <input value={lead.street || ""} onChange={e => update("street", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="PLZ">
          <input value={lead.postalCode || ""} onChange={e => update("postalCode", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Stadt">
          <input value={lead.city || ""} onChange={e => update("city", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Bundesland">
          <input value={lead.state || ""} onChange={e => update("state", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Land">
          <input value={lead.country || ""} onChange={e => update("country", e.target.value)} className={sldsInput} />
        </DetailField>
      </DetailSection>

      <DetailSection title="Beschreibung">
        <DetailField label="Beschreibung" fullWidth>
          <textarea value={lead.description || ""} onChange={e => update("description", e.target.value)} rows={4} className={sldsTextarea} />
        </DetailField>
      </DetailSection>
    </div>
  );

  // --- RELATED TAB CONTENT ---
  const relatedContent = (
    <div className="space-y-4 max-w-5xl">
      <div className="bg-white rounded-lg border border-[#e5e5e5] p-8 text-center text-[13px] text-[#706e6b]">
        Keine verknüpften Datensätze vorhanden.
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Record Highlights */}
      <RecordHighlights
        backPath="/leads"
        icon={<UserPlus className="w-5 h-5 text-white" />}
        iconColor="#F59E0B"
        entityLabel="Lead"
        title={isNew ? "Neuer Lead" : `${lead.firstName || ""} ${lead.lastName}`.trim()}
        highlightFields={[
          { label: "Status", value: <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge> },
          { label: "Firma", value: lead.company || "---" },
          { label: "E-Mail", value: lead.email || "---" },
          { label: "Quelle", value: lead.source || "---" },
          { label: "Nurture-Stufe", value: lead.nurtureStage || "---" },
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

      {/* Record Path (status path) */}
      {!isNew && (
        <RecordPath
          stages={PATH_STAGES}
          currentStage={lead.status}
          onStageClick={(stageKey) => update("status", stageKey)}
          linear
        />
      )}

      {!isNew && id && (
        <QuickActions actions={[
          { key: "call", label: "Anruf loggen", icon: <Phone className="w-4 h-4" />, onClick: () => {
            fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
              body: JSON.stringify({ entityType: "lead", entityId: id, activityType: "call_logged", title: "Anruf geloggt" })
            }).then(() => {});
          }},
          { key: "comment", label: "Kommentar", icon: <MessageSquare className="w-4 h-4" />, onClick: () => setActiveTab("activity") },
          { key: "task", label: "Neue Aufgabe", icon: <CheckSquareIcon className="w-4 h-4" />, onClick: () => {
            fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
              body: JSON.stringify({ entityType: "lead", entityId: id, activityType: "task_created", title: "Aufgabe erstellt" })
            }).then(() => {});
          }},
        ]} />
      )}

      {/* Record Tabs */}
      <RecordTabs
        defaultTab="details"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={[
          { key: "details", label: "Details", content: detailsContent },
          { key: "related", label: "Verknüpft", content: relatedContent },
          { key: "activity", label: "Aktivitäten", content: !isNew && id ? <ActivityTimeline entityType="lead" entityId={id} /> : <div className="p-6 text-[13px] text-[#706e6b]">Erst nach Speichern verfügbar</div> },
        ]}
      />
    </div>
  );
}
