"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Section, Heading, Tag, Faq, Arr, Chk, FadeIn } from "@/components/ui";
import { BRAND, CityData } from "@/lib/constants";

export default function CityClient({ city }: { city: CityData }) {
  const c = city;
  return (
    <div>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-ink pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-sp/8 blur-[120px]" />
        <div className="wrap relative z-10 max-w-[650px]">
          <Tag variant="light">{c.emoji} {c.bundesland}</Tag>
          <h1 className="font-display text-4xl md:text-5xl text-white leading-[1.1] tracking-tight mt-5 mb-5">Monteurzimmer in {c.name}</h1>
          <p className="text-white/45 text-lg leading-relaxed mb-8">{c.heroDesc}</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/mieter" className="btn-primary">Unterkunft anfragen <Arr s={16}/></Link>
            <Link href="/app" className="btn-ghost">Kostenlos inserieren</Link>
          </div>
        </div>
      </section>

      {/* City stats */}
      <div className="bg-white border-b border-surface-dim py-5">
        <div className="wrap flex items-center justify-center gap-6 md:gap-10 flex-wrap text-[13px]">
          {[
            { l: "Einwohner", v: c.einwohner },
            { l: "Flaeche", v: c.flaeche },
            { l: "Autobahnen", v: c.autobahnen },
            { l: "Hbf", v: c.bahnhof },
          ].map(s => (
            <span key={s.l} className="text-ink-light"><strong className="text-ink">{s.l}:</strong> {s.v}</span>
          ))}
        </div>
      </div>

      {/* Key industries */}
      <Section bg="white">
        <Heading tag={`Wirtschaft ${c.name}`} title={`Branchen & Industrie in ${c.name}`} sub={`Wichtige Arbeitgeber: ${c.unternehmen}`} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[800px] mx-auto">
          {c.industrie.map((ind, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="card">
                <h3 className="font-display text-lg text-ink mb-2">{ind.name}</h3>
                <p className="text-ink-light text-sm leading-relaxed">{ind.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        {c.messen.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-ink-muted text-sm">Wichtige Messen: <span className="text-ink font-medium">{c.messen.join(", ")}</span></p>
          </div>
        )}
      </Section>

      {/* Stadtteile */}
      <Section bg="cool">
        <Heading tag="Stadtteile" title={`Die wichtigsten Stadtteile in ${c.name}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[800px] mx-auto">
          {c.stadtteile.map((st, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="bg-white rounded-xl border border-surface-dim p-5">
                <h3 className="font-semibold text-ink text-[15px] mb-1">{st.name}</h3>
                <p className="text-ink-muted text-sm">{st.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Sights */}
      {c.sights.length > 0 && (
        <Section bg="white">
          <Heading tag={`${c.name} entdecken`} title={`Sehenswuerdigkeiten in ${c.name}`} />
          <div className="flex flex-wrap justify-center gap-3 max-w-[600px] mx-auto">
            {c.sights.map(s => (
              <span key={s} className="bg-surface-cool border border-surface-dim rounded-full px-4 py-2 text-sm text-ink-light">{s}</span>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <section className="bg-ink py-16 md:py-20">
        <div className="wrap text-center max-w-[500px] mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Monteurzimmer in {c.name} gesucht?</h2>
          <p className="text-white/40 text-[15px] leading-relaxed mb-8">Senden Sie uns Ihre Anfrage und erhalten Sie innerhalb von 15 Minuten einen Rueckruf.</p>
          <Link href="/mieter" className="btn-primary">Jetzt Unterkunft anfragen <Arr s={16}/></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
