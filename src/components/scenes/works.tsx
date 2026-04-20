'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { WORKS, type Work, type PreviewData } from '@/lib/data';

interface WorksSceneProps {
  onPreview: (w: Work | null, x?: number, y?: number) => void;
}

export default function WorksScene({ onPreview }: WorksSceneProps) {
  return (
    <div className="works-glass glass">
      <div className="head">
        <span className="n">§ 02</span>
        <span className="t">Selected Works</span>
        <span>
          [{String(WORKS.length).padStart(2, '0')} / {String(WORKS.length).padStart(2, '0')}]
        </span>
      </div>
      <div className="works-list" onMouseLeave={() => onPreview(null)}>
        {WORKS.map((w) => (
          <Link
            key={w.n}
            className="work-row"
            href={`/projects/${w.slug}`}
            data-cursor="play"
            data-cursor-label="View ↗"
            onMouseEnter={(e) => onPreview(w, e.clientX, e.clientY)}
            onMouseMove={(e) => onPreview(w, e.clientX, e.clientY)}
          >
            <span className="idx">[{w.n}]</span>
            <span className="title">
              <span className="row">{w.title}</span>
              <span className="dup">{w.title}</span>
            </span>
            <span className="client">{w.client}</span>
            <span className="kind">{w.kind}</span>
            <span className="year">{w.year}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

interface PreviewCardProps {
  data: PreviewData | null;
}

export function PreviewCard({ data }: PreviewCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && data) {
      ref.current.style.transform = `translate3d(${data.x ?? window.innerWidth / 2}px, ${data.y ?? window.innerHeight / 2}px, 0) translate(-50%, -50%) scale(1)`;
    }
  }, [data]);

  return (
    <div ref={ref} className={`preview ${data ? 'on' : ''}`}>
      <div className="ph">{data ? data.title : ''}</div>
      <div className="chip-tc">
        <span className="dot" /> PREVIEW · {data ? data.kind : ''}
      </div>
    </div>
  );
}
