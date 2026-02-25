import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Trash2, Calendar, Euro, User, Phone, MessageSquare, CheckSquare as CheckSquareIcon } from "lucide-react";
import ActivityTimeline from "../components/ActivityTimeline";
import QuickActions from "../components/QuickActions";
import Badge, { getStatusVariant } from "../components/Badge";

const RECORD_TYPES = [
  { value: "Buchung", label: "Buchung" },
  { value: "Feste_Objekt_Buchung", label: "Feste Objekt Buchung" },
  { value: "Gutschriften", label: "Gutschrift" },
  { value: "Kaution", label: "Kaution" },
  { value: "Schaden", label: "Schaden" },
  { value: "Stornos", label: "Storno" },
];

const PHASEN = ["Neu", "Bestätigt", "Aktiv", "Abgeschlossen", "Verloren", "Storniert"];

export default function BuchungDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "neu";
  const [buchung, setBuchung] = useState<any>({ recordType: "Buchung", buchungsphase: "Neu" });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [unterkuenfte, setUnterkuenfte] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    // Load reference data
    fetch("/api/unterkuenfte?limit=500", { credentials: "include" }).then(r => r.json()).then(d => setUnterkuenfte(d.data || []));
    fetch("/api/accounts?limit=500", { credentials: "include" }).then(r => r.json()).then(d => setAccounts(d.data || []));

    if (!isNew && id) {
      fetch(`/api/buchungen/${id}`, { credentials: "include" })
        .then(r => r.json())
        .then(data => { setBuchung(data); setLoading(false); })
        .catch(() => { setError("Buchung nicht gefunden"); setLoading(false); });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      const url = isNew ? "/api/buchungen" : `/api/buchungen/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buchung),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Fehler beim Speichern");
        return;
      }
      const saved = await res.json();
      if (isNew) navigate(`/buchungen/${saved.id}`, { replace: true });
      else setBuchung(saved);
    } catch { setError("Verbindungsfehler"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Buchung wirklich löschen?")) return;
    await fetch(`/api/buchungen/${id}`, { method: "DELETE", credentials: "include" });
    navigate("/buchungen");
  };

  const update = (field: string, value: any) => setBuchung((prev: any) => ({ ...prev, [field]: value }));

  // Auto-calculate nights
  useEffect(() => {
    if (buchung.checkIn && buchung.checkOut) {
      const days = Math.ceil((new Date(buchung.checkOut).getTime() - new Date(buchung.checkIn).getTime()) / 86400000);
      if (days > 0) update("anzahlNaechte", days);
    }
  }, [buchung.checkIn, buchung.checkOut]);

  if (loading) return <div className="p-8 text-gray-500">Laden...</div>;

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/buchungen" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{isNew ? "Neue Buchung" : `Buchung ${buchung.buchungsNummer || buchung.id?.slice(0,8)}`}</h1>
          {!isNew && <Badge variant={getStatusVariant(buchung.buchungsphase)}>{buchung.buchungsphase}</Badge>}
        </div>
        <div className="flex gap-2">
          {!isNew && <button onClick={handleDelete} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>}
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-[#0176d3] hover:bg-[#0280b3] text-white rounded-lg flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" />{saving ? "Speichert..." : "Speichern"}
          </button>
        </div>
      </div>

      {!isNew && id && (
        <div className="mb-4">
          <QuickActions actions={[
            { key: "call", label: "Anruf loggen", icon: <Phone className="w-4 h-4" />, onClick: () => {
              fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
                body: JSON.stringify({ entityType: "buchung", entityId: id, activityType: "call_logged", title: "Anruf geloggt" })
              }).then(() => {});
            }},
            { key: "comment", label: "Kommentar", icon: <MessageSquare className="w-4 h-4" />, onClick: () => {} },
            { key: "task", label: "Neue Aufgabe", icon: <CheckSquareIcon className="w-4 h-4" />, onClick: () => {
              fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
                body: JSON.stringify({ entityType: "buchung", entityId: id, activityType: "task_created", title: "Aufgabe erstellt" })
              }).then(() => {});
            }},
          ]} />
        </div>
      )}

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}

      <div className="grid grid-cols-3 gap-6">
        {/* Spalte 1: Buchungsdetails */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-[#0176d3]" /> Buchungsdetails</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buchungstyp</label>
                <select value={buchung.recordType} onChange={e => update("recordType", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  {RECORD_TYPES.map(rt => <option key={rt.value} value={rt.value}>{rt.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                <select value={buchung.buchungsphase} onChange={e => update("buchungsphase", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  {PHASEN.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-In</label>
                <input type="date" value={buchung.checkIn || ""} onChange={e => update("checkIn", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-Out</label>
                <input type="date" value={buchung.checkOut || ""} onChange={e => update("checkOut", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nächte</label>
                <input type="number" value={buchung.anzahlNaechte || ""} onChange={e => update("anzahlNaechte", parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg bg-gray-50" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gäste</label>
                <input type="number" value={buchung.anzahlGaeste || ""} onChange={e => update("anzahlGaeste", parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          {/* Gast-Infos */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><User className="w-5 h-5 text-[#0176d3]" /> Gast</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
                <select value={buchung.accountId || ""} onChange={e => update("accountId", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">-- Wählen --</option>
                  {accounts.map((a: any) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unterkunft</label>
                <select value={buchung.unterkunftId || ""} onChange={e => update("unterkunftId", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">-- Wählen --</option>
                  {unterkuenfte.map((u: any) => <option key={u.id} value={u.id}>{u.name} - {u.ort}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gastname</label>
                <input value={buchung.gastName || ""} onChange={e => update("gastName", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gast-Telefon</label>
                <input value={buchung.gastTelefon || ""} onChange={e => update("gastTelefon", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gast-E-Mail</label>
                <input type="email" value={buchung.gastEmail || ""} onChange={e => update("gastEmail", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Baustellenleiter/Capo</label>
                <input value={buchung.baustellenleiterCapo || ""} onChange={e => update("baustellenleiterCapo", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          {/* Preise */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Euro className="w-5 h-5 text-[#0176d3]" /> Preise & Kosten</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preis/Nacht (€)</label>
                <input type="number" step="0.01" value={buchung.preisProNacht || ""} onChange={e => update("preisProNacht", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gesamtpreis (€)</label>
                <input type="number" step="0.01" value={buchung.gesamtPreis || ""} onChange={e => update("gesamtPreis", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MwSt-Satz (%)</label>
                <select value={buchung.mwstSatz || "7"} onChange={e => update("mwstSatz", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg">
                  <option value="7">7%</option>
                  <option value="19">19%</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reinigungskosten (€)</label>
                <input type="number" step="0.01" value={buchung.reinigungskosten || ""} onChange={e => update("reinigungskosten", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Steuersatz Reinigung</label>
                <select value={buchung.steuersatzReinigung || ""} onChange={e => update("steuersatzReinigung", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">-- Wählen --</option>
                  <option value="7%">7%</option>
                  <option value="19%">19%</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kaution (€)</label>
                <input type="number" step="0.01" value={buchung.kaution || ""} onChange={e => update("kaution", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provision (%)</label>
                <input type="number" step="0.01" value={buchung.provisionProzent || ""} onChange={e => update("provisionProzent", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provision (€)</label>
                <input type="number" step="0.01" value={buchung.provision || ""} onChange={e => update("provision", parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          {/* Loss / Storno */}
          {(buchung.buchungsphase === "Verloren" || buchung.buchungsphase === "Storniert" || buchung.recordType === "Stornos") && (
            <div className="bg-white rounded-xl shadow-sm border p-6 border-l-4 border-l-red-400">
              <h2 className="text-lg font-semibold mb-4 text-red-700">Verlust / Stornierung</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grund *</label>
                  <textarea value={buchung.lossReason || buchung.stornierungsGrund || ""} onChange={e => { update("lossReason", e.target.value); update("stornierungsGrund", e.target.value); }} rows={3} className="w-full px-3 py-2 border rounded-lg" placeholder="Bitte gib einen Grund an..." />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Spalte 2: Sidebar-Infos */}
        <div className="space-y-6">
          {/* Probewoche */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-sm font-semibold mb-3 text-gray-600 uppercase">Optionen</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={buchung.probewochtUeberspringen || false} onChange={e => update("probewochtUeberspringen", e.target.checked)} className="w-4 h-4 accent-[#0176d3]" />
              <span className="text-sm">Probewoche überspringen</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer mt-2">
              <input type="checkbox" checked={buchung.istProbewoche || false} onChange={e => update("istProbewoche", e.target.checked)} className="w-4 h-4 accent-[#0176d3]" />
              <span className="text-sm">Ist Probewoche</span>
            </label>
          </div>

          {/* Ursprungsbuchung */}
          {["Gutschriften", "Stornos", "Schaden"].includes(buchung.recordType) && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-sm font-semibold mb-3 text-gray-600 uppercase">Ursprungsbuchung *</h2>
              <input value={buchung.ursprungsbuchungId || ""} onChange={e => update("ursprungsbuchungId", e.target.value)} placeholder="Buchungs-ID" className="w-full px-3 py-2 border rounded-lg" />
            </div>
          )}

          {/* Notizen */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-sm font-semibold mb-3 text-gray-600 uppercase">Interne Notizen</h2>
            <textarea value={buchung.interneNotizen || ""} onChange={e => update("interneNotizen", e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>

          {/* Timestamps */}
          {!isNew && (
            <div className="bg-white rounded-xl shadow-sm border p-6 text-sm text-gray-500">
              <div>Erstellt: {new Date(buchung.createdAt).toLocaleString("de-DE")}</div>
              <div>Geändert: {new Date(buchung.updatedAt).toLocaleString("de-DE")}</div>
            </div>
          )}
        </div>
      </div>

      {/* Aktivitäten */}
      {!isNew && id && (
        <div className="mt-6">
          <ActivityTimeline entityType="buchung" entityId={id} />
        </div>
      )}
    </div>
  );
}
