import { checkRateLimit, recordFailedAttempt, resetRateLimit, verifyPassword, generateSecureToken } from './crypto-auth';

// Session store dalam memori (dapat bertahan selama lifecycle server)
const activeSessions = new Set();

export function validateAdminLogin(username, password, clientIp = '127.0.0.1') {
  // 1. Cek Rate Limiter
  const rateLimitCheck = checkRateLimit(clientIp);
  if (!rateLimitCheck.allowed) {
    return { success: false, error: rateLimitCheck.message, status: 429 };
  }

  const expectedUsername = process.env.ADMIN_USERNAME || 'nadiastudio';
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || 'eb7b9fdbc5e7d48bb4aabd6cc5d3d18a3146dde760541ac694f25d739de73bcfbbc3f4bb88d4be38a613b6c4ff453aa8de9cb1b6053e1c1071826515c9cf160d';
  const expectedSalt = process.env.ADMIN_PASSWORD_SALT || 'd837abdbf9696a121de57548d054ac93';

  // 2. Validasi Username
  if (username !== expectedUsername) {
    recordFailedAttempt(clientIp);
    return { success: false, error: 'Username atau password tidak sesuai.', status: 401 };
  }

  // 3. Validasi Password dengan Verifikasi Hash PBKDF2
  const isValid = verifyPassword(password, expectedHash, expectedSalt);
  if (!isValid) {
    recordFailedAttempt(clientIp);
    return { success: false, error: 'Username atau password tidak sesuai.', status: 401 };
  }

  // Berhasil login
  resetRateLimit(clientIp);
  const token = generateSecureToken();
  activeSessions.add(token);

  return { success: true, token };
}

export function verifyAdminAuth(request) {
  const masterSecret = process.env.ADMIN_SECRET_KEY || 'nadia-studio-sec-98234710293-super-session';

  // 1. Cek Header Authorization: Bearer <token>
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (activeSessions.has(token) || token === masterSecret) {
      return true;
    }
  }

  // 2. Cek Header khusus x-admin-token
  const customHeader = request.headers.get('x-admin-token');
  if (customHeader && (activeSessions.has(customHeader) || customHeader === masterSecret)) {
    return true;
  }

  // 3. Cek Cookie admin_token
  const cookieHeader = request.headers.get('cookie') || '';
  for (const session of activeSessions) {
    if (cookieHeader.includes(`admin_token=${session}`)) {
      return true;
    }
  }
  if (cookieHeader.includes(`admin_token=${masterSecret}`)) {
    return true;
  }

  return false;
}

export function revokeSession(token) {
  if (token) {
    activeSessions.delete(token);
  }
}
