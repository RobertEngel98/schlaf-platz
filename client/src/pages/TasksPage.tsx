import { Link, useNavigate } from "react-router-dom";
import { CheckSquare, Pencil, Trash2 } from "lucide-react";
import { type Column, type RowAction } from "../components/DataTable";
import Badge, { getStatusVariant } from "../components/Badge";
import SalesforceListPage from "../components/SalesforceListPage";
import type { FilterField } from "../components/FilterPanel";
import type { KanbanColumn } from "../components/KanbanBoard";

const tasksApi = {
  list: async (params?: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams();
    if (params) {
      for (const [key, val] of Object.entries(params)) {
        if (val !== undefined && val !== "") searchParams.set(key, String(val));
      }
    }
    const qs = searchParams.toString();
    const res = await fetch(`/api/tasks${qs ? `?${qs}` : ""}`);
    return res.json();
  },
  update: async (id: string, data: any) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    return res.json();
  },
};

interface Task {
  id: string;
  subject: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  opportunityId?: string;
  accountId?: string;
  contactId?: string;
  createdAt: string;
  updatedAt: string;
}

const allColumns: Column<Task>[] = [
  {
    key: "subject",
    header: "Aufgabenbetreff",
    sortable: true,
    render: (row) => (
      <Link
        to={`/tasks/${row.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 hover:text-[#0176d3]"
      >
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            row.status === "Erledigt"
              ? "bg-green-50"
              : "bg-amber-50"
          }`}
        >
          <CheckSquare
            className={`w-4 h-4 ${
              row.status === "Erledigt" ? "text-green-600" : "text-amber-600"
            }`}
          />
        </div>
        <span
          className={`font-medium ${
            row.status === "Erledigt"
              ? "text-gray-400 line-through"
              : "text-gray-900"
          }`}
        >
          {row.subject}
        </span>
      </Link>
    ),
  },
  {
    key: "priority",
    header: "Priorität",
    sortable: true,
    render: (row) => {
      const v =
        row.priority === "Hoch" || row.priority === "Dringend"
          ? "danger"
          : row.priority === "Normal"
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
    key: "dueDate",
    header: "Fällig am",
    sortable: true,
    render: (row) => {
      if (!row.dueDate) return <span className="text-gray-400">---</span>;
      const isOverdue = new Date(row.dueDate) < new Date() && row.status !== "Erledigt";
      return (
        <span className={isOverdue ? "text-red-600 font-medium" : "text-gray-600"}>
          {new Date(row.dueDate).toLocaleDateString("de-DE")}
        </span>
      );
    },
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

const defaultVisibleColumns = ["subject", "priority", "status", "dueDate", "createdAt"];

const filterFields: FilterField[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "Offen", label: "Offen" },
      { value: "In Bearbeitung", label: "In Bearbeitung" },
      { value: "Erledigt", label: "Erledigt" },
      { value: "Abgebrochen", label: "Abgebrochen" },
    ],
  },
  {
    key: "priority",
    label: "Priorität",
    type: "select",
    options: [
      { value: "Niedrig", label: "Niedrig" },
      { value: "Normal", label: "Normal" },
      { value: "Hoch", label: "Hoch" },
      { value: "Dringend", label: "Dringend" },
    ],
  },
  { key: "subject", label: "Betreff", type: "text" },
  { key: "dueDate", label: "Fällig am", type: "date" },
  { key: "description", label: "Beschreibung", type: "text" },
];

const kanbanColumns: KanbanColumn[] = [
  { key: "Offen", label: "Offen", color: "sky" },
  { key: "In Bearbeitung", label: "In Bearbeitung", color: "blue" },
  { key: "Erledigt", label: "Erledigt", color: "green" },
  { key: "Abgebrochen", label: "Abgebrochen", color: "gray" },
];

export default function TasksPage() {
  const navigate = useNavigate();

  const rowActions: RowAction<Task>[] = [
    { label: "Bearbeiten", icon: <Pencil className="w-3.5 h-3.5" />, onClick: (row) => navigate(`/tasks/${row.id}`) },
    { label: "Löschen", icon: <Trash2 className="w-3.5 h-3.5" />, danger: true, onClick: async (row) => { if (confirm("Aufgabe wirklich löschen?")) { await tasksApi.delete(row.id); window.location.reload(); } } },
  ];

  const handleKanbanDragEnd = async (itemId: string, newColumnKey: string) => {
    try {
      await tasksApi.update(itemId, { status: newColumnKey });
    } catch (e) {
      console.error("Status update failed:", e);
    }
  };

  return (
    <SalesforceListPage<Task>
      entity="tasks"
      entityLabel="Aufgabe"
      entityLabelPlural="Aufgaben"
      basePath="/tasks"
      allColumns={allColumns}
      defaultVisibleColumns={defaultVisibleColumns}
      filterFields={filterFields}
      entityIconColor="#4bc076"
      fetchData={(params) => tasksApi.list(params)}
      rowActions={rowActions}
      kanbanColumns={kanbanColumns}
      kanbanField="status"
      getKanbanColumnKey={(item) => item.status}
      onKanbanDragEnd={handleKanbanDragEnd}
      renderKanbanCard={(t) => (
        <div>
          <p
            className={`text-sm font-medium ${
              t.status === "Erledigt"
                ? "text-gray-400 line-through"
                : "text-gray-800"
            }`}
          >
            {t.subject}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant={
                (t.priority === "Hoch" || t.priority === "Dringend"
                  ? "danger"
                  : t.priority === "Normal"
                  ? "warning"
                  : "neutral") as any
              }
            >
              {t.priority}
            </Badge>
          </div>
          {t.dueDate && (
            <p
              className={`text-[10px] mt-1.5 ${
                new Date(t.dueDate) < new Date() && t.status !== "Erledigt"
                  ? "text-red-500 font-medium"
                  : "text-gray-400"
              }`}
            >
              Fällig: {new Date(t.dueDate).toLocaleDateString("de-DE")}
            </p>
          )}
        </div>
      )}
    />
  );
}
