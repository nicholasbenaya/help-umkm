import type { SiteSettings, Venture } from "./sanity/types";

const DEFAULT_WHATSAPP_FALLBACK = "6282154309113";

/**
 * Strips non-digit characters and normalizes local Indonesian leading "0" to "62".
 */
export function sanitizeWhatsappNumber(raw: string | null | undefined): string {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (!digits) {
    return DEFAULT_WHATSAPP_FALLBACK;
  }
  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }
  return digits;
}

/**
 * Formats an international WhatsApp digit string for human reading (e.g. 0821-5430-9113).
 */
export function formatWhatsappDisplay(raw: string | null | undefined): string {
  const digits = sanitizeWhatsappNumber(raw);
  if (digits.startsWith("62") && digits.length >= 10) {
    const local = `0${digits.slice(2)}`;
    return local.replace(/^(\d{4})(\d{4})(\d+)$/, "$1-$2-$3");
  }
  return `+${digits}`;
}

type VentureWhatsappInput = Pick<
  Venture,
  "name" | "whatsappNumberOverride" | "whatsappMessageTemplate"
>;

type SettingsWhatsappInput = Pick<
  SiteSettings,
  "brandName" | "defaultWhatsappNumber" | "defaultWhatsappMessage"
>;

/**
 * Builds a valid https://wa.me/<digits>?text=<encoded> conversion URL.
 * Resolves venture.whatsappNumberOverride first, falling back to settings.defaultWhatsappNumber.
 */
export function buildWhatsAppUrl(
  venture: VentureWhatsappInput | null | undefined,
  settings: SettingsWhatsappInput,
  customMessage?: string,
): string {
  const phone = sanitizeWhatsappNumber(
    venture?.whatsappNumberOverride || settings.defaultWhatsappNumber,
  );

  const fallbackMessage = venture
    ? venture.whatsappMessageTemplate ||
      `Halo ${settings.brandName}, saya ingin bertanya mengenai ${venture.name}.`
    : settings.defaultWhatsappMessage ||
      `Halo, saya melihat website ${settings.brandName} dan ingin bertanya mengenai layanan yang tersedia.`;

  const message = (customMessage?.trim() || fallbackMessage).trim();

  if (!message) {
    return `https://wa.me/${phone}`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Convenience helper for general personal-brand WhatsApp inquiries.
 */
export function buildGeneralWhatsAppUrl(
  settings: SettingsWhatsappInput,
  customMessage?: string,
): string {
  return buildWhatsAppUrl(null, settings, customMessage);
}
