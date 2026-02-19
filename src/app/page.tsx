import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Schlaf-Platz | Monteurzimmer in ganz Deutschland finden & vermieten",
  description:
    "Die kostenlose Plattform für Monteurzimmer. 1.500+ verifizierte Partner, komplett möblierte Apartments, persönliche Betreuung. Jetzt Unterkunft finden oder kostenlos inserieren.",
};

export default function HomePage() {
  return <HomeClient />;
}
