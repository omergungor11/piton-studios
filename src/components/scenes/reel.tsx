'use client';

import Link from 'next/link';

export default function ReelScene() {
  return (
    <div className="case-glass reel-glass glass">
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
          § 04 · Reel / 26
        </div>
        <h3>
          In motion — a <span className="em">loop</span> we cut every quarter.
        </h3>
        <div className="meta-grid">
          <div>
            <div className="k">Reel</div>
            <div className="v">/26 · Q2</div>
          </div>
          <div>
            <div className="k">Runtime</div>
            <div className="v">00 : 42</div>
          </div>
          <div>
            <div className="k">Aspect</div>
            <div className="v">9 : 16 · vertical</div>
          </div>
          <div>
            <div className="k">Cut by</div>
            <div className="v">Pixel Ninja</div>
          </div>
        </div>
        <p>
          A loose edit pulled from the last three months — title cards, typographic moments,
          B&#8209;roll, and the frames we keep returning to. Updated quarterly, never polished,
          always scored to whatever we had on the speakers that week.
        </p>
        <p>
          The reel lives here on the site and on the studio&apos;s vertical channels. Hover the
          card to bring it forward; scroll to let it settle back into the frame.
        </p>
        <Link
          href="/projects/vertical-26"
          className="arrow"
          data-cursor="hover"
          data-cursor-label="Watch"
        >
          <span>Watch the reel</span>
          <span>↗</span>
        </Link>
      </div>
      <div className="case-media reel-media" data-cursor="play" data-cursor-label="Play ↗">
        <span className="tag-img">[ VIDEO · 9:16 ]</span>
        <video
          className="case-img"
          src="/assets/reel-b.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <span className="scale">REEL /26 · LIVE</span>
      </div>
    </div>
  );
}
