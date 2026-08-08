/**
 * Onizlemesi olmayan projeler icin yer tutucu.
 *
 * Onceden jenerik bir stok gorsel (`story-*.jpg`) gosteriliyordu; o gorsel
 * projeyle ilgisiz oldugu icin ziyaretciyi yaniltiyordu. Yerine sitenin kendi
 * renkleriyle cizilmis bir arayuz iskeleti kondu: ekranda bir sey oldugu belli,
 * ama "bu projenin ekran goruntusu" iddiasi tasimiyor.
 *
 * Saf SVG + CSS degiskeni — ek gorsel istegi yok, her olcude net.
 */

type Props = {
  /** Ortadaki etiket — genelde projenin disiplini (ornek: "AI / ML") */
  label?: string;
};

export default function ProjectPlaceholder({ label }: Props) {
  return (
    <div className="pd-placeholder" aria-hidden="true">
      <svg
        className="pd-placeholder-wire"
        viewBox="0 0 400 240"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        {/* Tarayici cubugu */}
        <rect className="pw-line" x="40" y="30" width="320" height="180" rx="8" />
        <line className="pw-line" x1="40" y1="52" x2="360" y2="52" />
        <circle className="pw-dot" cx="53" cy="41" r="2.6" />
        <circle className="pw-dot" cx="63" cy="41" r="2.6" />
        <circle className="pw-dot" cx="73" cy="41" r="2.6" />

        {/* Sayfa iskeleti: hero serit + uc kart + metin satirlari */}
        <rect className="pw-fill" x="56" y="66" width="288" height="46" rx="4" />
        <rect className="pw-fill" x="56" y="124" width="88" height="58" rx="4" />
        <rect className="pw-fill" x="156" y="124" width="88" height="58" rx="4" />
        <rect className="pw-fill" x="256" y="124" width="88" height="58" rx="4" />
        <line className="pw-line" x1="56" y1="194" x2="216" y2="194" />
        <line className="pw-line" x1="56" y1="202" x2="164" y2="202" />
      </svg>

      <div className="pd-placeholder-center">
        <svg
          className="pd-placeholder-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="presentation"
        >
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <circle cx="8.5" cy="9.5" r="1.6" />
          <path d="M3.5 16.5l4.8-4.2a2 2 0 0 1 2.6 0l3.4 3 2.2-1.9a2 2 0 0 1 2.6 0l3.4 3" />
        </svg>
        {label && <span className="pd-placeholder-label">{label}</span>}
      </div>
    </div>
  );
}
