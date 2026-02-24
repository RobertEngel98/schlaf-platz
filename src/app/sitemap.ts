import { MetadataRoute } from "next";
import { getAllCitySlugs, getAllBlogSlugs } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://monteurzimmerapartments.de";

  const cities = getAllCitySlugs().map((slug) => ({
    url: `${base}/monteurzimmer-${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogs = getAllBlogSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/mieter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/app`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kontakt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/bewertungen`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/online-shop`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/karriere`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/impressum`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/datenschutzerklaerung`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/agb`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...cities,
    ...blogs,
  ];
}
