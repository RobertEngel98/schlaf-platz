import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = { title: "Datenschutzerklaerung" };
export default function DatenschutzPage() {
  return (<div><Navbar />
    <section className="hero-bg pt-[120px] pb-12"><div className="wrap"><h1 className="font-display font-extrabold text-white text-3xl">Datenschutzerklaerung</h1></div></section>
    <section className="bg-white py-16"><div className="wrap max-w-[800px]">
      <div className="prose prose-gray max-w-none font-body text-gray-700 leading-relaxed">
        <h2 className="font-display font-bold text-sp-blue text-xl mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
        <p>Wir nehmen den Schutz Ihrer persoenlichen Daten sehr ernst. Die vollstaendige Datenschutzerklaerung wird in Kuerze hier veroeffentlicht.</p>
        <p>Bei Fragen zum Datenschutz wenden Sie sich bitte an: <a href="mailto:info@schlaf-platz.com" className="text-sp-blue">info@schlaf-platz.com</a></p>
      </div>
    </div></section>
  <Footer /></div>);
}
