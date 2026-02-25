import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface DetailSectionProps {
  title: string;
  icon?: ReactNode;
  /** Accent left border color (e.g. red for loss sections) */
  accentColor?: string;
  /** Whether section is collapsible */
  collapsible?: boolean;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  children: ReactNode;
  /** Number of grid columns (default 2) */
  columns?: 2 | 3 | 4;
}

export default function DetailSection({
  title,
  icon,
  accentColor,
  collapsible = true,
  defaultCollapsed = false,
  children,
  columns = 2,
}: DetailSectionProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const gridClass =
    columns === 4
      ? "grid-cols-4"
      : columns === 3
      ? "grid-cols-3"
      : "grid-cols-2";

  return (
    <div
      className={`bg-white rounded-lg border border-[#e5e5e5] overflow-hidden ${
        accentColor ? "border-l-4" : ""
      }`}
      style={accentColor ? { borderLeftColor: accentColor } : undefined}
    >
      {/* Section header */}
      <button
        onClick={() => collapsible && setCollapsed(!collapsed)}
        className={`w-full flex items-center gap-2 px-5 py-3 text-left ${
          collapsible ? "cursor-pointer hover:bg-[#fafaf9]" : "cursor-default"
        } transition-colors`}
      >
        {collapsible && (
          collapsed ? (
            <ChevronRight className="w-4 h-4 text-[#706e6b] shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#706e6b] shrink-0" />
          )
        )}
        {icon && <span className="text-[#0176d3]">{icon}</span>}
        <h3 className="text-[13px] font-bold text-[#181818] uppercase tracking-wider">
          {title}
        </h3>
      </button>

      {/* Section content */}
      {!collapsed && (
        <div className={`px-5 pb-5 grid ${gridClass} gap-x-6 gap-y-4`}>
          {children}
        </div>
      )}
    </div>
  );
}

/** A single field in a detail section — label + input/value */
interface DetailFieldProps {
  label: string;
  required?: boolean;
  /** Span 2 columns */
  fullWidth?: boolean;
  children: ReactNode;
}

export function DetailField({
  label,
  required,
  fullWidth,
  children,
}: DetailFieldProps) {
  return (
    <div className={fullWidth ? "col-span-full" : ""}>
      <label className="block text-[11px] font-bold text-[#706e6b] uppercase tracking-wider mb-1">
        {label}
        {required && <span className="text-[#ea001e] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
