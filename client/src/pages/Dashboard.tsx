import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  UserPlus,
  Calendar,
  Home,
  Euro,
} from "lucide-react";
import StatCard from "../components/StatCard";
import Badge, { getStatusVariant } from "../components/Badge";
import { dashboardApi, type DashboardStats } from "../lib/api";

// ---------------------------------------------------------------------------
// Inline bar-chart component
// ---------------------------------------------------------------------------
function HorizontalBar({
  label,
  value,
  maxValue,
  color,
}: {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}) {
  const width = maxValue > 0 ? (value / maxValue) * 100 : 0;
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="text-[12px] text-[#706e6b] w-28 text-right shrink-0">
        {label}
      </span>
      <div className="flex-1 h-5 bg-[#f3f3f3] rounded overflow-hidden">
        <div
          className="h-full rounded transition-all"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[12px] font-bold text-[#181818] w-8">{value}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Color maps
// ---------------------------------------------------------------------------
const STAGE_COLORS: Record<string, string> = {
  "Erstgespräch": "#0176d3",
  "Qualifizierung": "#1b96ff",
  "Angebot": "#fe9339",
  "Verhandlung": "#8b5cf6",
  "Gewonnen": "#2e844a",
  "Verloren": "#ea001e",
};

const LEAD_STATUS_COLORS: Record<string, string> = {
  "Neu": "#0176d3",
  "Kontaktiert": "#1b96ff",
  "Qualifiziert": "#fe9339",
  "Nichterreicht": "#706e6b",
  "Verloren": "#ea001e",
  "Konvertiert": "#2e844a",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return "–";
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------
export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dashboardApi
      .getStats()
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Compute max values for bar charts
  const oppMax = Math.max(
    ...(stats?.distributions.opportunitiesByStage.map((d) => d.count) ?? [0]),
    1
  );
  const leadMax = Math.max(
    ...(stats?.distributions.leadsByStatus.map((d) => d.count) ?? [0]),
    1
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#f3f3f3] min-h-full">
      {/* Header */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-2xl font-bold text-[#181818]">Dashboard</h1>
        <p className="text-sm text-[#706e6b] mt-1">
          Übersicht über alle CRM-Aktivitäten
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          Fehler beim Laden: {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-[#e5e5e5] p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
              <div className="h-8 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        stats && (
          <>
            {/* ============================================================= */}
            {/* Top row – 4 stat cards                                        */}
            {/* ============================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <StatCard
                label="Accounts"
                value={stats.counts.accounts}
                icon={Building2}
                color="blue"
              />
              <StatCard
                label="Aktive Leads"
                value={stats.counts.openLeads}
                icon={UserPlus}
                color="green"
              />
              <StatCard
                label="Offene Buchungen"
                value={stats.counts.activeBuchungen}
                icon={Calendar}
                color="purple"
              />
              <StatCard
                label="Umsatz"
                value={formatCurrency(stats.revenue.totalRevenue)}
                icon={Euro}
                color="orange"
                subtitle={`Provision: ${formatCurrency(stats.revenue.totalProvision)}`}
              />
            </div>

            {/* ============================================================= */}
            {/* Second row – Distribution charts                              */}
            {/* ============================================================= */}
            <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {/* Opportunity Pipeline */}
              <div className="bg-white rounded-lg border border-[#e5e5e5] p-4 sm:p-6">
                <h2 className="text-base font-semibold text-[#181818] mb-4">
                  Opportunity Pipeline
                </h2>
                {stats.distributions.opportunitiesByStage.length === 0 ? (
                  <p className="text-sm text-[#706e6b] text-center py-6">
                    Keine Opportunities vorhanden
                  </p>
                ) : (
                  <div className="space-y-0.5">
                    {stats.distributions.opportunitiesByStage.map((d) => (
                      <HorizontalBar
                        key={d.stage}
                        label={d.stage}
                        value={d.count}
                        maxValue={oppMax}
                        color={STAGE_COLORS[d.stage] ?? "#706e6b"}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Lead-Status Verteilung */}
              <div className="bg-white rounded-lg border border-[#e5e5e5] p-4 sm:p-6">
                <h2 className="text-base font-semibold text-[#181818] mb-4">
                  Lead-Status Verteilung
                </h2>
                {stats.distributions.leadsByStatus.length === 0 ? (
                  <p className="text-sm text-[#706e6b] text-center py-6">
                    Keine Leads vorhanden
                  </p>
                ) : (
                  <div className="space-y-0.5">
                    {stats.distributions.leadsByStatus.map((d) => (
                      <HorizontalBar
                        key={d.status}
                        label={d.status}
                        value={d.count}
                        maxValue={leadMax}
                        color={LEAD_STATUS_COLORS[d.status] ?? "#706e6b"}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ============================================================= */}
            {/* Third row – Recent activity tables                            */}
            {/* ============================================================= */}
            <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {/* Letzte Buchungen */}
              <div className="bg-white rounded-lg border border-[#e5e5e5] p-4 sm:p-6">
                <h2 className="text-base font-semibold text-[#181818] mb-4">
                  Letzte Buchungen
                </h2>
                {stats.recentActivity.buchungen.length === 0 ? (
                  <p className="text-sm text-[#706e6b] text-center py-6">
                    Keine Buchungen vorhanden
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e5e5e5]">
                          <th className="text-left py-2 pr-3 text-[#706e6b] font-medium">
                            Nr.
                          </th>
                          <th className="text-left py-2 pr-3 text-[#706e6b] font-medium">
                            Gast
                          </th>
                          <th className="text-left py-2 pr-3 text-[#706e6b] font-medium">
                            Phase
                          </th>
                          <th className="text-right py-2 pr-3 text-[#706e6b] font-medium">
                            Preis
                          </th>
                          <th className="text-left py-2 text-[#706e6b] font-medium">
                            Check-In
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentActivity.buchungen.map((b) => (
                          <tr
                            key={b.id}
                            className="border-b border-[#e5e5e5] last:border-b-0"
                          >
                            <td className="py-2 pr-3">
                              <Link
                                to={`/buchungen/${b.id}`}
                                className="text-[#0176d3] hover:underline font-medium"
                              >
                                {b.buchungsNummer ?? "–"}
                              </Link>
                            </td>
                            <td className="py-2 pr-3 text-[#181818]">
                              {b.gastName ?? "–"}
                            </td>
                            <td className="py-2 pr-3">
                              <Badge variant={getStatusVariant(b.buchungsphase)}>
                                {b.buchungsphase}
                              </Badge>
                            </td>
                            <td className="py-2 pr-3 text-right text-[#181818] font-medium">
                              {b.gesamtPreis != null
                                ? formatCurrency(b.gesamtPreis)
                                : "–"}
                            </td>
                            <td className="py-2 text-[#706e6b]">
                              {formatDate(b.checkIn)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Letzte Leads */}
              <div className="bg-white rounded-lg border border-[#e5e5e5] p-4 sm:p-6">
                <h2 className="text-base font-semibold text-[#181818] mb-4">
                  Letzte Leads
                </h2>
                {stats.recentActivity.leads.length === 0 ? (
                  <p className="text-sm text-[#706e6b] text-center py-6">
                    Keine Leads vorhanden
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e5e5e5]">
                          <th className="text-left py-2 pr-3 text-[#706e6b] font-medium">
                            Name
                          </th>
                          <th className="text-left py-2 pr-3 text-[#706e6b] font-medium">
                            Firma
                          </th>
                          <th className="text-left py-2 pr-3 text-[#706e6b] font-medium">
                            Status
                          </th>
                          <th className="text-left py-2 text-[#706e6b] font-medium">
                            Erstellt
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentActivity.leads.map((l) => (
                          <tr
                            key={l.id}
                            className="border-b border-[#e5e5e5] last:border-b-0"
                          >
                            <td className="py-2 pr-3">
                              <Link
                                to={`/leads/${l.id}`}
                                className="text-[#0176d3] hover:underline font-medium"
                              >
                                {[l.firstName, l.lastName]
                                  .filter(Boolean)
                                  .join(" ") || "–"}
                              </Link>
                            </td>
                            <td className="py-2 pr-3 text-[#181818]">
                              {l.company ?? "–"}
                            </td>
                            <td className="py-2 pr-3">
                              <Badge variant={getStatusVariant(l.status)}>
                                {l.status}
                              </Badge>
                            </td>
                            <td className="py-2 text-[#706e6b]">
                              {formatDate(l.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* ============================================================= */}
            {/* Quick Actions                                                 */}
            {/* ============================================================= */}
            <div className="mt-4 sm:mt-6 bg-white rounded-lg border border-[#e5e5e5] p-4 sm:p-6">
              <h2 className="text-base font-semibold text-[#181818] mb-3 sm:mb-4">
                Schnellzugriff
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <QuickAction
                  label="Neuer Account"
                  icon={Building2}
                  to="/accounts/neu"
                />
                <QuickAction
                  label="Neuer Lead"
                  icon={UserPlus}
                  to="/leads/neu"
                />
                <QuickAction
                  label="Neue Buchung"
                  icon={Calendar}
                  to="/buchungen/neu"
                />
                <QuickAction
                  label="Neue Unterkunft"
                  icon={Home}
                  to="/unterkuenfte/neu"
                />
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// QuickAction component (uses Link from react-router-dom)
// ---------------------------------------------------------------------------
function QuickAction({
  label,
  icon: Icon,
  to,
}: {
  label: string;
  icon: React.ElementType;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg border border-[#e5e5e5] hover:bg-[#f3f3f3] hover:border-[#d8d8d8] transition-all group"
    >
      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
        <Icon className="w-4.5 h-4.5 text-blue-600" />
      </div>
      <span className="text-sm font-medium text-[#181818]">{label}</span>
    </Link>
  );
}
