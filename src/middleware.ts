import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    /*
     * Su yollar HARIC her sey:
     * - /api, /_next, /_vercel   (framework ve API rotalari)
     * - nokta iceren yollar      (favicon.ico, logo.webp, sitemap.xml, rss.xml ...)
     *
     * Not: eski matcher `['/', '/(tr|en|ru)/:path*']` idi. Genis matcher, locale
     * onekli olmayan yeni bir rota eklendiginde sessizce kapsam disinda kalmasini
     * engelliyor.
     */
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
