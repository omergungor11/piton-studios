import Link from 'next/link';
import FuzzyText from '@/components/fuzzy-text';
import { spaceGrotesk, ibmPlexMono } from '@/lib/fonts';

export default function NotFound() {
  return (
    <html
      lang="tr"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <div className="not-found-page">
          <div className="not-found-content">
            <FuzzyText
              text="404"
              fontSize={140}
              fontWeight={600}
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
