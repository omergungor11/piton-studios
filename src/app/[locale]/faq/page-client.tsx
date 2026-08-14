'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import PageShell from '@/components/page-shell';
import { SERVICES } from '@/lib/data';
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  FAQ_COUNT,
  FAQ_UPDATED,
  type FaqItem,
} from '@/lib/faq';

export interface FaqPostLink {
  slug: string;
  title: string;
}

interface Props {
  /** translationKey -> blog yazisi; sunucuda cozulur, burada yalnizca okunur. */
  postLinks: Record<string, FaqPostLink | null>;
}

interface FaqView {
  item: FaqItem;
  q: string;
  a: string;
  detail: string[];
  list: string[];
  /** Arama icin kucuk harfe indirgenmis soru + cevap metni. */
  haystack: string;
}

const SERVICE_SLUGS = new Set(SERVICES.map((service) => service.slug));

export default function FaqPageClient({ postLinks }: Props) {
  const t = useTranslations('faqPage');
  const ti = useTranslations('faqItems');
  const ts = useTranslations('servicesList');
  const locale = useLocale();
  const [query, setQuery] = useState('');

  // Cevirisi tamamlanmamis sorular hic render edilmez — icerik uretimi
  // asamali ilerliyor, yarim bir soru gostermek yerine atlaniyor.
  const views = useMemo<FaqView[]>(() => {
    const rows: FaqView[] = [];
    for (const item of FAQ_ITEMS) {
      if (!ti.has(`${item.id}.q`) || !ti.has(`${item.id}.a`)) continue;
      const q = ti(`${item.id}.q`);
      const a = ti(`${item.id}.a`);
      const detail = ti.has(`${item.id}.detail`)
        ? (ti.raw(`${item.id}.detail`) as string[])
        : [];
      const list = ti.has(`${item.id}.list`) ? (ti.raw(`${item.id}.list`) as string[]) : [];
      rows.push({
        item,
        q,
        a,
        detail,
        list,
        haystack: [q, a, ...detail, ...list].join(' ').toLocaleLowerCase(locale),
      });
    }
    return rows;
  }, [ti, locale]);

  const needle = query.trim().toLocaleLowerCase(locale);
  const searching = needle.length > 0;
  const matches = (view: FaqView) => !searching || view.haystack.includes(needle);
  const matchCount = views.filter(matches).length;

  const featured = views.filter((view) => view.item.featured);

  const renderItem = (view: FaqView) => {
    const { item } = view;
    const services = (item.services ?? []).filter((slug) => SERVICE_SLUGS.has(slug));
    const posts = (item.posts ?? [])
      .map((key) => postLinks[key])
      .filter((post): post is FaqPostLink => Boolean(post));

    return (
      <details
        key={item.id}
        id={`faq-${item.id}`}
        className="faq-item glass"
        hidden={!matches(view)}
        open={searching ? true : undefined}
      >
        <summary className="faq-summary" data-cursor="hover">
          <h3 className="faq-q">
            <span className="faq-q-text">{view.q}</span>
            <a
              href={`#faq-${item.id}`}
              className="faq-anchor"
              aria-label={t('copyLink')}
              /* summary icindeki link akordeonu acip kapatmasin */
              onClick={(event) => event.stopPropagation()}
            >
              #
            </a>
          </h3>
          <span className="faq-toggle" aria-hidden="true" />
        </summary>

        <div className="faq-answer">
          <p className="faq-lead">{view.a}</p>
          {view.detail.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          {view.list.length > 0 && (
            <ul className="faq-ul">
              {view.list.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}

          {(services.length > 0 || posts.length > 0) && (
            <div className="faq-related">
              {services.length > 0 && (
                <div className="faq-related-group">
                  <span className="faq-related-label">{t('relatedServices')}</span>
                  <div className="faq-related-links">
                    {services.map((slug) => (
                      <Link
                        key={slug}
                        href={{ pathname: '/services/[slug]', params: { slug } }}
                        className="faq-related-link"
                        data-cursor="hover"
                      >
                        {ts(`${slug}.title`)} <span aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {posts.length > 0 && (
                <div className="faq-related-group">
                  <span className="faq-related-label">{t('relatedPosts')}</span>
                  <div className="faq-related-links">
                    {posts.map((post) => (
                      <Link
                        key={post.slug}
                        href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                        className="faq-related-link"
                        data-cursor="hover"
                      >
                        {post.title} <span aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </details>
    );
  };

  return (
    <PageShell>
      <section className="sp-hero faq-hero">
        <div className="sp-hero-eyebrow">{t('title')}</div>
        <h1 className="sp-hero-title">{t('subtitle')}</h1>
        <p className="sp-hero-sub">{t('lead')}</p>

        <div className="faq-meta">
          <span className="faq-meta-item">
            {t('updatedLabel')}: <time dateTime={FAQ_UPDATED}>{FAQ_UPDATED}</time>
          </span>
          <span className="faq-meta-dot" aria-hidden="true">
            •
          </span>
          <span className="faq-meta-item">{t('countLabel', { count: FAQ_COUNT })}</span>
        </div>

        {featured.length > 0 && (
          <div className="faq-featured">
            {featured.map((view) => (
              <a
                key={view.item.id}
                href={`#faq-${view.item.id}`}
                className="faq-chip"
                data-cursor="hover"
              >
                {view.q}
              </a>
            ))}
          </div>
        )}
      </section>

      <div className="faq-searchbar">
        <input
          type="search"
          className="faq-search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchPlaceholder')}
        />
        {searching && (
          <span className="faq-search-count" aria-live="polite">
            {t('resultCount', { count: matchCount })}
          </span>
        )}
      </div>

      <nav className="faq-jump" aria-label={t('title')}>
        {FAQ_CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={`#faq-cat-${cat.id}`}
            className="faq-jump-link"
            data-cursor="hover"
          >
            <span className="faq-jump-n">{cat.n}</span>
            {t(`categories.${cat.id}.title`)}
          </a>
        ))}
      </nav>

      <div className="faq-body">
        {FAQ_CATEGORIES.map((cat) => {
          const catViews = views.filter((view) => view.item.cat === cat.id);
          const visible = catViews.some(matches);

          return (
            <section
              key={cat.id}
              id={`faq-cat-${cat.id}`}
              className="faq-cat"
              hidden={!visible}
            >
              <div className="faq-cat-head">
                <span className="faq-cat-n">{cat.n}</span>
                <h2 className="faq-cat-title">{t(`categories.${cat.id}.title`)}</h2>
              </div>
              <p className="faq-cat-desc">{t(`categories.${cat.id}.desc`)}</p>
              <div className="faq-list">{catViews.map(renderItem)}</div>
            </section>
          );
        })}

        {searching && matchCount === 0 && <p className="faq-empty">{t('searchEmpty')}</p>}
      </div>

      <section className="sd-cta glass strong faq-cta">
        <span className="sd-cta-bg-accent" aria-hidden="true" />
        <div className="sd-cta-inner">
          <p className="sd-cta-eyebrow">{t('ctaEyebrow')}</p>
          <h2 className="sd-cta-title">{t('ctaTitle')}</h2>
          <p className="sd-cta-sub">{t('ctaDesc')}</p>
          <div className="sd-cta-btns">
            <Link href="/contact" className="sd-cta-btn" data-cursor="hover">
              <span>{t('ctaButton')}</span>
              <span className="sd-cta-arrow">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
