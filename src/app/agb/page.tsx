import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { title: "AGB" };

export default function Page() {
  return (
    <div className="bg-[#0a0a0a]">
      <Navbar />
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20"><div className="wrap max-w-[600px]"><h1 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-white">Allgemeine Geschaeftsbedingungen</h1></div></section>
      <section className="py-14 md:py-20 border-t border-white/[0.06]">
        <div className="wrap max-w-[700px] text-white/50 text-base leading-relaxed space-y-4">
          <p>Die vollstaendigen AGB finden Sie in unserem Portal unter schlaf-platz.com. Bei Fragen wenden Sie sich bitte an <a href="mailto:info@schlaf-platz.com" className="text-sp no-underline hover:underline">info@schlaf-platz.com</a>.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
