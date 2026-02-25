import { Link, useNavigate } from "react-router-dom";
import { TrendingUp, DollarSign, Pencil, Trash2 } from "lucide-react";
import { type Column, type RowAction } from "../components/DataTable";
import Badge, { getStatusVariant } from "../components/Badge";
import SalesforceListPage from "../components/SalesforceListPage";
import type { FilterField } from "../components/FilterPanel";
import type { KanbanColumn } from "../components/KanbanBoard";
import { opportunitiesApi, type Opportunity } from "../lib/api";

const fmt = (n?: number) =>
  n != null
    ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n)
    : "---";

const allColumns: Column<Opportunity>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (row) => (
      <Link
        to={`/opportunities/${row.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 hover:text-[#0176d3]"
      >
        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
          <TrendingUp className="w-4 h-4 text-purple-600" />
        </div>
        <span className="font-medium text-gray-900">{row.name}</span>
      </Link>
    ),
  },
  {
    key: "stage",
    header: "Phase",
    sortable: true,
    render: (row) => <Badge variant={getStatusVariant(row.stage)}>{row.stage}</Badge>,
  },
  {
    key: "amount",
    header: "Betrag",
    sortable: true,
    render: (row) => (
      <span className="font-medium text-gray-800">{fmt(row.amount)}</span>
    ),
    className: "text-right",
  },
  {
    key: "probability",
    header: "Wahrscheinl.",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand rounded-full"
            style={{ width: `${row.probability ?? 0}%` }}
          />
        </div>
        <span className="text-xs text-gray-600">{row.probability ?? 0}%</span>
      </div>
    ),
  },
  {
    key: "closeDate",
    header: "Abschlussdatum",
    sortable: true,
    render: (row) =>
      row.closeDate ? (
        <span className="text-gray-600">
          {new Date(row.closeDate).toLocaleDateString("de-DE")}
        </span>
      ) : (
        <span className="text-gray-400">---</span>
      ),
  },
  {
    key: "taskCount",
    header: "Aufgaben",
    render: (row) => <span className="font-medium">{row.taskCount ?? 0}</span>,
    className: "text-right",
  },
  {
    key: "createdAt",
    header: "Erstellt",
    sortable: true,
    render: (row) => (
      <span className="text-gray-500 text-xs">
        {new Date(row.createdAt).toLocaleDateString("de-DE")}
      </span>
    ),
  },
];

const defaultVisibleColumns = [
  "name",
  "stage",
  "amount",
  "probability",
  "closeDate",
  "createdAt",
];

const filterFields: FilterField[] = [
  {
    key: "stage",
    label: "Phase",
    type: "select",
    options: [
      { value: "Qualifizierung", label: "Qualifizierung" },
      { value: "Bedarfsanalyse", label: "Bedarfsanalyse" },
      { value: "Angebot", label: "Angebot" },
      { value: "Verhandlung", label: "Verhandlung" },
      { value: "Gewonnen", label: "Gewonnen" },
      { value: "Verloren", label: "Verloren" },
    ],
  },
  { key: "name", label: "Name", type: "text" },
  { key: "amount", label: "Betrag", type: "number" },
  { key: "probability", label: "Wahrscheinlichkeit", type: "number" },
  { key: "closeDate", label: "Abschlussdatum", type: "date" },
];

const kanbanColumns: KanbanColumn[] = [
  { key: "Qualifizierung", label: "Qualifizierung", color: "sky" },
  { key: "Bedarfsanalyse", label: "Bedarfsanalyse", color: "purple" },
  { key: "Angebot", label: "Angebot", color: "amber" },
  { key: "Verhandlung", label: "Verhandlung", color: "orange" },
  { key: "Gewonnen", label: "Gewonnen", color: "green" },
  { key: "Verloren", label: "Verloren", color: "red" },
];

export default function OpportunitiesPage() {
  const navigate = useNavigate();

  const rowActions: RowAction<Opportunity>[] = [
    {
      label: "Bearbeiten",
      icon: <Pencil className="w-3.5 h-3.5" />,
      onClick: (row) => navigate(`/opportunities/${row.id}`),
    },
    {
      label: "Löschen",
      icon: <Trash2 className="w-3.5 h-3.5" />,
      danger: true,
      onClick: async (row) => {
        if (confirm("Opportunity wirklich löschen?")) {
          await opportunitiesApi.delete(row.id);
          window.location.reload();
        }
      },
    },
  ];

  const handleKanbanDragEnd = async (itemId: string, newColumnKey: string) => {
    try {
      await opportunitiesApi.update(itemId, { stage: newColumnKey } as any);
    } catch (e) {
      console.error("Stage update failed:", e);
    }
  };

  return (
    <SalesforceListPage<Opportunity>
      entity="opportunities"
      entityLabel="Opportunity"
      entityLabelPlural="Opportunities"
      basePath="/opportunities"
      allColumns={allColumns}
      defaultVisibleColumns={defaultVisibleColumns}
      filterFields={filterFields}
      entityIconColor="#7b64ff"
      fetchData={(params) => opportunitiesApi.list(params)}
      rowActions={rowActions}
      kanbanColumns={kanbanColumns}
      kanbanField="stage"
      getKanbanColumnKey={(item) => item.stage}
      onKanbanDragEnd={handleKanbanDragEnd}
      getKanbanColumnTotal={(items) => {
        const sum = items.reduce((acc, i) => acc + (i.amount || 0), 0);
        return `Gesamt: ${fmt(sum)}`;
      }}
      renderKanbanCard={(opp) => (
        <div>
          <p className="text-sm font-medium text-gray-800">{opp.name}</p>
          {opp.amount != null && (
            <div className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-green-700">
              <DollarSign className="w-3 h-3" />
              {fmt(opp.amount)}
            </div>
          )}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full"
                style={{ width: `${opp.probability ?? 0}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-500">{opp.probability ?? 0}%</span>
          </div>
          {opp.closeDate && (
            <p className="text-[10px] text-gray-400 mt-1.5">
              Abschluss: {new Date(opp.closeDate).toLocaleDateString("de-DE")}
            </p>
          )}
        </div>
      )}
    />
  );
}
