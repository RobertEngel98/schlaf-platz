import type { Metadata } from "next";
import "@/styles/globals.css";
import { BRAND } from "@/lib/constants";

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
    <html lang="de">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
