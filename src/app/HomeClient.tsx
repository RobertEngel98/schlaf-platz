"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnfrageForm from "@/components/AnfrageForm";
import { Stars, Arr, Chk, Faq, FadeIn } from "@/components/ui";
import { BRAND, CITIES } from "@/lib/constants";

function TrustBadge({ dark = true }: { dark?: boolean }) {
  const t = dark ? "text-white/50" : "text-gray-400";
  const s = dark ? "text-white" : "text-ink";
  const sep = dark ? "text-white/15" : "text-gray-200";
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5">
        <Stars size={14} />
        <span className={`${t} text-[13px]`}><strong className={s}>{BRAND.stats.rating}</strong>/5 bei <strong className={s}>{BRAND.stats.reviews}+</strong> Bewertungen</span>
      </div>
      <span className={sep}>|</span>
      <span className={`${t} text-[13px]`}>Mitglied im <strong className={s}>GvdL e.V.</strong></span>
      <span className={sep}>|</span>
      <span className={`${t} text-[13px]`}>Seit <strong className={s}>2014</strong></span>
    </div>
  );
}

export default function HomeClient() {
  return (
    <div className="bg-white overflow-x-hidden">
      <Navbar />

      {/* ═══ HERO — dark section with dual CTA cards ═══ */}
      <section className="relative bg-[#0b1220] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full bg-sp/[0.08] blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-sp/[0.05] blur-[120px]" />
        </div>
        <div className="wrap relative z-10 pt-28 pb-14 md:pt-32 md:pb-16">

          {/* ── Dual CTA Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up">
            {/* Mieter Card */}
            <Link href="/mieter" className="group relative rounded-2xl p-6 md:p-8 overflow-hidden border border-sp/20 no-underline transition-all duration-300 hover:border-sp/40 hover:scale-[1.01]" style={{ background: "linear-gradient(135deg, rgba(2,159,222,0.1) 0%, rgba(2,159,222,0.03) 100%)" }}>
              <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-sp/[0.08] rounded-full blur-[60px]" />
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sp">Fuer Unternehmen &amp; Handwerker</span>
                <h2 className="font-display text-4xl md:text-5xl text-white leading-[0.95] uppercase tracking-wide mt-2 mb-3">Monteurzimmer<br />finden</h2>
                <p className="text-white/35 text-[14px] leading-relaxed mb-5">Ob 3 oder 100 Mitarbeiter — persoenlicher Rueckruf in 15 Minuten. Komplett kostenlos.</p>
                <div className="space-y-2 mb-6">
                  {["Persoenlicher Ansprechpartner","Rueckruf in 15 Minuten","Keine Buchungsgebuehren"].map(t => (
                    <div key={t} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-sp/20 flex items-center justify-center shrink-0"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg></div>
                      <span className="text-white/40 text-[13px]">{t}</span>
                    </div>
                  ))}
                </div>
                <span className="cta-primary !px-6 !py-3 group-hover:shadow-[0_8px_32px_rgba(2,159,222,0.4)]">Jetzt anfragen <Arr s={16}/></span>
              </div>
            </Link>

            {/* Vermieter Card */}
            <Link href="/app" className="group rounded-2xl p-6 md:p-8 border border-white/[0.08] bg-white/[0.03] no-underline transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] hover:scale-[1.01]">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">Fuer Vermieter &amp; Eigentuemer</span>
              <h2 className="font-display text-4xl md:text-5xl text-white leading-[0.95] uppercase tracking-wide mt-2 mb-3">Kostenlos<br />inserieren</h2>
              <p className="text-white/35 text-[14px] leading-relaxed mb-5">Erreichen Sie tausende Handwerksfirmen. Transparenzregister und persoenliche Betreuung inklusive.</p>
              <div className="space-y-2 mb-6">
                {["0 Euro Gebuehren — dauerhaft","Transparenzregister inklusive","Persoenliche Betreuung"].map(t => (
                  <div key={t} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-sp/20 flex items-center justify-center shrink-0"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg></div>
                    <span className="text-white/40 text-[13px]">{t}</span>
                  </div>
                ))}
              </div>
              <span className="cta-outline-white !px-6 !py-3 group-hover:border-sp group-hover:text-sp">Kostenlos inserieren <Arr s={16}/></span>
            </Link>
          </div>

          {/* Trust Badge — under the cards */}
          <div className="mt-8 flex justify-center animate-fade-up" style={{ animationDelay: "200ms" }}><TrustBadge /></div>
        </div>
      </section>

      {/* ═══ LOGO MARQUEE ═══ */}
      <div className="border-b border-gray-100 py-4 overflow-hidden bg-gray-50/50">
        <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em] mb-3">Unsere Mieter arbeiten bei</p>
        <div className="flex animate-marquee whitespace-nowrap">
          {[0,1].map(k => (
            <div key={k} className="flex items-center gap-12 mx-6 shrink-0">
              {["Siemens","BMW","Deutsche Bahn","Airbus","Porsche","Ford","Bosch","RWE","DHL","thyssenkrupp","Hochtief","Aldi"].map(n => (
                <span key={n+k} className="text-gray-300 text-sm font-bold tracking-wider whitespace-nowrap uppercase">{n}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ PROBLEM ═══ */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <FadeIn>
            <p className="text-red-500 text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Das Problem</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide mb-3">
              Jede Woche ohne Monteurzimmer kostet Sie <span className="text-red-500">bares Geld.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-[560px] mb-10">Ihre Disponenten verschwenden wertvolle Arbeitszeit — waehrend Auftraege warten und Mitarbeiter frustriert sind.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: "5h", sub: "pro Woche", t: "Zeitverlust bei der Suche", d: "Ihre Mitarbeiter verbringen durchschnittlich 5 Stunden pro Woche mit Telefonaten und Vergleichen — statt produktiv zu arbeiten." },
              { n: "73%", sub: "der Anbieter", t: "Unzuverlaessige Unterkuenfte", d: "Fotos stimmen nicht, Stornierungen kommen kurzfristig, Qualitaet schwankt. Jede Buchung ist ein Gluecksspiel." },
              { n: "0", sub: "Ueberblick", t: "Kein zentrales System", d: "Keine Bewertungen, keine Vergleichbarkeit, kein Schutz vor schwarzen Schafen. Fuer beide Seiten ein Risiko." },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="border border-gray-100 rounded-2xl p-6 bg-white h-full hover:shadow-lg hover:shadow-gray-100/80 transition-all">
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-bold text-red-500">{p.n}</span>
                    <span className="text-[11px] text-gray-300 uppercase tracking-widest">{p.sub}</span>
                  </div>
                  <h3 className="text-ink font-bold text-base mb-2">{p.t}</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed m-0">{p.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/mieter" className="cta-primary">Jetzt Problem loesen <Arr s={18} /></Link>
          </div>
        </div>
      </section>

      {/* ═══ SOLUTION — 3 Steps ═══ */}
      <section className="py-14 md:py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Die Loesung</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide mb-3">
              In 3 Schritten zur <span className="text-sp">perfekten Unterkunft.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-[540px] mb-10">Kein stundenlanges Suchen, kein Risiko. Wir uebernehmen alles — Sie lehnen sich zurueck.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: "01", t: "Anfrage in 60 Sekunden", d: "Stadt, Personenzahl und Zeitraum angeben — fertig. Keine Registrierung, kein Abo.", checks: ["Komplett kostenlose Anfrage","Kein Account noetig","DSGVO-konform"] },
              { n: "02", t: "Persoenlicher Rueckruf", d: "Innerhalb von 15 Minuten meldet sich Ihr Berater mit passenden Wohnungsvorschlaegen.", checks: ["Rueckruf in 15 Minuten","Vorauswahl durch Experten","Transparente Preise"] },
              { n: "03", t: "Einziehen & loslegen", d: "Komplett moeblierte Apartments mit Kueche, Bad, WLAN. Verlaengerungen jederzeit.", checks: ["Voll moebliert & ausgestattet","Flexible Verlaengerung","Persoenlicher Support"] },
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
          <div className="mt-8">
            <Link href="/mieter" className="cta-primary">Kostenlos Unterkunft anfragen <Arr s={18} /></Link>
          </div>
        </div>
      </section>

      {/* ═══ USPs ═══ */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Warum Schlaf-Platz</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide mb-10">
              3 Gruende, warum <span className="text-sp">1.500+ Partner</span> uns vertrauen.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "\uD83D\uDEE1\uFE0F", badge: "Einzigartig in DE", t: "Transparenzregister", d: "Vermieter bewerten Firmen, Firmen bewerten Vermieter. Vollstaendige Transparenz und Schutz — das gibt es nur bei uns." },
              { icon: "\uD83D\uDCB0", badge: "100% Kostenfrei", t: "Null Euro. Immer.", d: "Waehrend Konkurrenten bis zu 300 Euro pro Jahr verlangen, ist Schlaf-Platz fuer Vermieter komplett kostenlos." },
              { icon: "\uD83C\uDFE0", badge: "Premium-Standard", t: "Komplette Apartments", d: "Keine Mehrbettzimmer. Ihre Mitarbeiter wohnen in voll moeblierten Wohnungen mit eigener Kueche, Bad und WLAN." },
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

      {/* ═══ BEKANNT AUS / TRUST CREDENTIALS ═══ */}
      <section className="py-8 md:py-10 border-y border-gray-100 bg-gray-50/40">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-sp/10 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div>
                <p className="text-ink font-bold text-[13px] m-0">Genossenschaft seit 2014</p>
                <p className="text-gray-400 text-[11px] m-0">Schlaf-Platz e.G.</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200" />
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-sp/10 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <p className="text-ink font-bold text-[13px] m-0">Mitglied im GvdL e.V.</p>
                <p className="text-gray-400 text-[11px] m-0">Gastgewerbe-Verband</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200" />
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-sp/10 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div>
                <p className="text-ink font-bold text-[13px] m-0">DSGVO-konform</p>
                <p className="text-gray-400 text-[11px] m-0">Datenschutz zertifiziert</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-14 md:py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Kundenstimmen</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide mb-10">
              Das sagen unsere <span className="text-sp">Partner.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { q: "Besonders hervorheben moechten wir Herrn Mansouri und Frau Schlaht, die stets freundlich, professionell und hilfsbereit sind. Absolut empfehlenswert!", name: "Schlegel GmbH", role: "Mieter seit 2022", init: "S" },
              { q: "Die Kommunikation war einwandfrei, die Gaeste waren freundlich und anstaendig. Wir freuen uns auf die weitere Zusammenarbeit mit Schlaf-Platz!", name: "Lisa Werkmeister", role: "Vermieterin seit 2021", init: "L" },
              { q: "Von der Anfrage ueber die Reservierung bis zur Buchung immer einwandfrei. Zusagen wurden bis dato immer eingehalten. Top Service!", name: "Wohnraum KKBBG", role: "Vermieter seit 2023", init: "W" },
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
          <div className="mt-8">
            <Link href="/mieter" className="cta-primary">Jetzt selbst ueberzeugen <Arr s={18} /></Link>
          </div>
        </div>
      </section>

      {/* ═══ GOOGLE REVIEW BADGE ═══ */}
      <section className="py-10 md:py-14">
        <div className="wrap">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-md shadow-gray-200/60 flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-ink">5.0</span>
                    <Stars size={16} />
                  </div>
                  <p className="text-gray-400 text-[13px] m-0 mt-0.5"><strong className="text-ink">{BRAND.stats.reviews}</strong> Bewertungen auf Google</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-100" />
              <span className="text-sp text-[13px] font-bold uppercase tracking-wider flex items-center gap-2">Alle Bewertungen lesen <Arr s={14} /></span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CITIES ═══ */}
      <section className="py-14 md:py-20" id="staedte">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Standorte</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide mb-10">
              Monteurzimmer in <span className="text-sp">ueber 50 Staedten.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CITIES.map((c, i) => (
              <FadeIn key={c.slug} delay={i * 25}>
                <Link href={`/monteurzimmer-${c.slug}`} className="group flex items-center gap-3 rounded-xl border border-gray-100 p-3.5 no-underline bg-white hover:border-sp/30 hover:shadow-md hover:shadow-sp/5 transition-all duration-300">
                  <span className="text-xl">{c.emoji}</span>
                  <div className="min-w-0">
                    <p className="font-bold text-[13px] text-ink m-0 truncate group-hover:text-sp transition-colors">{c.name}</p>
                    <p className="text-[11px] text-gray-300 m-0 truncate">{c.tagline}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-14 md:py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14">
            <div className="md:col-span-4">
              <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">FAQ</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink leading-[0.95] uppercase tracking-wide mb-3">Haeufig gestellte Fragen</h2>
              <p className="text-gray-400 text-[15px] leading-relaxed">Noch Fragen? Unser Team hilft Ihnen gerne persoenlich weiter.</p>
              <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 text-sp font-bold text-sm mt-4 no-underline hover:underline uppercase tracking-wide">{BRAND.email} <Arr s={14} /></a>
            </div>
            <div className="md:col-span-8">
              {[
                { q: "Ist Schlaf-Platz wirklich kostenlos?", a: "Ja — fuer Vermieter ist Schlaf-Platz zu 100% kostenlos. Keine Anmeldegebuehren, keine monatlichen Kosten. Fuer Mieter fallen nur die regulaeren Mietkosten an." },
                { q: "Wie schnell bekomme ich eine Antwort?", a: "Ihr persoenlicher Berater meldet sich in der Regel innerhalb von 15 Minuten telefonisch bei Ihnen. Werktags von 08:00 bis 18:00 Uhr." },
                { q: "Was ist das Transparenzregister?", a: "Vermieter bewerten Firmen, Firmen bewerten Vermieter. So schuetzen wir beide Seiten vor unzuverlaessigen Partnern — einzigartig in Deutschland." },
                { q: "Wie unterscheiden sich Monteurzimmer von Hotels?", a: "Komplett moeblierte Apartments mit eigener Kueche, Bad und WLAN. Mehr Platz, mehr Komfort, guenstigere Preise — besonders bei laengeren Aufenthalten." },
                { q: "Kann ich auch fuer groessere Teams buchen?", a: "Selbstverstaendlich. Ob 3 oder 100 Mitarbeiter — wir finden die passende Loesung, auch komplette Wohnkomplexe." },
              ].map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ANFRAGE-FORMULAR ═══ */}
      <section id="anfrage" className="py-14 md:py-20">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Jetzt anfragen</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide mb-3">
              Monteurzimmer <span className="text-sp">kostenlos anfragen.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-[540px] mb-10">Fuellen Sie das Formular aus — Ihr persoenlicher Berater meldet sich innerhalb von 15 Minuten.</p>
          </FadeIn>
          <AnfrageForm />
        </div>
      </section>

      {/* ═══ BIG STATS — dark accent stripe ═══ */}
      <section className="py-12 md:py-16 bg-[#0b1220]">
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 text-center">
            {[
              { v: "1.500+", l: "Partner in DE" },
              { v: "50+", l: "Staedte" },
              { v: "266+", l: "5-Sterne Reviews" },
              { v: "23", l: "Mitarbeiter" },
              { v: "\u2300 15 Min", l: "Rueckrufzeit" },
            ].map(s => (
              <div key={s.l}>
                <p className="font-display text-4xl md:text-5xl text-white m-0 tracking-wide">{s.v}</p>
                <p className="text-[10px] text-white/25 uppercase tracking-[0.15em] font-bold mt-1 m-0">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ APP DOWNLOAD ═══ */}
      <section className="py-14 md:py-20 border-b border-gray-100">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
            <div>
              <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Schlaf-Platz App</p>
              <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide mb-4">
                Monteurzimmer verwalten — <span className="text-sp">von ueberall.</span>
              </h2>
              <p className="text-gray-400 text-[15px] leading-relaxed mb-6">Mit der kostenlosen Schlaf-Platz App verwalten Sie Ihre Inserate, kommunizieren mit Mietern und behalten alle Buchungen im Blick.</p>
              <div className="space-y-3 mb-8">
                {["Inserate erstellen & bearbeiten","Push-Benachrichtigungen fuer Anfragen","Direkter Chat mit Mietern","Buchungsuebersicht in Echtzeit"].map(t => (
                  <div key={t} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-sp/15 flex items-center justify-center shrink-0"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg></div>
                    <span className="text-gray-500 text-[14px]">{t}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <a href="https://apps.apple.com/app/schlaf-platz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 bg-ink rounded-xl hover:bg-ink/90 transition-colors no-underline">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div className="leading-none"><span className="text-white/50 text-[9px] block">Laden im</span><span className="text-white text-[13px] font-bold block">App Store</span></div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.schlafplatz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 bg-ink rounded-xl hover:bg-ink/90 transition-colors no-underline">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M3.61 1.81L13.42 12 3.61 22.19c-.36-.28-.61-.74-.61-1.29V3.1c0-.55.25-1.01.61-1.29zM15.42 12l-2-2L5 1.5l10.14 5.88L15.42 12zm0 0l-.28 4.62L5 22.5l8.42-8.5 2-2zM20.4 10.8L17 9l-3.58 3L17 15l3.4-1.8c.6-.35.6-1.05 0-1.4l-3.4-1z"/></svg>
                  <div className="leading-none"><span className="text-white/50 text-[9px] block">Jetzt bei</span><span className="text-white text-[13px] font-bold block">Google Play</span></div>
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-[260px] h-[460px] bg-gradient-to-b from-sp/10 to-sp/5 rounded-[2.5rem] border border-sp/20 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="w-16 h-16 rounded-2xl bg-sp/15 flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                  </div>
                  <p className="font-display text-2xl text-ink uppercase tracking-wide">Schlaf-Platz</p>
                  <p className="text-gray-400 text-sm mt-1">Kostenlos fuer iOS & Android</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-14 md:py-20">
        <div className="wrap text-center max-w-[620px] mx-auto">
          <h2 className="font-display text-4xl md:text-6xl text-ink leading-[0.95] uppercase tracking-wide mb-4">Jetzt in 60 Sekunden <span className="text-sp">anfragen.</span></h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-7">Ob Unterkunft suchen oder Wohnung vermieten — unser Team steht Ihnen kostenlos und persoenlich zur Seite.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/mieter" className="cta-primary text-base !px-8 !py-4">Unterkunft finden <Arr s={18}/></Link>
            <Link href="/app" className="cta-outline text-base !px-8 !py-4">Kostenlos inserieren</Link>
          </div>
          <div className="mt-6 flex justify-center"><TrustBadge dark={false} /></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
