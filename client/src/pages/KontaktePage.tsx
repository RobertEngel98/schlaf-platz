import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { type Column, type RowAction } from "../components/DataTable";
import SalesforceListPage from "../components/SalesforceListPage";
import type { FilterField } from "../components/FilterPanel";
import { contactsApi, type Contact } from "../lib/api";

const allColumns: Column<Contact>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (row) => (
      <Link
        to={`/kontakte/${row.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 hover:text-[#0176d3]"
      >
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0">
          {(row.firstName?.[0] || "").toUpperCase()}
          {(row.lastName?.[0] || "").toUpperCase()}
        </div>
        <div>
          <span className="font-medium text-gray-900">
            {row.salutation ? `${row.salutation} ` : ""}
            {row.firstName} {row.lastName}
          </span>
          {row.title && <p className="text-xs text-gray-500">{row.title}</p>}
        </div>
      </Link>
    ),
  },
  {
    key: "email",
    header: "E-Mail",
    render: (row) => <span className="text-gray-600">{row.email || "---"}</span>,
  },
  {
    key: "phone",
    header: "Telefon",
    render: (row) => <span className="text-gray-600">{row.phone || "---"}</span>,
  },
  {
    key: "mobilePhone",
    header: "Mobil",
    render: (row) => <span className="text-gray-600">{row.mobilePhone || "---"}</span>,
  },
  {
    key: "mailingCity",
    header: "Stadt",
    sortable: true,
    render: (row) => <span className="text-gray-600">{row.mailingCity || "---"}</span>,
  },
  {
    key: "title",
    header: "Position",
    render: (row) => <span className="text-gray-600">{row.title || "---"}</span>,
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

const defaultVisibleColumns = ["name", "email", "phone", "mailingCity", "createdAt"];

const filterFields: FilterField[] = [
  { key: "lastName", label: "Nachname", type: "text" },
  { key: "firstName", label: "Vorname", type: "text" },
  { key: "email", label: "E-Mail", type: "text" },
  { key: "phone", label: "Telefon", type: "text" },
  { key: "mailingCity", label: "Stadt", type: "text" },
  { key: "title", label: "Position", type: "text" },
];

export default function KontaktePage() {
  const navigate = useNavigate();

  const rowActions: RowAction<Contact>[] = [
    { label: "Bearbeiten", icon: <Pencil className="w-3.5 h-3.5" />, onClick: (row) => navigate(`/kontakte/${row.id}`) },
    { label: "Löschen", icon: <Trash2 className="w-3.5 h-3.5" />, danger: true, onClick: async (row) => { if (confirm("Kontakt wirklich löschen?")) { await contactsApi.delete(row.id); window.location.reload(); } } },
  ];

  return (
    <SalesforceListPage<Contact>
      entity="contacts"
      entityLabel="Kontakt"
      entityLabelPlural="Kontakte"
      basePath="/kontakte"
      allColumns={allColumns}
      defaultVisibleColumns={defaultVisibleColumns}
      filterFields={filterFields}
      entityIconColor="#0d9dda"
      fetchData={(params) => contactsApi.list(params)}
      rowActions={rowActions}
    />
  );
}
