import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';
import { localizeHref } from '@/lib/slugs';

/**
 * next-intl navigasyonu + yerel slug donusumu.
 *
 * Kodda linkler hep KANONIK KIMLIKLE kurulur (`params: { slug: 'custom-software' }`); hedef dilin
 * slug'ina donusum burada yapilir (bkz. src/lib/slugs.ts). Boylece Link, sitemap, canonical, hreflang
 * ve JSON-LD tek noktadan dogru adresi uretir.
 */
const nav = createNavigation(routing);

export const { redirect, usePathname } = nav;
export { default as Link } from './localized-link';

export const getPathname: typeof nav.getPathname = (args) =>
  nav.getPathname({ ...args, href: localizeHref(args.href, args.locale) });

export function useRouter(): ReturnType<typeof nav.useRouter> {
  const router = nav.useRouter();
  const locale = useLocale();
  return useMemo(
    () => ({
      ...router,
      push: ((href, options) =>
        router.push(localizeHref(href, options?.locale ?? locale), options)) as typeof router.push,
      replace: ((href, options) =>
        router.replace(localizeHref(href, options?.locale ?? locale), options)) as typeof router.replace,
      prefetch: ((href, options) =>
        router.prefetch(localizeHref(href, options?.locale ?? locale), options)) as typeof router.prefetch,
    }),
    [router, locale]
  );
}
