import type { Metadata } from "next";
import VermieterClient from "./VermieterClient";

export const metadata: Metadata = {
  title: "Kostenlos inserieren — Monteurzimmer vermieten auf Schlaf-Platz",
  description: "Vermieten Sie Ihre Wohnung kostenlos auf Schlaf-Platz. Erreichen Sie tausende Handwerksfirmen in ganz Deutschland. Keine Gebühren, Transparenzregister inklusive.",
  openGraph: {
    title: "Kostenlos inserieren — Monteurzimmer vermieten auf Schlaf-Platz",
    description: "Vermieten Sie Ihre Wohnung kostenlos auf Schlaf-Platz. Keine Gebühren, persönliche Betreuung.",
  },
  alternates: { canonical: "/app" },
};

export default function AppPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Kostenlos inserieren — Monteurzimmer vermieten",
    description: "Vermieten Sie Ihre Wohnung kostenlos auf Schlaf-Platz.",
    url: "https://monteurzimmerapartments.de/app",
    publisher: { "@type": "Organization", name: "Schlaf-Platz e.G." },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VermieterClient />
    </>
  );
}
