import { NextResponse } from 'next/server';
import { updateMakeupLook, deleteMakeupLook, updateMakeupPackage } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    if (id.startsWith('pkg-')) {
      const updated = updateMakeupPackage(id, body);
      return NextResponse.json({ success: true, data: updated });
    } else {
      const updated = updateMakeupLook(id, body);
      return NextResponse.json({ success: true, data: updated });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = deleteMakeupLook(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
