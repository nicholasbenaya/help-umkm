import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getSiteData } from "@/lib/sanity/queries";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default async function NotFoundPage() {
  const { settings } = await getSiteData();
  const whatsappHref = buildGeneralWhatsAppUrl(settings);

  return (
    <main className="bg-bg-canvas py-16 sm:py-24 lg:py-32">
      <div className="editorial-container">
        <div className="mx-auto max-w-2xl border border-border-hairline bg-bg-surface p-8 sm:p-12">
          <p className="type-micro uppercase text-accent-rose">
            404 · Halaman Tidak Ditemukan
          </p>

          <h1 className="mt-4 type-editorial text-ink-primary">
            Maaf, halaman yang Anda cari tidak{" "}
            <em className="italic text-accent-rose">tersedia</em>
          </h1>

          <p className="mt-4 type-body-lead text-ink-secondary">
            Tautan mungkin sudah berubah atau lini usaha sedang tidak aktif.
            Silakan kembali ke beranda {settings.brandName} atau hubungi{" "}
            {settings.founderName} langsung melalui WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-[2px] bg-ink-primary px-6 type-micro uppercase text-ink-on-dark transition-colors duration-[180ms] ease-out hover:bg-accent-rose active:bg-accent-rose-hover sm:w-auto"
            >
              Kembali ke Beranda
            </Link>

            <WhatsAppButton
              href={whatsappHref}
              label={`Hubungi ${settings.founderName} via WhatsApp`}
              variant="secondary"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
