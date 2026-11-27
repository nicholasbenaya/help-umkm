import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getSanityImageUrl } from "@/lib/sanity/image";
import { getSiteData, getSiteSettings } from "@/lib/sanity/queries";
import { getMetadataBase } from "@/lib/site-url";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title =
    settings.seoTitle ||
    `${settings.brandName} | Personal Brand & Multi-Venture Showcase`;
  const description = settings.seoDescription || settings.tagline;
  const ogImageUrl = getSanityImageUrl(settings.ogImage, {
    width: 1200,
    height: 630,
    quality: 85,
  });

  return {
    metadataBase: getMetadataBase(),
    title: {
      default: title,
      template: `%s | ${settings.brandName}`,
    },
    description,
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: settings.brandName,
      title,
      description,
      ...(ogImageUrl
        ? {
            images: [
              {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: settings.ogImage?.alt || settings.brandName,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { settings, ventures } = await getSiteData();
  const currentYear = new Date().getFullYear();

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar settings={settings} ventures={ventures} />
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <Footer
          settings={settings}
          ventures={ventures}
          currentYear={currentYear}
        />
      </body>
    </html>
  );
}
