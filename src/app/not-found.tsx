import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="wrap text-center max-w-[560px] mx-auto">
          <p className="font-display text-[120px] md:text-[180px] text-sp/10 leading-none m-0">404</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink uppercase tracking-wide mb-4 -mt-6">Seite nicht gefunden</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">Die angeforderte Seite existiert nicht oder wurde verschoben. Keine Sorge — wir helfen Ihnen weiter.</p>
          <div className="flex gap-3 justify-center flex-wrap mb-12">
            <Link href="/" className="cta-primary">Zur Startseite</Link>
            <Link href="/mieter" className="cta-outline">Unterkunft finden</Link>
          </div>
          <div className="border-t border-gray-100 pt-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-300 mb-4">Beliebte Seiten</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: "Monteurzimmer Berlin", href: "/monteurzimmer-berlin" },
                { label: "Monteurzimmer München", href: "/monteurzimmer-muenchen" },
                { label: "Monteurzimmer Hamburg", href: "/monteurzimmer-hamburg" },
                { label: "Blog", href: "/blog" },
                { label: "Kostenlos inserieren", href: "/app" },
                { label: "Kontakt", href: "/kontakt" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-sp transition-colors no-underline px-3 py-1.5 rounded-lg border border-gray-100 hover:border-sp/20">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
