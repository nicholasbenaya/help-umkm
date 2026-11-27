"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteSettings, Venture } from "@/lib/sanity/types";
import {
  buildGeneralWhatsAppUrl,
  formatWhatsappDisplay,
} from "@/lib/whatsapp";
import { BrandLogo } from "./BrandLogo";
import { WhatsAppButton } from "./WhatsAppButton";

interface FooterProps {
  settings: SiteSettings;
  ventures: Venture[];
}

export function Footer({ settings, ventures }: FooterProps) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  const whatsappHref = buildGeneralWhatsAppUrl(settings);
  const formattedPhone = formatWhatsappDisplay(settings.defaultWhatsappNumber);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-hairline bg-bg-canvas">
      <div className="editorial-container py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-12">
          {/* Brand Summary */}
          <div className="space-y-4">
            <Link
              href="/"
              aria-label={`${settings.brandName} Beranda`}
              className="inline-flex min-h-[44px] items-center"
            >
              <BrandLogo
                name={settings.brandName}
                logo={settings.brandLogo}
                fallbackLogoPath={settings.fallbackLogoPath}
                size="md"
              />
            </Link>
            <p className="max-w-sm type-body text-ink-secondary">
              {settings.tagline}
            </p>
          </div>

          {/* Active Ventures & Social Links */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <div>
              <p className="type-micro uppercase text-accent-rose">
                Lini Usaha
              </p>
              <ul className="mt-3 space-y-1">
                <li>
                  <Link
                    href="/"
                    className="inline-flex min-h-[44px] items-center type-meta text-ink-primary transition-colors duration-[180ms] ease-out hover:text-accent-rose"
                  >
                    Beranda
                  </Link>
                </li>
                {ventures.map((venture) => (
                  <li key={venture._id}>
                    <Link
                      href={`/ventures/${venture.slug}`}
                      className="inline-flex min-h-[44px] items-center type-meta text-ink-primary transition-colors duration-[180ms] ease-out hover:text-accent-rose"
                    >
                      {venture.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {settings.socialLinks.length > 0 ? (
              <div>
                <p className="type-micro uppercase text-accent-rose">
                  Instagram &amp; Sosial
                </p>
                <ul className="mt-3 space-y-1">
                  {settings.socialLinks.map((social) => (
                    <li key={social._key || social.url}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 type-meta text-ink-primary transition-colors duration-[180ms] ease-out hover:text-accent-rose"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="shrink-0"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
                        </svg>
                        <span>{social.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Direct WhatsApp Contact */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <p className="type-micro uppercase text-accent-rose">
              Konsultasi &amp; Pemesanan
            </p>
            <p className="type-body text-ink-secondary">
              Diskusikan kebutuhan buket custom, jadwal MUA, atau pertanyaan
              lainnya langsung bersama {settings.founderName}.
            </p>
            <div className="pt-1">
              <WhatsAppButton
                href={whatsappHref}
                label="Hubungi Nadia via WhatsApp"
                variant="primary"
              />
            </div>
            <p className="type-meta text-ink-secondary">
              WhatsApp: {formattedPhone}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border-hairline pt-6 type-meta text-ink-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {settings.brandName}. Seluruh hak cipta
            dilindungi.
          </p>
          <p>Personal Brand &amp; Multi-Venture Showcase</p>
        </div>
      </div>
    </footer>
  );
}
