import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BRAND } from "@/lib/constants";

export const metadata = { title: "App & Vermieter-Portal" };

export default function AppPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-32 pb-10 md:pt-40 md:pb-12">
        <div className="wrap max-w-[600px]">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-4">Fuer Vermieter</p>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-[0.95] uppercase tracking-wide mb-5">Kostenlos inserieren.</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">Registrieren Sie Ihre Wohnung kostenlos auf Schlaf-Platz und erreichen Sie tausende Handwerksfirmen in ganz Deutschland.</p>
          <div className="space-y-3 mb-8">
            {["0 Euro Gebuehren — dauerhaft","Transparenzregister inklusive","Persoenliche Betreuung","Mehr Sichtbarkeit fuer Ihre Immobilie"].map(t => (
              <div key={t} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-sp/15 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <span className="text-gray-500 text-[14px]">{t}</span>
              </div>
            ))}
          </div>
          <a href={`mailto:${BRAND.email}?subject=Vermieter-Registrierung`} className="cta-primary">Jetzt registrieren</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
