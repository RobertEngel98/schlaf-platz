import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = { title: "Impressum" };
export default function ImpressumPage() {
  return (<div><Navbar />
    <section className="hero-bg pt-[120px] pb-12"><div className="wrap"><h1 className="font-display font-extrabold text-white text-3xl">Impressum</h1></div></section>
    <section className="bg-white py-16"><div className="wrap max-w-[800px]">
      <div className="prose prose-gray max-w-none font-body text-gray-700 leading-relaxed">
        <h2 className="font-display font-bold text-sp-blue text-xl mt-8 mb-4">Angaben gemaess § 5 TMG</h2>
        <p>Schlaf-Platz e.G.<br/>Vertreten durch: Viktor Brehm (Inhaber)<br/>E-Mail: info@schlaf-platz.com<br/>Telefon: +49 160 95460613</p>
        <h2 className="font-display font-bold text-sp-blue text-xl mt-8 mb-4">Streitschlichtung</h2>
        <p>Plattform der Europaeischen Kommission zur Online-Streitbeilegung (OS) fuer Verbraucher: <a href="https://ec.europa.eu/consumers/odr/" className="text-sp-blue">https://ec.europa.eu/consumers/odr/</a></p>
        <p>Wir sind nicht bereit und nicht verpflichtet an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </div>
    </div></section>
  <Footer /></div>);
}
