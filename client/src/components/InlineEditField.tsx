import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Pencil, Check, X } from "lucide-react";
import { sldsInput, sldsSelect, sldsTextarea } from "../components/SalesforceField";

export interface InlineEditFieldProps {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
  type?: "text" | "select" | "textarea" | "date" | "number";
  options?: { value: string; label: string }[];
  required?: boolean;
  readOnly?: boolean;
}

export default function InlineEditField({
  label,
  value,
  onSave,
  type = "text",
  options,
  required = false,
  readOnly = false,
}: InlineEditFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(null);

  // Sync draft when value prop changes while not editing
  useEffect(() => {
    if (!editing) {
      setDraft(value);
    }
  }, [value, editing]);

  // Auto-focus the input when entering edit mode
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // Select text for text/number inputs
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [editing]);

  function handleEdit() {
    if (readOnly) return;
    setDraft(value);
    setEditing(true);
  }

  function handleSave() {
    if (required && !draft.trim()) return;
    onSave(draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(value);
    setEditing(false);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && type !== "textarea") {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  }

  // Render the appropriate input element for edit mode
  function renderInput() {
    switch (type) {
      case "select":
        return (
          <select
            ref={inputRef as React.RefObject<HTMLSelectElement>}
            className={sldsSelect}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
          >
            {!required && <option value="">--</option>}
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "textarea":
        return (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            className={sldsTextarea}
            value={draft}
            rows={3}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              // Only Escape cancels for textarea (Enter adds newline)
              if (e.key === "Escape") {
                e.preventDefault();
                handleCancel();
              }
            }}
          />
        );

      case "date":
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="date"
            className={sldsInput}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        );

      case "number":
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="number"
            className={sldsInput}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        );

      default:
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            className={sldsInput}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        );
    }
  }

  // Resolve display value for select fields
  function displayValue() {
    if (type === "select" && options) {
      const match = options.find((o) => o.value === value);
      return match ? match.label : value;
    }
    return value;
  }

  return (
    <div className="mb-3">
      {/* Label */}
      <div className="text-[11px] uppercase tracking-wide text-[#706e6b] font-medium mb-0.5 px-2">
        {label}
        {required && <span className="text-[#ea001e] ml-0.5">*</span>}
      </div>

      {editing ? (
        /* ---- Edit mode ---- */
        <div>
          {renderInput()}
          <div className="flex justify-end gap-1 mt-1">
            <button
              onClick={handleSave}
              className="p-1 rounded text-[#2e844a] hover:bg-green-50 transition-colors"
              title="Speichern"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 rounded text-[#706e6b] hover:bg-gray-100 transition-colors"
              title="Abbrechen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* ---- Read mode ---- */
        <div
          className={`group relative min-h-[28px] px-2 py-1 rounded text-[13px] text-[#181818] ${
            readOnly ? "" : "hover:bg-[#f3f3f3] cursor-pointer"
          }`}
          onClick={handleEdit}
        >
          <span className={!value ? "text-[#b0adab] italic" : ""}>
            {displayValue() || "–"}
          </span>

          {!readOnly && (
            <Pencil className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#706e6b] opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      )}
    </div>
  );
}
