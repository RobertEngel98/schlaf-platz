import React, { useState, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUp,
  ArrowDown,
  Inbox,
  Loader2,
  MoreVertical,
} from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  minWidth?: number;
}

export interface RowAction<T> {
  label: string;
  onClick: (row: T) => void;
  icon?: React.ReactNode;
  danger?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  rowActions?: RowAction<T>[];
  selectable?: boolean;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
}

export default function DataTable<T extends { id?: string }>({
  columns,
  data,
  total = 0,
  page = 1,
  pageSize = 25,
  onPageChange,
  onSort,
  sortKey,
  sortDirection,
  onRowClick,
  loading = false,
  emptyMessage = "Keine Daten vorhanden",
  rowActions,
  selectable = true,
  selectedIds,
  onSelectionChange,
}: DataTableProps<T>) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [colWidths, setColWidths] = useState<Record<string, number>>({});
  const [actionMenuRow, setActionMenuRow] = useState<string | null>(null);
  const resizingRef = useRef<{ key: string; startX: number; startW: number } | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Selection
  const internalSelected = selectedIds ?? new Set<string>();
  const allSelected = data.length > 0 && data.every((r) => r.id && internalSelected.has(r.id));
  const someSelected = data.some((r) => r.id && internalSelected.has(r.id));

  const toggleSelectAll = () => {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange(new Set());
    } else {
      const newSet = new Set(data.map((r) => r.id!).filter(Boolean));
      onSelectionChange(newSet);
    }
  };

  const toggleSelectRow = (id: string) => {
    if (!onSelectionChange) return;
    const newSet = new Set(internalSelected);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    onSelectionChange(newSet);
  };

  // Sort
  const handleSort = (key: string) => {
    if (!onSort) return;
    const newDir = sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    onSort(key, newDir);
  };

  // Column resize
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, colKey: string) => {
      e.preventDefault();
      e.stopPropagation();
      const th = (e.target as HTMLElement).closest("th");
      if (!th) return;
      const startW = colWidths[colKey] || th.getBoundingClientRect().width;
      resizingRef.current = { key: colKey, startX: e.clientX, startW };

      const onMove = (ev: MouseEvent) => {
        if (!resizingRef.current) return;
        const diff = ev.clientX - resizingRef.current.startX;
        const newW = Math.max(60, resizingRef.current.startW + diff);
        setColWidths((prev) => ({ ...prev, [resizingRef.current!.key]: newW }));
      };
      const onUp = () => {
        resizingRef.current = null;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [colWidths]
  );

  // Close action menu on outside click
  React.useEffect(() => {
    if (!actionMenuRow) return;
    const handler = (e: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target as Node)) {
        setActionMenuRow(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [actionMenuRow]);

  if (loading) {
    return (
      <div className="bg-white border border-[#e5e5e5] p-12 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0176d3] animate-spin" />
        <p className="mt-3 text-[13px] text-[#706e6b]">Daten werden geladen...</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-white border border-[#e5e5e5] p-12 flex flex-col items-center justify-center">
        <Inbox className="w-12 h-12 text-[#c9c9c9]" />
        <p className="mt-3 text-[13px] text-[#706e6b]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e5e5e5] overflow-hidden">
      <div className="overflow-x-auto">
        <table ref={tableRef} className="w-full">
          <thead>
            <tr className="border-b border-[#e5e5e5] bg-[#fafaf9]">
              {/* Select all checkbox */}
              {selectable && (
                <th className="w-[40px] px-2 py-2">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected && !allSelected;
                    }}
                    onChange={toggleSelectAll}
                    className="w-[14px] h-[14px] rounded-sm border-[#c9c9c9] text-[#0176d3] focus:ring-[#0176d3] focus:ring-offset-0 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={colWidths[col.key] ? { width: colWidths[col.key] } : undefined}
                  className={`relative px-4 py-2 text-left text-[11px] font-bold text-[#706e6b] uppercase tracking-wider select-none ${
                    col.sortable ? "cursor-pointer hover:bg-[#ecebea]" : ""
                  } ${col.className || ""}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    <span className="truncate">{col.header}</span>
                    {col.sortable && sortKey === col.key && (
                      sortDirection === "asc" ? (
                        <ArrowUp className="w-3 h-3 text-[#0176d3] shrink-0" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-[#0176d3] shrink-0" />
                      )
                    )}
                  </div>
                  {/* Resize handle */}
                  <div
                    className="slds-resizable-handle"
                    onMouseDown={(e) => handleResizeStart(e, col.key)}
                  />
                </th>
              ))}
              {/* Row actions column header */}
              {rowActions && rowActions.length > 0 && (
                <th className="w-[44px] px-1 py-2" />
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              const rowId = row.id || String(idx);
              const isSelected = internalSelected.has(rowId);

              return (
                <tr
                  key={rowId}
                  className={`border-b border-[#e5e5e5] transition-colors ${
                    isSelected ? "bg-[#ecebea]" : "hover:bg-[#f3f3f3]"
                  } ${onRowClick ? "cursor-pointer" : ""}`}
                  onClick={() => onRowClick?.(row)}
                >
                  {/* Row checkbox */}
                  {selectable && (
                    <td className="w-[40px] px-2 py-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(rowId)}
                        className="w-[14px] h-[14px] rounded-sm border-[#c9c9c9] text-[#0176d3] focus:ring-[#0176d3] focus:ring-offset-0 cursor-pointer"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-2 text-[13px] text-[#181818] ${col.className || ""}`}
                    >
                      {col.render
                        ? col.render(row)
                        : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                    </td>
                  ))}
                  {/* Row action button */}
                  {rowActions && rowActions.length > 0 && (
                    <td className="w-[44px] px-1 py-2 relative" onClick={(e) => e.stopPropagation()}>
                      <div className="slds-row-actions">
                        <button
                          onClick={() => setActionMenuRow(actionMenuRow === rowId ? null : rowId)}
                          className="p-1.5 rounded hover:bg-[#ecebea] text-[#706e6b] hover:text-[#181818] transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      {actionMenuRow === rowId && (
                        <div
                          ref={actionMenuRef}
                          className="absolute z-50 right-2 top-full mt-0.5 w-[180px] bg-white border border-[#e5e5e5] rounded shadow-lg overflow-hidden"
                        >
                          {rowActions.map((action, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                action.onClick(row);
                                setActionMenuRow(null);
                              }}
                              className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-[#f3f3f3] transition-colors ${
                                action.danger ? "text-[#ea001e]" : "text-[#181818]"
                              }`}
                            >
                              {action.icon}
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > pageSize && onPageChange && (
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#e5e5e5] bg-[#fafaf9]">
          <p className="text-[12px] text-[#706e6b]">
            {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} von {total}
          </p>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => onPageChange(1)}
              disabled={page <= 1}
              className="p-1 rounded hover:bg-[#ecebea] disabled:opacity-30 disabled:cursor-not-allowed text-[#706e6b]"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="p-1 rounded hover:bg-[#ecebea] disabled:opacity-30 disabled:cursor-not-allowed text-[#706e6b]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 py-0.5 text-[12px] font-medium text-[#181818]">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="p-1 rounded hover:bg-[#ecebea] disabled:opacity-30 disabled:cursor-not-allowed text-[#706e6b]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={page >= totalPages}
              className="p-1 rounded hover:bg-[#ecebea] disabled:opacity-30 disabled:cursor-not-allowed text-[#706e6b]"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
