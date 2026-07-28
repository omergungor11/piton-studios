import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

type OgInput = {
  title: string;
  /** Ustte gorunen kucuk etiket — "Blog", "Proje", "Hizmet" gibi. */
  eyebrow?: string;
  description?: string;
  /** Alt satirda gorunen ek bilgi — tarih, yil, musteri. */
  footnote?: string;
};

/**
 * Tum sayfa turleri icin ortak OG gorseli.
 * Marka dili: koyu zemin, mono tipografi, ince cerceve.
 */
export function renderOgImage({ title, eyebrow, description, footnote }: OgInput) {
  // Uzun basliklar tasmasin diye kaba bir olcek — ImageResponse'ta metin sarmasi sinirli.
  const titleSize = title.length > 70 ? 52 : title.length > 45 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#08090b',
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgba(56,189,248,0.16), transparent 45%), radial-gradient(circle at 85% 88%, rgba(34,197,94,0.12), transparent 45%)',
          padding: 72,
          fontFamily: 'sans-serif',
          color: '#e8eaed',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: '#22c55e',
                display: 'flex',
              }}
            />
            <div style={{ fontSize: 26, letterSpacing: 2, textTransform: 'uppercase' }}>
              Piton Studios
            </div>
          </div>
          {eyebrow ? (
            <div
              style={{
                fontSize: 22,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#9aa3ad',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 999,
                padding: '10px 22px',
                display: 'flex',
              }}
            >
              {eyebrow}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: titleSize,
              lineHeight: 1.12,
              fontWeight: 600,
              letterSpacing: -1.5,
              display: 'flex',
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.45,
                color: '#9aa3ad',
                display: 'flex',
                maxWidth: 900,
              }}
            >
              {description.length > 140 ? `${description.slice(0, 137)}...` : description}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            color: '#6b7280',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex' }}>pitonstudios.com</div>
          {footnote ? <div style={{ display: 'flex' }}>{footnote}</div> : null}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
