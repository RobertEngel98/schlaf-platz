import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Trash2, Building2, MapPin } from "lucide-react";
import Badge from "../components/Badge";

interface Account {
  id: string;
  recordType: string;
  name: string;
  phone?: string;
  email?: string;
  website?: string;
  industry?: string;
  billingStreet?: string;
  billingCity?: string;
  billingPostalCode?: string;
  billingState?: string;
  billingCountry?: string;
  shippingStreet?: string;
  shippingCity?: string;
  shippingPostalCode?: string;
  shippingState?: string;
  shippingCountry?: string;
  keyAccountManagerId?: string;
  anzahlBuchungen: number;
  anzahlUnterkuenfte: number;
  vermieterNummer?: string;
  vermieterStatus?: string;
  steuerNummer?: string;
  iban?: string;
  bic?: string;
  bankName?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const emptyAccount: Partial<Account> = {
  recordType: "Account_Standart",
  name: "",
  phone: "",
  email: "",
  website: "",
  billingStreet: "",
  billingCity: "",
  billingPostalCode: "",
  billingCountry: "Deutschland",
  description: "",
};

export default function AccountDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "neu";
  const [account, setAccount] = useState<Partial<Account>>(emptyAccount);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew && id) {
      fetch(`/api/accounts/${id}`, { credentials: "include" })
        .then((r) => r.json())
        .then((data) => { setAccount(data); setLoading(false); })
        .catch(() => { setError("Account nicht gefunden"); setLoading(false); });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const url = isNew ? "/api/accounts" : `/api/accounts/${id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(account),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Fehler beim Speichern");
        return;
      }
      const saved = await res.json();
      if (isNew) navigate(`/accounts/${saved.id}`, { replace: true });
      else setAccount(saved);
    } catch {
      setError("Verbindungsfehler");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Account wirklich löschen?")) return;
    await fetch(`/api/accounts/${id}`, { method: "DELETE", credentials: "include" });
    navigate("/accounts");
  };

  const update = (field: string, value: any) => setAccount((prev) => ({ ...prev, [field]: value }));

  if (loading) return <div className="p-8 text-gray-500">Laden...</div>;

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/accounts" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? "Neuer Account" : account.name}
          </h1>
          {!isNew && (
            <div className="flex gap-2 mt-1">
              <Badge variant={account.recordType === "Account_Vermieter" ? "info" : "neutral"}>
                {account.recordType === "Account_Vermieter" ? "Vermieter" : "Kunde"}
              </Badge>
              <span className="text-sm text-gray-500">
                {account.anzahlBuchungen} Buchungen &middot; {account.anzahlUnterkuenfte} Unterkünfte
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <button onClick={handleDelete} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-[#029fde] hover:bg-[#0280b3] text-white rounded-lg flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" />
            {saving ? "Speichert..." : "Speichern"}
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}

      <div className="space-y-6">
        {/* Basisdaten */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#029fde]" /> Basisdaten
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input value={account.name || ""} onChange={(e) => update("name", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Typ</label>
              <select value={account.recordType || ""} onChange={(e) => update("recordType", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none">
                <option value="Account_Standart">Kunde</option>
                <option value="Account_Vermieter">Vermieter</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input value={account.phone || ""} onChange={(e) => update("phone", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
              <input type="email" value={account.email || ""} onChange={(e) => update("email", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input value={account.website || ""} onChange={(e) => update("website", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branche</label>
              <input value={account.industry || ""} onChange={(e) => update("industry", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
            </div>
          </div>
        </div>

        {/* Adresse */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#029fde]" /> Rechnungsadresse
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Straße</label>
              <input value={account.billingStreet || ""} onChange={(e) => update("billingStreet", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PLZ</label>
              <input value={account.billingPostalCode || ""} onChange={(e) => update("billingPostalCode", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stadt</label>
              <input value={account.billingCity || ""} onChange={(e) => update("billingCity", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bundesland</label>
              <input value={account.billingState || ""} onChange={(e) => update("billingState", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Land</label>
              <input value={account.billingCountry || ""} onChange={(e) => update("billingCountry", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
            </div>
          </div>
        </div>

        {/* Vermieter-spezifisch */}
        {account.recordType === "Account_Vermieter" && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Vermieter-Daten</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vermieter-Nummer</label>
                <input value={account.vermieterNummer || ""} onChange={(e) => update("vermieterNummer", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={account.vermieterStatus || ""} onChange={(e) => update("vermieterStatus", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none">
                  <option value="">-- Wählen --</option>
                  <option value="Aktiv">Aktiv</option>
                  <option value="Inaktiv">Inaktiv</option>
                  <option value="Gekündigt">Gekündigt</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Steuernummer</label>
                <input value={account.steuerNummer || ""} onChange={(e) => update("steuerNummer", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IBAN</label>
                <input value={account.iban || ""} onChange={(e) => update("iban", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BIC</label>
                <input value={account.bic || ""} onChange={(e) => update("bic", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
                <input value={account.bankName || ""} onChange={(e) => update("bankName", e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
              </div>
            </div>
          </div>
        )}

        {/* Beschreibung */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Beschreibung</h2>
          <textarea value={account.description || ""} onChange={(e) => update("description", e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#029fde] outline-none" />
        </div>
      </div>
    </div>
  );
}
