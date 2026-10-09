'use client';

import { useEffect, useRef, type ReactElement, type ReactNode } from 'react';

interface ServiceGridProps {
  children: ReactNode;
}

/** Hizmet kartlari server'da uretilir; istemcide yalnizca esit yukseklik davranisi kalir. */
export default function ServiceGrid({ children }: ServiceGridProps): ReactElement {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const equalize = () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = Array.from(grid.querySelectorAll<HTMLElement>('.svc'));
      if (cards.length === 0) return;
      cards.forEach((card) => { card.style.height = 'auto'; });
      const maxHeight = Math.max(...cards.map((card) => card.offsetHeight));
      cards.forEach((card) => { card.style.height = `${maxHeight}px`; });
    };

    equalize();
    window.addEventListener('resize', equalize);
    return () => window.removeEventListener('resize', equalize);
  }, []);

  return <div className="svc-grid" ref={gridRef}>{children}</div>;
}
