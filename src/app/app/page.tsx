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
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300 mb-3">Oder direkt per App registrieren</p>
            <div className="flex gap-3 flex-wrap">
              <a href="https://apps.apple.com/app/schlaf-platz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 bg-ink rounded-xl hover:bg-ink/90 transition-colors no-underline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div className="leading-none"><span className="text-white/50 text-[9px] block">Laden im</span><span className="text-white text-[13px] font-bold block">App Store</span></div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.schlafplatz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 bg-ink rounded-xl hover:bg-ink/90 transition-colors no-underline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3.61 1.81L13.42 12 3.61 22.19c-.36-.28-.61-.74-.61-1.29V3.1c0-.55.25-1.01.61-1.29zM15.42 12l-2-2L5 1.5l10.14 5.88L15.42 12zm0 0l-.28 4.62L5 22.5l8.42-8.5 2-2zM20.4 10.8L17 9l-3.58 3L17 15l3.4-1.8c.6-.35.6-1.05 0-1.4l-3.4-1z"/></svg>
                <div className="leading-none"><span className="text-white/50 text-[9px] block">Jetzt bei</span><span className="text-white text-[13px] font-bold block">Google Play</span></div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
