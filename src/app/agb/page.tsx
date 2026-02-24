import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TITLE = "Allgemeine Geschäftsbedingungen";

export const metadata = { title: TITLE };

export default function Page() {
  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="wrap max-w-[700px]">
          <h1 className="font-display text-4xl md:text-5xl text-ink uppercase tracking-wide mb-4">AGB</h1>
          <div className="border-t border-gray-100 pt-6 space-y-6 text-[15px] leading-relaxed text-ink-light">

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 1 Geltungsbereich</h2>
              <p>(1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Vermittlungsplattform monteurzimmerapartments.de, betrieben von der Schlaf-Platz e.G. (nachfolgend &quot;Schlaf-Platz&quot; oder &quot;wir&quot;).</p>
              <p>(2) Die AGB gelten für alle Nutzer der Plattform, einschließlich Vermieter von Monteurzimmern und Apartments (nachfolgend &quot;Vermieter&quot;) sowie Unternehmen und Personen, die Unterkünfte suchen (nachfolgend &quot;Mieter&quot;).</p>
              <p>(3) Abweichende Bedingungen des Nutzers werden nicht anerkannt, es sei denn, Schlaf-Platz stimmt deren Geltung ausdrücklich schriftlich zu.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 2 Vertragspartner und Leistungsbeschreibung</h2>
              <p>(1) Schlaf-Platz betreibt eine Vermittlungsplattform für Monteurzimmer und möblierte Apartments. Schlaf-Platz tritt als Vermittler zwischen Vermietern und Mietern auf.</p>
              <p>(2) Der Mietvertrag kommt ausschließlich zwischen Vermieter und Mieter zustande. Schlaf-Platz ist nicht Vertragspartei des Mietverhältnisses.</p>
              <p>(3) Schlaf-Platz bietet folgende Leistungen an:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Vermittlung von Monteurzimmern und möblierten Apartments</li>
                <li>Persönliche Beratung und Rückruf-Service</li>
                <li>Qualitätssicherung durch das Transparenzregister</li>
                <li>Buchungsmanagement und Rechnungsstellung</li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 3 Registrierung und Nutzerkonto</h2>
              <p>(1) Für die Nutzung bestimmter Funktionen der Plattform kann eine Registrierung erforderlich sein.</p>
              <p>(2) Bei der Registrierung ist der Nutzer verpflichtet, wahrheitsgemäße und vollständige Angaben zu machen und diese bei Änderungen unverzüglich zu aktualisieren.</p>
              <p>(3) Der Nutzer ist für die Geheimhaltung seiner Zugangsdaten selbst verantwortlich.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 4 Kosten und Gebühren</h2>
              <p>(1) Die Nutzung der Plattform ist für Vermieter dauerhaft und vollständig kostenlos. Es fallen keine Anmeldegebühren, monatlichen Kosten oder Provisionen an.</p>
              <p>(2) Für Mieter fallen ausschließlich die mit dem Vermieter vereinbarten Mietkosten an. Die Vermittlung durch Schlaf-Platz ist für Mieter ebenfalls kostenlos.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 5 Pflichten der Vermieter</h2>
              <p>(1) Der Vermieter verpflichtet sich, nur Unterkünfte anzubieten, die den gesetzlichen Anforderungen entsprechen und den auf der Plattform gemachten Angaben genügen.</p>
              <p>(2) Die angebotenen Unterkünfte müssen komplett möblierte Apartments mit eigener Küche, Bad und WLAN sein. Mehrbettzimmer und Gemeinschaftsunterkünfte sind nicht zugelassen.</p>
              <p>(3) Der Vermieter ist verpflichtet, Buchungsanfragen zeitnah zu beantworten und vereinbarte Buchungen einzuhalten.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 6 Pflichten der Mieter</h2>
              <p>(1) Der Mieter verpflichtet sich, die gemietete Unterkunft pfleglich zu behandeln und bei Auszug in ordnungsgemäßem Zustand zu hinterlassen.</p>
              <p>(2) Der Mieter ist verpflichtet, die vereinbarte Miete fristgerecht zu entrichten.</p>
              <p>(3) Schäden an der Unterkunft sind unverzüglich dem Vermieter und Schlaf-Platz zu melden.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 7 Transparenzregister</h2>
              <p>(1) Schlaf-Platz betreibt ein einzigartiges Transparenzregister, in dem Vermieter Mieter und Mieter Vermieter bewerten können.</p>
              <p>(2) Bewertungen müssen wahrheitsgemäß und sachlich sein. Schlaf-Platz behält sich das Recht vor, Bewertungen zu entfernen, die gegen diese Grundsätze verstoßen.</p>
              <p>(3) Das Transparenzregister dient dem Schutz beider Parteien und der Qualitätssicherung auf der Plattform.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 8 Haftung</h2>
              <p>(1) Schlaf-Platz haftet als Vermittler nicht für die Qualität der vermittelten Unterkünfte, die Zuverlässigkeit der Vertragspartner oder die Erfüllung des Mietvertrags.</p>
              <p>(2) Schlaf-Platz haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für vorsätzlich oder grob fahrlässig verursachte Schäden.</p>
              <p>(3) Im Übrigen haftet Schlaf-Platz nur für die Verletzung wesentlicher Vertragspflichten. In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 9 Datenschutz</h2>
              <p>Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemäß unserer <a href="/datenschutzerklaerung" className="text-sp hover:underline">Datenschutzerklärung</a>, die Bestandteil dieser AGB ist.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 10 Änderungen der AGB</h2>
              <p>(1) Schlaf-Platz behält sich vor, diese AGB jederzeit zu ändern. Über Änderungen werden registrierte Nutzer per E-Mail informiert.</p>
              <p>(2) Widerspricht der Nutzer den geänderten AGB nicht innerhalb von 14 Tagen nach Zugang der Änderungsmitteilung, gelten die geänderten AGB als angenommen.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 11 Schlussbestimmungen</h2>
              <p>(1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.</p>
              <p>(2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
              <p>(3) Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesen AGB ist — soweit gesetzlich zulässig — der Sitz der Schlaf-Platz e.G.</p>
            </div>

            <p className="text-gray-300 text-sm mt-8">Stand: Februar 2026</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
