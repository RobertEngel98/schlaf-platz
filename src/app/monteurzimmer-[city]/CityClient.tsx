"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Arr, Faq, FadeIn } from "@/components/ui";
import { CityData, BRAND } from "@/lib/constants";

export default function CityClient({ city }: { city: CityData }) {
  return (
    <div className="bg-[#0a0a0a]">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-sp/[0.06] blur-[120px]" />
        <div className="wrap relative z-10 max-w-[700px]">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-5">{city.emoji} {city.bundesland}</p>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-[0.95] uppercase tracking-wide mb-5">Monteurzimmer in<br /><span className="text-sp">{city.name}</span></h1>
          <p className="text-white/35 text-lg leading-relaxed mb-8">{city.tagline} — Komplett moeblierte Apartments fuer Ihre Monteure in {city.name}. Persoenlicher Rueckruf in 15 Minuten.</p>
          <Link href="/mieter" className="cta-primary">Kostenlos Unterkunft anfragen <Arr s={18} /></Link>
        </div>
      </section>

      <div className="border-y border-white/[0.06] py-6">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ v: city.einwohner, l: "Einwohner" },{ v: city.flaeche, l: "Flaeche" },{ v: city.autobahnen, l: "Autobahnen" },{ v: city.bahnhof, l: "Hauptbahnhof" }].map(s => (
            <div key={s.l}>
              <p className="text-lg md:text-xl font-bold text-white m-0">{s.v}</p>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.15em] font-bold mt-1 m-0">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="wrap">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-4">Industrie &amp; Wirtschaft</p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-[0.95] uppercase tracking-wide mb-14">Arbeitgeber in<br /><span className="text-sp">{city.name}</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {city.industrie.map((ind, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="border border-white/[0.06] rounded-2xl p-6 bg-white/[0.02] hover:border-sp/20 transition-colors">
                  <h3 className="text-white font-bold mb-2">{ind.name}</h3>
                  <p className="text-white/35 text-[14px] leading-relaxed m-0">{ind.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="wrap">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-4">Stadtteile</p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-[0.95] uppercase tracking-wide mb-14">Beliebte Standorte in<br /><span className="text-sp">{city.name}</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {city.stadtteile.map((st, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div className="border border-white/[0.06] rounded-2xl p-6 bg-white/[0.02] hover:border-sp/20 transition-colors">
                  <h3 className="text-white font-bold mb-2">{st.name}</h3>
                  <p className="text-white/35 text-[14px] leading-relaxed m-0">{st.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {city.sights && city.sights.length > 0 && (
        <section className="py-20 md:py-28 border-b border-white/[0.06]">
          <div className="wrap">
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-4">Sehenswuerdigkeiten</p>
            <h2 className="font-display text-4xl text-white uppercase tracking-wide mb-10">{city.name} entdecken</h2>
            <div className="flex flex-wrap gap-2">
              {city.sights.map(s => (
                <span key={s} className="text-[13px] text-white/40 border border-white/[0.08] rounded-full px-4 py-2 bg-white/[0.02] hover:border-sp/30 hover:text-sp transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0"><div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-sp/[0.08] rounded-full blur-[120px]" /></div>
        <div className="wrap text-center relative z-10 max-w-[550px] mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-white leading-[0.95] uppercase tracking-wide mb-5">Monteurzimmer in {city.name}<br /><span className="text-sp">gesucht?</span></h2>
          <p className="text-white/30 text-lg leading-relaxed mb-8">Persoenlicher Rueckruf in 15 Minuten. Komplett kostenlos.</p>
          <Link href="/mieter" className="cta-primary text-base !px-8 !py-4">Jetzt Unterkunft anfragen <Arr s={18}/></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
