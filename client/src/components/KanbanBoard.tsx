import { useState, useRef, type ReactNode } from "react";
import { GripVertical } from "lucide-react";

export interface KanbanColumn {
  key: string;
  label: string;
  color: string; // tailwind bg class or hex
}

interface KanbanBoardProps<T> {
  columns: KanbanColumn[];
  items: T[];
  getColumnKey: (item: T) => string;
  getId: (item: T) => string;
  renderCard: (item: T) => ReactNode;
  onDragEnd?: (itemId: string, newColumnKey: string) => void;
  onCardClick?: (item: T) => void;
  getColumnTotal?: (items: T[]) => string;
}

const COLUMN_COLORS: Record<string, string> = {
  sky: "bg-sky-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  green: "bg-green-500",
  red: "bg-red-500",
  emerald: "bg-emerald-500",
  cyan: "bg-cyan-500",
  rose: "bg-rose-500",
  gray: "bg-gray-500",
  indigo: "bg-indigo-500",
};

export default function KanbanBoard<T>({
  columns,
  items,
  getColumnKey,
  getId,
  renderCard,
  onDragEnd,
  onCardClick,
  getColumnTotal,
}: KanbanBoardProps<T>) {
  const [dragItemId, setDragItemId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const dragCounterRef = useRef<Record<string, number>>({});

  const handleDragStart = (e: React.DragEvent, item: T) => {
    const id = getId(item);
    setDragItemId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    // Make ghost slightly transparent
    const el = e.currentTarget as HTMLElement;
    setTimeout(() => el.classList.add("opacity-50"), 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).classList.remove("opacity-50");
    setDragItemId(null);
    setDragOverCol(null);
    dragCounterRef.current = {};
  };

  const handleDragEnter = (e: React.DragEvent, colKey: string) => {
    e.preventDefault();
    if (!dragCounterRef.current[colKey]) dragCounterRef.current[colKey] = 0;
    dragCounterRef.current[colKey]++;
    setDragOverCol(colKey);
  };

  const handleDragLeave = (colKey: string) => {
    if (dragCounterRef.current[colKey]) dragCounterRef.current[colKey]--;
    if (dragCounterRef.current[colKey] <= 0) {
      dragCounterRef.current[colKey] = 0;
      if (dragOverCol === colKey) setDragOverCol(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, colKey: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    setDragOverCol(null);
    setDragItemId(null);
    dragCounterRef.current = {};
    if (itemId && onDragEnd) {
      onDragEnd(itemId, colKey);
    }
  };

  const getColorClass = (color: string) => {
    return COLUMN_COLORS[color] || color;
  };

  return (
    <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 min-h-[400px] snap-x snap-mandatory sm:snap-none">
      {columns.map((col) => {
        const colItems = items.filter((item) => getColumnKey(item) === col.key);
        const isOver = dragOverCol === col.key;

        return (
          <div
            key={col.key}
            className={`flex-shrink-0 w-[80vw] sm:w-[300px] snap-center flex flex-col rounded-xl border transition-colors ${
              isOver
                ? "border-brand bg-brand-light/30"
                : "border-gray-200 bg-gray-50/50"
            }`}
            onDragEnter={(e) => handleDragEnter(e, col.key)}
            onDragLeave={() => handleDragLeave(col.key)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.key)}
          >
            {/* Column header */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-200">
              <div className={`w-2.5 h-2.5 rounded-full ${getColorClass(col.color)}`} />
              <span className="text-sm font-semibold text-gray-700">
                {col.label}
              </span>
              <span className="ml-auto text-xs font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                {colItems.length}
              </span>
            </div>

            {/* Column total */}
            {getColumnTotal && colItems.length > 0 && (
              <div className="px-3 py-1.5 text-xs text-gray-500 border-b border-gray-100">
                {getColumnTotal(colItems)}
              </div>
            )}

            {/* Cards */}
            <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-280px)]">
              {colItems.map((item) => {
                const id = getId(item);
                const isDragging = dragItemId === id;

                return (
                  <div
                    key={id}
                    draggable={!!onDragEnd}
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragEnd={handleDragEnd}
                    onClick={() => onCardClick?.(item)}
                    className={`kanban-card bg-white rounded-lg border border-gray-200 p-3 transition-all ${
                      onDragEnd ? "cursor-grab active:cursor-grabbing" : ""
                    } ${onCardClick ? "cursor-pointer" : ""} ${
                      isDragging ? "opacity-50 ring-2 ring-brand" : ""
                    } hover:border-gray-300`}
                  >
                    {onDragEnd && (
                      <div className="float-right ml-2 text-gray-300">
                        <GripVertical className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {renderCard(item)}
                  </div>
                );
              })}
              {colItems.length === 0 && (
                <div className="text-center py-8 text-xs text-gray-400">
                  Keine Einträge
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
