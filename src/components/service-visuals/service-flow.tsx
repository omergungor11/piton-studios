'use client';

import type { ServiceFlowDef } from './flows';
import SplitWords from '@/components/motion/split-words';

/**
 * "Nasil calisir" akis diyagrami. HTML liste olarak isaretlenir (ekran okuyucu sirayi okur);
 * asamalar arasi isik cizgisi CSS ile. Masaustunde yatay, dar ekranda dikey.
 */
export default function ServiceFlow({
  def,
  label,
  title,
  caption,
  nodes,
}: {
  def: ServiceFlowDef;
  label: string;
  title: string;
  caption: string;
  nodes: Record<string, string>;
}) {
  return (
    <section className="sd-flow sd-section-fade">
      <div className="sd-section-header">
        <span className="sd-section-label" data-reveal="fade">{label}</span>
        <SplitWords as="h2" className="sd-section-title" text={title} />
        <p className="sd-flow-caption" data-reveal="fade" style={{ '--i': 1 } as React.CSSProperties}>{caption}</p>
      </div>
      <ol className="sv-flow-track" style={{ '--sv-stages': def.stages.length } as React.CSSProperties}>
        {def.stages.map((stage, i) => (
          <li key={i} className="sv-flow-stage" data-reveal="rise" style={{ '--i': i } as React.CSSProperties}>
            <span className="sv-flow-index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <ul className="sv-flow-nodes">
              {stage.map((id) => (
                <li key={id} className={id === def.core ? 'sv-flow-node is-core' : 'sv-flow-node'}>
                  <span className="sv-flow-dot" aria-hidden="true" />
                  {nodes[id] ?? id}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
