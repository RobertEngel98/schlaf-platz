import { useState } from "react";
import { Filter, Plus, X, ChevronDown } from "lucide-react";
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
}

const OPERATORS: Record<string, { label: string; types: string[] }> = {
  equals: { label: "ist gleich", types: ["text", "number", "date", "select", "boolean"] },
  not_equals: { label: "ist nicht gleich", types: ["text", "number", "date", "select"] },
  contains: { label: "enthält", types: ["text"] },
  not_contains: { label: "enthält nicht", types: ["text"] },
  starts_with: { label: "beginnt mit", types: ["text"] },
  greater_than: { label: "größer als", types: ["number", "date"] },
  less_than: { label: "kleiner als", types: ["number", "date"] },
  is_empty: { label: "ist leer", types: ["text", "number", "date", "select"] },
  is_not_empty: { label: "ist nicht leer", types: ["text", "number", "date", "select"] },
};

function getOperatorsForType(type: string) {
  return Object.entries(OPERATORS)
    .filter(([, v]) => v.types.includes(type))
    .map(([k, v]) => ({ value: k, label: v.label }));
}

export default function FilterPanel({
  fields,
  filters,
  onChange,
  logic,
  onLogicChange,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(filters.length > 0);

  const addFilter = () => {
    const firstField = fields[0];
    if (!firstField) return;
    onChange([
      ...filters,
      { field: firstField.key, operator: "contains", value: "" },
    ]);
    setIsOpen(true);
  };

  const updateFilter = (idx: number, patch: Partial<FilterCondition>) => {
    const updated = filters.map((f, i) => (i === idx ? { ...f, ...patch } : f));
    // Reset operator when field changes
    if (patch.field) {
      const field = fields.find((f) => f.key === patch.field);
      const ops = getOperatorsForType(field?.type || "text");
      if (!ops.find((o) => o.value === updated[idx].operator)) {
        updated[idx].operator = ops[0]?.value as FilterCondition["operator"] || "equals";
      }
      updated[idx].value = "";
    }
    onChange(updated);
  };

  const removeFilter = (idx: number) => {
    onChange(filters.filter((_, i) => i !== idx));
  };

  const clearAll = () => {
    onChange([]);
  };

  const noValueOperators = ["is_empty", "is_not_empty"];

  return (
    <div className="border-b border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <Filter className="w-4 h-4" />
          Filter
          {filters.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-brand text-white rounded-full">
              {filters.length}
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <div className="flex items-center gap-2">
          {filters.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-500 hover:text-red-600"
            >
              Alle entfernen
            </button>
          )}
          <button
            onClick={addFilter}
            className="flex items-center gap-1 text-xs font-medium text-brand hover:text-brand-dark"
          >
            <Plus className="w-3.5 h-3.5" />
            Filter hinzufügen
          </button>
        </div>
      </div>

      {/* Filter rows */}
      {isOpen && filters.length > 0 && (
        <div className="px-4 pb-3 space-y-2">
          {/* AND/OR toggle */}
          {filters.length > 1 && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs text-gray-500 mr-1">Logik:</span>
              <button
                onClick={() => onLogicChange("AND")}
                className={`px-2 py-0.5 text-xs font-medium rounded ${
                  logic === "AND"
                    ? "bg-brand text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                UND
              </button>
              <button
                onClick={() => onLogicChange("OR")}
                className={`px-2 py-0.5 text-xs font-medium rounded ${
                  logic === "OR"
                    ? "bg-brand text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                ODER
              </button>
            </div>
          )}

          {filters.map((filter, idx) => {
            const fieldDef = fields.find((f) => f.key === filter.field);
            const operators = getOperatorsForType(fieldDef?.type || "text");
            const needsValue = !noValueOperators.includes(filter.operator);

            return (
              <div key={idx} className="flex items-center gap-2">
                {/* Logic connector */}
                {idx > 0 && (
                  <span className="text-xs font-medium text-gray-400 w-8 text-center shrink-0">
                    {logic === "AND" ? "UND" : "ODER"}
                  </span>
                )}
                {idx === 0 && filters.length > 1 && <span className="w-8 shrink-0" />}

                {/* Field */}
                <select
                  value={filter.field}
                  onChange={(e) => updateFilter(idx, { field: e.target.value })}
                  className="flex-1 min-w-[120px] px-2.5 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-brand focus:border-brand"
                >
                  {fields.map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.label}
                    </option>
                  ))}
                </select>

                {/* Operator */}
                <select
                  value={filter.operator}
                  onChange={(e) =>
                    updateFilter(idx, {
                      operator: e.target.value as FilterCondition["operator"],
                    })
                  }
                  className="w-[140px] px-2.5 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-brand focus:border-brand"
                >
                  {operators.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>

                {/* Value */}
                {needsValue && (
                  <>
                    {fieldDef?.type === "select" || fieldDef?.type === "boolean" ? (
                      <select
                        value={filter.value}
                        onChange={(e) => updateFilter(idx, { value: e.target.value })}
                        className="flex-1 min-w-[120px] px-2.5 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-brand focus:border-brand"
                      >
                        <option value="">-- Auswählen --</option>
                        {fieldDef?.type === "boolean" ? (
                          <>
                            <option value="true">Ja</option>
                            <option value="false">Nein</option>
                          </>
                        ) : (
                          fieldDef?.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))
                        )}
                      </select>
                    ) : (
                      <input
                        type={fieldDef?.type === "date" ? "date" : fieldDef?.type === "number" ? "number" : "text"}
                        value={filter.value}
                        onChange={(e) => updateFilter(idx, { value: e.target.value })}
                        placeholder="Wert..."
                        className="flex-1 min-w-[120px] px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-brand focus:border-brand"
                      />
                    )}
                  </>
                )}

                {/* Remove */}
                <button
                  onClick={() => removeFilter(idx)}
                  className="p-1 text-gray-400 hover:text-red-500 shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
