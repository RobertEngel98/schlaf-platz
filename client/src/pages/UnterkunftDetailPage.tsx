import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Trash2, Home, MapPin, Euro, Settings } from "lucide-react";
import Badge, { getStatusVariant } from "../components/Badge";

const STATUS_OPTIONS = ["Verfügbar", "Belegt", "Inaktiv", "In Aufnahme", "Gesperrt"];
const TYP_OPTIONS = ["Wohnung", "Apartment", "Zimmer", "Haus", "Studio", "WG-Zimmer", "Monteurzimmer"];
const AUFNAHME_STATUS = ["Neu", "Daten erfasst", "Fotos gemacht", "Online", "Abgeschlossen"];

export default function UnterkunftDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "neu";
  const [uk, setUk] = useState<any>({ name: "", status: "In Aufnahme", land: "Deutschland" });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [vermieter, setVermieter] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/accounts?limit=500&recordType=Account_Vermieter", { credentials: "include" }).then(r => r.json()).then(d => setVermieter(d.data || []));
    if (!isNew && id) {
      fetch(`/api/unterkuenfte/${id}`, { credentials: "include" })
        .then(r => r.json())
        .then(data => { setUk(data); setLoading(false); })
        .catch(() => { setError("Unterkunft nicht gefunden"); setLoading(false); });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      const url = isNew ? "/api/unterkuenfte" : `/api/unterkuenfte/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(uk),
        credentials: "include",
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Fehler"); return; }
      const saved = await res.json();
      if (isNew) navigate(`/unterkuenfte/${saved.id}`, { replace: true });
      else setUk(saved);
    } catch { setError("Verbindungsfehler"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Unterkunft wirklich löschen?")) return;
    await fetch(`/api/unterkuenfte/${id}`, { method: "DELETE", credentials: "include" });
    navigate("/unterkuenfte");
  };

  const update = (f: string, v: any) => setUk((p: any) => ({ ...p, [f]: v }));

  const Checkbox = ({ field, label }: { field: string; label: string }) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={uk[field] || false} onChange={e => update(field, e.target.checked)} className="w-4 h-4 accent-[#0176d3]" />
      <span className="text-sm">{label}</span>
    </label>
  );

  if (loading) return <div className="p-8 text-gray-500">Laden...</div>;

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/unterkuenfte" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{isNew ? "Neue Unterkunft" : uk.name}</h1>
          {!isNew && (
            <div className="flex gap-2 mt-1">
              <Badge variant={getStatusVariant(uk.status)}>{uk.status}</Badge>
              {uk.ort && <span className="text-sm text-gray-500">{uk.ort}</span>}
              {uk.aufnahmeProzent != null && <span className="text-sm text-gray-500">Aufnahme: {uk.aufnahmeProzent}%</span>}
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

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Basis */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Home className="w-5 h-5 text-[#0176d3]" /> Basisdaten</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input value={uk.name || ""} onChange={e => update("name", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vermieter</label>
                <select value={uk.vermieterId || ""} onChange={e => update("vermieterId", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">-- Wählen --</option>
                  {vermieter.map((v: any) => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Typ</label>
                <select value={uk.unterkunftsTyp || ""} onChange={e => update("unterkunftsTyp", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">-- Wählen --</option>
                  {TYP_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={uk.status || ""} onChange={e => update("status", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aufnahme-Status</label>
                <select value={uk.aufnahmeStatus || ""} onChange={e => update("aufnahmeStatus", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">-- Wählen --</option>
                  {AUFNAHME_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Adresse */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#0176d3]" /> Adresse</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Straße</label>
                <input value={uk.strasse || ""} onChange={e => update("strasse", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hausnummer</label>
                <input value={uk.hausnummer || ""} onChange={e => update("hausnummer", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PLZ</label>
                <input value={uk.plz || ""} onChange={e => update("plz", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ort</label>
                <input value={uk.ort || ""} onChange={e => update("ort", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bundesland</label>
                <input value={uk.bundesland || ""} onChange={e => update("bundesland", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Land</label>
                <input value={uk.land || ""} onChange={e => update("land", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          {/* Kapazität */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Kapazität & Größe</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zimmer</label>
                <input type="number" value={uk.anzahlZimmer || ""} onChange={e => update("anzahlZimmer", parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Betten</label>
                <input type="number" value={uk.anzahlBetten || ""} onChange={e => update("anzahlBetten", parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badezimmer</label>
                <input type="number" value={uk.anzahlBadezimmer || ""} onChange={e => update("anzahlBadezimmer", parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max. Personen</label>
                <input type="number" value={uk.maxPersonen || ""} onChange={e => update("maxPersonen", parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wohnfläche (m²)</label>
                <input type="number" value={uk.wohnflaeche || ""} onChange={e => update("wohnflaeche", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mindestaufenthalt (Nächte)</label>
                <input type="number" value={uk.mindestaufenthalt || ""} onChange={e => update("mindestaufenthalt", parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          {/* Preise */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Euro className="w-5 h-5 text-[#0176d3]" /> Preise</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preis/Nacht (€)</label>
                <input type="number" step="0.01" value={uk.preisProNacht || ""} onChange={e => update("preisProNacht", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preis/Nacht inkl. MwSt (€)</label>
                <input type="number" step="0.01" value={uk.preisProNachtInklMwst || ""} onChange={e => update("preisProNachtInklMwst", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MwSt-Satz (%)</label>
                <select value={uk.mwstSatz || "7"} onChange={e => update("mwstSatz", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg">
                  <option value="7">7%</option>
                  <option value="19">19%</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reinigungskosten (€)</label>
                <input type="number" step="0.01" value={uk.reinigungskosten || ""} onChange={e => update("reinigungskosten", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kaution (€)</label>
                <input type="number" step="0.01" value={uk.kaution || ""} onChange={e => update("kaution", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provision (%)</label>
                <input type="number" step="0.01" value={uk.provisionProzent || ""} onChange={e => update("provisionProzent", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          {/* Ausstattung */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Settings className="w-5 h-5 text-[#0176d3]" /> Ausstattung</h2>
            <div className="grid grid-cols-4 gap-3">
              <Checkbox field="kueche" label="Küche" />
              <Checkbox field="waschmaschine" label="Waschmaschine" />
              <Checkbox field="trockner" label="Trockner" />
              <Checkbox field="wlan" label="WLAN" />
              <Checkbox field="parkplatz" label="Parkplatz" />
              <Checkbox field="aufzug" label="Aufzug" />
              <Checkbox field="balkon" label="Balkon" />
              <Checkbox field="terrasse" label="Terrasse" />
              <Checkbox field="garten" label="Garten" />
              <Checkbox field="klimaanlage" label="Klimaanlage" />
              <Checkbox field="haustiere" label="Haustiere erlaubt" />
              <Checkbox field="rauchen" label="Rauchen erlaubt" />
              <Checkbox field="bettwaesche" label="Bettwäsche" />
              <Checkbox field="handtuecher" label="Handtücher" />
              <Checkbox field="fernseher" label="Fernseher" />
              <Checkbox field="geschirrspueler" label="Geschirrspüler" />
              <Checkbox field="mikrowelle" label="Mikrowelle" />
              <Checkbox field="backofen" label="Backofen" />
              <Checkbox field="kuehlschrank" label="Kühlschrank" />
              <Checkbox field="kaffeemaschine" label="Kaffeemaschine" />
            </div>
          </div>

          {/* Texte */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Beschreibung & Regeln</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                <textarea value={uk.beschreibung || ""} onChange={e => update("beschreibung", e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anreisebeschreibung</label>
                <textarea value={uk.anreiseBeschreibung || ""} onChange={e => update("anreiseBeschreibung", e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hausregeln</label>
                <textarea value={uk.hausregeln || ""} onChange={e => update("hausregeln", e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Vermieter-Kontakt */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-sm font-semibold mb-3 text-gray-600 uppercase">Vermieter-Kontakt</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anrede</label>
                <select value={uk.vermieterAnrede || ""} onChange={e => update("vermieterAnrede", e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option value="">--</option>
                  <option value="Herr">Herr</option>
                  <option value="Frau">Frau</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vorname</label>
                <input value={uk.vermieterVorname || ""} onChange={e => update("vermieterVorname", e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nachname</label>
                <input value={uk.vermieterNachname || ""} onChange={e => update("vermieterNachname", e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <input value={uk.vermieterTelefon || ""} onChange={e => update("vermieterTelefon", e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                <input value={uk.vermieterEmail || ""} onChange={e => update("vermieterEmail", e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
            </div>
          </div>

          {/* Interne Notizen */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-sm font-semibold mb-3 text-gray-600 uppercase">Interne Notizen</h2>
            <textarea value={uk.interneNotizen || ""} onChange={e => update("interneNotizen", e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>

          {!isNew && (
            <div className="bg-white rounded-xl shadow-sm border p-6 text-sm text-gray-500">
              <div>Buchungen: {uk.anzahlBuchungen || 0}</div>
              <div>Aufnahme: {uk.aufnahmeProzent || 0}%</div>
              <div className="mt-2">Erstellt: {new Date(uk.createdAt).toLocaleString("de-DE")}</div>
              <div>Geändert: {new Date(uk.updatedAt).toLocaleString("de-DE")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
