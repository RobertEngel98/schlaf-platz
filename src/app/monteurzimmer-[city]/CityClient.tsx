"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Stars, Section, SectionHeader, Arrow } from "@/components/ui";
import { BRAND, CityData } from "@/lib/constants";

export default function CityClient({ city }: { city: CityData }) {
  return (
    <div>
      <Navbar />
      <section className="hero-bg pt-[120px] pb-20 relative overflow-hidden">
        <div className="wrap relative z-10 max-w-[720px]">
          <p className="text-white/80 text-sm font-display font-semibold uppercase tracking-widest mb-4">{city.emoji} Monteurzimmer</p>
          <h1 className="font-display font-extrabold text-white leading-[1.1] tracking-tight mb-6" style={{ fontSize: "clamp(32px,4.5vw,52px)" }}>
            Monteurzimmer in <span className="text-gradient-gold">{city.name}</span>
          </h1>
          <p className="text-xl text-white/70 font-display font-medium mb-4">Unterkuenfte fuer Handwerker &amp; Monteure in {city.name} &amp; Umgebung</p>
          <p className="text-white/55 text-base leading-relaxed max-w-[580px] mb-8">{city.heroDesc}</p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/mieter" className="btn-gold">Unterkunft in {city.name} finden <Arrow size={18} /></Link>
            <Link href="/app" className="btn-outline-white">Monteurzimmer anbieten</Link>
          </div>
          <div className="flex items-center gap-3 mt-10 opacity-80"><Stars size={16} /><span className="text-white/60 text-sm">{BRAND.stats.rating} aus {BRAND.stats.reviews}+ Bewertungen</span></div>
        </div>
      </section>

      <Section bg="white">
        <SectionHeader label="Wissenswertes" title={`Daten & Fakten ueber ${city.name}`} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[{ l: "Bundesland", v: city.bundesland }, { l: "Einwohner", v: city.einwohner }, { l: "Flaeche", v: city.flaeche }, { l: "Autobahnen", v: city.autobahnen }].map(d => (
            <div key={d.l} className="card !rounded-xl p-5"><p className="text-xs font-display font-semibold text-sp-blue uppercase tracking-wider mb-1">{d.l}</p><p className="font-display font-bold text-sp-blue text-base m-0">{d.v}</p></div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-7"><h3 className="font-display font-bold text-lg text-sp-blue mb-3">Wichtige Branchen</h3><p className="text-gray-500 text-sm leading-relaxed">{city.branchen}</p><p className="text-gray-500 text-sm mt-2"><strong className="text-sp-blue">Unternehmen:</strong> {city.unternehmen}</p></div>
          <div className="card p-7"><h3 className="font-display font-bold text-lg text-sp-blue mb-3">Verkehrsanbindung</h3><p className="text-gray-500 text-sm leading-relaxed"><strong>Autobahnen:</strong> {city.autobahnen}<br /><strong>Bahnhof:</strong> {city.bahnhof}</p></div>
        </div>
      </Section>

      {city.stadtteile.length > 0 && <Section bg="surface"><SectionHeader label="Stadtteile" title={`Stadtteile in ${city.name}`} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{city.stadtteile.map(s => <div key={s.name} className="card !rounded-xl p-6"><h4 className="font-display font-bold text-sp-blue mb-2">{s.name}</h4><p className="text-gray-500 text-sm leading-relaxed m-0">{s.desc}</p></div>)}</div>
      </Section>}

      {city.industrie.length > 0 && <Section bg="white"><SectionHeader label="Wirtschaft" title={`Industriegebiete in ${city.name}`} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{city.industrie.map(g => <div key={g.name} className="card !rounded-xl p-6"><h4 className="font-display font-bold text-sp-blue mb-2">{g.name}</h4><p className="text-gray-500 text-sm leading-relaxed m-0">{g.desc}</p></div>)}</div>
      </Section>}

      {city.messen.length > 0 && <Section bg="surface"><SectionHeader label="Messen" title={`Wichtige Messen in ${city.name}`} />
        <div className="flex flex-wrap gap-3 justify-center">{city.messen.map(m => <span key={m} className="card !rounded-full px-5 py-2.5 text-sm font-display font-semibold text-sp-blue">{m}</span>)}</div>
      </Section>}

      {city.sights.length > 0 && <Section bg="white"><SectionHeader label="Freizeit" title={`Sehenswuerdigkeiten in ${city.name}`} />
        <div className="flex flex-wrap gap-3 justify-center">{city.sights.map(s => <span key={s} className="bg-sp-bg border border-sp-bg-alt rounded-xl px-5 py-3 text-sm text-sp-blue font-medium">{s}</span>)}</div>
      </Section>}

      <Section bg="surface">
        <div className="hero-bg rounded-[20px] p-12 md:p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-display font-extrabold text-white text-2xl md:text-3xl mb-4">Monteurzimmer in {city.name} anbieten?</h2>
            <p className="text-white/65 text-base max-w-[480px] mx-auto mb-8">Inserieren Sie kostenlos und erreichen Sie tausende Handwerksfirmen.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/app" className="btn-gold">Kostenlos inserieren</Link>
              <Link href="/mieter" className="btn-outline-white">Unterkunft finden</Link>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
