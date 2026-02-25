import { type ReactNode } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export interface HighlightField {
  label: string;
  value: ReactNode;
}

interface RecordHighlightsProps {
  /** Back-link path */
  backPath: string;
  /** Entity icon */
  icon: ReactNode;
  /** Icon background color */
  iconColor: string;
  /** Small label above the title (e.g. "Buchung") */
  entityLabel: string;
  /** Record title (e.g. name or number) */
  title: string;
  /** Up to 6 key fields displayed horizontally */
  highlightFields: HighlightField[];
  /** Action buttons (Save, Delete, etc.) */
  actions?: ReactNode;
}

export default function RecordHighlights({
  backPath,
  icon,
  iconColor,
  entityLabel,
  title,
  highlightFields,
  actions,
}: RecordHighlightsProps) {
  return (
    <div className="bg-white border-b border-[#e5e5e5]">
      <div className="px-6 py-4">
        {/* Top row: back + entity label + actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Link
              to={backPath}
              className="p-1.5 rounded hover:bg-[#f3f3f3] text-[#706e6b] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-[12px] text-[#706e6b] font-normal">
              {entityLabel}
            </span>
          </div>
          {actions && (
            <div className="flex items-center gap-2">{actions}</div>
          )}
        </div>

        {/* Title row: icon + name */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: iconColor }}
          >
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-[18px] font-bold text-[#181818] leading-tight">
              {title}
            </h1>
            <ChevronDown className="w-4 h-4 text-[#706e6b]" />
          </div>
        </div>

        {/* Highlight fields row */}
        {highlightFields.length > 0 && (
          <div className="flex items-start gap-6 flex-wrap">
            {highlightFields.map((field, i) => (
              <div key={i} className="min-w-[120px]">
                <dt className="text-[11px] font-normal text-[#706e6b] uppercase tracking-wider mb-0.5">
                  {field.label}
                </dt>
                <dd className="text-[13px] text-[#181818]">
                  {field.value}
                </dd>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
