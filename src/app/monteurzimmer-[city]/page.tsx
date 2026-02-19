import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug, getAllCitySlugs } from "@/lib/constants";
import CityClient from "./CityClient";
interface Props { params: { city: string } }
export async function generateStaticParams() { return getAllCitySlugs().map(slug => ({ city: slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCityBySlug(params.city);
  if (!c) return {};
  return { title: `Monteurzimmer ${c.name} | Guenstige Unterkuenfte` };
}
export default function CityPage({ params }: Props) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();
  return <CityClient city={city} />;
}
