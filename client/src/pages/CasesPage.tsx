import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Pencil, Trash2 } from "lucide-react";
import { type Column, type RowAction } from "../components/DataTable";
import Badge, { getStatusVariant } from "../components/Badge";
import SalesforceListPage from "../components/SalesforceListPage";
import type { FilterField } from "../components/FilterPanel";
import type { KanbanColumn } from "../components/KanbanBoard";

// Cases use the generic CRUD API
const casesApi = {
  list: async (params?: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams();
    if (params) {
      for (const [key, val] of Object.entries(params)) {
        if (val !== undefined && val !== "") searchParams.set(key, String(val));
      }
    }
    const qs = searchParams.toString();
    const res = await fetch(`/api/cases${qs ? `?${qs}` : ""}`);
    return res.json();
  },
  update: async (id: string, data: any) => {
    const res = await fetch(`/api/cases/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (id: string) => {
    const res = await fetch(`/api/cases/${id}`, { method: "DELETE" });
    return res.json();
  },
};

interface Case {
  id: string;
  recordType?: string;
  subject: string;
  description?: string;
  status: string;
  priority: string;
  origin?: string;
  accountId?: string;
  contactId?: string;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
}

const allColumns: Column<Case>[] = [
  {
    key: "subject",
    header: "Case-Betreff",
    sortable: true,
    render: (row) => (
      <Link
        to={`/cases/${row.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 hover:text-[#0176d3]"
      >
        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
          <AlertCircle className="w-4 h-4 text-red-600" />
        </div>
        <span className="font-medium text-gray-900">{row.subject}</span>
      </Link>
    ),
  },
  {
    key: "priority",
    header: "Priorität",
    sortable: true,
    render: (row) => {
      const v =
        row.priority === "Kritisch" || row.priority === "Hoch"
          ? "danger"
          : row.priority === "Mittel"
          ? "warning"
          : "neutral";
      return <Badge variant={v as any}>{row.priority}</Badge>;
    },
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge>,
  },
  {
    key: "recordType",
    header: "Datensatztyp",
    sortable: true,
    render: (row) => (
      <Badge variant={row.recordType === "Anwaltsfall" ? "purple" : "neutral"}>
        {row.recordType === "Anwaltsfall" ? "Anwaltsfall" : "Standard"}
      </Badge>
    ),
  },
  {
    key: "origin",
    header: "Case-Herkunft",
    sortable: true,
    render: (row) => <span className="text-gray-600">{row.origin || "---"}</span>,
  },
  {
    key: "description",
    header: "Beschreibung",
    render: (row) => (
      <span className="text-gray-500 text-xs truncate max-w-[200px] inline-block">
        {row.description || "---"}
      </span>
    ),
  },
  {
    key: "createdAt",
    header: "Erstellt am",
    sortable: true,
    render: (row) => (
      <span className="text-gray-500 text-xs">
        {new Date(row.createdAt).toLocaleDateString("de-DE")}
      </span>
    ),
  },
  {
    key: "updatedAt",
    header: "Geändert am",
    sortable: true,
    render: (row) => (
      <span className="text-gray-500 text-xs">
        {new Date(row.updatedAt).toLocaleDateString("de-DE")}
      </span>
    ),
  },
];

const defaultVisibleColumns = [
  "subject",
  "priority",
  "status",
  "recordType",
  "origin",
  "createdAt",
];

const filterFields: FilterField[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "Neu", label: "Neu" },
      { value: "In Bearbeitung", label: "In Bearbeitung" },
      { value: "Eskaliert", label: "Eskaliert" },
      { value: "Gelöst", label: "Gelöst" },
      { value: "Geschlossen", label: "Geschlossen" },
    ],
  },
  {
    key: "priority",
    label: "Priorität",
    type: "select",
    options: [
      { value: "Niedrig", label: "Niedrig" },
      { value: "Normal", label: "Normal" },
      { value: "Mittel", label: "Mittel" },
      { value: "Hoch", label: "Hoch" },
      { value: "Kritisch", label: "Kritisch" },
    ],
  },
  {
    key: "recordType",
    label: "Datensatztyp",
    type: "select",
    options: [
      { value: "Standart_Case", label: "Standard" },
      { value: "Anwaltsfall", label: "Anwaltsfall" },
    ],
  },
  {
    key: "origin",
    label: "Case-Herkunft",
    type: "select",
    options: [
      { value: "Telefon", label: "Telefon" },
      { value: "E-Mail", label: "E-Mail" },
      { value: "Web", label: "Web" },
      { value: "Intern", label: "Intern" },
    ],
  },
  { key: "subject", label: "Betreff", type: "text" },
];

const kanbanColumns: KanbanColumn[] = [
  { key: "Neu", label: "Neu", color: "sky" },
  { key: "In Bearbeitung", label: "In Bearbeitung", color: "blue" },
  { key: "Eskaliert", label: "Eskaliert", color: "red" },
  { key: "Gelöst", label: "Gelöst", color: "green" },
  { key: "Geschlossen", label: "Geschlossen", color: "gray" },
];

export default function CasesPage() {
  const navigate = useNavigate();

  const rowActions: RowAction<Case>[] = [
    { label: "Bearbeiten", icon: <Pencil className="w-3.5 h-3.5" />, onClick: (row) => navigate(`/cases/${row.id}`) },
    { label: "Löschen", icon: <Trash2 className="w-3.5 h-3.5" />, danger: true, onClick: async (row) => { if (confirm("Case wirklich löschen?")) { await casesApi.delete(row.id); window.location.reload(); } } },
  ];

  const handleKanbanDragEnd = async (itemId: string, newColumnKey: string) => {
    try {
      await casesApi.update(itemId, { status: newColumnKey });
    } catch (e) {
      console.error("Status update failed:", e);
    }
  };

  return (
    <SalesforceListPage<Case>
      entity="cases"
      entityLabel="Case"
      entityLabelPlural="Cases"
      basePath="/cases"
      allColumns={allColumns}
      defaultVisibleColumns={defaultVisibleColumns}
      filterFields={filterFields}
      entityIconColor="#ea001e"
      fetchData={(params) => casesApi.list(params)}
      rowActions={rowActions}
      kanbanColumns={kanbanColumns}
      kanbanField="status"
      getKanbanColumnKey={(item) => item.status}
      onKanbanDragEnd={handleKanbanDragEnd}
      renderKanbanCard={(c) => (
        <div>
          <p className="text-sm font-medium text-gray-800">{c.subject}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant={
                (c.priority === "Kritisch" || c.priority === "Hoch"
                  ? "danger"
                  : c.priority === "Mittel"
                  ? "warning"
                  : "neutral") as any
              }
            >
              {c.priority}
            </Badge>
          </div>
        </div>
      )}
    />
  );
}
