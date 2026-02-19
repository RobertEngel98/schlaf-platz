"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Section, SectionHeader, Arrow } from "@/components/ui";
import { BRAND } from "@/lib/constants";

const POSITIONS = [
  { title: "Selbststaendiger Agenturpartner (m/w/d)", type: "Selbststaendig", loc: "Deutschlandweit", desc: "Baue dein eigenes Netzwerk auf und werde Teil unseres Partnermodells." },
  { title: "Vertriebspartner (m/w/d)", type: "Selbststaendig", loc: "Deutschlandweit", desc: "Bringe Schlaf-Platz in deine Region. Telefonakquise und Netzwerkaufbau." },
  { title: "Innendienst (m/w/d)", type: "Festanstellung", loc: "Remote / Buero", desc: "Betreuung unserer Partner und Mieter. Buchungsmanagement und Kundenservice." },
  { title: "Ausbildung Kauffrau/Kaufmann fuer Bueromanagement", type: "Ausbildung", loc: "Vor Ort", desc: "Starte deine Karriere in einem wachsenden Unternehmen." },
];

export default function KarriereClient() {
  return (
    <div>
      <Navbar />
      <section className="hero-bg pt-[120px] pb-24 relative overflow-hidden">
        <div className="wrap relative z-10 text-center max-w-[720px] mx-auto">
          <p className="text-sp-gold text-sm font-display font-semibold uppercase tracking-widest mb-4">Karriere bei Schlaf-Platz</p>
          <h1 className="font-display font-extrabold text-white leading-[1.1] tracking-tight mb-6" style={{ fontSize: "clamp(36px,5vw,56px)" }}>
            Werde Teil von <span className="text-gradient-gold">Deutschlands</span> wachsender Monteurzimmer-Plattform
          </h1>
          <p className="text-white/65 text-lg max-w-[520px] mx-auto mb-8">{BRAND.stats.partners.toLocaleString("de-DE")}+ Partner. {BRAND.stats.team} Teammitglieder. +{BRAND.stats.growth}% Wachstum.</p>
          <a href="#stellen" className="btn-gold">Offene Stellen ansehen <Arrow size={18} /></a>
        </div>
      </section>

      <Section bg="surface">
        <SectionHeader label="Warum Schlaf-Platz" title="Was dich bei uns erwartet" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { i: "🚀", t: "Wachstum", d: "+223% Umsatzwachstum 2023. Du waechst mit." },
            { i: "🏠", t: "Flexibel", d: "Remote-Arbeit moeglich. Flexible Arbeitszeiten." },
            { i: "🤝", t: "Teamgeist", d: "23-koepfiges Team. Jaehrliche Teamtagung." },
            { i: "📈", t: "Karrierepfade", d: "Vom Innendienst zum Agenturpartner." },
            { i: "💰", t: "Faire Verguetung", d: "Attraktives Gehalt plus Provisionsmodelle." },
            { i: "🎓", t: "Ausbildung", d: "Wir bilden auch aus: Kauffrau/Kaufmann." },
          ].map((p, i) => (
            <div key={i} className="card p-8">
              <div className="w-14 h-14 rounded-[14px] bg-sp-gold/10 flex items-center justify-center mb-5 text-[28px]">{p.i}</div>
              <h3 className="font-display font-bold text-lg text-sp-blue mb-2">{p.t}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="white" id="stellen">
        <SectionHeader label="Offene Stellen" title="Finde deine Rolle bei Schlaf-Platz" />
        <div className="flex flex-col gap-4 max-w-[800px] mx-auto">
          {POSITIONS.map((pos, i) => (
            <div key={i} className="card !rounded-xl p-7 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-display font-bold text-sp-blue text-lg mb-2">{pos.title}</h3>
                <div className="flex gap-3 flex-wrap mb-2">
                  <span className="text-xs font-display font-semibold bg-sp-gold/10 text-sp-gold rounded-full px-3 py-1">{pos.type}</span>
                  <span className="text-xs font-display font-semibold bg-sp-bg text-gray-500 rounded-full px-3 py-1">{pos.loc}</span>
                </div>
                <p className="text-gray-500 text-sm m-0">{pos.desc}</p>
              </div>
              <a href={`mailto:${BRAND.email}?subject=Bewerbung: ${pos.title}`} className="btn-gold !py-3 !px-6 !text-sm shrink-0">Bewerben</a>
            </div>
          ))}
        </div>
      </Section>

      <section className="hero-bg py-20">
        <div className="wrap text-center">
          <h2 className="font-display font-extrabold text-white text-2xl md:text-3xl mb-4">Keine passende Stelle dabei?</h2>
          <p className="text-white/65 text-base max-w-[480px] mx-auto mb-8">Schick uns eine Initiativbewerbung.</p>
          <a href={`mailto:${BRAND.email}?subject=Initiativbewerbung`} className="btn-gold">Initiativbewerbung senden</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
