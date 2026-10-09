'use client';

import Image from 'next/image';
import { useRef, useState, type CSSProperties } from 'react';
import HeroScene from '@/components/scenes/hero';
import { FONT_CATEGORIES, FONT_OPTIONS, type FontCategory, type FontId } from './fonts';
import styles from './font-lab.module.css';

export default function FontLab() {
  const [selectedId, setSelectedId] = useState<FontId>('gotico-antiqua');
  const [category, setCategory] = useState<FontCategory>('all');
  const [query, setQuery] = useState('');
  const previewRef = useRef<HTMLElement>(null);
  const selected = FONT_OPTIONS.find((font) => font.id === selectedId) ?? FONT_OPTIONS[0];
  const normalizedQuery = query.trim().toLocaleLowerCase('tr');
  const visibleFonts = FONT_OPTIONS.filter((font) =>
    (category === 'all' || font.category === category) &&
    `${font.name} ${font.description}`.toLocaleLowerCase('tr').includes(normalizedQuery)
  );

  const selectFont = (id: FontId) => {
    setSelectedId(id);
    if (window.matchMedia('(max-width: 800px)').matches) {
      previewRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <main className={styles.lab}>
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>PITON / TİPOGRAFİ</p>
          <h1>Markanın yeni yazısını seçelim.</h1>
          <p>Bir fonta tıkla; hero ve logonun yanında nasıl göründüğünü incele.</p>
        </div>
        <span className={styles.count}>{FONT_OPTIONS.length} seçenek</span>
      </header>

      <div className={styles.workspace}>
        <section className={styles.catalogue} aria-label="Font seçenekleri">
          <input
            className={styles.search}
            type="search"
            aria-label="Font ara"
            placeholder="Font ara…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className={styles.filters} role="group" aria-label="Font kategorileri">
            {FONT_CATEGORIES.map((item) => (
              <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>
                {item.name} <span>{item.id === 'all' ? FONT_OPTIONS.length : FONT_OPTIONS.filter((font) => font.category === item.id).length}</span>
              </button>
            ))}
          </div>
          <p className={styles.results} aria-live="polite">{visibleFonts.length} font gösteriliyor</p>
          <div className={styles.options} data-lenis-prevent>
          {visibleFonts.map((font) => (
            <button
              key={font.id}
              type="button"
              className={`${styles.option} ${selectedId === font.id ? styles.selected : ''}`}
              aria-pressed={selectedId === font.id}
              aria-label={`${font.name} fontunu önizle`}
              onClick={() => selectFont(font.id)}
            >
              <span className={styles.optionMeta}>
                <span>{String(FONT_OPTIONS.indexOf(font) + 1).padStart(2, '0')} / {font.name}</span>
                {font.badge && <span className={styles.badge}>{font.badge}</span>}
              </span>
              <span className={styles.specimen} style={{ fontFamily: font.family, fontWeight: font.weight }}>piton</span>
              <span className={styles.description}>{font.description}</span>
              <span className={styles.miniLockup}>
                <Image src="/logo.webp" alt="" width={24} height={24} aria-hidden="true" />
                <span style={{ fontFamily: font.family, fontWeight: font.id === 'nippo' ? 500 : font.weight }}>piton</span>
                <span className={styles.selectionMark} aria-hidden="true">{selectedId === font.id ? '✓' : '↗'}</span>
              </span>
            </button>
          ))}
          {visibleFonts.length === 0 && <p className={styles.empty}>Bu aramada font bulunamadı.</p>}
          </div>
        </section>

        <section
          ref={previewRef}
          className={styles.preview}
          aria-label="Seçilen fontun sitedeki önizlemesi"
          style={{
            '--preview-brand-font': selected.family,
            '--preview-brand-weight': selected.weight,
            '--preview-brand-logo-weight': selected.id === 'nippo' ? 500 : selected.weight,
          } as CSSProperties}
        >
          <div className={styles.previewTop}>
            <span>CANLI ÖNİZLEME</span>
            <select
              aria-label="Önizleme fontu"
              value={selectedId}
              onChange={(event) => {
                const font = FONT_OPTIONS.find((option) => option.id === event.target.value);
                if (font) setSelectedId(font.id);
              }}
            >
              {FONT_OPTIONS.map((font) => <option key={font.id} value={font.id}>{font.name} · {font.weight === 700 ? 'Bold' : 'Regular'} {font.weight}</option>)}
            </select>
            <span className={styles.srOnly} aria-live="polite">{selected.name} seçildi.</span>
          </div>
          <div className={styles.siteHeader}>
            <div className={`lockup glass ${styles.lockup}`}>
              <Image src="/logo.webp" alt="" width={26} height={26} className="mark-logo" aria-hidden="true" />
              <span className="mark">piton</span>
            </div>
            <div className={styles.sampleNav} aria-hidden="true">Projeler <span>Hizmetler</span> İletişim ↗</div>
          </div>
          <div className={styles.hero}>
            <HeroScene />
          </div>
          <div className={styles.previewFoot}>
            <p>Hero ve logo aynı fontla gösteriliyor. Diğer metinler mevcut fontlarında.</p>
            {selected.id === 'qurova' ? (
              <p>Qurova kayıtlı aday. Bu DEMO sürümü kişisel deneme içindir; ticari kullanım için <a href="https://prioritypeco.com/product/qurova-logo-font/" target="_blank" rel="noreferrer">tam sürüm lisansı</a> gerekir.</p>
            ) : selected.id === 'gotico-antiqua' ? (
              <p><a href="https://github.com/anrt-type/GoticoAntiqua" target="_blank" rel="noreferrer">Gotico Antiqua · Durandus 118G</a> yeni aday. Qurova da karşılaştırma listesinde kayıtlı.</p>
            ) : (
              <p>Nippo siteye uygulanan font. Qurova kayıtlı; diğer adayları karşılaştırmaya devam edebilirsin.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
