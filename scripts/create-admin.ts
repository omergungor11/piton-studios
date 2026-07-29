/**
 * Admin kullanicisi olusturur veya sifresini gunceller.
 *
 * Calistirma:
 *   pnpm admin:create -- --email=ben@pitonstudios.com --role=owner
 *   (sifre sorulur; terminalde gorunmez)
 *
 * Veya tek satirda (dikkat: shell gecmisine yazilir):
 *   pnpm admin:create -- --email=... --password=... --role=owner
 */
import 'dotenv/config';
import { config } from 'dotenv';
import readline from 'node:readline';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

import * as schema from '../src/lib/db/schema';

config({ path: '.env.local' });

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit?.slice(name.length + 3);
}

/** Sifreyi ekrana yazmadan okur. */
function askHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const stdout = process.stdout as NodeJS.WriteStream & { _writeToOutput?: (s: string) => void };

    process.stdout.write(question);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rl as any)._writeToOutput = () => {};
    void stdout;

    rl.question('', (answer) => {
      rl.close();
      process.stdout.write('\n');
      resolve(answer);
    });
  });
}

function validatePassword(password: string): string | null {
  if (password.length < 12) return 'Sifre en az 12 karakter olmali.';
  if (!/[a-z]/.test(password)) return 'Sifre en az bir kucuk harf icermeli.';
  if (!/[A-Z]/.test(password)) return 'Sifre en az bir buyuk harf icermeli.';
  if (!/[0-9]/.test(password)) return 'Sifre en az bir rakam icermeli.';
  return null;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL tanimli degil. Once Neon kurulumunu tamamlayin: piton-docs/neon-setup.md'
    );
  }

  const email = arg('email')?.toLowerCase().trim();
  const role = (arg('role') ?? 'owner') as 'owner' | 'editor';
  const name = arg('name');

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new Error('Gecerli bir --email=... degeri gerekli.');
  }
  if (role !== 'owner' && role !== 'editor') {
    throw new Error('--role sadece owner veya editor olabilir.');
  }

  const password = arg('password') ?? (await askHidden('Sifre (gorunmez): '));
  const problem = validatePassword(password);
  if (problem) throw new Error(problem);

  const db = drizzle(neon(process.env.DATABASE_URL), { schema });
  const passwordHash = await bcrypt.hash(password, 12);

  const [existing] = await db
    .select({ id: schema.adminUsers.id })
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.email, email))
    .limit(1);

  if (existing) {
    await db
      .update(schema.adminUsers)
      .set({ passwordHash, role, ...(name ? { name } : {}) })
      .where(eq(schema.adminUsers.id, existing.id));
    console.log(`\n✓ Mevcut kullanicinin sifresi guncellendi: ${email} (${role})`);
  } else {
    await db.insert(schema.adminUsers).values({
      email,
      passwordHash,
      role,
      name: name ?? email.split('@')[0],
    });
    console.log(`\n✓ Admin kullanicisi olusturuldu: ${email} (${role})`);
  }

  console.log('  Giris: /admin/login');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(`\nHATA: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  });
