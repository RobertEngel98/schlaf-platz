"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Section, Heading, Tag, FadeIn, Arr } from "@/components/ui";
import { BRAND } from "@/lib/constants";

const JOBS = [
  { title: "Vertriebsmitarbeiter (m/w/d)", type: "Vollzeit", location: "Remote / Muehldorf", desc: "Du gewinnst neue Vermieter und Firmen fuer unsere Plattform." },
  { title: "Kundenbetreuer (m/w/d)", type: "Vollzeit", location: "Remote / Muehldorf", desc: "Du betreust unsere Partner und sorgst fuer zufriedene Mieter." },
  { title: "Agenturpartner (m/w/d)", type: "Selbststaendig", location: "Deutschlandweit", desc: "Als selbststaendiger Partner akquirierst du Vermieter in deiner Region." },
  { title: "Werkstudent Marketing (m/w/d)", type: "Teilzeit", location: "Remote", desc: "Du unterstuetzt unser Marketing-Team bei Content und Social Media." },
];

const TIMELINE = [
  { year: "2014", text: "Gruendung als Einzelunternehmen" },
  { year: "2020", text: "Umbau zur eingetragenen Genossenschaft (e.G.)" },
  { year: "2023", text: "223% Umsatzwachstum, 1.500+ Partner" },
  { year: "2024", text: "Launch der Schlaf-Platz App, 23 Mitarbeiter" },
  { year: "2025", text: "Marktfuehrer-Ziel mit 50+ Staedten" },
];

export default function KarriereClient() {
  return (
    <div>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-ink pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sp/8 blur-[100px]" />
        <div className="wrap relative z-10 max-w-[600px]">
          <Tag variant="light">Karriere bei Schlaf-Platz</Tag>
          <h1 className="font-display text-4xl md:text-5xl text-white leading-[1.1] tracking-tight mt-5 mb-5">Gestalte die Zukunft des Wohnens mit.</h1>
          <p className="text-white/45 text-lg leading-relaxed">Werde Teil eines schnell wachsenden Teams mit 23 Mitarbeitern und echter Startup-Mentalitaet.</p>
        </div>
      </section>

      {/* Numbers */}
      <div className="bg-white border-b border-surface-dim py-6">
        <div className="wrap flex items-center justify-center gap-8 md:gap-16 flex-wrap">
          {[
            { v: "23", l: "Mitarbeiter" },
            { v: "223%", l: "Umsatzwachstum" },
            { v: "50+", l: "Staedte" },
            { v: "100%", l: "Remote moeglich" },
          ].map(s => (
            <div key={s.l} className="text-center">
              <p className="text-2xl font-bold text-sp m-0">{s.v}</p>
              <p className="text-[11px] text-ink-muted uppercase tracking-widest m-0">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <Section bg="cool">
        <Heading tag="Unsere Geschichte" title="Von der Idee zum Marktfuehrer" />
        <div className="max-w-[600px] mx-auto">
          {TIMELINE.map((t, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="flex gap-5 mb-6 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-sp text-white flex items-center justify-center text-xs font-bold shrink-0">{t.year}</div>
                  {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-sp-100 mt-2" />}
                </div>
                <p className="text-ink-light text-[15px] leading-relaxed pt-2.5">{t.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Jobs */}
      <Section bg="white">
        <Heading tag="Offene Stellen" title="Finde deinen Platz bei uns" sub="Alle Positionen sind remote-friendly. Bewirb dich direkt per E-Mail." />
        <div className="max-w-[700px] mx-auto space-y-3">
          {JOBS.map((j, i) => (
            <FadeIn key={i} delay={i * 60}>
              <a href={`mailto:${BRAND.email}?subject=Bewerbung: ${j.title}`} className="card flex flex-col sm:flex-row sm:items-center gap-4 no-underline group cursor-pointer">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg text-ink group-hover:text-sp transition-colors">{j.title}</h3>
                  <p className="text-ink-muted text-sm mt-1">{j.desc}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted bg-surface-cool px-3 py-1 rounded-full">{j.type}</span>
                  <Arr s={16} />
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-ink py-16 md:py-20">
        <div className="wrap text-center max-w-[500px] mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Nichts Passendes dabei?</h2>
          <p className="text-white/40 text-[15px] leading-relaxed mb-8">Schick uns eine Initiativbewerbung — wir freuen uns immer ueber motivierte Talente.</p>
          <a href={`mailto:${BRAND.email}?subject=Initiativbewerbung`} className="btn-primary">Initiativ bewerben <Arr s={16}/></a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
