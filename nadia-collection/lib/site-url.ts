const DEFAULT_SITE_ORIGIN = "https://nadia-collection.vercel.app";
const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

function parseValidOrigin(candidate: string | undefined): string | null {
  const trimmed = candidate?.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
      return null;
    }
    return parsed.origin;
  } catch {
    return null;
  }
}

function normalizeHostCandidate(host: string | undefined): string | undefined {
  const trimmed = host?.trim();
  if (!trimmed) {
    return undefined;
  }
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/**
 * Resolves the canonical site origin with safe URL validation and fallback.
 */
export function getSiteOrigin(): string {
  return (
    parseValidOrigin(process.env.NEXT_PUBLIC_SITE_URL) ||
    parseValidOrigin(
      normalizeHostCandidate(process.env.VERCEL_PROJECT_PRODUCTION_URL),
    ) ||
    parseValidOrigin(normalizeHostCandidate(process.env.VERCEL_URL)) ||
    DEFAULT_SITE_ORIGIN
  );
}

/**
 * Returns a validated URL instance suitable for Next.js Metadata.metadataBase.
 */
export function getMetadataBase(): URL {
  return new URL(getSiteOrigin());
}
