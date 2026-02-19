import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Impressum" };

export default function Page() {
  return (
    <div className="bg-[#0a0a0a]">
      <Navbar />
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20"><div className="wrap max-w-[600px]"><h1 className="font-display text-3xl md:text-4xl text-white">Impressum</h1></div></section>
      <section className="py-14 md:py-20 border-t border-white/[0.06]">
        <div className="wrap max-w-[700px] text-white/50 text-base leading-relaxed space-y-4">
          <p>Schlaf-Platz e.G. — Inhaber: Viktor Brehm</p>
          <p>E-Mail: <a href="mailto:info@schlaf-platz.com" className="text-sp no-underline hover:underline">info@schlaf-platz.com</a></p>
          <p>Telefon: <a href="tel:+4916095460613" className="text-sp no-underline hover:underline">+49 160 95460613</a></p>
          <p>Mitglied im GvdL e.V.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
