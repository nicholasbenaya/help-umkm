import { NextResponse } from 'next/server';
import { getCachedSettings, updateSettingsSupabase } from '@/lib/supabase-service';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET() {
  const settings = await getCachedSettings();
  return NextResponse.json(
    { success: true, data: settings },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}

export async function PUT(request) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Akses ditolak.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = await updateSettingsSupabase(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
