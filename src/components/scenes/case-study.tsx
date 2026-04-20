'use client';

import Link from 'next/link';

export default function CaseScene() {
  return (
    <div className="case-glass glass">
      <div className="case-media">
        <span className="tag-img">[ VIDEO · 4:5 ]</span>
        <video
          className="case-img"
          src="/assets/red-knight.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <span className="scale">SC. 04 · 00:42:11:08</span>
      </div>
      <div className="case-text">
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: 16,
          }}
        >
          § 03 · Long-format Case
        </div>
        <h3>
          Polaris — a <span className="em">quiet</span> brand for a loud medium.
        </h3>
        <div className="meta-grid">
          <div>
            <div className="k">Client</div>
            <div className="v">Polaris Films</div>
          </div>
          <div>
            <div className="k">Year</div>
            <div className="v">2025</div>
          </div>
          <div>
            <div className="k">Scope</div>
            <div className="v">Identity, film, web</div>
          </div>
          <div>
            <div className="k">Collab</div>
            <div className="v">dir. M. Keser</div>
          </div>
        </div>
        <p>
          Polaris is a boutique film label whose reels live inside festival circuits. The identity
          needed to move without being showy; it lives on slates, title cards, and the credit roll
          as much as on paper.
        </p>
        <p>
          We built a system around one constant: a type-led mark that can shift from a one-line
          slate to a 12-frame opener. The brand film was shot on 16mm and cut against a typographic
          score we drew weekly with the director.
        </p>
        <Link
          href="/projects/polaris"
          className="arrow"
          data-cursor="hover"
          data-cursor-label="Open"
        >
          <span>Read the case</span>
          <span>↗</span>
        </Link>
      </div>
    </div>
  );
}
