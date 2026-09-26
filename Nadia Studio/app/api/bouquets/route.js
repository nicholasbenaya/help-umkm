import { NextResponse } from 'next/server';
import { getBouquets, createBouquet } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const bouquets = getBouquets(category);
  return NextResponse.json({ success: true, data: bouquets });
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Judul buket wajib diisi' }, { status: 400 });
    }
    const created = createBouquet(body);
    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
