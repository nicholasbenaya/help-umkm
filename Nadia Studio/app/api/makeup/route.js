import { NextResponse } from 'next/server';
import { getMakeupLooks, createMakeupLook, getMakeupPackages } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const looks = getMakeupLooks(category);
  const packages = getMakeupPackages();
  return NextResponse.json({ success: true, data: { looks, packages } });
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Judul riasan wajib diisi' }, { status: 400 });
    }
    const created = createMakeupLook(body);
    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
