import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface RelatedListColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface RelatedListProps<T> {
  title: string;
  count?: number;
  icon?: ReactNode;
  iconColor?: string;
  data: T[];
  columns: RelatedListColumn<T>[];
  /** Path to view all records (e.g. "/buchungen?accountId=xxx") */
  viewAllPath?: string;
  /** Path to create new record (e.g. "/buchungen/neu?accountId=xxx") */
  newPath?: string;
  /** Limit number of rows shown (default 5) */
  limit?: number;
  getRowId: (row: T) => string;
  getRowLink?: (row: T) => string;
}

export default function RelatedList<T>({
  title,
  count,
  icon,
  iconColor = "#0176d3",
  data,
  columns,
  viewAllPath,
  newPath,
  limit = 5,
  getRowId,
  getRowLink,
}: RelatedListProps<T>) {
  const displayed = data.slice(0, limit);

  return (
    <div className="bg-white rounded-lg border border-[#e5e5e5] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-5 py-3 border-b border-[#e5e5e5]">
        <div className="flex items-center gap-2">
          {icon && (
            <div
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ backgroundColor: `${iconColor}15` }}
            >
              <span style={{ color: iconColor }}>{icon}</span>
            </div>
          )}
          <h3 className="text-[13px] font-bold text-[#181818]">
            {title}
            {count != null && (
              <span className="ml-1 text-[#706e6b] font-normal">({count})</span>
            )}
          </h3>
        </div>
        {newPath && (
          <Link
            to={newPath}
            className="text-[12px] font-medium text-[#0176d3] hover:underline"
          >
            Neu
          </Link>
        )}
      </div>

      {/* Table */}
      {displayed.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#fafaf9]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-3 sm:px-4 py-2 text-left text-[11px] font-bold text-[#706e6b] uppercase tracking-wider ${col.className || ""}`}
                  >
                    {col.header}
                  </th>
                ))}
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {displayed.map((row) => {
                const rowLink = getRowLink?.(row);
                return (
                  <tr
                    key={getRowId(row)}
                    className="border-t border-[#e5e5e5] hover:bg-[#f3f3f3] transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className={`px-3 sm:px-4 py-2.5 text-[#181818] ${col.className || ""}`}>
                        {col.render(row)}
                      </td>
                    ))}
                    <td className="px-2 py-2.5">
                      {rowLink && (
                        <Link to={rowLink} className="text-[#706e6b] hover:text-[#0176d3]">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-3 sm:px-5 py-8 text-center text-[13px] text-[#706e6b]">
          Keine Einträge vorhanden
        </div>
      )}

      {/* View All */}
      {viewAllPath && data.length > limit && (
        <div className="border-t border-[#e5e5e5] px-3 sm:px-5 py-2.5 text-center">
          <Link
            to={viewAllPath}
            className="text-[12px] font-medium text-[#0176d3] hover:underline"
          >
            Alle anzeigen ({data.length})
          </Link>
        </div>
      )}
    </div>
  );
}
