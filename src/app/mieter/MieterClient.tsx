"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Faq, Chk, FadeIn, Arr } from "@/components/ui";
import { BRAND, CITIES } from "@/lib/constants";

export default function MieterClient() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-[#0a0a0a]">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-sp/[0.06] blur-[120px]" />
        <div className="wrap relative z-10 max-w-[600px]">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-5">Monteurzimmer anfragen</p>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-[0.95] uppercase tracking-wide mb-5">Unterkunft finden —<br /><span className="text-sp">schnell &amp; persoenlich.</span></h1>
          <p className="text-white/35 text-lg leading-relaxed">Senden Sie Ihre Anfrage und erhalten Sie innerhalb von 15 Minuten einen persoenlichen Rueckruf von Ihrem Berater.</p>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-white/[0.06]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl text-white uppercase tracking-wide mb-6">Anfrage senden</h2>
              {sent ? (
                <div className="border border-sp/20 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, rgba(2,159,222,0.08), rgba(2,159,222,0.02))" }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #029fde, #0178a8)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-2">Anfrage gesendet!</h3>
                  <p className="text-white/45 text-sm">Wir melden uns innerhalb von 15 Minuten persoenlich bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-white/35 uppercase tracking-[0.15em] mb-2">Firma *</label>
                      <input type="text" required placeholder="Mustermann GmbH" className="input-dark" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/35 uppercase tracking-[0.15em] mb-2">Ansprechpartner *</label>
                      <input type="text" required placeholder="Max Mustermann" className="input-dark" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-white/35 uppercase tracking-[0.15em] mb-2">E-Mail *</label>
                      <input type="email" required placeholder="max@firma.de" className="input-dark" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/35 uppercase tracking-[0.15em] mb-2">Telefon *</label>
                      <input type="tel" required placeholder="+49 170 1234567" className="input-dark" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-white/35 uppercase tracking-[0.15em] mb-2">Stadt *</label>
                      <select required className="input-dark appearance-none">
                        <option value="">Stadt waehlen</option>
                        {CITIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/35 uppercase tracking-[0.15em] mb-2">Personen *</label>
                      <input type="number" required min="1" placeholder="z.B. 5" className="input-dark" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/35 uppercase tracking-[0.15em] mb-2">Zeitraum</label>
                      <input type="text" placeholder="z.B. 3 Monate" className="input-dark" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/35 uppercase tracking-[0.15em] mb-2">Nachricht</label>
                    <textarea rows={3} placeholder="Weitere Informationen..." className="input-dark resize-none" />
                  </div>
                  <button type="submit" className="cta-primary w-full sm:w-auto !py-4 !px-10 text-base mt-2">Anfrage absenden <Arr s={16} /></button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="border border-white/[0.06] rounded-2xl bg-white/[0.02] p-7 mb-5">
                <h3 className="font-display text-xl text-white uppercase tracking-wide mb-4">Ihre Vorteile</h3>
                <div className="space-y-3">
                  {["Persoenlicher Rueckruf in 15 Min.","Komplett moeblierte Apartments","Keine Buchungsgebuehren","Transparenzregister fuer Sicherheit","Flexible Verlaengerungen"].map(t => (
                    <div key={t} className="flex items-center gap-3"><Chk /><span className="text-sm text-white/45">{t}</span></div>
                  ))}
                </div>
              </div>
              <div className="border border-sp/20 rounded-2xl p-7" style={{ background: "linear-gradient(135deg, rgba(2,159,222,0.06), rgba(2,159,222,0.02))" }}>
                <p className="text-[10px] uppercase tracking-[0.15em] text-sp font-bold mb-3">Direkter Kontakt</p>
                <p className="text-white text-xl font-display uppercase tracking-wide mb-1">{BRAND.phonePretty}</p>
                <p className="text-white/35 text-sm mb-4">Mo–Fr, 08:00–18:00 Uhr</p>
                <a href={`tel:${BRAND.phone}`} className="cta-primary w-full text-center text-sm">Jetzt anrufen <Arr s={14} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-white/[0.06]">
        <div className="wrap max-w-[700px] mx-auto">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-4 text-center">FAQ</p>
          <h2 className="font-display text-4xl text-white text-center uppercase tracking-wide mb-10">Fragen zur Anmietung</h2>
          {[
            { q: "Wie schnell bekomme ich eine Unterkunft?", a: "In der Regel koennen wir innerhalb von 24-48 Stunden eine passende Unterkunft bereitstellen. Bei dringenden Anfragen oft noch am selben Tag." },
            { q: "Was kostet ein Monteurzimmer bei Schlaf-Platz?", a: "Die Preise variieren je nach Stadt, Lage und Ausstattung. Kontaktieren Sie uns fuer ein individuelles Angebot — die Vermittlung durch Schlaf-Platz ist fuer Sie komplett kostenfrei." },
            { q: "Kann ich die Buchung verlaengern oder stornieren?", a: "Ja, Verlaengerungen sind jederzeit moeglich und Stornierungen nach individueller Absprache. Ihr persoenlicher Berater kuemmert sich um alles." },
          ].map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
}
