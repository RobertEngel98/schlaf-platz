import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserPlus,
  TrendingUp,
  Home,
  Calendar,
  FileText,
  Clock,
  BedDouble,
  User,
  LogOut,
  AlertCircle,
  CheckSquare,
} from "lucide-react";

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/accounts", label: "Accounts", icon: Building2 },
  { to: "/kontakte", label: "Kontakte", icon: Users },
  { to: "/leads", label: "Leads", icon: UserPlus },
  { to: "/opportunities", label: "Opportunities", icon: TrendingUp },
  { to: "/unterkuenfte", label: "Unterkünfte", icon: Home },
  { to: "/buchungen", label: "Buchungen", icon: Calendar },
  { to: "/angebote", label: "Angebote", icon: FileText },
  { to: "/cases", label: "Cases", icon: AlertCircle },
  { to: "/tasks", label: "Aufgaben", icon: CheckSquare },
  { to: "/stundenerfassung", label: "Stundenerfassung", icon: Clock },
];

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <aside className="w-[250px] min-h-screen bg-slate-900 text-white flex flex-col shrink-0">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#029fde] rounded-lg flex items-center justify-center">
            <BedDouble className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">Schlaf-Platz</h1>
            <p className="text-[11px] text-slate-400 font-medium tracking-wider uppercase">
              CRM
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-slate-700/70 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <item.icon className="w-[18px] h-[18px] shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-700/50 p-3">
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-slate-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.name || "Benutzer"}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user.email || ""}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Abmelden"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
