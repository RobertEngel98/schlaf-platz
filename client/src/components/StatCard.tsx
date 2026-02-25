import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: "blue" | "green" | "orange" | "purple" | "red" | "cyan";
  subtitle?: string;
}

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    ring: "ring-blue-100",
  },
  green: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    ring: "ring-emerald-100",
  },
  orange: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    ring: "ring-amber-100",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    ring: "ring-purple-100",
  },
  red: {
    bg: "bg-red-50",
    icon: "text-red-600",
    ring: "ring-red-100",
  },
  cyan: {
    bg: "bg-cyan-50",
    icon: "text-cyan-600",
    ring: "ring-cyan-100",
  },
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  color,
  subtitle,
}: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
          )}
        </div>
        <div
          className={`${colors.bg} ${colors.ring} ring-1 p-3 rounded-xl`}
        >
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
}
