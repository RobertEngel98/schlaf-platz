import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Trash2, Users, MapPin } from "lucide-react";

export default function KontaktDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "neu";
  const [kontakt, setKontakt] = useState<any>({ lastName: "" });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
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

  if (loading) return <div className="p-8 text-gray-500">Laden...</div>;

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/kontakte" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{isNew ? "Neuer Kontakt" : `${kontakt.firstName || ""} ${kontakt.lastName}`}</h1>
          {!isNew && kontakt.account && <p className="text-sm text-gray-500">{kontakt.account.name}</p>}
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
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-[#029fde]" /> Kontaktdaten</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Anrede</label>
              <select value={kontakt.salutation || ""} onChange={e => update("salutation", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">-- Wählen --</option>
                <option value="Herr">Herr</option>
                <option value="Frau">Frau</option>
                <option value="Divers">Divers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
              <select value={kontakt.accountId || ""} onChange={e => update("accountId", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">-- Kein Account --</option>
                {accounts.map((a: any) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vorname</label>
              <input value={kontakt.firstName || ""} onChange={e => update("firstName", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nachname *</label>
              <input value={kontakt.lastName || ""} onChange={e => update("lastName", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
              <input type="email" value={kontakt.email || ""} onChange={e => update("email", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input value={kontakt.phone || ""} onChange={e => update("phone", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobil</label>
              <input value={kontakt.mobilePhone || ""} onChange={e => update("mobilePhone", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titel / Position</label>
              <input value={kontakt.title || ""} onChange={e => update("title", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Baustellenleiter/Capo</label>
              <input value={kontakt.baustellenleiterCapo || ""} onChange={e => update("baustellenleiterCapo", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kontakt Unterkunft</label>
              <input value={kontakt.kontaktUnterkunft || ""} onChange={e => update("kontaktUnterkunft", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#029fde]" /> Adresse</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Straße</label>
              <input value={kontakt.mailingStreet || ""} onChange={e => update("mailingStreet", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PLZ</label>
              <input value={kontakt.mailingPostalCode || ""} onChange={e => update("mailingPostalCode", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stadt</label>
              <input value={kontakt.mailingCity || ""} onChange={e => update("mailingCity", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bundesland</label>
              <input value={kontakt.mailingState || ""} onChange={e => update("mailingState", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Land</label>
              <input value={kontakt.mailingCountry || ""} onChange={e => update("mailingCountry", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Beschreibung</h2>
          <textarea value={kontakt.description || ""} onChange={e => update("description", e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg" />
        </div>
      </div>
    </div>
  );
}
