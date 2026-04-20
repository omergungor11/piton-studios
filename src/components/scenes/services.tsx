'use client';

import Link from 'next/link';
import { SERVICES } from '@/lib/data';

export default function ServicesScene() {
  return (
    <div className="svc-glass glass">
      <div className="head">
        <span className="n">§ 04</span>
        <span className="t">Services · What we ship</span>
        <span>[{SERVICES.length} practices]</span>
      </div>
      <div className="svc-grid">
        {SERVICES.map((s) => (
          <Link key={s.n} href={`/services/${s.slug}`} className="svc" data-cursor="hover" data-cursor-label="+">
            <div className="svc-top">
              <span className="n">{s.n}</span>
              <span className="cat">{s.cat}</span>
            </div>
            <h4>{s.title}</h4>
            <p className="svc-desc">{s.desc}</p>
            <ul className="svc-items">
              {s.items.map((t) => (
                <li key={t}>
                  <span className="bullet">—</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <span className="svc-arrow">↗</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
