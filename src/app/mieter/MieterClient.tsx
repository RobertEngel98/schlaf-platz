"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Section, Heading, Tag, Faq, Chk, FadeIn } from "@/components/ui";
import { BRAND, CITIES } from "@/lib/constants";

export default function MieterClient() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-ink pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-sp/8 blur-[100px]" />
        <div className="wrap relative z-10 max-w-[600px]">
          <Tag variant="light">Fuer Unternehmen &amp; Handwerker</Tag>
          <h1 className="font-display text-4xl md:text-5xl text-white leading-[1.1] tracking-tight mt-5 mb-5">Unterkunft finden — schnell &amp; persoenlich.</h1>
          <p className="text-white/45 text-lg leading-relaxed">Senden Sie Ihre Anfrage und erhalten Sie innerhalb von 15 Minuten einen persoenlichen Rueckruf.</p>
        </div>
      </section>

      {/* Form section */}
      <Section bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl text-ink mb-6">Anfrage senden</h2>
            {sent ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h3 className="font-display text-xl text-ink mb-2">Anfrage gesendet!</h3>
                <p className="text-ink-light text-sm">Wir melden uns innerhalb von 15 Minuten bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink-light uppercase tracking-widest mb-2">Firma *</label>
                    <input type="text" required placeholder="Mustermann GmbH" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-light uppercase tracking-widest mb-2">Ansprechpartner *</label>
                    <input type="text" required placeholder="Max Mustermann" className="input-field" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink-light uppercase tracking-widest mb-2">E-Mail *</label>
                    <input type="email" required placeholder="max@firma.de" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-light uppercase tracking-widest mb-2">Telefon *</label>
                    <input type="tel" required placeholder="+49 170 1234567" className="input-field" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink-light uppercase tracking-widest mb-2">Stadt *</label>
                    <select required className="input-field appearance-none">
                      <option value="">Stadt waehlen</option>
                      {CITIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-light uppercase tracking-widest mb-2">Personen *</label>
                    <input type="number" required min="1" placeholder="z.B. 5" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-light uppercase tracking-widest mb-2">Zeitraum</label>
                    <input type="text" placeholder="z.B. 3 Monate" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-light uppercase tracking-widest mb-2">Nachricht</label>
                  <textarea rows={3} placeholder="Weitere Informationen..." className="input-field resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full sm:w-auto !py-4 !px-10 text-base mt-2">Anfrage senden</button>
              </form>
            )}
          </div>

          {/* Side info */}
          <div className="lg:col-span-5">
            <div className="bg-surface-cool rounded-2xl border border-surface-dim p-7 mb-5">
              <h3 className="font-display text-lg text-ink mb-4">Warum Schlaf-Platz?</h3>
              <div className="space-y-3">
                {["Persoenlicher Rueckruf in 15 Min.", "Komplett moeblierte Apartments", "Keine Buchungsgebuehren", "Transparenzregister fuer Sicherheit", "Verlaengerungen jederzeit moeglich"].map(t => (
                  <div key={t} className="flex items-center gap-3">
                    <Chk />
                    <span className="text-sm text-ink-light">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-ink rounded-2xl p-7">
              <p className="text-[11px] uppercase tracking-widest text-white/30 mb-3">Direkter Kontakt</p>
              <p className="text-white text-lg font-bold font-display mb-1">{BRAND.phonePretty}</p>
              <p className="text-white/40 text-sm mb-4">Mo–Fr, 08:00–18:00 Uhr</p>
              <a href={`tel:${BRAND.phone}`} className="btn-primary w-full text-center text-sm">Jetzt anrufen</a>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section bg="cool">
        <Heading tag="FAQ" title="Fragen zur Anmietung" />
        <div className="max-w-[700px] mx-auto">
          {[
            { q: "Wie schnell bekomme ich eine Unterkunft?", a: "In der Regel koennen wir innerhalb von 24-48 Stunden eine passende Unterkunft bereitstellen. Bei dringenden Anfragen oft noch am selben Tag." },
            { q: "Was kostet ein Monteurzimmer?", a: "Die Preise variieren je nach Stadt und Ausstattung. Kontaktieren Sie uns fuer ein individuelles Angebot — die Vermittlung ist fuer Sie kostenfrei." },
            { q: "Kann ich die Buchung verlaengern?", a: "Ja, Verlaengerungen sind jederzeit moeglich. Sprechen Sie einfach Ihren Berater an, der kuemmert sich um alles." },
          ].map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
        </div>
      </Section>

      <Footer />
    </div>
  );
}
