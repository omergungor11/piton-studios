'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentType, ReactElement } from 'react';
import { SERVICE_ART_LOADERS } from './service-art-loaders';
import type { ServiceArtProps } from './service-art-loaders';
import styles from './services-list.module.css';

/** Filtre degistiginde indirilen sahne tekrar beklemez; ekran disinda SVG DOM'u tutulmaz. */
const loaded = new Map<string, ComponentType<ServiceArtProps>>();

export default function ServiceCardArt({ slug, label }: ServiceArtProps & { slug: string }): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [Art, setArt] = useState<ComponentType<ServiceArtProps> | null>(() => loaded.get(slug) ?? null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const id = requestAnimationFrame(() => setNearViewport(true));
      return () => cancelAnimationFrame(id);
    }
    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: '180px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport || Art) return;
    const cached = loaded.get(slug);
    const load = SERVICE_ART_LOADERS[slug];
    if (!load) return;
    let active = true;
    const ready = cached ? Promise.resolve(cached) : load().then((module) => module.default);
    ready.then((component) => {
      loaded.set(slug, component);
      if (active) setArt(() => component);
    }).catch(() => {
      // Dekoratif sahne yuklenemezse sabit kutu ve tum hizmet metni/linki korunur.
    });
    return () => { active = false; };
  }, [nearViewport, Art, slug]);

  return (
    <div ref={ref} className={styles.stage} aria-hidden="true">
      {nearViewport && Art ? <Art label={label} /> : null}
    </div>
  );
}
