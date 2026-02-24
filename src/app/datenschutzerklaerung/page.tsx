import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TITLE = "Datenschutzerklärung";

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
              <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer nachfolgend aufgeführten Datenschutzerklärung.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">2. Verantwortliche Stelle</h2>
              <p className="m-0">Schlaf-Platz e.G.</p>
              <p className="m-0">Vertreten durch: Viktor Brehm</p>
              <p className="m-0 mt-2">Telefon: +49 160 95460613</p>
              <p className="m-0">E-Mail: <a href="mailto:info@schlaf-platz.com" className="text-sp hover:underline">info@schlaf-platz.com</a></p>
              <p className="mt-3">Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">3. Datenerfassung auf dieser Website</h2>

              <h3 className="text-ink font-bold text-base mb-2 mt-4">Server-Log-Dateien</h3>
              <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="mt-3">Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p>

              <h3 className="text-ink font-bold text-base mb-2 mt-6">Kontaktformular</h3>
              <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
              <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).</p>
              <p>Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen — insbesondere Aufbewahrungsfristen — bleiben unberührt.</p>

              <h3 className="text-ink font-bold text-base mb-2 mt-6">Anfrage per E-Mail oder Telefon</h3>
              <p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">4. Cookies</h2>
              <p>Unsere Internetseiten verwenden teilweise sogenannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.</p>
              <p>Die meisten der von uns verwendeten Cookies sind sogenannte Session-Cookies. Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.</p>
              <p>Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.</p>
              <p>Die Speicherung von Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">5. SSL- bzw. TLS-Verschlüsselung</h2>
              <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
              <p>Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">6. Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</p>
              <p>Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>

              <h3 className="text-ink font-bold text-base mb-2 mt-4">Recht auf Datenportabilität</h3>
              <p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.</p>

              <h3 className="text-ink font-bold text-base mb-2 mt-4">Recht auf Löschung</h3>
              <p>Sie haben das Recht, die unverzügliche Löschung Ihrer personenbezogenen Daten zu verlangen, sofern nicht eine gesetzliche Aufbewahrungspflicht besteht.</p>

              <h3 className="text-ink font-bold text-base mb-2 mt-4">Widerspruchsrecht</h3>
              <p>Soweit die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Widerspruch einzulegen.</p>
            </div>

            <p className="text-gray-300 text-sm mt-8">Stand: Februar 2026</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
