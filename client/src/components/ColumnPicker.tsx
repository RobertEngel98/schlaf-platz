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
      if (visibleColumns.length <= 1) return; // at least 1 column
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
        className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:ring-2 focus:ring-brand/30"
        title="Spalten anpassen"
      >
        <Settings2 className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full right-0 mt-1 w-[260px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="px-3 py-2.5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Spalten anpassen
            </p>
            {defaultColumns && (
              <button
                onClick={resetToDefault}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-brand"
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
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isVisible
                        ? "bg-brand border-brand text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {isVisible && <Check className="w-3 h-3" />}
                  </div>
                  <span
                    className={
                      isVisible ? "text-gray-700 font-medium" : "text-gray-500"
                    }
                  >
                    {col.header}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
            <p className="text-[11px] text-gray-400">
              {visibleColumns.length} von {allColumns.length} Spalten sichtbar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
