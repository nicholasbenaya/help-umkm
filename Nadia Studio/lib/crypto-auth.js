import crypto from 'crypto';

// Rate Limiter Sederhana dalam memori (Mencegah Brute Force Attack)
const loginAttempts = new Map(); // key: ip, value: { count, lockUntil }

export function checkRateLimit(clientIp) {
  const now = Date.now();
  const attempt = loginAttempts.get(clientIp);

  if (attempt && attempt.lockUntil && now < attempt.lockUntil) {
    const remainingSeconds = Math.ceil((attempt.lockUntil - now) / 1000);
    return { 
      allowed: false, 
      message: `Terlalu banyak percobaan gagal. Silakan tunggu ${remainingSeconds} detik lagi.` 
    };
  }

  return { allowed: true };
}

export function recordFailedAttempt(clientIp) {
  const now = Date.now();
  const attempt = loginAttempts.get(clientIp) || { count: 0 };
  attempt.count += 1;

  if (attempt.count >= 5) {
    // Kunci selama 15 menit jika gagal 5 kali berturut-turut
    attempt.lockUntil = now + (15 * 60 * 1000);
  }

  loginAttempts.set(clientIp, attempt);
}

export function resetRateLimit(clientIp) {
  loginAttempts.delete(clientIp);
}

// ==============================================================================
// PASSWORD HASHING DENGAN NODE CRYPTO (PBKDF2 / Salted SHA-512)
// Standar industri enkripsi satu arah yang tahan terhadap rainbow table attack
// ==============================================================================

export function hashPassword(password, salt) {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, actualSalt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt: actualSalt };
}

export function verifyPassword(password, storedHash, salt) {
  if (!password || !storedHash || !salt) return false;
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
}

// Generate session token acak yang aman secara kriptografi
export function generateSecureToken() {
  return crypto.randomBytes(32).toString('hex');
}
