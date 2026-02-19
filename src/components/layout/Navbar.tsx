"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, BRAND } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-brand-primary/[0.97] backdrop-blur-lg border-b border-white/[0.08] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-sp flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-brand-accent to-brand-accent-light flex items-center justify-center font-display font-extrabold text-brand-primary text-lg">
            SP
          </div>
          <span className="font-display font-bold text-xl text-white tracking-tight">
            Schlaf-Platz
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 no-underline text-[15px] font-display font-medium hover:text-brand-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`https://www.${BRAND.appDomain}/partner/`}
            className="btn-primary !py-2.5 !px-6 !text-sm"
          >
            Jetzt inserieren
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü öffnen"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="block w-6 h-0.5 bg-white rounded-full" />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-primary px-6 py-6 border-t border-white/[0.08]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-white/90 no-underline py-3 text-base font-display font-medium border-b border-white/[0.06]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`https://www.${BRAND.appDomain}/partner/`}
            className="btn-primary mt-4 w-full justify-center"
          >
            Jetzt inserieren
          </a>
        </div>
      )}
    </header>
  );
}
