import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Trash2, AlertCircle } from "lucide-react";
import Badge, { getStatusVariant } from "../components/Badge";

const STATUSES = ["Neu", "In Bearbeitung", "Warten", "Eskaliert", "Geschlossen"];
const PRIORITIES = ["Niedrig", "Mittel", "Hoch", "Kritisch"];
const RECORD_TYPES = ["Standard", "Beschwerde", "Schaden", "Wartung"];

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

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/cases" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{isNew ? "Neuer Case" : caseData.subject}</h1>
          {!isNew && (
            <div className="flex gap-2 mt-1">
              <Badge variant={getStatusVariant(caseData.status)}>{caseData.status}</Badge>
              {caseData.priority && <Badge variant={caseData.priority === "Kritisch" || caseData.priority === "Hoch" ? "danger" : "neutral"}>{caseData.priority}</Badge>}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {!isNew && <button onClick={handleDelete} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>}
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-[#029fde] hover:bg-[#0280b3] text-white rounded-lg flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" />{saving ? "Speichert..." : "Speichern"}
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-[#029fde]" /> Case-Daten</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Betreff *</label>
              <input value={caseData.subject || ""} onChange={e => update("subject", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Typ</label>
              <select value={caseData.recordType || "Standard"} onChange={e => update("recordType", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                {RECORD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={caseData.status || "Neu"} onChange={e => update("status", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priorität</label>
              <select value={caseData.priority || "Mittel"} onChange={e => update("priority", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
              <select value={caseData.accountId || ""} onChange={e => update("accountId", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">-- Wählen --</option>
                {accounts.map((a: any) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kontakt</label>
              <select value={caseData.contactId || ""} onChange={e => update("contactId", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">-- Wählen --</option>
                {contacts.map((c: any) => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unterkunft</label>
              <input value={caseData.unterkunftId || ""} onChange={e => update("unterkunftId", e.target.value)} placeholder="Unterkunft-ID" className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Beschreibung</h2>
          <textarea value={caseData.description || ""} onChange={e => update("description", e.target.value)} rows={5} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Lösung</h2>
          <textarea value={caseData.resolution || ""} onChange={e => update("resolution", e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg" placeholder="Lösungsbeschreibung..." />
        </div>
      </div>
    </div>
  );
}
