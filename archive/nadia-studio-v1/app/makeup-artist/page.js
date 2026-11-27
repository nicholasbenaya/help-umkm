import { getCachedMakeupLooks, getCachedMakeupPackages, getCachedSettings } from '@/lib/supabase-service';
import MakeupCatalog from '@/components/MakeupCatalog';

export const revalidate = 3600; // Cache 1 jam di server, instan di browser

export default async function MakeupArtistPage() {
  const looks = await getCachedMakeupLooks('all');
  const packages = await getCachedMakeupPackages();
  const settings = await getCachedSettings();

  return (
    <MakeupCatalog 
      initialLooks={looks} 
      initialPackages={packages} 
      initialSettings={settings} 
    />
  );
}
