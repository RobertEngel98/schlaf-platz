"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  AnimatedNumber,
  Stars,
  FaqItem,
  Section,
  SectionHeader,
  Check,
  ArrowRight,
} from "@/components/ui";
import { BRAND } from "@/lib/constants";

// ─── Step Indicator ───────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2" style={{ flex: i < total - 1 ? 1 : "none" }}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-display font-bold shrink-0 transition-all duration-400 ${
              i < current
                ? "bg-brand-success text-white"
                : i === current
                  ? "bg-gradient-to-br from-brand-accent to-brand-accent-light text-white"
                  : "bg-brand-surface-alt text-gray-500"
            }`}
          >
            {i < current ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`flex-1 h-0.5 rounded-full transition-colors duration-400 ${i < current ? "bg-brand-success" : "bg-brand-surface-alt"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function MieterClient() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    type: "", city: "", persons: "", startDate: "", duration: "",
    notes: "", company: "", name: "", phone: "", email: "",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const canNext = (s: number) => {
    if (s === 0) return form.type && form.city && form.persons;
    if (s === 1) return form.startDate && form.duration;
    if (s === 2) return form.company && form.name && form.phone;
    return false;
  };

  return (
    <div className="font-body text-gray-900 bg-brand-surface">
      <Navbar />

      {/* ═══════════ HERO + FORM ═══════════ */}
      <section className="hero-gradient min-h-screen pt-[120px] pb-20 relative overflow-hidden">
        <div className="deco-circle w-[500px] h-[500px] top-[10%] -right-[8%]" />

        <div className="container-sp relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Copy */}
            <div className="flex-1 pt-6">
              <div className="inline-flex items-center gap-2 bg-white/[0.08] rounded-full px-4 py-2 mb-6 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
                <span className="text-white/80 text-[13px] font-display font-medium">
                  Antwort in Ø {BRAND.stats.responseMinutes} Minuten
                </span>
              </div>

              <h1 className="font-display font-extrabold text-white leading-[1.1] tracking-tight mb-5" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
                Finden Sie in{" "}
                <span className="text-gradient-accent">90 Sekunden</span>{" "}
                die passende Unterkunft.
              </h1>

              <p className="text-white/65 text-[17px] leading-relaxed max-w-[480px] mb-10">
                Ob 5-Mann-Team oder 100 Monteure — wir organisieren alles, von der Suche bis zur Anreise.
                Deutschlandweit, Österreich und Schweiz.
              </p>

              <div className="flex flex-col gap-5">
                {[
                  { icon: "🛡️", text: "Transparenzregister zum Schutz vor Problemgästen" },
                  { icon: "⏱️", text: "Persönlicher Rückruf innerhalb von 15 Minuten" },
                  { icon: "🏠", text: "Komplett möblierte Apartments mit Küche & WLAN" },
                  { icon: "📋", text: "Verlängerungen, Neubuchungen & Anreise organisiert" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-white/75 text-[15px]">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <p className="text-white/35 text-xs font-display font-semibold uppercase tracking-widest mb-4">
                  Vertraut von Unternehmen wie
                </p>
                <div className="flex gap-8 items-center opacity-40 flex-wrap">
                  {["Schlegel GmbH", "Johann Rohrer", "SIMA", "IB-IT"].map((n) => (
                    <span key={n} className="font-display font-bold text-sm text-white">{n}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="w-full lg:w-auto lg:min-w-[440px] lg:max-w-[480px] bg-white rounded-[20px] p-9 shadow-2xl">
              {!submitted ? (
                <>
                  <p className="section-label !mb-1">Kostenlos &amp; unverbindlich</p>
                  <h2 className="font-display font-extrabold text-[22px] text-brand-primary mb-1">
                    Unterkunft anfragen
                  </h2>
                  <p className="text-gray-500 text-sm mb-2">
                    {step === 0 && "Was suchen Sie?"}
                    {step === 1 && "Wann und wie lange?"}
                    {step === 2 && "Ihre Kontaktdaten"}
                  </p>

                  <StepIndicator current={step} total={3} />

                  {/* Step 1 */}
                  {step === 0 && (
                    <div className="flex flex-col gap-4 animate-slide-down">
                      <div>
                        <label className="label-sp">Art der Unterkunft</label>
                        <div className="flex flex-col gap-2">
                          {[
                            { v: "apartment", l: "🏠 Komplette Wohnung", s: "Voll möbliert mit Küche" },
                            { v: "zimmer", l: "🛏️ Einzelzimmer", s: "In Mehrzimmer-Wohnung" },
                            { v: "flexibel", l: "🔄 Flexibel", s: "Wir finden die beste Lösung" },
                          ].map((o) => (
                            <div
                              key={o.v}
                              onClick={() => set("type", o.v)}
                              className={`flex items-center gap-3 p-4 rounded-xl border-[1.5px] cursor-pointer transition-all ${
                                form.type === o.v
                                  ? "border-brand-accent bg-brand-accent/5 shadow-sm"
                                  : "border-brand-surface-alt bg-white hover:border-brand-accent/50"
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${form.type === o.v ? "border-brand-accent" : "border-brand-surface-alt"}`}>
                                {form.type === o.v && <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />}
                              </div>
                              <div>
                                <p className="font-semibold text-sm text-brand-primary m-0">{o.l}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{o.s}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="label-sp">Stadt / Region</label>
                        <select className="select-sp" value={form.city} onChange={(e) => set("city", e.target.value)}>
                          <option value="">Bitte wählen…</option>
                          {["Berlin", "München", "Hamburg", "Köln", "Frankfurt", "Düsseldorf", "Stuttgart", "Dortmund", "Essen", "Leipzig", "Andere Stadt"].map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label-sp">Anzahl Personen</label>
                        <select className="select-sp" value={form.persons} onChange={(e) => set("persons", e.target.value)}>
                          <option value="">Bitte wählen…</option>
                          <option value="1-5">1–5 Personen</option>
                          <option value="6-15">6–15 Personen</option>
                          <option value="16-50">16–50 Personen</option>
                          <option value="50+">50+ Personen</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 2 */}
                  {step === 1 && (
                    <div className="flex flex-col gap-4 animate-slide-down">
                      <div>
                        <label className="label-sp">Gewünschter Einzug</label>
                        <input type="date" className="input-sp" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
                      </div>
                      <div>
                        <label className="label-sp">Voraussichtliche Dauer</label>
                        <select className="select-sp" value={form.duration} onChange={(e) => set("duration", e.target.value)}>
                          <option value="">Bitte wählen…</option>
                          <option value="1-7d">1–7 Tage</option>
                          <option value="1-4w">1–4 Wochen</option>
                          <option value="1-3m">1–3 Monate</option>
                          <option value="3-6m">3–6 Monate</option>
                          <option value="6m+">Über 6 Monate</option>
                          <option value="offen">Noch unbestimmt</option>
                        </select>
                      </div>
                      <div>
                        <label className="label-sp">Besondere Anforderungen (optional)</label>
                        <textarea className="input-sp min-h-[80px] resize-y" placeholder="z.B. Parkplätze, Nähe Baustelle, Budget…" value={form.notes} onChange={(e) => set("notes", e.target.value)} />
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {step === 2 && (
                    <div className="flex flex-col gap-4 animate-slide-down">
                      <div>
                        <label className="label-sp">Firmenname</label>
                        <input className="input-sp" placeholder="Musterfirma GmbH" value={form.company} onChange={(e) => set("company", e.target.value)} />
                      </div>
                      <div>
                        <label className="label-sp">Ansprechpartner</label>
                        <input className="input-sp" placeholder="Max Mustermann" value={form.name} onChange={(e) => set("name", e.target.value)} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="label-sp">Telefon *</label>
                          <input className="input-sp" placeholder="+49 …" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                        </div>
                        <div>
                          <label className="label-sp">E-Mail (optional)</label>
                          <input className="input-sp" placeholder="info@firma.de" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 leading-snug">
                        Mit dem Absenden stimmen Sie unserer{" "}
                        <Link href="/datenschutzerklaerung" className="text-brand-accent">Datenschutzerklärung</Link> zu.
                      </p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3 mt-6">
                    {step > 0 && (
                      <button onClick={() => setStep(step - 1)} className="bg-brand-surface text-gray-500 border-none rounded-[10px] px-6 py-3.5 text-[15px] font-display font-semibold cursor-pointer">
                        Zurück
                      </button>
                    )}
                    {step < 2 ? (
                      <button
                        className="btn-primary flex-1 justify-center"
                        disabled={!canNext(step)}
                        onClick={() => setStep(step + 1)}
                      >
                        Weiter <ArrowRight />
                      </button>
                    ) : (
                      <button
                        className="btn-primary flex-1 justify-center"
                        disabled={!canNext(step)}
                        onClick={() => setSubmitted(true)}
                      >
                        Anfrage absenden ✉️
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* Success */
                <div className="text-center py-6 animate-fade-up">
                  <div className="w-[72px] h-[72px] rounded-full bg-brand-success-light flex items-center justify-center mx-auto mb-5 animate-scale-in">
                    <Check size={32} />
                  </div>
                  <h3 className="font-display font-extrabold text-[22px] text-brand-primary mb-2">
                    Anfrage erhalten!
                  </h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed mb-2">
                    Vielen Dank, <strong>{form.name || "wir melden uns"}</strong>!
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    Ihr persönlicher Berater meldet sich innerhalb von{" "}
                    <strong className="text-brand-success">15 Minuten</strong> telefonisch.
                  </p>
                  <div className="bg-brand-surface rounded-xl p-4 text-[13px] text-gray-500 leading-relaxed">
                    <strong className="text-brand-primary">Zusammenfassung:</strong><br />
                    {form.city} · {form.persons} Pers. · ab {form.startDate} · {form.duration}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PAIN POINTS ═══════════ */}
      <Section bg="surface">
        <SectionHeader label="Kennen Sie das?" title="Die typischen Probleme bei der Monteurzimmer-Suche" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "⏰", title: "Zeitaufwand", desc: "Ihre Fachkräfte investieren Stunden in die Suche statt in ihr Kerngeschäft. Vergleichen, anrufen, absagen — ein endloser Kreislauf." },
            { icon: "🛡️", title: "Verlässlichkeit", desc: "Zusagen werden nicht eingehalten, Fotos stimmen nicht mit der Realität überein. Ihre Monteure stehen vor verschlossenen Türen." },
            { icon: "👥", title: "Personelle Abhängigkeit", desc: "Wenn die eine Person, die sich um die Unterkünfte kümmert, ausfällt, bricht Chaos aus. Ein Single Point of Failure." },
          ].map((item, i) => (
            <div key={i} className="card p-8">
              <div className="w-[52px] h-[52px] rounded-xl bg-brand-accent/10 flex items-center justify-center mb-5 text-2xl">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-brand-primary mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════ SOLUTION ═══════════ */}
      <Section bg="white">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <SectionHeader label="Unsere Lösung" title="Eine Partnerschaft, die Ihnen wirklich weiterhilft" centered={false} />
            <p className="text-gray-500 text-base leading-relaxed mb-10 -mt-6">
              Unser {BRAND.stats.teamSize}-köpfiges Team arbeitet täglich daran, Unterkünfte zu organisieren — damit Sie sich auf Ihr Kerngeschäft konzentrieren können.
            </p>
            <div className="flex flex-col gap-6">
              {[
                { t: "Umfassende Expertise", d: "Von der Suche über die Buchung bis zur Anreise — alles aus einer Hand." },
                { t: "Langjährige Erfahrung", d: "Seit 2014 im Markt. 1.500+ verifizierte Partner. 223% Wachstum in 2023." },
                { t: "Skalierbar", d: "5-Mann-Team oder 100 Monteure — wir finden Lösungen in D-A-CH." },
                { t: "Transparenzregister", d: "Einzigartig: Unser Register schützt vor Problemgästen und unseriösen Vermietern." },
              ].map((b, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-[10px] bg-brand-success/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={20} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-brand-primary mb-1">{b.t}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed m-0">{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-auto lg:min-w-[320px]">
            <div className="stats-panel p-10 flex flex-col gap-7">
              {[
                { label: "Verifizierte Partner", value: <AnimatedNumber end={1500} suffix="+" /> },
                { label: "Google-Bewertung", value: "5.0 ⭐" },
                { label: "Ø Antwortzeit", value: "15 min" },
                { label: "Abgedeckte Städte", value: <AnimatedNumber end={50} suffix="+" /> },
              ].map((s, i) => (
                <div key={i} className={`flex justify-between items-center ${i < 3 ? "pb-5 border-b border-white/[0.08]" : ""}`}>
                  <span className="text-white/60 text-sm">{s.label}</span>
                  <span className="font-display font-extrabold text-[22px] text-white">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ FAQ ═══════════ */}
      <Section bg="surface">
        <div className="max-w-[800px] mx-auto">
          <SectionHeader label="Häufige Fragen" title="Alles, was Sie wissen müssen" />
          <div className="flex flex-col gap-3">
            {[
              { q: "Was kostet der Service für Mieter?", a: "Sie bezahlen den Mietpreis sowie ggf. Kaution oder Reinigungsgebühren. Unsere Vermittlung ist kostenfrei." },
              { q: "Wie schnell erhalte ich ein Angebot?", a: "Innerhalb von 15 Minuten erhalten Sie einen persönlichen Rückruf. Je nach Verfügbarkeit präsentieren wir innerhalb weniger Stunden passende Unterkünfte." },
              { q: "Kann ich auch für größere Teams buchen?", a: "Ja, ob 5 oder 100 Personen — wir haben Erfahrung mit Großabstellungen und finden auch für große Teams passende Unterkünfte." },
              { q: "In welchen Regionen sind Unterkünfte verfügbar?", a: "Deutschlandweit sowie in Österreich und der Schweiz. Schwerpunkte sind Berlin, München, Hamburg, Köln, Frankfurt, Düsseldorf, Stuttgart und weitere Großstädte." },
              { q: "Was ist das Transparenzregister?", a: "Unser einzigartiges System, bei dem Vermieter Firmen bewerten können. So schützen wir beide Seiten vor unseriösen Partnern." },
            ].map((f, i) => (
              <FaqItem key={i} question={f.q} answer={f.a} />
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="hero-gradient py-20 relative overflow-hidden">
        <div className="container-sp text-center relative z-10">
          <h2 className="font-display font-extrabold text-white leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}>
            Jetzt Unterkunft anfragen — in nur 90 Sekunden
          </h2>
          <p className="text-white/65 text-[17px] leading-relaxed max-w-[520px] mx-auto mb-8">
            Kostenlos, unverbindlich und mit persönlichem Rückruf innerhalb von 15 Minuten.
          </p>
          <button
            className="btn-primary text-[17px] !px-10 !py-[18px]"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Zum Anfrageformular ↑
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
