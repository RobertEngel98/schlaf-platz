import { Link, useNavigate } from "react-router-dom";
import { FileText, Pencil, Trash2 } from "lucide-react";
import { type Column, type RowAction } from "../components/DataTable";
import Badge, { getStatusVariant } from "../components/Badge";
import SalesforceListPage from "../components/SalesforceListPage";
import type { FilterField } from "../components/FilterPanel";
import { angeboteApi, type Angebot } from "../lib/api";

const fmt = (n?: number) =>
  n != null
    ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n)
    : "---";

const allColumns: Column<Angebot>[] = [
  {
    key: "angebotNummer",
    header: "Nr.",
    sortable: true,
    render: (row) => (
      <Link
        to={`/angebote/${row.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 hover:text-[#0176d3]"
      >
        <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4 text-violet-600" />
        </div>
        <span className="font-medium text-gray-900">
          {row.angebotNummer || row.id.slice(0, 8)}
        </span>
      </Link>
    ),
  },
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (row) => <span className="text-gray-700">{row.name}</span>,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => (
      <Badge variant={getStatusVariant(row.status || "")}>{row.status || "---"}</Badge>
    ),
  },
  {
    key: "checkIn",
    header: "Check-In",
    sortable: true,
    render: (row) =>
      row.checkIn ? (
        <span className="text-gray-600">
          {new Date(row.checkIn).toLocaleDateString("de-DE")}
        </span>
      ) : (
        <span className="text-gray-400">---</span>
      ),
  },
  {
    key: "checkOut",
    header: "Check-Out",
    render: (row) =>
      row.checkOut ? (
        <span className="text-gray-600">
          {new Date(row.checkOut).toLocaleDateString("de-DE")}
        </span>
      ) : (
        <span className="text-gray-400">---</span>
      ),
  },
  {
    key: "anzahlNaechte",
    header: "Nächte",
    render: (row) => <span>{row.anzahlNaechte ?? "---"}</span>,
    className: "text-right",
  },
  {
    key: "gesamtPreis",
    header: "Gesamt",
    sortable: true,
    render: (row) => (
      <span className="font-medium text-gray-800">{fmt(row.gesamtPreis)}</span>
    ),
    className: "text-right",
  },
  {
    key: "gueltigBis",
    header: "Gültig bis",
    sortable: true,
    render: (row) =>
      row.gueltigBis ? (
        <span className="text-gray-600">
          {new Date(row.gueltigBis).toLocaleDateString("de-DE")}
        </span>
      ) : (
        <span className="text-gray-400">---</span>
      ),
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
  "angebotNummer",
  "name",
  "status",
  "checkIn",
  "checkOut",
  "gesamtPreis",
  "gueltigBis",
];

const filterFields: FilterField[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "Entwurf", label: "Entwurf" },
      { value: "Gesendet", label: "Gesendet" },
      { value: "Angenommen", label: "Angenommen" },
      { value: "Abgelehnt", label: "Abgelehnt" },
      { value: "Abgelaufen", label: "Abgelaufen" },
    ],
  },
  { key: "name", label: "Name", type: "text" },
  { key: "gesamtPreis", label: "Gesamtpreis", type: "number" },
  { key: "checkIn", label: "Check-In", type: "date" },
  { key: "gueltigBis", label: "Gültig bis", type: "date" },
];

export default function AngebotePage() {
  const navigate = useNavigate();

  const rowActions: RowAction<Angebot>[] = [
    { label: "Bearbeiten", icon: <Pencil className="w-3.5 h-3.5" />, onClick: (row) => navigate(`/angebote/${row.id}`) },
    { label: "Löschen", icon: <Trash2 className="w-3.5 h-3.5" />, danger: true, onClick: async (row) => { if (confirm("Angebot wirklich löschen?")) { await angeboteApi.delete(row.id); window.location.reload(); } } },
  ];

  return (
    <SalesforceListPage<Angebot>
      entity="angebote"
      entityLabel="Angebot"
      entityLabelPlural="Angebote"
      basePath="/angebote"
      allColumns={allColumns}
      defaultVisibleColumns={defaultVisibleColumns}
      filterFields={filterFields}
      entityIconColor="#3c97dd"
      fetchData={(params) => angeboteApi.list(params)}
      rowActions={rowActions}
    />
  );
}
