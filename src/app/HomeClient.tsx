"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AnimNum, Stars, Arr, Chk, Faq, FadeIn } from "@/components/ui";
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

      {/* ═══ HERO — dark section ═══ */}
      <section className="relative bg-[#0b1220] min-h-[92svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full bg-sp/[0.08] blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-sp/[0.05] blur-[120px]" />
        </div>
        <div className="wrap relative z-10 pt-28 pb-14 md:pt-36 md:pb-16">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-5 animate-fade-in">Die Nr. 1 Plattform fuer Monteurzimmer in Deutschland</p>
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-white leading-[0.95] tracking-wide uppercase mb-6 max-w-[850px] animate-fade-up">
            Monteurzimmer finden<br /><span className="text-sp">in unter 15 Minuten.</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-[560px] mb-2 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Ueber <strong className="text-white">1.500 verifizierte Vermieter</strong> in 50+ Staedten. Komplett moeblierte Apartments — <strong className="text-white">ohne Gebuehren, ohne Risiko.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
            <Link href="/mieter" className="cta-primary">Kostenlos Unterkunft anfragen <Arr s={18} /></Link>
            <span className="text-white/25 text-[13px] pt-3.5">100% kostenlos &middot; Rueckruf in 15 Min.</span>
          </div>
          <div className="mt-7 animate-fade-up" style={{ animationDelay: "300ms" }}><TrustBadge /></div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-up" style={{ animationDelay: "400ms" }}>
            {[
              { v: <AnimNum end={1500} suffix="+" />, l: "Verifizierte Partner" },
              { v: <AnimNum end={50} suffix="+" />, l: "Staedte in DE" },
              { v: "5.0", l: "Google Bewertung" },
              { v: "0 \u20AC", l: "Fuer Vermieter" },
            ].map((s, i) => (
              <div key={i} className="border border-white/[0.06] rounded-2xl p-4 text-center bg-white/[0.03]">
                <p className="text-2xl md:text-3xl font-bold text-white mb-0.5">{s.v}</p>
                <p className="text-[10px] text-white/25 font-bold uppercase tracking-[0.15em]">{s.l}</p>
              </div>
            ))}
          </div>
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
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide max-w-[700px] mb-3">
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
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide max-w-[700px] mb-3">
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
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide max-w-[750px] mb-10">
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

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-14 md:py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Kundenstimmen</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide max-w-[600px] mb-10">
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

      {/* ═══ DUAL CTA ═══ */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FadeIn>
              <div className="relative rounded-2xl p-7 md:p-9 overflow-hidden h-full border border-sp/15 bg-sp/[0.03]">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-sp/[0.06] rounded-full blur-[80px]" />
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sp">Fuer Unternehmen &amp; Handwerker</span>
                  <h3 className="font-display text-3xl md:text-4xl text-ink leading-[0.95] uppercase tracking-wide mt-2 mb-3">Monteurzimmer finden</h3>
                  <p className="text-gray-400 text-[15px] leading-relaxed mb-5">Ob 3 oder 100 Mitarbeiter — persoenlicher Rueckruf in 15 Minuten. Komplett kostenlos.</p>
                  <div className="space-y-2 mb-5">
                    {["Persoenlicher Ansprechpartner","Rueckruf in 15 Minuten","Keine Buchungsgebuehren"].map(t => (
                      <div key={t} className="flex items-center gap-2.5"><Chk /><span className="text-gray-400 text-[13px]">{t}</span></div>
                    ))}
                  </div>
                  <Link href="/mieter" className="cta-primary">Jetzt anfragen <Arr s={16}/></Link>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="rounded-2xl p-7 md:p-9 border border-gray-100 bg-white h-full">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300">Fuer Vermieter &amp; Eigentuemer</span>
                <h3 className="font-display text-3xl md:text-4xl text-ink leading-[0.95] uppercase tracking-wide mt-2 mb-3">Kostenlos inserieren</h3>
                <p className="text-gray-400 text-[15px] leading-relaxed mb-5">Erreichen Sie tausende Handwerksfirmen. Transparenzregister inklusive.</p>
                <div className="space-y-2 mb-5">
                  {["0 Euro Gebuehren — dauerhaft","Transparenzregister inklusive","Persoenliche Betreuung"].map(t => (
                    <div key={t} className="flex items-center gap-2.5"><Chk /><span className="text-gray-400 text-[13px]">{t}</span></div>
                  ))}
                </div>
                <Link href="/app" className="cta-outline">Kostenlos inserieren <Arr s={16}/></Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ CITIES ═══ */}
      <section className="py-14 md:py-20 bg-gray-50/60 border-y border-gray-100" id="staedte">
        <div className="wrap">
          <FadeIn>
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Standorte</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-ink leading-[0.95] uppercase tracking-wide max-w-[700px] mb-10">
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
      <section className="py-14 md:py-20">
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
