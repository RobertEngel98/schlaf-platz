import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { default: "Schlaf-Platz | Monteurzimmer in ganz Deutschland", template: "%s | Schlaf-Platz" },
  description: "Die kostenlose Plattform fuer Monteurzimmer. 1.500+ verifizierte Partner, 50+ Staedte, 5.0 Google-Bewertung.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
