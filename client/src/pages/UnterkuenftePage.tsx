import { Link, useNavigate } from "react-router-dom";
import { Home, MapPin, Bed, DoorOpen, Pencil, Trash2 } from "lucide-react";
import { type Column, type RowAction } from "../components/DataTable";
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
    header: "Unterkunftsname",
    sortable: true,
    render: (row) => (
      <Link
        to={`/unterkuenfte/${row.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 hover:text-[#0176d3]"
      >
        <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center shrink-0">
          <Home className="w-4 h-4 text-cyan-600" />
        </div>
        <span className="font-medium text-gray-900">{row.name}</span>
      </Link>
    ),
  },
  {
    key: "unterkunftsTyp",
    header: "Unterkunftstyp",
    sortable: true,
    render: (row) => <span className="text-gray-600">{row.unterkunftsTyp || "---"}</span>,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => <Badge variant={getStatusVariant(row.status || "")}>{row.status || "---"}</Badge>,
  },
  {
    key: "aufnahmeStatus",
    header: "Aufnahme",
    render: (row) => row.aufnahmeStatus
      ? <Badge variant={getStatusVariant(row.aufnahmeStatus)}>{row.aufnahmeStatus}</Badge>
      : <span className="text-gray-400">---</span>,
  },
  {
    key: "strasse",
    header: "Straße",
    render: (row) => (
      <span className="text-gray-600">
        {row.strasse ? `${row.strasse} ${row.hausnummer || ""}` : "---"}
      </span>
    ),
  },
  {
    key: "plz",
    header: "PLZ",
    render: (row) => <span className="text-gray-600">{row.plz || "---"}</span>,
  },
  {
    key: "ort",
    header: "Ort",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-1.5 text-gray-600">
        <MapPin className="w-3 h-3" />
        {row.ort || "---"}
      </div>
    ),
  },
  {
    key: "bundesland",
    header: "Bundesland",
    render: (row) => <span className="text-gray-600">{row.bundesland || "---"}</span>,
  },
  {
    key: "anzahlZimmer",
    header: "Zimmer",
    sortable: true,
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
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-1.5 text-gray-600">
        <Bed className="w-3 h-3" />
        {row.anzahlBetten ?? "---"}
      </div>
    ),
    className: "text-right",
  },
  {
    key: "anzahlBadezimmer",
    header: "Bäder",
    render: (row) => <span className="text-gray-600">{row.anzahlBadezimmer ?? "---"}</span>,
    className: "text-right",
  },
  {
    key: "maxPersonen",
    header: "Max. Personen",
    render: (row) => <span className="font-medium">{row.maxPersonen ?? "---"}</span>,
    className: "text-right",
  },
  {
    key: "wohnflaeche",
    header: "Wohnfläche (m²)",
    render: (row) => <span className="text-gray-600">{row.wohnflaeche != null ? `${row.wohnflaeche} m²` : "---"}</span>,
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
    key: "preisProNachtInklMwst",
    header: "Preis inkl. MwSt.",
    sortable: true,
    render: (row) => <span className="text-gray-700">{fmt(row.preisProNachtInklMwst)}</span>,
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
    key: "provisionProzent",
    header: "Provision %",
    render: (row) => <span className="text-gray-600">{row.provisionProzent != null ? `${row.provisionProzent}%` : "---"}</span>,
    className: "text-right",
  },
  {
    key: "mindestaufenthalt",
    header: "Mindestaufenthalt",
    render: (row) => <span className="text-gray-600">{row.mindestaufenthalt != null ? `${row.mindestaufenthalt} Nächte` : "---"}</span>,
    className: "text-right",
  },
  {
    key: "vermieterNachname",
    header: "Vermieter",
    render: (row) => <span className="text-gray-600">{row.vermieterVorname || row.vermieterNachname ? `${row.vermieterVorname || ""} ${row.vermieterNachname || ""}`.trim() : "---"}</span>,
  },
  {
    key: "vermieterTelefon",
    header: "Vermieter Tel.",
    render: (row) => <span className="text-gray-600">{row.vermieterTelefon || "---"}</span>,
  },
  {
    key: "vermieterEmail",
    header: "Vermieter E-Mail",
    render: (row) => <span className="text-gray-600">{row.vermieterEmail || "---"}</span>,
  },
  {
    key: "anzahlBuchungen",
    header: "Buchungen",
    sortable: true,
    render: (row) => <span className="font-medium">{row.anzahlBuchungen ?? 0}</span>,
    className: "text-right",
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
  "name",
  "unterkunftsTyp",
  "ort",
  "anzahlZimmer",
  "anzahlBetten",
  "preisProNacht",
  "status",
  "anzahlBuchungen",
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
  {
    key: "aufnahmeStatus",
    label: "Aufnahme Status",
    type: "select",
    options: [
      { value: "Offen", label: "Offen" },
      { value: "In Bearbeitung", label: "In Bearbeitung" },
      { value: "Abgeschlossen", label: "Abgeschlossen" },
    ],
  },
  { key: "name", label: "Unterkunftsname", type: "text" },
  { key: "ort", label: "Ort", type: "text" },
  { key: "plz", label: "PLZ", type: "text" },
  { key: "bundesland", label: "Bundesland", type: "text" },
  { key: "unterkunftsTyp", label: "Unterkunftstyp", type: "text" },
  { key: "preisProNacht", label: "Preis/Nacht", type: "number" },
  { key: "anzahlZimmer", label: "Zimmer", type: "number" },
  { key: "anzahlBetten", label: "Betten", type: "number" },
  { key: "maxPersonen", label: "Max. Personen", type: "number" },
  { key: "wohnflaeche", label: "Wohnfläche", type: "number" },
  { key: "mindestaufenthalt", label: "Mindestaufenthalt", type: "number" },
  { key: "kaution", label: "Kaution", type: "number" },
  { key: "wlan", label: "WLAN", type: "boolean" },
  { key: "parkplatz", label: "Parkplatz", type: "boolean" },
  { key: "kueche", label: "Küche", type: "boolean" },
  { key: "waschmaschine", label: "Waschmaschine", type: "boolean" },
  { key: "balkon", label: "Balkon", type: "boolean" },
  { key: "haustiere", label: "Haustiere", type: "boolean" },
];

export default function UnterkuenftePage() {
  const navigate = useNavigate();

  const rowActions: RowAction<Unterkunft>[] = [
    { label: "Bearbeiten", icon: <Pencil className="w-3.5 h-3.5" />, onClick: (row) => navigate(`/unterkuenfte/${row.id}`) },
    { label: "Löschen", icon: <Trash2 className="w-3.5 h-3.5" />, danger: true, onClick: async (row) => { if (confirm("Unterkunft wirklich löschen?")) { await unterkuenfteApi.delete(row.id); window.location.reload(); } } },
  ];

  return (
    <SalesforceListPage<Unterkunft>
      entity="unterkuenfte"
      entityLabel="Unterkunft"
      entityLabelPlural="Unterkünfte"
      basePath="/unterkuenfte"
      allColumns={allColumns}
      defaultVisibleColumns={defaultVisibleColumns}
      filterFields={filterFields}
      entityIconColor="#e8780a"
      fetchData={(params) => unterkuenfteApi.list(params)}
      rowActions={rowActions}
    />
  );
}
