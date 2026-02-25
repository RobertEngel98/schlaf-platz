import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, Trash2, AlertCircle, Phone, MessageSquare, CheckSquare as CheckSquareIcon } from "lucide-react";
import ActivityTimeline from "../components/ActivityTimeline";
import QuickActions from "../components/QuickActions";
import Badge, { getStatusVariant } from "../components/Badge";
import RecordHighlights from "../components/RecordHighlights";
import RecordPath from "../components/RecordPath";
import RecordTabs from "../components/RecordTabs";
import DetailSection, { DetailField } from "../components/DetailSection";
import {
  SldsPrimaryButton,
  SldsOutlineButton,
  sldsInput,
  sldsSelect,
  sldsTextarea,
} from "../components/SalesforceField";

const STATUSES = ["Neu", "In Bearbeitung", "Warten", "Eskaliert", "Geschlossen"];
const PRIORITIES = ["Niedrig", "Mittel", "Hoch", "Kritisch"];
const RECORD_TYPES = ["Standard", "Beschwerde", "Schaden", "Wartung"];

const PATH_STAGES = STATUSES.map((s) => ({ key: s, label: s }));

export default function CaseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "neu";
  const [caseData, setCaseData] = useState<any>({ subject: "", status: "Neu", priority: "Mittel", recordType: "Standard" });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/accounts?limit=500", { credentials: "include" }).then(r => r.json()).then(d => setAccounts(d.data || []));
    fetch("/api/contacts?limit=500", { credentials: "include" }).then(r => r.json()).then(d => setContacts(d.data || []));
    if (!isNew && id) {
      fetch(`/api/cases/${id}`, { credentials: "include" })
        .then(r => r.json())
        .then(data => { setCaseData(data); setLoading(false); })
        .catch(() => { setError("Case nicht gefunden"); setLoading(false); });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      const url = isNew ? "/api/cases" : `/api/cases/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(caseData),
        credentials: "include",
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Fehler"); return; }
      const saved = await res.json();
      if (isNew) navigate(`/cases/${saved.id}`, { replace: true });
      else setCaseData(saved);
    } catch { setError("Verbindungsfehler"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Case wirklich löschen?")) return;
    await fetch(`/api/cases/${id}`, { method: "DELETE", credentials: "include" });
    navigate("/cases");
  };

  const update = (f: string, v: any) => setCaseData((p: any) => ({ ...p, [f]: v }));

  if (loading) return <div className="p-8 text-gray-500">Laden...</div>;

  // --- Resolve account name for highlight ---
  const accountName =
    accounts.find((a) => String(a.id) === String(caseData.accountId))?.name || "—";

  // --- Highlight fields ---
  const highlightFields = [
    {
      label: "Status",
      value: <Badge variant={getStatusVariant(caseData.status)}>{caseData.status}</Badge>,
    },
    {
      label: "Priorität",
      value: (
        <Badge
          variant={
            caseData.priority === "Kritisch" || caseData.priority === "Hoch"
              ? "danger"
              : "neutral"
          }
        >
          {caseData.priority}
        </Badge>
      ),
    },
    {
      label: "Typ",
      value: caseData.recordType || "—",
    },
    {
      label: "Account",
      value: accountName,
    },
  ];

  // --- Actions ---
  const actions = (
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
  );

  // --- Details tab content ---
  const detailsContent = (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-[13px]">
          {error}
        </div>
      )}

      {/* Case-Daten Section */}
      <DetailSection
        title="Case-Daten"
        icon={<AlertCircle className="w-4 h-4" />}
      >
        <DetailField label="Betreff" required fullWidth>
          <input
            value={caseData.subject || ""}
            onChange={(e) => update("subject", e.target.value)}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Typ">
          <select
            value={caseData.recordType || "Standard"}
            onChange={(e) => update("recordType", e.target.value)}
            className={sldsSelect}
          >
            {RECORD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </DetailField>

        <DetailField label="Status">
          <select
            value={caseData.status || "Neu"}
            onChange={(e) => update("status", e.target.value)}
            className={sldsSelect}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </DetailField>

        <DetailField label="Priorität">
          <select
            value={caseData.priority || "Mittel"}
            onChange={(e) => update("priority", e.target.value)}
            className={sldsSelect}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </DetailField>

        <DetailField label="Account">
          <select
            value={caseData.accountId || ""}
            onChange={(e) => update("accountId", e.target.value)}
            className={sldsSelect}
          >
            <option value="">-- Wählen --</option>
            {accounts.map((a: any) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </DetailField>

        <DetailField label="Kontakt">
          <select
            value={caseData.contactId || ""}
            onChange={(e) => update("contactId", e.target.value)}
            className={sldsSelect}
          >
            <option value="">-- Wählen --</option>
            {contacts.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.firstName} {c.lastName}
              </option>
            ))}
          </select>
        </DetailField>

        <DetailField label="Unterkunft">
          <input
            value={caseData.unterkunftId || ""}
            onChange={(e) => update("unterkunftId", e.target.value)}
            placeholder="Unterkunft-ID"
            className={sldsInput}
          />
        </DetailField>
      </DetailSection>

      {/* Beschreibung Section */}
      <DetailSection title="Beschreibung">
        <DetailField label="Beschreibung" fullWidth>
          <textarea
            value={caseData.description || ""}
            onChange={(e) => update("description", e.target.value)}
            rows={5}
            className={sldsTextarea}
          />
        </DetailField>
      </DetailSection>

      {/* Lösung Section */}
      <DetailSection title="Lösung">
        <DetailField label="Lösung" fullWidth>
          <textarea
            value={caseData.resolution || ""}
            onChange={(e) => update("resolution", e.target.value)}
            rows={4}
            className={sldsTextarea}
            placeholder="Lösungsbeschreibung..."
          />
        </DetailField>
      </DetailSection>
    </div>
  );

  // --- Related tab content ---
  const relatedContent = (
    <div className="bg-white rounded-lg border border-[#e5e5e5] p-8 text-center text-[13px] text-[#706e6b]">
      Keine Related Lists vorhanden
    </div>
  );

  // --- Tabs ---
  const tabs = [
    { key: "details", label: "Details", content: detailsContent },
    { key: "related", label: "Verknüpft", content: relatedContent },
    { key: "activity", label: "Aktivitäten", content: !isNew && id ? <ActivityTimeline entityType="case" entityId={id} /> : <div className="p-6 text-[13px] text-[#706e6b]">Erst nach Speichern verfügbar</div> },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Record Highlights */}
      <RecordHighlights
        backPath="/cases"
        icon={<AlertCircle className="w-5 h-5 text-white" />}
        iconColor="#EA001E"
        entityLabel="Case"
        title={isNew ? "Neuer Case" : caseData.subject}
        highlightFields={highlightFields}
        actions={actions}
      />

      {/* Record Path (only for existing records) */}
      {!isNew && (
        <RecordPath
          stages={PATH_STAGES}
          currentStage={caseData.status}
          onStageClick={(stageKey) => update("status", stageKey)}
          linear
        />
      )}

      {!isNew && id && (
        <QuickActions actions={[
          { key: "call", label: "Anruf loggen", icon: <Phone className="w-4 h-4" />, onClick: () => {
            fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
              body: JSON.stringify({ entityType: "case", entityId: id, activityType: "call_logged", title: "Anruf geloggt" })
            }).then(() => {});
          }},
          { key: "comment", label: "Kommentar", icon: <MessageSquare className="w-4 h-4" />, onClick: () => {} },
          { key: "task", label: "Neue Aufgabe", icon: <CheckSquareIcon className="w-4 h-4" />, onClick: () => {
            fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
              body: JSON.stringify({ entityType: "case", entityId: id, activityType: "task_created", title: "Aufgabe erstellt" })
            }).then(() => {});
          }},
        ]} />
      )}

      {/* Record Tabs */}
      <RecordTabs tabs={tabs} defaultTab="details" />
    </div>
  );
}
