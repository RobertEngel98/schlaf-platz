import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { FilterCondition } from "../lib/api";

export interface FilterField {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "boolean";
  options?: { value: string; label: string }[];
}

interface FilterPanelProps {
  fields: FilterField[];
  filters: FilterCondition[];
  onChange: (filters: FilterCondition[]) => void;
  logic: "AND" | "OR";
  onLogicChange: (logic: "AND" | "OR") => void;
  isOpen: boolean;
  onClose: () => void;
  entityLabel?: string;
}

const OPERATORS: Record<string, { label: string; types: string[] }> = {
  equals: { label: "ist gleich", types: ["text", "number", "date", "select", "boolean"] },
  not_equals: { label: "ist nicht gleich", types: ["text", "number", "date", "select"] },
  contains: { label: "enthält", types: ["text"] },
  not_contains: { label: "enthält nicht", types: ["text"] },
  starts_with: { label: "beginnt mit", types: ["text"] },
  greater_than: { label: "größer oder gleich", types: ["number", "date"] },
  less_than: { label: "kleiner als", types: ["number", "date"] },
  is_empty: { label: "ist leer", types: ["text", "number", "date", "select"] },
  is_not_empty: { label: "ist nicht leer", types: ["text", "number", "date", "select"] },
};

function getOperatorsForType(type: string) {
  return Object.entries(OPERATORS)
    .filter(([, v]) => v.types.includes(type))
    .map(([k, v]) => ({ value: k, label: v.label }));
}

const noValueOperators = ["is_empty", "is_not_empty"];

export default function FilterPanel({
  fields,
  filters,
  onChange,
  logic,
  onLogicChange,
  isOpen,
  onClose,
  entityLabel = "Datensätze",
}: FilterPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newField, setNewField] = useState(fields[0]?.key || "");
  const [newOperator, setNewOperator] = useState("contains");
  const [newValue, setNewValue] = useState("");
  const [showLogicEditor, setShowLogicEditor] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setShowAddForm(false);
      setShowLogicEditor(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const fieldDef = fields.find((f) => f.key === newField);
    const ops = getOperatorsForType(fieldDef?.type || "text");
    if (!ops.find((o) => o.value === newOperator)) {
      setNewOperator(ops[0]?.value || "equals");
    }
    setNewValue("");
  }, [newField]);

  const addFilter = () => {
    if (!newField) return;
    const needsVal = !noValueOperators.includes(newOperator);
    if (needsVal && !newValue) return;

    onChange([
      ...filters,
      {
        field: newField,
        operator: newOperator as FilterCondition["operator"],
        value: needsVal ? newValue : "",
      },
    ]);
    setShowAddForm(false);
    setNewField(fields[0]?.key || "");
    setNewOperator("contains");
    setNewValue("");
  };

  const removeFilter = (idx: number) => {
    onChange(filters.filter((_, i) => i !== idx));
  };

  const clearAll = () => {
    onChange([]);
  };

  const getFieldLabel = (fieldKey: string) =>
    fields.find((f) => f.key === fieldKey)?.label || fieldKey;

  const getOperatorLabel = (op: string) =>
    OPERATORS[op]?.label || op;

  const getValueDisplay = (filter: FilterCondition) => {
    if (noValueOperators.includes(filter.operator)) return "";
    const fieldDef = fields.find((f) => f.key === filter.field);
    if (fieldDef?.type === "select" && fieldDef.options) {
      const opt = fieldDef.options.find((o) => o.value === filter.value);
      return opt?.label || filter.value;
    }
    if (fieldDef?.type === "boolean") {
      return filter.value === "true" ? "Ja" : "Nein";
    }
    return filter.value;
  };

  const newFieldDef = fields.find((f) => f.key === newField);
  const newFieldOps = getOperatorsForType(newFieldDef?.type || "text");
  const newNeedsValue = !noValueOperators.includes(newOperator);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={onClose}
        />
      )}

      {/* Slide-out panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[320px] bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out border-l border-[#e5e5e5] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e5e5]">
          <h2 className="text-[16px] font-bold text-[#181818]">Filter</h2>
          <button
            onClick={onClose}
            className="group relative p-2 sm:p-1 rounded text-[#706e6b] hover:text-[#181818] hover:bg-[#f3f3f3] transition-colors"
            title="Filter schließen"
          >
            <X className="w-5 h-5" />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 text-[11px] font-medium text-white bg-[#0176d3] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Filter schließen
            </span>
          </button>
        </div>

        {/* Filter by Owner */}
        <div className="mx-4 mt-4 mb-3 border border-[#e5e5e5] rounded-lg p-3 bg-white">
          <p className="text-[12px] font-medium text-[#706e6b]">Filter nach Eigentümer</p>
          <p className="text-[13px] text-[#181818] mt-0.5">Alle {entityLabel}</p>
        </div>

        {/* Matching logic text */}
        <div className="px-4 pb-2">
          <p className="text-[12px] text-[#706e6b] italic">
            {logic === "AND"
              ? "Alle Filter müssen zutreffen"
              : "Mindestens ein Filter muss zutreffen"}
          </p>
        </div>

        {/* Filter list */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {filters.length === 0 && !showAddForm && (
            <div className="text-center py-8 text-[13px] text-[#706e6b]">
              Keine Filter aktiv
            </div>
          )}

          <div className="space-y-3">
            {filters.map((filter, idx) => {
              const valueDisplay = getValueDisplay(filter);
              const isNoValue = noValueOperators.includes(filter.operator);
              return (
                <div key={idx}>
                  <div className="relative border border-[#e5e5e5] rounded-lg p-3 bg-white hover:shadow-sm transition-shadow group">
                    <div className="pr-7">
                      <p className="text-[13px] font-semibold text-[#181818] leading-tight">
                        {getFieldLabel(filter.field)}
                      </p>
                      <p className="text-[12px] text-[#706e6b] mt-0.5">
                        {getOperatorLabel(filter.operator)}
                        {!isNoValue && valueDisplay && (
                          <>
                            {"  "}
                            <span className="font-medium text-[#181818]">{valueDisplay}</span>
                          </>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFilter(idx)}
                      className="absolute top-3 right-3 text-[#c9c9c9] hover:text-[#ea001e] transition-colors"
                      title="Entfernen"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add filter form */}
          {showAddForm && (
            <div className="mt-3 border-2 border-[#fe9339] rounded-lg p-3 bg-[#fef3e0]">
              <div className="mb-2">
                <label className="block text-[11px] font-bold text-[#706e6b] uppercase tracking-wider mb-1">
                  Feld
                </label>
                <select
                  value={newField}
                  onChange={(e) => setNewField(e.target.value)}
                  className="w-full px-3 py-1.5 text-[13px] border border-[#c9c9c9] rounded bg-white focus:ring-2 focus:ring-[#0176d3]/30 focus:border-[#0176d3]"
                >
                  {fields.map((f) => (
                    <option key={f.key} value={f.key}>{f.label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <label className="block text-[11px] font-bold text-[#706e6b] uppercase tracking-wider mb-1">
                  Bedingung
                </label>
                <select
                  value={newOperator}
                  onChange={(e) => setNewOperator(e.target.value)}
                  className="w-full px-3 py-1.5 text-[13px] border border-[#c9c9c9] rounded bg-white focus:ring-2 focus:ring-[#0176d3]/30 focus:border-[#0176d3]"
                >
                  {newFieldOps.map((op) => (
                    <option key={op.value} value={op.value}>{op.label}</option>
                  ))}
                </select>
              </div>

              {newNeedsValue && (
                <div className="mb-3">
                  <label className="block text-[11px] font-bold text-[#706e6b] uppercase tracking-wider mb-1">
                    Wert
                  </label>
                  {newFieldDef?.type === "select" || newFieldDef?.type === "boolean" ? (
                    <select
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="w-full px-3 py-1.5 text-[13px] border border-[#c9c9c9] rounded bg-white focus:ring-2 focus:ring-[#0176d3]/30 focus:border-[#0176d3]"
                    >
                      <option value="">— Auswählen —</option>
                      {newFieldDef?.type === "boolean" ? (
                        <>
                          <option value="true">Ja</option>
                          <option value="false">Nein</option>
                        </>
                      ) : (
                        newFieldDef?.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))
                      )}
                    </select>
                  ) : (
                    <input
                      type={
                        newFieldDef?.type === "date" ? "date"
                          : newFieldDef?.type === "number" ? "number"
                          : "text"
                      }
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="Wert eingeben…"
                      className="w-full px-3 py-1.5 text-[13px] border border-[#c9c9c9] rounded bg-white focus:ring-2 focus:ring-[#0176d3]/30 focus:border-[#0176d3]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addFilter();
                      }}
                    />
                  )}
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewValue("");
                  }}
                  className="px-3 py-1.5 text-[13px] font-medium text-[#706e6b] bg-white border border-[#c9c9c9] rounded hover:bg-[#f3f3f3] transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  onClick={addFilter}
                  className="px-3 py-1.5 text-[13px] font-medium text-white bg-[#0176d3] rounded hover:bg-[#014486] transition-colors"
                >
                  Speichern
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom actions */}
        <div className="border-t border-[#e5e5e5] px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setShowAddForm(true)}
              className="text-[13px] font-medium text-[#0176d3] hover:underline"
            >
              Filter hinzufügen
            </button>
            {filters.length > 0 && (
              <button
                onClick={clearAll}
                className="text-[13px] font-medium text-[#0176d3] hover:underline"
              >
                Alle entfernen
              </button>
            )}
          </div>

          <button
            onClick={() => setShowLogicEditor(!showLogicEditor)}
            className="text-[13px] font-medium text-[#0176d3] hover:underline"
          >
            Filterlogik bearbeiten
          </button>
          {showLogicEditor && (
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => onLogicChange("AND")}
                className={`px-3 py-1.5 text-[12px] font-bold rounded transition-colors ${
                  logic === "AND"
                    ? "bg-[#0176d3] text-white"
                    : "bg-white text-[#706e6b] border border-[#c9c9c9] hover:bg-[#f3f3f3]"
                }`}
              >
                AND
              </button>
              <button
                onClick={() => onLogicChange("OR")}
                className={`px-3 py-1.5 text-[12px] font-bold rounded transition-colors ${
                  logic === "OR"
                    ? "bg-[#0176d3] text-white"
                    : "bg-white text-[#706e6b] border border-[#c9c9c9] hover:bg-[#f3f3f3]"
                }`}
              >
                OR
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
