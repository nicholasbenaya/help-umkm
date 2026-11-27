"use client";

import Link from "next/link";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { dataset, isSanityConfigured } from "@/sanity/env";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
        <div className="border border-[#e5d2d8] bg-[#f7eef0] p-8">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#9e3b5a]">
            Sanity Studio Setup
          </p>
          <h1 className="mt-3 text-2xl font-medium text-[#1f171a] sm:text-3xl">
            Konfigurasi Sanity CMS Belum Diisi
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#5c4950]">
            Embedded Sanity Studio siap digunakan, tetapi variabel lingkungan{" "}
            <code className="bg-[#fdfbfa] px-1.5 py-0.5 text-[#1f171a]">
              NEXT_PUBLIC_SANITY_PROJECT_ID
            </code>{" "}
            belum diatur. Website utama tetap berjalan normal menggunakan data
            fallback.
          </p>
          <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[#1f171a]">
            <li>
              Buat proyek gratis di{" "}
              <a
                href="https://www.sanity.io/manage"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[#9e3b5a] underline-offset-4 hover:text-[#9e3b5a]"
              >
                sanity.io/manage
              </a>{" "}
              lalu salin Project ID Anda.
            </li>
            <li>
              Salin{" "}
              <code className="bg-[#fdfbfa] px-1.5 py-0.5">.env.example</code>{" "}
              menjadi{" "}
              <code className="bg-[#fdfbfa] px-1.5 py-0.5">.env.local</code>{" "}
              (atau isi di Environment Variables Vercel) dengan{" "}
              <code className="bg-[#fdfbfa] px-1.5 py-0.5">
                NEXT_PUBLIC_SANITY_PROJECT_ID
              </code>{" "}
              dan{" "}
              <code className="bg-[#fdfbfa] px-1.5 py-0.5">
                NEXT_PUBLIC_SANITY_DATASET={dataset}
              </code>
              .
            </li>
            <li>
              Tambahkan domain aplikasi Anda ke CORS Origins pada pengaturan API
              Sanity, lalu restart server dev.
            </li>
          </ol>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[2px] bg-[#1f171a] px-6 text-xs font-semibold tracking-wider uppercase text-[#fdfbfa] transition-colors hover:bg-[#9e3b5a]"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
