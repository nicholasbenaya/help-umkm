import { groq } from "next-sanity";
import { sanityClient } from "./client";
import {
  FALLBACK_SITE_DATA,
  FALLBACK_SITE_SETTINGS,
  FALLBACK_VENTURES,
} from "./fallback";
import type { SiteData, SiteSettings, Venture } from "./types";

const SITE_SETTINGS_PROJECTION = `{
  _id,
  brandName,
  brandLogo,
  tagline,
  founderName,
  founderBio,
  founderPhoto,
  defaultWhatsappNumber,
  defaultWhatsappMessage,
  "socialLinks": coalesce(socialLinks, []),
  seoTitle,
  seoDescription,
  ogImage
}`;

const VENTURE_PROJECTION = `{
  _id,
  name,
  "slug": slug.current,
  order,
  isActive,
  logo,
  category,
  shortDescription,
  fullDescription,
  serviceArea,
  whatsappNumberOverride,
  whatsappMessageTemplate,
  instagramUrl,
  coverImage,
  "highlights": coalesce(highlights, []),
  "gallery": coalesce(gallery, []),
  externalActionLabel,
  externalActionUrl
}`;

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] ${SITE_SETTINGS_PROJECTION}`;

export const ACTIVE_VENTURES_QUERY = groq`*[_type == "venture" && isActive == true] | order(order asc, name asc) ${VENTURE_PROJECTION}`;

export const VENTURE_BY_SLUG_QUERY = groq`*[_type == "venture" && isActive == true && slug.current == $slug][0] ${VENTURE_PROJECTION}`;

export const VENTURE_SLUGS_QUERY = groq`*[_type == "venture" && isActive == true && defined(slug.current)] | order(order asc) { "slug": slug.current }`;

export const SITE_DATA_QUERY = groq`{
  "settings": *[_type == "siteSettings"][0] ${SITE_SETTINGS_PROJECTION},
  "ventures": *[_type == "venture" && isActive == true] | order(order asc, name asc) ${VENTURE_PROJECTION},
  "totalVentures": count(*[_type == "venture"])
}`;

const ACTIVE_VENTURES_WITH_META_QUERY = groq`{
  "ventures": *[_type == "venture" && isActive == true] | order(order asc, name asc) ${VENTURE_PROJECTION},
  "totalVentures": count(*[_type == "venture"]),
  "hasSettings": count(*[_type == "siteSettings"]) > 0
}`;

const VENTURE_SLUGS_WITH_META_QUERY = groq`{
  "rows": *[_type == "venture" && isActive == true && defined(slug.current)] | order(order asc) { "slug": slug.current },
  "totalVentures": count(*[_type == "venture"]),
  "hasSettings": count(*[_type == "siteSettings"]) > 0
}`;

const SANITY_FETCH_OPTIONS: {
  next: {
    revalidate: number;
    tags: string[];
  };
} = {
  next: {
    revalidate: 60,
    tags: ["siteSettings", "venture"],
  },
};

const FALLBACK_LOGO_BY_SLUG: Record<string, string> = {
  "afisa-bouquet": "/logos/afisa-bouquet-logo.svg",
  "nadia-artistry": "/logos/nadia-artistry-logo.svg",
};

function normalizeSiteSettings(raw: Partial<SiteSettings> | null): SiteSettings {
  if (!raw) {
    return FALLBACK_SITE_SETTINGS;
  }

  return {
    ...FALLBACK_SITE_SETTINGS,
    ...raw,
    brandName: raw.brandName || FALLBACK_SITE_SETTINGS.brandName,
    tagline: raw.tagline || FALLBACK_SITE_SETTINGS.tagline,
    founderName: raw.founderName || FALLBACK_SITE_SETTINGS.founderName,
    founderBio: raw.founderBio || FALLBACK_SITE_SETTINGS.founderBio,
    defaultWhatsappNumber:
      raw.defaultWhatsappNumber || FALLBACK_SITE_SETTINGS.defaultWhatsappNumber,
    defaultWhatsappMessage:
      raw.defaultWhatsappMessage || FALLBACK_SITE_SETTINGS.defaultWhatsappMessage,
    fallbackLogoPath: FALLBACK_SITE_SETTINGS.fallbackLogoPath,
    socialLinks: Array.isArray(raw.socialLinks) ? raw.socialLinks : [],
  };
}

function normalizeVenture(raw: Venture): Venture {
  return {
    ...raw,
    fallbackLogoPath:
      raw.fallbackLogoPath ?? FALLBACK_LOGO_BY_SLUG[raw.slug] ?? null,
    serviceArea: raw.serviceArea?.trim() ? raw.serviceArea.trim() : null,
    whatsappNumberOverride: raw.whatsappNumberOverride?.trim()
      ? raw.whatsappNumberOverride.trim()
      : null,
    highlights: Array.isArray(raw.highlights) ? raw.highlights : [],
    gallery: Array.isArray(raw.gallery) ? raw.gallery : [],
  };
}

export async function getSiteData(): Promise<SiteData> {
  if (!sanityClient) {
    return FALLBACK_SITE_DATA;
  }

  try {
    const data = await sanityClient.fetch<{
      settings: Partial<SiteSettings> | null;
      ventures: Venture[] | null;
      totalVentures: number | null;
    }>(SITE_DATA_QUERY, {}, SANITY_FETCH_OPTIONS);

    const hasCmsSettings = Boolean(data?.settings);
    const totalVentures =
      typeof data?.totalVentures === "number" ? data.totalVentures : 0;
    const cmsVentures = Array.isArray(data?.ventures)
      ? data.ventures.map(normalizeVenture)
      : [];

    if (!hasCmsSettings && totalVentures === 0) {
      return FALLBACK_SITE_DATA;
    }

    return {
      settings: normalizeSiteSettings(data?.settings ?? null),
      ventures: cmsVentures,
      isFallback: false,
    };
  } catch (error) {
    console.warn("[sanity] Failed to fetch site data, using fallback:", error);
    return FALLBACK_SITE_DATA;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityClient) {
    return FALLBACK_SITE_SETTINGS;
  }

  try {
    const raw = await sanityClient.fetch<Partial<SiteSettings> | null>(
      SITE_SETTINGS_QUERY,
      {},
      {
        next: {
          revalidate: 60,
          tags: ["siteSettings"],
        },
      },
    );

    return normalizeSiteSettings(raw);
  } catch (error) {
    console.warn(
      "[sanity] Failed to fetch site settings, using fallback:",
      error,
    );
    return FALLBACK_SITE_SETTINGS;
  }
}

export async function getActiveVentures(): Promise<Venture[]> {
  if (!sanityClient) {
    return FALLBACK_VENTURES;
  }

  try {
    const data = await sanityClient.fetch<{
      ventures: Venture[] | null;
      totalVentures: number | null;
      hasSettings: boolean | null;
    }>(ACTIVE_VENTURES_WITH_META_QUERY, {}, {
      next: {
        revalidate: 60,
        tags: ["venture", "siteSettings"],
      },
    });

    const totalVentures =
      typeof data?.totalVentures === "number" ? data.totalVentures : 0;
    const hasSettings = Boolean(data?.hasSettings);

    if (!hasSettings && totalVentures === 0) {
      return FALLBACK_VENTURES;
    }

    return Array.isArray(data?.ventures)
      ? data.ventures.map(normalizeVenture)
      : [];
  } catch (error) {
    console.warn("[sanity] Failed to fetch ventures, using fallback:", error);
    return FALLBACK_VENTURES;
  }
}

export async function getVentureBySlug(slug: string): Promise<Venture | null> {
  if (!sanityClient) {
    return FALLBACK_VENTURES.find((venture) => venture.slug === slug) ?? null;
  }

  try {
    const raw = await sanityClient.fetch<Venture | null>(
      VENTURE_BY_SLUG_QUERY,
      { slug },
      {
        next: {
          revalidate: 60,
          tags: ["venture", `venture:${slug}`],
        },
      },
    );

    if (raw) {
      return normalizeVenture(raw);
    }

    const meta = await sanityClient.fetch<{
      totalVentures: number | null;
      hasSettings: boolean | null;
    }>(
      groq`{
        "totalVentures": count(*[_type == "venture"]),
        "hasSettings": count(*[_type == "siteSettings"]) > 0
      }`,
      {},
      {
        next: {
          revalidate: 60,
          tags: ["venture", "siteSettings"],
        },
      },
    );

    const totalVentures =
      typeof meta?.totalVentures === "number" ? meta.totalVentures : 0;
    const hasSettings = Boolean(meta?.hasSettings);

    if (!hasSettings && totalVentures === 0) {
      return FALLBACK_VENTURES.find((venture) => venture.slug === slug) ?? null;
    }

    return null;
  } catch (error) {
    console.warn(
      `[sanity] Failed to fetch venture "${slug}", using fallback:`,
      error,
    );
    return FALLBACK_VENTURES.find((venture) => venture.slug === slug) ?? null;
  }
}

export async function getVentureSlugs(): Promise<string[]> {
  if (!sanityClient) {
    return FALLBACK_VENTURES.map((venture) => venture.slug);
  }

  try {
    const data = await sanityClient.fetch<{
      rows: Array<{ slug: string }> | null;
      totalVentures: number | null;
      hasSettings: boolean | null;
    }>(VENTURE_SLUGS_WITH_META_QUERY, {}, {
      next: {
        revalidate: 60,
        tags: ["venture", "siteSettings"],
      },
    });

    const totalVentures =
      typeof data?.totalVentures === "number" ? data.totalVentures : 0;
    const hasSettings = Boolean(data?.hasSettings);

    if (!hasSettings && totalVentures === 0) {
      return FALLBACK_VENTURES.map((venture) => venture.slug);
    }

    return Array.isArray(data?.rows)
      ? data.rows.map((row) => row.slug).filter(Boolean)
      : [];
  } catch (error) {
    console.warn(
      "[sanity] Failed to fetch venture slugs, using fallback:",
      error,
    );
    return FALLBACK_VENTURES.map((venture) => venture.slug);
  }
}
