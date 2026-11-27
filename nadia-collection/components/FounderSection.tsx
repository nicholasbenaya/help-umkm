import Image from "next/image";
import { getSanityImageUrl } from "@/lib/sanity/image";
import type { SiteSettings } from "@/lib/sanity/types";
import { PlaceholderMedia } from "./PlaceholderMedia";

interface FounderSectionProps {
  settings: SiteSettings;
}

export function FounderSection({ settings }: FounderSectionProps) {
  const founderPhotoUrl = getSanityImageUrl(settings.founderPhoto, {
    width: 960,
    quality: 86,
  });
  const primarySocial = settings.socialLinks[0] ?? null;

  return (
    <section
      aria-labelledby="founder-heading"
      className="bg-bg-surface py-14 sm:py-20 lg:py-[104px]"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-16">
          {/* Staggered Founder Visual */}
          <div className="relative aspect-[4/4.3] w-full max-w-[460px] overflow-hidden bg-bg-blush-hero">
            {founderPhotoUrl ? (
              <Image
                src={founderPhotoUrl}
                alt={
                  settings.founderPhoto?.alt ||
                  `${settings.founderName}, pendiri ${settings.brandName}`
                }
                fill
                sizes="(max-width: 1023px) 100vw, 440px"
                className="object-cover"
              />
            ) : (
              <PlaceholderMedia
                label={`${settings.founderName} · Cerita Pendiri`}
                variant="blush"
                motif="portrait"
              />
            )}
          </div>

          {/* Editorial Statement & Bio */}
          <div className="flex flex-col items-start gap-5">
            <p className="type-micro uppercase text-accent-rose">
              Tentang {settings.founderName}
            </p>

            <h2
              id="founder-heading"
              className="max-w-[740px] type-editorial text-ink-primary"
            >
              Membangun karya kreatif dengan sentuhan{" "}
              <em className="italic text-accent-rose">personal</em> di setiap
              detail.
            </h2>

            <p className="max-w-[640px] type-body-lead text-ink-secondary">
              {settings.founderBio}
            </p>

            {primarySocial ? (
              <a
                href={primarySocial.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 type-meta font-semibold text-ink-primary underline decoration-border-strong underline-offset-4 transition-colors duration-[180ms] ease-out hover:text-accent-rose hover:decoration-accent-rose"
              >
                <span>
                  {primarySocial.platform} {primarySocial.label}
                </span>
                <span aria-hidden="true" className="text-[14px]">
                  ↗
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
