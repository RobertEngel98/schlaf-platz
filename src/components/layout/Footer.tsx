import Link from "next/link";
import { BRAND, FOOTER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-sp-blue text-white/50 pt-16 pb-8">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BRAND.logo} alt="Schlaf-Platz" className="h-10 w-auto mb-4" />
            <p className="text-sm leading-relaxed max-w-[280px] mb-5">Die kostenlose Plattform fuer Monteurzimmer in Deutschland. Mitglied im GvdL-Genossenschaftsverband der Laender e.V.</p>
            <div className="flex gap-3">
              {[
                { href: BRAND.social.facebook, l: "Fb", p: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { href: BRAND.social.linkedin, l: "Li", p: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" },
                { href: BRAND.social.instagram, l: "Ig", p: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z" },
              ].map(s => (
                <a key={s.l} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center hover:bg-sp-gold/20 transition-colors" aria-label={s.l}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><path d={s.p} /></svg>
                </a>
              ))}
            </div>
          </div>
          {([
            { t: "Fuer Mieter", links: FOOTER.mieter },
            { t: "Fuer Vermieter", links: FOOTER.vermieter },
            { t: "Rechtliches", links: FOOTER.legal },
          ] as const).map(col => (
            <div key={col.t}>
              <p className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">{col.t}</p>
              {col.links.map(l => <Link key={l.label} href={l.href} className="block text-white/50 no-underline text-sm py-1 hover:text-sp-gold transition-colors">{l.label}</Link>)}
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.08] pt-6 flex flex-wrap justify-between gap-4 text-[13px]">
          <p>&copy; {new Date().getFullYear()} {BRAND.legal} &mdash; Alle Rechte vorbehalten</p>
          <p>Tel: <a href={`tel:${BRAND.phone}`} className="text-sp-gold no-underline">{BRAND.phonePretty}</a></p>
        </div>
      </div>
    </footer>
  );
}
