import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqClient from "./FaqClient";
import { BRAND } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Häufige Fragen (FAQ)",
  description: "Antworten auf die häufigsten Fragen zu Monteurzimmern, Preisen, Buchung und Schlaf-Platz.",
};

const FAQ_CATEGORIES = [
  {
    title: "Allgemein",
    faqs: [
      { q: "Was ist Schlaf-Platz?", a: "Schlaf-Platz ist Deutschlands kostenlose Plattform für Monteurzimmer und möblierte Apartments. Wir vermitteln Unterkünfte für Handwerker, Monteure und Geschäftsreisende — persönlich und ohne Gebühren." },
      { q: "Ist Schlaf-Platz wirklich kostenlos?", a: "Ja — für Vermieter ist Schlaf-Platz zu 100% kostenlos. Keine Anmeldegebühren, keine monatlichen Kosten, keine Provisionen. Für Mieter fallen nur die regulären Mietkosten an, die direkt an den Vermieter gehen." },
      { q: "Wie unterscheidet sich Schlaf-Platz von anderen Portalen?", a: "Schlaf-Platz ist das einzige Portal mit Transparenzregister (gegenseitige Bewertungen), komplett kostenlos für Vermieter, mit eigener App (iOS & Android) und persönlicher Betreuung durch unser 23-köpfiges Team." },
      { q: "Seit wann gibt es Schlaf-Platz?", a: "Schlaf-Platz wurde 2014 als Genossenschaft (e.G.) gegründet und ist seitdem stetig gewachsen. Heute arbeiten wir mit über 1.500 verifizierten Partnern in mehr als 50 Städten zusammen." },
    ],
  },
  {
    title: "Für Mieter / Unternehmen",
    faqs: [
      { q: "Wie finde ich ein Monteurzimmer?", a: "Senden Sie eine kostenlose Anfrage über unser Formular (Stadt, Personenzahl, Zeitraum). Ihr persönlicher Berater meldet sich innerhalb von 15 Minuten mit passenden Vorschlägen." },
      { q: "Wie schnell bekomme ich eine Antwort?", a: "Werktags (Mo-Fr, 08:00-18:00 Uhr) erhalten Sie in der Regel innerhalb von 15 Minuten einen Rückruf. Anfragen außerhalb der Geschäftszeiten werden am nächsten Werktag bearbeitet." },
      { q: "Kann ich auch für große Teams buchen?", a: "Selbstverständlich. Ob 3 oder 100 Mitarbeiter — wir finden die passende Lösung, auch komplette Wohnkomplexe oder mehrere Apartments in einer Stadt." },
      { q: "Wie sind die Apartments ausgestattet?", a: "Alle Apartments sind komplett möbliert mit Küche, Bad, WLAN und Bettzeug. Vermieter mit Premium-Ausstattung (Waschmaschine, TV, Parkplatz) sind im Transparenzregister entsprechend gekennzeichnet." },
      { q: "Kann ich Monteurzimmer von der Steuer absetzen?", a: "Ja. Übernachtungskosten für Monteurzimmer sind in der Regel als Betriebsausgaben absetzbar. Details finden Sie in unserem Blog-Artikel zum Thema Steuer." },
    ],
  },
  {
    title: "Für Vermieter",
    faqs: [
      { q: "Wie kann ich mein Monteurzimmer inserieren?", a: "Registrieren Sie sich kostenlos über unsere Website oder App. Geben Sie Ihre Apartment-Details ein — fertig. Unser Team prüft Ihr Inserat und schaltet es innerhalb von 24 Stunden frei." },
      { q: "Was ist das Transparenzregister?", a: "Im Transparenzregister bewerten Vermieter Firmen und Firmen bewerten Vermieter. So schützen wir beide Seiten vor unzuverlässigen Partnern — einzigartig in Deutschland." },
      { q: "Welche Voraussetzungen muss mein Apartment erfüllen?", a: "Mindestanforderungen: Voll möbliert, eigene Küche (oder Kochgelegenheit), eigenes Bad, WLAN. Details finden Sie in unserer Ausstattungs-Checkliste im Blog." },
      { q: "Wie erhalte ich Buchungsanfragen?", a: "Sobald eine passende Anfrage eingeht, kontaktiert Sie unser Team telefonisch oder per App-Nachricht. Sie entscheiden selbst, ob Sie die Buchung annehmen." },
    ],
  },
  {
    title: "Preise & Zahlung",
    faqs: [
      { q: "Was kostet ein Monteurzimmer?", a: "Die Preise variieren nach Stadt und Ausstattung. Im Durchschnitt liegen sie zwischen 15 und 45 Euro pro Nacht und Person. In unserem Blog finden Sie aktuelle Preise nach Städten." },
      { q: "Gibt es versteckte Kosten?", a: "Nein. Weder für Mieter noch für Vermieter fallen Provisionen oder Vermittlungsgebühren an. Sie zahlen nur die mit dem Vermieter vereinbarte Miete." },
      { q: "Wie erfolgt die Bezahlung?", a: "Die Zahlung erfolgt direkt zwischen Mieter und Vermieter — per Überweisung, Bar oder nach individueller Vereinbarung. Schlaf-Platz ist nicht in den Zahlungsverkehr involviert." },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CATEGORIES.flatMap(cat =>
    cat.faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    }))
  ),
};

export default function FaqPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="bg-[#0b1220] pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="wrap max-w-[700px]">
          <div className="mb-5 [&_a]:text-white/30 [&_a:hover]:text-sp [&_span]:text-white/20 [&>nav>span:last-child>span]:text-white/50">
            <Breadcrumbs items={[{ label: "Startseite", href: "/" }, { label: "FAQ" }]} />
          </div>
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Häufige Fragen</p>
          <h1 className="font-display text-4xl md:text-6xl text-white uppercase tracking-wide leading-[0.95] mb-4">Alles was Sie wissen müssen.</h1>
          <p className="text-white/40 text-lg leading-relaxed">Hier finden Sie Antworten auf die häufigsten Fragen zu Schlaf-Platz, Monteurzimmern und unseren Services.</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="wrap max-w-[800px]">
          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.title} className="mb-12 last:mb-0">
              <h2 className="font-display text-2xl md:text-3xl text-ink uppercase tracking-wide mb-6">{cat.title}</h2>
              <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
                {cat.faqs.map((f, i) => (
                  <FaqClient key={i} q={f.q} a={f.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50/60 border-t border-gray-100">
        <div className="wrap text-center max-w-[500px] mx-auto">
          <h2 className="font-display text-3xl text-ink uppercase tracking-wide mb-3">Noch Fragen?</h2>
          <p className="text-gray-400 text-[15px] leading-relaxed mb-6">Unser Team hilft Ihnen gerne persönlich weiter.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/kontakt" className="cta-primary">Kontakt aufnehmen</Link>
            <a href={`tel:${BRAND.phone}`} className="cta-outline">{BRAND.phonePretty}</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
