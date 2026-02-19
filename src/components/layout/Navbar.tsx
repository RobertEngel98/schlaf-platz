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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${sc ? "bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/[0.06] py-3" : "bg-transparent py-5"}`}>
      <div className="wrap flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND.logo} alt={BRAND.name} className="h-8 w-auto brightness-0 invert" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(l => (
            <Link key={l.href} href={l.href} className="no-underline text-[13px] font-bold px-4 py-2 rounded-lg transition-all duration-200 text-white/40 hover:text-white hover:bg-white/[0.06] uppercase tracking-wider">
              {l.label}
            </Link>
          ))}
          <Link href="/mieter" className="ml-3 cta-primary !text-[12px] !px-5 !py-2.5">
            Jetzt anfragen
          </Link>
        </nav>

        <button className="md:hidden p-2 -mr-2" onClick={() => setOp(!op)} aria-label="Menu">
          <div className="flex flex-col gap-[5px]">
            {[0, 1, 2].map(i => (
              <span key={i} className={`block w-[18px] h-[1.5px] rounded-full transition-all duration-300 bg-white ${
                op && i === 0 ? "rotate-45 translate-y-[6.5px]" : ""
              } ${op && i === 1 ? "opacity-0" : ""} ${op && i === 2 ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            ))}
          </div>
        </button>
      </div>

      {op && (
        <div className="md:hidden bg-[#111] animate-slide-down">
          <div className="wrap py-4 border-t border-white/[0.06]">
            {NAV.map(l => (
              <Link key={l.href} href={l.href} className="block text-white/60 no-underline py-3.5 text-[15px] font-bold border-b border-white/[0.06] last:border-0 uppercase tracking-wider" onClick={() => setOp(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/mieter" className="cta-primary mt-4 w-full text-center" onClick={() => setOp(false)}>Jetzt anfragen</Link>
          </div>
        </div>
      )}
    </header>
  );
}
