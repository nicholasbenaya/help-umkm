import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getSiteData } from "@/lib/sanity/queries";
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

export const metadata: Metadata = {
  title: "Nadia Collection | Personal Brand & Multi-Venture Showcase",
  description:
    "Personal brand dan showcase lini usaha Nadia: Afisa Bouquet dan Nadia Artistry.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { settings, ventures } = await getSiteData();

  return (
    <html
      lang="id"
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar settings={settings} ventures={ventures} />
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <Footer settings={settings} ventures={ventures} />
      </body>
    </html>
  );
}
