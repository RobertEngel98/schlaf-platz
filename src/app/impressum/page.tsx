import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TITLE = "Impressum";

export const metadata = { title: TITLE };

export default function Page() {
  return (
    <div className="bg-white">
      <Navbar />
      <section className="pt-32 pb-10 md:pt-40 md:pb-12">
        <div className="wrap max-w-[700px]">
          <h1 className="font-display text-4xl md:text-5xl text-ink uppercase tracking-wide mb-4">{TITLE}</h1>
          <div className="border-t border-gray-100 pt-6">
            <p className="text-gray-400 text-[15px] leading-relaxed">
              Inhalt wird geladen. Bei Fragen wenden Sie sich bitte an info@schlaf-platz.com.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
