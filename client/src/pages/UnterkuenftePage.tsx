import { Link } from "react-router-dom";
import { Home, MapPin, Bed, DoorOpen } from "lucide-react";
import { type Column } from "../components/DataTable";
import Badge, { getStatusVariant } from "../components/Badge";
import SalesforceListPage from "../components/SalesforceListPage";
import type { FilterField } from "../components/FilterPanel";
import { unterkuenfteApi, type Unterkunft } from "../lib/api";

const fmt = (n?: number) =>
  n != null
    ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n)
    : "---";

const allColumns: Column<Unterkunft>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (row) => (
      <Link
        to={`/unterkuenfte/${row.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 hover:text-[#029fde]"
      >
        <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center shrink-0">
          <Home className="w-4 h-4 text-cyan-600" />
        </div>
        <span className="font-medium text-gray-900">{row.name}</span>
      </Link>
    ),
  },
  {
    key: "ort",
    header: "Ort",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-1.5 text-gray-600">
        <MapPin className="w-3 h-3" />
        {row.plz} {row.ort || "---"}
      </div>
    ),
  },
  {
    key: "strasse",
    header: "Adresse",
    render: (row) => (
      <span className="text-gray-600">
        {row.strasse ? `${row.strasse} ${row.hausnummer || ""}` : "---"}
      </span>
    ),
  },
  {
    key: "anzahlZimmer",
    header: "Zimmer",
    render: (row) => (
      <div className="flex items-center gap-1.5 text-gray-600">
        <DoorOpen className="w-3 h-3" />
        {row.anzahlZimmer ?? "---"}
      </div>
    ),
    className: "text-right",
  },
  {
    key: "anzahlBetten",
    header: "Betten",
    render: (row) => (
      <div className="flex items-center gap-1.5 text-gray-600">
        <Bed className="w-3 h-3" />
        {row.anzahlBetten ?? "---"}
      </div>
    ),
    className: "text-right",
  },
  {
    key: "maxPersonen",
    header: "Max. Personen",
    render: (row) => <span className="font-medium">{row.maxPersonen ?? "---"}</span>,
    className: "text-right",
  },
  {
    key: "preisProNacht",
    header: "Preis/Nacht",
    sortable: true,
    render: (row) => <span className="font-medium">{fmt(row.preisProNacht)}</span>,
    className: "text-right",
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => <Badge variant={getStatusVariant(row.status || "")}>{row.status || "---"}</Badge>,
  },
  {
    key: "unterkunftsTyp",
    header: "Typ",
    render: (row) => <span className="text-gray-600">{row.unterkunftsTyp || "---"}</span>,
  },
  {
    key: "anzahlBuchungen",
    header: "Buchungen",
    sortable: true,
    render: (row) => <span className="font-medium">{row.anzahlBuchungen ?? 0}</span>,
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
  "ort",
  "anzahlZimmer",
  "anzahlBetten",
  "preisProNacht",
  "status",
];

const filterFields: FilterField[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "In Bearbeitung", label: "In Bearbeitung" },
      { value: "100% fertig", label: "100% fertig" },
      { value: "Aktiv", label: "Aktiv" },
      { value: "Inaktiv", label: "Inaktiv" },
    ],
  },
  { key: "name", label: "Name", type: "text" },
  { key: "ort", label: "Ort", type: "text" },
  { key: "plz", label: "PLZ", type: "text" },
  { key: "unterkunftsTyp", label: "Typ", type: "text" },
  { key: "preisProNacht", label: "Preis/Nacht", type: "number" },
  { key: "anzahlZimmer", label: "Zimmer", type: "number" },
  { key: "anzahlBetten", label: "Betten", type: "number" },
  { key: "maxPersonen", label: "Max. Personen", type: "number" },
  { key: "wlan", label: "WLAN", type: "boolean" },
  { key: "parkplatz", label: "Parkplatz", type: "boolean" },
  { key: "kueche", label: "Küche", type: "boolean" },
];

export default function UnterkuenftePage() {
  return (
    <SalesforceListPage<Unterkunft>
      entity="unterkuenfte"
      entityLabel="Unterkunft"
      entityLabelPlural="Unterkünfte"
      basePath="/unterkuenfte"
      allColumns={allColumns}
      defaultVisibleColumns={defaultVisibleColumns}
      filterFields={filterFields}
      fetchData={(params) => unterkuenfteApi.list(params)}
      renderCard={(u) => (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="h-3 bg-gradient-to-r from-cyan-400 to-blue-500" />
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 truncate">{u.name}</h3>
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              {u.plz} {u.ort}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <DoorOpen className="w-3 h-3" /> {u.anzahlZimmer ?? 0}
              </span>
              <span className="flex items-center gap-1">
                <Bed className="w-3 h-3" /> {u.anzahlBetten ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-semibold text-gray-800">
                {fmt(u.preisProNacht)}/Nacht
              </span>
              <Badge variant={getStatusVariant(u.status || "")}>
                {u.status || "---"}
              </Badge>
            </div>
          </div>
        </div>
      )}
    />
  );
}
