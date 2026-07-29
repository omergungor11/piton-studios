import createIntlMiddleware from 'next-intl/middleware';
import NextAuth from 'next-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { authConfig } from './lib/auth/config';

/**
 * Iki middleware'in kompozisyonu:
 *
 *   /admin/*  -> auth guard (next-intl'e hic ugramaz; panel tek dilli)
 *   digerleri -> next-intl (locale yonlendirme + lokalize yol cozumleme)
 *
 * ONEMLI: onceki matcher `['/', '/(tr|en|ru)/:path*']` idi ve /admin'i
 * KAPSAMIYORDU. Auth guard bu duzeltme olmadan eklenirse panel korumasiz kalirdi.
 */

const intlMiddleware = createIntlMiddleware(routing);
const { auth } = NextAuth(authConfig);

/**
 * Yonlendirme ACIKCA burada yapilir, Auth.js'in `authorized` callback'ine
 * birakilmaz. Sebep: callback'e guvenildiginde var olmayan /admin alt yollari
 * (henuz olusturulmamis sayfalar) redirect yerine prerender edilmis 404
 * donuyordu. Acik redirect, rotanin var olup olmamasindan bagimsiz calisir —
 * yani Sprint 4'te eklenecek sayfalar dogustan korunmus olur.
 */
const authMiddleware = auth((request) => {
  const { pathname } = request.nextUrl;
  const isLoggedIn = Boolean(request.auth?.user);

  if (pathname === '/admin/login') {
    return isLoggedIn
      ? NextResponse.redirect(new URL('/admin', request.nextUrl))
      : NextResponse.next();
  }

  if (!isLoggedIn) {
    const url = new URL('/admin/login', request.nextUrl);
    // Girisden sonra kullanici gitmek istedigi sayfaya doner.
    if (pathname !== '/admin') url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(request);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Su yollar HARIC her sey:
     * - /api, /_next, /_vercel   (framework ve API rotalari)
     * - nokta iceren yollar      (favicon.ico, logo.webp, sitemap.xml, rss.xml ...)
     */
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
