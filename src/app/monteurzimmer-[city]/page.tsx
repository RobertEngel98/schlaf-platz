import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug, getAllCitySlugs } from "@/lib/constants";
import CityClient from "./CityClient";

interface Props {
  params: { city: string };
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ city: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  if (!city) return {};

  return {
    title: `Monteurzimmer ${city.name} | Günstige Unterkünfte für Handwerker`,
    description: `Monteurzimmer in ${city.name} — schnelle & unkomplizierte Unterkunft für Monteure, Handwerker und Arbeitsteams. 1.500+ Partner. Komplett möbliert. Kostenlos anfragen.`,
    openGraph: {
      title: `Monteurzimmer ${city.name} | Schlaf-Platz`,
      description: `Finden Sie die passende Monteurwohnung in ${city.name} und Umgebung. Komplett möbliert, persönliche Betreuung, kostenlos für Vermieter.`,
    },
  };
}

export default function CityPage({ params }: Props) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();

  return <CityClient city={city} />;
}
