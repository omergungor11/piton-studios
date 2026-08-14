import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SITE, SITE_URL, OG_LOCALE, locales, defaultLocale, type Locale } from '@/lib/site';

type Pathnames = typeof routing.pathnames;
type PathnameKey = keyof Pathnames;

/** getPathname'in kabul ettigi href sekli — parametreli rotalar icin obje formu. */
export type Href =
  | PathnameKey
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { pathname: PathnameKey; params?: Record<string, any> };

export function absoluteUrl(locale: Locale, href: Href): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const path = getPathname({ href: href as any, locale });
  return `${SITE_URL}${path}`;
}

/**
 * hreflang + canonical uretir. Her sayfanin generateMetadata'sinda kullanilmali —
 * cok dilli SEO'nun en kritik ve su ana kadar eksik olan parcasi.
 */
export function buildAlternates(locale: Locale, href: Href): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = absoluteUrl(l, href);
  }
  languages['x-default'] = absoluteUrl(defaultLocale, href);

  return {
    canonical: absoluteUrl(locale, href),
    languages,
  };
}

type PageMetaInput = {
  locale: Locale;
  href: Href;
  title: string;
  description: string;
  /** Sayfaya ozel OG gorseli; verilmezse route'un opengraph-image.tsx'i devreye girer. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
};

/** Tum sayfalarda ortak metadata iskeleti — baslik, aciklama, hreflang, OG, Twitter. */
export function buildPageMetadata({
  locale,
  href,
  title,
  description,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  noIndex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(locale, href);
  const fullTitle = title.includes(SITE.name) ? title : `${title} — ${SITE.name}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: buildAlternates(locale, href),
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE.name,
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
      ...(type === 'article'
        ? { publishedTime, modifiedTime, tags, authors: [SITE.name] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

// ============================================================
// JSON-LD yapilandirilmis veri
// ============================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLdObject = Record<string, any>;

export function organizationJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE.name,
    url: SITE_URL,
    logo: SITE.logo,
    email: SITE.email,
    sameAs: [...SITE.social],
  };
}

export function websiteJsonLd(locale: Locale): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    inLanguage: locale,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function creativeWorkJsonLd(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  year?: string;
  keywords?: string[];
  client?: string;
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.name,
    description: input.description,
    url: input.url,
    ...(input.image ? { image: input.image } : {}),
    ...(input.year ? { dateCreated: input.year } : {}),
    ...(input.keywords?.length ? { keywords: input.keywords.join(', ') } : {}),
    ...(input.client ? { sourceOrganization: { '@type': 'Organization', name: input.client } } : {}),
    creator: { '@id': `${SITE_URL}/#organization` },
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  category?: string;
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: input.url,
    ...(input.category ? { serviceType: input.category } : {}),
    provider: { '@id': `${SITE_URL}/#organization` },
  };
}

/**
 * Sayfanin kendisini tanimlayan WebPage dugumu.
 *
 * `@id` sayesinde ayni sayfadaki diger dugumler (FAQPage, BreadcrumbList)
 * bu dugume baglanabilir; `speakable` sesli asistanlara hangi bolumun
 * okunabilecegini soyler — GEO gorunurlugu icin isaret degeri var.
 */
export function webPageJsonLd(input: {
  url: string;
  name: string;
  description: string;
  locale: Locale;
  dateModified?: string;
  breadcrumbUrl?: string;
  speakableSelectors?: string[];
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${input.url}#webpage`,
    url: input.url,
    name: input.name,
    description: input.description,
    inLanguage: input.locale,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(input.breadcrumbUrl ? { breadcrumb: { '@id': input.breadcrumbUrl } } : {}),
    ...(input.speakableSelectors?.length
      ? {
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: input.speakableSelectors,
          },
        }
      : {}),
  };
}

/**
 * FAQPage dugumu. `opts` opsiyoneldir — mevcut hizmet sayfasi cagrilari
 * tek parametreyle calismaya devam eder.
 */
export function faqJsonLd(
  faq: { q: string; a: string }[],
  opts: { id?: string; inLanguage?: Locale } = {}
): JsonLdObject | null {
  if (!faq.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(opts.id ? { '@id': opts.id } : {}),
    ...(opts.inLanguage ? { inLanguage: opts.inLanguage } : {}),
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function blogPostingJsonLd(input: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author: string;
  tags?: string[];
  locale: Locale;
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    url: input.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: input.locale,
    ...(input.image ? { image: input.image } : {}),
    ...(input.tags?.length ? { keywords: input.tags.join(', ') } : {}),
    author: { '@type': 'Person', name: input.author },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}
