import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import {
  ShowcaseGallery,
  VentureInfoAccordion,
} from "@/components/ShowcaseGallery";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getSanityImageUrl } from "@/lib/sanity/image";
import {
  getSiteData,
  getVentureBySlug,
  getVentureSlugs,
} from "@/lib/sanity/queries";
import type { Venture } from "@/lib/sanity/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getVentureSlugs();
  return slugs.map((slug) => ({ slug }));
}

function splitEditorialTitle(name: string): {
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

function getMotifForVenture(venture: Venture): "botanical" | "portrait" {
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

function getVentureWhatsAppLabel(venture: Venture): string {
  const haystack = `${venture.name} ${venture.category}`.toLowerCase();
  if (
    haystack.includes("bouquet") ||
    haystack.includes("florist") ||
    haystack.includes("bunga")
  ) {
    return "Pesan Buket via WhatsApp";
  }
  if (haystack.includes("makeup") || haystack.includes("mua")) {
    return "Tanya Jadwal MUA via WhatsApp";
  }
  return `Hubungi ${venture.name} via WhatsApp`;
}

function getInstagramLabel(url: string): string {
  try {
    const parsed = new URL(url);
    const segment = parsed.pathname.split("/").filter(Boolean)[0];
    return segment ? `@${segment}` : "Instagram";
  } catch {
    return "Instagram";
  }
}

export default async function VentureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ settings, ventures }, venture] = await Promise.all([
    getSiteData(),
    getVentureBySlug(slug),
  ]);

  if (!venture) {
    notFound();
  }

  const motif = getMotifForVenture(venture);
  const { lead, accent } = splitEditorialTitle(venture.name);
  const coverUrl = getSanityImageUrl(venture.coverImage, {
    width: 1200,
    quality: 88,
  });
  const ventureWhatsappUrl = buildWhatsAppUrl(venture, settings);
  const ventureCtaLabel = getVentureWhatsAppLabel(venture);
  const metaLine = venture.serviceArea
    ? `${venture.category} · ${venture.serviceArea}`
    : venture.category;

  const otherVentures = ventures.filter((item) => item.slug !== venture.slug);
  const hasExternalAction = Boolean(venture.externalActionUrl?.trim());

  return (
    <main className="bg-bg-canvas">
      {/* Top Trail-Inspired 2-Column Venture Hero */}
      <section aria-labelledby="venture-heading" className="py-6 sm:py-10 lg:py-12">
        <div className="editorial-container">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 type-meta text-ink-secondary transition-colors duration-[180ms] ease-out hover:text-accent-rose"
          >
            <span aria-hidden="true">←</span>
            <span>Kembali ke {settings.brandName}</span>
          </Link>

          <div className="mt-4 grid grid-cols-1 gap-8 lg:mt-6 lg:grid-cols-[minmax(0,560px)_1fr] lg:items-start lg:gap-16">
            {/* Venture Info & Hairline Accordions (Below visual on mobile, left on desktop) */}
            <div className="order-2 flex flex-col items-start gap-5 lg:order-1">
              <div className="hidden lg:block">
                <BrandLogo
                  name={venture.name}
                  logo={venture.logo}
                  fallbackLogoPath={venture.fallbackLogoPath}
                  size="md"
                />
              </div>

              <p className="type-meta font-semibold text-accent-rose">
                {metaLine}
              </p>

              <h1
                id="venture-heading"
                className="font-serif text-[2.25rem] leading-[1.06] font-medium tracking-[-0.015em] text-ink-primary sm:text-[3rem] lg:text-[3.25rem]"
              >
                <span>{lead}</span>
                {accent ? (
                  <>
                    {" "}
                    <em className="italic text-accent-rose">{accent}</em>
                  </>
                ) : null}
              </h1>

              <p className="max-w-[540px] type-body text-ink-secondary">
                {venture.fullDescription || venture.shortDescription}
              </p>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <WhatsAppButton
                  href={ventureWhatsappUrl}
                  label={ventureCtaLabel}
                  variant="primary"
                  className="w-full sm:w-auto"
                />

                {venture.instagramUrl ? (
                  <a
                    href={venture.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 type-meta text-ink-secondary underline decoration-border-hairline underline-offset-4 transition-colors duration-[180ms] ease-out hover:text-accent-rose hover:decoration-accent-rose"
                  >
                    <span>{getInstagramLabel(venture.instagramUrl)}</span>
                    <span aria-hidden="true" className="text-[14px]">
                      ↗
                    </span>
                  </a>
                ) : null}
              </div>

              <div className="w-full pt-2">
                <VentureInfoAccordion
                  venture={venture}
                  founderName={settings.founderName}
                />
              </div>
            </div>

            {/* 4:5 Studio-Plate Hero Visual (Above info on mobile, right on desktop) */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-bg-surface lg:aspect-[4/4.45]">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={venture.coverImage?.alt || venture.name}
                    fill
                    priority
                    sizes="(max-width: 1023px) 100vw, 52vw"
                    className="object-cover"
                  />
                ) : (
                  <PlaceholderMedia
                    label={`${venture.name} · Foto Utama`}
                    variant="studio"
                    motif={motif}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Showcase Gallery with Lightbox */}
      <ShowcaseGallery venture={venture} settings={settings} motif={motif} />

      {/* Optional Future External Tool Band (Strictly Hidden When Empty) */}
      {hasExternalAction && venture.externalActionUrl ? (
        <section
          aria-label="Layanan tambahan eksternal"
          className="bg-bg-canvas pt-12 pb-2 sm:pt-14"
        >
          <div className="editorial-container">
            <div className="flex flex-col gap-5 border border-border-hairline bg-bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="space-y-1.5">
                <p className="type-micro uppercase text-accent-rose">
                  Layanan Tambahan
                </p>
                <p className="type-subheading text-ink-primary">
                  {venture.externalActionLabel || `Eksplorasi ${venture.name}`}
                </p>
              </div>
              <a
                href={venture.externalActionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-[2px] border border-border-strong bg-transparent px-6 type-micro uppercase text-ink-primary transition-colors duration-[180ms] ease-out hover:bg-bg-canvas hover:text-accent-rose"
              >
                <span>{venture.externalActionLabel || "Buka Tautan"}</span>
                <span aria-hidden="true" className="text-[14px]">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </section>
      ) : null}

      {/* Other Ventures Switcher */}
      {otherVentures.length > 0 ? (
        <section
          aria-labelledby="other-ventures-heading"
          className="bg-bg-canvas py-14 sm:py-16 lg:py-[72px]"
        >
          <div className="editorial-container">
            <p
              id="other-ventures-heading"
              className="type-micro uppercase text-accent-rose"
            >
              Lini Usaha {settings.founderName} Lainnya
            </p>

            {otherVentures.length === 1 ? (
              (() => {
                const other = otherVentures[0];
                const otherTitle = splitEditorialTitle(other.name);
                return (
                  <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl space-y-2">
                      <h2 className="type-editorial text-ink-primary">
                        <span>{otherTitle.lead}</span>
                        {otherTitle.accent ? (
                          <>
                            {" "}
                            <em className="italic text-accent-rose">
                              {otherTitle.accent}
                            </em>
                          </>
                        ) : null}
                      </h2>
                      <p className="type-body text-ink-secondary">
                        {other.shortDescription}
                      </p>
                    </div>
                    <Link
                      href={`/ventures/${other.slug}`}
                      className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-[2px] border border-border-strong px-6 type-micro uppercase text-ink-primary transition-colors duration-[180ms] ease-out hover:bg-bg-surface hover:text-accent-rose"
                    >
                      <span>Lihat {other.name}</span>
                      <span aria-hidden="true" className="text-[14px]">
                        ↗
                      </span>
                    </Link>
                  </div>
                );
              })()
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {otherVentures.map((other) => {
                  const otherTitle = splitEditorialTitle(other.name);
                  return (
                    <div
                      key={other._id}
                      className="flex flex-col justify-between gap-4 border border-border-hairline bg-bg-surface p-6"
                    >
                      <div className="space-y-2">
                        <p className="type-meta text-accent-rose">
                          {other.serviceArea
                            ? `${other.category} · ${other.serviceArea}`
                            : other.category}
                        </p>
                        <h2 className="type-venture text-ink-primary">
                          <span>{otherTitle.lead}</span>
                          {otherTitle.accent ? (
                            <>
                              {" "}
                              <em className="italic text-accent-rose">
                                {otherTitle.accent}
                              </em>
                            </>
                          ) : null}
                        </h2>
                        <p className="type-body text-ink-secondary">
                          {other.shortDescription}
                        </p>
                      </div>
                      <div>
                        <Link
                          href={`/ventures/${other.slug}`}
                          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[2px] border border-border-strong px-5 type-micro uppercase text-ink-primary transition-colors duration-[180ms] ease-out hover:bg-bg-canvas hover:text-accent-rose"
                        >
                          <span>Lihat {other.name}</span>
                          <span aria-hidden="true" className="text-[14px]">
                            ↗
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      ) : null}
    </main>
  );
}
