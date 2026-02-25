import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Trash2, FileText, Euro } from "lucide-react";
import Badge, { getStatusVariant } from "../components/Badge";

const STATUS_OPTIONS = ["Entwurf", "Gesendet", "Angenommen", "Abgelehnt", "Abgelaufen"];

export default function AngebotDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "neu";
  const [angebot, setAngebot] = useState<any>({ name: "", status: "Entwurf", sprache: "Deutsch" });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState<any[]>([]);
  const [unterkuenfte, setUnterkuenfte] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/accounts?limit=500", { credentials: "include" }).then(r => r.json()).then(d => setAccounts(d.data || []));
    fetch("/api/unterkuenfte?limit=500", { credentials: "include" }).then(r => r.json()).then(d => setUnterkuenfte(d.data || []));
    if (!isNew && id) {
      fetch(`/api/angebote/${id}`, { credentials: "include" })
        .then(r => r.json())
        .then(data => { setAngebot(data); setLoading(false); })
        .catch(() => { setError("Angebot nicht gefunden"); setLoading(false); });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      const url = isNew ? "/api/angebote" : `/api/angebote/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(angebot),
        credentials: "include",
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Fehler"); return; }
      const saved = await res.json();
      if (isNew) navigate(`/angebote/${saved.id}`, { replace: true });
      else setAngebot(saved);
    } catch { setError("Verbindungsfehler"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Angebot wirklich löschen?")) return;
    await fetch(`/api/angebote/${id}`, { method: "DELETE", credentials: "include" });
    navigate("/angebote");
  };

  const update = (f: string, v: any) => setAngebot((p: any) => ({ ...p, [f]: v }));

  // Auto-calculate nights
  useEffect(() => {
    if (angebot.checkIn && angebot.checkOut) {
      const days = Math.ceil((new Date(angebot.checkOut).getTime() - new Date(angebot.checkIn).getTime()) / 86400000);
      if (days > 0) update("anzahlNaechte", days);
    }
  }, [angebot.checkIn, angebot.checkOut]);

  if (loading) return <div className="p-8 text-gray-500">Laden...</div>;

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/angebote" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{isNew ? "Neues Angebot" : angebot.name}</h1>
          {!isNew && (
            <div className="flex gap-2 mt-1">
              <Badge variant={getStatusVariant(angebot.status)}>{angebot.status}</Badge>
              {angebot.angebotNummer && <span className="text-sm text-gray-500">#{angebot.angebotNummer}</span>}
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
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-[#029fde]" /> Angebotsdaten</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input value={angebot.name || ""} onChange={e => update("name", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
              <select value={angebot.accountId || ""} onChange={e => update("accountId", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">-- Wählen --</option>
                {accounts.map((a: any) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unterkunft</label>
              <select value={angebot.unterkunftId || ""} onChange={e => update("unterkunftId", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">-- Wählen --</option>
                {unterkuenfte.map((u: any) => <option key={u.id} value={u.id}>{u.name} - {u.ort}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={angebot.status || "Entwurf"} onChange={e => update("status", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gültig bis</label>
              <input type="date" value={angebot.gueltigBis || ""} onChange={e => update("gueltigBis", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sprache</label>
              <select value={angebot.sprache || "Deutsch"} onChange={e => update("sprache", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="Deutsch">Deutsch</option>
                <option value="Englisch">Englisch</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Euro className="w-5 h-5 text-[#029fde]" /> Zeitraum & Preise</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-In</label>
              <input type="date" value={angebot.checkIn || ""} onChange={e => update("checkIn", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-Out</label>
              <input type="date" value={angebot.checkOut || ""} onChange={e => update("checkOut", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nächte</label>
              <input type="number" value={angebot.anzahlNaechte || ""} readOnly className="w-full px-3 py-2 border rounded-lg bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Personen</label>
              <input type="number" value={angebot.anzahlPersonen || ""} onChange={e => update("anzahlPersonen", parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preis/Nacht (€)</label>
              <input type="number" step="0.01" value={angebot.preisProNacht || ""} onChange={e => update("preisProNacht", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gesamtpreis (€)</label>
              <input type="number" step="0.01" value={angebot.gesamtPreis || ""} onChange={e => update("gesamtPreis", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reinigungskosten (€)</label>
              <input type="number" step="0.01" value={angebot.reinigungskosten || ""} onChange={e => update("reinigungskosten", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kaution (€)</label>
              <input type="number" step="0.01" value={angebot.kaution || ""} onChange={e => update("kaution", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MwSt (%)</label>
              <select value={angebot.mwstSatz || "7"} onChange={e => update("mwstSatz", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg">
                <option value="7">7%</option>
                <option value="19">19%</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Beschreibung</h2>
          <textarea value={angebot.beschreibung || ""} onChange={e => update("beschreibung", e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg" />
        </div>
      </div>
    </div>
  );
}
