"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  AnimatedNumber,
  Stars,
  ArrowRight,
  TestimonialCard,
  Section,
  SectionHeader,
} from "@/components/ui";
import { BRAND, CITIES } from "@/lib/constants";

// ─── City Card ────────────────────────────────────────────────────────
function CityCard({ name, tagline, emoji, slug }: { name: string; tagline: string; emoji: string; slug: string }) {
  return (
    <Link
      href={`/monteurzimmer-${slug}`}
      className="card flex items-center gap-4 p-6 no-underline"
    >
      <span className="text-3xl">{emoji}</span>
      <div>
        <p className="font-display font-bold text-base text-brand-primary m-0">{name}</p>
        <p className="text-gray-500 text-[13px] mt-1 m-0">{tagline}</p>
      </div>
      <span className="ml-auto">
        <ArrowRight size={20} />
      </span>
    </Link>
  );
}

export default function HomeClient() {
  return (
    <div className="font-body text-gray-900 bg-brand-surface">
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero-gradient min-h-screen flex items-center pt-[100px] pb-20 relative overflow-hidden">
        <div className="deco-circle w-[500px] h-[500px] top-[15%] -right-[5%]" />
        <div className="deco-circle w-[400px] h-[400px] bottom-[10%] -left-[10%] !border-white/[0.04]" />

        <div className="container-sp w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/[0.08] rounded-full px-4 py-2 mb-6 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
                <span className="text-white/80 text-[13px] font-display font-medium">
                  Deutschlandweit {BRAND.stats.partners.toLocaleString("de-DE")}+ verifizierte Partner
                </span>
              </div>

              <h1 className="font-display font-extrabold text-white leading-[1.1] tracking-tight mb-6" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>
                Monteurzimmer{" "}
                <span className="text-gradient-accent">einfach</span>{" "}
                finden &amp; vermieten.
              </h1>

              <p className="text-white/70 text-lg leading-relaxed max-w-[540px] mb-9">
                Die kostenlose Plattform, die Vermieter und Handwerksfirmen zusammenbringt.
                Komplett möblierte Apartments. Transparentes Register. Persönliche Betreuung.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link href="/mieter" className="btn-primary">
                  Unterkunft finden <ArrowRight size={18} />
                </Link>
                <a href="/app" className="btn-secondary">
                  Kostenlos inserieren
                </a>
              </div>
            </div>

            {/* Right: Stats */}
            <div className="w-full lg:w-auto lg:min-w-[380px] flex flex-col gap-4">
              {[
                { icon: "🏢", label: "Verifizierte Partner", value: <AnimatedNumber end={1500} suffix="+" /> },
                { icon: "🇩🇪", label: "Städte in Deutschland", value: <AnimatedNumber end={50} suffix="+" /> },
                { icon: "⭐", label: "Google-Bewertung", value: "5.0 / 5.0" },
                { icon: "💰", label: "Für Vermieter", value: "Kostenlos" },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-5 flex items-center gap-4">
                  <span className="text-[28px]">{stat.icon}</span>
                  <div>
                    <p className="font-display font-extrabold text-[22px] text-white m-0">{stat.value}</p>
                    <p className="text-white/50 text-[13px] mt-0.5 font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SOCIAL PROOF BAR ═══════════ */}
      <div className="bg-white py-10 border-b border-brand-surface-alt">
        <div className="container-sp text-center">
          <p className="text-gray-500 text-sm font-display font-medium uppercase tracking-widest mb-6">
            Vertraut von Unternehmen aus ganz Deutschland
          </p>
          <div className="flex justify-center items-center gap-12 flex-wrap opacity-50">
            {["Schlegel GmbH", "Johann Rohrer GmbH", "SIMA", "IB-IT", "Bruno Appel"].map((name) => (
              <span key={name} className="font-display font-bold text-base text-brand-primary">{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ VALUE PROPS ═══════════ */}
      <Section bg="surface">
        <SectionHeader label="Warum Schlaf-Platz" title="Die intelligente Lösung für mobile Arbeitskräfte" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🛡️",
              title: "Transparenzregister",
              desc: "Unser einzigartiges Register schützt Vermieter vor Problemgästen. Jede Firma wird bewertet — für maximale Sicherheit.",
            },
            {
              icon: "💰",
              title: "Komplett kostenlos",
              desc: "Keine versteckten Gebühren für Vermieter. Während Konkurrenten bis zu 300€/Jahr verlangen, inserieren Sie bei uns kostenfrei.",
            },
            {
              icon: "🏠",
              title: "Komplette Apartments",
              desc: "Keine geteilten Zimmer. Voll möblierte Wohnungen mit Küche, Bad und WLAN — ein echtes Zuhause auf Zeit.",
            },
          ].map((item, i) => (
            <div key={i} className="card p-9">
              <div className="w-14 h-14 rounded-[14px] bg-brand-accent/10 flex items-center justify-center mb-6 text-[28px]">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-brand-primary mb-3">{item.title}</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════ DUAL CTA ═══════════ */}
      <Section bg="white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mieter */}
          <div className="hero-gradient rounded-[20px] p-12 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-brand-accent/[0.08]" />
            <p className="section-label !text-brand-accent">Für Unternehmen &amp; Monteure</p>
            <h3 className="font-display font-extrabold text-[28px] text-white leading-tight mb-4 tracking-tight">
              Unterkunft finden
            </h3>
            <p className="text-white/70 text-[15px] leading-relaxed mb-8">
              Finden Sie in 90 Sekunden die passende Monteurwohnung. Ob für 5 oder 100 Mitarbeiter — wir organisieren alles.
            </p>
            <Link href="/mieter" className="btn-primary">
              Jetzt Unterkunft finden <ArrowRight />
            </Link>
          </div>

          {/* Vermieter */}
          <div className="bg-brand-surface rounded-[20px] p-12 border border-brand-surface-alt relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-brand-primary/[0.03]" />
            <p className="section-label">Für Immobilieneigentümer</p>
            <h3 className="font-display font-extrabold text-[28px] text-brand-primary leading-tight mb-4 tracking-tight">
              Unterkunft vermieten
            </h3>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
              Inserieren Sie kostenlos und erreichen Sie tausende Firmen. Transparenzregister, sichere Bezahlung und persönliche Betreuung inklusive.
            </p>
            <a href="/app" className="btn-dark">
              Kostenlos inserieren <ArrowRight />
            </a>
          </div>
        </div>
      </Section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <Section bg="surface">
        <SectionHeader label="Kundenstimmen" title="Was unsere Partner sagen" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            quote="Besonders hervorheben möchten wir Herrn Mansouri und Frau Schlaht, die stets freundlich, professionell und hilfsbereit sind."
            author="Schlegel GmbH"
          />
          <TestimonialCard
            quote="Die Kommunikation war einwandfrei, die Gäste waren freundlich und anständig. Wir freuen uns auf die weitere Zusammenarbeit!"
            author="Lisa Werkmeister"
          />
          <TestimonialCard
            quote="Von der Anfrage, Reservierung bis zur Buchung immer einwandfrei. Zusagen wurden bis dato immer eingehalten."
            author="Wohnraum KKBBG"
          />
        </div>
        <div className="flex items-center justify-center gap-3 mt-12">
          <Stars size={16} />
          <span className="text-gray-500 text-[15px] font-medium">
            5.0 aus {BRAND.stats.googleReviews}+ Google-Bewertungen
          </span>
        </div>
      </Section>

      {/* ═══════════ CITIES ═══════════ */}
      <Section bg="white" id="staedte">
        <SectionHeader label="Standorte" title="Monteurzimmer in ganz Deutschland" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CITIES.map((city) => (
            <CityCard
              key={city.slug}
              name={city.name}
              tagline={city.tagline}
              emoji={city.emoji}
              slug={city.slug}
            />
          ))}
        </div>
      </Section>

      {/* ═══════════ TIMELINE ═══════════ */}
      <Section bg="surface">
        <SectionHeader label="Unsere Geschichte" title="Von der ersten Wohnung zum Marktführer" />
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { year: "2014", text: "Erste Monteurzimmer-Vermietung" },
            { year: "2017", text: "Marke & Automatisierung" },
            { year: "2020", text: "100 Kunden, erste Mitarbeiter" },
            { year: "2022", text: "Gründung der Genossenschaft e.G." },
            { year: "2023", text: "+223% Wachstum, 1.500 Partner" },
            { year: "2024", text: "App-Launch & Markenregistrierung" },
          ].map((item) => (
            <div
              key={item.year}
              className="card !rounded-xl p-5 min-w-[180px] text-center"
            >
              <p className="font-display font-extrabold text-2xl text-brand-accent m-0 mb-2">{item.year}</p>
              <p className="text-gray-500 text-sm leading-snug m-0">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="hero-gradient py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-accent/[0.04]" />
        <div className="container-sp text-center relative z-10">
          <h2 className="font-display font-extrabold text-white leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}>
            Bereit, loszulegen?
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-[540px] mx-auto mb-9">
            Ob Sie eine Unterkunft suchen oder Ihre Wohnung vermieten möchten — unser Team steht Ihnen zur Seite.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/mieter" className="btn-primary">Unterkunft finden</Link>
            <a href="/app" className="btn-secondary">Kostenlos inserieren</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
