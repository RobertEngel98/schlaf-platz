import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = { title: "Allgemeine Geschaeftsbedingungen" };
export default function AGBPage() {
  return (<div><Navbar />
    <section className="hero-bg pt-[120px] pb-12"><div className="wrap"><h1 className="font-display font-extrabold text-white text-3xl">Allgemeine Geschaeftsbedingungen</h1></div></section>
    <section className="bg-white py-16"><div className="wrap max-w-[800px]">
      <div className="prose prose-gray max-w-none font-body text-gray-700 leading-relaxed">
        <p>Die vollstaendigen AGB der Schlaf-Platz e.G. werden in Kuerze hier veroeffentlicht.</p>
        <p>Bei Fragen wenden Sie sich bitte an: <a href="mailto:info@schlaf-platz.com" className="text-sp-blue">info@schlaf-platz.com</a></p>
      </div>
    </div></section>
  <Footer /></div>);
}
