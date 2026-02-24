import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TITLE = "Impressum";

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
              <h2 className="text-ink font-bold text-lg mb-3">Angaben gemaess § 5 TMG</h2>
              <p className="m-0">Schlaf-Platz e.G.</p>
              <p className="m-0">eingetragene Genossenschaft</p>
              <p className="m-0 mt-2">Vertreten durch den Vorstand:</p>
              <p className="m-0">Viktor Brehm (Vorsitzender)</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">Kontakt</h2>
              <p className="m-0">Telefon: +49 160 95460613</p>
              <p className="m-0">E-Mail: <a href="mailto:info@schlaf-platz.com" className="text-sp hover:underline">info@schlaf-platz.com</a></p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">Registereintrag</h2>
              <p className="m-0">Eintragung im Genossenschaftsregister.</p>
              <p className="m-0">Registergericht: Amtsgericht Bayern</p>
              <p className="m-0">Registernummer: wird nachgetragen</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">Verantwortlich fuer den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p className="m-0">Viktor Brehm</p>
              <p className="m-0">Schlaf-Platz e.G.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">EU-Streitschlichtung</h2>
              <p>Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-sp hover:underline">https://ec.europa.eu/consumers/odr/</a>. Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">Haftung fuer Inhalte</h2>
              <p>Als Diensteanbieter sind wir gemaess § 7 Abs. 1 TMG fuer eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, uebermittelte oder gespeicherte fremde Informationen zu ueberwachen oder nach Umstaenden zu forschen, die auf eine rechtswidrige Taetigkeit hinweisen.</p>
              <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberuehrt. Eine diesbezuegliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung moeglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">Haftung fuer Links</h2>
              <p>Unser Angebot enthaelt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb koennen wir fuer diese fremden Inhalte auch keine Gewaehr uebernehmen. Fuer die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf moegliche Rechtsverstoesse ueberprueft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
              <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
            </div>

            <div>
              <h2 className="text-ink font-bold text-lg mb-3">Urheberrecht</h2>
              <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfaeltigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes beduerfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur fuer den privaten, nicht kommerziellen Gebrauch gestattet.</p>
              <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
            </div>

            <p className="text-gray-300 text-sm mt-8">Stand: Februar 2026</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
