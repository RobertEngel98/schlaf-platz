import type { Metadata } from "next";
import HomeClient from "./HomeClient";
export const metadata: Metadata = { title: "Schlaf-Platz | Monteurzimmer in ganz Deutschland finden & vermieten" };
export default function HomePage() { return <HomeClient />; }
