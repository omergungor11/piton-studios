'use client';

import { useState, type FormEvent } from 'react';

export default function ContactScene() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate send — replace with Supabase / API route later
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1200);
  };

  return (
    <div className="contact-glass glass">
      <div className="eyebrow">§ 06 · Contact</div>
      <a
        className="mail"
        href="mailto:hi@pixelninja.com"
        data-cursor="mail"
        data-cursor-label="Send ↗"
      >
        <span className="row">hi@pixelninja.com ↗</span>
        <span className="dup">hi@pixelninja.com ↗</span>
      </a>

      {/* Quick action buttons */}
      <div className="contact-actions">
        <a
          href="mailto:hi@pixelninja.com"
          className="contact-action-btn whatsapp"
          data-cursor="hover"
          data-cursor-label="Chat"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp</span>
        </a>
        <a
          href="tel:+905XXXXXXXXX"
          className="contact-action-btn phone"
          data-cursor="hover"
          data-cursor-label="Call"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span>Ara</span>
        </a>
      </div>

      {/* Contact info grid */}
      <div className="contact-grid">
        <div>
          <div className="k">General</div>
          <div className="v">
            <a href="mailto:hi@pixelninja.com" data-cursor="hover" data-cursor-label="Email">
              hi@pixelninja.com
            </a>
          </div>
        </div>
        <div>
          <div className="k">Telefon</div>
          <div className="v">
            <a href="tel:+905XXXXXXXXX" data-cursor="hover" data-cursor-label="Call">
              +90 5XX XXX XX XX
            </a>
          </div>
        </div>
        <div>
          <div className="k">New work</div>
          <div className="v">
            <a href="mailto:new@pixelninja.com" data-cursor="hover" data-cursor-label="Email">
              new@pixelninja.com
            </a>
          </div>
        </div>
        <div>
          <div className="k">Studio</div>
          <div className="v">
            Türkiye
          </div>
        </div>
      </div>

      {/* Contact form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-header">
          <span className="contact-form-tag">Bize Yazın</span>
          <span className="contact-form-sub">Projenizi konuşalım — genellikle 24 saat içinde dönüş yaparız.</span>
        </div>
        <div className="contact-form-fields">
          <div className="contact-field">
            <label htmlFor="name">İsim</label>
            <input
              id="name"
              type="text"
              placeholder="Adınız Soyadınız"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="contact-field">
            <label htmlFor="email">E-posta</label>
            <input
              id="email"
              type="email"
              placeholder="email@ornek.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="contact-field">
            <label htmlFor="phone">Telefon</label>
            <input
              id="phone"
              type="tel"
              placeholder="+90 5XX XXX XX XX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="contact-field full">
            <label htmlFor="message">Mesaj</label>
            <textarea
              id="message"
              placeholder="Projeniz hakkında kısaca bilgi verin..."
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="contact-submit"
          disabled={status === 'sending' || status === 'sent'}
          data-cursor="hover"
          data-cursor-label="Send"
        >
          {status === 'idle' && <><span>Gönder</span><span className="arrow-icon">↗</span></>}
          {status === 'sending' && <span>Gönderiliyor...</span>}
          {status === 'sent' && <span>✓ Gönderildi</span>}
          {status === 'error' && <span>Hata — tekrar deneyin</span>}
        </button>
      </form>
    </div>
  );
}
