'use client';

import { Fragment, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import PageShell from '@/components/page-shell';
import ImpactPanel from '@/components/impact-panel';
import SnakeBorder from '@/components/snake-border';

export type ServiceListingCard = {
  id: string;
  category: string;
  content: ReactNode;
};

type ServicesPageClientProps = {
  hero: ReactNode;
  cta: ReactNode;
  filterAll: string;
  categories: { id: string; label: string; count: number }[];
  cards: ServiceListingCard[];
};

/** Katalog metni sunucuda kalir; istemci yalnizca filtre ve etkilesimleri yonetir. */
export default function ServicesPageClient({
  hero,
  cta,
  filterAll,
  categories,
  cards,
}: ServicesPageClientProps): ReactElement {
  const [activeCat, setActiveCat] = useState('All');
  const filtered = activeCat === 'All' ? cards : cards.filter((card) => card.category === activeCat);

  return (
    <PageShell>
      {hero}

      {/* Etki paneli ilk ekrana yakin: gorunumunu kopyalamadan mevcut bilesen korunur. */}
      <ImpactPanel />

      <section className="sp-filter">
        <button
          type="button"
          className={`sp-filter-btn ${activeCat === 'All' ? 'active' : ''}`}
          onClick={() => setActiveCat('All')}
          aria-pressed={activeCat === 'All'}
          data-cursor="hover"
        >
          {filterAll}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`sp-filter-btn ${activeCat === category.id ? 'active' : ''}`}
            onClick={() => setActiveCat(category.id)}
            aria-pressed={activeCat === category.id}
            data-cursor="hover"
          >
            {category.label}
            <span className="sp-filter-count">{category.count}</span>
          </button>
        ))}
      </section>

      <SnakeBorder radius={28}>
        <section className="svc-glass" style={{ padding: 0 }}>
          <div className="svc-grid">
            {filtered.map((card) => <Fragment key={card.id}>{card.content}</Fragment>)}
          </div>
        </section>
      </SnakeBorder>

      <div className="subpage-spark">{cta}</div>
    </PageShell>
  );
}
