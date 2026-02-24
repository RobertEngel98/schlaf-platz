"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("sp-cookie-consent");
    if (!consent) setShow(true);
  }, []);

  const accept = (all: boolean) => {
    const val = all ? "all" : "essential";
    localStorage.setItem("sp-cookie-consent", val);
    setShow(false);
    if (all) {
      // Reload to activate GA4, Meta Pixel, Crisp
      window.location.reload();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 animate-slide-down">
      <div className="max-w-[720px] mx-auto bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 p-5 md:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-ink text-[15px] mb-1">Wir nutzen Cookies</p>
            <p className="text-gray-400 text-[13px] leading-relaxed m-0">
              Wir verwenden Cookies fuer Analysen (Google Analytics), Marketing (Meta Pixel) und Kundensupport (Crisp Chat).
              Mehr Infos in unserer{" "}
              <a href="/datenschutzerklaerung" className="text-sp underline">Datenschutzerklaerung</a>.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => accept(false)} className="px-4 py-2.5 text-[13px] font-bold text-gray-500 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white cursor-pointer">
              Nur notwendige
            </button>
            <button onClick={() => accept(true)} className="px-4 py-2.5 text-[13px] font-bold text-white rounded-lg transition-colors cursor-pointer border-none" style={{ background: "linear-gradient(135deg, #029fde 0%, #0178a8 100%)" }}>
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
