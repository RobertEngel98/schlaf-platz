"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Stars, Arr, Chk, Faq, FadeIn } from "@/components/ui";
import { BRAND } from "@/lib/constants";

interface RegForm {
  name: string;
  email: string;
  telefon: string;
  adresse: string;
  wohnungen: string;
  nachricht: string;
}

const INITIAL: RegForm = { name: "", email: "", telefon: "", adresse: "", wohnungen: "", nachricht: "" };

export default function VermieterClient() {
  const [form, setForm] = useState<RegForm>(INITIAL);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof RegForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, typ: "vermieter" }),
      });
      if (!res.ok) throw new Error("Fehler");
      setSent(true);
    } catch {
      setError("Es gab einen Fehler. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative bg-[#0b1220] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full bg-sp/[0.08] blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-sp/[0.05] blur-[120px]" />
        </div>
        <div className="wrap relative z-10 pt-28 pb-14 md:pt-36 md:pb-16 max-w-[800px]">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-4">Fuer Vermieter &amp; Eigentuemer</p>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-[0.95] uppercase tracking-wide mb-5">
            Monteurzimmer vermieten — <span className="text-sp">kostenlos.</span>
          </h1>
          <p className="text-white/40 text-lg leading-relaxed mb-6 max-w-[600px]">
            Registrieren Sie Ihre Wohnung auf Schlaf-Platz und erreichen Sie tausende Handwerksfirmen in ganz Deutschland. <strong className="text-white">0 Euro Gebuehren — dauerhaft.</strong>
          </p>
          <div className="flex items-center gap-3 flex-wrap mb-8">
            <div className="flex items-center gap-1.5">
              <Stars size={14} />
              <span className="text-white/50 text-[13px]"><strong className="text-white">{BRAND.stats.rating}</strong>/5 bei <strong className="text-white">{BRAND.stats.reviews}+</strong> Bewertungen</span>
            </div>
            <span className="text-white/15">|</span>
            <span className="text-white/40 text-[13px]"><strong className="text-white">{BRAND.stats.partners.toLocaleString("de-DE")}+</strong> Partner deutschlandweit</span>
          </div>
          <a href="#registrieren" className="cta-primary text-base !px-8 !py-4">Jetzt kostenlos inserieren <Arr s={18} /></a>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <div className="border-b border-gray-100 py-5 bg-gray-50/50">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ v: "0€", l: "Gebuehren" }, { v: `${BRAND.stats.partners.toLocaleString("de-DE")}+`, l: "Partner" }, { v: "50+", l: "Staedte" }, { v: "15 Min", l: "Rueckrufzeit" }].map(s => (
            <div key={s.l}>
              <p className="text-base md:text-lg font-bold text-ink m-0">{s.v}</p>
              <p className="text-[10px] text-gray-300 uppercase tracking-[0.15em] font-bold mt-1 m-0">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ VORTEILE ═══ */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Ihre Vorteile</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide mb-10">
              Warum Vermieter <span className="text-sp">Schlaf-Platz waehlen.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "💰", badge: "100% Kostenfrei", t: "Null Euro. Immer.", d: "Waehrend andere Plattformen bis zu 300€ pro Jahr verlangen, ist Schlaf-Platz fuer Vermieter dauerhaft kostenlos. Keine Anmeldegebuehren, keine versteckten Kosten, keine Provisionen." },
              { icon: "🛡️", badge: "Einzigartig in DE", t: "Transparenzregister", d: "Mieter bewerten Vermieter, Vermieter bewerten Mieter. Vollstaendige Transparenz und Schutz vor unzuverlaessigen Partnern — das gibt es nur bei Schlaf-Platz." },
              { icon: "📱", badge: "Kostenlose App", t: "Verwaltung von ueberall", d: "Mit der Schlaf-Platz App verwalten Sie Inserate, erhalten Push-Benachrichtigungen und kommunizieren direkt mit Interessenten — alles von Ihrem Smartphone." },
            ].map((v, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="border border-gray-100 rounded-2xl p-6 bg-white h-full hover:shadow-lg hover:shadow-gray-100/80 transition-all">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-2xl">{v.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sp bg-sp/8 px-3 py-1 rounded-full">{v.badge}</span>
                  </div>
                  <h3 className="text-ink font-bold text-lg mb-2">{v.t}</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed m-0">{v.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SO FUNKTIONIERT ES ═══ */}
      <section className="py-14 md:py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">So funktioniert&apos;s</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide mb-10">
              In 3 Schritten zum <span className="text-sp">erfolgreichen Inserat.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: "01", t: "Kostenlos registrieren", d: "Fuellen Sie das Formular aus oder laden Sie die App herunter. Innerhalb von 15 Minuten meldet sich Ihr Ansprechpartner.", checks: ["Keine Gebuehren", "Kein Vertrag", "In 2 Minuten erledigt"] },
              { n: "02", t: "Inserat erstellen", d: "Beschreiben Sie Ihre Wohnung mit Fotos, Ausstattung und Preis. Unser Team unterstuetzt Sie bei der optimalen Praesentation.", checks: ["Professionelle Hilfe", "Optimale Sichtbarkeit", "Fotos & Beschreibung"] },
              { n: "03", t: "Anfragen erhalten", d: "Sie erhalten qualifizierte Anfragen von geprueften Handwerksfirmen. Sie entscheiden, wen Sie annehmen — volle Kontrolle.", checks: ["Geprufte Anfragen", "Volle Kontrolle", "Persoenlicher Support"] },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="border border-gray-100 rounded-2xl p-6 bg-white h-full flex flex-col group hover:shadow-lg hover:shadow-gray-100/80 transition-all">
                  <div className="font-display text-5xl text-sp/15 group-hover:text-sp/30 transition-colors mb-3">{s.n}</div>
                  <h3 className="text-ink font-bold text-lg mb-2">{s.t}</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed mb-4">{s.d}</p>
                  <div className="space-y-2 mt-auto">
                    {s.checks.map(c => (
                      <div key={c} className="flex items-center gap-2.5"><Chk /><span className="text-gray-400 text-[13px]">{c}</span></div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VERGLEICH ═══ */}
      <section className="py-14 md:py-20">
        <div className="wrap max-w-[800px]">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Vergleich</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide mb-10">
              Schlaf-Platz vs. <span className="text-sp">andere Plattformen.</span>
            </h2>
          </FadeIn>
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="p-4 text-gray-400 font-bold text-[11px] uppercase tracking-[0.15em]">Merkmal</th>
                  <th className="p-4 text-sp font-bold text-[11px] uppercase tracking-[0.15em]">Schlaf-Platz</th>
                  <th className="p-4 text-gray-400 font-bold text-[11px] uppercase tracking-[0.15em]">Andere</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Kosten fuer Vermieter", sp: "0 € — dauerhaft", other: "Bis zu 300 €/Jahr" },
                  { f: "Persoenlicher Ansprechpartner", sp: "Ja, immer", other: "Oft nur Ticket-System" },
                  { f: "Transparenzregister", sp: "Gegenseitige Bewertungen", other: "Nicht vorhanden" },
                  { f: "Rueckruf-Garantie", sp: "Innerhalb 15 Minuten", other: "Keine Garantie" },
                  { f: "Provision pro Buchung", sp: "0 %", other: "Bis zu 15 %" },
                  { f: "App fuer Verwaltung", sp: "iOS & Android", other: "Teilweise" },
                ].map((r, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="p-4 text-ink font-medium">{r.f}</td>
                    <td className="p-4 text-sp font-bold">{r.sp}</td>
                    <td className="p-4 text-gray-400">{r.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-14 md:py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Vermieterstimmen</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide mb-10">
              Das sagen unsere <span className="text-sp">Vermieter.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { q: "Die Kommunikation war einwandfrei, die Gaeste waren freundlich und anstaendig. Wir freuen uns auf die weitere Zusammenarbeit mit Schlaf-Platz!", name: "Lisa Werkmeister", role: "Vermieterin seit 2021", init: "L" },
              { q: "Endlich eine Plattform ohne versteckte Kosten! Schlaf-Platz hat unser Vermieter-Leben deutlich einfacher gemacht. Klare Empfehlung.", name: "Thomas Fischer", role: "Vermieter seit 2022", init: "T" },
              { q: "Durch das Transparenzregister wissen wir genau, wen wir in unsere Wohnung lassen. Das gibt enorme Sicherheit. Top Service!", name: "Wohnraum KKBBG", role: "Vermieter seit 2023", init: "W" },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="border border-gray-100 rounded-2xl p-6 bg-white h-full flex flex-col hover:shadow-lg hover:shadow-gray-100/80 transition-all">
                  <Stars size={14} />
                  <p className="text-gray-500 text-[15px] leading-relaxed mt-3 mb-5 flex-1">&bdquo;{t.q}&ldquo;</p>
                  <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #029fde, #0178a8)" }}>{t.init}</div>
                    <div>
                      <p className="font-bold text-[14px] text-ink m-0">{t.name}</p>
                      <p className="text-[12px] text-gray-300 m-0">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEO ARTIKEL ═══ */}
      <section className="py-12 md:py-16 border-b border-gray-100">
        <div className="wrap max-w-[800px]">
          <div className="prose max-w-none text-[16px] leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-ink [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-ink [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-500 [&_p]:mb-4 [&_ul]:text-gray-500 [&_li]:text-gray-500 [&_strong]:text-ink">

            <h2>Monteurzimmer vermieten — warum Schlaf-Platz die beste Wahl ist</h2>
            <p>
              Sie besitzen eine Wohnung oder ein Apartment und moechten es an <strong>Monteure, Handwerker oder Geschaeftsreisende</strong> vermieten? Schlaf-Platz ist Deutschlands kostenlose Vermittlungsplattform fuer Monteurzimmer. Seit 2014 verbinden wir Vermieter mit geprueften Handwerksfirmen — persoenlich, transparent und ohne versteckte Kosten.
            </p>
            <p>
              Mit ueber <strong>{BRAND.stats.partners.toLocaleString("de-DE")} Partnern</strong> in mehr als 50 Staedten ist Schlaf-Platz eines der groessten Netzwerke fuer moeblierte Unterkuenfte in Deutschland. Und das Beste: Als Vermieter zahlen Sie <strong>keinen Cent</strong> — weder Anmeldegebuehren noch Provisionen.
            </p>

            <h2>Welche Wohnungen eignen sich als Monteurzimmer?</h2>
            <p>Grundsaetzlich eignet sich jede moeblierte Wohnung:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>1-Zimmer-Apartments</strong> — ideal fuer einzelne Monteure oder Geschaeftsreisende</li>
              <li><strong>2-3 Zimmer-Wohnungen</strong> — perfekt fuer kleine Teams von 2-4 Personen</li>
              <li><strong>Groessere Wohnungen</strong> — fuer Teams bis zu 8 Personen</li>
              <li><strong>Ganze Haeuser oder Etagen</strong> — fuer Grossprojekte mit 10+ Mitarbeitern</li>
            </ul>
            <p>
              Wichtig ist eine Grundausstattung mit Kueche (oder Kochgelegenheit), Bad, WLAN und Bettzeug. Unser Team berät Sie gerne zur optimalen Ausstattung Ihrer Monteurunterkunft.
            </p>

            <h2>Wie viel kann ich mit meinem Monteurzimmer verdienen?</h2>
            <p>
              Die Einnahmen variieren je nach Stadt, Lage und Ausstattung. Im Durchschnitt erzielen Vermieter auf Schlaf-Platz <strong>15 bis 45 Euro pro Person und Nacht</strong>. Bei einer Wohnung fuer 4 Personen sind das bis zu <strong>5.400 Euro Mieteinnahmen pro Monat</strong>.
            </p>
            <p>
              Monteurzimmer bieten oft hoehere Renditen als klassische Langzeitvermietung, da die Preise pro Nacht berechnet werden und Handwerksfirmen zuverlaessige, langfristige Mieter sind.
            </p>

            <h2>Sicherheit durch das Transparenzregister</h2>
            <p>
              Das <strong>Schlaf-Platz Transparenzregister</strong> ist einzigartig in Deutschland. Vermieter bewerten Mieterfirmen, Firmen bewerten Vermieter. So entsteht ein Netzwerk des Vertrauens, das beide Seiten vor schwarzen Schafen schuetzt. Sie sehen vor der Annahme einer Anfrage, wie zuverlaessig eine Firma bei anderen Vermietern war.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ REGISTRIERUNGSFORMULAR ═══ */}
      <section id="registrieren" className="py-14 md:py-20 bg-[#0b1220]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Jetzt registrieren</p>
              <h2 className="font-display text-4xl md:text-5xl text-white leading-[0.95] uppercase tracking-wide mb-4">Kostenlos inserieren — <span className="text-sp">in 2 Minuten.</span></h2>
              <p className="text-white/40 text-[15px] leading-relaxed mb-8">Fuellen Sie das Formular aus und wir melden uns innerhalb von 15 Minuten. Oder laden Sie direkt die App herunter.</p>
              <div className="space-y-3 mb-8">
                {["0 Euro Gebuehren — dauerhaft", "Persoenlicher Ansprechpartner", "Transparenzregister inklusive", "Mehr als {0} Firmen suchen Unterkuenfte".replace("{0}", BRAND.stats.partners.toLocaleString("de-DE")), "Volle Kontrolle ueber Ihre Inserate"].map(t => (
                  <div key={t} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-sp/20 flex items-center justify-center shrink-0"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg></div>
                    <span className="text-white/50 text-[13px]">{t}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <a href="https://apps.apple.com/app/schlaf-platz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 bg-white/[0.08] border border-white/10 rounded-xl hover:bg-white/[0.12] transition-colors no-underline">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div className="leading-none"><span className="text-white/50 text-[9px] block">Laden im</span><span className="text-white text-[13px] font-bold block">App Store</span></div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.schlafplatz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 bg-white/[0.08] border border-white/10 rounded-xl hover:bg-white/[0.12] transition-colors no-underline">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3.61 1.81L13.42 12 3.61 22.19c-.36-.28-.61-.74-.61-1.29V3.1c0-.55.25-1.01.61-1.29zM15.42 12l-2-2L5 1.5l10.14 5.88L15.42 12zm0 0l-.28 4.62L5 22.5l8.42-8.5 2-2zM20.4 10.8L17 9l-3.58 3L17 15l3.4-1.8c.6-.35.6-1.05 0-1.4l-3.4-1z"/></svg>
                  <div className="leading-none"><span className="text-white/50 text-[9px] block">Jetzt bei</span><span className="text-white text-[13px] font-bold block">Google Play</span></div>
                </a>
              </div>
            </div>
            <div className="lg:col-span-7">
              {sent ? (
                <div className="border border-sp/20 rounded-2xl p-8 text-center bg-sp/[0.05]">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #029fde, #0178a8)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-2">Registrierung gesendet!</h3>
                  <p className="text-white/40 text-sm">Wir melden uns innerhalb von 15 Minuten persoenlich bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <div className="border border-red-500/30 rounded-xl p-4 bg-red-500/10 text-red-300 text-sm">{error}</div>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Name / Firma *</label>
                      <input type="text" required placeholder="Max Mustermann" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/25 focus:border-sp focus:outline-none transition-colors text-sm" value={form.name} onChange={set("name")} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Telefon *</label>
                      <input type="tel" required placeholder="+49 170 1234567" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/25 focus:border-sp focus:outline-none transition-colors text-sm" value={form.telefon} onChange={set("telefon")} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">E-Mail *</label>
                    <input type="email" required placeholder="max@vermieter.de" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/25 focus:border-sp focus:outline-none transition-colors text-sm" value={form.email} onChange={set("email")} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Adresse der Wohnung *</label>
                      <input type="text" required placeholder="Musterstr. 1, 10115 Berlin" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/25 focus:border-sp focus:outline-none transition-colors text-sm" value={form.adresse} onChange={set("adresse")} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Anzahl Wohnungen</label>
                      <input type="text" placeholder="z.B. 3" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/25 focus:border-sp focus:outline-none transition-colors text-sm" value={form.wohnungen} onChange={set("wohnungen")} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Nachricht</label>
                    <textarea rows={3} placeholder="Weitere Informationen zur Wohnung..." className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/25 focus:border-sp focus:outline-none transition-colors text-sm resize-none" value={form.nachricht} onChange={set("nachricht")} />
                  </div>
                  <button type="submit" disabled={loading} className="cta-primary w-full sm:w-auto !py-4 !px-10 text-base mt-2 disabled:opacity-50">
                    {loading ? "Wird gesendet..." : <>Kostenlos registrieren <Arr s={16} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-14 md:py-20 border-b border-gray-100">
        <div className="wrap max-w-[700px]">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3 text-center">FAQ</p>
          <h2 className="font-display text-4xl text-ink text-center uppercase tracking-wide mb-8">Haeufige Fragen fuer Vermieter</h2>
          <Faq q="Ist Schlaf-Platz wirklich kostenlos fuer Vermieter?" a="Ja — 100%. Keine Anmeldegebuehren, keine monatlichen Kosten, keine Provisionen pro Buchung. Schlaf-Platz ist und bleibt fuer Vermieter dauerhaft kostenlos." />
          <Faq q="Wie erhalte ich Anfragen fuer mein Monteurzimmer?" a="Nach der Registrierung erhalten Sie qualifizierte Anfragen per Push-Benachrichtigung (App), E-Mail oder Telefon. Sie entscheiden selbst, welche Anfragen Sie annehmen." />
          <Faq q="Was ist das Transparenzregister?" a="Mieter bewerten Vermieter, Vermieter bewerten Mieter. So sehen Sie vor der Annahme einer Anfrage, wie zuverlaessig eine Firma ist. Das gibt es nur bei Schlaf-Platz." />
          <Faq q="Muss ich einen Vertrag unterschreiben?" a="Nein. Es gibt keinen Vertrag, keine Mindestlaufzeit und keine Kuendigungsfrist. Sie koennen Ihr Inserat jederzeit pausieren oder loeschen." />
          <Faq q="Kann ich die Preise selbst festlegen?" a="Ja, Sie bestimmen Ihren Preis pro Nacht und Person. Unser Team berät Sie gerne zur optimalen Preisgestaltung fuer Ihre Region." />
          <Faq q="Welche Ausstattung braucht mein Monteurzimmer?" a="Grundausstattung: Bett(en), Kueche oder Kochgelegenheit, Bad, WLAN und Bettzeug. Je besser die Ausstattung, desto hoeher die Nachfrage und die erzielbaren Preise." />
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-14 md:py-20">
        <div className="wrap text-center max-w-[620px] mx-auto">
          <h2 className="font-display text-4xl md:text-6xl text-ink leading-[0.95] uppercase tracking-wide mb-4">Jetzt kostenlos <span className="text-sp">inserieren.</span></h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-7">Erreichen Sie tausende Handwerksfirmen und vermieten Sie Ihre Wohnung ohne Gebuehren. Persoenliche Betreuung inklusive.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="#registrieren" className="cta-primary text-base !px-8 !py-4">Kostenlos registrieren <Arr s={18}/></a>
            <Link href="/mieter" className="cta-outline text-base !px-8 !py-4">Unterkunft finden</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
