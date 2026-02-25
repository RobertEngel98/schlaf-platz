import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  List,
  LayoutGrid,
  Kanban,
  Loader2,
  RefreshCw,
} from "lucide-react";
import DataTable, { type Column } from "./DataTable";
import FilterPanel, { type FilterField } from "./FilterPanel";
import KanbanBoard, { type KanbanColumn } from "./KanbanBoard";
import ListViewSelector from "./ListViewSelector";
import ColumnPicker from "./ColumnPicker";
import ViewSaveModal from "./ViewSaveModal";
import { listViewsApi, type ListView, type FilterCondition } from "../lib/api";

type ViewMode = "table" | "kanban" | "cards";

export interface SalesforceListPageConfig<T> {
  entity: string;
  entityLabel: string;
  entityLabelPlural: string;
  basePath: string;
  // Columns
  allColumns: Column<T>[];
  defaultVisibleColumns: string[];
  // Filter fields
  filterFields: FilterField[];
  // Kanban config (optional)
  kanbanColumns?: KanbanColumn[];
  kanbanField?: string;
  getKanbanColumnKey?: (item: T) => string;
  renderKanbanCard?: (item: T) => ReactNode;
  getKanbanColumnTotal?: (items: T[]) => string;
  onKanbanDragEnd?: (itemId: string, newColumnKey: string) => Promise<void>;
  // Card view config (optional)
  renderCard?: (item: T) => ReactNode;
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
  allColumns,
  defaultVisibleColumns,
  filterFields,
  kanbanColumns,
  kanbanField,
  getKanbanColumnKey,
  renderKanbanCard,
  getKanbanColumnTotal,
  onKanbanDragEnd,
  renderCard,
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

  // Filter state
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [filterLogic, setFilterLogic] = useState<"AND" | "OR">("AND");

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState<string[]>(defaultVisibleColumns);

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

    // Apply active filters as query params
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
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [buildQueryParams, fetchData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Client-side filter application for filters the backend doesn't support
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
    // Update all views to reflect the new default
    const refreshed = await listViewsApi.list(entity);
    setViews(refreshed);
  };

  // Visible columns for table
  const tableColumns = allColumns.filter((col) => visibleColumns.includes(col.key));
  const displayedData = filteredData();

  const hasKanban = !!kanbanColumns && !!getKanbanColumnKey && !!renderKanbanCard;
  const hasCards = !!renderCard;

  return (
    <div className="h-full flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-800">{entityLabelPlural}</h1>
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
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 ${
                viewMode === "table"
                  ? "bg-brand text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
              title="Listenansicht"
            >
              <List className="w-4 h-4" />
            </button>
            {hasKanban && (
              <button
                onClick={() => setViewMode("kanban")}
                className={`p-2 border-l border-gray-300 ${
                  viewMode === "kanban"
                    ? "bg-brand text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
                title="Kanban-Ansicht"
              >
                <Kanban className="w-4 h-4" />
              </button>
            )}
            {hasCards && (
              <button
                onClick={() => setViewMode("cards")}
                className={`p-2 border-l border-gray-300 ${
                  viewMode === "cards"
                    ? "bg-brand text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
                title="Kartenansicht"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Column picker (table mode only) */}
          {viewMode === "table" && (
            <ColumnPicker
              allColumns={allColumns}
              visibleColumns={visibleColumns}
              onChange={setVisibleColumns}
              defaultColumns={defaultVisibleColumns}
            />
          )}

          {/* Refresh */}
          <button
            onClick={loadData}
            className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            title="Aktualisieren"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          {/* New button */}
          <button
            onClick={() => navigate(`${basePath}/new`)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-brand rounded-lg hover:bg-brand-dark"
          >
            <Plus className="w-4 h-4" />
            Neu
          </button>

          {headerActions}
        </div>
      </div>

      {/* Filter panel */}
      <FilterPanel
        fields={filterFields}
        filters={filters}
        onChange={(f) => {
          setFilters(f);
          setPage(1);
        }}
        logic={filterLogic}
        onLogicChange={setFilterLogic}
      />

      {/* Search bar */}
      <div className="px-6 py-3 bg-white border-b border-gray-200">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder={`${entityLabelPlural} durchsuchen...`}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        {viewMode === "table" && (
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
            onRowClick={(row) => navigate(`${basePath}/${row.id}`)}
            loading={loading}
            emptyMessage={`Keine ${entityLabelPlural} gefunden`}
          />
        )}

        {viewMode === "kanban" && hasKanban && (
          <>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-brand animate-spin" />
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
          </>
        )}

        {viewMode === "cards" && hasCards && (
          <>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-brand animate-spin" />
              </div>
            ) : displayedData.length === 0 ? (
              <div className="text-center py-20 text-gray-500 text-sm">
                Keine {entityLabelPlural} gefunden
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayedData.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`${basePath}/${item.id}`)}
                    className="cursor-pointer"
                  >
                    {renderCard!(item)}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* View save modal */}
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
