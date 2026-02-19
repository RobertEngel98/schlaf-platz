"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Arr, FadeIn } from "@/components/ui";
import { BRAND } from "@/lib/constants";

export default function KarriereClient() {
  return (
    <div className="bg-[#0a0a0a]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-sp/[0.05] blur-[100px]" />
        <div className="wrap relative z-10 max-w-[650px]">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.15em] mb-5">Karriere bei Schlaf-Platz</p>
          <h1 className="font-display text-4xl md:text-5xl text-white leading-[1.1] tracking-tight mb-5">Gestalte die Zukunft des Wohnens mit.</h1>
          <p className="text-white/40 text-lg leading-relaxed">Werde Teil unseres wachsenden Teams und hilf tausenden Handwerkern, ein Zuhause auf Zeit zu finden.</p>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-white/[0.06] py-6">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "23", l: "Mitarbeiter" },
            { v: "223%", l: "Umsatzwachstum" },
            { v: "50+", l: "Staedte" },
            { v: "100%", l: "Remote moeglich" },
          ].map(s => (
            <div key={s.l}>
              <p className="text-2xl md:text-3xl font-bold text-white m-0">{s.v}</p>
              <p className="text-[11px] text-white/25 uppercase tracking-widest mt-1 m-0">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="wrap">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.15em] mb-4">Unsere Geschichte</p>
          <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-14">Von der Idee zum Marktfuehrer.</h2>
          <div className="space-y-0 max-w-[600px]">
            {[
              { y: "2014", t: "Gruendung durch Viktor Brehm" },
              { y: "2018", t: "1.000 Partner-Meilenstein erreicht" },
              { y: "2021", t: "Launch Transparenzregister" },
              { y: "2023", t: "Expansion auf 50+ Staedte" },
              { y: "2025", t: "App-Launch & 1.500+ Partner" },
            ].map((e, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="flex gap-5 items-start pb-8 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-sp shrink-0 mt-1" />
                    {i < 4 && <div className="w-px flex-1 bg-white/[0.06] mt-1" />}
                  </div>
                  <div className="pb-2">
                    <p className="text-sp text-[12px] font-bold uppercase tracking-widest mb-1">{e.y}</p>
                    <p className="text-white/70 text-[15px] m-0">{e.t}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="wrap">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.15em] mb-4">Offene Stellen</p>
          <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-14">Werde Teil des Teams.</h2>
          <div className="space-y-4">
            {[
              { t: "Vertriebsmitarbeiter (m/w/d)", tag: "Vollzeit", l: "Remote / Duesseldorf" },
              { t: "Kundenbetreuer (m/w/d)", tag: "Vollzeit", l: "Remote" },
              { t: "Agenturpartner (m/w/d)", tag: "Freiberuflich", l: "Deutschlandweit" },
              { t: "Werkstudent Marketing (m/w/d)", tag: "Teilzeit", l: "Remote / Duesseldorf" },
            ].map((j, i) => (
              <FadeIn key={i} delay={i * 60}>
                <a href={`mailto:${BRAND.email}?subject=Bewerbung: ${j.t}`} className="group flex items-center justify-between gap-4 border border-white/[0.06] rounded-2xl p-6 bg-white/[0.02] hover:border-sp/30 hover:bg-sp/[0.03] transition-all no-underline">
                  <div>
                    <p className="text-white font-bold text-base group-hover:text-sp transition-colors m-0">{j.t}</p>
                    <p className="text-white/30 text-[13px] mt-1 m-0">{j.tag} &middot; {j.l}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/30 group-hover:text-sp group-hover:bg-sp/10 transition-all shrink-0">
                    <Arr s={16} />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300}>
            <div className="mt-10 border border-white/[0.06] rounded-2xl p-8 bg-white/[0.02] text-center">
              <h3 className="text-white font-bold text-lg mb-2">Nichts Passendes dabei?</h3>
              <p className="text-white/40 text-sm mb-4">Sende uns eine Initiativbewerbung — wir sind immer auf der Suche nach Talenten.</p>
              <a href={`mailto:${BRAND.email}?subject=Initiativbewerbung`} className="cta-green">Initiativbewerbung senden <Arr s={16} /></a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
