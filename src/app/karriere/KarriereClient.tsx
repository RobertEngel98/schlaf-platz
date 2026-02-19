"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Section, SectionHeader, ArrowRight } from "@/components/ui";
import { BRAND } from "@/lib/constants";

const PERKS = [
  { icon: "🚀", title: "Wachstum", desc: "+223% Umsatzwachstum 2023. Wir wachsen rasant und du wächst mit." },
  { icon: "🏠", title: "Flexibel", desc: "Remote-Arbeit möglich. Flexible Arbeitszeiten. Ergebnisorientiert." },
  { icon: "🤝", title: "Teamgeist", desc: "23-köpfiges Team. Jährliche Teamtagung. Gemeinsam stark." },
  { icon: "📈", title: "Karrierepfade", desc: "Vom Innendienst zum Agenturpartner. Dein Weg, dein Tempo." },
  { icon: "💰", title: "Faire Vergütung", desc: "Attraktives Gehalt plus Provisionsmodelle. Leistung wird belohnt." },
  { icon: "🎓", title: "Ausbildung", desc: "Wir bilden auch aus: Kauffrau/Kaufmann für Büromanagement." },
];

const POSITIONS = [
  {
    title: "Selbstständiger Agenturpartner (m/w/d)",
    type: "Selbstständig",
    location: "Deutschlandweit",
    desc: "Baue dein eigenes Netzwerk auf und werde Teil unseres Partnermodells. Du akquirierst Vermieter und Unternehmen in deiner Region.",
  },
  {
    title: "Vertriebspartner (m/w/d)",
    type: "Selbstständig",
    location: "Deutschlandweit",
    desc: "Bringe Schlaf-Platz in deine Region. Telefonakquise, persönliche Besuche und Netzwerkaufbau mit attraktiver Provision.",
  },
  {
    title: "Innendienst (m/w/d)",
    type: "Festanstellung",
    location: "Remote / Büro",
    desc: "Betreuung unserer Partner und Mieter. Buchungsmanagement, Kundenservice und Verwaltung.",
  },
  {
    title: "Ausbildung Kauffrau/Kaufmann für Büromanagement",
    type: "Ausbildung",
    location: "Vor Ort",
    desc: "Starte deine Karriere bei uns. Lerne alle Facetten des Unterkunftsmanagements in einem wachsenden Unternehmen.",
  },
];

export default function KarriereClient() {
  return (
    <div className="font-body text-gray-900 bg-brand-surface">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className="hero-gradient pt-[120px] pb-24 relative overflow-hidden">
        <div className="deco-circle w-[500px] h-[500px] top-[15%] -right-[5%]" />
        <div className="container-sp relative z-10 text-center max-w-[720px] mx-auto">
          <p className="text-brand-accent text-sm font-display font-semibold uppercase tracking-widest mb-4">
            Karriere bei Schlaf-Platz
          </p>
          <h1 className="font-display font-extrabold text-white leading-[1.1] tracking-tight mb-6" style={{ fontSize: "clamp(36px,5vw,56px)" }}>
            Werde Teil von{" "}
            <span className="text-gradient-accent">Deutschlands</span>{" "}
            wachsender Monteurzimmer-Plattform
          </h1>
          <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-[520px] mx-auto">
            {BRAND.stats.partners.toLocaleString("de-DE")}+ Partner. {BRAND.stats.teamSize} Teammitglieder. +{BRAND.stats.growthPercent}% Wachstum.
            Und wir suchen Verstärkung.
          </p>
          <a href="#stellen" className="btn-primary">
            Offene Stellen ansehen <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ═══════ PERKS ═══════ */}
      <Section bg="surface">
        <SectionHeader label="Warum Schlaf-Platz" title="Was dich bei uns erwartet" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERKS.map((p, i) => (
            <div key={i} className="card p-8">
              <div className="w-14 h-14 rounded-[14px] bg-brand-accent/10 flex items-center justify-center mb-5 text-[28px]">
                {p.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-brand-primary mb-2">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════ OPEN POSITIONS ═══════ */}
      <Section bg="white" id="stellen">
        <SectionHeader label="Offene Stellen" title="Finde deine Rolle bei Schlaf-Platz" />
        <div className="flex flex-col gap-4 max-w-[800px] mx-auto">
          {POSITIONS.map((pos, i) => (
            <div key={i} className="card !rounded-xl p-7 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-display font-bold text-brand-primary text-lg mb-2">{pos.title}</h3>
                <div className="flex gap-3 flex-wrap mb-2">
                  <span className="text-xs font-display font-semibold bg-brand-accent/10 text-brand-accent rounded-full px-3 py-1">{pos.type}</span>
                  <span className="text-xs font-display font-semibold bg-brand-surface text-gray-500 rounded-full px-3 py-1">{pos.location}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed m-0">{pos.desc}</p>
              </div>
              <a
                href={`mailto:${BRAND.email}?subject=Bewerbung: ${pos.title}`}
                className="btn-primary !py-3 !px-6 !text-sm shrink-0"
              >
                Bewerben
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════ CTA ═══════ */}
      <section className="hero-gradient py-20 relative overflow-hidden">
        <div className="container-sp text-center relative z-10">
          <h2 className="font-display font-extrabold text-white text-2xl md:text-3xl leading-tight tracking-tight mb-4">
            Keine passende Stelle dabei?
          </h2>
          <p className="text-white/65 text-base leading-relaxed max-w-[480px] mx-auto mb-8">
            Schick uns eine Initiativbewerbung. Wir sind immer auf der Suche nach motivierten Menschen, die etwas bewegen wollen.
          </p>
          <a href={`mailto:${BRAND.email}?subject=Initiativbewerbung`} className="btn-primary">
            Initiativbewerbung senden
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
