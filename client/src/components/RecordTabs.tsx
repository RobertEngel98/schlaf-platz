import { useState, type ReactNode } from "react";

export interface RecordTab {
  key: string;
  label: string;
  count?: number;
  content: ReactNode;
}

interface RecordTabsProps {
  tabs: RecordTab[];
  defaultTab?: string;
}

export default function RecordTabs({ tabs, defaultTab }: RecordTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key || "");

  const activeContent = tabs.find((t) => t.key === activeTab)?.content;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Tab bar */}
      <div className="bg-white border-b border-[#e5e5e5] px-3 sm:px-6 overflow-x-auto">
        <div className="flex items-center gap-0 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                relative px-3 sm:px-4 py-3 text-[13px] font-medium transition-colors whitespace-nowrap
                ${
                  activeTab === tab.key
                    ? "text-[#0176d3]"
                    : "text-[#706e6b] hover:text-[#181818]"
                }
              `}
            >
              {tab.label}
              {tab.count != null && (
                <span className="ml-1.5 text-[11px] text-[#706e6b]">
                  ({tab.count})
                </span>
              )}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#0176d3] rounded-t" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto bg-[#f3f3f3] p-3 sm:p-4 lg:p-6">
        {activeContent}
      </div>
    </div>
  );
}
