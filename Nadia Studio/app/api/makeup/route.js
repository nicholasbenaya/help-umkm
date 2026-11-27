import { NextResponse } from 'next/server';
import { getCachedMakeupLooks, getCachedMakeupPackages, createMakeupLookSupabase } from '@/lib/supabase-service';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const looks = await getCachedMakeupLooks(category);
  const packages = await getCachedMakeupPackages();

  return NextResponse.json(
    { success: true, data: { looks, packages } },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}

export async function POST(request) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Akses ditolak.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Judul riasan wajib diisi' }, { status: 400 });
    }
    const created = await createMakeupLookSupabase(body);
    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
