import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bewertungen & Erfahrungen",
  description: "266+ Google-Bewertungen mit 5.0 Sternen. Lesen Sie echte Erfahrungsberichte von Mietern und Vermietern.",
};

const REVIEWS = [
  { name: "Schlegel GmbH", role: "Mieter seit 2022", stars: 5, text: "Besonders hervorheben möchten wir Herrn Mansouri und Frau Schlaht, die stets freundlich, professionell und hilfsbereit sind. Absolut empfehlenswert!", init: "S" },
  { name: "Lisa Werkmeister", role: "Vermieterin seit 2021", stars: 5, text: "Die Kommunikation war einwandfrei, die Gäste waren freundlich und anständig. Wir freuen uns auf die weitere Zusammenarbeit mit Schlaf-Platz!", init: "L" },
  { name: "Wohnraum KKBBG", role: "Vermieter seit 2023", stars: 5, text: "Von der Anfrage über die Reservierung bis zur Buchung immer einwandfrei. Zusagen wurden bis dato immer eingehalten. Top Service!", init: "W" },
  { name: "Elektro Müller GmbH", role: "Mieter seit 2020", stars: 5, text: "Seit über 4 Jahren buchen wir regelmäßig über Schlaf-Platz. Der persönliche Service ist unschlagbar — wir bekommen immer genau die Unterkünfte, die wir brauchen.", init: "E" },
  { name: "Thomas Brauer", role: "Vermieter seit 2019", stars: 5, text: "Endlich eine Plattform ohne versteckte Kosten! Meine 3 Apartments sind ständig ausgelastet dank Schlaf-Platz. Die App macht die Verwaltung kinderleicht.", init: "T" },
  { name: "Bau-Team Nordwest", role: "Mieter seit 2023", stars: 5, text: "Wir hatten 45 Mitarbeiter auf einer Großbaustelle unterzubringen. Schlaf-Platz hat innerhalb von 2 Tagen alles organisiert. Hervorragende Koordination!", init: "B" },
  { name: "Andrea Fischer", role: "Vermieterin seit 2022", stars: 5, text: "Das Transparenzregister gibt mir ein gutes Gefühl. Ich weiß vorher, mit wem ich es zu tun habe. Keine bösen Überraschungen mehr seit ich bei Schlaf-Platz bin.", init: "A" },
  { name: "Sanitär Schmidt AG", role: "Mieter seit 2021", stars: 5, text: "Professionell, zuverlässig und schnell. Was will man mehr? Der Rückruf kam tatsächlich nach 12 Minuten — nicht 15. Bestnote!", init: "S" },
  { name: "Michael Krause", role: "Vermieter seit 2020", stars: 5, text: "Habe vorher bei einem kostenpflichtigen Portal inseriert. Bei Schlaf-Platz bekomme ich mehr Anfragen — und zahle nichts. Win-win.", init: "M" },
  { name: "Haustechnik Vogel", role: "Mieter seit 2024", stars: 5, text: "Erste Anfrage, erster Rückruf, erste Buchung — alles lief reibungslos. Die Wohnung war genau wie beschrieben. Gerne wieder!", init: "H" },
  { name: "Petra Zimmermann", role: "Vermieterin seit 2023", stars: 5, text: "Super nettes Team! Frau Schlaht hat mir bei der Erstellung meines Inserats geholfen. Innerhalb einer Woche hatte ich die ersten Buchungen.", init: "P" },
  { name: "Rohrbau GmbH & Co. KG", role: "Mieter seit 2019", stars: 5, text: "Wir setzen auf Schlaf-Platz für alle unsere Projekte in ganz Deutschland. Die Qualität der Unterkünfte ist durchgehend hoch. Unsere Mitarbeiter sind zufrieden.", init: "R" },
];

export default function BewertungenPage() {
  return (
    <div className="bg-white">
      <Navbar />

      <section className="bg-[#0b1220] pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="wrap max-w-[700px] text-center mx-auto">
          <div className="mb-5 flex justify-center [&_a]:text-white/30 [&_a:hover]:text-sp [&_span]:text-white/20 [&>nav>span:last-child>span]:text-white/50">
            <Breadcrumbs items={[{ label: "Startseite", href: "/" }, { label: "Bewertungen" }]} />
          </div>
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Kundenstimmen</p>
          <h1 className="font-display text-4xl md:text-6xl text-white uppercase tracking-wide leading-[0.95] mb-4">Was unsere Partner sagen.</h1>
          <p className="text-white/40 text-lg leading-relaxed">Echte Bewertungen von echten Kunden. {BRAND.stats.reviews}+ Google-Bewertungen mit 5.0 Sternen.</p>

          {/* Big Rating */}
          <div className="mt-8 inline-flex items-center gap-5 bg-white/[0.05] border border-white/[0.08] rounded-2xl px-8 py-5">
            <div className="text-center">
              <p className="font-display text-6xl text-white m-0">5.0</p>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width={18} height={18} viewBox="0 0 20 20" fill="#f59e0b"><path d="M10 1l2.47 5.01L18 6.89l-4 3.9.94 5.51L10 13.56l-4.94 2.74.94-5.51-4-3.9 5.53-.88L10 1z"/></svg>
                ))}
              </div>
              <p className="text-white/30 text-[12px] mt-1 m-0">{BRAND.stats.reviews}+ Bewertungen</p>
            </div>
            <div className="w-px h-16 bg-white/10" />
            <div className="text-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-1">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <p className="text-white text-[13px] font-bold m-0">Google Reviews</p>
              <p className="text-white/30 text-[11px] m-0">Verifizierte Bewertungen</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6 bg-white hover:shadow-lg hover:shadow-gray-100/80 transition-all flex flex-col">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(r.stars)].map((_, j) => (
                    <svg key={j} width={14} height={14} viewBox="0 0 20 20" fill="#f59e0b"><path d="M10 1l2.47 5.01L18 6.89l-4 3.9.94 5.51L10 13.56l-4.94 2.74.94-5.51-4-3.9 5.53-.88L10 1z"/></svg>
                  ))}
                </div>
                <p className="text-gray-500 text-[15px] leading-relaxed flex-1 mb-5">&bdquo;{r.text}&ldquo;</p>
                <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: "linear-gradient(135deg, #029fde, #0178a8)" }}>{r.init}</div>
                  <div>
                    <p className="font-bold text-[14px] text-ink m-0">{r.name}</p>
                    <p className="text-[12px] text-gray-300 m-0">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50/60 border-t border-gray-100">
        <div className="wrap text-center max-w-[500px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-ink uppercase tracking-wide mb-3">Überzeugt?</h2>
          <p className="text-gray-400 text-[15px] leading-relaxed mb-6">Werden Sie Teil der Schlaf-Platz Community — als Mieter oder Vermieter.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/mieter" className="cta-primary">Unterkunft finden</Link>
            <Link href="/app" className="cta-outline">Kostenlos inserieren</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
