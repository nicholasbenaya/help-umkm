import { NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/lib/db';

export async function GET() {
  try {
    const summary = getAnalyticsSummary();
    return NextResponse.json({ success: true, data: summary });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
