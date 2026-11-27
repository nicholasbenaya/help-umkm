import Link from "next/link";
import {
  type EditorialMotif,
  getMotifForVenture,
  splitEditorialTitle,
} from "@/lib/editorial";
import { getSanityImageUrl } from "@/lib/sanity/image";
import type { SanityImage, SiteSettings, Venture } from "@/lib/sanity/types";
import { buildGeneralWhatsAppUrl, buildWhatsAppUrl } from "@/lib/whatsapp";
import { ResilientImage } from "./ResilientImage";
import { WhatsAppButton } from "./WhatsAppButton";

interface VenturesShowcaseProps {
  settings: SiteSettings;
  ventures: Venture[];
}

/**
 * Option 2 Ventures Directory: full-bleed 2-column editorial tiles on tablet/desktop,
 * single-column stacked tiles on mobile. Scales dynamically for any number of CMS ventures.
 */
export function VenturesShowcase({
  settings,
  ventures,
}: VenturesShowcaseProps) {
  if (ventures.length === 0) {
    return (
      <section
        id="lini-usaha"
        aria-labelledby="ventures-heading"
        className="bg-bg-canvas py-14 sm:py-20 lg:py-24"
      >
        <div className="editorial-container">
          <h2 id="ventures-heading" className="type-editorial text-ink-primary">
            Lini Usaha <em className="italic text-accent-rose">Aktif</em>
          </h2>
          <div className="mt-6 border border-border-hairline bg-bg-surface p-8 sm:p-10">
            <p className="max-w-xl type-body text-ink-secondary">
              Daftar lini usaha {settings.brandName} sedang disiapkan. Hubungi{" "}
              {settings.founderName} langsung melalui WhatsApp untuk melihat
              layanan terbaru yang tersedia.
            </p>
            <div className="mt-6">
              <WhatsAppButton
                href={buildGeneralWhatsAppUrl(settings)}
                label={`Hubungi ${settings.founderName} via WhatsApp`}
                variant="primary"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="lini-usaha"
      aria-labelledby="ventures-heading"
      className="bg-bg-canvas pt-6 pb-14 sm:py-20 lg:py-24"
    >
      <div className="editorial-container mb-5 flex flex-col gap-2 sm:mb-7 md:flex-row md:items-end md:justify-between">
        <h2 id="ventures-heading" className="type-editorial text-ink-primary">
          Lini Usaha <em className="italic text-accent-rose">Aktif</em>
        </h2>
        <p className="max-w-md type-meta text-ink-secondary md:text-right">
          Setiap lini usaha memiliki halaman showcase khusus dengan galeri karya
          dan konsultasi langsung ke WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:gap-[2px] sm:px-0">
        {ventures.map((venture, index) => {
          const coverUrl = getSanityImageUrl(venture.coverImage, {
            width: 1200,
            quality: 86,
          });
          const { lead, accent } = splitEditorialTitle(venture.name);
          const ventureWhatsappUrl = buildWhatsAppUrl(venture, settings);
          const metaLine = venture.serviceArea
            ? `${venture.category} · ${venture.serviceArea}`
            : venture.category;

          return (
            <article
              key={venture._id}
              className="group relative flex min-h-[390px] flex-col justify-end overflow-hidden bg-bg-surface sm:min-h-[500px] lg:min-h-[620px]"
            >
              {/* Background Cover or Dignified Editorial Plate */}
              <div className="absolute inset-0">
                <ResilientImage
                  src={coverUrl}
                  alt={venture.coverImage?.alt || venture.name}
                  sizes="(max-width: 639px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
                  placeholder={{
                    label: `${venture.name} · Foto Segera Hadir`,
                    variant: index % 2 === 0 ? "cover" : "cover-alt",
                    motif: "none",
                  }}
                />
              </div>

              {/* Functional Bottom Scrim for >= 4.5:1 Text Contrast */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(31, 23, 26, 0.84) 0%, rgba(31, 23, 26, 0.36) 56%, rgba(31, 23, 26, 0) 100%)",
                }}
              />

              {/* Tile Content */}
              <div className="relative z-10 flex flex-col items-start gap-2.5 p-6 sm:p-8 lg:p-9">
                <p className="type-meta text-[#fdfbfa]/90">{metaLine}</p>

                <h3 className="font-serif text-[2.125rem] leading-[1.08] font-medium tracking-[-0.01em] text-[#fdfbfa] sm:text-[2.5rem] lg:text-[2.75rem]">
                  <span>{lead}</span>
                  {accent ? (
                    <>
                      {" "}
                      <em className="italic text-[#f7dce4]">{accent}</em>
                    </>
                  ) : null}
                </h3>

                <p className="max-w-lg text-sm leading-[1.6] text-[#fdfbfa]/90">
                  {venture.shortDescription}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href={`/ventures/${venture.slug}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 type-micro uppercase text-[#fdfbfa] underline decoration-[#fdfbfa]/70 underline-offset-4 transition-colors duration-[180ms] ease-out hover:text-[#f7dce4] hover:decoration-[#f7dce4]"
                  >
                    <span>Lihat Showcase</span>
                    <span aria-hidden="true" className="text-[14px]">
                      ↗
                    </span>
                  </Link>

                  <a
                    href={ventureWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-[2px] border border-[#fdfbfa]/65 bg-[#1f171a]/35 px-4 type-micro uppercase text-[#fdfbfa] transition-colors duration-[180ms] ease-out hover:border-[#fdfbfa] hover:bg-[#fdfbfa] hover:text-ink-primary"
                  >
                    Chat via WhatsApp
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

interface HighlightCardItem {
  id: string;
  title: string;
  subtitle: string;
  ventureName: string;
  ventureSlug: string;
  image?: SanityImage | null;
  motif: EditorialMotif;
}

function buildCuratedHighlightItems(ventures: Venture[]): HighlightCardItem[] {
  const items: HighlightCardItem[] = [];
  const maxItems = 4;

  // First pass: interleave real gallery items across active ventures
  let galleryIndex = 0;
  let foundMore = true;
  while (items.length < maxItems && foundMore) {
    foundMore = false;
    for (const venture of ventures) {
      const photo = venture.gallery[galleryIndex];
      if (photo && items.length < maxItems) {
        foundMore = true;
        items.push({
          id: `${venture._id}-gallery-${photo._key || galleryIndex}`,
          title: photo.caption || photo.tag || venture.name,
          subtitle: venture.serviceArea
            ? `${venture.name} · ${venture.serviceArea.split(",")[0]}`
            : `${venture.name} · ${venture.category}`,
          ventureName: venture.name,
          ventureSlug: venture.slug,
          image: photo.image,
          motif: getMotifForVenture(venture),
        });
      }
    }
    galleryIndex += 1;
  }

  // Second pass: if fewer than 4 real photos uploaded yet, interleave real venture highlights
  if (items.length < maxItems) {
    let highlightIndex = 0;
    let foundHighlight = true;
    while (items.length < maxItems && foundHighlight) {
      foundHighlight = false;
      for (const venture of ventures) {
        const highlight = venture.highlights[highlightIndex];
        if (highlight && items.length < maxItems) {
          foundHighlight = true;
          items.push({
            id: `${venture._id}-highlight-${highlight._key || highlightIndex}`,
            title: highlight.title,
            subtitle: venture.serviceArea
              ? `${venture.name} · ${venture.serviceArea.split(",")[0]}`
              : `${venture.name} · ${venture.category}`,
            ventureName: venture.name,
            ventureSlug: venture.slug,
            image: null,
            motif: getMotifForVenture(venture),
          });
        }
      }
      highlightIndex += 1;
    }
  }

  return items;
}

interface CuratedHighlightsStripProps {
  ventures: Venture[];
}

/**
 * Option 2 Cross-Venture Curated Strip (4-column studio plates on desktop, 2-column on mobile).
 */
export function CuratedHighlightsStrip({
  ventures,
}: CuratedHighlightsStripProps) {
  const items = buildCuratedHighlightItems(ventures);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="highlights-heading"
      className="bg-bg-canvas py-14 sm:py-20 lg:py-24"
    >
      <div className="editorial-container">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="highlights-heading"
            className="type-editorial text-ink-primary"
          >
            Sorotan <em className="italic text-accent-rose">Karya</em>
          </h2>
          <p className="type-meta text-ink-secondary">
            Pilihan layanan dan karya lintas lini usaha.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {items.map((item) => {
            const imageUrl = getSanityImageUrl(item.image, {
              width: 720,
              height: 860,
              quality: 84,
            });

            return (
              <Link
                key={item.id}
                href={`/ventures/${item.ventureSlug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/4.8] w-full overflow-hidden bg-bg-surface">
                  <ResilientImage
                    src={imageUrl}
                    alt={item.image?.alt || item.title}
                    sizes="(max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
                    placeholder={{
                      label: `${item.ventureName} · Foto Segera Hadir`,
                      variant: "studio",
                      motif: item.motif,
                    }}
                  />
                </div>

                <div className="mt-2.5 flex flex-col gap-0.5">
                  <p className="type-meta text-ink-primary transition-colors duration-[180ms] ease-out group-hover:text-accent-rose">
                    {item.title}
                  </p>
                  <p className="text-[0.8125rem] leading-[1.45] text-ink-secondary">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
