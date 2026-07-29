import { redirect } from 'next/navigation';
import { auth, signOut } from '@/lib/auth';
import { hasDatabaseUrl } from '@/lib/db';
import { unreadMessageCount } from './queries';
import AdminNav, { type NavItem } from './nav';

export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Middleware zaten koruyor; bu ikinci savunma hatti (defense in depth).
  if (!session?.user) redirect('/admin/login');

  const unread = hasDatabaseUrl() ? await unreadMessageCount() : 0;

  const items: NavItem[] = [
    { href: '/admin', label: 'Panel', group: 'Genel' },
    { href: '/admin/projects', label: 'Projeler', group: 'İçerik', soon: true },
    { href: '/admin/services', label: 'Hizmetler', group: 'İçerik', soon: true },
    { href: '/admin/media', label: 'Medya', group: 'İçerik', soon: true },
    {
      href: '/admin/messages',
      label: 'Mesajlar',
      group: 'İletişim',
      badge: unread,
      badgeTone: 'accent',
      soon: true,
    },
    { href: '/admin/settings', label: 'Ayarlar', group: 'Sistem', soon: true },
  ];

  const user = session.user as { name?: string | null; email?: string | null; role?: string };

  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <div className="adm-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.webp" alt="" aria-hidden="true" />
          <div>
            <div className="adm-brand-text">Piton</div>
            <div className="adm-brand-sub">Yönetim</div>
          </div>
        </div>

        <AdminNav items={items} />

        <div className="adm-side-foot">
          <div className="adm-user">
            <strong>{user.name ?? user.email}</strong>
            {user.role}
          </div>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/admin/login' });
            }}
          >
            <button type="submit" className="adm-btn is-ghost" style={{ width: '100%' }}>
              Çıkış
            </button>
          </form>
        </div>
      </aside>

      <div className="adm-main">{children}</div>
    </div>
  );
}
