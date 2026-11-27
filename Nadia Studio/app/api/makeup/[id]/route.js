import { NextResponse } from 'next/server';
import { updateMakeupLookSupabase, deleteMakeupLookSupabase } from '@/lib/supabase-service';
import { verifyAdminAuth } from '@/lib/auth';

export async function PUT(request, { params }) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Akses ditolak.' }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const updated = await updateMakeupLookSupabase(id, body);
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
    const deleted = await deleteMakeupLookSupabase(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
