import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "@/styles/globals.css";
import { BRAND } from "@/lib/constants";
import CookieConsent from "@/components/CookieConsent";

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
  description: "Die kostenlose Plattform für Monteurzimmer. 1.500+ verifizierte Partner, 50+ Städte, 5.0 Google-Bewertung.",
  metadataBase: new URL(`https://${BRAND.appDomain}`),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: BRAND.name,
    images: [{ url: BRAND.logo, width: 400, height: 120, alt: "Schlaf-Platz Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schlaf-Platz | Monteurzimmer in ganz Deutschland",
    description: "Die kostenlose Plattform für Monteurzimmer. 1.500+ verifizierte Partner, 50+ Städte.",
  },
  alternates: {
    canonical: `https://${BRAND.appDomain}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
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
        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');` }} />
        )}
        {/* Crisp Chat */}
        {process.env.NEXT_PUBLIC_CRISP_ID && (
          <script dangerouslySetInnerHTML={{ __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="${process.env.NEXT_PUBLIC_CRISP_ID}";(function(){var d=document;var s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();` }} />
        )}
      </head>
      <body>
        {children}
        <CookieConsent />
        <script src="https://neues-crm-sp.vercel.app/widget/chat.js" data-source="schlaf-platz.com" async />
      </body>
    </html>
  );
}
