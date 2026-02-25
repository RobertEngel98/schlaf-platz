import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, Trash2, TrendingUp, Euro } from "lucide-react";
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

const STAGES = [
  "Erstgespräch",
  "Qualifizierung",
  "Angebot",
  "Verhandlung",
  "Gewonnen",
  "Verloren",
];

const PATH_STAGES = STAGES.map((s) => ({ key: s, label: s }));

const formatCurrency = (amount: number | null | undefined) =>
  amount != null
    ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount)
    : "—";

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
    fetch("/api/accounts?limit=500", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setAccounts(d.data || []));
    fetch("/api/contacts?limit=500", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setContacts(d.data || []));
    if (!isNew && id) {
      fetch(`/api/opportunities/${id}`, { credentials: "include" })
        .then((r) => r.json())
        .then((data) => {
          setOpp(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Opportunity nicht gefunden");
          setLoading(false);
        });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const url = isNew ? "/api/opportunities" : `/api/opportunities/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opp),
        credentials: "include",
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Fehler");
        return;
      }
      const saved = await res.json();
      if (isNew) navigate(`/opportunities/${saved.id}`, { replace: true });
      else setOpp(saved);
    } catch {
      setError("Verbindungsfehler");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Opportunity wirklich löschen?")) return;
    await fetch(`/api/opportunities/${id}`, { method: "DELETE", credentials: "include" });
    navigate("/opportunities");
  };

  const update = (f: string, v: any) => setOpp((p: any) => ({ ...p, [f]: v }));

  if (loading) return <div className="p-8 text-gray-500">Laden...</div>;

  // --- Resolve account name for highlight ---
  const accountName =
    accounts.find((a) => String(a.id) === String(opp.accountId))?.name || "—";

  // --- Highlight fields ---
  const highlightFields = [
    {
      label: "Phase",
      value: <Badge variant={getStatusVariant(opp.stage)}>{opp.stage}</Badge>,
    },
    {
      label: "Betrag",
      value: formatCurrency(opp.amount),
    },
    {
      label: "Account",
      value: accountName,
    },
    {
      label: "Abschlussdatum",
      value: opp.closeDate
        ? new Date(opp.closeDate).toLocaleDateString("de-DE")
        : "—",
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

      {/* Details Section */}
      <DetailSection
        title="Details"
        icon={<TrendingUp className="w-4 h-4" />}
      >
        <DetailField label="Name" required fullWidth>
          <input
            value={opp.name || ""}
            onChange={(e) => update("name", e.target.value)}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Account">
          <select
            value={opp.accountId || ""}
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

        <DetailField label="Kontakt">
          <select
            value={opp.contactId || ""}
            onChange={(e) => update("contactId", e.target.value)}
            className={sldsSelect}
          >
            <option value="">-- Wählen --</option>
            {contacts.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.firstName} {c.lastName}
              </option>
            ))}
          </select>
        </DetailField>

        <DetailField label="Phase">
          <select
            value={opp.stage || "Erstgespräch"}
            onChange={(e) => update("stage", e.target.value)}
            className={sldsSelect}
          >
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </DetailField>

        <DetailField label="Abschlussdatum">
          <input
            type="date"
            value={opp.closeDate || ""}
            onChange={(e) => update("closeDate", e.target.value)}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Wahrscheinlichkeit (%)">
          <input
            type="number"
            min="0"
            max="100"
            value={opp.probability ?? ""}
            onChange={(e) => update("probability", parseInt(e.target.value))}
            className={sldsInput}
          />
        </DetailField>
      </DetailSection>

      {/* Finanzen Section */}
      <DetailSection
        title="Finanzen"
        icon={<Euro className="w-4 h-4" />}
      >
        <DetailField label="Betrag (€)">
          <input
            type="number"
            step="0.01"
            value={opp.amount ?? ""}
            onChange={(e) => update("amount", parseFloat(e.target.value))}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Suchzeit (Min.)">
          <input
            type="number"
            value={opp.searchTimeMinutes ?? ""}
            readOnly
            className={sldsInputReadonly}
          />
        </DetailField>

        <DetailField label="Suche Start">
          <input
            type="date"
            value={opp.searchStartDate || ""}
            onChange={(e) => update("searchStartDate", e.target.value)}
            className={sldsInput}
          />
        </DetailField>

        <DetailField label="Suche Ende">
          <input
            type="date"
            value={opp.searchEndDate || ""}
            onChange={(e) => update("searchEndDate", e.target.value)}
            className={sldsInput}
          />
        </DetailField>
      </DetailSection>

      {/* Verlustgrund Section (only when stage === "Verloren") */}
      {opp.stage === "Verloren" && (
        <DetailSection
          title="Verlustgrund"
          accentColor="#ea001e"
        >
          <DetailField label="Verlustgrund" fullWidth>
            <textarea
              value={opp.lossReason || ""}
              onChange={(e) => update("lossReason", e.target.value)}
              rows={3}
              className={sldsTextarea}
              placeholder="Bitte gib einen Verlustgrund an..."
            />
          </DetailField>
        </DetailSection>
      )}

      {/* Beschreibung Section */}
      <DetailSection title="Beschreibung">
        <DetailField label="Beschreibung" fullWidth>
          <textarea
            value={opp.description || ""}
            onChange={(e) => update("description", e.target.value)}
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
      Keine Related Lists vorhanden
    </div>
  );

  // --- Tabs ---
  const tabs = [
    { key: "details", label: "Details", content: detailsContent },
    { key: "related", label: "Verknüpft", content: relatedContent },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Record Highlights */}
      <RecordHighlights
        backPath="/opportunities"
        icon={<TrendingUp className="w-5 h-5 text-white" />}
        iconColor="#FF5D2E"
        entityLabel="Opportunity"
        title={isNew ? "Neue Opportunity" : opp.name}
        highlightFields={highlightFields}
        actions={actions}
      />

      {/* Record Path (only for existing records) */}
      {!isNew && (
        <RecordPath
          stages={PATH_STAGES}
          currentStage={opp.stage}
          onStageClick={(stageKey) => update("stage", stageKey)}
          linear
        />
      )}

      {/* Record Tabs */}
      <RecordTabs tabs={tabs} defaultTab="details" />
    </div>
  );
}
