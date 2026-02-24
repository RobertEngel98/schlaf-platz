"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND, FOOTER } from "@/lib/constants";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (res.ok) { setStatus("success"); setEmail(""); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  if (status === "success") return <p className="text-sp text-sm">Vielen Dank! Sie erhalten in Kuerze eine Bestaetigungs-E-Mail.</p>;

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ihre E-Mail-Adresse" required className="flex-1 min-w-0 px-3.5 py-2.5 bg-white/[0.06] border border-white/[0.1] rounded-lg text-sm text-white placeholder:text-white/25 outline-none focus:border-sp transition-colors" />
      <button type="submit" disabled={status === "loading"} className="px-4 py-2.5 bg-sp hover:bg-sp-600 text-white text-sm font-bold rounded-lg transition-colors shrink-0 disabled:opacity-50">
        {status === "loading" ? "..." : "Anmelden"}
      </button>
    </form>
  );
}

export default function Footer() {
  const cols = [
    { t: "Fuer Mieter", l: FOOTER.mieter },
    { t: "Fuer Vermieter", l: FOOTER.vermieter },
    { t: "Rechtliches", l: FOOTER.legal },
  ] as const;

  return (
    <footer className="bg-[#0b1220] pt-14 pb-8">
      <div className="wrap">
        {/* Newsletter Section */}
        <div className="border border-white/[0.06] rounded-2xl p-6 md:p-8 mb-10 bg-white/[0.02]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-sp mb-2">Newsletter</p>
              <p className="text-white font-bold text-lg m-0">Markt-Updates & Tipps erhalten</p>
              <p className="text-white/30 text-sm m-0 mt-1">Monatliche Insights zu Monteurzimmer-Preisen, Steuertipps und Branchennews. Kein Spam.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-4">
            <Image src={BRAND.logo} alt={BRAND.name} width={140} height={40} className="h-8 w-auto brightness-0 invert mb-4" />
            <p className="text-white/35 text-sm leading-relaxed max-w-[280px] mb-5">Die kostenlose Plattform fuer Monteurzimmer in Deutschland. Seit 2014. Mitglied im GvdL e.V.</p>
            <div className="flex gap-2 mb-5">
              {[
                { h: BRAND.social.facebook, d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { h: BRAND.social.linkedin, d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" },
                { h: BRAND.social.instagram, d: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z" },
              ].map((s, i) => (
                <a key={i} href={s.h} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center hover:bg-sp/20 transition-colors text-white/30 hover:text-sp">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={s.d}/></svg>
                </a>
              ))}
            </div>
            {/* App Download Links */}
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25 mb-2">App herunterladen</p>
            <div className="flex gap-2">
              <a href="https://apps.apple.com/app/schlaf-platz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-white/[0.06] border border-white/[0.1] rounded-lg hover:border-sp/40 transition-colors no-underline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div className="leading-none">
                  <span className="text-white/40 text-[8px] block">Laden im</span>
                  <span className="text-white text-[11px] font-bold block">App Store</span>
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.schlafplatz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-white/[0.06] border border-white/[0.1] rounded-lg hover:border-sp/40 transition-colors no-underline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M3 20.5V3.5c0-.65.42-1.2 1-1.39l10.68 9.39L3.99 21.89c-.58-.19-1-.74-1-1.39zm2.34 1.15L15.8 12.5 5.34 3.35 14.5 12.5 5.34 21.65zM17.5 12.5l-2.31-2.03 2.58-2.27L20.36 10c.75.44.75 1.56 0 2l-2.59 1.5.27-.5-.54-.5zM15.8 12.5l-1.62-1.43L15.8 12.5z"/></svg>
                <div className="leading-none">
                  <span className="text-white/40 text-[8px] block">Jetzt bei</span>
                  <span className="text-white text-[11px] font-bold block">Google Play</span>
                </div>
              </a>
            </div>
          </div>
          {cols.map(c => (
            <div key={c.t} className="md:col-span-2 md:col-start-auto first:md:col-start-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25 mb-3">{c.t}</p>
              {c.l.map(l => (
                <Link key={l.label} href={l.href} className="block text-white/40 no-underline text-sm py-1.5 hover:text-sp transition-colors">{l.label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.06] pt-5 flex flex-wrap justify-between gap-4 text-[11px] text-white/20">
          <p>&copy; {new Date().getFullYear()} {BRAND.legal}. Alle Rechte vorbehalten.</p>
          <a href={`tel:${BRAND.phone}`} className="text-white/25 no-underline hover:text-sp transition-colors">{BRAND.phonePretty}</a>
        </div>
      </div>
    </footer>
  );
}
