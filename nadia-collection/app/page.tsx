import { FounderSection } from "@/components/FounderSection";
import { HeroSection } from "@/components/HeroSection";
import {
  CuratedHighlightsStrip,
  VenturesShowcase,
} from "@/components/VenturesShowcase";
import { getSiteData } from "@/lib/sanity/queries";

export default async function HomePage() {
  const { settings, ventures } = await getSiteData();

  return (
    <main>
      <HeroSection settings={settings} />
      <VenturesShowcase settings={settings} ventures={ventures} />
      <FounderSection settings={settings} />
      <CuratedHighlightsStrip ventures={ventures} />
    </main>
  );
}
