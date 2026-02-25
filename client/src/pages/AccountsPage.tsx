import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { type Column } from "../components/DataTable";
import Badge from "../components/Badge";
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
    header: "Name",
    sortable: true,
    render: (row) => (
      <Link
        to={`/accounts/${row.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 hover:text-[#029fde]"
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
    header: "Typ",
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
    key: "billingCity",
    header: "Stadt",
    sortable: true,
    render: (row) => <span className="text-gray-600">{row.billingCity || "---"}</span>,
  },
  {
    key: "industry",
    header: "Branche",
    render: (row) => <span className="text-gray-600">{row.industry || "---"}</span>,
  },
  {
    key: "website",
    header: "Website",
    render: (row) => <span className="text-gray-600">{row.website || "---"}</span>,
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
  "recordType",
  "phone",
  "email",
  "billingCity",
  "anzahlBuchungen",
];

const filterFields: FilterField[] = [
  {
    key: "recordType",
    label: "Typ",
    type: "select",
    options: [
      { value: "Account_Standart", label: "Kunde" },
      { value: "Account_Vermieter", label: "Vermieter" },
    ],
  },
  { key: "name", label: "Name", type: "text" },
  { key: "email", label: "E-Mail", type: "text" },
  { key: "phone", label: "Telefon", type: "text" },
  { key: "billingCity", label: "Stadt", type: "text" },
  { key: "industry", label: "Branche", type: "text" },
  { key: "anzahlBuchungen", label: "Buchungen", type: "number" },
  { key: "anzahlUnterkuenfte", label: "Unterkünfte", type: "number" },
];

export default function AccountsPage() {
  return (
    <SalesforceListPage<Account>
      entity="accounts"
      entityLabel="Account"
      entityLabelPlural="Accounts"
      basePath="/accounts"
      allColumns={allColumns}
      defaultVisibleColumns={defaultVisibleColumns}
      filterFields={filterFields}
      fetchData={(params) => accountsApi.list(params)}
    />
  );
}
