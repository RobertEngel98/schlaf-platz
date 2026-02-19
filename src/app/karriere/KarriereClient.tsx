"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Arr, FadeIn } from "@/components/ui";
import { BRAND } from "@/lib/constants";

export default function KarriereClient() {
  return (
    <div className="bg-[#0a0a0a]">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-sp/[0.06] blur-[120px]" />
        <div className="wrap relative z-10 max-w-[650px]">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-5">Karriere bei Schlaf-Platz</p>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-[0.95] uppercase tracking-wide mb-5">Gestalte die Zukunft<br /><span className="text-sp">des Wohnens mit.</span></h1>
          <p className="text-white/35 text-lg leading-relaxed">Werde Teil unseres wachsenden Teams und hilf tausenden Handwerkern, ein Zuhause auf Zeit zu finden.</p>
        </div>
      </section>

      <div className="border-y border-white/[0.06] py-6">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ v: "23", l: "Mitarbeiter" },{ v: "223%", l: "Umsatzwachstum" },{ v: "50+", l: "Staedte" },{ v: "100%", l: "Remote moeglich" }].map(s => (
            <div key={s.l}>
              <p className="font-display text-3xl md:text-4xl text-white tracking-wide m-0">{s.v}</p>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.15em] font-bold mt-1 m-0">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="wrap">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-4">Unsere Geschichte</p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-[0.95] uppercase tracking-wide mb-14">Von der Idee<br />zum Marktfuehrer.</h2>
          <div className="space-y-0 max-w-[600px]">
            {[{ y: "2014", t: "Gruendung durch Viktor Brehm" },{ y: "2018", t: "1.000 Partner-Meilenstein erreicht" },{ y: "2021", t: "Launch Transparenzregister" },{ y: "2023", t: "Expansion auf 50+ Staedte" },{ y: "2025", t: "App-Launch & 1.500+ Partner" }].map((e, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="flex gap-5 items-start pb-8 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-sp shrink-0 mt-1" />
                    {i < 4 && <div className="w-px flex-1 bg-white/[0.06] mt-1" />}
                  </div>
                  <div className="pb-2">
                    <p className="text-sp text-[12px] font-bold uppercase tracking-[0.15em] mb-1">{e.y}</p>
                    <p className="text-white/60 text-[15px] m-0">{e.t}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="wrap">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-4">Offene Stellen</p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-[0.95] uppercase tracking-wide mb-14">Werde Teil<br />des Teams.</h2>
          <div className="space-y-4">
            {[{ t: "Vertriebsmitarbeiter (m/w/d)", tag: "Vollzeit", l: "Remote / Duesseldorf" },{ t: "Kundenbetreuer (m/w/d)", tag: "Vollzeit", l: "Remote" },{ t: "Agenturpartner (m/w/d)", tag: "Freiberuflich", l: "Deutschlandweit" },{ t: "Werkstudent Marketing (m/w/d)", tag: "Teilzeit", l: "Remote / Duesseldorf" }].map((j, i) => (
              <FadeIn key={i} delay={i * 60}>
                <a href={`mailto:${BRAND.email}?subject=Bewerbung: ${j.t}`} className="group flex items-center justify-between gap-4 border border-white/[0.06] rounded-2xl p-6 bg-white/[0.02] hover:border-sp/30 hover:bg-sp/[0.03] transition-all no-underline">
                  <div>
                    <p className="text-white font-bold text-base group-hover:text-sp transition-colors m-0">{j.t}</p>
                    <p className="text-white/25 text-[13px] mt-1 m-0">{j.tag} &middot; {j.l}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/25 group-hover:text-sp group-hover:bg-sp/10 transition-all shrink-0"><Arr s={16} /></div>
                </a>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300}>
            <div className="mt-10 border border-white/[0.06] rounded-2xl p-8 bg-white/[0.02] text-center">
              <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-2">Nichts Passendes dabei?</h3>
              <p className="text-white/35 text-sm mb-4">Sende uns eine Initiativbewerbung — wir sind immer auf der Suche nach Talenten.</p>
              <a href={`mailto:${BRAND.email}?subject=Initiativbewerbung`} className="cta-primary">Initiativbewerbung senden <Arr s={16} /></a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
