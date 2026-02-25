import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Home, Save, Trash2, MapPin, Euro } from "lucide-react";
import Badge, { getStatusVariant } from "../components/Badge";
import RecordHighlights from "../components/RecordHighlights";
import RecordTabs from "../components/RecordTabs";
import DetailSection, { DetailField } from "../components/DetailSection";
import { SldsPrimaryButton, SldsOutlineButton, sldsInput, sldsSelect, sldsTextarea, sldsCheckbox } from "../components/SalesforceField";

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

  if (loading) return <div className="flex items-center justify-center h-full text-[#706e6b]">Laden...</div>;

  const vermieterName = vermieter.find((v: any) => v.id === uk.vermieterId)?.name;

  // --- DETAILS TAB ---
  const detailsContent = (
    <div className="space-y-4 max-w-5xl">
      {error && <div className="p-3 bg-red-50 border border-red-200 text-[13px] text-[#ea001e] rounded">{error}</div>}

      <DetailSection title="Basisdaten" icon={<Home className="w-4 h-4" />}>
        <DetailField label="Name" required fullWidth>
          <input value={uk.name || ""} onChange={e => update("name", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Vermieter">
          <select value={uk.vermieterId || ""} onChange={e => update("vermieterId", e.target.value)} className={sldsSelect}>
            <option value="">-- Wählen --</option>
            {vermieter.map((v: any) => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
        </DetailField>
        <DetailField label="Typ">
          <select value={uk.unterkunftsTyp || ""} onChange={e => update("unterkunftsTyp", e.target.value)} className={sldsSelect}>
            <option value="">-- Wählen --</option>
            {TYP_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </DetailField>
        <DetailField label="Status">
          <select value={uk.status || ""} onChange={e => update("status", e.target.value)} className={sldsSelect}>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </DetailField>
        <DetailField label="Aufnahme-Status">
          <select value={uk.aufnahmeStatus || ""} onChange={e => update("aufnahmeStatus", e.target.value)} className={sldsSelect}>
            <option value="">-- Wählen --</option>
            {AUFNAHME_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </DetailField>
        <DetailField label="Aufnahme %">
          <input type="number" value={uk.aufnahmeProzent || ""} onChange={e => update("aufnahmeProzent", parseInt(e.target.value))} className={sldsInput} />
        </DetailField>
      </DetailSection>

      <DetailSection title="Adresse" icon={<MapPin className="w-4 h-4" />} columns={3}>
        <DetailField label="Straße" fullWidth>
          <input value={uk.strasse || ""} onChange={e => update("strasse", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Hausnummer">
          <input value={uk.hausnummer || ""} onChange={e => update("hausnummer", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="PLZ">
          <input value={uk.plz || ""} onChange={e => update("plz", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Ort">
          <input value={uk.ort || ""} onChange={e => update("ort", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Bundesland">
          <input value={uk.bundesland || ""} onChange={e => update("bundesland", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Land">
          <input value={uk.land || ""} onChange={e => update("land", e.target.value)} className={sldsInput} />
        </DetailField>
      </DetailSection>

      <DetailSection title="Kapazität & Größe" columns={3}>
        <DetailField label="Zimmer">
          <input type="number" value={uk.anzahlZimmer || ""} onChange={e => update("anzahlZimmer", parseInt(e.target.value))} className={sldsInput} />
        </DetailField>
        <DetailField label="Betten">
          <input type="number" value={uk.anzahlBetten || ""} onChange={e => update("anzahlBetten", parseInt(e.target.value))} className={sldsInput} />
        </DetailField>
        <DetailField label="Badezimmer">
          <input type="number" value={uk.anzahlBadezimmer || ""} onChange={e => update("anzahlBadezimmer", parseInt(e.target.value))} className={sldsInput} />
        </DetailField>
        <DetailField label="Max. Personen">
          <input type="number" value={uk.maxPersonen || ""} onChange={e => update("maxPersonen", parseInt(e.target.value))} className={sldsInput} />
        </DetailField>
        <DetailField label="Wohnfläche (m²)">
          <input type="number" value={uk.wohnflaeche || ""} onChange={e => update("wohnflaeche", parseFloat(e.target.value))} className={sldsInput} />
        </DetailField>
        <DetailField label="Mindestaufenthalt (Nächte)">
          <input type="number" value={uk.mindestaufenthalt || ""} onChange={e => update("mindestaufenthalt", parseInt(e.target.value))} className={sldsInput} />
        </DetailField>
      </DetailSection>

      <DetailSection title="Preise" icon={<Euro className="w-4 h-4" />} columns={3}>
        <DetailField label="Preis/Nacht (€)">
          <input type="number" step="0.01" value={uk.preisProNacht || ""} onChange={e => update("preisProNacht", parseFloat(e.target.value))} className={sldsInput} />
        </DetailField>
        <DetailField label="Preis/Nacht inkl. MwSt (€)">
          <input type="number" step="0.01" value={uk.preisProNachtInklMwst || ""} onChange={e => update("preisProNachtInklMwst", parseFloat(e.target.value))} className={sldsInput} />
        </DetailField>
        <DetailField label="MwSt-Satz (%)">
          <select value={uk.mwstSatz || "7"} onChange={e => update("mwstSatz", parseFloat(e.target.value))} className={sldsSelect}>
            <option value="7">7%</option>
            <option value="19">19%</option>
          </select>
        </DetailField>
        <DetailField label="Reinigungskosten (€)">
          <input type="number" step="0.01" value={uk.reinigungskosten || ""} onChange={e => update("reinigungskosten", parseFloat(e.target.value))} className={sldsInput} />
        </DetailField>
        <DetailField label="Kaution (€)">
          <input type="number" step="0.01" value={uk.kaution || ""} onChange={e => update("kaution", parseFloat(e.target.value))} className={sldsInput} />
        </DetailField>
        <DetailField label="Provision (%)">
          <input type="number" step="0.01" value={uk.provisionProzent || ""} onChange={e => update("provisionProzent", parseFloat(e.target.value))} className={sldsInput} />
        </DetailField>
      </DetailSection>
    </div>
  );

  // --- AUSSTATTUNG TAB ---
  const ausstattungContent = (
    <div className="space-y-4 max-w-5xl">
      <DetailSection title="Ausstattung" columns={4} collapsible={false}>
        {([
          ["kueche", "Küche"],
          ["waschmaschine", "Waschmaschine"],
          ["trockner", "Trockner"],
          ["wlan", "WLAN"],
          ["parkplatz", "Parkplatz"],
          ["aufzug", "Aufzug"],
          ["balkon", "Balkon"],
          ["terrasse", "Terrasse"],
          ["garten", "Garten"],
          ["klimaanlage", "Klimaanlage"],
          ["haustiere", "Haustiere erlaubt"],
          ["rauchen", "Rauchen erlaubt"],
          ["bettwaesche", "Bettwäsche"],
          ["handtuecher", "Handtücher"],
          ["fernseher", "Fernseher"],
          ["geschirrspueler", "Geschirrspüler"],
          ["mikrowelle", "Mikrowelle"],
          ["backofen", "Backofen"],
          ["kuehlschrank", "Kühlschrank"],
          ["kaffeemaschine", "Kaffeemaschine"],
        ] as const).map(([field, label]) => (
          <label key={field} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={uk[field] || false}
              onChange={e => update(field, e.target.checked)}
              className={sldsCheckbox}
            />
            <span className="text-[13px]">{label}</span>
          </label>
        ))}
      </DetailSection>
    </div>
  );

  // --- TEXTE TAB ---
  const texteContent = (
    <div className="space-y-4 max-w-5xl">
      <DetailSection title="Beschreibung" collapsible={false}>
        <DetailField label="Beschreibung" fullWidth>
          <textarea value={uk.beschreibung || ""} onChange={e => update("beschreibung", e.target.value)} rows={4} className={sldsTextarea} />
        </DetailField>
      </DetailSection>

      <DetailSection title="Anreisebeschreibung" collapsible={false}>
        <DetailField label="Anreisebeschreibung" fullWidth>
          <textarea value={uk.anreiseBeschreibung || ""} onChange={e => update("anreiseBeschreibung", e.target.value)} rows={4} className={sldsTextarea} />
        </DetailField>
      </DetailSection>

      <DetailSection title="Hausregeln" collapsible={false}>
        <DetailField label="Hausregeln" fullWidth>
          <textarea value={uk.hausregeln || ""} onChange={e => update("hausregeln", e.target.value)} rows={4} className={sldsTextarea} />
        </DetailField>
      </DetailSection>

      <DetailSection title="Interne Notizen" collapsible={false}>
        <DetailField label="Interne Notizen" fullWidth>
          <textarea value={uk.interneNotizen || ""} onChange={e => update("interneNotizen", e.target.value)} rows={4} className={sldsTextarea} />
        </DetailField>
      </DetailSection>
    </div>
  );

  // --- VERMIETER TAB ---
  const vermieterContent = (
    <div className="space-y-4 max-w-5xl">
      <DetailSection title="Vermieter-Kontakt" collapsible={false}>
        <DetailField label="Anrede">
          <select value={uk.vermieterAnrede || ""} onChange={e => update("vermieterAnrede", e.target.value)} className={sldsSelect}>
            <option value="">--</option>
            <option value="Herr">Herr</option>
            <option value="Frau">Frau</option>
          </select>
        </DetailField>
        <DetailField label="Vorname">
          <input value={uk.vermieterVorname || ""} onChange={e => update("vermieterVorname", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Nachname">
          <input value={uk.vermieterNachname || ""} onChange={e => update("vermieterNachname", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="Telefon">
          <input value={uk.vermieterTelefon || ""} onChange={e => update("vermieterTelefon", e.target.value)} className={sldsInput} />
        </DetailField>
        <DetailField label="E-Mail">
          <input type="email" value={uk.vermieterEmail || ""} onChange={e => update("vermieterEmail", e.target.value)} className={sldsInput} />
        </DetailField>
      </DetailSection>
    </div>
  );

  // --- RELATED TAB ---
  const relatedContent = (
    <div className="space-y-4 max-w-5xl">
      <DetailSection title="Verknüpfte Datensätze" collapsible={false}>
        <DetailField label="" fullWidth>
          <p className="text-[13px] text-[#706e6b]">Keine verknüpften Datensätze vorhanden.</p>
        </DetailField>
      </DetailSection>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <RecordHighlights
        backPath="/unterkuenfte"
        icon={<Home className="w-5 h-5 text-white" />}
        iconColor="#2E844A"
        entityLabel="Unterkunft"
        title={isNew ? "Neue Unterkunft" : uk.name}
        highlightFields={[
          { label: "Status", value: <Badge variant={getStatusVariant(uk.status || "")}>{uk.status || "---"}</Badge> },
          { label: "Typ", value: uk.unterkunftsTyp || "---" },
          { label: "Ort", value: uk.ort || "---" },
          { label: "Aufnahme", value: uk.aufnahmeProzent != null ? `${uk.aufnahmeProzent}%` : "---" },
          { label: "Vermieter", value: vermieterName || "---" },
        ]}
        actions={
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
        }
      />

      <RecordTabs
        defaultTab="details"
        tabs={[
          { key: "details", label: "Details", content: detailsContent },
          { key: "ausstattung", label: "Ausstattung", content: ausstattungContent },
          { key: "texte", label: "Texte", content: texteContent },
          { key: "vermieter", label: "Vermieter", content: vermieterContent },
          { key: "related", label: "Verknüpft", content: relatedContent },
        ]}
      />
    </div>
  );
}
