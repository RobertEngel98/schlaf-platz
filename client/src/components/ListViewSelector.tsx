import { useState, useRef, useEffect } from "react";
import { ChevronDown, Pin, Star, Pencil, Trash2, Plus, Check, Search } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const pinnedViews = views.filter((v) => v.isPinned);
  const otherViews = views.filter((v) => !v.isPinned);

  const filterViews = (list: ListView[]) =>
    searchTerm
      ? list.filter((v) => v.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : list;

  const filteredPinned = filterViews(pinnedViews);
  const filteredOther = filterViews(otherViews);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-[18px] font-bold text-[#181818] hover:text-[#0176d3] transition-colors"
      >
        <span className="truncate max-w-[280px]">
          {currentView ? currentView.name : `Alle ${entityLabel}`}
        </span>
        <ChevronDown className="w-4 h-4 text-[#706e6b] shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-1 w-[320px] bg-white border border-[#e5e5e5] rounded shadow-lg overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-[#e5e5e5]">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#706e6b]" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search lists..."
                className="w-full pl-8 pr-3 py-1.5 text-[13px] border border-[#c9c9c9] rounded bg-white focus:ring-2 focus:ring-[#0176d3]/30 focus:border-[#0176d3] placeholder-[#706e6b]"
              />
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {/* "All" option */}
            <button
              onClick={() => {
                onViewChange(null);
                setIsOpen(false);
                setSearchTerm("");
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-[#f3f3f3] ${
                !currentView ? "bg-[#eef4ff] text-[#0176d3] font-medium" : "text-[#181818]"
              }`}
            >
              {!currentView && <Check className="w-3.5 h-3.5 text-[#0176d3] shrink-0" />}
              {currentView && <span className="w-3.5 shrink-0" />}
              Alle {entityLabel}
            </button>

            {/* Recent List Views / Pinned */}
            {filteredPinned.length > 0 && (
              <>
                <div className="px-3 py-1.5 border-t border-[#e5e5e5]">
                  <p className="text-[11px] font-bold text-[#706e6b] uppercase tracking-wider">
                    Recent List Views
                  </p>
                </div>
                {filteredPinned.map((view, idx) => (
                  <ViewRow
                    key={view.id}
                    view={view}
                    index={idx + 1}
                    isActive={currentView?.id === view.id}
                    onSelect={() => {
                      onViewChange(view);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    onEdit={onEditView}
                    onDelete={onDeleteView}
                    onTogglePin={onTogglePin}
                    onSetDefault={onSetDefault}
                  />
                ))}
              </>
            )}

            {/* All Other Lists */}
            {filteredOther.length > 0 && (
              <>
                <div className="px-3 py-1.5 border-t border-[#e5e5e5]">
                  <p className="text-[11px] font-bold text-[#706e6b] uppercase tracking-wider">
                    All Other Lists
                  </p>
                </div>
                {filteredOther.map((view, idx) => (
                  <ViewRow
                    key={view.id}
                    view={view}
                    index={filteredPinned.length + idx + 1}
                    isActive={currentView?.id === view.id}
                    onSelect={() => {
                      onViewChange(view);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    onEdit={onEditView}
                    onDelete={onDeleteView}
                    onTogglePin={onTogglePin}
                    onSetDefault={onSetDefault}
                  />
                ))}
              </>
            )}
          </div>

          {/* Create new */}
          <div className="border-t border-[#e5e5e5]">
            <button
              onClick={() => {
                onCreateView();
                setIsOpen(false);
                setSearchTerm("");
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] font-medium text-[#0176d3] hover:bg-[#f3f3f3]"
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
  index,
  isActive,
  onSelect,
  onEdit,
  onDelete,
  onTogglePin,
  onSetDefault,
}: {
  view: ListView;
  index: number;
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
        isActive ? "bg-[#eef4ff]" : "hover:bg-[#f3f3f3]"
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <button
        onClick={onSelect}
        className="flex-1 flex items-center gap-2 px-3 py-2 text-[13px] text-left"
      >
        {isActive ? (
          <Check className="w-3.5 h-3.5 text-[#0176d3] shrink-0" />
        ) : (
          <span className="w-3.5 shrink-0 text-[12px] text-[#706e6b]">{index}</span>
        )}
        <span className={isActive ? "font-medium text-[#0176d3]" : "text-[#181818]"}>
          {view.name}
        </span>
        {view.isDefault && (
          <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
        )}
        {view.isPinned && (
          <Pin className="w-3 h-3 text-[#706e6b] shrink-0" />
        )}
      </button>

      {showActions && (
        <div className="flex items-center gap-0.5 pr-2">
          {onTogglePin && (
            <button
              onClick={(e) => { e.stopPropagation(); onTogglePin(view); }}
              className="p-1 rounded hover:bg-[#ecebea] text-[#706e6b] hover:text-[#181818]"
              title={view.isPinned ? "Entpinnen" : "Anpinnen"}
            >
              <Pin className="w-3 h-3" />
            </button>
          )}
          {onSetDefault && (
            <button
              onClick={(e) => { e.stopPropagation(); onSetDefault(view); }}
              className="p-1 rounded hover:bg-[#ecebea] text-[#706e6b] hover:text-amber-500"
              title="Als Standard setzen"
            >
              <Star className="w-3 h-3" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(view); }}
              className="p-1 rounded hover:bg-[#ecebea] text-[#706e6b] hover:text-[#181818]"
              title="Bearbeiten"
            >
              <Pencil className="w-3 h-3" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(view); }}
              className="p-1 rounded hover:bg-[#ecebea] text-[#706e6b] hover:text-[#ea001e]"
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
