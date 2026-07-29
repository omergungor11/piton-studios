import { hasDatabaseUrl } from '@/lib/db';
import { contentSource, translationSummary } from '@/lib/content';
import { recentAudit } from '@/lib/audit';
import { contentCounts, unreadMessageCount } from './queries';

export const dynamic = 'force-dynamic';

const ACTION_LABEL: Record<string, string> = {
  create: 'oluşturdu',
  update: 'güncelledi',
  delete: 'sildi',
  publish: 'yayınladı',
  unpublish: 'yayından kaldırdı',
  login: 'giriş yaptı',
  upload: 'yükledi',
};

const ENTITY_LABEL: Record<string, string> = {
  project: 'proje',
  project_translation: 'proje çevirisi',
  service: 'hizmet',
  service_translation: 'hizmet çevirisi',
  media: 'medya',
  message: 'mesaj',
  admin_user: 'kullanıcı',
};

export default async function DashboardPage() {
  const dbReady = hasDatabaseUrl();
  const source = contentSource();

  // Çeviri sağlığı statik kaynaktan da okunabilir — DB olmadan da çalışır.
  const translations = await translationSummary();

  const counts = dbReady ? await contentCounts() : null;
  const unread = dbReady ? await unreadMessageCount() : 0;
  const audit = dbReady ? await recentAudit(8) : [];

  return (
    <>
      <div className="adm-top">
        <div className="adm-crumb">
          <strong>Panel</strong>
        </div>
        <div className="adm-crumb">
          içerik kaynağı: <strong>{source === 'db' ? 'Neon (db)' : 'statik'}</strong>
        </div>
      </div>

      <div className="adm-body">
        <h1 className="adm-h1">Genel durum</h1>
        <p className="adm-lede">
          İçerik, çeviri ve iletişim kutusunun tek bakışta özeti.
        </p>

        {!dbReady && (
          <div className="adm-note is-warn">
            <strong>Veritabanı bağlı değil.</strong> <code>DATABASE_URL</code> tanımlı olmadığı için
            proje/hizmet sayıları ve mesaj kutusu boş görünüyor. Kurulum adımları:{' '}
            <code>piton-docs/neon-setup.md</code>. Çeviri sağlığı statik kaynaktan okunduğu için
            aşağıda yine de doğru gösteriliyor.
          </div>
        )}

        {source === 'static' && dbReady && (
          <div className="adm-note is-info">
            <strong>İçerik kaynağı hâlâ statik.</strong> Göçü doğruladıktan sonra
            (<code>pnpm content:check</code>) <code>CONTENT_SOURCE=db</code> yaparak DB&apos;ye
            geçebilirsin.
          </div>
        )}

        <div className="adm-grid">
          <div className="adm-card">
            <div className="adm-card-label">Eksik çeviri</div>
            <div className={`adm-card-value ${translations.incomplete === 0 ? 'is-ok' : 'is-warn'}`}>
              {translations.incomplete}
            </div>
            <div className="adm-card-note">
              {translations.total} çeviri satırı içinde
              {translations.incomplete === 0 ? ' — tamamı eksiksiz' : ' tamamlanmayı bekliyor'}
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-label">Okunmamış mesaj</div>
            <div className={`adm-card-value ${unread > 0 ? 'is-warn' : ''}`}>{unread}</div>
            <div className="adm-card-note">
              {dbReady ? 'İletişim formundan gelen' : 'Veritabanı bağlanınca dolacak'}
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-label">Proje</div>
            <div className="adm-card-value">{counts?.projects ?? '—'}</div>
            <div className="adm-card-note">
              {counts ? `${counts.unpublished} tanesi yayında değil` : 'Veritabanı bağlı değil'}
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-label">Hizmet</div>
            <div className="adm-card-value">{counts?.services ?? '—'}</div>
            <div className="adm-card-note">
              {counts ? 'Yayındaki hizmet sayfası' : 'Veritabanı bağlı değil'}
            </div>
          </div>
        </div>

        <section className="adm-section">
          <div className="adm-section-head">
            <div className="adm-section-title">Dile göre çeviri durumu</div>
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Dil</th>
                  <th>Tamam</th>
                  <th>Kısmi</th>
                  <th>Eksik</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(translations.byLocale).map(([locale, stat]) => (
                  <tr key={locale}>
                    <td>{locale.toUpperCase()}</td>
                    <td>
                      <span className="adm-badge is-done">{stat.done}</span>
                    </td>
                    <td>
                      {stat.draft > 0 ? (
                        <span className="adm-badge is-draft">{stat.draft}</span>
                      ) : (
                        <span className="is-muted">0</span>
                      )}
                    </td>
                    <td>
                      {stat.missing > 0 ? (
                        <span className="adm-badge is-missing">{stat.missing}</span>
                      ) : (
                        <span className="is-muted">0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="adm-section">
          <div className="adm-section-head">
            <div className="adm-section-title">Son işlemler</div>
          </div>
          {audit.length === 0 ? (
            <div className="adm-note">
              Henüz kayıt yok. İçerik düzenleme Sprint 4&apos;te devreye girdiğinde her değişiklik
              burada görünecek.
            </div>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Kim</th>
                    <th>Ne</th>
                    <th>Nesne</th>
                    <th>Ne zaman</th>
                  </tr>
                </thead>
                <tbody>
                  {audit.map((row) => (
                    <tr key={row.id}>
                      <td>{row.actorName ?? row.actorEmail ?? 'sistem'}</td>
                      <td>{ACTION_LABEL[row.action] ?? row.action}</td>
                      <td className="is-muted">
                        {ENTITY_LABEL[row.entity] ?? row.entity}
                        {row.entityId ? ` · ${row.entityId.slice(0, 8)}` : ''}
                      </td>
                      <td className="is-muted">
                        {new Intl.DateTimeFormat('tr', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        }).format(row.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
