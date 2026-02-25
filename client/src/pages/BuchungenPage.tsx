import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { type Column } from "../components/DataTable";
import Badge, { getStatusVariant } from "../components/Badge";
import SalesforceListPage from "../components/SalesforceListPage";
import type { FilterField } from "../components/FilterPanel";
import type { KanbanColumn } from "../components/KanbanBoard";
import { buchungenApi, type Buchung } from "../lib/api";

const fmt = (n?: number) =>
  n != null
    ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n)
    : "---";

const recordTypeLabels: Record<string, string> = {
  Buchung: "Buchung",
  Feste_Objekt_Buchung: "Festes Objekt",
  Gutschriften: "Gutschrift",
  Kaution: "Kaution",
  Schaden: "Schaden",
  Stornos: "Storno",
};

const allColumns: Column<Buchung>[] = [
  {
    key: "buchungsNummer",
    header: "Nr.",
    sortable: true,
    render: (row) => (
      <Link
        to={`/buchungen/${row.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 hover:text-[#029fde]"
      >
        <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
          <Calendar className="w-4 h-4 text-orange-600" />
        </div>
        <span className="font-medium text-gray-900">
          {row.buchungsNummer || row.id.slice(0, 8)}
        </span>
      </Link>
    ),
  },
  {
    key: "recordType",
    header: "Typ",
    render: (row) => (
      <Badge variant={getStatusVariant(row.recordType)}>
        {recordTypeLabels[row.recordType] || row.recordType}
      </Badge>
    ),
  },
  {
    key: "gastName",
    header: "Gast",
    render: (row) => <span className="text-gray-700">{row.gastName || "---"}</span>,
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
    render: (row) => <span className="font-medium">{row.anzahlNaechte ?? "---"}</span>,
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
    key: "buchungsphase",
    header: "Phase",
    sortable: true,
    render: (row) => (
      <Badge variant={getStatusVariant(row.buchungsphase)}>
        {row.buchungsphase}
      </Badge>
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
  "buchungsNummer",
  "recordType",
  "gastName",
  "checkIn",
  "checkOut",
  "anzahlNaechte",
  "gesamtPreis",
  "buchungsphase",
];

const filterFields: FilterField[] = [
  {
    key: "buchungsphase",
    label: "Phase",
    type: "select",
    options: [
      { value: "Neu", label: "Neu" },
      { value: "Bestätigt", label: "Bestätigt" },
      { value: "Eingecheckt", label: "Eingecheckt" },
      { value: "Ausgecheckt", label: "Ausgecheckt" },
      { value: "Abgerechnet", label: "Abgerechnet" },
      { value: "Verloren", label: "Verloren" },
      { value: "Storniert", label: "Storniert" },
    ],
  },
  {
    key: "recordType",
    label: "Typ",
    type: "select",
    options: [
      { value: "Buchung", label: "Buchung" },
      { value: "Feste_Objekt_Buchung", label: "Festes Objekt" },
      { value: "Gutschriften", label: "Gutschrift" },
      { value: "Kaution", label: "Kaution" },
      { value: "Schaden", label: "Schaden" },
      { value: "Stornos", label: "Storno" },
    ],
  },
  { key: "gastName", label: "Gast", type: "text" },
  { key: "buchungsNummer", label: "Buchungsnr.", type: "text" },
  { key: "checkIn", label: "Check-In", type: "date" },
  { key: "checkOut", label: "Check-Out", type: "date" },
  { key: "gesamtPreis", label: "Gesamtpreis", type: "number" },
];

const kanbanColumns: KanbanColumn[] = [
  { key: "Neu", label: "Neu", color: "sky" },
  { key: "Bestätigt", label: "Bestätigt", color: "blue" },
  { key: "Eingecheckt", label: "Eingecheckt", color: "purple" },
  { key: "Ausgecheckt", label: "Ausgecheckt", color: "amber" },
  { key: "Abgerechnet", label: "Abgerechnet", color: "green" },
  { key: "Verloren", label: "Verloren", color: "red" },
  { key: "Storniert", label: "Storniert", color: "gray" },
];

export default function BuchungenPage() {
  const handleKanbanDragEnd = async (itemId: string, newColumnKey: string) => {
    try {
      await buchungenApi.update(itemId, { buchungsphase: newColumnKey } as any);
    } catch (e) {
      console.error("Phase update failed:", e);
    }
  };

  return (
    <SalesforceListPage<Buchung>
      entity="buchungen"
      entityLabel="Buchung"
      entityLabelPlural="Buchungen"
      basePath="/buchungen"
      allColumns={allColumns}
      defaultVisibleColumns={defaultVisibleColumns}
      filterFields={filterFields}
      fetchData={(params) => buchungenApi.list(params)}
      kanbanColumns={kanbanColumns}
      kanbanField="buchungsphase"
      getKanbanColumnKey={(item) => item.buchungsphase}
      onKanbanDragEnd={handleKanbanDragEnd}
      getKanbanColumnTotal={(items) => {
        const sum = items.reduce((acc, i) => acc + (i.gesamtPreis || 0), 0);
        return `Gesamt: ${fmt(sum)}`;
      }}
      renderKanbanCard={(b) => (
        <div>
          <p className="text-sm font-medium text-gray-800">
            {b.buchungsNummer || b.id.slice(0, 8)}
          </p>
          {b.gastName && (
            <p className="text-xs text-gray-500 mt-1">{b.gastName}</p>
          )}
          {b.checkIn && b.checkOut && (
            <p className="text-[10px] text-gray-400 mt-1">
              {new Date(b.checkIn).toLocaleDateString("de-DE")} -{" "}
              {new Date(b.checkOut).toLocaleDateString("de-DE")}
            </p>
          )}
          {b.gesamtPreis != null && (
            <p className="text-xs font-semibold text-green-700 mt-1.5">
              {fmt(b.gesamtPreis)}
            </p>
          )}
          <Badge variant={getStatusVariant(b.recordType)}>
            {recordTypeLabels[b.recordType] || b.recordType}
          </Badge>
        </div>
      )}
    />
  );
}
