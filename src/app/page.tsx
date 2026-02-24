import HomeClient from "./HomeClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Schlaf-Platz",
  url: "https://monteurzimmerapartments.de",
  description: "Die kostenlose Plattform für Monteurzimmer in Deutschland. 1.500+ verifizierte Partner.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://monteurzimmerapartments.de/mieter?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeClient />
    </>
  );
}
