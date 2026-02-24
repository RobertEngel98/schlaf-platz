import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TITLE = "Allgemeine Geschaeftsbedingungen";

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
              <p>(1) Diese Allgemeinen Geschaeftsbedingungen (AGB) gelten fuer die Nutzung der Vermittlungsplattform monteurzimmerapartments.de, betrieben von der Schlaf-Platz e.G. (nachfolgend &quot;Schlaf-Platz&quot; oder &quot;wir&quot;).</p>
              <p>(2) Die AGB gelten fuer alle Nutzer der Plattform, einschliesslich Vermieter von Monteurzimmern und Apartments (nachfolgend &quot;Vermieter&quot;) sowie Unternehmen und Personen, die Unterkuenfte suchen (nachfolgend &quot;Mieter&quot;).</p>
              <p>(3) Abweichende Bedingungen des Nutzers werden nicht anerkannt, es sei denn, Schlaf-Platz stimmt deren Geltung ausdruecklich schriftlich zu.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 2 Vertragspartner und Leistungsbeschreibung</h2>
              <p>(1) Schlaf-Platz betreibt eine Vermittlungsplattform fuer Monteurzimmer und moeblierte Apartments. Schlaf-Platz tritt als Vermittler zwischen Vermietern und Mietern auf.</p>
              <p>(2) Der Mietvertrag kommt ausschliesslich zwischen Vermieter und Mieter zustande. Schlaf-Platz ist nicht Vertragspartei des Mietverhaeltnisses.</p>
              <p>(3) Schlaf-Platz bietet folgende Leistungen an:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Vermittlung von Monteurzimmern und moeblierten Apartments</li>
                <li>Persoenliche Beratung und Rueckruf-Service</li>
                <li>Qualitaetssicherung durch das Transparenzregister</li>
                <li>Buchungsmanagement und Rechnungsstellung</li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 3 Registrierung und Nutzerkonto</h2>
              <p>(1) Fuer die Nutzung bestimmter Funktionen der Plattform kann eine Registrierung erforderlich sein.</p>
              <p>(2) Bei der Registrierung ist der Nutzer verpflichtet, wahrheitsgemaesse und vollstaendige Angaben zu machen und diese bei Aenderungen unverzueglich zu aktualisieren.</p>
              <p>(3) Der Nutzer ist fuer die Geheimhaltung seiner Zugangsdaten selbst verantwortlich.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 4 Kosten und Gebuehren</h2>
              <p>(1) Die Nutzung der Plattform ist fuer Vermieter dauerhaft und vollstaendig kostenlos. Es fallen keine Anmeldegebuehren, monatlichen Kosten oder Provisionen an.</p>
              <p>(2) Fuer Mieter fallen ausschliesslich die mit dem Vermieter vereinbarten Mietkosten an. Die Vermittlung durch Schlaf-Platz ist fuer Mieter ebenfalls kostenlos.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 5 Pflichten der Vermieter</h2>
              <p>(1) Der Vermieter verpflichtet sich, nur Unterkuenfte anzubieten, die den gesetzlichen Anforderungen entsprechen und den auf der Plattform gemachten Angaben genuegen.</p>
              <p>(2) Die angebotenen Unterkuenfte muessen komplett moeblierte Apartments mit eigener Kueche, Bad und WLAN sein. Mehrbettzimmer und Gemeinschaftsunterkuenfte sind nicht zugelassen.</p>
              <p>(3) Der Vermieter ist verpflichtet, Buchungsanfragen zeitnah zu beantworten und vereinbarte Buchungen einzuhalten.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 6 Pflichten der Mieter</h2>
              <p>(1) Der Mieter verpflichtet sich, die gemietete Unterkunft pfleglich zu behandeln und bei Auszug in ordnungsgemaessem Zustand zu hinterlassen.</p>
              <p>(2) Der Mieter ist verpflichtet, die vereinbarte Miete fristgerecht zu entrichten.</p>
              <p>(3) Schaeden an der Unterkunft sind unverzueglich dem Vermieter und Schlaf-Platz zu melden.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 7 Transparenzregister</h2>
              <p>(1) Schlaf-Platz betreibt ein einzigartiges Transparenzregister, in dem Vermieter Mieter und Mieter Vermieter bewerten koennen.</p>
              <p>(2) Bewertungen muessen wahrheitsgemaess und sachlich sein. Schlaf-Platz behaelt sich das Recht vor, Bewertungen zu entfernen, die gegen diese Grundsaetze verstossen.</p>
              <p>(3) Das Transparenzregister dient dem Schutz beider Parteien und der Qualitaetssicherung auf der Plattform.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 8 Haftung</h2>
              <p>(1) Schlaf-Platz haftet als Vermittler nicht fuer die Qualitaet der vermittelten Unterkuenfte, die Zuverlaessigkeit der Vertragspartner oder die Erfuellung des Mietvertrags.</p>
              <p>(2) Schlaf-Platz haftet unbeschraenkt fuer Schaeden aus der Verletzung des Lebens, des Koerpers oder der Gesundheit sowie fuer vorsaetzlich oder grob fahrlaessig verursachte Schaeden.</p>
              <p>(3) Im Uebrigen haftet Schlaf-Platz nur fuer die Verletzung wesentlicher Vertragspflichten. In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 9 Datenschutz</h2>
              <p>Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemaess unserer <a href="/datenschutzerklaerung" className="text-sp hover:underline">Datenschutzerklaerung</a>, die Bestandteil dieser AGB ist.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 10 Aenderungen der AGB</h2>
              <p>(1) Schlaf-Platz behaelt sich vor, diese AGB jederzeit zu aendern. Ueber Aenderungen werden registrierte Nutzer per E-Mail informiert.</p>
              <p>(2) Widerspricht der Nutzer den geaenderten AGB nicht innerhalb von 14 Tagen nach Zugang der Aenderungsmitteilung, gelten die geaenderten AGB als angenommen.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">§ 11 Schlussbestimmungen</h2>
              <p>(1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.</p>
              <p>(2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der uebrigen Bestimmungen unberuehrt.</p>
              <p>(3) Gerichtsstand fuer alle Streitigkeiten aus oder im Zusammenhang mit diesen AGB ist — soweit gesetzlich zulaessig — der Sitz der Schlaf-Platz e.G.</p>
            </div>

            <p className="text-gray-300 text-sm mt-8">Stand: Februar 2026</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
