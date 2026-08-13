import React from 'react';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'web-design': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="24" height="18" rx="2" />
      <line x1="4" y1="12" x2="28" y2="12" />
      <circle cx="8" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none" />
      <rect x="7" y="15" width="8" height="6" rx="1" />
      <line x1="18" y1="15" x2="25" y2="15" />
      <line x1="18" y1="18" x2="23" y2="18" />
      <line x1="18" y1="21" x2="20" y2="21" />
    </svg>
  ),
  'web-app': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="24" height="24" rx="3" />
      <line x1="4" y1="10" x2="28" y2="10" />
      <line x1="12" y1="10" x2="12" y2="28" />
      <rect x="15" y="14" width="9" height="5" rx="1" />
      <rect x="15" y="22" width="9" height="3" rx="1" />
      <line x1="7" y1="14" x2="9" y2="14" />
      <line x1="7" y1="17" x2="9" y2="17" />
      <line x1="7" y1="20" x2="9" y2="20" />
    </svg>
  ),
  'progressive-web-app': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="4" width="16" height="24" rx="3" />
      <line x1="12" y1="25" x2="20" y2="25" />
      <circle cx="16" cy="14" r="4" />
      <path d="M16 10v4l2.5 1.5" />
      <path d="M4 16h4" />
      <path d="M24 16h4" />
      <path d="M6 9l2.5 2.5" />
      <path d="M23.5 11.5L26 9" />
    </svg>
  ),
  'automation': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" />
      <circle cx="24" cy="8" r="3" />
      <circle cx="16" cy="24" r="3" />
      <path d="M10.5 9.5L14 21.5" />
      <path d="M21.5 9.5L18 21.5" />
      <path d="M11 8h10" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  'ai-integration': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="10" />
      <circle cx="16" cy="16" r="3" />
      <path d="M16 6v7" />
      <path d="M16 19v7" />
      <path d="M6 16h7" />
      <path d="M19 16h7" />
      <circle cx="16" cy="16" r="1" fill="currentColor" stroke="none" />
      <path d="M10 10l4 4" />
      <path d="M18 18l4 4" />
    </svg>
  ),
  'google-ads': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 24l4-16h4l-4 16z" />
      <path d="M14 24l4-16h4l-4 16z" />
      <circle cx="24" cy="20" r="4" />
      <line x1="8" y1="28" x2="24" y2="28" />
    </svg>
  ),
  'seo-geo': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="11" />
      <ellipse cx="16" cy="16" rx="5" ry="11" />
      <line x1="5" y1="12" x2="27" y2="12" />
      <line x1="5" y1="20" x2="27" y2="20" />
      <line x1="16" y1="5" x2="16" y2="27" />
    </svg>
  ),
  'how-to-do': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6h8v20H6z" />
      <path d="M18 6h8v20h-8z" />
      <line x1="9" y1="10" x2="11" y2="10" />
      <line x1="9" y1="13" x2="11" y2="13" />
      <line x1="9" y1="16" x2="11" y2="16" />
      <line x1="21" y1="10" x2="23" y2="10" />
      <line x1="21" y1="13" x2="23" y2="13" />
      <path d="M16 4v2" />
      <path d="M16 26v2" />
      <circle cx="22" cy="20" r="2" />
      <path d="M22 22v2" />
    </svg>
  ),
  'data-engineering': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="16" cy="8" rx="10" ry="3" />
      <path d="M6 8v8c0 1.66 4.48 3 10 3s10-1.34 10-3V8" />
      <path d="M6 16v8c0 1.66 4.48 3 10 3s10-1.34 10-3v-8" />
      <ellipse cx="16" cy="16" rx="10" ry="3" />
    </svg>
  ),
  'cloud-ecosystem': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 24a5 5 0 01-.5-9.96A7.5 7.5 0 0122 10a6 6 0 012 11.66" />
      <path d="M12 24h12" />
      <line x1="16" y1="18" x2="16" y2="28" />
      <line x1="14" y1="20" x2="16" y2="18" />
      <line x1="18" y1="20" x2="16" y2="18" />
    </svg>
  ),
  'agentic-ai': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="4" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <path d="M16 5a11 11 0 019.5 5.5" />
      <path d="M25.5 10.5l-1.5 2.5" />
      <path d="M25.5 10.5l2.5 1" />
      <path d="M25.5 21.5A11 11 0 016.5 21.5" />
      <path d="M6.5 21.5l1.5-2.5" />
      <path d="M6.5 21.5l-2.5-1" />
      <path d="M6.5 10.5A11 11 0 0116 5" />
    </svg>
  ),
  'ai-consulting': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4a8 8 0 014 15v3h-8v-3A8 8 0 0116 4z" />
      <line x1="12" y1="25" x2="20" y2="25" />
      <line x1="13" y1="28" x2="19" y2="28" />
      <circle cx="24" cy="8" r="4" />
      <path d="M22 8l1.5 1.5L26 6" />
    </svg>
  ),
};

export default SERVICE_ICONS;
