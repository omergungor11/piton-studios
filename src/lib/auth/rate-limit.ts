/**
 * Giris denemeleri icin basit kaba kuvvet korumasi.
 *
 * Bellek ici — serverless'ta her instance kendi sayacini tutar, yani mutlak
 * bir garanti degil. Tek admin kullanicisi olan bir panel icin yeterli ve
 * sifir altyapi maliyeti var (Redis/Upstash gerektirmez).
 *
 * Yetersiz kalirsa: admin_users yanina login_attempts tablosu eklenir veya
 * Vercel WAF rate limiting devreye alinir.
 */

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 dakika

type Entry = { count: number; firstAttemptAt: number };

const attempts = new Map<string, Entry>();

/** Deneme hakki var mi? Sayaci artirir. */
export function checkLoginRate(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now - entry.firstAttemptAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttemptAt: now });
    return true;
  }

  entry.count++;
  return entry.count <= MAX_ATTEMPTS;
}

/** Basarili girişten sonra sayaci sifirla. */
export function resetLoginRate(key: string): void {
  attempts.delete(key);
}

export function remainingAttempts(key: string): number {
  const entry = attempts.get(key);
  if (!entry || Date.now() - entry.firstAttemptAt > WINDOW_MS) return MAX_ATTEMPTS;
  return Math.max(0, MAX_ATTEMPTS - entry.count);
}
