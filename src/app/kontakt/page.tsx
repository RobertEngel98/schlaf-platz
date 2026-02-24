import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BRAND } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktieren Sie Schlaf-Platz — Telefon, E-Mail oder Kontaktformular. Wir antworten in der Regel innerhalb von 15 Minuten.",
};

export default function KontaktPage() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0b1220] pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="wrap max-w-[600px] text-center">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Kontakt</p>
          <h1 className="font-display text-4xl md:text-6xl text-white uppercase tracking-wide leading-[0.95] mb-4">Wir sind fuer Sie da.</h1>
          <p className="text-white/40 text-lg leading-relaxed">Persoenlicher Service ist unser Versprechen. Rufen Sie an, schreiben Sie uns oder nutzen Sie unser Kontaktformular.</p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {[
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
                title: "Telefon",
                desc: "Mo-Fr 08:00 - 18:00 Uhr",
                action: BRAND.phonePretty,
                href: `tel:${BRAND.phone}`,
                badge: "Rueckruf in 15 Min.",
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                title: "E-Mail",
                desc: "Antwort innerhalb von 24h",
                action: BRAND.email,
                href: `mailto:${BRAND.email}`,
                badge: null,
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                title: "Adresse",
                desc: "Schlaf-Platz e.G.",
                action: "Weyertal 109, 50931 Koeln",
                href: "https://maps.google.com/?q=Weyertal+109+50931+Koeln",
                badge: null,
              },
            ].map((c) => (
              <a key={c.title} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group border border-gray-100 rounded-2xl p-6 bg-white hover:shadow-lg hover:shadow-gray-100/80 hover:border-sp/20 transition-all no-underline block relative">
                {c.badge && <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-sp bg-sp/10 px-2.5 py-1 rounded-full">{c.badge}</span>}
                <div className="w-12 h-12 rounded-xl bg-sp/8 flex items-center justify-center mb-4">{c.icon}</div>
                <h3 className="text-ink font-bold text-lg mb-1">{c.title}</h3>
                <p className="text-gray-400 text-[13px] m-0 mb-2">{c.desc}</p>
                <p className="text-sp font-bold text-[15px] m-0 group-hover:underline">{c.action}</p>
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="border border-gray-100 rounded-2xl p-6 md:p-8 bg-gray-50/40">
            <h2 className="font-display text-2xl md:text-3xl text-ink uppercase tracking-wide mb-6">Schnellzugriff</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Unterkunft anfragen", href: "/mieter", desc: "Kostenloses Formular" },
                { label: "Kostenlos inserieren", href: "/app", desc: "Fuer Vermieter" },
                { label: "Haeufige Fragen", href: "/#faq", desc: "FAQ-Bereich" },
                { label: "Blog & Ratgeber", href: "/blog", desc: "Tipps & Guides" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-gray-100 hover:border-sp/30 hover:shadow-sm transition-all no-underline group">
                  <div className="w-8 h-8 rounded-lg bg-sp/10 flex items-center justify-center shrink-0 group-hover:bg-sp/20 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </div>
                  <div>
                    <p className="font-bold text-[13px] text-ink m-0 group-hover:text-sp transition-colors">{l.label}</p>
                    <p className="text-[11px] text-gray-300 m-0">{l.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
