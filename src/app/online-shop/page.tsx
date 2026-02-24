import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BRAND } from "@/lib/constants";

const TITLE = "Online Shop";

export const metadata = { title: TITLE, description: "Bettwäsche, Handtücher und Monteurzimmer-Ausstattung direkt von Schlaf-Platz bestellen." };

const PRODUCTS = [
  { name: "Bettwäsche-Set Premium", desc: "Hochwertige Bettwäsche aus 100% Baumwolle. Bettdeckenbezug 135x200 + Kissenbezug 80x80.", price: "ab 29,90 EUR", badge: "Bestseller" },
  { name: "Handtuch-Set (6-teilig)", desc: "2x Duschtücher, 2x Handtücher, 2x Gästetücher. 500g/m2, waschbar bei 60°C.", price: "ab 24,90 EUR", badge: null },
  { name: "Küchen-Startpaket", desc: "Topf-Set, Pfanne, Schneidebrett, Messer-Set, Besteck (4 Personen) und Kochlöffel.", price: "ab 49,90 EUR", badge: "Neu" },
  { name: "WLAN-Router Monteur-Edition", desc: "Plug & Play Router für zuverlässiges Internet. Ideal für Vermieter ohne bestehenden Anschluss.", price: "ab 39,90 EUR", badge: null },
  { name: "Reinigungspaket Komplett", desc: "Staubsauger, Wischmopp, Eimer, Allzweckreiniger, Schwamm-Set. Alles für den Check-in.", price: "ab 34,90 EUR", badge: null },
  { name: "Willkommenspaket Gäste", desc: "Kaffee, Tee, Zucker, Seife, Shampoo, Stadtplan-Vorlage. Der perfekte erste Eindruck.", price: "ab 12,90 EUR", badge: "Beliebt" },
];

export default function Page() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0b1220] pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="wrap max-w-[700px] text-center">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Schlaf-Platz Shop</p>
          <h1 className="font-display text-4xl md:text-6xl text-white uppercase tracking-wide leading-[0.95] mb-4">Alles für Ihr Monteurzimmer.</h1>
          <p className="text-white/40 text-lg leading-relaxed">Bettwäsche, Handtücher, Küchenausstattung und mehr — alles speziell für Vermieter zusammengestellt.</p>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <div className="bg-sp/5 border-b border-sp/10 py-4">
        <div className="wrap text-center">
          <p className="text-sp text-sm font-bold m-0">Der Online Shop wird in Kürze freigeschaltet. Lassen Sie sich per Newsletter benachrichtigen!</p>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="border border-gray-100 rounded-2xl p-6 bg-white hover:shadow-lg hover:shadow-gray-100/80 transition-all group relative">
                {p.badge && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-sp bg-sp/10 px-2.5 py-1 rounded-full">{p.badge}</span>
                )}
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                </div>
                <h3 className="text-ink font-bold text-base mb-1.5">{p.name}</h3>
                <p className="text-gray-400 text-[14px] leading-relaxed mb-4">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sp font-bold text-lg">{p.price}</span>
                  <span className="text-[12px] text-gray-300 uppercase tracking-wider font-bold">Bald verfügbar</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-gray-50/60 border-y border-gray-100">
        <div className="wrap text-center max-w-[560px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-ink uppercase tracking-wide mb-3">Fragen zur Ausstattung?</h2>
          <p className="text-gray-400 text-[15px] leading-relaxed mb-6">Unser Team berät Sie gerne persönlich zur optimalen Ausstattung Ihres Monteurzimmers.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={`mailto:${BRAND.email}?subject=Frage zum Online Shop`} className="cta-primary">Kontakt aufnehmen</a>
            <Link href="/blog/monteurzimmer-ausstattung-checkliste" className="cta-outline">Ausstattungs-Checkliste</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
