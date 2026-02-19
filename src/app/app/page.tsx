import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = { title: "Schlaf-Platz App | Fuer Mieter & Vermieter" };
export default function AppPage() {
  return (<div><Navbar />
    <section className="hero-bg pt-[120px] pb-20"><div className="wrap text-center max-w-[600px] mx-auto">
      <p className="text-sp-gold text-sm font-display font-semibold uppercase tracking-widest mb-4">Schlaf-Platz App</p>
      <h1 className="font-display font-extrabold text-white text-3xl md:text-4xl mb-6">Die App fuer Mieter &amp; Vermieter</h1>
      <p className="text-white/65 text-lg mb-8">Verwalten Sie Ihre Unterkuenfte, Buchungen und das Transparenzregister - alles in einer App.</p>
      <div className="flex gap-4 justify-center flex-wrap">
        <a href="https://app.schlaf-platz.com" className="btn-gold">Zur App</a>
        <a href="https://www.monteurzimmerapartments.de/partner/" className="btn-outline-white">Jetzt inserieren</a>
      </div>
    </div></section>
  <Footer /></div>);
}
