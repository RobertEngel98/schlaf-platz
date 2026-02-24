import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "@/styles/globals.css";
import { BRAND } from "@/lib/constants";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-display" });

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.legal,
  url: `https://${BRAND.appDomain}`,
  logo: BRAND.logo,
  telephone: BRAND.phone,
  email: BRAND.email,
  foundingDate: "2014",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BRAND.phone,
    contactType: "customer service",
    availableLanguage: "German",
  },
  sameAs: [BRAND.social.facebook, BRAND.social.linkedin, BRAND.social.instagram],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(BRAND.stats.rating),
    reviewCount: String(BRAND.stats.reviews),
    bestRating: "5",
  },
};

export const metadata: Metadata = {
  title: { default: "Schlaf-Platz | Monteurzimmer in ganz Deutschland", template: "%s | Schlaf-Platz" },
  description: "Die kostenlose Plattform fuer Monteurzimmer. 1.500+ verifizierte Partner, 50+ Staedte, 5.0 Google-Bewertung.",
  metadataBase: new URL(`https://${BRAND.appDomain}`),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: BRAND.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={bebasNeue.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');` }} />
          </>
        )}
        {/* Crisp Chat */}
        {process.env.NEXT_PUBLIC_CRISP_ID && (
          <script dangerouslySetInnerHTML={{ __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="${process.env.NEXT_PUBLIC_CRISP_ID}";(function(){var d=document;var s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();` }} />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
