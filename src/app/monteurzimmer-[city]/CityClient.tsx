"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Arr, Faq, FadeIn } from "@/components/ui";
import { CityData } from "@/lib/constants";

export default function CityClient({ city }: { city: CityData }) {
  return (
    <div className="bg-white">
      <Navbar />

      <section className="pt-32 pb-10 md:pt-40 md:pb-12">
        <div className="wrap max-w-[700px]">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-4">{city.emoji} {city.bundesland}</p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-[0.95] uppercase tracking-wide mb-4">Monteurzimmer in <span className="text-sp">{city.name}</span></h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">{city.heroDesc} Komplett moeblierte Apartments fuer Ihre Monteure — persoenlicher Rueckruf in 15 Minuten.</p>
          <Link href="/mieter" className="cta-primary">Kostenlos Unterkunft anfragen <Arr s={18} /></Link>
        </div>
      </section>

      <div className="border-y border-gray-100 py-5 bg-gray-50/50">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ v: city.einwohner, l: "Einwohner" },{ v: city.flaeche, l: "Flaeche" },{ v: city.autobahnen, l: "Autobahnen" },{ v: city.bahnhof, l: "Hauptbahnhof" }].map(s => (
            <div key={s.l}>
              <p className="text-base md:text-lg font-bold text-ink m-0">{s.v}</p>
              <p className="text-[10px] text-gray-300 uppercase tracking-[0.15em] font-bold mt-1 m-0">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="py-12 md:py-16 border-b border-gray-100">
        <div className="wrap">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Industrie &amp; Wirtschaft</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[0.95] uppercase tracking-wide mb-10">Arbeitgeber in <span className="text-sp">{city.name}</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {city.industrie.map((ind, i) => (
              <FadeIn key={i} delay={i * 50}>
                <div className="border border-gray-100 rounded-2xl p-5 bg-white hover:shadow-md hover:shadow-gray-100/80 transition-all">
                  <h3 className="text-ink font-bold mb-1.5">{ind.name}</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed m-0">{ind.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-b border-gray-100">
        <div className="wrap">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Stadtteile</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[0.95] uppercase tracking-wide mb-10">Beliebte Standorte in <span className="text-sp">{city.name}</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {city.stadtteile.map((st, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div className="border border-gray-100 rounded-2xl p-5 bg-white hover:shadow-md hover:shadow-gray-100/80 transition-all">
                  <h3 className="text-ink font-bold mb-1.5">{st.name}</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed m-0">{st.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {city.sights && city.sights.length > 0 && (
        <section className="py-12 md:py-16 border-b border-gray-100">
          <div className="wrap">
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Sehenswuerdigkeiten</p>
            <h2 className="font-display text-4xl text-ink uppercase tracking-wide mb-8">{city.name} entdecken</h2>
            <div className="flex flex-wrap gap-2">
              {city.sights.map(s => (
                <span key={s} className="text-[13px] text-gray-400 border border-gray-100 rounded-full px-4 py-2 bg-gray-50/50 hover:border-sp/30 hover:text-sp transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-14 md:py-20 bg-gray-50/50 border-t border-gray-100">
        <div className="wrap text-center max-w-[550px] mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[0.95] uppercase tracking-wide mb-4">Monteurzimmer in {city.name} <span className="text-sp">gesucht?</span></h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-7">Persoenlicher Rueckruf in 15 Minuten. Komplett kostenlos.</p>
          <Link href="/mieter" className="cta-primary text-base !px-8 !py-4">Jetzt Unterkunft anfragen <Arr s={18}/></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
