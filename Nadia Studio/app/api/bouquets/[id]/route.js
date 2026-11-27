import { NextResponse } from 'next/server';
import { updateBouquetSupabase, deleteBouquetSupabase, getCachedBouquets } from '@/lib/supabase-service';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(request, { params }) {
  const { id } = params;
  const items = await getCachedBouquets('all');
  const item = items.find(b => b.id === id);
  if (!item) {
    return NextResponse.json({ success: false, error: 'Buket tidak ditemukan' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: item });
}

export async function PUT(request, { params }) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Akses ditolak.' }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const updated = await updateBouquetSupabase(id, body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Akses ditolak.' }, { status: 401 });
  }

  try {
    const { id } = params;
    const deleted = await deleteBouquetSupabase(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
