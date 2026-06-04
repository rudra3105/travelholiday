import { MetadataRoute } from "next";
import { DESTINATIONS_DOMESTIC, DESTINATIONS_INTERNATIONAL } from "@/lib/constants";
import { FEATURED_PACKAGES, FIXED_DEPARTURES_DATA } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voyageindia.com";
  const now = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/destinations`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/packages`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/fixed-departures`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/testimonials`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms-conditions`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/cancellation-policy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const destinationPages = [...DESTINATIONS_DOMESTIC, ...DESTINATIONS_INTERNATIONAL].map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const packagePages = FEATURED_PACKAGES.map((p) => ({
    url: `${baseUrl}/packages/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...destinationPages, ...packagePages];
}
