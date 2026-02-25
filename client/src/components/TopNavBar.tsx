import { useState, useRef, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  User,
  LayoutGrid,
  Pencil,
  Search,
  Building2,
  Users,
  UserPlus,
  TrendingUp,
  Calendar,
  Home,
  FileText,
  AlertCircle,
  CheckSquare,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  to: string;
  label: string;
}

interface SearchResult {
  type: string;
  id: string;
  title: string;
  subtitle: string;
  url: string;
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
  { to: "/cases", label: "Cases" },
  { to: "/tasks", label: "Tasks" },
  { to: "/stundenerfassung", label: "Stunden" },
];

const entityConfig: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  account: { label: "Account", icon: Building2 },
  contact: { label: "Kontakt", icon: Users },
  lead: { label: "Lead", icon: UserPlus },
  opportunity: { label: "Opportunity", icon: TrendingUp },
  buchung: { label: "Buchung", icon: Calendar },
  unterkunft: { label: "Unterkunft", icon: Home },
  angebot: { label: "Angebot", icon: FileText },
  case: { label: "Case", icon: AlertCircle },
  task: { label: "Aufgabe", icon: CheckSquare },
};

export default function TopNavBar({ onLogout }: { onLogout: () => void }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search API call
  const performSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setSearchOpen(false);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    setSearchOpen(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.results || []);
      } else {
        setSearchResults([]);
      }
    } catch {
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSearchOpen(false);
    }
  };

  const handleResultClick = (url: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    navigate(url);
  };

  // Group results by entity type
  const groupedResults = searchResults.reduce<Record<string, SearchResult[]>>((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {});

  return (
    <header className="shrink-0">
      <div
        className="flex items-center h-[44px] px-3 sm:px-4"
        style={{ background: "linear-gradient(to right, #032D60, #0070D2)" }}
      >
        {/* Left: Hamburger (mobile) + App launcher + brand */}
        <div className="flex items-center gap-2 sm:gap-3 mr-2 sm:mr-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>

          <button
            className="hidden sm:flex w-7 h-7 items-center justify-center rounded hover:bg-white/10 transition-colors"
            title="App Launcher"
          >
            <LayoutGrid className="w-5 h-5 text-white" />
          </button>
          <span className="text-white font-bold text-[14px] tracking-wide">
            Sales
          </span>
        </div>

        {/* Center: Nav tabs (hidden on mobile) */}
        <nav className="hidden md:flex items-center h-full flex-1 overflow-x-auto nav-scrollbar-hide">
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

        {/* Spacer on mobile */}
        <div className="flex-1 md:hidden" />

        {/* Right: Search + user */}
        <div className="flex items-center gap-1 ml-2 sm:ml-4">
          {/* Global Search */}
          <div ref={searchRef} className="relative mr-1 sm:mr-2">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 w-3.5 h-3.5 text-white/60 pointer-events-none z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                  setSearchFocused(true);
                  if (searchQuery.length >= 2) setSearchOpen(true);
                }}
                onBlur={() => setSearchFocused(false)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Suchen…"
                className="pl-8 pr-3 py-1.5 rounded-md bg-white/15 text-white text-[13px] placeholder-white/50 outline-none border border-white/20 focus:bg-white/25 focus:border-white/40 transition-all duration-200 w-[120px] sm:w-[160px] focus:w-[200px] sm:focus:w-[280px] md:focus:w-[320px]"
              />
            </div>

            {/* Search Dropdown */}
            {searchOpen && (
              <div className="absolute top-[38px] right-0 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] bg-white rounded-lg shadow-xl border border-[#e5e5e5] z-50 max-h-[400px] overflow-y-auto">
                {searchLoading ? (
                  <div className="flex items-center gap-2 px-4 py-3 text-[13px] text-[#706e6b]">
                    <div className="w-4 h-4 border-2 border-[#0070D2] border-t-transparent rounded-full animate-spin" />
                    Suche…
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="px-4 py-3 text-[13px] text-[#706e6b]">
                    Keine Ergebnisse
                  </div>
                ) : (
                  Object.entries(groupedResults).map(([type, results]) => {
                    const config = entityConfig[type];
                    const TypeIcon = config?.icon || Search;
                    const typeLabel = config?.label || type;

                    return (
                      <div key={type}>
                        <div className="px-4 py-1.5 text-[11px] font-semibold text-[#706e6b] uppercase tracking-wider bg-[#f7f7f7] border-b border-[#e5e5e5]">
                          {typeLabel}
                        </div>
                        {results.map((result) => (
                          <button
                            key={`${result.type}-${result.id}`}
                            onClick={() => handleResultClick(result.url)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#f3f3f3] transition-colors text-left min-h-[44px]"
                          >
                            <TypeIcon className="w-4 h-4 text-[#706e6b] shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-[13px] font-medium text-[#181818] truncate">
                                {result.title}
                              </p>
                              {result.subtitle && (
                                <p className="text-[12px] text-[#706e6b] truncate">
                                  {result.subtitle}
                                </p>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <button
            className="hidden sm:block px-2 py-1 text-[12px] text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="Setup"
          >
            Setup
          </button>
          <button
            className="hidden sm:flex w-7 h-7 items-center justify-center rounded hover:bg-white/10 transition-colors"
            title="Edit"
          >
            <Pencil className="w-3.5 h-3.5 text-white/80" />
          </button>

          <div ref={userMenuRef} className="relative ml-1">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-8 h-8 sm:w-7 sm:h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
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
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#181818] hover:bg-[#f3f3f3] transition-colors min-h-[44px]"
                >
                  <LogOut className="w-4 h-4" />
                  Abmelden
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav
            className="absolute top-[44px] left-0 right-0 bg-[#032D60] shadow-xl max-h-[calc(100vh-44px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-6 py-3.5 text-[14px] font-medium border-b border-white/10 min-h-[48px] flex items-center ${
                    isActive
                      ? "text-white bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
