import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, Trash2, CheckSquare, Phone, MessageSquare } from "lucide-react";
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

const STATUSES = ["Offen", "In Bearbeitung", "Erledigt", "Abgebrochen"];
const PRIORITIES = ["Niedrig", "Mittel", "Hoch"];

const PATH_STAGES = STATUSES.map((s) => ({ key: s, label: s }));

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "neu";
  const [task, setTask] = useState<any>({ subject: "", status: "Offen", priority: "Mittel" });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew && id) {
      fetch(`/api/tasks/${id}`, { credentials: "include" })
        .then(r => r.json())
        .then(data => { setTask(data); setLoading(false); })
        .catch(() => { setError("Aufgabe nicht gefunden"); setLoading(false); });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      const url = isNew ? "/api/tasks" : `/api/tasks/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
        credentials: "include",
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Fehler"); return; }
      const saved = await res.json();
      if (isNew) navigate(`/tasks/${saved.id}`, { replace: true });
      else setTask(saved);
    } catch { setError("Verbindungsfehler"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Aufgabe wirklich löschen?")) return;
    await fetch(`/api/tasks/${id}`, { method: "DELETE", credentials: "include" });
    navigate("/tasks");
  };

  const update = (f: string, v: any) => setTask((p: any) => ({ ...p, [f]: v }));

  if (loading) return <div className="p-8 text-gray-500">Laden...</div>;

  // --- Highlight fields ---
  const highlightFields = [
    {
      label: "Status",
      value: <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>,
    },
    {
      label: "Priorität",
      value: task.priority || "—",
    },
    {
      label: "Fällig am",
      value: task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("de-DE")
        : "—",
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

      {/* Aufgabe Section */}
      <DetailSection
        title="Aufgabe"
        icon={<CheckSquare className="w-4 h-4" />}
      >
        <DetailField label="Betreff" required fullWidth>
          <input
            value={task.subject || ""}
            onChange={(e) => update("subject", e.target.value)}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Status">
          <select
            value={task.status || "Offen"}
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
            value={task.priority || "Mittel"}
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

        <DetailField label="Fällig am">
          <input
            type="date"
            value={task.dueDate || ""}
            onChange={(e) => update("dueDate", e.target.value)}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Opportunity-ID">
          <input
            value={task.opportunityId || ""}
            onChange={(e) => update("opportunityId", e.target.value)}
            className={sldsInput}
            placeholder="Optional"
          />
        </DetailField>
      </DetailSection>

      {/* Beschreibung Section */}
      <DetailSection title="Beschreibung">
        <DetailField label="Beschreibung" fullWidth>
          <textarea
            value={task.description || ""}
            onChange={(e) => update("description", e.target.value)}
            rows={5}
            className={sldsTextarea}
          />
        </DetailField>
      </DetailSection>
    </div>
  );

  // --- Related tab content ---
  const relatedContent = (
    <div className="bg-white rounded-lg border border-[#e5e5e5] p-8 text-center text-[13px] text-[#706e6b]">
      Keine verknüpften Datensätze vorhanden
    </div>
  );

  // --- Tabs ---
  const tabs = [
    { key: "details", label: "Details", content: detailsContent },
    { key: "related", label: "Verknüpft", content: relatedContent },
    { key: "activity", label: "Aktivitäten", content: !isNew && id ? <ActivityTimeline entityType="task" entityId={id} /> : <div className="p-6 text-[13px] text-[#706e6b]">Erst nach Speichern verfügbar</div> },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Record Highlights */}
      <RecordHighlights
        backPath="/tasks"
        icon={<CheckSquare className="w-5 h-5 text-white" />}
        iconColor="#2E844A"
        entityLabel="Aufgabe"
        title={isNew ? "Neue Aufgabe" : task.subject}
        highlightFields={highlightFields}
        actions={actions}
      />

      {/* Record Path (only for existing records) */}
      {!isNew && (
        <RecordPath
          stages={PATH_STAGES}
          currentStage={task.status}
          onStageClick={(stageKey) => update("status", stageKey)}
          linear
        />
      )}

      {!isNew && id && (
        <QuickActions actions={[
          { key: "call", label: "Anruf loggen", icon: <Phone className="w-4 h-4" />, onClick: () => {
            fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
              body: JSON.stringify({ entityType: "task", entityId: id, activityType: "call_logged", title: "Anruf geloggt" })
            }).then(() => {});
          }},
          { key: "comment", label: "Kommentar", icon: <MessageSquare className="w-4 h-4" />, onClick: () => {} },
          { key: "task", label: "Neue Aufgabe", icon: <CheckSquare className="w-4 h-4" />, onClick: () => {
            fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
              body: JSON.stringify({ entityType: "task", entityId: id, activityType: "task_created", title: "Aufgabe erstellt" })
            }).then(() => {});
          }},
        ]} />
      )}

      {/* Record Tabs */}
      <RecordTabs tabs={tabs} defaultTab="details" />
    </div>
  );
}
