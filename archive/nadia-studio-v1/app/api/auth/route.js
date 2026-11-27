import { NextResponse } from 'next/server';
import { validateAdminLogin, revokeSession } from '@/lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    // Ambil IP klien untuk rate limiter
    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    const result = validateAdminLogin(username, password, clientIp);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.status || 401 }
      );
    }

    const response = NextResponse.json({ 
      success: true, 
      token: result.token,
      message: 'Login berhasil.'
    });

    // Pasang cookie HTTP-only
    response.cookies.set('admin_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 hari
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
    if (token) {
      revokeSession(token);
    }
    const response = NextResponse.json({ success: true, message: 'Logout berhasil.' });
    response.cookies.delete('admin_token');
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
