import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-guvenli auth yapilandirmasi.
 *
 * Middleware edge runtime'da calisir; burada veritabani veya bcrypt cagrilmaz.
 * Provider'lar ve DB dogrulamasi `src/lib/auth/index.ts` icinde (Node runtime).
 * Bu ayrim Auth.js v5'in Next.js middleware icin onerdigi desendir.
 */
export const authConfig = {
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8, // 8 saat — panel oturumu icin makul ust sinir
  },
  trustHost: true,
  callbacks: {
    /** JWT'ye rol ve kullanici id'si tasinir; her istekte DB'ye gidilmez. */
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? 'editor';
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
