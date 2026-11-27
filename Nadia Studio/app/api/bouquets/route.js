import { NextResponse } from 'next/server';
import { getCachedBouquets, createBouquetSupabase } from '@/lib/supabase-service';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const bouquets = await getCachedBouquets(category);

  return NextResponse.json(
    { success: true, data: bouquets },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}

export async function POST(request) {
  // Verifikasi Hak Akses Admin
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Akses ditolak. Silakan login sebagai admin.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Judul buket wajib diisi' }, { status: 400 });
    }
    const created = await createBouquetSupabase(body);
    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
