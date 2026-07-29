import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { authConfig } from './config';
import { getDb } from '@/lib/db';
import { adminUsers } from '@/lib/db/schema';
import { checkLoginRate, resetLoginRate } from './rate-limit';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'E-posta', type: 'email' },
        password: { label: 'Sifre', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const key = email.toLowerCase();

        // Kaba kuvvet korumasi — basarisiz denemeler sayilir.
        if (!checkLoginRate(key)) return null;

        const db = getDb();
        const [user] = await db
          .select()
          .from(adminUsers)
          .where(eq(adminUsers.email, key))
          .limit(1);

        // Kullanici yoksa da hash karsilastirmasi yapilir: cevap suresinden
        // e-postanin kayitli olup olmadigi anlasilmasin (timing sizintisi).
        const hash = user?.passwordHash ?? '$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidiu';
        const valid = await bcrypt.compare(password, hash);

        if (!user || !valid) return null;

        resetLoginRate(key);

        await db
          .update(adminUsers)
          .set({ lastLoginAt: new Date() })
          .where(eq(adminUsers.id, user.id));

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? user.email,
          role: user.role,
        };
      },
    }),
  ],
});

/**
 * Server Component / Server Action icinde oturum zorunlulugu.
 * Middleware zaten /admin'i koruyor; bu ikinci savunma hatti (defense in depth)
 * ve Server Action'lar middleware'den gecmedigi icin ZORUNLU.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Yetkisiz erisim: oturum bulunamadi.');
  }
  return session.user as { id: string; email: string; name: string; role: string };
}

export async function requireOwner() {
  const user = await requireAdmin();
  if (user.role !== 'owner') {
    throw new Error('Yetkisiz erisim: bu islem icin owner rolu gerekli.');
  }
  return user;
}
