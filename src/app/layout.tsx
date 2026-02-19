import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Schlaf-Platz | Monteurzimmer in ganz Deutschland",
    template: "%s | Schlaf-Platz",
  },
  description:
    "Die kostenlose Plattform für Monteurzimmer & Monteurwohnungen. 1.500+ verifizierte Partner. Komplett möblierte Apartments. Jetzt Unterkunft finden oder kostenlos inserieren.",
  keywords: [
    "Monteurzimmer",
    "Monteurwohnung",
    "Monteurunterkunft",
    "Handwerker Unterkunft",
    "Schlaf-Platz",
    "möblierte Wohnung",
    "Arbeiterwohnungen",
  ],
  openGraph: {
    title: "Schlaf-Platz | Monteurzimmer in ganz Deutschland",
    description:
      "Die kostenlose Plattform für Monteurzimmer. 1.500+ Partner, komplett möblierte Apartments, persönliche Betreuung.",
    url: "https://schlaf-platz.com",
    siteName: "Schlaf-Platz",
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
