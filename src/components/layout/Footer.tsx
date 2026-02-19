import Link from "next/link";
import { BRAND, FOOTER_LINKS } from "@/lib/constants";

const socialLinks = [
  {
    href: BRAND.social.facebook,
    label: "Facebook",
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    href: BRAND.social.linkedin,
    label: "LinkedIn",
    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    href: BRAND.social.instagram,
    label: "Instagram",
    path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-primary text-white/50 pt-16 pb-8">
      <div className="container-sp">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-accent to-brand-accent-light flex items-center justify-center font-display font-extrabold text-brand-primary text-sm">
                SP
              </div>
              <span className="font-display font-bold text-lg text-white">
                {BRAND.legalName}
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-[280px] mb-5">
              Die kostenlose Plattform für Monteurzimmer in Deutschland.
              Mitglied im GvdL-Genossenschaftsverband der Länder e.V.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center hover:bg-brand-accent/20 transition-colors"
                  aria-label={s.label}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="2"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {(
            [
              { title: "Für Mieter", links: FOOTER_LINKS.mieter },
              { title: "Für Vermieter", links: FOOTER_LINKS.vermieter },
              { title: "Rechtliches", links: FOOTER_LINKS.legal },
            ] as const
          ).map((col) => (
            <div key={col.title}>
              <p className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">
                {col.title}
              </p>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-white/50 no-underline text-sm py-1 hover:text-brand-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.08] pt-6 flex flex-wrap justify-between gap-4 text-[13px]">
          <p>© {year} {BRAND.legalName} — Alle Rechte vorbehalten</p>
          <p>
            Tel:{" "}
            <a
              href={`tel:${BRAND.phone}`}
              className="text-brand-accent no-underline"
            >
              {BRAND.phonePretty}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
