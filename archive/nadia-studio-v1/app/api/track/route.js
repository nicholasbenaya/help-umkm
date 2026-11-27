import { NextResponse } from 'next/server';
import { trackEvent } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const event = trackEvent(body);
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
