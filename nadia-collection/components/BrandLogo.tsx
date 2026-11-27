import Image from "next/image";
import { getSanityImageUrl } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

interface BrandLogoProps {
  name: string;
  logo?: SanityImage | null;
  fallbackLogoPath?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const DEFAULT_SVG_NAME_BY_PATH: Record<string, string> = {
  "/logos/nadia-collection-logo.svg": "nadia collection",
  "/logos/afisa-bouquet-logo.svg": "afisa bouquet",
  "/logos/nadia-artistry-logo.svg": "nadia artistry",
};

const SIZE_CONFIG = {
  sm: {
    heightClass: "h-[26px]",
    width: 150,
    height: 26,
    wordmarkClass: "text-[1.25rem]",
  },
  md: {
    heightClass: "h-[32px]",
    width: 184,
    height: 32,
    wordmarkClass: "text-[1.5rem]",
  },
  lg: {
    heightClass: "h-[40px]",
    width: 228,
    height: 40,
    wordmarkClass: "text-[1.875rem]",
  },
} as const;

function splitEditorialWordmark(name: string): {
  lead: string;
  accent: string | null;
} {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return { lead: name.trim(), accent: null };
  }

  return {
    lead: parts.slice(0, -1).join(" "),
    accent: parts[parts.length - 1],
  };
}

/**
 * Renders the brand or venture logo with 3-tier CMS resilience:
 * 1. Uploaded Sanity CMS image if present
 * 2. Matching regenerated placeholder SVG from public/logos/ if name matches default
 * 3. Crisp Cormorant Garamond editorial wordmark (ensuring CMS renames reflect immediately)
 */
export function BrandLogo({
  name,
  logo,
  fallbackLogoPath,
  size = "md",
  className = "",
}: BrandLogoProps) {
  const { heightClass, width, height, wordmarkClass } = SIZE_CONFIG[size];
  const cmsLogoUrl = getSanityImageUrl(logo, { height: height * 3, quality: 90 });

  if (cmsLogoUrl) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src={cmsLogoUrl}
          alt={logo?.alt || name}
          width={width}
          height={height}
          className={`${heightClass} w-auto max-w-[200px] object-contain`}
          priority={size !== "lg"}
        />
      </span>
    );
  }

  const normalizedName = name.trim().toLowerCase();
  const expectedSvgName = fallbackLogoPath
    ? DEFAULT_SVG_NAME_BY_PATH[fallbackLogoPath]
    : undefined;
  const canUsePlaceholderSvg =
    Boolean(fallbackLogoPath) &&
    (!expectedSvgName || expectedSvgName === normalizedName);

  if (canUsePlaceholderSvg && fallbackLogoPath) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src={fallbackLogoPath}
          alt={name}
          width={width}
          height={height}
          className={`${heightClass} w-auto max-w-[200px] object-contain`}
          priority={size !== "lg"}
        />
      </span>
    );
  }

  const { lead, accent } = splitEditorialWordmark(name);

  return (
    <span
      className={`inline-flex items-baseline gap-1.5 font-serif font-semibold leading-none tracking-[0.01em] text-ink-primary ${wordmarkClass} ${className}`}
    >
      <span>{lead}</span>
      {accent ? (
        <span className="font-medium italic text-accent-rose">{accent}</span>
      ) : null}
    </span>
  );
}
