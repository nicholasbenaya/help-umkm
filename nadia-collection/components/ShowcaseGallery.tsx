"use client";

import { useState } from "react";
import Image from "next/image";
import { getSanityImageUrl } from "@/lib/sanity/image";
import type { SiteSettings, Venture } from "@/lib/sanity/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { type LightboxGalleryItem, LightboxModal } from "./LightboxModal";
import { PlaceholderMedia } from "./PlaceholderMedia";
import { WhatsAppButton } from "./WhatsAppButton";

interface VentureInfoAccordionProps {
  venture: Venture;
  founderName: string;
}

interface AccordionSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

/**
 * Trail-style hairline +/- expandable rows displaying only real CMS-backed venture info.
 * Empty optional fields (such as an unset MUA serviceArea) are omitted automatically.
 */
export function VentureInfoAccordion({
  venture,
  founderName,
}: VentureInfoAccordionProps) {
  const sections: AccordionSection[] = [];

  if (venture.highlights.length > 0 || venture.fullDescription) {
    sections.push({
      id: "offerings",
      title: "Detail Layanan & Penawaran",
      content: (
        <div className="space-y-3">
          {venture.highlights.length > 0 ? (
            <ul className="space-y-2.5">
              {venture.highlights.map((item, idx) => (
                <li
                  key={item._key || `${item.title}-${idx}`}
                  className="flex flex-col gap-0.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-ink-primary">
                      {item.title}
                    </span>
                    {item.priceHint ? (
                      <span className="type-meta text-accent-rose">
                        {item.priceHint}
                      </span>
                    ) : null}
                  </div>
                  {item.note ? (
                    <p className="text-sm leading-relaxed text-ink-secondary">
                      {item.note}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-ink-secondary">
              {venture.fullDescription}
            </p>
          )}
        </div>
      ),
    });
  }

  if (venture.serviceArea) {
    sections.push({
      id: "service-area",
      title: "Area Layanan",
      content: (
        <p className="text-sm leading-relaxed text-ink-secondary">
          Melayani pelanggan untuk area {venture.serviceArea}. Silakan hubungi{" "}
          {founderName} melalui WhatsApp untuk konfirmasi lokasi dan jadwal
          pengambilan atau pengiriman.
        </p>
      ),
    });
  }

  sections.push({
    id: "how-to-order",
    title: "Cara Pemesanan via WhatsApp",
    content: (
      <p className="text-sm leading-relaxed text-ink-secondary">
        Tekan tombol WhatsApp di halaman ini atau pilih foto karya di galeri
        untuk mengirim pesan otomatis. Ceritakan tanggal acara, preferensi warna
        atau gaya, dan kebutuhan Anda agar {founderName} dapat membantu langsung.
      </p>
    ),
  });

  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() =>
    sections[0] ? { [sections[0].id]: true } : {},
  );

  const toggleSection = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full border-t border-border-hairline pt-1">
      {sections.map((section) => {
        const isOpen = Boolean(openIds[section.id]);
        const panelId = `venture-accordion-panel-${section.id}`;

        return (
          <div key={section.id} className="border-b border-border-hairline">
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex min-h-[52px] w-full items-center justify-between gap-4 py-3.5 text-left transition-colors duration-[180ms] ease-out hover:text-accent-rose"
            >
              <span className="text-sm font-semibold text-ink-primary">
                {section.title}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-lg leading-none text-accent-rose"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen ? (
              <div id={panelId} className="pb-4 pr-4">
                {section.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

interface ShowcaseGalleryProps {
  venture: Venture;
  settings: SiteSettings;
  motif: "botanical" | "portrait";
}

export function ShowcaseGallery({
  venture,
  settings,
  motif,
}: ShowcaseGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const galleryItems: LightboxGalleryItem[] = venture.gallery.map(
    (item, index) => {
      const thumbUrl = getSanityImageUrl(item.image, {
        width: 720,
        height: 840,
        quality: 84,
      });
      const fullUrl = getSanityImageUrl(item.image, {
        width: 1600,
        quality: 90,
      });
      const id = item._key || `${venture._id}-photo-${index}`;

      return {
        id,
        imageUrl: failedImages[id] ? null : (fullUrl ?? thumbUrl),
        alt: item.image?.alt || item.caption || `${venture.name} karya ${index + 1}`,
        caption: item.caption || item.tag || `${venture.name} #${index + 1}`,
        tag: item.tag,
      };
    },
  );

  const hasPhotos = galleryItems.length > 0;
  const whatsappCatalogUrl = buildWhatsAppUrl(
    venture,
    settings,
    `Halo ${settings.founderName}, saya ingin melihat katalog foto terbaru untuk ${venture.name}.`,
  );

  return (
    <section
      aria-labelledby="gallery-heading"
      className="bg-bg-surface py-12 sm:py-16 lg:py-20"
    >
      <div className="editorial-container">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 md:flex-row md:items-end md:justify-between">
          <h2 id="gallery-heading" className="type-editorial text-ink-primary">
            Galeri <em className="italic text-accent-rose">Karya</em>
          </h2>
          {hasPhotos ? (
            <p className="type-meta text-ink-secondary">
              Klik foto untuk memperbesar dan tanyakan langsung via WhatsApp.
            </p>
          ) : null}
        </div>

        {hasPhotos ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group flex flex-col text-left"
              >
                <div className="relative aspect-[4/4.65] w-full overflow-hidden bg-bg-canvas">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                      className="object-cover transition-transform duration-[400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [item.id]: true,
                        }))
                      }
                    />
                  ) : (
                    <PlaceholderMedia
                      label={`${venture.name} · Foto Segera Hadir`}
                      variant="canvas"
                      motif={motif}
                    />
                  )}
                </div>

                <span className="mt-2.5 text-sm font-medium text-ink-primary transition-colors duration-[180ms] ease-out group-hover:text-accent-rose">
                  {item.caption}
                </span>
                {item.tag ? (
                  <span className="mt-0.5 text-[0.8125rem] leading-[1.45] text-ink-secondary">
                    {item.tag}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="border border-border-hairline bg-bg-canvas p-7 sm:p-10">
              <p className="max-w-2xl type-body text-ink-secondary">
                Galeri foto untuk {venture.name} sedang disiapkan. Hubungi{" "}
                {settings.founderName} lewat WhatsApp untuk melihat katalog
                terbaru.
              </p>
              <div className="mt-6">
                <WhatsAppButton
                  href={whatsappCatalogUrl}
                  label={`Tanya Katalog ${venture.name} via WhatsApp`}
                  variant="primary"
                />
              </div>
            </div>

            {venture.highlights.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                {venture.highlights.map((highlight, idx) => (
                  <div
                    key={highlight._key || `${highlight.title}-${idx}`}
                    className="flex flex-col"
                  >
                    <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-bg-canvas">
                      <PlaceholderMedia
                        label={`${venture.name} · Foto Segera Hadir`}
                        variant="canvas"
                        motif={motif}
                      />
                    </div>
                    <p className="mt-2.5 text-sm font-medium text-ink-primary">
                      {highlight.title}
                    </p>
                    {highlight.priceHint || highlight.note ? (
                      <p className="mt-0.5 text-[0.8125rem] leading-[1.45] text-ink-secondary">
                        {highlight.priceHint || highlight.note}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>

      <LightboxModal
        items={galleryItems}
        activeIndex={activeIndex}
        venture={venture}
        settings={settings}
        motif={motif}
        onClose={() => setActiveIndex(null)}
        onNavigate={(nextIndex) => setActiveIndex(nextIndex)}
      />
    </section>
  );
}
