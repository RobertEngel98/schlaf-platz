"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Stars, FaqItem, Section, SectionHeader, ArrowRight } from "@/components/ui";
import { BRAND, CityData } from "@/lib/constants";

export default function CityClient({ city }: { city: CityData }) {
  return (
    <div className="font-body text-gray-900 bg-brand-surface">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className="hero-gradient pt-[120px] pb-20 relative overflow-hidden">
        <div className="deco-circle w-[400px] h-[400px] top-[10%] -right-[5%]" />
        <div className="container-sp relative z-10 max-w-[720px]">
          <p className="text-brand-accent text-sm font-display font-semibold uppercase tracking-widest mb-4">
            {city.emoji} Monteurzimmer
          </p>
          <h1 className="font-display font-extrabold text-white leading-[1.1] tracking-tight mb-6" style={{ fontSize: "clamp(32px,4.5vw,52px)" }}>
            Monteurzimmer in <span className="text-gradient-accent">{city.name}</span>
          </h1>
          <p className="text-xl text-white/70 font-display font-medium mb-4">
            Unterkünfte für Handwerker &amp; Monteure in {city.name} &amp; Umgebung
          </p>
          <p className="text-white/55 text-base leading-relaxed max-w-[580px] mb-8">{city.heroDescription}</p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/mieter" className="btn-primary">Unterkunft in {city.name} finden <ArrowRight size={18} /></Link>
            <a href="/app" className="btn-secondary">Monteurzimmer anbieten</a>
          </div>
          <div className="flex items-center gap-3 mt-10 opacity-80">
            <Stars size={16} />
            <span className="text-white/60 text-sm">{BRAND.stats.googleRating} aus {BRAND.stats.googleReviews}+ Bewertungen</span>
          </div>
        </div>
      </section>

      {/* ═══════ CITY DATA ═══════ */}
      <Section bg="white">
        <SectionHeader label="Wissenswertes" title={`Daten & Fakten über ${city.name}`} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Bundesland", value: city.bundesland },
            { label: "Einwohner", value: city.einwohner },
            { label: "Fläche", value: city.flaeche },
            { label: "Autobahnen", value: city.autobahnen },
          ].map((d) => (
            <div key={d.label} className="card !rounded-xl p-5">
              <p className="text-xs font-display font-semibold text-brand-accent uppercase tracking-wider mb-1">{d.label}</p>
              <p className="font-display font-bold text-brand-primary text-base m-0">{d.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-7">
            <h3 className="font-display font-bold text-lg text-brand-primary mb-3">Wichtige Branchen</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{city.branchen}</p>
            <p className="text-gray-500 text-sm leading-relaxed mt-2"><strong className="text-brand-primary">Bekannte Unternehmen:</strong> {city.unternehmen}</p>
          </div>
          <div className="card p-7">
            <h3 className="font-display font-bold text-lg text-brand-primary mb-3">Verkehrsanbindung</h3>
            <p className="text-gray-500 text-sm leading-relaxed"><strong>Autobahnen:</strong> {city.autobahnen}<br /><strong>Bahnhof:</strong> {city.bahnhof}</p>
          </div>
        </div>
      </Section>

      {/* ═══════ STADTTEILE ═══════ */}
      {city.stadtteile.length > 0 && (
        <Section bg="surface">
          <SectionHeader label="Stadtteile" title={`Stadtteile in ${city.name}`} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {city.stadtteile.map((st) => (
              <div key={st.name} className="card !rounded-xl p-6">
                <h4 className="font-display font-bold text-brand-primary mb-2">{st.name}</h4>
                <p className="text-gray-500 text-sm leading-relaxed m-0">{st.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ═══════ INDUSTRIEGEBIETE ═══════ */}
      {city.industriegebiete.length > 0 && (
        <Section bg="white">
          <SectionHeader label="Wirtschaft" title={`Industriegebiete in ${city.name}`} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {city.industriegebiete.map((ig) => (
              <div key={ig.name} className="card !rounded-xl p-6">
                <h4 className="font-display font-bold text-brand-primary mb-2">{ig.name}</h4>
                <p className="text-gray-500 text-sm leading-relaxed m-0">{ig.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ═══════ MESSEN ═══════ */}
      {city.messen.length > 0 && (
        <Section bg="surface">
          <SectionHeader label="Messen & Events" title={`Wichtige Messen in ${city.name}`} />
          <div className="flex flex-wrap gap-3 justify-center">
            {city.messen.map((m) => (
              <span key={m} className="card !rounded-full px-5 py-2.5 text-sm font-display font-semibold text-brand-primary">{m}</span>
            ))}
          </div>
        </Section>
      )}

      {/* ═══════ SEHENSWÜRDIGKEITEN ═══════ */}
      {city.sehenswuerdigkeiten.length > 0 && (
        <Section bg="white">
          <SectionHeader label="Freizeit" title={`Sehenswürdigkeiten in ${city.name}`} />
          <div className="flex flex-wrap gap-3 justify-center">
            {city.sehenswuerdigkeiten.map((s) => (
              <span key={s} className="bg-brand-surface border border-brand-surface-alt rounded-xl px-5 py-3 text-sm text-brand-primary font-medium">{s}</span>
            ))}
          </div>
        </Section>
      )}

      {/* ═══════ BAUMÄRKTE ═══════ */}
      {city.baumaerkte.length > 0 && (
        <Section bg="surface">
          <SectionHeader label="Praktisch" title={`Baumärkte in ${city.name}`} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {city.baumaerkte.map((b) => (
              <div key={b.name} className="card !rounded-xl p-5">
                <p className="text-xs font-display font-semibold text-brand-accent uppercase tracking-wider mb-1">{b.stadtteil}</p>
                <h4 className="font-display font-bold text-sm text-brand-primary mb-1">{b.name}</h4>
                <p className="text-gray-500 text-xs m-0">{b.adresse}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ═══════ VERMIETER CTA ═══════ */}
      <Section bg="white">
        <div className="hero-gradient rounded-[20px] p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-accent/[0.04]" />
          <div className="relative z-10">
            <h2 className="font-display font-extrabold text-white text-2xl md:text-3xl leading-tight tracking-tight mb-4">
              Monteurzimmer in {city.name} anbieten?
            </h2>
            <p className="text-white/65 text-base leading-relaxed max-w-[480px] mx-auto mb-8">
              Inserieren Sie kostenlos und erreichen Sie tausende Handwerksfirmen. Sicher, unkompliziert, mit Transparenzregister.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/app" className="btn-primary">Kostenlos inserieren</a>
              <Link href="/mieter" className="btn-secondary">Unterkunft finden</Link>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
