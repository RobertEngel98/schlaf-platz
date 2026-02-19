"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV, BRAND } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "bg-sp-blue/[0.97] backdrop-blur-lg border-b border-white/[0.08] py-3" : "bg-transparent py-5"}`}>
      <div className="wrap flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND.logo} alt="Schlaf-Platz Logo" className="h-10 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(l => <Link key={l.href} href={l.href} className="text-white/80 no-underline text-[15px] font-display font-medium hover:text-white transition-colors">{l.label}</Link>)}
          <a href={`https://www.${BRAND.appDomain}/partner/`} className="btn-gold !py-2.5 !px-6 !text-sm">Jetzt inserieren</a>
        </nav>
        <button className="md:hidden flex flex-col gap-[5px] p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {[0,1,2].map(i => <span key={i} className="block w-6 h-0.5 bg-white rounded-full" />)}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-sp-blue px-6 py-6 border-t border-white/[0.08]">
          {NAV.map(l => <Link key={l.href} href={l.href} className="block text-white/90 no-underline py-3 text-base font-display font-medium border-b border-white/[0.06]" onClick={() => setOpen(false)}>{l.label}</Link>)}
          <a href={`https://www.${BRAND.appDomain}/partner/`} className="btn-gold mt-4 w-full justify-center">Jetzt inserieren</a>
        </div>
      )}
    </header>
  );
}
