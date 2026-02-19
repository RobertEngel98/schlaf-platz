import type { Metadata } from "next";
import MieterClient from "./MieterClient";

export const metadata: Metadata = {
  title: "Unterkunft finden | Monteurzimmer für Handwerker & Monteure",
  description:
    "Finden Sie in 90 Sekunden die passende Monteurwohnung. 1.500+ verifizierte Partner, persönlicher Rückruf in 15 Minuten, komplett möblierte Apartments. Kostenlos & unverbindlich.",
};

export default function MieterPage() {
  return <MieterClient />;
}
