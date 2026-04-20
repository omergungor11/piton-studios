'use client';

export default function AboutScene() {
  const clients = [
    'Polaris',
    'Meridian',
    'Halcyon',
    'Aperture',
    'Fathom',
    'Longitude',
    'Kadıköy Bld.',
    'Borusan',
  ];

  return (
    <div className="about-glass glass">
      <div className="about-top">
        <div className="about-heading">
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 18,
              textAlign: 'center',
            }}
          >
            § 05 · About
          </div>
          <h3 style={{ textAlign: 'center' }}>
            Studio of one. <span className="em">Operating</span> from Türkiye since 2020. Available
            for two engagements per quarter.
          </h3>
          <p className="about-desc">
            Pixel Ninja, marka kimliği, yönetmenlik ve hareketli görüntü alanında çalışan bağımsız bir stüdyodur.
            Kurucular, kültür kurumları ve küçük markalarla — kimlik sistemleri, editoryal tasarım ve film üzerine işler üretiyoruz.
          </p>
          <blockquote className="about-quote">
            <span className="about-quote-mark">"</span>
            <p>Hız, kısıtlama ve biraz da grenin hâlâ önemli olduğuna inanan stüdyolar için sinematik kimlikler yaratıyoruz.</p>
            <cite>— Ömer Güngör, Founder</cite>
          </blockquote>
        </div>
        <div className="about-media" data-cursor="play" data-cursor-label="Play">
          <span className="about-media-tag">[ STUDIO · 2025 ]</span>
          <video src="/assets/about.mp4" autoPlay muted loop playsInline preload="auto" />
          <div className="about-media-fade" />
          <div className="about-media-caption">
            <span>Türkiye</span>
            <span>Studio · 2025</span>
          </div>
        </div>
      </div>
      <div className="about-meta">
        <div className="block">
          <div className="k">Recognition</div>
          <div>
            Type Directors Club · 2024 merit · D&amp;AD Wood Pencil · 2023 · Brand New (noted) ·
            2025
          </div>
        </div>
        <div className="block">
          <div className="k">Clients (selected)</div>
          <div className="list">
            {clients.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
        <div className="block">
          <div className="k">Teaching</div>
          <div>
            Istanbul Bilgi Üniversitesi — Graduate workshops · Guest crit, RCA London
          </div>
        </div>
      </div>
    </div>
  );
}
