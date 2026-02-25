import { useState, useRef, useEffect } from "react";
import { Settings2, Check, RotateCcw } from "lucide-react";
import type { Column } from "./DataTable";

interface ColumnPickerProps {
  allColumns: Column<any>[];
  visibleColumns: string[];
  onChange: (visibleColumns: string[]) => void;
  defaultColumns?: string[];
}

export default function ColumnPicker({
  allColumns,
  visibleColumns,
  onChange,
  defaultColumns,
}: ColumnPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleColumn = (key: string) => {
    if (visibleColumns.includes(key)) {
      if (visibleColumns.length <= 1) return;
      onChange(visibleColumns.filter((k) => k !== key));
    } else {
      onChange([...visibleColumns, key]);
    }
  };

  const resetToDefault = () => {
    if (defaultColumns) {
      onChange(defaultColumns);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded text-[#706e6b] hover:text-[#181818] hover:bg-[#f3f3f3] transition-colors"
        title="Spalten anpassen"
      >
        <Settings2 className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full right-0 mt-1 w-[calc(100vw-2rem)] sm:w-[260px] max-w-[260px] bg-white border border-[#e5e5e5] rounded shadow-lg overflow-hidden">
          <div className="px-3 py-2 border-b border-[#e5e5e5] bg-[#fafaf9] flex items-center justify-between">
            <p className="text-[11px] font-bold text-[#706e6b] uppercase tracking-wider">
              Spalten anpassen
            </p>
            {defaultColumns && (
              <button
                onClick={resetToDefault}
                className="flex items-center gap-1 text-[11px] text-[#706e6b] hover:text-[#0176d3]"
                title="Zurücksetzen"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto py-1">
            {allColumns.map((col) => {
              const isVisible = visibleColumns.includes(col.key);
              return (
                <button
                  key={col.key}
                  onClick={() => toggleColumn(col.key)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-[#f3f3f3]"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isVisible
                        ? "bg-[#0176d3] border-[#0176d3] text-white"
                        : "border-[#c9c9c9]"
                    }`}
                  >
                    {isVisible && <Check className="w-3 h-3" />}
                  </div>
                  <span className={isVisible ? "text-[#181818] font-medium" : "text-[#706e6b]"}>
                    {col.header}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="px-3 py-2 border-t border-[#e5e5e5] bg-[#fafaf9]">
            <p className="text-[11px] text-[#706e6b]">
              {visibleColumns.length} von {allColumns.length} Spalten sichtbar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
