import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, Trash2, FileText, Euro, Phone, MessageSquare, CheckSquare as CheckSquareIcon } from "lucide-react";
import ActivityTimeline from "../components/ActivityTimeline";
import QuickActions from "../components/QuickActions";
import Badge, { getStatusVariant } from "../components/Badge";
import RecordHighlights from "../components/RecordHighlights";
import RecordPath from "../components/RecordPath";
import RecordTabs from "../components/RecordTabs";
import DetailSection, { DetailField } from "../components/DetailSection";
import {
  SldsPrimaryButton,
  SldsOutlineButton,
  sldsInput,
  sldsInputReadonly,
  sldsSelect,
  sldsTextarea,
} from "../components/SalesforceField";

const STATUS_OPTIONS = ["Entwurf", "Gesendet", "Angenommen", "Abgelehnt", "Abgelaufen"];

const PATH_STAGES = STATUS_OPTIONS.map((s) => ({ key: s, label: s }));

const formatCurrency = (amount: number | null | undefined) =>
  amount != null
    ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount)
    : "\u2014";

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
    fetch("/api/accounts?limit=500", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setAccounts(d.data || []));
    fetch("/api/unterkuenfte?limit=500", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setUnterkuenfte(d.data || []));
    if (!isNew && id) {
      fetch(`/api/angebote/${id}`, { credentials: "include" })
        .then((r) => r.json())
        .then((data) => {
          setAngebot(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Angebot nicht gefunden");
          setLoading(false);
        });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const url = isNew ? "/api/angebote" : `/api/angebote/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(angebot),
        credentials: "include",
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Fehler");
        return;
      }
      const saved = await res.json();
      if (isNew) navigate(`/angebote/${saved.id}`, { replace: true });
      else setAngebot(saved);
    } catch {
      setError("Verbindungsfehler");
    } finally {
      setSaving(false);
    }
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
      const days = Math.ceil(
        (new Date(angebot.checkOut).getTime() - new Date(angebot.checkIn).getTime()) / 86400000
      );
      if (days > 0) update("anzahlNaechte", days);
    }
  }, [angebot.checkIn, angebot.checkOut]);

  if (loading) return <div className="p-4 sm:p-8 text-gray-500">Laden...</div>;

  // --- Highlight fields ---
  const highlightFields = [
    {
      label: "Status",
      value: <Badge variant={getStatusVariant(angebot.status)}>{angebot.status}</Badge>,
    },
    {
      label: "Nummer",
      value: angebot.angebotNummer || "\u2014",
    },
    {
      label: "Gültig bis",
      value: angebot.gueltigBis
        ? new Date(angebot.gueltigBis).toLocaleDateString("de-DE")
        : "\u2014",
    },
    {
      label: "Gesamtpreis",
      value: formatCurrency(angebot.gesamtPreis),
    },
  ];

  // --- Actions ---
  const actions = (
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
  );

  // --- Details tab content ---
  const detailsContent = (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-[13px]">
          {error}
        </div>
      )}

      {/* Angebotsdaten Section */}
      <DetailSection
        title="Angebotsdaten"
        icon={<FileText className="w-4 h-4" />}
      >
        <DetailField label="Name" required fullWidth>
          <input
            value={angebot.name || ""}
            onChange={(e) => update("name", e.target.value)}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Account">
          <select
            value={angebot.accountId || ""}
            onChange={(e) => update("accountId", e.target.value)}
            className={sldsSelect}
          >
            <option value="">-- Wählen --</option>
            {accounts.map((a: any) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </DetailField>

        <DetailField label="Unterkunft">
          <select
            value={angebot.unterkunftId || ""}
            onChange={(e) => update("unterkunftId", e.target.value)}
            className={sldsSelect}
          >
            <option value="">-- Wählen --</option>
            {unterkuenfte.map((u: any) => (
              <option key={u.id} value={u.id}>
                {u.name} - {u.ort}
              </option>
            ))}
          </select>
        </DetailField>

        <DetailField label="Status">
          <select
            value={angebot.status || "Entwurf"}
            onChange={(e) => update("status", e.target.value)}
            className={sldsSelect}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </DetailField>

        <DetailField label="Gültig bis">
          <input
            type="date"
            value={angebot.gueltigBis || ""}
            onChange={(e) => update("gueltigBis", e.target.value)}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Sprache">
          <select
            value={angebot.sprache || "Deutsch"}
            onChange={(e) => update("sprache", e.target.value)}
            className={sldsSelect}
          >
            <option value="Deutsch">Deutsch</option>
            <option value="Englisch">Englisch</option>
          </select>
        </DetailField>
      </DetailSection>

      {/* Zeitraum & Preise Section */}
      <DetailSection
        title="Zeitraum & Preise"
        icon={<Euro className="w-4 h-4" />}
        columns={3}
      >
        <DetailField label="Check-In">
          <input
            type="date"
            value={angebot.checkIn || ""}
            onChange={(e) => update("checkIn", e.target.value)}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Check-Out">
          <input
            type="date"
            value={angebot.checkOut || ""}
            onChange={(e) => update("checkOut", e.target.value)}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Nächte">
          <input
            type="number"
            value={angebot.anzahlNaechte || ""}
            readOnly
            className={sldsInputReadonly}
          />
        </DetailField>

        <DetailField label="Personen">
          <input
            type="number"
            value={angebot.anzahlPersonen || ""}
            onChange={(e) => update("anzahlPersonen", parseInt(e.target.value))}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Preis/Nacht €">
          <input
            type="number"
            step="0.01"
            value={angebot.preisProNacht || ""}
            onChange={(e) => update("preisProNacht", parseFloat(e.target.value))}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Gesamtpreis €">
          <input
            type="number"
            step="0.01"
            value={angebot.gesamtPreis || ""}
            onChange={(e) => update("gesamtPreis", parseFloat(e.target.value))}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Reinigungskosten €">
          <input
            type="number"
            step="0.01"
            value={angebot.reinigungskosten || ""}
            onChange={(e) => update("reinigungskosten", parseFloat(e.target.value))}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Kaution €">
          <input
            type="number"
            step="0.01"
            value={angebot.kaution || ""}
            onChange={(e) => update("kaution", parseFloat(e.target.value))}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="MwSt">
          <select
            value={angebot.mwstSatz || "7"}
            onChange={(e) => update("mwstSatz", parseFloat(e.target.value))}
            className={sldsSelect}
          >
            <option value="7">7%</option>
            <option value="19">19%</option>
          </select>
        </DetailField>
      </DetailSection>

      {/* Beschreibung Section */}
      <DetailSection title="Beschreibung">
        <DetailField label="Beschreibung" fullWidth>
          <textarea
            value={angebot.beschreibung || ""}
            onChange={(e) => update("beschreibung", e.target.value)}
            rows={4}
            className={sldsTextarea}
          />
        </DetailField>
      </DetailSection>
    </div>
  );

  // --- Related tab content ---
  const relatedContent = (
    <div className="bg-white rounded-lg border border-[#e5e5e5] p-8 text-center text-[13px] text-[#706e6b]">
      Keine verknüpften Datensätze vorhanden
    </div>
  );

  // --- Tabs ---
  const tabs = [
    { key: "details", label: "Details", content: detailsContent },
    { key: "related", label: "Verknüpft", content: relatedContent },
    { key: "activity", label: "Aktivitäten", content: !isNew && id ? <ActivityTimeline entityType="angebot" entityId={id} /> : <div className="p-6 text-[13px] text-[#706e6b]">Erst nach Speichern verfügbar</div> },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Record Highlights */}
      <RecordHighlights
        backPath="/angebote"
        icon={<FileText className="w-5 h-5 text-white" />}
        iconColor="#0176D3"
        entityLabel="Angebot"
        title={isNew ? "Neues Angebot" : angebot.name}
        highlightFields={highlightFields}
        actions={actions}
      />

      {/* Record Path (only for existing records) */}
      {!isNew && (
        <RecordPath
          stages={PATH_STAGES}
          currentStage={angebot.status}
          onStageClick={(stageKey) => update("status", stageKey)}
          linear
        />
      )}

      {!isNew && id && (
        <QuickActions actions={[
          { key: "call", label: "Anruf loggen", icon: <Phone className="w-4 h-4" />, onClick: () => {
            fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
              body: JSON.stringify({ entityType: "angebot", entityId: id, activityType: "call_logged", title: "Anruf geloggt" })
            }).then(() => {});
          }},
          { key: "comment", label: "Kommentar", icon: <MessageSquare className="w-4 h-4" />, onClick: () => {} },
          { key: "task", label: "Neue Aufgabe", icon: <CheckSquareIcon className="w-4 h-4" />, onClick: () => {
            fetch("/api/activities", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
              body: JSON.stringify({ entityType: "angebot", entityId: id, activityType: "task_created", title: "Aufgabe erstellt" })
            }).then(() => {});
          }},
        ]} />
      )}

      {/* Record Tabs */}
      <RecordTabs tabs={tabs} defaultTab="details" />
    </div>
  );
}
