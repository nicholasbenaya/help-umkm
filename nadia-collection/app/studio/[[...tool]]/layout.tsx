import type { Metadata, Viewport } from "next";
import {
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Nadia Collection Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  ...studioViewport,
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen">{children}</div>;
}
