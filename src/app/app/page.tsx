import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { title: "App fuer Mieter und Vermieter" };

export default function Page() {
  return (
    <div className="bg-[#0a0a0a]">
      <Navbar />
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20"><div className="wrap max-w-[600px]"><h1 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-white">Die App fuer Mieter und Vermieter</h1></div></section>
      <section className="py-14 md:py-20 border-t border-white/[0.06]">
        <div className="wrap max-w-[700px] text-center">
          <p className="text-white/40 text-lg mb-6">Unsere App befindet sich in der Entwicklung und wird bald verfuegbar sein.</p>
          <p className="text-white/30 text-sm mb-8">Verwalten Sie Buchungen, kommunizieren Sie direkt mit Partnern und finden Sie Unterkuenfte — alles in einer App.</p>
          <Link href="/mieter" className="cta-primary">In der Zwischenzeit: Jetzt Anfrage senden</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
