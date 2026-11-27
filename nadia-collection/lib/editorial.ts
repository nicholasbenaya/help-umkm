import type { Venture } from "./sanity/types";

export type EditorialMotif = "botanical" | "portrait";

/**
 * Splits a multi-word brand or venture title into an upright lead and italic rose accent word
 * matching the DESIGN.md identity motif (e.g. "Afisa" + "Bouquet", "Nadia" + "Artistry").
 */
export function splitEditorialTitle(name: string): {
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
 * Selects the appropriate editorial placeholder motif for a venture.
 */
export function getMotifForVenture(
  venture: Pick<Venture, "name" | "category">,
): EditorialMotif {
  const haystack = `${venture.name} ${venture.category}`.toLowerCase();
  if (
    haystack.includes("bouquet") ||
    haystack.includes("florist") ||
    haystack.includes("bunga")
  ) {
    return "botanical";
  }
  return "portrait";
}
