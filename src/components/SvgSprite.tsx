export function SvgSprite() {
  return (
    <svg style={{ display: 'none' }} aria-hidden="true">
      <symbol id="i-users" viewBox="0 0 24 24">
        <path d="M16 21v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
        <circle cx="6" cy="7" r="3.2" />
        <path d="M22 21v-1a4 4 0 0 0-3-3.87" />
        <path d="M15.5 3.4a3.2 3.2 0 0 1 0 6.2" />
      </symbol>
      <symbol id="i-smartphone" viewBox="0 0 24 24">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </symbol>
      <symbol id="i-code" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </symbol>
      <symbol id="i-terminal" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <polyline points="7 9 11 12 7 15" />
        <line x1="12" y1="15" x2="16" y2="15" />
      </symbol>
      <symbol id="i-refresh" viewBox="0 0 24 24">
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <polyline points="21 3 21 9 15 9" />
      </symbol>
      <symbol id="i-layout" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="9" x2="9" y2="21" />
      </symbol>
      <symbol id="i-user-check" viewBox="0 0 24 24">
        <circle cx="9" cy="8" r="4" />
        <path d="M2 21v-1a7 7 0 0 1 14 0v1" />
        <polyline points="17 11 19.2 13.2 23 9" />
      </symbol>
      <symbol id="i-bulb" viewBox="0 0 24 24">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a6 6 0 0 0-4 10.5c.6.5 1 1.5 1 2.5h6c0-1 .4-2 1-2.5A6 6 0 0 0 12 2z" />
      </symbol>
      <symbol id="i-target" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
      </symbol>
      <symbol id="i-send" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </symbol>
      <symbol id="i-branch" viewBox="0 0 24 24">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="6" cy="18" r="2.2" />
        <circle cx="18" cy="6" r="2.2" />
        <path d="M18 8.2a6 6 0 0 1-6 6h-1" />
      </symbol>
      <symbol id="i-bars" viewBox="0 0 24 24">
        <line x1="5" y1="20" x2="5" y2="13" />
        <line x1="12" y1="20" x2="12" y2="7" />
        <line x1="19" y1="20" x2="19" y2="11" />
        <line x1="3" y1="20" x2="21" y2="20" />
      </symbol>
      <symbol id="i-mail" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3 7 12 13 21 7" />
      </symbol>
      <symbol id="i-phone" viewBox="0 0 24 24">
        <path d="M5 4h3l2 5-2.3 1.5a11 11 0 0 0 5.3 5.3L14.5 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3.2 6.2 2 2 0 0 1 5 4z" />
      </symbol>
      <symbol id="i-pin" viewBox="0 0 24 24">
        <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.4" />
      </symbol>
      <symbol id="i-globe" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <path d="M12 3a13 13 0 0 1 0 18" />
        <path d="M12 3a13 13 0 0 0 0 18" />
      </symbol>
      <symbol id="i-flag" viewBox="0 0 24 24">
        <line x1="5" y1="3" x2="5" y2="21" />
        <path d="M5 4h13l-3 4 3 4H5z" />
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <polyline points="8 12.5 11 15.5 16 9" />
      </symbol>
      <symbol id="i-chat" viewBox="0 0 24 24">
        <rect x="3" y="4.5" width="18" height="12.5" rx="6" />
        <path d="M8 17l-1.6 3.6 4.6-2.6" />
      </symbol>
      <symbol id="i-briefcase" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="2" y1="13" x2="22" y2="13" />
      </symbol>
    </svg>
  );
}

export function SvgIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={id} />
    </svg>
  );
}