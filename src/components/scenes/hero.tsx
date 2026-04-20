'use client';

interface HeroSceneProps {
  clock: string;
}

export default function HeroScene({ clock: _clock }: HeroSceneProps) {
  return (
    <div className="hero-stack">
      <div className="hero-main glass strong">
        <div className="kicker">Reel · 016 · A studio of one</div>
        <h1 style={{ fontWeight: '600', letterSpacing: '2px', lineHeight: '0.85' }}>
          Pixel <span className="it">Ninja</span>
          <br />
          <span className="line2">
            By Ömer <span className="it">Güngör</span>
          </span>
        </h1>
        <div className="sub" style={{ textAlign: 'left' }}>
          Independent brand, direction &amp; motion studio — working from Karaköy, İstanbul with
          clients around the world.
        </div>
        <div className="row-foot">
          <span className="chip accent">● ONLINE</span>
          <span className="chip">AI</span>
          <span className="chip">BRAND</span>
          <span className="chip">Motion</span>
          <span className="chip">WEBSITE</span>
        </div>
      </div>
      <div className="hero-side"></div>
    </div>
  );
}
