const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * Validates and sanitizes an external URL from CMS or user data.
 * Allows only http: and https: protocols; returns null for unsafe or malformed values.
 */
export function sanitizeExternalUrl(raw?: string | null): string | null {
  const trimmed = raw?.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}
