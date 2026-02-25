import type { ReactNode } from "react";

export interface QuickAction {
  key: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

export interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="bg-white border-b border-[#e5e5e5] px-3 sm:px-6 py-2 flex items-center gap-1 overflow-x-auto">
      {actions.map((action) => (
        <button
          key={action.key}
          onClick={action.onClick}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded hover:bg-[#f3f3f3] transition-colors cursor-pointer shrink-0 min-w-[48px]"
        >
          <span className="w-5 h-5 text-[#0176d3]">{action.icon}</span>
          <span className="text-[10px] text-[#706e6b] font-medium">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}
