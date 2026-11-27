import { getCachedBouquets, getCachedSettings } from '@/lib/supabase-service';
import BouquetCatalog from '@/components/BouquetCatalog';

export const revalidate = 3600; // Cache 1 jam di server, instan di browser

export default async function AfisaBouquetPage() {
  const bouquets = await getCachedBouquets('all');
  const settings = await getCachedSettings();

  return <BouquetCatalog initialBouquets={bouquets} initialSettings={settings} />;
}
