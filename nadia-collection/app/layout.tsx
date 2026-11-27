import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nadia Collection",
  description:
    "Personal brand dan showcase lini usaha Nadia: Afisa Bouquet dan Nadia Artistry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
