import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Trash2, UserPlus, MapPin } from "lucide-react";
import Badge, { getStatusVariant } from "../components/Badge";

const STATUSES = ["Neu", "Kontaktiert", "Qualifiziert", "Nichterreicht", "Verloren", "Konvertiert"];
const SOURCES = ["Web", "Telefon", "Empfehlung", "Messe", "Online-Werbung", "Social Media", "Partner", "Sonstige"];

export default function LeadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "neu";
  const [lead, setLead] = useState<any>({ status: "Neu", lastName: "", country: "Deutschland" });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

  if (loading) return <div className="p-8 text-gray-500">Laden...</div>;

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/leads" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{isNew ? "Neuer Lead" : `${lead.firstName || ""} ${lead.lastName}`}</h1>
          {!isNew && (
            <div className="flex gap-2 mt-1">
              <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
              {lead.company && <span className="text-sm text-gray-500">{lead.company}</span>}
            </div>
          )}
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
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><UserPlus className="w-5 h-5 text-[#0176d3]" /> Lead-Daten</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Anrede</label>
              <select value={lead.salutation || ""} onChange={e => update("salutation", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">-- Wählen --</option>
                <option value="Herr">Herr</option>
                <option value="Frau">Frau</option>
                <option value="Divers">Divers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Firma</label>
              <input value={lead.company || ""} onChange={e => update("company", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vorname</label>
              <input value={lead.firstName || ""} onChange={e => update("firstName", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nachname *</label>
              <input value={lead.lastName || ""} onChange={e => update("lastName", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
              <input type="email" value={lead.email || ""} onChange={e => update("email", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input value={lead.phone || ""} onChange={e => update("phone", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobil</label>
              <input value={lead.mobilePhone || ""} onChange={e => update("mobilePhone", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quelle</label>
              <select value={lead.source || ""} onChange={e => update("source", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">-- Wählen --</option>
                {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={lead.status || "Neu"} onChange={e => update("status", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nurture-Stufe</label>
              <select value={lead.nurtureStage || ""} onChange={e => update("nurtureStage", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">-- Wählen --</option>
                <option value="Kalt">Kalt</option>
                <option value="Warm">Warm</option>
                <option value="Heiß">Heiß</option>
              </select>
            </div>
          </div>
        </div>

        {lead.status === "Verloren" && (
          <div className="bg-white rounded-xl shadow-sm border p-6 border-l-4 border-l-red-400">
            <h2 className="text-lg font-semibold mb-4 text-red-700">Verlustgrund</h2>
            <textarea value={lead.lossReason || ""} onChange={e => update("lossReason", e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-lg" placeholder="Bitte gib einen Verlustgrund an..." />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#0176d3]" /> Adresse</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Straße</label>
              <input value={lead.street || ""} onChange={e => update("street", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PLZ</label>
              <input value={lead.postalCode || ""} onChange={e => update("postalCode", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stadt</label>
              <input value={lead.city || ""} onChange={e => update("city", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bundesland</label>
              <input value={lead.state || ""} onChange={e => update("state", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Land</label>
              <input value={lead.country || ""} onChange={e => update("country", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Beschreibung</h2>
          <textarea value={lead.description || ""} onChange={e => update("description", e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg" />
        </div>
      </div>
    </div>
  );
}
