import type { Metadata } from 'next';
import { jetbrainsMono, ibmPlexMono } from '@/lib/fonts';
import './admin.css';

export const metadata: Metadata = {
  title: 'Yönetim — Piton Studios',
  // Panel hicbir kosulda indexlenmemeli.
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Panel [locale] disinda yasar ve tek dillidir (Türkçe).
 * Kendi <html>/<body> kabugunu saglar; public site kabugundan tamamen ayridir.
 */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-theme="dark" className={`${jetbrainsMono.variable} ${ibmPlexMono.variable}`}>
      <body>
        <div className="adm">{children}</div>
      </body>
    </html>
  );
}
