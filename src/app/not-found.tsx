import Link from 'next/link';
import FuzzyText from '@/components/fuzzy-text';

export default function NotFound() {
  return (
    <html lang="tr" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;900&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="not-found-page">
          <div className="not-found-content">
            <FuzzyText
              text="404"
              fontSize={140}
              fontWeight={900}
              fontFamily="'Press Start 2P', monospace"
              color="#F2EFE9"
              baseIntensity={0.2}
              hoverIntensity={0.6}
              enableHover={true}
              fuzzRange={30}
              fps={30}
              direction="horizontal"
              glitchMode={true}
              glitchInterval={3000}
              glitchDuration={200}
              className="not-found-canvas"
            />
            <p className="not-found-sub">Bu sayfa bulunamadi.</p>
            <Link href="/" className="not-found-link">
              Ana Sayfaya Don <span>↗</span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
