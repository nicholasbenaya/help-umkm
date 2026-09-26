import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloating from '@/components/WhatsAppFloating';
import Tracker from '@/components/Tracker';
import { getSettings } from '@/lib/db';

export const metadata = {
  title: 'Nadia Studio | Afisa Bouquet & Nadia Artistry MUA Samarinda',
  description: 'Studio kurasi buket handmade eksklusif Afisa Bouquet (by Nadia & Afisa) dan jasa makeup profesional Nadia Artistry di Samarinda.',
  icons: {
    icon: '/images/logos/nadia-collective-logo.svg',
  }
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  const settings = getSettings();

  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col font-sans bg-[#FFFFFF] text-[#1D1D1F]">
        <Tracker />
        <Navbar settings={settings} />
        <div className="flex-1">
          {children}
        </div>
        <Footer settings={settings} />
        <WhatsAppFloating settings={settings} />
      </body>
    </html>
  );
}
