import { Link, useNavigate } from "react-router-dom";
import { Building2, Pencil, Trash2 } from "lucide-react";
import { type Column, type RowAction } from "../components/DataTable";
import Badge, { getStatusVariant } from "../components/Badge";
import SalesforceListPage from "../components/SalesforceListPage";
import type { FilterField } from "../components/FilterPanel";
import { accountsApi, type Account } from "../lib/api";

const recordTypeLabels: Record<string, string> = {
  Account_Standart: "Kunde",
  Account_Vermieter: "Vermieter",
};

const allColumns: Column<Account>[] = [
  {
    key: "name",
    header: "Accountname",
    sortable: true,
    render: (row) => (
      <Link
        to={`/accounts/${row.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 hover:text-[#0176d3]"
      >
        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
          <Building2 className="w-4 h-4 text-blue-600" />
        </div>
        <span className="font-medium text-gray-900">{row.name}</span>
      </Link>
    ),
  },
  {
    key: "recordType",
    header: "Datensatztyp",
    sortable: true,
    render: (row) => (
      <Badge variant={row.recordType === "Account_Vermieter" ? "purple" : "info"}>
        {recordTypeLabels[row.recordType] || row.recordType}
      </Badge>
    ),
  },
  {
    key: "phone",
    header: "Telefon",
    render: (row) => <span className="text-gray-600">{row.phone || "---"}</span>,
  },
  {
    key: "email",
    header: "E-Mail",
    sortable: true,
    render: (row) => <span className="text-gray-600">{row.email || "---"}</span>,
  },
  {
    key: "website",
    header: "Website",
    render: (row) =>
      row.website ? (
        <span className="text-[#0176d3] truncate max-w-[200px] inline-block">{row.website}</span>
      ) : (
        <span className="text-gray-400">---</span>
      ),
  },
  {
    key: "industry",
    header: "Branche",
    sortable: true,
    render: (row) => <span className="text-gray-600">{row.industry || "---"}</span>,
  },
  {
    key: "billingStreet",
    header: "Straße",
    render: (row) => <span className="text-gray-600">{row.billingStreet || "---"}</span>,
  },
  {
    key: "billingPostalCode",
    header: "PLZ",
    render: (row) => <span className="text-gray-600">{row.billingPostalCode || "---"}</span>,
  },
  {
    key: "billingCity",
    header: "Stadt",
    sortable: true,
    render: (row) => <span className="text-gray-600">{row.billingCity || "---"}</span>,
  },
  {
    key: "billingState",
    header: "Bundesland",
    render: (row) => <span className="text-gray-600">{row.billingState || "---"}</span>,
  },
  {
    key: "billingCountry",
    header: "Land",
    render: (row) => <span className="text-gray-600">{row.billingCountry || "---"}</span>,
  },
  {
    key: "vermieterNummer",
    header: "Vermieter-Nr.",
    render: (row) => <span className="text-gray-600">{row.vermieterNummer || "---"}</span>,
  },
  {
    key: "vermieterStatus",
    header: "Vermieter Status",
    render: (row) => row.vermieterStatus
      ? <Badge variant={getStatusVariant(row.vermieterStatus)}>{row.vermieterStatus}</Badge>
      : <span className="text-gray-400">---</span>,
  },
  {
    key: "steuerNummer",
    header: "Steuernummer",
    render: (row) => <span className="text-gray-600">{row.steuerNummer || "---"}</span>,
  },
  {
    key: "iban",
    header: "IBAN",
    render: (row) => <span className="text-gray-600 text-xs">{row.iban || "---"}</span>,
  },
  {
    key: "bankName",
    header: "Bank",
    render: (row) => <span className="text-gray-600">{row.bankName || "---"}</span>,
  },
  {
    key: "anzahlBuchungen",
    header: "Buchungen",
    sortable: true,
    render: (row) => <span className="font-medium">{row.anzahlBuchungen ?? 0}</span>,
    className: "text-right",
  },
  {
    key: "anzahlUnterkuenfte",
    header: "Unterkünfte",
    sortable: true,
    render: (row) => <span className="font-medium">{row.anzahlUnterkuenfte ?? 0}</span>,
    className: "text-right",
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
  "name",
  "recordType",
  "phone",
  "email",
  "billingCity",
  "anzahlBuchungen",
];

const filterFields: FilterField[] = [
  {
    key: "recordType",
    label: "Datensatztyp",
    type: "select",
    options: [
      { value: "Account_Standart", label: "Kunde" },
      { value: "Account_Vermieter", label: "Vermieter" },
    ],
  },
  {
    key: "vermieterStatus",
    label: "Vermieter Status",
    type: "select",
    options: [
      { value: "Aktiv", label: "Aktiv" },
      { value: "Inaktiv", label: "Inaktiv" },
      { value: "Gesperrt", label: "Gesperrt" },
    ],
  },
  { key: "name", label: "Accountname", type: "text" },
  { key: "email", label: "E-Mail", type: "text" },
  { key: "phone", label: "Telefon", type: "text" },
  { key: "billingCity", label: "Stadt", type: "text" },
  { key: "billingPostalCode", label: "PLZ", type: "text" },
  { key: "billingState", label: "Bundesland", type: "text" },
  { key: "industry", label: "Branche", type: "text" },
  { key: "vermieterNummer", label: "Vermieter-Nr.", type: "text" },
  { key: "anzahlBuchungen", label: "Buchungen", type: "number" },
  { key: "anzahlUnterkuenfte", label: "Unterkünfte", type: "number" },
];

export default function AccountsPage() {
  const navigate = useNavigate();

  const rowActions: RowAction<Account>[] = [
    {
      label: "Bearbeiten",
      icon: <Pencil className="w-3.5 h-3.5" />,
      onClick: (row) => navigate(`/accounts/${row.id}`),
    },
    {
      label: "Löschen",
      icon: <Trash2 className="w-3.5 h-3.5" />,
      danger: true,
      onClick: async (row) => {
        if (confirm("Account wirklich löschen?")) {
          await accountsApi.delete(row.id);
          window.location.reload();
        }
      },
    },
  ];

  return (
    <SalesforceListPage<Account>
      entity="accounts"
      entityLabel="Account"
      entityLabelPlural="Accounts"
      basePath="/accounts"
      entityIconColor="#7b83eb"
      allColumns={allColumns}
      defaultVisibleColumns={defaultVisibleColumns}
      filterFields={filterFields}
      fetchData={(params) => accountsApi.list(params)}
      rowActions={rowActions}
    />
  );
}
