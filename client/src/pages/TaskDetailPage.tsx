import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Trash2, CheckSquare } from "lucide-react";
import Badge, { getStatusVariant } from "../components/Badge";

const STATUSES = ["Offen", "In Bearbeitung", "Erledigt", "Abgebrochen"];
const PRIORITIES = ["Niedrig", "Mittel", "Hoch"];

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

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/tasks" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{isNew ? "Neue Aufgabe" : task.subject}</h1>
          {!isNew && <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>}
        </div>
        <div className="flex gap-2">
          {!isNew && <button onClick={handleDelete} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>}
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-[#0176d3] hover:bg-[#0280b3] text-white rounded-lg flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" />{saving ? "Speichert..." : "Speichern"}
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><CheckSquare className="w-5 h-5 text-[#0176d3]" /> Aufgabe</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Betreff *</label>
              <input value={task.subject || ""} onChange={e => update("subject", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={task.status || "Offen"} onChange={e => update("status", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priorität</label>
              <select value={task.priority || "Mittel"} onChange={e => update("priority", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fällig am</label>
              <input type="date" value={task.dueDate || ""} onChange={e => update("dueDate", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity-ID</label>
              <input value={task.opportunityId || ""} onChange={e => update("opportunityId", e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Optional" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Beschreibung</h2>
          <textarea value={task.description || ""} onChange={e => update("description", e.target.value)} rows={5} className="w-full px-3 py-2 border rounded-lg" />
        </div>
      </div>
    </div>
  );
}
