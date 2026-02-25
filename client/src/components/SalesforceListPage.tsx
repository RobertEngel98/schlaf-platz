import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  List,
  Kanban,
  Loader2,
  RefreshCw,
  Filter,
  Settings2,
  Printer,
  PanelRightOpen,
  ChevronDown,
  X,
  Pin,
  Check,
  BarChart3,
  ArrowUpDown,
  Pencil,
  Copy,
  Trash2,
} from "lucide-react";
import DataTable, { type Column, type RowAction } from "./DataTable";
import FilterPanel, { type FilterField } from "./FilterPanel";
import KanbanBoard, { type KanbanColumn } from "./KanbanBoard";
import ListViewSelector from "./ListViewSelector";
import ColumnPicker from "./ColumnPicker";
import ViewSaveModal from "./ViewSaveModal";
import { listViewsApi, type ListView, type FilterCondition } from "../lib/api";

type ViewMode = "table" | "kanban" | "split";

export interface SalesforceListPageConfig<T> {
  entity: string;
  entityLabel: string;
  entityLabelPlural: string;
  basePath: string;
  entityIcon?: ReactNode;
  entityIconColor?: string;
  // Columns
  allColumns: Column<T>[];
  defaultVisibleColumns: string[];
  // Filter fields
  filterFields: FilterField[];
  // Row actions
  rowActions?: RowAction<T>[];
  // Kanban config (optional)
  kanbanColumns?: KanbanColumn[];
  kanbanField?: string;
  getKanbanColumnKey?: (item: T) => string;
  renderKanbanCard?: (item: T) => ReactNode;
  getKanbanColumnTotal?: (items: T[]) => string;
  onKanbanDragEnd?: (itemId: string, newColumnKey: string) => Promise<void>;
  // Split view detail renderer (optional)
  renderSplitDetail?: (item: T) => ReactNode;
  // API
  fetchData: (params: Record<string, string | number | undefined>) => Promise<{
    data: T[];
    total: number;
  }>;
  // Header
  headerActions?: ReactNode;
}

export default function SalesforceListPage<T extends { id: string }>({
  entity,
  entityLabel: _entityLabel,
  entityLabelPlural,
  basePath,
  entityIcon,
  entityIconColor = "#7b64ff",
  allColumns,
  defaultVisibleColumns,
  filterFields,
  rowActions,
  kanbanColumns,
  kanbanField,
  getKanbanColumnKey,
  renderKanbanCard,
  getKanbanColumnTotal,
  onKanbanDragEnd,
  renderSplitDetail,
  fetchData,
  headerActions,
}: SalesforceListPageConfig<T>) {
  const navigate = useNavigate();

  // View state
  const [views, setViews] = useState<ListView[]>([]);
  const [currentView, setCurrentView] = useState<ListView | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingView, setEditingView] = useState<ListView | null>(null);

  // Data state
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Filter state
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [filterLogic, setFilterLogic] = useState<"AND" | "OR">("AND");
  const [showFilters, setShowFilters] = useState(false);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState<string[]>(defaultVisibleColumns);

  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Split view state
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  // View mode dropdown state
  const [showViewModeDropdown, setShowViewModeDropdown] = useState(false);
  const viewModeDropdownRef = useRef<HTMLDivElement>(null);

  // Settings dropdown state
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const settingsDropdownRef = useRef<HTMLDivElement>(null);

  // Column picker state (triggered from settings menu)
  const [showColumnPickerFromMenu, setShowColumnPickerFromMenu] = useState(false);

  // Chart toggle
  const [showChart, setShowChart] = useState(false);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (viewModeDropdownRef.current && !viewModeDropdownRef.current.contains(e.target as Node)) {
        setShowViewModeDropdown(false);
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(e.target as Node)) {
        setShowSettingsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Load views
  useEffect(() => {
    listViewsApi.list(entity).then((v) => {
      setViews(v);
      const defaultView = v.find((vw) => vw.isDefault);
      if (defaultView) {
        applyView(defaultView);
      }
    }).catch(() => {});
  }, [entity]);

  // Apply a view's settings
  const applyView = (view: ListView | null) => {
    setCurrentView(view);
    if (view) {
      if (view.filters?.length) setFilters(view.filters);
      else setFilters([]);
      if (view.visibleColumns?.length) setVisibleColumns(view.visibleColumns);
      else setVisibleColumns(defaultVisibleColumns);
      if (view.sortField) {
        setSortKey(view.sortField);
        setSortDir(view.sortOrder as "asc" | "desc" || "asc");
      }
      if (view.viewMode) setViewMode(view.viewMode as ViewMode);
    } else {
      setFilters([]);
      setVisibleColumns(defaultVisibleColumns);
      setSortKey("createdAt");
      setSortDir("desc");
      setViewMode("table");
    }
    setPage(1);
  };

  // Build query params from filters
  const buildQueryParams = useCallback(() => {
    const params: Record<string, string | number | undefined> = {
      page,
      limit: viewMode === "kanban" ? 200 : pageSize,
      sort: sortKey,
      order: sortDir,
      search: search || undefined,
    };

    for (const f of filters) {
      if (f.operator === "is_empty" || f.operator === "is_not_empty") {
        params[`${f.field}_${f.operator}`] = "true";
      } else if (f.value) {
        if (f.operator === "equals") {
          params[f.field] = f.value;
        } else {
          params[`${f.field}_${f.operator}`] = f.value;
        }
      }
    }

    return params;
  }, [page, pageSize, sortKey, sortDir, search, filters, viewMode]);

  // Fetch data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const params = buildQueryParams();
      const result = await fetchData(params);
      setData(result.data);
      setTotal(result.total);
      setLastUpdated(new Date());
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [buildQueryParams, fetchData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Client-side filter application
  const filteredData = useCallback(() => {
    if (filters.length === 0) return data;

    return data.filter((item) => {
      const results = filters.map((f) => {
        const val = String((item as Record<string, any>)[f.field] ?? "");
        switch (f.operator) {
          case "equals":
            return val.toLowerCase() === f.value.toLowerCase();
          case "not_equals":
            return val.toLowerCase() !== f.value.toLowerCase();
          case "contains":
            return val.toLowerCase().includes(f.value.toLowerCase());
          case "not_contains":
            return !val.toLowerCase().includes(f.value.toLowerCase());
          case "starts_with":
            return val.toLowerCase().startsWith(f.value.toLowerCase());
          case "greater_than":
            return Number(val) > Number(f.value);
          case "less_than":
            return Number(val) < Number(f.value);
          case "is_empty":
            return !val || val === "undefined" || val === "null";
          case "is_not_empty":
            return !!val && val !== "undefined" && val !== "null";
          default:
            return true;
        }
      });

      return filterLogic === "AND"
        ? results.every(Boolean)
        : results.some(Boolean);
    });
  }, [data, filters, filterLogic]);

  // Sort handler
  const handleSort = (key: string, dir: "asc" | "desc") => {
    setSortKey(key);
    setSortDir(dir);
    setPage(1);
  };

  // View CRUD
  const handleSaveView = async (data: { name: string; isDefault: boolean; isPinned: boolean }) => {
    const viewData = {
      entity,
      name: data.name,
      isDefault: data.isDefault,
      isPinned: data.isPinned,
      filters,
      visibleColumns,
      sortField: sortKey,
      sortOrder: sortDir,
      viewMode,
      kanbanField: kanbanField || undefined,
    };

    if (editingView) {
      const updated = await listViewsApi.update(editingView.id, viewData);
      setViews((v) => v.map((vw) => (vw.id === editingView.id ? updated : vw)));
      setCurrentView(updated);
    } else {
      const created = await listViewsApi.create(viewData);
      setViews((v) => [...v, created]);
      setCurrentView(created);
    }
    setShowViewModal(false);
    setEditingView(null);
  };

  const handleDeleteView = async (view: ListView) => {
    await listViewsApi.delete(view.id);
    setViews((v) => v.filter((vw) => vw.id !== view.id));
    if (currentView?.id === view.id) {
      applyView(null);
    }
  };

  const handleTogglePin = async (view: ListView) => {
    const updated = await listViewsApi.update(view.id, { isPinned: !view.isPinned });
    setViews((v) => v.map((vw) => (vw.id === view.id ? updated : vw)));
  };

  const handleSetDefault = async (view: ListView) => {
    await listViewsApi.update(view.id, { isDefault: !view.isDefault });
    const refreshed = await listViewsApi.list(entity);
    setViews(refreshed);
  };

  // Visible columns for table
  const tableColumns = allColumns.filter((col) => visibleColumns.includes(col.key));
  const displayedData = filteredData();

  const hasKanban = !!kanbanColumns && !!getKanbanColumnKey && !!renderKanbanCard;

  // Determine which view modes are available
  const availableViewModes: ViewMode[] = [
    "table",
    ...(hasKanban ? ["kanban" as ViewMode] : []),
    "split",
  ];

  const viewModeIcon = (mode: ViewMode) => {
    switch (mode) {
      case "table": return <List className="w-4 h-4" />;
      case "kanban": return <Kanban className="w-4 h-4" />;
      case "split": return <PanelRightOpen className="w-4 h-4" />;
    }
  };

  const viewModeLabel = (mode: ViewMode) => {
    switch (mode) {
      case "table": return "Tabelle";
      case "kanban": return "Kanban";
      case "split": return "Geteilte Ansicht";
    }
  };

  // Default entity icon
  const defaultEntityIcon = (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
      style={{ backgroundColor: entityIconColor }}
    >
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    </div>
  );

  // Handle row click
  const handleRowClick = (row: T) => {
    if (viewMode === "split") {
      setSelectedItem(row);
    } else {
      navigate(`${basePath}/${row.id}`);
    }
  };

  // Info text
  const sortLabel = allColumns.find((c) => c.key === sortKey)?.header || sortKey;
  const filterFieldNames = filters.map((f) => {
    const ff = filterFields.find((fd) => fd.key === f.field);
    return ff?.label || f.field;
  });

  const getTimeAgo = () => {
    const diff = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
    if (diff < 5) return "gerade eben";
    if (diff < 60) return `vor ${diff} Sekunden`;
    if (diff < 3600) return `vor ${Math.floor(diff / 60)} Minuten`;
    return `vor ${Math.floor(diff / 3600)} Stunden`;
  };

  return (
    <div className="h-full flex flex-col bg-[#f3f3f3]">
      {/* ---- HEADER BAR ---- */}
      <div className="bg-white border-b border-[#e5e5e5]">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: Entity icon + label + list view selector */}
          <div className="flex items-center gap-3">
            {entityIcon || defaultEntityIcon}

            <div className="flex flex-col">
              <span className="text-[12px] font-normal text-[#706e6b] leading-none mb-1">
                {entityLabelPlural}
              </span>
              <div className="flex items-center gap-2">
                <ListViewSelector
                  views={views}
                  currentView={currentView}
                  onViewChange={applyView}
                  onCreateView={() => {
                    setEditingView(null);
                    setShowViewModal(true);
                  }}
                  onEditView={(v) => {
                    setEditingView(v);
                    setShowViewModal(true);
                  }}
                  onDeleteView={handleDeleteView}
                  onTogglePin={handleTogglePin}
                  onSetDefault={handleSetDefault}
                  entityLabel={entityLabelPlural}
                />
                {currentView?.isPinned && (
                  <Pin className="w-3.5 h-3.5 text-[#706e6b]" />
                )}
              </div>
            </div>
          </div>

          {/* Center: Info text */}
          <div className="hidden lg:flex items-center text-[12px] text-[#706e6b] gap-1">
            <span>{total}+ Einträge</span>
            <span className="mx-0.5">&bull;</span>
            <span>Sortiert nach {sortLabel}</span>
            {filterFieldNames.length > 0 && (
              <>
                <span className="mx-0.5">&bull;</span>
                <span>Gefiltert nach {filterFieldNames.join(", ")}</span>
              </>
            )}
            <span className="mx-0.5">&bull;</span>
            <span>Aktualisiert {getTimeAgo()}</span>
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`${basePath}/neu`)}
              className="flex items-center gap-1.5 px-4 py-[6px] text-[13px] font-medium text-[#0176d3] bg-white border border-[#0176d3] rounded hover:bg-[#f3f3f3] transition-colors"
            >
              Neu
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-[6px] text-[13px] font-medium text-[#706e6b] bg-white border border-[#c9c9c9] rounded hover:bg-[#f3f3f3] transition-colors"
              title="Druckansicht"
            >
              <Printer className="w-4 h-4" />
              Druckansicht
            </button>
            {headerActions}
          </div>
        </div>
      </div>

      {/* ---- TOOLBAR ROW ---- */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-white border-b border-[#e5e5e5]">
        {/* Left: Search */}
        <div className="relative w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#706e6b]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Diese Liste durchsuchen..."
            className="w-full pl-8 pr-3 py-1.5 text-[13px] border border-[#c9c9c9] rounded focus:ring-2 focus:ring-[#0176d3]/30 focus:border-[#0176d3] bg-white placeholder-[#706e6b]"
          />
        </div>

        {/* Right: Icon toolbar */}
        <div className="flex items-center gap-0.5">
          {/* Settings gear dropdown */}
          <div ref={settingsDropdownRef} className="relative">
            <button
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className="p-2 rounded text-[#706e6b] hover:text-[#181818] hover:bg-[#f3f3f3] transition-colors"
              title="Einstellungen"
            >
              <Settings2 className="w-4 h-4" />
              <ChevronDown className="w-2.5 h-2.5 inline ml-0.5" />
            </button>
            {showSettingsDropdown && (
              <div className="absolute z-50 top-full right-0 mt-1 w-[240px] bg-white border border-[#e5e5e5] rounded shadow-lg overflow-hidden">
                <button
                  onClick={() => {
                    navigate(`${basePath}/neu`);
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[13px] text-[#181818] hover:bg-[#f3f3f3]"
                >
                  Neu
                </button>
                <button
                  onClick={() => {
                    setEditingView(null);
                    setShowViewModal(true);
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[13px] text-[#181818] hover:bg-[#f3f3f3]"
                >
                  Ansicht speichern
                </button>
                {currentView && (
                  <>
                    <button
                      onClick={() => {
                        setEditingView(currentView);
                        setShowViewModal(true);
                        setShowSettingsDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 text-left px-4 py-2 text-[13px] text-[#181818] hover:bg-[#f3f3f3]"
                    >
                      <Pencil className="w-3.5 h-3.5 text-[#706e6b]" />
                      Ansicht bearbeiten
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          const cloned = await listViewsApi.create({
                            entity,
                            name: `${currentView.name} (Kopie)`,
                            isDefault: false,
                            isPinned: false,
                            filters,
                            visibleColumns,
                            sortField: sortKey,
                            sortOrder: sortDir,
                            viewMode,
                            kanbanField: kanbanField || undefined,
                          });
                          setViews((v) => [...v, cloned]);
                          setCurrentView(cloned);
                        } catch {}
                        setShowSettingsDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 text-left px-4 py-2 text-[13px] text-[#181818] hover:bg-[#f3f3f3]"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#706e6b]" />
                      Ansicht duplizieren
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Ansicht "${currentView.name}" wirklich löschen?`)) {
                          await handleDeleteView(currentView);
                        }
                        setShowSettingsDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 text-left px-4 py-2 text-[13px] text-[#ea001e] hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Ansicht löschen
                    </button>
                  </>
                )}
                <div className="border-t border-[#e5e5e5]" />
                <button
                  onClick={() => {
                    setShowColumnPickerFromMenu(true);
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[13px] text-[#181818] hover:bg-[#f3f3f3]"
                >
                  Angezeigte Felder auswählen
                </button>
                <button
                  onClick={() => {
                    setSortKey("createdAt");
                    setSortDir("desc");
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[13px] text-[#181818] hover:bg-[#f3f3f3]"
                >
                  Spaltensortierung zurücksetzen
                </button>
                <button
                  onClick={() => {
                    setVisibleColumns(defaultVisibleColumns);
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[13px] text-[#181818] hover:bg-[#f3f3f3]"
                >
                  Spaltenbreiten zurücksetzen
                </button>
              </div>
            )}
          </div>

          {/* View mode dropdown */}
          <div ref={viewModeDropdownRef} className="relative">
            <button
              onClick={() => setShowViewModeDropdown(!showViewModeDropdown)}
              className="flex items-center gap-0.5 p-2 rounded text-[#706e6b] hover:text-[#181818] hover:bg-[#f3f3f3] transition-colors"
              title={viewModeLabel(viewMode)}
            >
              {viewModeIcon(viewMode)}
              <ChevronDown className="w-2.5 h-2.5" />
            </button>

            {showViewModeDropdown && (
              <div className="absolute z-50 top-full right-0 mt-1 w-[180px] bg-white border border-[#e5e5e5] rounded shadow-lg overflow-hidden">
                {availableViewModes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setViewMode(mode);
                      setShowViewModeDropdown(false);
                      if (mode !== "split") setSelectedItem(null);
                    }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors ${
                      viewMode === mode
                        ? "text-[#181818] font-medium"
                        : "text-[#706e6b] hover:bg-[#f3f3f3]"
                    }`}
                  >
                    {viewMode === mode && <Check className="w-3.5 h-3.5 text-[#0176d3] shrink-0" />}
                    {viewMode !== mode && <span className="w-3.5 shrink-0" />}
                    {viewModeIcon(mode)}
                    <span>{viewModeLabel(mode)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Refresh */}
          <button
            onClick={loadData}
            className="p-2 rounded text-[#706e6b] hover:text-[#181818] hover:bg-[#f3f3f3] transition-colors"
            title="Aktualisieren"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          {/* Sort toggle */}
          <button
            onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
            className="p-2 rounded text-[#706e6b] hover:text-[#181818] hover:bg-[#f3f3f3] transition-colors"
            title={`Sortierung: ${sortDir === "asc" ? "Aufsteigend" : "Absteigend"}`}
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>

          {/* Column selector (when in table or split) */}
          {(viewMode === "table" || viewMode === "split") && (
            <ColumnPicker
              allColumns={allColumns}
              visibleColumns={visibleColumns}
              onChange={setVisibleColumns}
              defaultColumns={defaultVisibleColumns}
            />
          )}

          {/* Charts toggle */}
          <button
            onClick={() => setShowChart(!showChart)}
            className={`p-2 rounded transition-colors ${
              showChart
                ? "text-[#0176d3] bg-[#eef4ff] hover:bg-[#d8e6fe]"
                : "text-[#706e6b] hover:text-[#181818] hover:bg-[#f3f3f3]"
            }`}
            title={showChart ? "Diagramm ausblenden" : "Diagramm anzeigen"}
          >
            <BarChart3 className="w-4 h-4" />
          </button>

          {/* Inline Edit (disabled indicator) */}
          <button
            className="p-2 rounded text-[#c9c9c9] cursor-not-allowed"
            title="Inline-Bearbeitung ist deaktiviert. Filtern Sie nach einem Datensatztyp zum Aktivieren."
          >
            <Pencil className="w-4 h-4" />
          </button>

          {/* Separator */}
          <div className="w-px h-5 bg-[#e5e5e5] mx-0.5" />

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative p-2 rounded transition-colors ${
              showFilters || filters.length > 0
                ? "text-[#0176d3] bg-[#eef4ff] hover:bg-[#d8e6fe]"
                : "text-[#706e6b] hover:text-[#181818] hover:bg-[#f3f3f3]"
            }`}
            title="Filter"
          >
            <Filter className="w-4 h-4" />
            {filters.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#0176d3] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {filters.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ---- ACTIVE FILTERS BAR ---- */}
      {filters.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#fafaf9] border-b border-[#e5e5e5]">
          <span className="text-[12px] font-medium text-[#706e6b]">
            {filters.length} Filter aktiv
          </span>
          <button
            onClick={() => { setFilters([]); setPage(1); }}
            className="text-[12px] text-[#706e6b] hover:text-[#ea001e] transition-colors ml-1"
          >
            Alle entfernen
          </button>
        </div>
      )}

      {/* ---- FILTER PANEL ---- */}
      <FilterPanel
        fields={filterFields}
        filters={filters}
        onChange={(f) => {
          setFilters(f);
          setPage(1);
        }}
        logic={filterLogic}
        onLogicChange={setFilterLogic}
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        entityLabel={entityLabelPlural}
      />

      {/* ---- CONTENT AREA ---- */}
      <div className="flex-1 overflow-hidden bg-[#f3f3f3] flex flex-col">
        {/* ---- CHART AREA ---- */}
        {showChart && displayedData.length > 0 && (
          <div className="mx-4 mt-4 bg-white border border-[#e5e5e5] rounded-lg p-4 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-bold text-[#181818]">
                {entityLabelPlural} – Übersicht
              </h3>
              <button
                onClick={() => setShowChart(false)}
                className="p-1 rounded text-[#706e6b] hover:text-[#181818] hover:bg-[#f3f3f3]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-end gap-1 h-[120px]">
              {(() => {
                const statusCol = allColumns.find(c =>
                  ["status", "stage", "buchungsphase", "priority", "recordType"].includes(c.key)
                );
                if (!statusCol) return <p className="text-[12px] text-[#706e6b]">Kein Gruppierungsfeld verfügbar</p>;
                const counts: Record<string, number> = {};
                displayedData.forEach((item) => {
                  const val = String((item as Record<string, any>)[statusCol.key] || "Unbekannt");
                  counts[val] = (counts[val] || 0) + 1;
                });
                const entries = Object.entries(counts);
                const maxCount = Math.max(...entries.map(([, c]) => c), 1);
                const colors = ["#0176d3", "#2e844a", "#7b64ff", "#f59e0b", "#ea001e", "#706e6b", "#e8780a", "#0d9dda"];
                return entries.map(([label, count], i) => (
                  <div key={label} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-medium text-[#181818]">{count}</span>
                    <div
                      className="w-full rounded-t"
                      style={{
                        height: `${Math.max((count / maxCount) * 100, 8)}px`,
                        backgroundColor: colors[i % colors.length],
                      }}
                    />
                    <span className="text-[10px] text-[#706e6b] truncate max-w-full text-center" title={label}>
                      {label}
                    </span>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden flex">
        {/* Table view */}
        {viewMode === "table" && (
          <div className="flex-1 overflow-auto p-4">
            <DataTable
              columns={tableColumns}
              data={displayedData}
              total={total}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onSort={handleSort}
              sortKey={sortKey}
              sortDirection={sortDir}
              onRowClick={handleRowClick}
              loading={loading}
              emptyMessage={`Keine ${entityLabelPlural} gefunden`}
              rowActions={rowActions}
              selectable
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
            />
          </div>
        )}

        {/* Kanban view */}
        {viewMode === "kanban" && hasKanban && (
          <div className="flex-1 overflow-auto p-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#0176d3] animate-spin" />
              </div>
            ) : (
              <KanbanBoard
                columns={kanbanColumns!}
                items={displayedData}
                getColumnKey={getKanbanColumnKey!}
                getId={(item) => item.id}
                renderCard={renderKanbanCard!}
                onDragEnd={onKanbanDragEnd}
                onCardClick={(item) => navigate(`${basePath}/${item.id}`)}
                getColumnTotal={getKanbanColumnTotal}
              />
            )}
          </div>
        )}

        {/* Split view */}
        {viewMode === "split" && (
          <>
            <div className="w-[60%] overflow-auto border-r border-[#e5e5e5] bg-white">
              <DataTable
                columns={tableColumns}
                data={displayedData}
                total={total}
                page={page}
                pageSize={pageSize}
                onPageChange={setPage}
                onSort={handleSort}
                sortKey={sortKey}
                sortDirection={sortDir}
                onRowClick={handleRowClick}
                loading={loading}
                emptyMessage={`Keine ${entityLabelPlural} gefunden`}
                selectable
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
              />
            </div>

            <div className="w-[40%] overflow-auto bg-white">
              {selectedItem ? (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e5e5] bg-[#fafaf9] shrink-0">
                    <h3 className="text-[13px] font-bold text-[#181818] truncate">
                      Detailvorschau
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => navigate(`${basePath}/${selectedItem.id}`)}
                        className="text-[12px] text-[#0176d3] hover:underline font-medium"
                      >
                        Vollständig öffnen
                      </button>
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="p-1 rounded text-[#706e6b] hover:text-[#181818] hover:bg-[#ecebea] transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    {renderSplitDetail ? (
                      renderSplitDetail(selectedItem)
                    ) : (
                      <div className="space-y-3">
                        {tableColumns.map((col) => {
                          const value = col.render
                            ? col.render(selectedItem)
                            : (selectedItem as Record<string, unknown>)[col.key];
                          return (
                            <div key={col.key}>
                              <dt className="text-[11px] font-bold text-[#706e6b] uppercase tracking-wider mb-0.5">
                                {col.header}
                              </dt>
                              <dd className="text-[13px] text-[#181818]">
                                {value as ReactNode ?? <span className="text-[#c9c9c9]">---</span>}
                              </dd>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-[#706e6b]">
                  <PanelRightOpen className="w-10 h-10 mb-3 text-[#c9c9c9]" />
                  <p className="text-[13px] font-medium">Keine Auswahl</p>
                  <p className="text-[12px] mt-1">
                    Klicken Sie auf eine Zeile, um die Details anzuzeigen
                  </p>
                </div>
              )}
            </div>
          </>
        )}
        </div>
      </div>

      {/* ---- COLUMN PICKER MODAL (from settings menu) ---- */}
      {showColumnPickerFromMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-xl w-[360px] max-w-[90vw] max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
              <h3 className="text-[15px] font-bold text-[#181818]">Angezeigte Felder auswählen</h3>
              <button
                onClick={() => setShowColumnPickerFromMenu(false)}
                className="p-1 rounded hover:bg-[#f3f3f3] text-[#706e6b]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-1">
              {allColumns.map((col) => {
                const isVisible = visibleColumns.includes(col.key);
                return (
                  <button
                    key={col.key}
                    onClick={() => {
                      if (isVisible) {
                        if (visibleColumns.length > 1) {
                          setVisibleColumns(visibleColumns.filter((k) => k !== col.key));
                        }
                      } else {
                        setVisibleColumns([...visibleColumns, col.key]);
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-5 py-2 text-[13px] hover:bg-[#f3f3f3]"
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
            <div className="px-5 py-3 border-t border-[#e5e5e5] flex items-center justify-between">
              <p className="text-[12px] text-[#706e6b]">
                {visibleColumns.length} von {allColumns.length} Spalten sichtbar
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVisibleColumns(defaultVisibleColumns)}
                  className="px-3 py-1.5 text-[12px] font-medium text-[#706e6b] border border-[#c9c9c9] rounded hover:bg-[#f3f3f3]"
                >
                  Zurücksetzen
                </button>
                <button
                  onClick={() => setShowColumnPickerFromMenu(false)}
                  className="px-3 py-1.5 text-[12px] font-medium text-white bg-[#0176d3] rounded hover:bg-[#014486]"
                >
                  Fertig
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- VIEW SAVE MODAL ---- */}
      <ViewSaveModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setEditingView(null);
        }}
        onSave={handleSaveView}
        editView={editingView}
      />
    </div>
  );
}
