"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Arr, FadeIn } from "@/components/ui";
import { BRAND } from "@/lib/constants";

export default function KarriereClient() {
  return (
    <div className="bg-white">
      <Navbar />

      <section className="pt-32 pb-10 md:pt-40 md:pb-12">
        <div className="wrap max-w-[650px]">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-4">Karriere bei Schlaf-Platz</p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-[0.95] uppercase tracking-wide mb-4">Gestalte die Zukunft <span className="text-sp">des Wohnens mit.</span></h1>
          <p className="text-gray-400 text-lg leading-relaxed">Werde Teil unseres wachsenden Teams und hilf tausenden Handwerkern, ein Zuhause auf Zeit zu finden.</p>
        </div>
      </section>

      <div className="border-y border-gray-100 py-5 bg-gray-50/50">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ v: "23", l: "Mitarbeiter" },{ v: "223%", l: "Umsatzwachstum" },{ v: "50+", l: "Staedte" },{ v: "100%", l: "Remote moeglich" }].map(s => (
            <div key={s.l}>
              <p className="font-display text-3xl md:text-4xl text-ink tracking-wide m-0">{s.v}</p>
              <p className="text-[10px] text-gray-300 uppercase tracking-[0.15em] font-bold mt-1 m-0">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="py-12 md:py-16 border-b border-gray-100">
        <div className="wrap">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Unsere Geschichte</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[0.95] uppercase tracking-wide mb-10">Von der Idee zum Marktfuehrer.</h2>
          <div className="space-y-0 max-w-[550px]">
            {[{ y: "2014", t: "Gruendung durch Viktor Brehm" },{ y: "2018", t: "1.000 Partner-Meilenstein erreicht" },{ y: "2021", t: "Launch Transparenzregister" },{ y: "2023", t: "Expansion auf 50+ Staedte" },{ y: "2025", t: "App-Launch & 1.500+ Partner" }].map((e, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="flex gap-5 items-start pb-6 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-sp shrink-0 mt-1" />
                    {i < 4 && <div className="w-px flex-1 bg-gray-100 mt-1" />}
                  </div>
                  <div className="pb-1">
                    <p className="text-sp text-[12px] font-bold uppercase tracking-[0.15em] mb-0.5">{e.y}</p>
                    <p className="text-gray-500 text-[15px] m-0">{e.t}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="wrap">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Offene Stellen</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[0.95] uppercase tracking-wide mb-10">Werde Teil des Teams.</h2>
          <div className="space-y-3">
            {[{ t: "Vertriebsmitarbeiter (m/w/d)", tag: "Vollzeit", l: "Remote / Duesseldorf" },{ t: "Kundenbetreuer (m/w/d)", tag: "Vollzeit", l: "Remote" },{ t: "Agenturpartner (m/w/d)", tag: "Freiberuflich", l: "Deutschlandweit" },{ t: "Werkstudent Marketing (m/w/d)", tag: "Teilzeit", l: "Remote / Duesseldorf" }].map((j, i) => (
              <FadeIn key={i} delay={i * 50}>
                <a href={`mailto:${BRAND.email}?subject=Bewerbung: ${j.t}`} className="group flex items-center justify-between gap-4 border border-gray-100 rounded-2xl p-5 bg-white hover:border-sp/30 hover:shadow-md hover:shadow-sp/5 transition-all no-underline">
                  <div>
                    <p className="text-ink font-bold text-base group-hover:text-sp transition-colors m-0">{j.t}</p>
                    <p className="text-gray-300 text-[13px] mt-1 m-0">{j.tag} &middot; {j.l}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-sp group-hover:bg-sp/8 transition-all shrink-0"><Arr s={16} /></div>
                </a>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={250}>
            <div className="mt-8 border border-gray-100 rounded-2xl p-7 bg-gray-50/50 text-center">
              <h3 className="font-display text-2xl text-ink uppercase tracking-wide mb-2">Nichts Passendes dabei?</h3>
              <p className="text-gray-400 text-sm mb-4">Sende uns eine Initiativbewerbung — wir sind immer auf der Suche nach Talenten.</p>
              <a href={`mailto:${BRAND.email}?subject=Initiativbewerbung`} className="cta-primary">Initiativbewerbung senden <Arr s={16} /></a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
