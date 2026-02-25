import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  User,
  LayoutGrid,
  Pencil,
} from "lucide-react";

interface NavItem {
  to: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: "/leads", label: "Leads" },
  { to: "/accounts", label: "Accounts" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/", label: "Home" },
  { to: "/buchungen", label: "Buchungen" },
  { to: "/unterkuenfte", label: "Unterkünfte" },
  { to: "/kontakte", label: "Contacts" },
  { to: "/angebote", label: "Angebote" },
  { to: "/vermieter", label: "Vermieter" },
  { to: "/cases", label: "Cases" },
  { to: "/tasks", label: "Tasks" },
  { to: "/stundenerfassung", label: "Stundenerfassung" },
];

export default function TopNavBar({ onLogout }: { onLogout: () => void }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="shrink-0">
      <div
        className="flex items-center h-[44px] px-4"
        style={{ background: "linear-gradient(to right, #032D60, #0070D2)" }}
      >
        {/* Left: App launcher + brand */}
        <div className="flex items-center gap-3 mr-4">
          <button
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            title="App Launcher"
          >
            <LayoutGrid className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-[14px] tracking-wide">
              Sales
            </span>
          </div>
        </div>

        {/* Center: Nav tabs */}
        <nav className="flex items-center h-full flex-1 overflow-x-auto nav-scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `group relative flex items-center gap-0.5 h-full px-3 text-[13px] font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <ChevronDown className="w-2.5 h-2.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-white rounded-t" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right: Setup + pencil + user */}
        <div className="flex items-center gap-1 ml-4">
          <button
            className="px-2 py-1 text-[12px] text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="Setup"
          >
            Setup
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            title="Edit"
          >
            <Pencil className="w-3.5 h-3.5 text-white/80" />
          </button>

          <div ref={userMenuRef} className="relative ml-1">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <User className="w-4 h-4 text-white" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-[38px] w-56 bg-white rounded shadow-xl border border-[#e5e5e5] py-1 z-50">
                <div className="px-4 py-3 border-b border-[#e5e5e5]">
                  <p className="text-[13px] font-bold text-[#181818] truncate">
                    {user.name || "Benutzer"}
                  </p>
                  <p className="text-[12px] text-[#706e6b] truncate">
                    {user.email || ""}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#181818] hover:bg-[#f3f3f3] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Abmelden
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
