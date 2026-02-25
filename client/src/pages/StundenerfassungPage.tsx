import { useEffect, useState, useCallback } from "react";
import { Search, Plus, Clock, Calendar } from "lucide-react";
import DataTable, { type Column } from "../components/DataTable";
import { stundenerfassungApi, type Stundenerfassung } from "../lib/api";

export default function StundenerfassungPage() {
  const [entries, setEntries] = useState<Stundenerfassung[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("datum");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const pageSize = 25;

  const formatDate = (date?: string) => {
    if (!date) return "---";
    return new Date(date).toLocaleDateString("de-DE");
  };

  const fetchData = useCallback(() => {
    setLoading(true);
    stundenerfassungApi
      .list({
        page,
        limit: pageSize,
        search: search || undefined,
        sort: sortKey,
        order: sortDir,
      })
      .then((res) => {
        setEntries(res.data);
        setTotal(res.total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, search, sortKey, sortDir]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  // Calculate total hours from current page
  const totalHours = entries.reduce((sum, e) => sum + e.stunden, 0);

  const columns: Column<Stundenerfassung>[] = [
    {
      key: "datum",
      header: "Datum",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-orange-600" />
          </div>
          <span className="font-medium text-gray-900">
            {formatDate(row.datum)}
          </span>
        </div>
      ),
    },
    {
      key: "userName",
      header: "Mitarbeiter",
      sortable: true,
      render: (row) => (
        <span className="text-gray-700">{row.userName || "---"}</span>
      ),
    },
    {
      key: "fuerWen",
      header: "Für",
      sortable: true,
      render: (row) => (
        <span className="text-gray-700 font-medium">{row.fuerWen}</span>
      ),
    },
    {
      key: "kategorie",
      header: "Kategorie",
      render: (row) => (
        <span className="text-gray-600">{row.kategorie || "---"}</span>
      ),
    },
    {
      key: "beschreibung",
      header: "Beschreibung",
      render: (row) => (
        <span className="text-gray-600 truncate max-w-xs block">
          {row.beschreibung || "---"}
        </span>
      ),
    },
    {
      key: "stunden",
      header: "Stunden",
      sortable: true,
      className: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-gray-900">
            {row.stunden.toFixed(1)}h
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Stundenerfassung
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {total} Einträge | Seite: {totalHours.toFixed(1)} Stunden
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#029fde] hover:bg-[#0280b3] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Neue Stunden
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Mitarbeiter oder Beschreibung suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#029fde]/20 focus:border-[#029fde]"
        />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Einträge (Seite)
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {entries.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Stunden (Seite)
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {totalHours.toFixed(1)}h
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Durchschnitt
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {entries.length > 0
              ? (totalHours / entries.length).toFixed(1)
              : "0"}
            h
          </p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={entries}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        sortKey={sortKey}
        sortDirection={sortDir}
        onSort={(key, dir) => {
          setSortKey(key);
          setSortDir(dir);
        }}
        loading={loading}
        emptyMessage="Keine Stundeneinträge gefunden"
      />
    </div>
  );
}
