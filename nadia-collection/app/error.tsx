"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <main className="bg-bg-canvas py-16 sm:py-24 lg:py-32">
      <div className="editorial-container">
        <div className="mx-auto max-w-2xl border border-border-hairline bg-bg-surface p-8 sm:p-12">
          <p className="type-micro uppercase text-accent-rose">
            Terjadi Kendala
          </p>

          <h1 className="mt-4 type-editorial text-ink-primary">
            Halaman belum dapat{" "}
            <em className="italic text-accent-rose">dimuat</em> saat ini
          </h1>

          <p className="mt-4 type-body-lead text-ink-secondary">
            Terjadi gangguan sementara saat memuat konten. Silakan coba muat
            ulang halaman ini atau kembali ke beranda.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-[2px] bg-ink-primary px-6 type-micro uppercase text-ink-on-dark transition-colors duration-[180ms] ease-out hover:bg-accent-rose active:bg-accent-rose-hover sm:w-auto"
            >
              Coba Lagi
            </button>

            <Link
              href="/"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-[2px] border border-border-strong bg-transparent px-6 type-micro uppercase text-ink-primary transition-colors duration-[180ms] ease-out hover:bg-bg-canvas hover:text-accent-rose active:bg-bg-surface-strong sm:w-auto"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
