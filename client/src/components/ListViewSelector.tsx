import { useState, useRef, useEffect } from "react";
import { ChevronDown, Pin, Star, Pencil, Trash2, Plus, Check } from "lucide-react";
import type { ListView } from "../lib/api";

interface ListViewSelectorProps {
  views: ListView[];
  currentView: ListView | null;
  onViewChange: (view: ListView | null) => void;
  onCreateView: () => void;
  onEditView?: (view: ListView) => void;
  onDeleteView?: (view: ListView) => void;
  onTogglePin?: (view: ListView) => void;
  onSetDefault?: (view: ListView) => void;
  entityLabel: string;
}

export default function ListViewSelector({
  views,
  currentView,
  onViewChange,
  onCreateView,
  onEditView,
  onDeleteView,
  onTogglePin,
  onSetDefault,
  entityLabel,
}: ListViewSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pinnedViews = views.filter((v) => v.isPinned);
  const otherViews = views.filter((v) => !v.isPinned);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-brand/30 min-w-[200px]"
      >
        <span className="truncate">
          {currentView ? currentView.name : `Alle ${entityLabel}`}
        </span>
        {currentView?.isDefault && (
          <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
        )}
        <ChevronDown className="w-4 h-4 ml-auto text-gray-400 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-1 w-[320px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Listenansichten
            </p>
          </div>

          {/* "All" option */}
          <button
            onClick={() => {
              onViewChange(null);
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-gray-50 ${
              !currentView ? "bg-brand-light text-brand font-medium" : "text-gray-700"
            }`}
          >
            {!currentView && <Check className="w-4 h-4 text-brand shrink-0" />}
            {currentView && <span className="w-4 shrink-0" />}
            Alle {entityLabel}
          </button>

          {/* Pinned views */}
          {pinnedViews.length > 0 && (
            <>
              <div className="px-3 py-1.5 border-t border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Angepinnt
                </p>
              </div>
              {pinnedViews.map((view) => (
                <ViewRow
                  key={view.id}
                  view={view}
                  isActive={currentView?.id === view.id}
                  onSelect={() => {
                    onViewChange(view);
                    setIsOpen(false);
                  }}
                  onEdit={onEditView}
                  onDelete={onDeleteView}
                  onTogglePin={onTogglePin}
                  onSetDefault={onSetDefault}
                />
              ))}
            </>
          )}

          {/* Other views */}
          {otherViews.length > 0 && (
            <>
              <div className="px-3 py-1.5 border-t border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Meine Ansichten
                </p>
              </div>
              {otherViews.map((view) => (
                <ViewRow
                  key={view.id}
                  view={view}
                  isActive={currentView?.id === view.id}
                  onSelect={() => {
                    onViewChange(view);
                    setIsOpen(false);
                  }}
                  onEdit={onEditView}
                  onDelete={onDeleteView}
                  onTogglePin={onTogglePin}
                  onSetDefault={onSetDefault}
                />
              ))}
            </>
          )}

          {/* Create new */}
          <div className="border-t border-gray-100">
            <button
              onClick={() => {
                onCreateView();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-brand hover:bg-brand-light"
            >
              <Plus className="w-4 h-4" />
              Neue Listenansicht erstellen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ViewRow({
  view,
  isActive,
  onSelect,
  onEdit,
  onDelete,
  onTogglePin,
  onSetDefault,
}: {
  view: ListView;
  isActive: boolean;
  onSelect: () => void;
  onEdit?: (v: ListView) => void;
  onDelete?: (v: ListView) => void;
  onTogglePin?: (v: ListView) => void;
  onSetDefault?: (v: ListView) => void;
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`relative flex items-center group ${
        isActive ? "bg-brand-light" : "hover:bg-gray-50"
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <button
        onClick={onSelect}
        className="flex-1 flex items-center gap-2 px-3 py-2.5 text-sm text-left"
      >
        {isActive ? (
          <Check className="w-4 h-4 text-brand shrink-0" />
        ) : (
          <span className="w-4 shrink-0" />
        )}
        <span className={isActive ? "font-medium text-brand" : "text-gray-700"}>
          {view.name}
        </span>
        {view.isDefault && (
          <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
        )}
        {view.isPinned && (
          <Pin className="w-3 h-3 text-gray-400 shrink-0" />
        )}
      </button>

      {showActions && (
        <div className="flex items-center gap-0.5 pr-2">
          {onTogglePin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin(view);
              }}
              className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600"
              title={view.isPinned ? "Entpinnen" : "Anpinnen"}
            >
              <Pin className="w-3 h-3" />
            </button>
          )}
          {onSetDefault && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSetDefault(view);
              }}
              className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-amber-500"
              title="Als Standard setzen"
            >
              <Star className="w-3 h-3" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(view);
              }}
              className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600"
              title="Bearbeiten"
            >
              <Pencil className="w-3 h-3" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(view);
              }}
              className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-red-500"
              title="Löschen"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
