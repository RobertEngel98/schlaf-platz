import { useEffect, useState } from "react";
import {
  Building2,
  UserPlus,
  TrendingUp,
  Calendar,
  Home,
  Activity,
} from "lucide-react";
import StatCard from "../components/StatCard";
import { dashboardApi, type DashboardStats } from "../lib/api";

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

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Übersicht über alle CRM-Aktivitäten
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          Fehler beim Laden: {error}
        </div>
      )}

      {/* Stat Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
              <div className="h-8 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              label="Gesamte Accounts"
              value={stats.totalAccounts}
              icon={Building2}
              color="blue"
            />
            <StatCard
              label="Aktive Leads"
              value={stats.activeLeads}
              icon={UserPlus}
              color="green"
            />
            <StatCard
              label="Offene Opportunities"
              value={stats.openOpportunities}
              icon={TrendingUp}
              color="orange"
              subtitle={`Gesamt: ${formatCurrency(stats.opportunitiesAmount)}`}
            />
            <StatCard
              label="Aktive Buchungen"
              value={stats.activeBuchungen}
              icon={Calendar}
              color="purple"
            />
            <StatCard
              label="Unterkünfte"
              value={stats.totalUnterkuenfte}
              icon={Home}
              color="cyan"
            />
            <StatCard
              label="Pipeline-Wert"
              value={formatCurrency(stats.opportunitiesAmount)}
              icon={Activity}
              color="red"
              subtitle="Alle offenen Opportunities"
            />
          </div>
        )
      )}

      {/* Quick Info Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Letzte Aktivitäten
          </h2>
          <div className="text-sm text-gray-400 text-center py-8">
            Aktivitäten werden hier angezeigt
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Schnellzugriff
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickAction
              label="Neuer Account"
              icon={Building2}
              href="/accounts"
            />
            <QuickAction
              label="Neuer Lead"
              icon={UserPlus}
              href="/leads"
            />
            <QuickAction
              label="Neue Buchung"
              icon={Calendar}
              href="/buchungen"
            />
            <QuickAction
              label="Neue Unterkunft"
              icon={Home}
              href="/unterkuenfte"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  label,
  icon: Icon,
  href,
}: {
  label: string;
  icon: React.ElementType;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all group"
    >
      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
        <Icon className="w-4.5 h-4.5 text-blue-600" />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </a>
  );
}
