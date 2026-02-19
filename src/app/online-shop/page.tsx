import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Online-Shop" };

export default function Page() {
  return (
    <div className="bg-[#0a0a0a]">
      <Navbar />
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20"><div className="wrap max-w-[600px]"><h1 className="font-display text-3xl md:text-4xl text-white">Online-Shop</h1></div></section>
      <section className="py-14 md:py-20 border-t border-white/[0.06]">
        <div className="wrap max-w-[700px] text-center">
          <p className="text-white/40 text-lg mb-6">Unser Shop wird gerade aufgebaut.</p>
          <p className="text-white/30 text-sm">Bald finden Sie hier praktische Produkte rund um das Thema Monteurzimmer.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
