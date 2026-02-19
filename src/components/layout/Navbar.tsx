"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV, BRAND } from "@/lib/constants";

export default function Navbar() {
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);

  useEffect(() => {
    const f = () => setSc(window.scrollY > 30);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${sc ? "bg-white/90 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.04)] py-3" : "bg-transparent py-5"}`}>
      <div className="wrap flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND.logo} alt={BRAND.name} className={`h-8 w-auto transition-all duration-500 ${sc ? "" : "brightness-0 invert"}`} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`no-underline text-[13px] font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                sc ? "text-ink-light hover:text-sp hover:bg-sp-50" : "text-white/70 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`https://www.${BRAND.appDomain}/partner/`}
            className={`ml-4 text-[13px] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 no-underline ${
              sc
                ? "bg-sp text-white hover:bg-sp-600 shadow-sm shadow-sp/10"
                : "bg-white text-sp-950 hover:shadow-lg hover:shadow-white/20"
            }`}
          >
            Jetzt inserieren
          </a>
        </nav>

        {/* Mobile burger */}
        <button className="md:hidden p-2 -mr-2" onClick={() => setOp(!op)} aria-label="Menu">
          <div className="flex flex-col gap-[5px]">
            {[0, 1, 2].map(i => (
              <span key={i} className={`block w-[18px] h-[1.5px] rounded-full transition-all duration-300 ${sc ? "bg-ink" : "bg-white"} ${
                op && i === 0 ? "rotate-45 translate-y-[6.5px]" : ""
              } ${op && i === 1 ? "opacity-0" : ""} ${op && i === 2 ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {op && (
        <div className="md:hidden bg-white animate-slide-down">
          <div className="wrap py-4 border-t border-surface-dim">
            {NAV.map(l => (
              <Link key={l.href} href={l.href} className="block text-ink no-underline py-3.5 text-[15px] font-medium border-b border-surface-cool last:border-0" onClick={() => setOp(false)}>
                {l.label}
              </Link>
            ))}
            <a href={`https://www.${BRAND.appDomain}/partner/`} className="btn-primary mt-4 w-full text-center">Jetzt inserieren</a>
          </div>
        </div>
      )}
    </header>
  );
}
