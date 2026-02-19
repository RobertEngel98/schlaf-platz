import type { Metadata } from "next";
import MieterClient from "./MieterClient";
export const metadata: Metadata = { title: "Unterkunft finden | Monteurzimmer fuer Handwerker & Monteure" };
export default function MieterPage() { return <MieterClient />; }
