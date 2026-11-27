"use client";

import { useEffect, useRef } from "react";
import type { EditorialMotif } from "@/lib/editorial";
import type { SiteSettings, Venture } from "@/lib/sanity/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ResilientImage } from "./ResilientImage";
import { WhatsAppButton } from "./WhatsAppButton";

export interface LightboxGalleryItem {
  id: string;
  thumbUrl: string | null;
  imageUrl: string | null;
  alt: string;
  caption: string;
  tag?: string | null;
}

interface LightboxModalProps {
  items: LightboxGalleryItem[];
  activeIndex: number | null;
  venture: Venture;
  settings: SiteSettings;
  motif: EditorialMotif;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");

  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

export function LightboxModal({
  items,
  activeIndex,
  venture,
  settings,
  motif,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;
  const activeItem = isOpen ? items[activeIndex] : null;
  const total = items.length;

  // Effect 1: Manage initial focus, body scroll lock, and focus restoration ONLY on open/close
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  // Effect 2: Handle keyboard navigation and Tab focus trap without stealing focus on index change
  useEffect(() => {
    if (!isOpen || activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (total > 1 && event.key === "ArrowRight") {
        event.preventDefault();
        onNavigate((activeIndex + 1) % total);
        return;
      }

      if (total > 1 && event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate((activeIndex - 1 + total) % total);
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = getFocusableElements(dialogRef.current);
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
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeIndex, total, onClose, onNavigate]);

  if (!isOpen || !activeItem || activeIndex === null) {
    return null;
  }

  const customWhatsappMessage = `Halo ${settings.founderName}, saya tertarik dengan karya "${activeItem.caption}" dari ${venture.name}. Boleh tanya detail dan ketersediaannya?`;
  const whatsappHref = buildWhatsAppUrl(
    venture,
    settings,
    customWhatsappMessage,
  );

  const subtitleParts = [
    activeItem.tag,
    venture.serviceArea ? `Area ${venture.serviceArea}` : null,
  ].filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f171a]/72 p-4 backdrop-blur-[4px] sm:p-6"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-caption-heading"
        className="flex max-h-[92dvh] w-full max-w-[840px] flex-col gap-5 overflow-y-auto rounded-[2px] bg-bg-canvas p-5 shadow-[0_24px_60px_rgba(31,23,26,0.22)] sm:p-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4">
          <p className="type-micro uppercase text-accent-rose">
            {venture.name} · {activeIndex + 1} / {total}
          </p>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-[2px] border border-border-strong px-3.5 type-micro uppercase text-ink-primary transition-colors duration-[180ms] ease-out hover:bg-bg-surface hover:text-accent-rose active:bg-bg-surface-strong"
          >
            <span>Tutup</span>
            <span aria-hidden="true" className="text-base leading-none">
              ×
            </span>
          </button>
        </div>

        {/* Full-Resolution Preview Frame */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-surface sm:aspect-[16/10]">
          <ResilientImage
            src={activeItem.imageUrl ?? activeItem.thumbUrl}
            alt={activeItem.alt}
            sizes="(max-width: 896px) 100vw, 776px"
            className="object-contain"
            priority
            placeholder={{
              label: `${activeItem.caption} · Pratinjau Foto`,
              variant: "studio",
              motif,
            }}
          />

          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={() => onNavigate((activeIndex - 1 + total) % total)}
                aria-label="Foto sebelumnya"
                className="absolute top-1/2 left-3 inline-flex h-[44px] w-[44px] -translate-y-1/2 items-center justify-center rounded-[2px] border border-border-strong bg-bg-canvas/95 text-lg text-ink-primary transition-colors duration-[180ms] ease-out hover:bg-bg-surface hover:text-accent-rose"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate((activeIndex + 1) % total)}
                aria-label="Foto berikutnya"
                className="absolute top-1/2 right-3 inline-flex h-[44px] w-[44px] -translate-y-1/2 items-center justify-center rounded-[2px] border border-border-strong bg-bg-canvas/95 text-lg text-ink-primary transition-colors duration-[180ms] ease-out hover:bg-bg-surface hover:text-accent-rose"
              >
                <span aria-hidden="true">›</span>
              </button>
            </>
          ) : null}
        </div>

        {/* Caption & Direct WhatsApp Action */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2
              id="lightbox-caption-heading"
              className="type-subheading text-ink-primary"
            >
              {activeItem.caption}
            </h2>
            {subtitleParts.length > 0 ? (
              <p className="mt-1 type-meta text-ink-secondary">
                {subtitleParts.join(" · ")}
              </p>
            ) : null}
          </div>

          <div className="shrink-0">
            <WhatsAppButton
              href={whatsappHref}
              label="Tanyakan Karya Ini via WhatsApp"
              variant="primary"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
