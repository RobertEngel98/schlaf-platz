import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Trash2, TrendingUp, Euro } from "lucide-react";
import Badge, { getStatusVariant } from "../components/Badge";

const STAGES = ["Erstgespräch", "Qualifizierung", "Angebot", "Verhandlung", "Gewonnen", "Verloren"];

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "neu";
  const [opp, setOpp] = useState<any>({ stage: "Erstgespräch", name: "" });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/accounts?limit=500", { credentials: "include" }).then(r => r.json()).then(d => setAccounts(d.data || []));
    fetch("/api/contacts?limit=500", { credentials: "include" }).then(r => r.json()).then(d => setContacts(d.data || []));
    if (!isNew && id) {
      fetch(`/api/opportunities/${id}`, { credentials: "include" })
        .then(r => r.json())
        .then(data => { setOpp(data); setLoading(false); })
        .catch(() => { setError("Opportunity nicht gefunden"); setLoading(false); });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      const url = isNew ? "/api/opportunities" : `/api/opportunities/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opp),
        credentials: "include",
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Fehler"); return; }
      const saved = await res.json();
      if (isNew) navigate(`/opportunities/${saved.id}`, { replace: true });
      else setOpp(saved);
    } catch { setError("Verbindungsfehler"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Opportunity wirklich löschen?")) return;
    await fetch(`/api/opportunities/${id}`, { method: "DELETE", credentials: "include" });
    navigate("/opportunities");
  };

  const update = (f: string, v: any) => setOpp((p: any) => ({ ...p, [f]: v }));

  if (loading) return <div className="p-8 text-gray-500">Laden...</div>;

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/opportunities" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{isNew ? "Neue Opportunity" : opp.name}</h1>
          {!isNew && (
            <div className="flex gap-2 mt-1">
              <Badge variant={getStatusVariant(opp.stage)}>{opp.stage}</Badge>
              {opp.amount && <span className="text-sm text-gray-500">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(opp.amount)}</span>}
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

      {/* Pipeline Progress */}
      {!isNew && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex gap-1">
            {STAGES.map((s, i) => {
              const idx = STAGES.indexOf(opp.stage);
              const isActive = i <= idx;
              const isCurrent = s === opp.stage;
              return (
                <button key={s} onClick={() => update("stage", s)} className={`flex-1 py-2 px-2 text-xs font-medium rounded-lg transition-colors ${isCurrent ? "bg-[#029fde] text-white" : isActive ? "bg-[#029fde]/20 text-[#029fde]" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#029fde]" /> Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input value={opp.name || ""} onChange={e => update("name", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
                <select value={opp.accountId || ""} onChange={e => update("accountId", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">-- Wählen --</option>
                  {accounts.map((a: any) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kontakt</label>
                <select value={opp.contactId || ""} onChange={e => update("contactId", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">-- Wählen --</option>
                  {contacts.map((c: any) => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                <select value={opp.stage || "Erstgespräch"} onChange={e => update("stage", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Abschlussdatum</label>
                <input type="date" value={opp.closeDate || ""} onChange={e => update("closeDate", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wahrscheinlichkeit (%)</label>
                <input type="number" min="0" max="100" value={opp.probability || ""} onChange={e => update("probability", parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Euro className="w-5 h-5 text-[#029fde]" /> Finanzen</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Betrag (€)</label>
                <input type="number" step="0.01" value={opp.amount || ""} onChange={e => update("amount", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suchzeit (Min.)</label>
                <input type="number" value={opp.searchTimeMinutes || ""} readOnly className="w-full px-3 py-2 border rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suche Start</label>
                <input type="date" value={opp.searchStartDate || ""} onChange={e => update("searchStartDate", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suche Ende</label>
                <input type="date" value={opp.searchEndDate || ""} onChange={e => update("searchEndDate", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          {opp.stage === "Verloren" && (
            <div className="bg-white rounded-xl shadow-sm border p-6 border-l-4 border-l-red-400">
              <h2 className="text-lg font-semibold mb-4 text-red-700">Verlustgrund *</h2>
              <textarea value={opp.lossReason || ""} onChange={e => update("lossReason", e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-lg" placeholder="Bitte gib einen Verlustgrund an..." />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-sm font-semibold mb-3 text-gray-600 uppercase">Info</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Aufgaben</span><span className="font-medium">{opp.taskCount || 0}</span></div>
              {opp.searchTimeMinutes != null && <div className="flex justify-between"><span className="text-gray-500">Suchzeit</span><span className="font-medium">{opp.searchTimeMinutes} Min.</span></div>}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-sm font-semibold mb-3 text-gray-600 uppercase">Beschreibung</h2>
            <textarea value={opp.description || ""} onChange={e => update("description", e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>

          {!isNew && (
            <div className="bg-white rounded-xl shadow-sm border p-6 text-sm text-gray-500">
              <div>Erstellt: {new Date(opp.createdAt).toLocaleString("de-DE")}</div>
              <div>Geändert: {new Date(opp.updatedAt).toLocaleString("de-DE")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
