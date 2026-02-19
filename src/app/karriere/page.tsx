import type { Metadata } from "next";
import KarriereClient from "./KarriereClient";

export const metadata: Metadata = {
  title: "Karriere bei Schlaf-Platz | Werde Teil unseres Teams",
  description:
    "Starte deine Karriere bei Schlaf-Platz e.G. — Deutschlands kostenlose Plattform für Monteurzimmer. Offene Stellen in Vertrieb, Innendienst, Marketing und Agenturpartnerschaft.",
};

export default function KarrierePage() {
  return <KarriereClient />;
}
