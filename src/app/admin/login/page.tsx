import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <div className="adm-login">
      <div className="adm-login-card">
        <div className="adm-login-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.webp" alt="" aria-hidden="true" />
          <div>
            <div className="adm-login-title">Piton Studios</div>
            <div className="adm-login-sub">Yönetim</div>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
