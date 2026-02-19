"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AnimatedNumber, Stars, FaqItem, Section, SectionHeader, Check, Arrow } from "@/components/ui";
import { BRAND } from "@/lib/constants";

function Steps({ cur, total }: { cur: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2" style={{ flex: i < total - 1 ? 1 : "none" }}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-display font-bold shrink-0 transition-all ${i < cur ? "bg-sp-green text-white" : i === cur ? "bg-gradient-to-br from-sp-gold to-sp-gold-light text-white" : "bg-sp-bg-alt text-gray-500"}`}>
            {i < cur ? "✓" : i + 1}
          </div>
          {i < total - 1 && <div className={`flex-1 h-0.5 rounded-full transition-colors ${i < cur ? "bg-sp-green" : "bg-sp-bg-alt"}`} />}
        </div>
      ))}
    </div>
  );
}

export default function MieterClient() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [f, setF] = useState({ type: "", city: "", persons: "", start: "", dur: "", notes: "", company: "", name: "", phone: "", email: "" });
  const s = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const ok = (n: number) => n === 0 ? f.type && f.city && f.persons : n === 1 ? f.start && f.dur : f.company && f.name && f.phone;

  return (
    <div>
      <Navbar />
      <section className="hero-bg min-h-screen pt-[120px] pb-20 relative overflow-hidden">
        <div className="wrap relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1 pt-6">
              <div className="inline-flex items-center gap-2 bg-white/[0.08] rounded-full px-4 py-2 mb-6 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-sp-green animate-pulse" />
                <span className="text-white/80 text-[13px] font-display font-medium">Antwort in 15 Minuten</span>
              </div>
              <h1 className="font-display font-extrabold text-white leading-[1.1] tracking-tight mb-5" style={{ fontSize: "clamp(32px,4.5vw,52px)" }}>
                Finden Sie in <span className="text-gradient-gold">90 Sekunden</span> die passende Unterkunft.
              </h1>
              <p className="text-white/65 text-[17px] leading-relaxed max-w-[480px] mb-10">Ob 5-Mann-Team oder 100 Monteure - wir organisieren alles.</p>
              <div className="flex flex-col gap-5">
                {[
                  { i: "🛡️", t: "Transparenzregister zum Schutz vor Problemgaesten" },
                  { i: "⏱️", t: "Persoenlicher Rueckruf innerhalb von 15 Minuten" },
                  { i: "🏠", t: "Komplett moeblierte Apartments mit Kueche & WLAN" },
                  { i: "📋", t: "Verlaengerungen, Neubuchungen & Anreise organisiert" },
                ].map((x, j) => <div key={j} className="flex items-center gap-3"><span className="text-xl">{x.i}</span><span className="text-white/75 text-[15px]">{x.t}</span></div>)}
              </div>
            </div>

            {/* FORM */}
            <div className="w-full lg:w-auto lg:min-w-[440px] lg:max-w-[480px] bg-white rounded-[20px] p-9 shadow-2xl">
              {!done ? (<>
                <p className="label-sm !mb-1">Kostenlos &amp; unverbindlich</p>
                <h2 className="font-display font-extrabold text-[22px] text-sp-blue mb-1">Unterkunft anfragen</h2>
                <p className="text-gray-500 text-sm mb-2">{["Was suchen Sie?", "Wann und wie lange?", "Ihre Kontaktdaten"][step]}</p>
                <Steps cur={step} total={3} />
                {step === 0 && (
                  <div className="flex flex-col gap-4 animate-slide-down">
                    <div><label className="label-field">Art der Unterkunft</label>
                      <div className="flex flex-col gap-2">
                        {[{ v: "apartment", l: "🏠 Komplette Wohnung" }, { v: "zimmer", l: "🛏️ Einzelzimmer" }, { v: "flexibel", l: "🔄 Flexibel" }].map(o => (
                          <div key={o.v} onClick={() => s("type", o.v)} className={`flex items-center gap-3 p-4 rounded-xl border-[1.5px] cursor-pointer transition-all ${f.type === o.v ? "border-sp-gold bg-sp-gold/5" : "border-sp-bg-alt hover:border-sp-gold/50"}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${f.type === o.v ? "border-sp-gold" : "border-sp-bg-alt"}`}>{f.type === o.v && <div className="w-2.5 h-2.5 rounded-full bg-sp-gold" />}</div>
                            <span className="font-semibold text-sm text-sp-blue">{o.l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div><label className="label-field">Stadt / Region</label>
                      <select className="select-field" value={f.city} onChange={e => s("city", e.target.value)}>
                        <option value="">Bitte waehlen...</option>
                        {["Berlin", "Muenchen", "Hamburg", "Koeln", "Frankfurt", "Duesseldorf", "Stuttgart", "Dortmund", "Essen", "Leipzig", "Andere Stadt"].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div><label className="label-field">Anzahl Personen</label>
                      <select className="select-field" value={f.persons} onChange={e => s("persons", e.target.value)}>
                        <option value="">Bitte waehlen...</option>
                        <option value="1-5">1-5 Personen</option><option value="6-15">6-15 Personen</option><option value="16-50">16-50 Personen</option><option value="50+">50+ Personen</option>
                      </select>
                    </div>
                  </div>
                )}
                {step === 1 && (
                  <div className="flex flex-col gap-4 animate-slide-down">
                    <div><label className="label-field">Gewuenschter Einzug</label><input type="date" className="input-field" value={f.start} onChange={e => s("start", e.target.value)} /></div>
                    <div><label className="label-field">Voraussichtliche Dauer</label>
                      <select className="select-field" value={f.dur} onChange={e => s("dur", e.target.value)}>
                        <option value="">Bitte waehlen...</option>
                        <option value="1-7d">1-7 Tage</option><option value="1-4w">1-4 Wochen</option><option value="1-3m">1-3 Monate</option><option value="3-6m">3-6 Monate</option><option value="6m+">Ueber 6 Monate</option>
                      </select>
                    </div>
                    <div><label className="label-field">Besondere Anforderungen (optional)</label><textarea className="input-field min-h-[80px] resize-y" placeholder="z.B. Parkplaetze, Naehe Baustelle..." value={f.notes} onChange={e => s("notes", e.target.value)} /></div>
                  </div>
                )}
                {step === 2 && (
                  <div className="flex flex-col gap-4 animate-slide-down">
                    <div><label className="label-field">Firmenname</label><input className="input-field" placeholder="Musterfirma GmbH" value={f.company} onChange={e => s("company", e.target.value)} /></div>
                    <div><label className="label-field">Ansprechpartner</label><input className="input-field" placeholder="Max Mustermann" value={f.name} onChange={e => s("name", e.target.value)} /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="label-field">Telefon *</label><input className="input-field" placeholder="+49 ..." type="tel" value={f.phone} onChange={e => s("phone", e.target.value)} /></div>
                      <div><label className="label-field">E-Mail (opt.)</label><input className="input-field" placeholder="info@firma.de" type="email" value={f.email} onChange={e => s("email", e.target.value)} /></div>
                    </div>
                    <p className="text-xs text-gray-500">Mit dem Absenden stimmen Sie unserer <Link href="/datenschutzerklaerung" className="text-sp-gold">Datenschutzerklaerung</Link> zu.</p>
                  </div>
                )}
                <div className="flex gap-3 mt-6">
                  {step > 0 && <button onClick={() => setStep(step - 1)} className="bg-sp-bg text-gray-500 border-none rounded-[10px] px-6 py-3.5 text-[15px] font-display font-semibold cursor-pointer">Zurueck</button>}
                  {step < 2 ? <button className="btn-gold flex-1 justify-center" disabled={!ok(step)} onClick={() => setStep(step + 1)}>Weiter <Arrow /></button>
                    : <button className="btn-gold flex-1 justify-center" disabled={!ok(step)} onClick={() => setDone(true)}>Anfrage absenden ✉️</button>}
                </div>
              </>) : (
                <div className="text-center py-6 animate-fade-up">
                  <div className="w-[72px] h-[72px] rounded-full bg-sp-green-light flex items-center justify-center mx-auto mb-5 animate-scale-in"><Check size={32} /></div>
                  <h3 className="font-display font-extrabold text-[22px] text-sp-blue mb-2">Anfrage erhalten!</h3>
                  <p className="text-gray-500 text-sm mb-6">Ihr Berater meldet sich innerhalb von <strong className="text-sp-green">15 Minuten</strong> telefonisch.</p>
                  <div className="bg-sp-bg rounded-xl p-4 text-[13px] text-gray-500">{f.city} - {f.persons} Pers. - ab {f.start} - {f.dur}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <Section bg="surface">
        <SectionHeader label="Kennen Sie das?" title="Die typischen Probleme bei der Monteurzimmer-Suche" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { i: "⏰", t: "Zeitaufwand", d: "Ihre Fachkraefte investieren Stunden in die Suche statt in ihr Kerngeschaeft." },
            { i: "🛡️", t: "Verlaesslichkeit", d: "Zusagen werden nicht eingehalten, Fotos stimmen nicht mit der Realitaet ueberein." },
            { i: "👥", t: "Personelle Abhaengigkeit", d: "Wenn die eine Person, die sich um Unterkuenfte kuemmert, ausfaellt, bricht Chaos aus." },
          ].map((x, j) => (
            <div key={j} className="card p-8">
              <div className="w-[52px] h-[52px] rounded-xl bg-sp-gold/10 flex items-center justify-center mb-5 text-2xl">{x.i}</div>
              <h3 className="font-display font-bold text-lg text-sp-blue mb-3">{x.t}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section bg="white">
        <div className="max-w-[800px] mx-auto">
          <SectionHeader label="Haeufige Fragen" title="Alles, was Sie wissen muessen" />
          <div className="flex flex-col gap-3">
            {[
              { q: "Was kostet der Service fuer Mieter?", a: "Sie bezahlen den Mietpreis sowie ggf. Kaution oder Reinigungsgebuehren. Unsere Vermittlung ist kostenfrei." },
              { q: "Wie schnell erhalte ich ein Angebot?", a: "Innerhalb von 15 Minuten erhalten Sie einen persoenlichen Rueckruf." },
              { q: "Kann ich auch fuer groessere Teams buchen?", a: "Ja, ob 5 oder 100 Personen - wir haben Erfahrung mit Grossabstellungen." },
              { q: "In welchen Regionen sind Unterkuenfte verfuegbar?", a: "Deutschlandweit sowie in Oesterreich und der Schweiz." },
              { q: "Was ist das Transparenzregister?", a: "Unser System, bei dem Vermieter Firmen bewerten koennen. So schuetzen wir beide Seiten." },
            ].map((x, j) => <FaqItem key={j} q={x.q} a={x.a} />)}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="hero-bg py-20">
        <div className="wrap text-center">
          <h2 className="font-display font-extrabold text-white text-2xl md:text-3xl mb-4">Jetzt Unterkunft anfragen</h2>
          <p className="text-white/65 text-[17px] max-w-[520px] mx-auto mb-8">Kostenlos, unverbindlich und mit persoenlichem Rueckruf innerhalb von 15 Minuten.</p>
          <button className="btn-gold text-[17px] !px-10 !py-[18px]" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Zum Anfrageformular</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
