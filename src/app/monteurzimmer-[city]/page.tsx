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
  return c ? { title: `Monteurzimmer ${c.name}` } : {};
}

export default function CityPage({ params }: P) {
  const c = getCityBySlug(params.city);
  if (!c) notFound();
  return <CityClient city={c} />;
}
