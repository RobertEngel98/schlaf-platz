import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TITLE = "Datenschutzerklaerung";

export const metadata = { title: TITLE };

export default function Page() {
  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="wrap max-w-[700px]">
          <h1 className="font-display text-4xl md:text-5xl text-ink uppercase tracking-wide mb-4">{TITLE}</h1>
          <div className="border-t border-gray-100 pt-6 space-y-6 text-[15px] leading-relaxed text-ink-light">

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-ink font-bold text-base mb-2 mt-4">Allgemeine Hinweise</h3>
              <p>Die folgenden Hinweise geben einen einfachen Ueberblick darueber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persoenlich identifiziert werden koennen. Ausfuehrliche Informationen zum Thema Datenschutz entnehmen Sie unserer nachfolgend aufgefuehrten Datenschutzerklaerung.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">2. Verantwortliche Stelle</h2>
              <p className="m-0">Schlaf-Platz e.G.</p>
              <p className="m-0">Vertreten durch: Viktor Brehm</p>
              <p className="m-0 mt-2">Telefon: +49 160 95460613</p>
              <p className="m-0">E-Mail: <a href="mailto:info@schlaf-platz.com" className="text-sp hover:underline">info@schlaf-platz.com</a></p>
              <p className="mt-3">Verantwortliche Stelle ist die natuerliche oder juristische Person, die allein oder gemeinsam mit anderen ueber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">3. Datenerfassung auf dieser Website</h2>

              <h3 className="text-ink font-bold text-base mb-2 mt-4">Server-Log-Dateien</h3>
              <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns uebermittelt. Dies sind:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="mt-3">Eine Zusammenfuehrung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p>

              <h3 className="text-ink font-bold text-base mb-2 mt-6">Kontaktformular</h3>
              <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und fuer den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
              <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfuellung eines Vertrags zusammenhaengt oder zur Durchfuehrung vorvertraglicher Massnahmen erforderlich ist. In allen uebrigen Faellen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).</p>
              <p>Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Loeschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck fuer die Datenspeicherung entfaellt. Zwingende gesetzliche Bestimmungen — insbesondere Aufbewahrungsfristen — bleiben unberuehrt.</p>

              <h3 className="text-ink font-bold text-base mb-2 mt-6">Anfrage per E-Mail oder Telefon</h3>
              <p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">4. Cookies</h2>
              <p>Unsere Internetseiten verwenden teilweise sogenannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.</p>
              <p>Die meisten der von uns verwendeten Cookies sind sogenannte Session-Cookies. Sie werden nach Ende Ihres Besuchs automatisch geloescht. Andere Cookies bleiben auf Ihrem Endgeraet gespeichert, bis Sie diese loeschen. Diese Cookies ermoeglichen es uns, Ihren Browser beim naechsten Besuch wiederzuerkennen.</p>
              <p>Sie koennen Ihren Browser so einstellen, dass Sie ueber das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies fuer bestimmte Faelle oder generell ausschliessen sowie das automatische Loeschen der Cookies beim Schliessen des Browsers aktivieren.</p>
              <p>Die Speicherung von Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">5. SSL- bzw. TLS-Verschluesselung</h2>
              <p>Diese Seite nutzt aus Sicherheitsgruenden und zum Schutz der Uebertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschluesselung. Eine verschluesselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
              <p>Wenn die SSL- bzw. TLS-Verschluesselung aktiviert ist, koennen die Daten, die Sie an uns uebermitteln, nicht von Dritten mitgelesen werden.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">6. Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft ueber Herkunft, Empfaenger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben ausserdem ein Recht, die Berichtigung oder Loeschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, koennen Sie diese Einwilligung jederzeit fuer die Zukunft widerrufen. Ausserdem haben Sie das Recht, unter bestimmten Umstaenden die Einschraenkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</p>
              <p>Des Weiteren steht Ihnen ein Beschwerderecht bei der zustaendigen Aufsichtsbehoerde zu.</p>

              <h3 className="text-ink font-bold text-base mb-2 mt-4">Recht auf Datenportabilitaet</h3>
              <p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfuellung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gaengigen, maschinenlesbaren Format aushaendigen zu lassen.</p>

              <h3 className="text-ink font-bold text-base mb-2 mt-4">Recht auf Loeschung</h3>
              <p>Sie haben das Recht, die unverzuegliche Loeschung Ihrer personenbezogenen Daten zu verlangen, sofern nicht eine gesetzliche Aufbewahrungspflicht besteht.</p>

              <h3 className="text-ink font-bold text-base mb-2 mt-4">Widerspruchsrecht</h3>
              <p>Soweit die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht, haben Sie jederzeit das Recht, aus Gruenden, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Widerspruch einzulegen.</p>
            </div>

            <p className="text-gray-300 text-sm mt-8">Stand: Februar 2026</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
