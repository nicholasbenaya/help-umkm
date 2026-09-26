import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/db';

export async function POST(request) {
  try {
    const { pin } = await request.json();
    const settings = getSettings();
    const validPin = settings.adminPin || '123456';

    if (pin === validPin) {
      return NextResponse.json({ success: true, token: 'authenticated-admin-session' });
    } else {
      return NextResponse.json({ success: false, error: 'PIN tidak sesuai. Silakan coba lagi.' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
