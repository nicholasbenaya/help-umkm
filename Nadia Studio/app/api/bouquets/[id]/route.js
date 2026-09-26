import { NextResponse } from 'next/server';
import { updateBouquet, deleteBouquet, getBouquetById } from '@/lib/db';

export async function GET(request, { params }) {
  const { id } = params;
  const item = getBouquetById(id);
  if (!item) {
    return NextResponse.json({ success: false, error: 'Buket tidak ditemukan' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: item });
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const updated = updateBouquet(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Buket tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = deleteBouquet(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
