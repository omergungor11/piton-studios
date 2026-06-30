'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import PageShell from '@/components/page-shell';
import MatrixRain from '@/components/matrix-rain';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

const CLIENTS = [
  'Velis LTD', 'BT Elevator', 'Gel Gez Gör', 'Nexos Investment',
  'Ambalaj Cini', 'ISUZU Bursa', 'Kardeşler Taxi', 'Aydin Transfer',
];

const SKILLS = ['Next.js', 'TypeScript', 'React', 'Python', 'Supabase', 'Claude AI', 'Vercel', 'SEO'];

export default function AboutPage() {
  const t = useTranslations('about');
  const tc = useTranslations('common');

  return (
    <PageShell>
      <section className="sp-hero">
        <Reveal variant="fadeIn">
          <div className="sp-hero-eyebrow">{t('eyebrow')}</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.1}>
          <h1 className="sp-hero-title">
            {(t.raw('heading') as string).split('{accent}')[0]}
            <span className="em">{t('headingAccent')}</span>
            {(t.raw('heading') as string).split('{accent}')[1]}
          </h1>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.2}>
          <p className="sp-hero-sub">{t('desc')}</p>
        </Reveal>
      </section>

      {/* Story + Code Panel */}
      <Reveal variant="fadeUp" delay={0.1}>
        <section className="ap-story glass">
          <div className="ap-story-content">
            <div className="ap-stats">
              <div className="ap-stat">
                <span className="ap-stat-n">32<span className="em">+</span></span>
                <span className="ap-stat-label">{tc('projects')}</span>
              </div>
              <div className="ap-stat">
                <span className="ap-stat-n">4<span className="em">+</span></span>
                <span className="ap-stat-label">Yıl</span>
              </div>
              <div className="ap-stat">
                <span className="ap-stat-n">8<span className="em">+</span></span>
                <span className="ap-stat-label">Müşteri</span>
              </div>
            </div>
            <p className="ap-story-text">
              Piton Studios, 2021 yılında Türkiye&apos;de kurulmuş bağımsız bir dijital stüdyodur.
              Fikir aşamasından lansmana kadar uçtan uca hizmet sunuyoruz: web tasarımı, uygulama geliştirme,
              AI entegrasyonu ve dijital büyüme stratejileri.
            </p>
            <p className="ap-story-text">
              Startup&apos;lardan kurumsal markalara, yerel işletmelerden küresel müşterilere — her projede
              kalite, hız ve ölçülebilir sonuç odaklı çalışırız. Teknoloji karmaşıklaştırmak için değil,
              sadeleştirmek için vardır.
            </p>
            <blockquote className="ap-story-quote">
              <p>{t('quote')}</p>
              <cite>{t('quoteAuthor')}</cite>
            </blockquote>
          </div>

          <div className="about-media code-panel" aria-hidden="true">
            <span className="about-media-tag">[ CODE · SYSTEM ]</span>
            <MatrixRain bgColor="#04080F" glyphColor="#2080D0" headColor="#B0D8FF" />
            <div className="code-core">
              <span>PTN://STUDIO</span>
              <strong>creative_system.online</strong>
            </div>
            <div className="about-media-fade" />
            <div className="about-media-caption">
              <span>{t('location')}</span>
              <span>{t('mediaCaption')}</span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Values */}
      <Reveal variant="fadeUp" delay={0.1}>
        <section className="ap-values glass">
          <div className="ap-values-title">Değerlerimiz</div>
          <Stagger className="ap-values-grid" staggerDelay={0.08}>
            {[
              { n: '01', title: 'Hız', desc: 'Net zaman çizelgesi, MVP\'den lansmana hızlı geçiş. Zamanında teslimat standart, istisna değil.' },
              { n: '02', title: 'Kalite', desc: 'Piksel mükemmelliğinde tasarım, test edilmiş kod. Her satır düşünülmüş, her ekran test edilmiş.' },
              { n: '03', title: 'Şeffaflık', desc: 'Her adımda net iletişim. Gizli maliyet, sürpriz gecikme yok — ne söylediysek onu yapıyoruz.' },
              { n: '04', title: 'Sonuç', desc: 'Güzel görünmek bonus. Asıl hedef: iş probleminizi çözmek ve büyümenizi hızlandırmak.' },
            ].map((v) => (
              <StaggerItem key={v.n}>
                <div className="ap-value-card">
                  <div className="ap-value-n">{v.n}</div>
                  <h3 className="ap-value-title">{v.title}</h3>
                  <p className="ap-value-desc">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </Reveal>

      {/* Team */}
      <Reveal variant="fadeUp" delay={0.1}>
        <section className="ap-team glass">
          <div className="ap-team-title">Takım</div>
          <div className="ap-team-card">
            <div className="ap-team-avatar">ÖG</div>
            <div className="ap-team-info">
              <h3 className="ap-team-name">Ömer Güngör</h3>
              <div className="ap-team-role">Kurucu & Geliştirici</div>
              <p className="ap-team-desc">
                Full-stack geliştirici ve dijital ürün tasarımcısı. Next.js, TypeScript, Python ve
                AI entegrasyonu konularında uzman. 4+ yıl boyunca Türkiye ve uluslararası
                pazarlarda 30+ projeyi başarıyla hayata geçirdi.
              </p>
              <div className="ap-team-skills">
                {SKILLS.map((s) => (
                  <span key={s} className="ap-team-skill">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Clients */}
      <Reveal variant="fadeUp" delay={0.1}>
        <section className="ap-clients glass">
          <div className="ap-clients-title">Güvenilir Markalar</div>
          <Stagger className="ap-clients-grid" staggerDelay={0.05}>
            {CLIENTS.map((c) => (
              <StaggerItem key={c}>
                <div className="ap-client">{c}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </Reveal>

      {/* CTA */}
      <section className="sp-cta glass strong">
        <div className="sp-cta-text">
          <h3>Birlikte çalışalım.</h3>
          <p>Projenizi dinlemek için buradayız — fikir aşamasından lansmanına kadar.</p>
        </div>
        <Link href="/contact" className="sp-cta-btn" data-cursor="hover" data-cursor-label="↗">
          <span>İletişime Geç</span>
          <span>↗</span>
        </Link>
      </section>
    </PageShell>
  );
}
