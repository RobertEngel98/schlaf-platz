import { notFound } from "next/navigation";
import { getCityBySlug, getAllCitySlugs } from "@/lib/constants";
import CityClient from "./CityClient";
import type { Metadata } from "next";

interface P { params: { city: string } }

export async function generateStaticParams() {
  return getAllCitySlugs().map(s => ({ city: s }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const c = getCityBySlug(params.city);
  if (!c) return {};
  return {
    title: `Monteurzimmer ${c.name} - Moeblierte Apartments ab 15€/Nacht`,
    description: `Monteurzimmer in ${c.name} finden. ${c.heroDesc} Komplett moeblierte Apartments fuer Monteure & Handwerker. Kostenlose Vermittlung.`,
  };
}

export default function CityPage({ params }: P) {
  const c = getCityBySlug(params.city);
  if (!c) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: `Monteurzimmer in ${c.name} - Schlaf-Platz`,
    description: c.heroDesc,
    url: `https://monteurzimmerapartments.de/monteurzimmer-${c.slug}`,
    telephone: "+49-160-95460613",
    address: { "@type": "PostalAddress", addressLocality: c.name, addressRegion: c.bundesland, addressCountry: "DE" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "266", bestRating: "5" },
    priceRange: "ab 15€/Nacht",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `Wie finde ich ein Monteurzimmer in ${c.name}?`, acceptedAnswer: { "@type": "Answer", text: `Senden Sie eine kostenlose Anfrage ueber monteurzimmerapartments.de. Sie erhalten innerhalb von 15 Minuten einen persoenlichen Rueckruf mit passenden Apartments in ${c.name}.` } },
      { "@type": "Question", name: `Was kostet ein Monteurzimmer in ${c.name}?`, acceptedAnswer: { "@type": "Answer", text: `Die Preise variieren je nach Lage und Ausstattung. Komplett moeblierte Apartments in ${c.name} sind ab ca. 15€ pro Nacht verfuegbar. Die Vermittlung durch Schlaf-Platz ist komplett kostenlos.` } },
      { "@type": "Question", name: `Welche Stadtteile in ${c.name} sind fuer Monteure empfehlenswert?`, acceptedAnswer: { "@type": "Answer", text: `Beliebte Standorte fuer Monteurzimmer in ${c.name} sind: ${c.stadtteile.map(s => s.name).join(", ")}. Alle Stadtteile bieten gute Anbindung an Industrie- und Gewerbegebiete.` } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CityClient city={c} />
    </>
  );
}
