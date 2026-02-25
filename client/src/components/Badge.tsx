import React from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "purple"
  | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  danger: "bg-red-50 text-red-700 ring-red-600/20",
  info: "bg-sky-50 text-sky-700 ring-sky-600/20",
  purple: "bg-purple-50 text-purple-700 ring-purple-600/20",
  neutral: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// Helper to get variant from status strings
export function getStatusVariant(status: string): BadgeVariant {
  const lower = status.toLowerCase();
  if (
    lower.includes("aktiv") ||
    lower.includes("gewonnen") ||
    lower.includes("konvertiert") ||
    lower.includes("bestätigt") ||
    lower.includes("abgeschlossen") ||
    lower.includes("online")
  )
    return "success";
  if (
    lower.includes("neu") ||
    lower.includes("offen") ||
    lower.includes("entwurf") ||
    lower.includes("in bearbeitung")
  )
    return "info";
  if (
    lower.includes("qualifiz") ||
    lower.includes("kontaktiert") ||
    lower.includes("verhandlung") ||
    lower.includes("angebot")
  )
    return "warning";
  if (
    lower.includes("verloren") ||
    lower.includes("storniert") ||
    lower.includes("abgelehnt") ||
    lower.includes("inaktiv")
  )
    return "danger";
  if (
    lower.includes("bedarfsanalyse") ||
    lower.includes("probewoche")
  )
    return "purple";
  return "neutral";
}
