"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AnimNum, Stars, Arr, Chk, Faq, Section, Heading, Tag, FadeIn } from "@/components/ui";
import { BRAND, CITIES } from "@/lib/constants";

export default function HomeClient() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* ════════════════════════════════════════
          HERO — Dark, bold, editorial
          ════════════════════════════════════════ */}
      <section className="relative min-h-[100vh] flex items-center bg-ink overflow-hidden">
        {/* Abstract background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-sp/8 blur-[120px]" />
          <div className="absolute bottom-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-sp-300/5 blur-[100px]" />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>

        <div className="wrap relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-[740px]">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/[0.08] animate-fade-in">
              <div className="flex -space-x-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-white/50 text-[12px] font-medium tracking-wide">{BRAND.stats.partners.toLocaleString("de-DE")}+ verifizierte Partner deutschlandweit</span>
            </div>

            {/* Headline — serif for impact */}
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-[1.05] tracking-tight mb-6 animate-fade-up">
              Monteurzimmer finden{" "}
              <span className="relative">
                <span className="text-sp-300">war noch nie</span>
              </span>
              <br />so einfach.
            </h1>

            <p className="text-white/45 text-lg md:text-xl leading-relaxed max-w-[540px] mb-10 animate-fade-up" style={{ animationDelay: "100ms" }}>
              Die kostenlose Plattform, die Vermieter und Handwerksfirmen zusammenbringt. Komplett moeblierte Apartments. Persoenliche Betreuung.
            </p>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap animate-fade-up" style={{ animationDelay: "200ms" }}>
              <Link href="/mieter" className="btn-primary !bg-sp !text-white !px-8 !py-4 text-base">
                Unterkunft finden <Arr s={18} />
              </Link>
              <Link href="/app" className="btn-ghost !px-8 !py-4 text-base">
                Kostenlos inserieren
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-up" style={{ animationDelay: "400ms" }}>
            {[
              { v: <AnimNum end={1500} suffix="+" />, l: "Verifizierte Partner", icon: "\uD83C\uDFE2" },
              { v: <AnimNum end={50} suffix="+" />, l: "Staedte in DE", icon: "\uD83D\uDDFA\uFE0F" },
              { v: "5.0/5.0", l: "Google-Bewertung", icon: "\u2B50" },
              { v: "0 \u20AC", l: "Fuer Vermieter", icon: "\uD83D\uDCB0" },
            ].map((s, i) => (
              <div key={i} className="group bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-5 transition-all duration-300 text-center">
                <span className="text-lg mb-2 block">{s.icon}</span>
                <p className="text-xl md:text-2xl font-bold text-white mb-0.5 font-body">{s.v}</p>
                <p className="text-[11px] text-white/35 font-medium uppercase tracking-widest">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SOCIAL PROOF BAR
          ════════════════════════════════════════ */}
      <div className="bg-white border-b border-surface-dim py-4">
        <div className="wrap flex items-center justify-center gap-4 flex-wrap text-[13px]">
          <div className="flex items-center gap-2">
            <Stars size={12} />
            <span className="text-ink-light">5.0 aus <strong className="text-ink">{BRAND.stats.reviews}+</strong> Bewertungen</span>
          </div>
          <span className="text-ink-faint">|</span>
          <span className="text-ink-light">Mitglied im <strong className="text-ink">GvdL e.V.</strong></span>
          <span className="text-ink-faint hidden sm:inline">|</span>
          <span className="text-ink-light hidden sm:inline">Seit <strong className="text-ink">2014</strong> am Markt</span>
          <span className="text-ink-faint hidden md:inline">|</span>
          <span className="text-ink-light hidden md:inline"><strong className="text-ink">{BRAND.stats.team}</strong> Mitarbeiter</span>
        </div>
      </div>

      {/* ════════════════════════════════════════
          PROBLEM SECTION — Pain / Agitation
          ════════════════════════════════════════ */}
      <Section bg="white">
        <Heading
          tag="Das Problem"
          title="Monteurzimmer-Suche kostet Sie Zeit, Geld und Nerven."
          sub="Viele Unternehmen verlieren wertvolle Arbeitsstunden fuer die Organisation von Unterkuenften. Das muss nicht sein."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: "\u23F0", t: "Stundenlange Suche", d: "Ihre Fachkraefte suchen selbst nach Zimmern statt produktiv zu arbeiten. Hunderte Anrufe fuer eine Buchung.", accent: "bg-red-50 text-red-500 border-red-100" },
            { icon: "\u274C", t: "Unzuverlaessige Anbieter", d: "Fotos stimmen nicht mit der Realitaet ueberein. Zusagen werden gebrochen. Qualitaet schwankt stark.", accent: "bg-amber-50 text-amber-500 border-amber-100" },
            { icon: "\uD83D\uDD04", t: "Keine zentrale Loesung", d: "Buchungen, Verlaengerungen und Abrechnungen werden manuell organisiert. Ein Albtraum bei 50+ Mitarbeitern.", accent: "bg-orange-50 text-orange-500 border-orange-100" },
          ].map((p, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="card h-full">
                <div className={`w-11 h-11 rounded-xl ${p.accent} border flex items-center justify-center text-lg mb-5`}>{p.icon}</div>
                <h3 className="font-display text-xl text-ink mb-2">{p.t}</h3>
                <p className="text-ink-light text-sm leading-relaxed">{p.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════
          SOLUTION — USPs
          ════════════════════════════════════════ */}
      <Section bg="cool">
        <Heading
          tag="Die Loesung"
          title="Schlaf-Platz macht es anders."
          sub="Drei Alleinstellungsmerkmale, die uns von jedem Wettbewerber unterscheiden."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: "\uD83D\uDEE1\uFE0F", t: "Transparenzregister", d: "Unser einzigartiges Register, bei dem Vermieter Firmen bewerten. Schutz vor schwarzen Schafen fuer beide Seiten.", badge: "Einzigartig in DE" },
            { icon: "\uD83D\uDCB0", t: "100% kostenlos", d: "Waehrend Konkurrenten bis zu 300 Euro/Jahr verlangen, ist Schlaf-Platz komplett kostenlos. Null versteckte Gebuehren.", badge: "Kostenfrei" },
            { icon: "\uD83C\uDFE0", t: "Komplette Apartments", d: "Keine geteilten Zimmer. Voll moeblierte Wohnungen mit Kueche, Bad und WLAN. Wie ein zweites Zuhause.", badge: "Premium" },
          ].map((v, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="card h-full !shadow-none !border-0 bg-white">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-sp-50 border border-sp-100 flex items-center justify-center text-xl shrink-0">{v.icon}</div>
                  <div className="pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-sp-600">{v.badge}</span>
                  </div>
                </div>
                <h3 className="font-display text-xl text-ink mb-2">{v.t}</h3>
                <p className="text-ink-light text-sm leading-relaxed">{v.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════
          DUAL CTA — Split cards
          ════════════════════════════════════════ */}
      <Section bg="white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Mieter card */}
          <FadeIn>
            <div className="relative bg-ink rounded-3xl p-8 md:p-10 overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-sp/10 rounded-full blur-[100px]" />
              <div className="relative z-10">
                <Tag variant="light">Fuer Unternehmen &amp; Handwerker</Tag>
                <h3 className="font-display text-2xl md:text-3xl text-white leading-tight mt-5 mb-4">Unterkunft finden in unter 2 Minuten</h3>
                <p className="text-white/40 text-[15px] leading-relaxed mb-4 max-w-[380px]">Ob 3 oder 100 Mitarbeiter — wir finden die passende Monteurwohnung. Persoenlicher Rueckruf in 15 Minuten.</p>
                <div className="space-y-2.5 mb-8">
                  {["Persoenlicher Ansprechpartner", "Rueckruf in 15 Minuten", "Keine Buchungsgebuehren"].map(t => (
                    <div key={t} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-400/20 flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <span className="text-white/55 text-sm">{t}</span>
                    </div>
                  ))}
                </div>
                <Link href="/mieter" className="btn-primary">Jetzt Unterkunft anfragen <Arr s={16}/></Link>
              </div>
            </div>
          </FadeIn>

          {/* Vermieter card */}
          <FadeIn delay={100}>
            <div className="bg-surface-cool rounded-3xl p-8 md:p-10 border border-surface-dim h-full">
              <Tag variant="blue">Fuer Vermieter &amp; Eigentuemer</Tag>
              <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mt-5 mb-4">Kostenlos inserieren &amp; vermieten</h3>
              <p className="text-ink-light text-[15px] leading-relaxed mb-4 max-w-[380px]">Erreichen Sie tausende Handwerksfirmen. Transparenzregister und persoenliche Betreuung inklusive.</p>
              <div className="space-y-2.5 mb-8">
                {["0 Euro Gebuehren — fuer immer", "Transparenzregister inklusive", "Persoenliche Betreuung"].map(t => (
                  <div key={t} className="flex items-center gap-2.5">
                    <Chk />
                    <span className="text-ink-light text-sm">{t}</span>
                  </div>
                ))}
              </div>
              <Link href="/app" className="btn-outline">Kostenlos inserieren <Arr s={16}/></Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          HOW IT WORKS
          ════════════════════════════════════════ */}
      <Section bg="cool">
        <Heading tag="So funktioniert es" title="In 3 Schritten zur Unterkunft" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { n: "01", t: "Anfrage senden", d: "Fuellen Sie unser Formular in 90 Sekunden aus. Stadt, Personenzahl, Zeitraum — fertig.", icon: "\uD83D\uDCDD" },
            { n: "02", t: "Persoenlicher Rueckruf", d: "Innerhalb von 15 Minuten meldet sich Ihr Berater telefonisch bei Ihnen.", icon: "\uD83D\uDCDE" },
            { n: "03", t: "Einziehen & arbeiten", d: "Wir organisieren alles: Schluessel, Check-in, Verlaengerungen und Abrechnung.", icon: "\uD83C\uDFE0" },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 120}>
              <div className="text-center">
                <div className="relative mx-auto mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-surface-dim flex items-center justify-center text-2xl mx-auto shadow-sm">{s.icon}</div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-sp text-white flex items-center justify-center text-[11px] font-bold">{s.n}</div>
                </div>
                <h3 className="font-display text-xl text-ink mb-2">{s.t}</h3>
                <p className="text-ink-light text-sm leading-relaxed max-w-[280px] mx-auto">{s.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════
          TESTIMONIALS
          ════════════════════════════════════════ */}
      <Section bg="white">
        <Heading tag="Kundenstimmen" title="Vertrauen, das man hoert." sub="Was unsere Partner ueber die Zusammenarbeit sagen." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { q: "Besonders hervorheben moechten wir Herrn Mansouri und Frau Schlaht, die stets freundlich, professionell und hilfsbereit sind.", a: "Schlegel GmbH", r: "Mieter seit 2022" },
            { q: "Die Kommunikation war einwandfrei, die Gaeste waren freundlich und anstaendig. Wir freuen uns auf die weitere Zusammenarbeit!", a: "Lisa Werkmeister", r: "Vermieterin seit 2021" },
            { q: "Von der Anfrage ueber die Reservierung bis zur Buchung immer einwandfrei. Zusagen wurden bis dato immer eingehalten.", a: "Wohnraum KKBBG", r: "Vermieter seit 2023" },
          ].map((t, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="card flex flex-col h-full">
                <Stars size={13} />
                <p className="text-ink text-[15px] leading-relaxed mt-4 mb-6 flex-1 font-body">&bdquo;{t.q}&ldquo;</p>
                <div className="border-t border-surface-dim pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sp-100 to-sp-200 flex items-center justify-center text-sp-700 font-bold text-sm">{t.a[0]}</div>
                  <div>
                    <p className="font-semibold text-sm text-ink m-0">{t.a}</p>
                    <p className="text-[11px] text-ink-muted m-0">{t.r}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════
          CITIES
          ════════════════════════════════════════ */}
      <Section bg="cool" id="staedte">
        <Heading tag="Standorte" title="Monteurzimmer in ganz Deutschland" sub="Von Berlin bis Muenchen — wir sind in ueber 50 Staedten vertreten." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CITIES.map((c, i) => (
            <FadeIn key={c.slug} delay={i * 40}>
              <Link href={`/monteurzimmer-${c.slug}`} className="group flex items-center gap-3 rounded-xl bg-white border border-surface-dim p-4 no-underline hover:border-sp-200 hover:shadow-md hover:shadow-sp/5 transition-all duration-300">
                <span className="text-xl">{c.emoji}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-ink m-0 truncate group-hover:text-sp transition-colors">{c.name}</p>
                  <p className="text-[11px] text-ink-muted m-0 truncate">{c.tagline}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════
          FAQ
          ════════════════════════════════════════ */}
      <Section bg="white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <Tag>FAQ</Tag>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mt-4 mb-4">Haeufig gestellte Fragen</h2>
            <p className="text-ink-light text-[15px] leading-relaxed">Noch Fragen? Unser Team hilft gerne weiter.</p>
            <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 text-sp font-semibold text-sm mt-5 no-underline hover:underline">
              {BRAND.email} <Arr s={14} />
            </a>
          </div>
          <div className="md:col-span-8">
            {[
              { q: "Ist Schlaf-Platz wirklich kostenlos?", a: "Ja, fuer Vermieter ist Schlaf-Platz zu 100% kostenlos. Keine Anmeldegebuehren, keine monatlichen Kosten, keine versteckten Gebuehren. Fuer Mieter fallen nur die regulaeren Mietkosten an." },
              { q: "Wie schnell erhalte ich eine Antwort auf meine Anfrage?", a: "In der Regel meldet sich Ihr persoenlicher Berater innerhalb von 15 Minuten telefonisch bei Ihnen. Wir sind werktags von 8-18 Uhr erreichbar." },
              { q: "Was ist das Transparenzregister?", a: "Unser einzigartiges Transparenzregister ermoeglicht es Vermietern, Firmen zu bewerten. So schuetzen wir beide Seiten vor unzuverlaessigen Partnern — ein Feature, das kein anderer Anbieter hat." },
              { q: "Wie unterscheiden sich Monteurzimmer von Hotels?", a: "Unsere Monteurzimmer sind komplett moeblierte Apartments mit eigener Kueche, Bad und WLAN. Sie bieten mehr Platz und Komfort als Hotelzimmer — und das zu deutlich guenstigeren Preisen." },
              { q: "Kann ich auch fuer groessere Teams buchen?", a: "Selbstverstaendlich. Ob 3 oder 100 Mitarbeiter — wir finden die passende Loesung. Bei groesseren Teams organisieren wir auch komplette Wohnkomplexe." },
            ].map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          FINAL CTA
          ════════════════════════════════════════ */}
      <section className="bg-ink py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sp/10 rounded-full blur-[120px]" />
        </div>
        <div className="wrap text-center relative z-10 max-w-[580px] mx-auto">
          <h2 className="font-display text-3xl md:text-[2.75rem] text-white leading-tight mb-5">Bereit, loszulegen?</h2>
          <p className="text-white/40 text-lg leading-relaxed mb-10">Ob Unterkunft suchen oder Wohnung vermieten — unser Team steht Ihnen kostenlos und unverbindlich zur Seite.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/mieter" className="btn-primary !px-8 !py-4 text-base">Unterkunft finden <Arr s={18}/></Link>
            <Link href="/app" className="btn-ghost !px-8 !py-4 text-base">Kostenlos inserieren</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
