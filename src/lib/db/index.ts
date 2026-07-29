import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/**
 * Neon HTTP driver — istek basina tek round-trip, connection pooling gerektirmez.
 * Vercel serverless/edge icin dogru secim; uzun omurlu baglanti tutulmaz.
 *
 * MIMARI KURAL: veritabani bir BUILD-TIME kaynagidir, request-time bagimliligi degil.
 * Public sayfalar statik uretilir ve DB'ye yalnizca build sirasinda veya admin bir
 * icerigi kaydettiginde (on-demand revalidate) dokunulur. Ziyaretci trafigi DB'yi
 * uyandirmaz — Neon'un ucretsiz katmanindaki 100 CU-saat boylece tukenmez.
 */

function getConnectionString(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL tanimli degil. Neon baglanti dizesini .env.local dosyasina ekleyin.\n' +
        'Ornek: DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/piton?sslmode=require'
    );
  }
  return url;
}

let cached: ReturnType<typeof createDb> | undefined;

function createDb() {
  const sql = neon(getConnectionString());
  return drizzle(sql, { schema });
}

/**
 * Tembel baglanti — modul import edildiginde degil, ilk sorguda kurulur.
 * Boylece DATABASE_URL olmayan ortamlarda (statik build, CONTENT_SOURCE=static)
 * yalnizca import etmek hata firlatmaz.
 */
export function getDb() {
  if (!cached) cached = createDb();
  return cached;
}

export function hasDatabaseUrl(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export { schema };
export * from './schema';
