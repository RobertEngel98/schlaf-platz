"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnfrageForm from "@/components/AnfrageForm";
import { Stars, Faq } from "@/components/ui";
import { BRAND } from "@/lib/constants";

export default function MieterClient() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-[#0b1220] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-sp/[0.08] blur-[120px]" />
        </div>
        <div className="wrap relative z-10 pt-28 pb-12 md:pt-36 md:pb-14">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-5">Monteurzimmer anfragen</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-[0.95] tracking-wide uppercase mb-5">
            Unterkunft finden —<br /><span className="text-sp">schnell &amp; persoenlich.</span>
          </h1>
          <p className="text-white/40 text-lg leading-relaxed max-w-[560px] mb-5">
            Senden Sie Ihre Anfrage und erhalten Sie innerhalb von <strong className="text-white">15 Minuten</strong> einen persoenlichen Rueckruf von Ihrem Berater.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Stars size={14} />
              <span className="text-white/50 text-[13px]"><strong className="text-white">{BRAND.stats.rating}</strong>/5 bei <strong className="text-white">{BRAND.stats.reviews}+</strong> Bewertungen</span>
            </div>
            <span className="text-white/15">|</span>
            <span className="text-white/40 text-[13px]">100% kostenlose Vermittlung</span>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-12 md:py-16">
        <div className="wrap">
          <AnfrageForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-14 border-t border-gray-100">
        <div className="wrap max-w-[700px] mx-auto">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3 text-center">FAQ</p>
          <h2 className="font-display text-4xl text-ink text-center uppercase tracking-wide mb-8">Fragen zur Anmietung</h2>
          {[
            { q: "Wie schnell bekomme ich eine Unterkunft?", a: "In der Regel innerhalb von 24-48 Stunden. Bei dringenden Anfragen oft noch am selben Tag." },
            { q: "Was kostet ein Monteurzimmer?", a: "Die Preise variieren je nach Stadt und Ausstattung. Kontaktieren Sie uns fuer ein individuelles Angebot — die Vermittlung ist komplett kostenfrei." },
            { q: "Kann ich die Buchung verlaengern oder stornieren?", a: "Ja, Verlaengerungen sind jederzeit moeglich und Stornierungen nach individueller Absprache." },
          ].map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
}
