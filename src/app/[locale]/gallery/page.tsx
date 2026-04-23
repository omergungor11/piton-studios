'use client';

import { useState } from 'react';
import PageShell from '@/components/page-shell';
import { videoUrl } from '@/lib/media';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  width: number;
  height: number;
}

// Demo data — will be replaced by Supabase
const DEMO_IMAGES: GalleryImage[] = [
  { id: '1', src: videoUrl('hero.mp4'), title: 'Studio Reel', category: 'Motion', width: 16, height: 9 },
  { id: '2', src: videoUrl('story-01.mp4'), title: 'Red Knight', category: 'Title', width: 9, height: 16 },
  { id: '3', src: videoUrl('story-02.mp4'), title: 'Vertical / 26', category: 'Reel', width: 9, height: 16 },
  { id: '4', src: videoUrl('about.mp4'), title: 'Studio', category: 'Behind', width: 9, height: 16 },
  { id: '5', src: videoUrl('story-03.mp4'), title: 'Polaris Key 04', category: 'Motion', width: 9, height: 16 },
  { id: '6', src: videoUrl('red-knight.mp4'), title: 'Red Knight Full', category: 'Title', width: 4, height: 5 },
  { id: '7', src: videoUrl('reel-b.mp4'), title: 'Longitude Reel', category: 'Reel', width: 9, height: 16 },
  { id: '8', src: videoUrl('note.mp4'), title: 'Note Film', category: 'Motion', width: 9, height: 16 },
  { id: '9', src: videoUrl('story-04.mp4'), title: 'Untitled', category: 'Behind', width: 9, height: 16 },
  { id: '10', src: videoUrl('story-05.mp4'), title: 'Night Cut', category: 'Motion', width: 9, height: 16 },
];

const CATEGORIES = ['All', ...Array.from(new Set(DEMO_IMAGES.map((i) => i.category)))];

export default function GalleryPage() {
  const [activeCat, setActiveCat] = useState('All');
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filtered = activeCat === 'All' ? DEMO_IMAGES : DEMO_IMAGES.filter((i) => i.category === activeCat);

  return (
    <PageShell>
      <section className="sp-hero">
        <div className="sp-hero-eyebrow">Gallery</div>
        <h1 className="sp-hero-title">
          Visual <span className="em">archive</span>.
        </h1>
        <p className="sp-hero-sub">
          A curated collection of stills, frames, and moments from our work — behind the scenes, on set, and in the edit.
        </p>
      </section>

      <section className="sp-filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`sp-filter-btn ${activeCat === cat ? 'active' : ''}`}
            onClick={() => setActiveCat(cat)}
            data-cursor="hover"
          >
            {cat}
          </button>
        ))}
      </section>

      <section className="gallery-grid">
        {filtered.map((img) => (
          <div
            key={img.id}
            className="gallery-item glass"
            data-cursor="play"
            data-cursor-label="View"
            onClick={() => setLightbox(img)}
          >
            <div className="gallery-media">
              <video src={img.src} muted loop playsInline preload="metadata" />
              <div className="gallery-fade" />
            </div>
            <div className="gallery-info">
              <span className="gallery-title">{img.title}</span>
              <span className="gallery-cat">{img.category}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
            <video src={lightbox.src} autoPlay muted loop playsInline preload="auto" />
            <div className="lightbox-info">
              <span className="lightbox-title">{lightbox.title}</span>
              <span className="lightbox-cat">{lightbox.category}</span>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
