'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
  href: string;
  label: string;
  group: string;
  badge?: number;
  /** Rozet dikkat cekmeli mi (okunmamis mesaj) yoksa notr mu (toplam sayi)? */
  badgeTone?: 'accent' | 'muted';
  /** Henuz uygulanmadi — tiklanabilir ama bos sayfa. */
  soon?: boolean;
}

export default function AdminNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const groups = items.reduce<Record<string, NavItem[]>>((acc, item) => {
    (acc[item.group] ??= []).push(item);
    return acc;
  }, {});

  return (
    <nav className="adm-nav">
      {Object.entries(groups).map(([group, groupItems]) => (
        <div key={group}>
          <div className="adm-nav-group">{group}</div>
          {groupItems.map((item) => {
            const active =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`adm-nav-link ${active ? 'is-active' : ''}`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`adm-nav-badge ${item.badgeTone === 'muted' ? 'is-muted' : ''}`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.soon && <span className="adm-nav-badge is-muted">yakında</span>}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
