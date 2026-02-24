"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnfrageForm from "@/components/AnfrageForm";
import { Arr, Faq, FadeIn } from "@/components/ui";
import { CityData, BRAND, getNearbyCities } from "@/lib/constants";

export default function CityClient({ city }: { city: CityData }) {
  return (
    <div className="bg-white">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative bg-[#0b1220] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full bg-sp/[0.08] blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-sp/[0.05] blur-[120px]" />
        </div>
        <div className="wrap relative z-10 pt-28 pb-12 md:pt-36 md:pb-14 max-w-[800px]">
          <div className="mb-5 [&_a]:text-white/30 [&_a:hover]:text-sp [&_span]:text-white/20 [&>nav>span:last-child>span]:text-white/50">
            <Breadcrumbs items={[{ label: "Startseite", href: "/" }, { label: "Staedte", href: "/#staedte" }, { label: `Monteurzimmer ${city.name}` }]} />
          </div>
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-4">{city.emoji} {city.bundesland}</p>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-[0.95] uppercase tracking-wide mb-4">Monteurzimmer in <span className="text-sp">{city.name}</span></h1>
          <p className="text-white/40 text-lg leading-relaxed mb-6">{city.heroDesc} Komplett moeblierte Apartments fuer Ihre Monteure — persoenlicher Rueckruf in 15 Minuten. Kostenlose Vermittlung durch Schlaf-Platz.</p>
          <div className="flex items-center gap-3 flex-wrap mb-8">
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <svg key={i} width={14} height={14} viewBox="0 0 20 20" fill="#f59e0b"><path d="M10 1l2.47 5.01L18 6.89l-4 3.9.94 5.51L10 13.56l-4.94 2.74.94-5.51-4-3.9 5.53-.88L10 1z"/></svg>)}</div>
              <span className="text-white/50 text-[13px]"><strong className="text-white">{BRAND.stats.rating}</strong>/5 bei <strong className="text-white">{BRAND.stats.reviews}+</strong> Bewertungen</span>
            </div>
            <span className="text-white/15">|</span>
            <span className="text-white/40 text-[13px]">100% kostenlose Vermittlung</span>
          </div>
          <a href="#anfrage" className="cta-primary">Jetzt Monteurzimmer in {city.name} anfragen <Arr s={18} /></a>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <div className="border-b border-gray-100 py-5 bg-gray-50/50">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ v: city.einwohner, l: "Einwohner" }, { v: city.flaeche, l: "Flaeche" }, { v: city.autobahnen, l: "Autobahnen" }, { v: city.bahnhof, l: "Hauptbahnhof" }].map(s => (
            <div key={s.l}>
              <p className="text-base md:text-lg font-bold text-ink m-0">{s.v}</p>
              <p className="text-[10px] text-gray-300 uppercase tracking-[0.15em] font-bold mt-1 m-0">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SEO ARTIKEL — Monteurzimmer in [Stadt] ═══ */}
      <section className="py-12 md:py-16 border-b border-gray-100">
        <div className="wrap max-w-[800px]">
          <div className="prose max-w-none text-[16px] leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-ink [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-ink [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-500 [&_p]:mb-4 [&_ul]:text-gray-500 [&_li]:text-gray-500 [&_strong]:text-ink">

            <h2>Monteurzimmer in {city.name} — moeblierte Apartments fuer Handwerker &amp; Monteure</h2>
            <p>
              Sie suchen ein <strong>Monteurzimmer in {city.name}</strong>? Schlaf-Platz vermittelt Ihnen komplett moeblierte Apartments in {city.name} und Umgebung — kostenlos, persoenlich und innerhalb von 15 Minuten. Ob Einzelzimmer oder Unterkuenfte fuer grosse Teams: Wir finden die passende Loesung fuer Ihren Einsatz in {city.name}.
            </p>
            <p>
              {city.name} ({city.bundesland}) mit {city.einwohner} Einwohnern ist ein wichtiger Wirtschaftsstandort mit den Branchen {city.branchen}. Grosse Arbeitgeber wie {city.unternehmen} sorgen fuer eine hohe Nachfrage nach Monteurzimmern und moeblierten Apartments in der Region.
            </p>

            <h2>Warum Monteurzimmer in {city.name} ueber Schlaf-Platz buchen?</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>100% kostenlose Vermittlung</strong> — keine Gebuehren, keine Provision, keine versteckten Kosten</li>
              <li><strong>Persoenlicher Rueckruf in 15 Minuten</strong> — Ihr Berater meldet sich mit passenden Vorschlaegen</li>
              <li><strong>Komplett moeblierte Apartments</strong> — Kueche, Bad, WLAN, Bettzeug inklusive</li>
              <li><strong>Transparenzregister</strong> — gegenseitige Bewertungen schuetzen Mieter und Vermieter</li>
              <li><strong>Flexible Buchungsdauer</strong> — von einer Woche bis zu mehreren Monaten</li>
              <li><strong>Ueber {BRAND.stats.partners.toLocaleString("de-DE")} verifizierte Partner</strong> in ganz Deutschland</li>
            </ul>

            <h2>Beliebte Stadtteile fuer Monteurzimmer in {city.name}</h2>
            <p>
              Je nach Einsatzort in {city.name} bieten sich verschiedene Stadtteile fuer Ihr Monteurzimmer an. Unsere Empfehlungen fuer {city.name}:
            </p>
          </div>
        </div>
      </section>

      {/* ═══ STADTTEILE — Detail-Karten ═══ */}
      <section className="py-12 md:py-16 border-b border-gray-100 bg-gray-50/40">
        <div className="wrap">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Stadtteile</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[0.95] uppercase tracking-wide mb-4">Monteurzimmer-Standorte in <span className="text-sp">{city.name}</span></h2>
          <p className="text-gray-400 text-[15px] mb-10 max-w-[600px]">Alle Stadtteile bieten gute Anbindung an Industrie- und Gewerbegebiete. Unsere Berater kennen die besten Lagen.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {city.stadtteile.map((st, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div className="border border-gray-100 rounded-2xl p-5 bg-white hover:shadow-md hover:shadow-gray-100/80 transition-all">
                  <h3 className="text-ink font-bold mb-1.5">Monteurzimmer in {city.name}-{st.name}</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed m-0">{st.desc} Moeblierte Apartments und Monteurzimmer sind hier gut verfuegbar.</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FORMULAR (1. Einbettung — nach Stadtteilen) ═══ */}
      <section id="anfrage" className="py-14 md:py-20 border-b border-gray-100">
        <div className="wrap">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Kostenlose Anfrage</p>
          <p className="text-gray-400 text-[15px] mb-8 max-w-[600px]">Fuellung Sie das Formular aus und erhalten Sie innerhalb von 15 Minuten einen persoenlichen Rueckruf mit passenden Monteurzimmern in {city.name}.</p>
          <AnfrageForm defaultCity={city.slug} />
        </div>
      </section>

      {/* ═══ INDUSTRIE & WIRTSCHAFT ═══ */}
      <section className="py-12 md:py-16 border-b border-gray-100">
        <div className="wrap">
          <div className="max-w-[800px] mb-10">
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Industrie &amp; Wirtschaft</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-[0.95] uppercase tracking-wide mb-4">Warum Monteurzimmer in {city.name} <span className="text-sp">gefragt sind</span></h2>
            <p className="text-gray-400 text-[15px] leading-relaxed">{city.name} ist ein bedeutender Standort fuer {city.branchen}. Unternehmen wie {city.unternehmen} beschaeftigen tausende Fachkraefte und sorgen fuer eine konstante Nachfrage nach moeblierten Apartments und Monteurzimmern.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {city.industrie.map((ind, i) => (
              <FadeIn key={i} delay={i * 50}>
                <div className="border border-gray-100 rounded-2xl p-5 bg-white hover:shadow-md hover:shadow-gray-100/80 transition-all">
                  <h3 className="text-ink font-bold mb-1.5">{ind.name}</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed m-0">{ind.desc} Monteurzimmer in der Naehe sind ueber Schlaf-Platz verfuegbar.</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEO ARTIKEL Teil 2 — Preise & Tipps ═══ */}
      <section className="py-12 md:py-16 border-b border-gray-100">
        <div className="wrap max-w-[800px]">
          <div className="prose max-w-none text-[16px] leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-ink [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-ink [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-500 [&_p]:mb-4 [&_ul]:text-gray-500 [&_li]:text-gray-500 [&_strong]:text-ink">

            <h2>Was kostet ein Monteurzimmer in {city.name}?</h2>
            <p>
              Die Preise fuer <strong>Monteurzimmer in {city.name}</strong> variieren je nach Lage, Ausstattung und Buchungsdauer. Im Durchschnitt liegen die Kosten zwischen <strong>15 und 45 Euro pro Nacht und Person</strong>. Apartments in Randlagen oder bei Langzeitbuchungen (ab 4 Wochen) sind deutlich guenstiger.
            </p>
            <p>
              {city.messen && city.messen.length > 0
                ? `Waehrend grosser Messen und Events (${city.messen.slice(0, 3).join(", ")}) koennen die Preise in ${city.name} um 30-50% steigen. Wir empfehlen, fruehzeitig anzufragen.`
                : `Die Preise bleiben in ${city.name} das ganze Jahr ueber relativ stabil. Fruehzeitige Anfragen sichern die besten Angebote.`
              }
            </p>
            <p>
              Bei Schlaf-Platz ist die Vermittlung von Monteurzimmern in {city.name} <strong>komplett kostenlos</strong> — Sie zahlen nur die reine Miete, ohne versteckte Gebuehren oder Provisionen. Fordern Sie jetzt ein individuelles Angebot an.
            </p>

            <h2>Monteurzimmer in {city.name}: Ausstattung &amp; Standards</h2>
            <p>
              Alle ueber Schlaf-Platz vermittelten Monteurzimmer in {city.name} erfuellen unsere Qualitaetsstandards:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Voll moebliert</strong> — Bett, Schrank, Tisch, Stuehle und komplette Ausstattung</li>
              <li><strong>Eigene Kueche</strong> — Herd, Kuehlschrank, Geschirr und Kochutensilien</li>
              <li><strong>Eigenes Bad</strong> — Dusche oder Badewanne, Handtuecher, Toilettenartikel</li>
              <li><strong>Stabiles WLAN</strong> — fuer Berichte, Kommunikation und Freizeit</li>
              <li><strong>Bettwaesche &amp; Handtuecher</strong> — inklusive regelmaessigem Wechsel</li>
            </ul>

            <h2>Monteurzimmer in {city.name} fuer grosse Teams</h2>
            <p>
              Sie benoetigen Unterkuenfte fuer 10, 50 oder sogar 100 Mitarbeiter in {city.name}? Kein Problem. Schlaf-Platz organisiert <strong>Gruppenunterkuenfte in {city.name}</strong> — von einzelnen Apartments bis hin zu ganzen Wohnkomplexen. Unser Team koordiniert die gesamte Logistik, damit Sie sich auf Ihr Projekt konzentrieren koennen.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ MESSEN ═══ */}
      {city.messen && city.messen.length > 0 && (
        <section className="py-12 md:py-16 border-b border-gray-100 bg-gray-50/40">
          <div className="wrap">
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Messen &amp; Events</p>
            <h2 className="font-display text-4xl text-ink uppercase tracking-wide mb-4">Monteurzimmer in {city.name} waehrend Messen</h2>
            <p className="text-gray-400 text-[15px] mb-8 max-w-[600px]">Waehrend grosser Messen und Events steigt die Nachfrage nach Monteurzimmern in {city.name} deutlich. Fruehzeitig anfragen lohnt sich!</p>
            <div className="flex flex-wrap gap-2">
              {city.messen.map(m => (
                <span key={m} className="text-[13px] text-ink font-medium border border-gray-100 rounded-full px-4 py-2 bg-white hover:border-sp/30 hover:text-sp transition-colors">{m}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ SEHENSWUERDIGKEITEN ═══ */}
      {city.sights && city.sights.length > 0 && (
        <section className="py-12 md:py-16 border-b border-gray-100">
          <div className="wrap">
            <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Nach Feierabend</p>
            <h2 className="font-display text-4xl text-ink uppercase tracking-wide mb-4">{city.name} entdecken — Tipps fuer Monteure</h2>
            <p className="text-gray-400 text-[15px] mb-8 max-w-[600px]">Nach der Arbeit gibt es in {city.name} einiges zu erleben. Hier sind die beliebtesten Sehenswuerdigkeiten:</p>
            <div className="flex flex-wrap gap-2">
              {city.sights.map(s => (
                <span key={s} className="text-[13px] text-gray-500 border border-gray-100 rounded-full px-4 py-2 bg-gray-50/50 hover:border-sp/30 hover:text-sp transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FAQ ═══ */}
      <section className="py-12 md:py-16 border-b border-gray-100 bg-gray-50/40">
        <div className="wrap max-w-[700px]">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">FAQ</p>
          <h2 className="font-display text-4xl text-ink uppercase tracking-wide mb-8">Haeufige Fragen zu Monteurzimmern in {city.name}</h2>
          <Faq q={`Wie finde ich ein Monteurzimmer in ${city.name}?`} a={`Fuellung Sie unser kostenloses Anfrageformular auf dieser Seite aus oder rufen Sie uns an unter ${BRAND.phonePretty}. Sie erhalten innerhalb von 15 Minuten einen persoenlichen Rueckruf mit passenden Apartments in ${city.name}. Die Vermittlung ist komplett kostenlos.`} />
          <Faq q={`Was kostet ein Monteurzimmer in ${city.name}?`} a={`Die Preise fuer Monteurzimmer in ${city.name} liegen zwischen 15 und 45 Euro pro Nacht und Person, je nach Lage und Ausstattung. Langzeitbuchungen ab 4 Wochen sind deutlich guenstiger. Fordern Sie ein individuelles Angebot an — kostenlos.`} />
          <Faq q={`Welche Stadtteile in ${city.name} sind fuer Monteurzimmer empfehlenswert?`} a={`Beliebte Standorte fuer Monteurzimmer in ${city.name}: ${city.stadtteile.map(s => s.name).join(", ")}. Alle bieten gute Anbindung an die Industriegebiete und Autobahnen (${city.autobahnen}).`} />
          <Faq q={`Gibt es Monteurzimmer in ${city.name} fuer groessere Teams?`} a={`Ja — ob 3 oder 100 Mitarbeiter, wir finden passende Loesungen in ${city.name}. Auch ganze Wohnkomplexe oder mehrere Apartments in einem Stadtteil. Fragen Sie einfach an.`} />
          <Faq q={`Kann ich Monteurzimmer in ${city.name} von der Steuer absetzen?`} a={`Ja. Uebernachtungskosten fuer Monteurzimmer in ${city.name} sind als Betriebsausgaben absetzbar. Zudem gelten Verpflegungspauschalen (14€ ab 8h, 28€ ab 24h). Sie erhalten eine ordnungsgemaesse Rechnung.`} />
          <Faq q={`Wie ist die Ausstattung der Monteurzimmer in ${city.name}?`} a={`Alle Apartments sind komplett moebliert: eigene Kueche mit Herd und Kuehlschrank, eigenes Bad, stabiles WLAN, Bettwaesche und Handtuecher. Viele bieten zusaetzlich Waschmaschine, TV und Parkplatz.`} />
        </div>
      </section>

      {/* ═══ WEITERE STAEDTE IN DER NAEHE ═══ */}
      {(() => {
        const nearby = getNearbyCities(city.slug, 6);
        if (nearby.length === 0) return null;
        return (
          <section className="py-12 md:py-16 border-b border-gray-100">
            <div className="wrap">
              <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Weitere Standorte</p>
              <h2 className="font-display text-4xl text-ink uppercase tracking-wide mb-4">Monteurzimmer in der Naehe von <span className="text-sp">{city.name}</span></h2>
              <p className="text-gray-400 text-[15px] mb-8 max-w-[600px]">Sie suchen auch Monteurzimmer in anderen Staedten? Hier finden Sie weitere Standorte in der Region:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nearby.map((nc, i) => (
                  <FadeIn key={nc.slug} delay={i * 40}>
                    <Link href={`/monteurzimmer-${nc.slug}`} className="group flex items-start gap-4 rounded-2xl border border-gray-100 p-5 bg-white no-underline hover:border-sp/30 hover:shadow-md hover:shadow-sp/5 transition-all">
                      <span className="text-2xl mt-0.5">{nc.emoji}</span>
                      <div className="min-w-0">
                        <h3 className="font-bold text-ink text-base group-hover:text-sp transition-colors m-0">Monteurzimmer {nc.name}</h3>
                        <p className="text-gray-400 text-[13px] mt-1 m-0 line-clamp-2">{nc.tagline} — {nc.bundesland}</p>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/#staedte" className="text-sp text-sm font-bold uppercase tracking-wide hover:underline inline-flex items-center gap-2">Alle Staedte anzeigen <Arr s={14} /></Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ═══ FORMULAR (2. Einbettung — vor Footer) ═══ */}
      <section className="py-14 md:py-20 bg-[#0b1220]">
        <div className="wrap">
          <div className="text-center max-w-[600px] mx-auto mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-white leading-[0.95] uppercase tracking-wide mb-4">Monteurzimmer in {city.name} <span className="text-sp">jetzt anfragen</span></h2>
            <p className="text-white/40 text-lg leading-relaxed">Kostenlos, persoenlich und in 15 Minuten. Fuellung Sie das Formular aus — wir kuemmern uns um den Rest.</p>
          </div>
          <div className="max-w-[600px] mx-auto [&_label]:!text-white/40 [&_.input-light]:!bg-white/[0.06] [&_.input-light]:!border-white/[0.1] [&_.input-light]:!text-white [&_.input-light]:placeholder:!text-white/25 [&_.input-light]:focus:!border-sp [&_select]:!text-white [&_option]:!bg-[#111] [&_option]:!text-white">
            <AnfrageForm defaultCity={city.slug} compact />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
