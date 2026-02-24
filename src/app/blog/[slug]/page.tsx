import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBlogBySlug, getAllBlogSlugs, BLOG_ARTICLES } from "@/lib/constants";
import type { Metadata } from "next";

interface P { params: { slug: string } }

export async function generateStaticParams() {
  return getAllBlogSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const a = getBlogBySlug(params.slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt };
}

export default function BlogArticlePage({ params }: P) {
  const article = getBlogBySlug(params.slug);
  if (!article) notFound();

  const related = BLOG_ARTICLES.filter(a => a.slug !== article.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "Schlaf-Platz e.G." },
    publisher: { "@type": "Organization", name: "Schlaf-Platz e.G.", url: "https://monteurzimmerapartments.de" },
  };

  return (
    <div className="bg-white">
      <Navbar />

      <section className="relative bg-[#0b1220] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-sp/[0.08] blur-[120px]" />
        </div>
        <div className="wrap relative z-10 pt-28 pb-12 md:pt-36 md:pb-14 max-w-[720px]">
          <Link href="/blog" className="text-white/30 text-[13px] font-bold uppercase tracking-wider no-underline hover:text-sp transition-colors mb-5 inline-block">&larr; Zurueck zum Blog</Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sp bg-sp/15 px-3 py-1 rounded-full">{article.category}</span>
            <span className="text-white/25 text-[12px]">{article.readTime}</span>
            <span className="text-white/25 text-[12px]">{new Date(article.date).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-white leading-[0.95] tracking-wide uppercase">{article.title}</h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="wrap max-w-[720px]">
          <div
            className="prose prose-lg max-w-none text-ink-light text-[16px] leading-relaxed
              [&_h2]:text-ink [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-ink [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:mb-4 [&_p]:text-gray-500
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ul]:text-gray-500
              [&_li]:text-gray-500
              [&_strong]:text-ink
              [&_a]:text-sp [&_a]:hover:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50/60 border-t border-gray-100">
          <div className="wrap">
            <h2 className="font-display text-3xl text-ink uppercase tracking-wide mb-8">Weitere Artikel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group border border-gray-100 rounded-2xl bg-white p-6 no-underline hover:shadow-lg hover:shadow-gray-100/80 transition-all">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sp bg-sp/8 px-3 py-1 rounded-full">{r.category}</span>
                  <h3 className="text-ink font-bold text-lg mt-3 mb-2 group-hover:text-sp transition-colors">{r.title}</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Footer />
    </div>
  );
}
