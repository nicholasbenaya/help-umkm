"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteSettings, Venture } from "@/lib/sanity/types";
import { sanitizeExternalUrl } from "@/lib/url";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { BrandLogo } from "./BrandLogo";
import { WhatsAppButton } from "./WhatsAppButton";

interface NavbarProps {
  settings: SiteSettings;
  ventures: Venture[];
}

export function Navbar({ settings, ventures }: NavbarProps) {
  const pathname = usePathname() ?? "";
  // Store the pathname on which the drawer was opened so any route change auto-closes cleanly
  const [openedPathname, setOpenedPathname] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerPanelRef = useRef<HTMLDivElement>(null);
  const lastOpenedPathRef = useRef<string | null>(null);

  const isDrawerOpen = openedPathname !== null && openedPathname === pathname;
  const whatsappHref = buildGeneralWhatsAppUrl(settings);

  // Hide public site chrome on Embedded Sanity Studio routes
  const isStudioRoute = pathname.startsWith("/studio");

  useEffect(() => {
    if (!isDrawerOpen) {
      // Restore focus to Menu trigger only when closed on the same route (Esc / Close button)
      if (
        lastOpenedPathRef.current !== null &&
        lastOpenedPathRef.current === pathname
      ) {
        menuButtonRef.current?.focus();
      }
      lastOpenedPathRef.current = null;
      return;
    }

    lastOpenedPathRef.current = pathname;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedPathname(null);
        return;
      }

      if (event.key === "Tab" && drawerPanelRef.current) {
        const focusable = Array.from(
          drawerPanelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) {
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen, pathname]);

  if (isStudioRoute) {
    return null;
  }

  const navItems = [
    { href: "/", label: "Beranda", subtitle: settings.brandName },
    ...ventures.map((venture) => ({
      href: `/ventures/${venture.slug}`,
      label: venture.name,
      subtitle: venture.category,
    })),
  ];

  const validSocialLinks = settings.socialLinks
    .map((social) => ({
      ...social,
      safeUrl: sanitizeExternalUrl(social.url),
    }))
    .filter(
      (social): social is typeof social & { safeUrl: string } =>
        Boolean(social.safeUrl),
    );

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-[2px] focus:bg-ink-primary focus:px-5 focus:type-micro focus:uppercase focus:text-ink-on-dark"
      >
        Lewati ke konten utama
      </a>

      <header className="sticky top-0 z-40 border-b border-border-hairline bg-bg-canvas">
        <div className="editorial-container flex h-[56px] items-center justify-between gap-4 lg:grid lg:h-[68px] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-6">
          {/* Desktop Left Navigation (scrolls gracefully without colliding with centered logo for 4+ ventures) */}
          <nav
            aria-label="Navigasi utama"
            className="hidden min-w-0 items-center gap-5 overflow-x-auto lg:flex xl:gap-7"
          >
            {navItems.map((item) => {
              const active = isActiveLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative inline-flex min-h-[44px] shrink-0 items-center type-meta whitespace-nowrap transition-colors duration-[180ms] ease-out ${
                    active
                      ? "text-accent-rose after:absolute after:right-0 after:bottom-2.5 after:left-0 after:h-[1.5px] after:bg-accent-rose"
                      : "text-ink-primary hover:text-accent-rose"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Brand Logo (Left on Mobile/Tablet, Centered on Desktop) */}
          <div className="flex shrink-0 items-center lg:justify-center">
            <Link
              href="/"
              aria-label={`${settings.brandName} Beranda`}
              className="inline-flex min-h-[44px] items-center"
            >
              <span className="lg:hidden">
                <BrandLogo
                  name={settings.brandName}
                  logo={settings.brandLogo}
                  fallbackLogoPath={settings.fallbackLogoPath}
                  size="sm"
                />
              </span>
              <span className="hidden lg:inline-flex">
                <BrandLogo
                  name={settings.brandName}
                  logo={settings.brandLogo}
                  fallbackLogoPath={settings.fallbackLogoPath}
                  size="md"
                />
              </span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex shrink-0 items-center justify-end gap-3">
            <div className="hidden sm:block">
              <WhatsAppButton
                href={whatsappHref}
                label="Hubungi via WhatsApp"
                variant="compact"
              />
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpenedPathname(pathname)}
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-nav-drawer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-[2px] border border-border-strong px-3.5 type-micro uppercase text-ink-primary transition-colors duration-[180ms] ease-out hover:bg-bg-surface hover:text-accent-rose active:bg-bg-surface-strong lg:hidden"
            >
              <span>Menu</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Navigation Drawer */}
      {isDrawerOpen ? (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi"
          id="mobile-nav-drawer"
        >
          <div
            className="fixed inset-0 bg-[#1f171a]/45"
            aria-hidden="true"
            onClick={() => setOpenedPathname(null)}
          />

          <div
            ref={drawerPanelRef}
            className="fixed inset-y-0 right-0 flex w-full max-w-[360px] flex-col bg-bg-canvas"
          >
            <div className="flex h-[56px] items-center justify-between border-b border-border-hairline px-5">
              <Link
                href="/"
                onClick={() => setOpenedPathname(null)}
                className="inline-flex min-h-[44px] items-center"
              >
                <BrandLogo
                  name={settings.brandName}
                  logo={settings.brandLogo}
                  fallbackLogoPath={settings.fallbackLogoPath}
                  size="sm"
                />
              </Link>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpenedPathname(null)}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-[2px] border border-border-strong px-3 type-micro uppercase text-ink-primary transition-colors duration-[180ms] ease-out hover:bg-bg-surface hover:text-accent-rose"
              >
                <span>Tutup</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            <nav
              aria-label="Menu mobile"
              className="flex-1 overflow-y-auto px-5 py-6"
            >
              <ul className="divide-y divide-border-hairline border-b border-border-hairline">
                {navItems.map((item) => {
                  const active = isActiveLink(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpenedPathname(null)}
                        aria-current={active ? "page" : undefined}
                        className="flex min-h-[56px] items-center justify-between gap-4 py-3 transition-colors duration-[180ms] ease-out hover:text-accent-rose"
                      >
                        <span className="flex flex-col">
                          <span
                            className={`font-serif text-[1.375rem] leading-tight ${
                              active
                                ? "italic text-accent-rose"
                                : "text-ink-primary"
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="mt-0.5 type-meta text-ink-secondary">
                            {item.subtitle}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-sm text-ink-secondary"
                        >
                          ↗
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {validSocialLinks.length > 0 ? (
                <div className="mt-6">
                  <p className="type-micro uppercase text-ink-secondary">
                    Media Sosial
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-3">
                    {validSocialLinks.map((social) => (
                      <li key={social._key || social.safeUrl}>
                        <a
                          href={social.safeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center border border-border-hairline bg-bg-surface px-4 type-meta text-ink-primary transition-colors duration-[180ms] ease-out hover:border-border-strong hover:text-accent-rose"
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </nav>

            <div className="border-t border-border-hairline bg-bg-surface px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <WhatsAppButton
                href={whatsappHref}
                label={`Hubungi ${settings.founderName} via WhatsApp`}
                variant="primary"
                fullWidth
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
