import type { MetadataRoute } from "next";
import { getActiveVentures } from "@/lib/sanity/queries";

function getSiteOrigin(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://nadia-collection.vercel.app";

  return raw.replace(/\/+$/, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteOrigin();
  const ventures = await getActiveVentures();
  const now = new Date();

  const ventureEntries: MetadataRoute.Sitemap = ventures.map((venture) => ({
    url: `${origin}/ventures/${venture.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: origin,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...ventureEntries,
  ];
}
