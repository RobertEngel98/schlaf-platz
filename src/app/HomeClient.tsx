"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AnimatedNumber, Stars, Arrow, Section, SectionHeader } from "@/components/ui";
import { BRAND, CITIES } from "@/lib/constants";

function CityCard({ name, tagline, emoji, slug }: { name: string; tagline: string; emoji: string; slug: string }) {
  return (
    <Link href={`/monteurzimmer-${slug}`} className="card flex items-center gap-4 p-6 no-underline">
      <span className="text-3xl">{emoji}</span>
      <div><p className="font-display font-bold text-base text-sp-blue m-0">{name}</p><p className="text-gray-500 text-[13px] mt-1 m-0">{tagline}</p></div>
      <span className="ml-auto text-sp-blue"><Arrow size={20} /></span>
    </Link>
  );
}

export default function HomeClient() {
  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="hero-bg min-h-screen flex items-center pt-[100px] pb-20 relative overflow-hidden">
        <div className="absolute rounded-full w-[500px] h-[500px] top-[15%] -right-[5%] border border-white/[0.06]" />
        <div className="wrap w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/[0.08] rounded-full px-4 py-2 mb-6 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-sp-green animate-pulse" />
                <span className="text-white/80 text-[13px] font-display font-medium">Deutschlandweit {BRAND.stats.partners.toLocaleString("de-DE")}+ verifizierte Partner</span>
              </div>
              <h1 className="font-display font-extrabold text-white leading-[1.1] tracking-tight mb-6" style={{ fontSize: "clamp(36px,5vw,60px)" }}>
                Monteurzimmer <span className="text-gradient-gold">einfach</span> finden &amp; vermieten.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-[540px] mb-9">Die kostenlose Plattform, die Vermieter und Handwerksfirmen zusammenbringt. Komplett moeblierte Apartments. Transparentes Register. Persoenliche Betreuung.</p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/mieter" className="btn-gold">Unterkunft finden <Arrow size={18} /></Link>
                <Link href="/app" className="btn-outline-white">Kostenlos inserieren</Link>
              </div>
            </div>
            <div className="w-full lg:w-auto lg:min-w-[380px] flex flex-col gap-4">
              {[
                { icon: "🏢", label: "Verifizierte Partner", value: <AnimatedNumber end={1500} suffix="+" /> },
                { icon: "🇩🇪", label: "Staedte in Deutschland", value: <AnimatedNumber end={50} suffix="+" /> },
                { icon: "⭐", label: "Google-Bewertung", value: "5.0 / 5.0" },
                { icon: "💰", label: "Fuer Vermieter", value: "Kostenlos" },
              ].map((s, i) => (
                <div key={i} className="glass p-5 flex items-center gap-4">
                  <span className="text-[28px]">{s.icon}</span>
                  <div><p className="font-display font-extrabold text-[22px] text-white m-0">{s.value}</p><p className="text-white/50 text-[13px] mt-0.5 font-medium">{s.label}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <Section bg="surface">
        <SectionHeader label="Warum Schlaf-Platz" title="Die intelligente Loesung fuer mobile Arbeitskraefte" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🛡️", t: "Transparenzregister", d: "Unser einzigartiges Register schuetzt Vermieter vor Problemgaesten. Jede Firma wird bewertet." },
            { icon: "💰", t: "Komplett kostenlos", d: "Keine versteckten Gebuehren fuer Vermieter. Waehrend Konkurrenten bis zu 300 Euro/Jahr verlangen." },
            { icon: "🏠", t: "Komplette Apartments", d: "Keine geteilten Zimmer. Voll moeblierte Wohnungen mit Kueche, Bad und WLAN." },
          ].map((item, i) => (
            <div key={i} className="card p-9">
              <div className="w-14 h-14 rounded-[14px] bg-sp-gold/10 flex items-center justify-center mb-6 text-[28px]">{item.icon}</div>
              <h3 className="font-display font-bold text-xl text-sp-blue mb-3">{item.t}</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DUAL CTA */}
      <Section bg="white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="hero-bg rounded-[20px] p-12 relative overflow-hidden">
            <p className="label-sm !text-sp-gold">Fuer Unternehmen &amp; Monteure</p>
            <h3 className="font-display font-extrabold text-[28px] text-white leading-tight mb-4">Unterkunft finden</h3>
            <p className="text-white/70 text-[15px] leading-relaxed mb-8">Finden Sie in 90 Sekunden die passende Monteurwohnung. Ob fuer 5 oder 100 Mitarbeiter.</p>
            <Link href="/mieter" className="btn-gold">Jetzt Unterkunft finden <Arrow /></Link>
          </div>
          <div className="bg-sp-bg rounded-[20px] p-12 border border-sp-bg-alt relative overflow-hidden">
            <p className="label-sm">Fuer Immobilieneigentuemer</p>
            <h3 className="font-display font-extrabold text-[28px] text-sp-blue leading-tight mb-4">Unterkunft vermieten</h3>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-8">Inserieren Sie kostenlos und erreichen Sie tausende Firmen. Transparenzregister und persoenliche Betreuung inklusive.</p>
            <Link href="/app" className="btn-blue">Kostenlos inserieren <Arrow /></Link>
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section bg="surface">
        <SectionHeader label="Kundenstimmen" title="Was unsere Partner sagen" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { q: "Besonders hervorheben moechten wir Herrn Mansouri und Frau Schlaht, die stets freundlich, professionell und hilfsbereit sind.", a: "Schlegel GmbH" },
            { q: "Die Kommunikation war einwandfrei, die Gaeste waren freundlich und anstaendig. Wir freuen uns auf die weitere Zusammenarbeit!", a: "Lisa Werkmeister" },
            { q: "Von der Anfrage, Reservierung bis zur Buchung immer einwandfrei. Zusagen wurden bis dato immer eingehalten.", a: "Wohnraum KKBBG" },
          ].map((t, i) => (
            <div key={i} className="card p-7 flex flex-col gap-5">
              <Stars /><p className="text-gray-900 text-[15px] leading-relaxed flex-1 italic">&bdquo;{t.q}&ldquo;</p>
              <div className="border-t border-sp-bg-alt pt-4"><p className="font-bold text-sp-blue text-[15px] m-0">{t.a}</p></div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3 mt-12"><Stars size={16} /><span className="text-gray-500 text-[15px] font-medium">5.0 aus {BRAND.stats.reviews}+ Google-Bewertungen</span></div>
      </Section>

      {/* CITIES */}
      <Section bg="white" id="staedte">
        <SectionHeader label="Standorte" title="Monteurzimmer in ganz Deutschland" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CITIES.map(c => <CityCard key={c.slug} name={c.name} tagline={c.tagline} emoji={c.emoji} slug={c.slug} />)}
        </div>
      </Section>

      {/* TIMELINE */}
      <Section bg="surface">
        <SectionHeader label="Unsere Geschichte" title="Von der ersten Wohnung zum Marktfuehrer" />
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { y: "2014", t: "Erste Monteurzimmer-Vermietung" },
            { y: "2017", t: "Marke & Automatisierung" },
            { y: "2020", t: "100 Kunden, erste Mitarbeiter" },
            { y: "2022", t: "Gruendung der Genossenschaft e.G." },
            { y: "2023", t: "+223% Wachstum, 1.500 Partner" },
            { y: "2024", t: "App-Launch & Markenregistrierung" },
          ].map(i => (
            <div key={i.y} className="card !rounded-xl p-5 min-w-[180px] text-center">
              <p className="font-display font-extrabold text-2xl text-sp-gold m-0 mb-2">{i.y}</p>
              <p className="text-gray-500 text-sm leading-snug m-0">{i.t}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="hero-bg py-20 relative overflow-hidden">
        <div className="wrap text-center relative z-10">
          <h2 className="font-display font-extrabold text-white leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(28px,3.5vw,42px)" }}>Bereit, loszulegen?</h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-[540px] mx-auto mb-9">Ob Sie eine Unterkunft suchen oder Ihre Wohnung vermieten moechten - unser Team steht Ihnen zur Seite.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/mieter" className="btn-gold">Unterkunft finden</Link>
            <Link href="/app" className="btn-outline-white">Kostenlos inserieren</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
