interface PathStage {
  key: string;
  label: string;
}

interface RecordPathProps {
  stages: PathStage[];
  currentStage: string;
  onStageClick?: (stageKey: string) => void;
  /** If true, completed stages before current are marked green */
  linear?: boolean;
}

export default function RecordPath({
  stages,
  currentStage,
  onStageClick,
  linear = true,
}: RecordPathProps) {
  const currentIndex = stages.findIndex((s) => s.key === currentStage);

  return (
    <div className="bg-white border-b border-[#e5e5e5] px-6 py-3">
      <div className="flex items-center">
        {stages.map((stage, i) => {
          const isCurrent = stage.key === currentStage;
          const isCompleted = linear && currentIndex > i;
          const isLost = stage.key === "Verloren" && currentStage === "Verloren";
          const isStorniert = stage.key === "Storniert" && currentStage === "Storniert";

          let bg = "bg-[#e5e5e5]";
          let text = "text-[#706e6b]";
          let border = "";

          if (isCurrent && !isLost && !isStorniert) {
            bg = "bg-[#0176d3]";
            text = "text-white";
          } else if (isCompleted) {
            bg = "bg-[#2e844a]";
            text = "text-white";
          } else if (isLost || isStorniert) {
            bg = "bg-[#ea001e]";
            text = "text-white";
          }

          if (isCurrent) {
            border = "ring-2 ring-[#0176d3]/30";
          }

          return (
            <div key={stage.key} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => onStageClick?.(stage.key)}
                disabled={!onStageClick}
                className={`
                  relative flex items-center justify-center px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider
                  ${bg} ${text} ${border}
                  ${i === 0 ? "rounded-l-full" : ""}
                  ${i === stages.length - 1 ? "rounded-r-full" : ""}
                  ${onStageClick ? "cursor-pointer hover:opacity-90" : "cursor-default"}
                  transition-all w-full
                `}
                title={stage.label}
              >
                <span className="truncate">{stage.label}</span>
              </button>
              {i < stages.length - 1 && (
                <div
                  className={`w-0 h-0 shrink-0
                    border-t-[14px] border-t-transparent
                    border-b-[14px] border-b-transparent
                    border-l-[8px]
                    ${isCompleted ? "border-l-[#2e844a]" : isCurrent ? "border-l-[#0176d3]" : "border-l-[#e5e5e5]"}
                  `}
                  style={{ marginLeft: "-1px" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
