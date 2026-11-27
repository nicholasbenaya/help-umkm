import type { MetadataRoute } from "next";

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

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/studio/", "/api/"],
    },
    sitemap: `${origin}/sitemap.xml`,
  };
}
