import { getSanityImageUrl } from "@/lib/sanity/image";
import type { SiteSettings } from "@/lib/sanity/types";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { ResilientImage } from "./ResilientImage";
import { WhatsAppButton } from "./WhatsAppButton";

interface HeroSectionProps {
  settings: SiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const whatsappHref = buildGeneralWhatsAppUrl(settings);
  const founderPhotoUrl = getSanityImageUrl(settings.founderPhoto, {
    width: 1120,
    quality: 88,
  });

  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-bg-canvas"
    >
      <div className="grid grid-cols-1 lg:min-h-[620px] lg:grid-cols-2">
        {/* Left Editorial Identity Column */}
        <div className="flex flex-col justify-center px-5 pt-8 pb-8 sm:px-8 sm:py-12 lg:py-16 lg:pr-12 lg:pl-[max(48px,calc((100vw-1320px)/2+48px))]">
          <p className="type-micro uppercase text-accent-rose">
            {settings.brandName} · Personal Brand &amp; Ventures
          </p>

          <h1
            id="hero-heading"
            className="mt-4 max-w-[560px] type-hero text-ink-primary sm:mt-5"
          >
            Ruang Karya,{" "}
            <em className="italic text-accent-rose">Satu Rumah</em> untuk Semua
            Lini
          </h1>

          <p className="mt-5 max-w-[500px] type-body-lead text-ink-secondary">
            {settings.tagline}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <WhatsAppButton
              href={whatsappHref}
              label={`Hubungi ${settings.founderName} via WhatsApp`}
              variant="primary"
              className="w-full sm:w-auto"
            />
            <a
              href="#lini-usaha"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-[2px] border border-border-strong bg-transparent px-6 type-micro uppercase text-ink-primary transition-colors duration-[180ms] ease-out hover:bg-bg-surface hover:text-accent-rose active:bg-bg-surface-strong sm:w-auto"
            >
              Lihat Lini Usaha
            </a>
          </div>
        </div>

        {/* Right Blush Studio Visual Column */}
        <div className="px-5 pb-10 sm:px-8 sm:pb-14 lg:bg-bg-blush-hero lg:p-12 xl:p-[60px]">
          <div className="relative mx-auto aspect-[4/4] w-full max-w-[540px] bg-bg-blush-hero p-4 sm:p-6 lg:aspect-auto lg:h-full lg:min-h-[500px] lg:bg-transparent lg:p-0">
            <div className="relative h-full min-h-[300px] w-full overflow-hidden bg-bg-surface lg:min-h-[480px]">
              <ResilientImage
                src={founderPhotoUrl}
                alt={
                  settings.founderPhoto?.alt ||
                  `Potret ${settings.founderName}, pendiri ${settings.brandName}`
                }
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
                placeholder={{
                  label: `${settings.founderName} · Potret Pendiri`,
                  variant: "studio",
                  motif: "portrait",
                  className: "h-full min-h-[300px] w-full lg:min-h-[480px]",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
