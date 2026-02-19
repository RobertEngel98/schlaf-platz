"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AnimNum, Stars, Arr, Chk, Faq, FadeIn } from "@/components/ui";
import { BRAND, CITIES } from "@/lib/constants";

function CtaBlock({ text = "Jetzt Unterkunft anfragen" }: { text?: string }) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
      <Link href="/mieter" className="cta-green">{text} <Arr s={18} /></Link>
      <span className="text-white/30 text-[13px] pt-3.5">100% kostenlos &middot; unverbindlich</span>
    </div>
  );
}

function TrustBadge() {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5">
        <Stars size={14} />
        <span className="text-white/60 text-[13px]">
          <strong className="text-white">{BRAND.stats.rating}</strong>/5.0 aus <strong className="text-white">{BRAND.stats.reviews}+</strong> Bewertungen
        </span>
      </div>
      <span className="text-white/20">|</span>
      <span className="text-white/50 text-[13px]">Mitglied im <strong className="text-white">GvdL e.V.</strong></span>
    </div>
  );
}

export default function HomeClient() {
  return (
    <div className="bg-[#0a0a0a] overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] right-[-5%] w-[700px] h-[700px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
          <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sp/[0.03] blur-[100px]" />
        </div>
        <div className="wrap relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.15em] mb-5 animate-fade-in">
            Speziell fuer Handwerksfirmen &amp; Unternehmen
          </p>
          <h1 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] text-white leading-[1.08] tracking-tight mb-6 max-w-[800px] animate-fade-up">
            Monteurzimmer finden in <em className="text-sp-300 not-italic">unter 15 Minuten</em> — komplett kostenlos.
          </h1>
          <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-[580px] mb-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <strong className="text-white">{BRAND.stats.partners.toLocaleString("de-DE")}+</strong> verifizierte Partner vermieten <strong className="text-white">ohne Zeitaufwand</strong> ueber die Schlaf-Platz Plattform — <strong className="text-white">wir erledigen alles</strong> bis zum Einzug.
          </p>
          <CtaBlock />
          <div className="mt-8 animate-fade-up" style={{ animationDelay: "300ms" }}><TrustBadge /></div>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-up" style={{ animationDelay: "400ms" }}>
            {[
              { v: <AnimNum end={1500} suffix="+" />, l: "Verifizierte Partner" },
              { v: <AnimNum end={50} suffix="+" />, l: "Staedte in DE" },
              { v: "5.0 / 5.0", l: "Google-Bewertung" },
              { v: "0 \u20AC", l: "Fuer Vermieter" },
            ].map((s, i) => (
              <div key={i} className="border border-white/[0.06] rounded-2xl p-5 text-center bg-white/[0.02]">
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">{s.v}</p>
                <p className="text-[11px] text-white/30 font-semibold uppercase tracking-widest">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGO MARQUEE */}
      <div className="border-y border-white/[0.06] py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[0,1].map(k => (
            <div key={k} className="flex items-center gap-10 mx-5 shrink-0">
              {["Siemens","BMW","Deutsche Bahn","Airbus","Porsche","Ford","Bosch","RWE","DHL","thyssenkrupp","Zalando","Aldi"].map(n => (
                <span key={n+k} className="text-white/20 text-sm font-semibold tracking-wide whitespace-nowrap">{n}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PAIN SECTION */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="wrap">
          <FadeIn>
            <p className="text-red-400 text-[13px] font-bold uppercase tracking-[0.15em] mb-4">Das Problem</p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-white leading-tight max-w-[700px] mb-12">
              Das kostet Sie die Monteurzimmer-Suche — <em className="text-red-400 not-italic">jeden Tag.</em>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: "\u26A0\uFE0F", t: "Stunden verschwendet statt produktiv gearbeitet", points: ["Ihre Disponenten verbringen bis zu <strong class=\"text-white\">5 Stunden pro Woche</strong> mit der Zimmersuche.","Hunderte Anrufe und E-Mails fuer eine einzige Buchung.","Waehrend Sie suchen, verlieren Sie <strong class=\"text-white\">Auftraege und Umsatz</strong>."]},
              { icon: "\u274C", t: "Unzuverlaessige Unterkuenfte ruinieren den Einsatz", points: ["Fotos stimmen nicht mit der Realitaet ueberein — <strong class=\"text-white\">Frust bei Ihren Mitarbeitern</strong>.","Stornierungen kurzfristig, kein Ersatz verfuegbar.","Keine Transparenz: Welcher Anbieter ist wirklich <strong class=\"text-white\">serioes</strong>?"]},
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="border border-white/[0.06] rounded-2xl p-7 bg-white/[0.02] h-full">
                  <div className="text-2xl mb-4">{p.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-4">{p.t}</h3>
                  <div className="space-y-3">
                    {p.points.map((pt, j) => (
                      <div key={j} className="flex gap-3 text-white/50 text-[14px] leading-relaxed">
                        <span className="text-red-400 mt-0.5 shrink-0">&bull;</span>
                        <span dangerouslySetInnerHTML={{ __html: pt }} />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <CtaBlock text="Jetzt Schluss damit" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.15em] mb-4">So funktioniert es</p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-white leading-tight max-w-[700px] mb-14">
              Wie Sie <em className="text-sp-300 not-italic">in unter 15 Minuten</em> eine Unterkunft bekommen.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { n: "1", t: "Anfrage senden", desc: "Formular in 90 Sekunden ausfuellen — Stadt, Personenzahl, Zeitraum. Fertig.", checks: ["Persoenlicher Ansprechpartner","Kein Abo, keine Gebuehren","In 60 Sekunden erledigt"] },
              { n: "2", t: "Persoenlicher Rueckruf", desc: "Innerhalb von 15 Minuten meldet sich Ihr Berater telefonisch bei Ihnen.", checks: ["Vorauswahl passender Wohnungen","Transparente Preise","Alles aus einer Hand"] },
              { n: "3", t: "Einziehen & arbeiten", desc: "Wir organisieren alles: Schluessel, Check-in, Verlaengerungen und Abrechnung.", checks: ["Komplett moebliert","WLAN, Kueche, Bad inklusive","Verlaengerungen jederzeit"] },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="border border-white/[0.06] rounded-2xl p-7 bg-white/[0.02] h-full flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-sp text-white flex items-center justify-center text-sm font-bold mb-5">{s.n}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{s.t}</h3>
                  <p className="text-white/40 text-[14px] leading-relaxed mb-5">{s.desc}</p>
                  <div className="space-y-2.5 mt-auto">
                    {s.checks.map(c => (
                      <div key={c} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
                        </div>
                        <span className="text-white/50 text-[13px]">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <CtaBlock />
        </div>
      </section>

      {/* USPs */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.15em] mb-4">Unsere Vorteile</p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-white leading-tight max-w-[700px] mb-14">
              Warum <em className="text-sp-300 not-italic">{BRAND.stats.partners.toLocaleString("de-DE")}+ Partner</em> auf Schlaf-Platz vertrauen.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "\uD83D\uDEE1\uFE0F", badge: "EINZIGARTIG IN DE", t: "Transparenzregister", d: "Unser einzigartiges Register, bei dem Vermieter Firmen bewerten. Schutz vor schwarzen Schafen — fuer beide Seiten. Kein anderer Anbieter hat das." },
              { icon: "\uD83D\uDCB0", badge: "100% KOSTENFREI", t: "Null Euro. Fuer immer.", d: "Waehrend Konkurrenten bis zu 300 Euro/Jahr verlangen, ist Schlaf-Platz komplett kostenlos. Keine Anmeldegebuehren, keine versteckten Kosten." },
              { icon: "\uD83C\uDFE0", badge: "PREMIUM", t: "Komplette Apartments", d: "Keine geteilten Zimmer. Voll moeblierte Wohnungen mit eigener Kueche, Bad und WLAN. Wie ein zweites Zuhause fuer Ihre Mitarbeiter." },
            ].map((v, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="border border-white/[0.06] rounded-2xl p-7 bg-white/[0.02] h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{v.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-sp-400 bg-sp-500/10 px-2.5 py-1 rounded-full">{v.badge}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{v.t}</h3>
                  <p className="text-white/40 text-[14px] leading-relaxed">{v.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.15em] mb-4">Erfahrungsberichte</p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-white leading-tight max-w-[700px] mb-14">
              Was unsere Partner ueber die Zusammenarbeit sagen.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { q: "Besonders hervorheben moechten wir Herrn Mansouri und Frau Schlaht, die stets freundlich, professionell und hilfsbereit sind. Absolut empfehlenswert.", name: "Schlegel GmbH", role: "Mieter seit 2022", initial: "S" },
              { q: "Die Kommunikation war einwandfrei, die Gaeste waren freundlich und anstaendig. Wir freuen uns auf die weitere Zusammenarbeit mit Schlaf-Platz!", name: "Lisa Werkmeister", role: "Vermieterin seit 2021", initial: "L" },
              { q: "Von der Anfrage ueber die Reservierung bis zur Buchung immer einwandfrei. Zusagen wurden bis dato immer eingehalten. Top Service!", name: "Wohnraum KKBBG", role: "Vermieter seit 2023", initial: "W" },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="border border-white/[0.06] rounded-2xl p-7 bg-white/[0.02] h-full flex flex-col">
                  <Stars size={14} />
                  <p className="text-white/70 text-[15px] leading-relaxed mt-4 mb-6 flex-1">&bdquo;{t.q}&ldquo;</p>
                  <div className="border-t border-white/[0.06] pt-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sp-500 to-sp-700 flex items-center justify-center text-white font-bold text-sm">{t.initial}</div>
                    <div>
                      <p className="font-bold text-[14px] text-white m-0">{t.name}</p>
                      <p className="text-[12px] text-white/30 m-0">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <CtaBlock />
        </div>
      </section>

      {/* DUAL CTA */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FadeIn>
              <div className="relative rounded-2xl p-8 md:p-10 overflow-hidden h-full border border-sp/20 bg-sp/[0.03]">
                <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-sp/[0.06] rounded-full blur-[80px]" />
                <div className="relative z-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-sp-300">Fuer Unternehmen &amp; Handwerker</span>
                  <h3 className="font-display text-2xl md:text-3xl text-white leading-tight mt-3 mb-4">Unterkunft finden in unter 15 Minuten</h3>
                  <p className="text-white/40 text-[15px] leading-relaxed mb-5">Ob 3 oder 100 Mitarbeiter — wir finden die passende Monteurwohnung.</p>
                  <div className="space-y-2 mb-6">
                    {["Persoenlicher Ansprechpartner","Rueckruf in 15 Minuten","Keine Buchungsgebuehren"].map(t => (
                      <div key={t} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg></div>
                        <span className="text-white/50 text-[13px]">{t}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/mieter" className="cta-green">Jetzt Unterkunft anfragen <Arr s={16}/></Link>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="rounded-2xl p-8 md:p-10 border border-white/[0.08] bg-white/[0.02] h-full">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/40">Fuer Vermieter &amp; Eigentuemer</span>
                <h3 className="font-display text-2xl md:text-3xl text-white leading-tight mt-3 mb-4">Kostenlos inserieren &amp; vermieten</h3>
                <p className="text-white/40 text-[15px] leading-relaxed mb-5">Erreichen Sie tausende Handwerksfirmen. Transparenzregister inklusive.</p>
                <div className="space-y-2 mb-6">
                  {["0 Euro Gebuehren — fuer immer","Transparenzregister inklusive","Persoenliche Betreuung"].map(t => (
                    <div key={t} className="flex items-center gap-2.5"><Chk /><span className="text-white/50 text-[13px]">{t}</span></div>
                  ))}
                </div>
                <Link href="/app" className="inline-flex items-center gap-2.5 font-semibold rounded-full px-7 py-3.5 text-[15px] text-white border border-white/15 hover:border-sp hover:text-sp transition-all no-underline">Kostenlos inserieren <Arr s={16}/></Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]" id="staedte">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.15em] mb-4">Standorte</p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-white leading-tight max-w-[700px] mb-14">
              Monteurzimmer in <em className="text-sp-300 not-italic">ueber 50 Staedten</em> deutschlandweit.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CITIES.map((c, i) => (
              <FadeIn key={c.slug} delay={i * 30}>
                <Link href={`/monteurzimmer-${c.slug}`} className="group flex items-center gap-3 rounded-xl border border-white/[0.06] p-4 no-underline hover:border-sp/40 hover:bg-sp/[0.03] transition-all duration-300">
                  <span className="text-xl">{c.emoji}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[13px] text-white m-0 truncate group-hover:text-sp transition-colors">{c.name}</p>
                    <p className="text-[11px] text-white/25 m-0 truncate">{c.tagline}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-sp text-[13px] font-bold uppercase tracking-[0.15em] mb-4">FAQ</p>
              <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-4">Haeufig gestellte Fragen</h2>
              <p className="text-white/35 text-[15px] leading-relaxed">Noch Fragen? Unser Team hilft gerne weiter.</p>
              <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 text-sp font-semibold text-sm mt-5 no-underline hover:underline">{BRAND.email} <Arr s={14} /></a>
            </div>
            <div className="md:col-span-8">
              {[
                { q: "Ist Schlaf-Platz wirklich kostenlos?", a: "Ja, fuer Vermieter ist Schlaf-Platz zu 100% kostenlos. Keine Anmeldegebuehren, keine monatlichen Kosten, keine versteckten Gebuehren. Fuer Mieter fallen nur die regulaeren Mietkosten an." },
                { q: "Wie schnell erhalte ich eine Antwort?", a: "In der Regel meldet sich Ihr persoenlicher Berater innerhalb von 15 Minuten telefonisch bei Ihnen. Wir sind werktags von 8-18 Uhr erreichbar." },
                { q: "Was ist das Transparenzregister?", a: "Unser einzigartiges Transparenzregister ermoeglicht es Vermietern, Firmen zu bewerten. So schuetzen wir beide Seiten vor unzuverlaessigen Partnern — ein Feature, das kein anderer Anbieter hat." },
                { q: "Wie unterscheiden sich Monteurzimmer von Hotels?", a: "Unsere Monteurzimmer sind komplett moeblierte Apartments mit eigener Kueche, Bad und WLAN. Sie bieten mehr Platz und Komfort als Hotelzimmer — und das zu deutlich guenstigeren Preisen." },
                { q: "Kann ich auch fuer groessere Teams buchen?", a: "Selbstverstaendlich. Ob 3 oder 100 Mitarbeiter — wir finden die passende Loesung. Bei groesseren Teams organisieren wir auch komplette Wohnkomplexe." },
              ].map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* BIG STATS */}
      <section className="py-16 md:py-20 border-b border-white/[0.06]">
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 text-center">
            {[
              { v: "1.500+", l: "Partner in DE" },
              { v: "50+", l: "Staedte abgedeckt" },
              { v: "266+", l: "5-Sterne Bewertungen" },
              { v: "23", l: "Mitarbeiter" },
              { v: "\u2300 15 Min", l: "bis zum Rueckruf" },
            ].map(s => (
              <div key={s.l}>
                <p className="text-3xl md:text-4xl font-bold text-white m-0">{s.v}</p>
                <p className="text-[11px] text-white/25 uppercase tracking-widest mt-1 m-0">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-sp/[0.06] rounded-full blur-[120px]" />
        </div>
        <div className="wrap text-center relative z-10 max-w-[620px] mx-auto">
          <h2 className="font-display text-3xl md:text-[2.75rem] text-white leading-tight mb-5">Jetzt in 60 Sekunden unverbindlich anfragen.</h2>
          <p className="text-white/35 text-lg leading-relaxed mb-8">Ob Unterkunft suchen oder Wohnung vermieten — unser Team steht Ihnen kostenlos und persoenlich zur Seite.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/mieter" className="cta-green text-base !px-8 !py-4">Unterkunft finden <Arr s={18}/></Link>
            <Link href="/app" className="inline-flex items-center gap-2.5 font-semibold rounded-full px-8 py-4 text-[15px] text-white border border-white/15 hover:border-sp hover:text-sp transition-all no-underline">Kostenlos inserieren</Link>
          </div>
          <div className="mt-6 flex justify-center"><TrustBadge /></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
