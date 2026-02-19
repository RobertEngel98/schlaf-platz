import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = { title: "Online Shop | Produkte fuer Ihre Monteurunterkunft" };
export default function OnlineShopPage() {
  return (<div><Navbar />
    <section className="hero-bg pt-[120px] pb-20"><div className="wrap text-center max-w-[600px] mx-auto">
      <p className="text-sp-gold text-sm font-display font-semibold uppercase tracking-widest mb-4">Online Shop</p>
      <h1 className="font-display font-extrabold text-white text-3xl md:text-4xl mb-6">Produkte fuer Ihre Monteurunterkunft</h1>
      <p className="text-white/65 text-lg mb-8">Unser Shop wird gerade aufgebaut. Bald finden Sie hier alles, was Sie fuer Ihre Monteurunterkunft benoetigen.</p>
      <a href="mailto:info@schlaf-platz.com" className="btn-gold">Kontakt aufnehmen</a>
    </div></section>
  <Footer /></div>);
}
