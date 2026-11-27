import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "@/sanity/env";
import type { SanityImage } from "./types";

const imageBuilder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource) {
  if (!imageBuilder) {
    return null;
  }

  return imageBuilder.image(source);
}

export function getSanityImageUrl(
  source: SanityImage | null | undefined,
  options?: { width?: number; height?: number; quality?: number },
): string | null {
  if (!imageBuilder || !source?.asset?._ref) {
    return null;
  }

  let builder = imageBuilder.image(source).auto("format");

  if (options?.width) {
    builder = builder.width(options.width);
  }
  if (options?.height) {
    builder = builder.height(options.height);
  }
  if (options?.quality) {
    builder = builder.quality(options.quality);
  }

  return builder.url();
}
