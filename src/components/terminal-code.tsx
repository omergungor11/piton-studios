'use client';

import { useEffect, useRef, useState } from 'react';

type Token = { t: string; c: string };
type Line = Token[];

const LINES: Line[] = [
  [{ t: '// studio.ts', c: 'cm' }],
  [{ t: '', c: '' }],
  [{ t: 'const ', c: 'kw' }, { t: 'studio', c: 'vr' }, { t: ' = {', c: 'pu' }],
  [{ t: '  name', c: 'pr' }, { t: ': ', c: 'pu' }, { t: '"Piton Studios"', c: 'st' }, { t: ',', c: 'pu' }],
  [{ t: '  stack', c: 'pr' }, { t: ': [', c: 'pu' }, { t: '"Next.js"', c: 'st' }, { t: ', ', c: 'pu' }, { t: '"AI"', c: 'st' }, { t: '],', c: 'pu' }],
  [{ t: '  since', c: 'pr' }, { t: ': ', c: 'pu' }, { t: '2021', c: 'nm' }, { t: ',', c: 'pu' }],
  [{ t: '}', c: 'pu' }],
  [{ t: '', c: '' }],
  [{ t: 'async ', c: 'kw' }, { t: 'function ', c: 'kw' }, { t: 'ship', c: 'fn' }, { t: '(', c: 'pu' }],
  [{ t: '  brief', c: 'pa' }, { t: ': ', c: 'pu' }, { t: 'Brief', c: 'ty' }],
  [{ t: '): ', c: 'pu' }, { t: 'Promise', c: 'ty' }, { t: '<', c: 'pu' }, { t: 'Product', c: 'ty' }, { t: '> {', c: 'pu' }],
  [{ t: '  const ', c: 'kw' }, { t: 'ui  ', c: 'vr' }, { t: '= ', c: 'pu' }, { t: 'await ', c: 'kw' }, { t: 'design', c: 'fn' }, { t: '(brief)', c: 'pu' }],
  [{ t: '  const ', c: 'kw' }, { t: 'app ', c: 'vr' }, { t: '= ', c: 'pu' }, { t: 'await ', c: 'kw' }, { t: 'build', c: 'fn' }, { t: '(ui)', c: 'pu' }],
  [{ t: '  ', c: '' }, { t: 'return ', c: 'kw' }, { t: 'deploy', c: 'fn' }, { t: '(app)', c: 'pu' }],
  [{ t: '}', c: 'pu' }],
  [{ t: '', c: '' }],
  [{ t: 'await ', c: 'kw' }, { t: 'ship', c: 'fn' }, { t: '({', c: 'pu' }],
  [{ t: '  client', c: 'pr' }, { t: ': ', c: 'pu' }, { t: '"you"', c: 'st' }, { t: ',', c: 'pu' }],
  [{ t: '})', c: 'pu' }],
  [{ t: '', c: '' }],
  [{ t: '// ✓ delivered. on time.', c: 'ok' }],
];

const CHAR_DELAY = 30;   // ms per character
const LINE_PAUSE = 60;   // extra ms between lines
const END_PAUSE  = 2200; // ms before loop restart

interface Progress { lineIdx: number; charIdx: number }

export default function TerminalCode() {
  const [prog, setProg] = useState<Progress>({ lineIdx: 0, charIdx: 0 });
  const [restarting, setRestarting] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (restarting) {
      const t = setTimeout(() => {
        setProg({ lineIdx: 0, charIdx: 0 });
        setRestarting(false);
      }, END_PAUSE);
      return () => clearTimeout(t);
    }

    const curLine = LINES[prog.lineIdx];
    if (!curLine) return;
    const lineLen = curLine.reduce((s, tk) => s + tk.t.length, 0);

    const delay = prog.charIdx === 0 && prog.lineIdx > 0 ? LINE_PAUSE : CHAR_DELAY;

    const t = setTimeout(() => {
      if (prog.charIdx < lineLen) {
        setProg(p => ({ ...p, charIdx: p.charIdx + 1 }));
      } else if (prog.lineIdx < LINES.length - 1) {
        setProg({ lineIdx: prog.lineIdx + 1, charIdx: 0 });
      } else {
        setRestarting(true);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [prog, restarting]);

  // auto-scroll to current line
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [prog.lineIdx]);

  const renderLine = (line: Line, revealChars: number, isCurrentLine: boolean) => {
    let rem = revealChars;
    const spans: React.ReactNode[] = [];
    for (let i = 0; i < line.length; i++) {
      const tk = line[i];
      if (rem <= 0) break;
      const visible = tk.t.slice(0, rem);
      rem -= tk.t.length;
      spans.push(<span key={i} className={`tc-${tk.c}`}>{visible}</span>);
    }
    if (isCurrentLine) spans.push(<span key="cur" className="tc-cursor" />);
    return spans;
  };

  return (
    <div className="term-wrap">
      <div className="term-bar">
        <span className="term-dot term-dot-r" />
        <span className="term-dot term-dot-y" />
        <span className="term-dot term-dot-g" />
        <span className="term-title">studio.ts — node</span>
      </div>

      <div className="term-body" ref={bodyRef}>
        {LINES.map((line, li) => {
          if (li > prog.lineIdx) return null;
          const isCurrent = li === prog.lineIdx && !restarting;
          const revealChars = isCurrent
            ? prog.charIdx
            : line.reduce((s, tk) => s + tk.t.length, 0);

          return (
            <div key={li} className="term-line">
              <span className="term-ln">{String(li + 1).padStart(2, '0')}</span>
              <span className="term-code">
                {renderLine(line, revealChars, isCurrent)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="term-status">
        <span>TypeScript</span>
        <span>UTF-8</span>
        <span>Ln {prog.lineIdx + 1}</span>
      </div>
    </div>
  );
}
