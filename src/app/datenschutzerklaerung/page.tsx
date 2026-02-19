import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tag } from "@/components/ui";

export const metadata: Metadata = { title: "Datenschutz" };

export default function Page() {
  return (
    <div>
      <Navbar />
      <section className="relative bg-ink pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-sp/8 blur-[100px]" />
        <div className="wrap relative z-10 max-w-[600px]">
          <h1 className="font-display text-3xl md:text-4xl text-white leading-tight">Datenschutzerklaerung</h1>
        </div>
      </section>
      <section className="bg-white py-14 md:py-20">
        <div className="wrap max-w-[700px]">
          <p className="text-ink-light text-base leading-relaxed">Wir nehmen den Schutz Ihrer persoenlichen Daten sehr ernst. Diese Datenschutzerklaerung informiert Sie ueber die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten.</p>
          <div className="mt-10 pt-6 border-t border-surface-dim">
            <p className="text-ink-muted text-sm">Kontakt: <a href="mailto:info@schlaf-platz.com" className="text-sp hover:underline no-underline">info@schlaf-platz.com</a> | <a href="tel:+4916095460613" className="text-sp hover:underline no-underline">+49 160 95460613</a></p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
