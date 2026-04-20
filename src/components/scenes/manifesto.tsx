'use client';

import React from 'react';
import { MANIFESTO } from '@/lib/data';

export default function ManifestoScene() {
  const words = MANIFESTO.split(' ');

  return (
    <div className="manifesto-glass glass">
      <div className="manifesto-main">
        <div className="eyebrow">§ 01 · Note</div>
        <h2>
          {words.map((w, i) => {
            const em = w === 'cinematic' || w === 'grain' || w === 'restraint,';
            return (
              <React.Fragment key={i}>
                <span className="word" style={{ '--i': i } as React.CSSProperties}>
                  <span className={em ? 'em' : ''}>{w}</span>
                </span>
                {i < words.length - 1 ? ' ' : ''}
              </React.Fragment>
            );
          })}
        </h2>
        <div className="foot">
          <p>
            Pixel Ninja is an independent studio operating from İstanbul. We work with founders,
            cultural institutions, and small labels on identities, editorial systems, and moving
            image.
          </p>
          <p>
            Our work is made for screen and print. We care about pacing, typographic detail, the
            thing that happens when an image loads, and the quiet frame between two louder ones.
          </p>
        </div>
      </div>
      <div className="note-media" data-cursor="play" data-cursor-label="Play">
        <span className="note-media-tag">[ NOTE · FILM ]</span>
        <video src="/assets/note.mp4" autoPlay muted loop playsInline preload="auto" />
        <div className="note-media-fade" />
        <div className="note-media-caption">
          <span>Loop</span>
          <span>— PX · NJ</span>
        </div>
      </div>
    </div>
  );
}
