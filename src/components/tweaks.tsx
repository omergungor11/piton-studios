'use client';

interface TweaksProps {
  open: boolean;
  theme: string;
  setTheme: (t: string) => void;
}

export default function Tweaks({ open, theme, setTheme }: TweaksProps) {
  return (
    <div className={`tweaks glass ${open ? 'open' : ''}`}>
      <span className="label">Theme</span>
      <span className="seg">
        <button
          className={theme === 'light' ? 'on' : ''}
          onClick={() => setTheme('light')}
          data-cursor="hover"
        >
          Light
        </button>
        <button
          className={theme === 'dark' ? 'on' : ''}
          onClick={() => setTheme('dark')}
          data-cursor="hover"
        >
          Dark
        </button>
      </span>
    </div>
  );
}
