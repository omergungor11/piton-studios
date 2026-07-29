'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate, type LoginState } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="adm-btn is-primary" disabled={pending} style={{ width: '100%' }}>
      {pending ? 'Kontrol ediliyor…' : 'Giriş yap'}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(authenticate, {});

  return (
    <form action={formAction}>
      {state.error && (
        <div className="adm-error" role="alert">
          {state.error}
        </div>
      )}

      <div className="adm-field">
        <label className="adm-label" htmlFor="email">
          E-posta
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          autoFocus
          className="adm-input"
          placeholder="ornek@pitonstudios.com"
        />
      </div>

      <div className="adm-field">
        <label className="adm-label" htmlFor="password">
          Şifre
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="current-password"
          className="adm-input"
          placeholder="••••••••"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
