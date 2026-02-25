import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Building, Mail, Pencil, Trash2 } from "lucide-react";
import { type Column, type RowAction } from "../components/DataTable";
import Badge, { getStatusVariant } from "../components/Badge";
import SalesforceListPage from "../components/SalesforceListPage";
import type { FilterField } from "../components/FilterPanel";
import type { KanbanColumn } from "../components/KanbanBoard";
import { leadsApi, type Lead } from "../lib/api";

const allColumns: Column<Lead>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (row) => (
      <Link
        to={`/leads/${row.id}`}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 hover:text-[#0176d3]"
      >
        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
          <UserPlus className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <span className="font-medium text-gray-900">
            {row.firstName} {row.lastName}
          </span>
          {row.company && (
            <p className="text-xs text-gray-500">{row.company}</p>
          )}
        </div>
      </Link>
    ),
  },
  {
    key: "company",
    header: "Firma",
    sortable: true,
    render: (row) => <span className="text-gray-600">{row.company || "---"}</span>,
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
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge>,
  },
  {
    key: "source",
    header: "Quelle",
    render: (row) => <span className="text-gray-600">{row.source || "---"}</span>,
  },
  {
    key: "nurtureStage",
    header: "Nurture",
    render: (row) => {
      if (!row.nurtureStage) return <span className="text-gray-400">---</span>;
      const colors: Record<string, string> = {
        Kalt: "info",
        Warm: "warning",
        "Heiß": "danger",
      };
      return (
        <Badge variant={(colors[row.nurtureStage] as any) || "neutral"}>
          {row.nurtureStage}
        </Badge>
      );
    },
  },
  {
    key: "city",
    header: "Stadt",
    render: (row) => <span className="text-gray-600">{row.city || "---"}</span>,
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
  "company",
  "email",
  "status",
  "source",
  "createdAt",
];

const filterFields: FilterField[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "Neu", label: "Neu" },
      { value: "Kontaktiert", label: "Kontaktiert" },
      { value: "Qualifiziert", label: "Qualifiziert" },
      { value: "Verloren", label: "Verloren" },
      { value: "Konvertiert", label: "Konvertiert" },
    ],
  },
  {
    key: "source",
    label: "Quelle",
    type: "select",
    options: [
      { value: "Website", label: "Website" },
      { value: "Empfehlung", label: "Empfehlung" },
      { value: "Kaltakquise", label: "Kaltakquise" },
      { value: "Messe", label: "Messe" },
      { value: "Social Media", label: "Social Media" },
      { value: "Google", label: "Google" },
      { value: "Sonstige", label: "Sonstige" },
    ],
  },
  { key: "lastName", label: "Nachname", type: "text" },
  { key: "company", label: "Firma", type: "text" },
  { key: "email", label: "E-Mail", type: "text" },
  { key: "city", label: "Stadt", type: "text" },
  {
    key: "nurtureStage",
    label: "Nurture Stage",
    type: "select",
    options: [
      { value: "Kalt", label: "Kalt" },
      { value: "Warm", label: "Warm" },
      { value: "Heiß", label: "Heiß" },
    ],
  },
];

const kanbanColumns: KanbanColumn[] = [
  { key: "Neu", label: "Neu", color: "sky" },
  { key: "Kontaktiert", label: "Kontaktiert", color: "blue" },
  { key: "Qualifiziert", label: "Qualifiziert", color: "purple" },
  { key: "Verloren", label: "Verloren", color: "red" },
  { key: "Konvertiert", label: "Konvertiert", color: "green" },
];

export default function LeadsPage() {
  const navigate = useNavigate();

  const rowActions: RowAction<Lead>[] = [
    {
      label: "Bearbeiten",
      icon: <Pencil className="w-3.5 h-3.5" />,
      onClick: (row) => navigate(`/leads/${row.id}`),
    },
    {
      label: "Löschen",
      icon: <Trash2 className="w-3.5 h-3.5" />,
      danger: true,
      onClick: async (row) => {
        if (confirm("Lead wirklich löschen?")) {
          await leadsApi.delete(row.id);
          window.location.reload();
        }
      },
    },
  ];

  const handleKanbanDragEnd = async (itemId: string, newColumnKey: string) => {
    try {
      await leadsApi.update(itemId, { status: newColumnKey } as any);
    } catch (e) {
      console.error("Status update failed:", e);
    }
  };

  return (
    <SalesforceListPage<Lead>
      entity="leads"
      entityLabel="Lead"
      entityLabelPlural="Leads"
      basePath="/leads"
      allColumns={allColumns}
      defaultVisibleColumns={defaultVisibleColumns}
      filterFields={filterFields}
      entityIconColor="#2e844a"
      fetchData={(params) => leadsApi.list(params)}
      rowActions={rowActions}
      kanbanColumns={kanbanColumns}
      kanbanField="status"
      getKanbanColumnKey={(item) => item.status}
      onKanbanDragEnd={handleKanbanDragEnd}
      renderKanbanCard={(lead) => (
        <div>
          <p className="text-sm font-medium text-gray-800">
            {lead.firstName} {lead.lastName}
          </p>
          {lead.company && (
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-500">
              <Building className="w-3 h-3" />
              {lead.company}
            </div>
          )}
          {lead.email && (
            <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
              <Mail className="w-3 h-3" />
              <span className="truncate">{lead.email}</span>
            </div>
          )}
          {lead.source && (
            <div className="mt-2">
              <Badge variant="neutral">{lead.source}</Badge>
            </div>
          )}
        </div>
      )}
    />
  );
}
