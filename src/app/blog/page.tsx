import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOG_ARTICLES } from "@/lib/constants";

export const metadata = { title: "Blog", description: "Ratgeber, Tipps und Neuigkeiten rund um Monteurzimmer in Deutschland." };

export default function BlogPage() {
  return (
    <div className="bg-white">
      <Navbar />

      <section className="relative bg-[#0b1220] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-sp/[0.08] blur-[120px]" />
        </div>
        <div className="wrap relative z-10 pt-28 pb-12 md:pt-36 md:pb-14">
          <p className="text-sp text-[13px] font-bold uppercase tracking-[0.2em] mb-5">Blog & Ratgeber</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-[0.95] tracking-wide uppercase mb-5">
            Wissen rund um<br /><span className="text-sp">Monteurzimmer.</span>
          </h1>
          <p className="text-white/40 text-lg leading-relaxed max-w-[560px]">
            Steuertipps, Preisvergleiche, Vermietungs-Guides und mehr — alles, was Sie über Monteurzimmer wissen müssen.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group border border-gray-100 rounded-2xl bg-white overflow-hidden no-underline hover:shadow-lg hover:shadow-gray-100/80 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sp bg-sp/8 px-3 py-1 rounded-full">{article.category}</span>
                    <span className="text-[11px] text-gray-300">{article.readTime}</span>
                  </div>
                  <h2 className="text-ink font-bold text-lg mb-3 group-hover:text-sp transition-colors leading-snug">{article.title}</h2>
                  <p className="text-gray-400 text-[14px] leading-relaxed mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-300">{new Date(article.date).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}</span>
                    <span className="text-sp text-[13px] font-bold uppercase tracking-wider group-hover:underline">Weiterlesen</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
