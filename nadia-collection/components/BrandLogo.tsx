"use client";

import { useState } from "react";
import Image from "next/image";
import { splitEditorialTitle } from "@/lib/editorial";
import { getSanityImageUrl } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

interface BrandLogoProps {
  name: string;
  logo?: SanityImage | null;
  fallbackLogoPath?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

type EmblemKind = "nadia-collection" | "afisa-bouquet" | "nadia-artistry";

const EMBLEM_BY_PATH: Record<string, { kind: EmblemKind; expectedName: string }> =
  {
    "/logos/nadia-collection-logo.svg": {
      kind: "nadia-collection",
      expectedName: "nadia collection",
    },
    "/logos/afisa-bouquet-logo.svg": {
      kind: "afisa-bouquet",
      expectedName: "afisa bouquet",
    },
    "/logos/nadia-artistry-logo.svg": {
      kind: "nadia-artistry",
      expectedName: "nadia artistry",
    },
  };

const SIZE_CONFIG = {
  sm: {
    heightClass: "h-[26px]",
    width: 150,
    height: 26,
    emblemSize: 24,
    gapClass: "gap-2",
    wordmarkClass: "text-[1.25rem]",
  },
  md: {
    heightClass: "h-[32px]",
    width: 184,
    height: 32,
    emblemSize: 30,
    gapClass: "gap-2.5",
    wordmarkClass: "text-[1.5rem]",
  },
  lg: {
    heightClass: "h-[40px]",
    width: 228,
    height: 40,
    emblemSize: 36,
    gapClass: "gap-3",
    wordmarkClass: "text-[1.875rem]",
  },
} as const;

function BrandEmblem({
  kind,
  size,
}: {
  kind: EmblemKind;
  size: number;
}) {
  if (kind === "afisa-bouquet") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M18 33V12.5" stroke="#1F171A" strokeWidth="1.25" />
        <path
          d="M18 19C13.2 17.8 10 13.5 10.5 7.5C15.2 8.4 18 12.2 18 17.2"
          stroke="#9E3B5A"
          strokeWidth="1.25"
        />
        <path
          d="M18 17.5C22.8 16.3 26 12 25.5 6C20.8 6.9 18 10.7 18 15.7"
          stroke="#9E3B5A"
          strokeWidth="1.25"
        />
        <path
          d="M18 12.5C16.2 9.2 16.6 5.8 18 3.5C19.4 5.8 19.8 9.2 18 12.5Z"
          stroke="#1F171A"
          strokeWidth="1.2"
        />
        <path
          d="M12.5 28.5C14.8 27.2 16.7 27.3 18 28.5C19.3 27.3 21.2 27.2 23.5 28.5"
          stroke="#1F171A"
          strokeWidth="1.15"
        />
      </svg>
    );
  }

  if (kind === "nadia-artistry") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M7 31V16C7 9.9249 11.9249 5 18 5C24.0751 5 29 9.9249 29 16V31"
          stroke="#1F171A"
          strokeWidth="1.2"
        />
        <line x1="5" y1="31" x2="31" y2="31" stroke="#1F171A" strokeWidth="1.15" />
        <path
          d="M12 24.5C15.2 17.5 20.6 13.4 25.5 12.5C24.1 17.8 20 22.4 12 24.5Z"
          stroke="#9E3B5A"
          strokeWidth="1.25"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="2" y="2" width="32" height="32" stroke="#1F171A" strokeWidth="1.15" />
      <path d="M11.5 26V10L24.5 26V10" stroke="#1F171A" strokeWidth="1.35" />
      <path
        d="M27.5 6.5C29.8 7.8 30.8 10.3 29.8 12.5C27.5 12.7 25.4 11.2 25.1 8.8C25.9 7.6 26.7 6.9 27.5 6.5Z"
        stroke="#9E3B5A"
        strokeWidth="1.1"
      />
    </svg>
  );
}

/**
 * Renders the brand or venture logo with resilient CMS fallback:
 * 1. Uploaded Sanity CMS image (with runtime onError fallback)
 * 2. Matching inline vector emblem + real HTML Cormorant Garamond editorial wordmark
 * 3. Pure HTML Cormorant Garamond editorial wordmark for renamed brands or new ventures
 */
export function BrandLogo({
  name,
  logo,
  fallbackLogoPath,
  size = "md",
  className = "",
}: BrandLogoProps) {
  const [failedLogoUrl, setFailedLogoUrl] = useState<string | null>(null);
  const { heightClass, width, height, emblemSize, gapClass, wordmarkClass } =
    SIZE_CONFIG[size];
  const cmsLogoUrl = getSanityImageUrl(logo, { height: height * 3, quality: 90 });

  if (cmsLogoUrl && failedLogoUrl !== cmsLogoUrl) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src={cmsLogoUrl}
          alt={logo?.alt || name}
          width={width}
          height={height}
          className={`${heightClass} w-auto max-w-[200px] object-contain`}
          priority={size !== "lg"}
          onError={() => setFailedLogoUrl(cmsLogoUrl)}
        />
      </span>
    );
  }

  const normalizedName = name.trim().toLowerCase();
  const emblemEntry = fallbackLogoPath
    ? EMBLEM_BY_PATH[fallbackLogoPath]
    : undefined;
  const matchedEmblem =
    emblemEntry && emblemEntry.expectedName === normalizedName
      ? emblemEntry.kind
      : null;

  const { lead, accent } = splitEditorialTitle(name);

  return (
    <span className={`inline-flex items-center ${gapClass} ${className}`}>
      {matchedEmblem ? (
        <BrandEmblem kind={matchedEmblem} size={emblemSize} />
      ) : null}
      <span
        className={`inline-flex items-baseline gap-1.5 font-serif font-semibold leading-none tracking-[0.01em] text-ink-primary whitespace-nowrap ${wordmarkClass}`}
      >
        <span>{lead}</span>
        {accent ? (
          <span className="font-medium italic text-accent-rose">{accent}</span>
        ) : null}
      </span>
    </span>
  );
}
