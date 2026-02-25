import { type ReactNode } from "react";

/** Shared SLDS input class */
export const sldsInput =
  "w-full px-3 py-[6px] text-[13px] text-[#181818] border border-[#c9c9c9] rounded bg-white focus:ring-2 focus:ring-[#0176d3]/30 focus:border-[#0176d3] placeholder-[#706e6b] transition-colors";

export const sldsInputReadonly =
  "w-full px-3 py-[6px] text-[13px] text-[#181818] border border-transparent rounded bg-[#f3f3f3] cursor-default";

export const sldsSelect =
  "w-full px-3 py-[6px] text-[13px] text-[#181818] border border-[#c9c9c9] rounded bg-white focus:ring-2 focus:ring-[#0176d3]/30 focus:border-[#0176d3] transition-colors appearance-none";

export const sldsTextarea =
  "w-full px-3 py-2 text-[13px] text-[#181818] border border-[#c9c9c9] rounded bg-white focus:ring-2 focus:ring-[#0176d3]/30 focus:border-[#0176d3] placeholder-[#706e6b] transition-colors resize-y";

export const sldsCheckbox = "w-4 h-4 accent-[#0176d3] cursor-pointer";

/** SLDS Primary Button */
export function SldsPrimaryButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1.5 px-4 py-[6px] text-[13px] font-medium text-white bg-[#0176d3] rounded hover:bg-[#014486] disabled:opacity-50 transition-colors"
    >
      {children}
    </button>
  );
}

/** SLDS Outlined Button */
export function SldsOutlineButton({
  onClick,
  children,
  danger,
}: {
  onClick: () => void;
  children: ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-[6px] text-[13px] font-medium rounded border transition-colors ${
        danger
          ? "text-[#ea001e] border-[#ea001e] hover:bg-red-50"
          : "text-[#706e6b] border-[#c9c9c9] hover:bg-[#f3f3f3]"
      }`}
    >
      {children}
    </button>
  );
}
