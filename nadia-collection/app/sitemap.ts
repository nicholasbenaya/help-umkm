import type { MetadataRoute } from "next";
import { getActiveVentures } from "@/lib/sanity/queries";
import { getSiteOrigin } from "@/lib/site-url";

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
