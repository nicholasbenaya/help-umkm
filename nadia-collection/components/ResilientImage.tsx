"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PlaceholderMedia,
  type PlaceholderMediaProps,
} from "./PlaceholderMedia";

interface ResilientImageProps {
  src: string | null | undefined;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  placeholder: PlaceholderMediaProps;
}

/**
 * Client wrapper around next/image that gracefully falls back to PlaceholderMedia
 * when the image URL is missing or fails to load at runtime (DESIGN.md Section 5).
 */
export function ResilientImage({
  src,
  alt,
  sizes,
  className = "object-cover",
  priority = false,
  placeholder,
}: ResilientImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return <PlaceholderMedia {...placeholder} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}
