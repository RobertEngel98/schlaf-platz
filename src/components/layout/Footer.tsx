import Link from "next/link";
import { BRAND, FOOTER } from "@/lib/constants";

export default function Footer() {
  const cols = [
    { t: "Fuer Mieter", l: FOOTER.mieter },
    { t: "Fuer Vermieter", l: FOOTER.vermieter },
    { t: "Rechtliches", l: FOOTER.legal },
  ] as const;

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06] pt-16 pb-8">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          {/* Brand col */}
          <div className="md:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BRAND.logo} alt={BRAND.name} className="h-8 w-auto brightness-0 invert mb-5" />
            <p className="text-white/40 text-sm leading-relaxed max-w-[280px] mb-6">
              Die kostenlose Plattform fuer Monteurzimmer in Deutschland. Seit 2014. Mitglied im GvdL e.V.
            </p>
            <div className="flex gap-2">
              {[
                { h: BRAND.social.facebook, d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { h: BRAND.social.linkedin, d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" },
                { h: BRAND.social.instagram, d: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z" },
              ].map((s, i) => (
                <a key={i} href={s.h} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center hover:bg-sp/20 transition-colors text-white/40 hover:text-sp">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={s.d}/></svg>
                </a>
              ))}
            </div>
          </div>
          {/* Link cols */}
          {cols.map(c => (
            <div key={c.t} className="md:col-span-2 md:col-start-auto first:md:col-start-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30 mb-4">{c.t}</p>
              {c.l.map(l => (
                <Link key={l.label} href={l.href} className="block text-white/50 no-underline text-sm py-1.5 hover:text-sp transition-colors">{l.label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.06] pt-6 flex flex-wrap justify-between gap-4 text-[11px] text-white/25">
          <p>&copy; {new Date().getFullYear()} {BRAND.legal}. Alle Rechte vorbehalten.</p>
          <a href={`tel:${BRAND.phone}`} className="text-white/30 no-underline hover:text-sp transition-colors">{BRAND.phonePretty}</a>
        </div>
      </div>
    </footer>
  );
}
