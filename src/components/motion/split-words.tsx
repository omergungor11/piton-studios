import { Fragment, type CSSProperties } from 'react';

type Segment = string | { text: string; className: string };

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';

/**
 * Basligi kelimelere bolup maskeli yukselme animasyonu verir (`data-reveal="words"`).
 * Metin DOM'da gercek metin olarak kalir (kelimeler arasinda bosluk dugumu) — SEO ve ekran okuyucu etkilenmez.
 * Sunucu ve istemci bilesenlerinde kullanilabilir (hook yok).
 *
 *   <SplitWords as="h1" className="sp-hero-title" text={t('title')} hero />
 *   <SplitWords as="h2" className="x" segments={[t('a') + ' ', { text: t('b'), className: 'em' }]} />
 *
 * `hero`: ekranin ustundeki baslik — sayfa acilisinda saf CSS ile oynar (JS beklemez, LCP'yi geciktirmez).
 */
export default function SplitWords({
  as: Component = 'span',
  text,
  segments,
  className,
  hero = false,
  delay = 0,
  id,
}: {
  as?: Tag;
  text?: string;
  segments?: Segment[];
  className?: string;
  hero?: boolean;
  /** Milisaniye; ayni bolumdeki baska ogelerle siralamak icin. */
  delay?: number;
  id?: string;
}) {
  const parts: { text: string; className?: string }[] = (segments ?? [text ?? '']).map((s) =>
    typeof s === 'string' ? { text: s } : s
  );

  let index = 0;
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Component id={id} className={className} data-reveal={hero ? 'words-hero' : 'words'} style={style}>
      {parts.map((part, p) => {
        const words = part.text.split(/(\s+)/);
        const content = words.map((word, w) => {
          if (!word) return null;
          if (/^\s+$/.test(word)) return <Fragment key={w}> </Fragment>;
          const i = index++;
          return (
            <span key={w} className="rw">
              <span className="rw-i" style={{ '--w': i } as CSSProperties}>
                {word}
              </span>
            </span>
          );
        });
        return part.className ? (
          <span key={p} className={part.className}>
            {content}
          </span>
        ) : (
          <Fragment key={p}>{content}</Fragment>
        );
      })}
    </Component>
  );
}
