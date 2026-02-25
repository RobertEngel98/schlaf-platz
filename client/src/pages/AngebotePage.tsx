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
    header: "Angebots-Nr.",
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
    header: "Angebotsname",
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
    sortable: true,
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
    render: (row) => <span className="text-gray-600">{row.anzahlNaechte ?? "---"}</span>,
    className: "text-right",
  },
  {
    key: "anzahlPersonen",
    header: "Personen",
    render: (row) => <span className="text-gray-600">{row.anzahlPersonen ?? "---"}</span>,
    className: "text-right",
  },
  {
    key: "preisProNacht",
    header: "Preis/Nacht",
    sortable: true,
    render: (row) => <span className="text-gray-700">{fmt(row.preisProNacht)}</span>,
    className: "text-right",
  },
  {
    key: "gesamtPreis",
    header: "Gesamtpreis",
    sortable: true,
    render: (row) => (
      <span className="font-medium text-gray-800">{fmt(row.gesamtPreis)}</span>
    ),
    className: "text-right",
  },
  {
    key: "reinigungskosten",
    header: "Reinigung",
    render: (row) => <span className="text-gray-600">{fmt(row.reinigungskosten)}</span>,
    className: "text-right",
  },
  {
    key: "kaution",
    header: "Kaution",
    render: (row) => <span className="text-gray-600">{fmt(row.kaution)}</span>,
    className: "text-right",
  },
  {
    key: "mwstSatz",
    header: "MwSt.",
    render: (row) => <span className="text-gray-600">{row.mwstSatz != null ? `${row.mwstSatz}%` : "---"}</span>,
    className: "text-right",
  },
  {
    key: "sprache",
    header: "Sprache",
    render: (row) => <span className="text-gray-600">{row.sprache || "---"}</span>,
  },
  {
    key: "gueltigBis",
    header: "Gültig bis",
    sortable: true,
    render: (row) =>
      row.gueltigBis ? (
        <span className={`${new Date(row.gueltigBis) < new Date() ? "text-red-600 font-medium" : "text-gray-600"}`}>
          {new Date(row.gueltigBis).toLocaleDateString("de-DE")}
        </span>
      ) : (
        <span className="text-gray-400">---</span>
      ),
  },
  {
    key: "beschreibung",
    header: "Beschreibung",
    render: (row) => (
      <span className="text-gray-500 text-xs truncate max-w-[200px] inline-block">
        {row.beschreibung || "---"}
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
  {
    key: "sprache",
    label: "Sprache",
    type: "select",
    options: [
      { value: "de", label: "Deutsch" },
      { value: "en", label: "Englisch" },
    ],
  },
  { key: "name", label: "Angebotsname", type: "text" },
  { key: "angebotNummer", label: "Angebots-Nr.", type: "text" },
  { key: "gesamtPreis", label: "Gesamtpreis", type: "number" },
  { key: "preisProNacht", label: "Preis/Nacht", type: "number" },
  { key: "anzahlNaechte", label: "Nächte", type: "number" },
  { key: "anzahlPersonen", label: "Personen", type: "number" },
  { key: "checkIn", label: "Check-In", type: "date" },
  { key: "checkOut", label: "Check-Out", type: "date" },
  { key: "gueltigBis", label: "Gültig bis", type: "date" },
  { key: "kaution", label: "Kaution", type: "number" },
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
