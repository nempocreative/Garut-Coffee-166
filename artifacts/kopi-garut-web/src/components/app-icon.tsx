import type { CSSProperties } from 'react';
import { brandTokens } from '@workspace/kopi-garut-shared';

export type AppIconName =
  | 'arrow-up-right'
  | 'arrow-left'
  | 'bell'
  | 'briefcase'
  | 'calendar'
  | 'chevron-right'
  | 'coffee'
  | 'compass'
  | 'graduation-cap'
  | 'heart'
  | 'home'
  | 'map'
  | 'map-pin'
  | 'maximize'
  | 'minus'
  | 'network'
  | 'package'
  | 'plus'
  | 'search'
  | 'scan'
  | 'send'
  | 'settings'
  | 'shield'
  | 'shopping-bag'
  | 'sliders'
  | 'sparkles'
  | 'trending-up'
  | 'user'
  | 'users'
  | 'bar-chart-2'
  | 'barcode'
  | 'check'
  | 'farmer'
  | 'x';

type AppIconProps = {
  name: AppIconName;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
};

export function AppIcon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.8,
  className,
  style,
}: AppIconProps) {
  const line = {
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: 'inline-block', flexShrink: 0, verticalAlign: 'middle', ...style }}
    >
      {name === 'arrow-up-right' && <path d="M7 17 17 7M9 7h8v8" {...line} />}
      {name === 'arrow-left' && <path d="m15 6-6 6 6 6M9 12h11" {...line} />}
      {name === 'bell' && (
        <>
          <path d="M6.5 17.5h11l-1.3-2v-4a4.7 4.7 0 0 0-9.4 0v4l-1.3 2Z" {...line} />
          <path d="M10 20a2.2 2.2 0 0 0 4 0M12 4.2v1.1" {...line} />
        </>
      )}
      {name === 'briefcase' && (
        <>
          <rect x="3.5" y="7.5" width="17" height="12.5" rx="2" {...line} />
          <path d="M8.5 7.5v-2h7v2M3.5 12h17M10 12v2h4v-2" {...line} />
        </>
      )}
      {name === 'calendar' && (
        <>
          <rect x="4" y="5.5" width="16" height="15" rx="2" {...line} />
          <path d="M8 3.5v4M16 3.5v4M4 10h16" {...line} />
        </>
      )}
      {name === 'chevron-right' && <path d="m9 5 7 7-7 7" {...line} />}
      {name === 'coffee' && (
        <>
          <path d="M5 8h11v5.5A4.5 4.5 0 0 1 11.5 18h-2A4.5 4.5 0 0 1 5 13.5V8Z" {...line} />
          <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M3.5 21h14" {...line} />
          <path d="M8 5.5c-1-1 .5-1.5 0-3M11 5.5c-1-1 .5-1.5 0-3" {...line} />
        </>
      )}
      {name === 'barcode' && (
        <>
          <path d="M4.5 5.5v13M7.2 5.5v13M10 5.5v13M13.2 5.5v13M16 5.5v13M19 5.5v13" {...line} />
          <path d="M3.5 5.5h17M3.5 18.5h17" {...line} opacity=".42" />
          <path d="M4.5 8.2h1.1M13.2 15.8h1.1M19 10.3h1" {...line} strokeWidth={strokeWidth + .35} />
        </>
      )}
      {name === 'compass' && (
        <>
          <circle cx="12" cy="12" r="8.5" {...line} />
          <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" {...line} />
        </>
      )}
      {name === 'graduation-cap' && (
        <>
          <path d="m3 9 9-5 9 5-9 5-9-5Z" {...line} />
          <path d="M6 11v4.5c3.4 2.5 8.6 2.5 12 0V11M21 10v5" {...line} />
          <circle cx="21" cy="16.5" r=".8" fill={color} stroke={color} strokeWidth="1" />
        </>
      )}
      {name === 'heart' && <path d="M20.5 8.8c0 5-8.5 10-8.5 10s-8.5-5-8.5-10A4.5 4.5 0 0 1 12 6.2a4.5 4.5 0 0 1 8.5 2.6Z" {...line} />}
      {name === 'home' && (
        <>
          <path d="M3.5 10.5 12 3.5l8.5 7" {...line} />
          <path d="M5.5 9.5V20h13V9.5M9.5 20v-5h5v5" {...line} />
        </>
      )}
      {name === 'map' && (
        <>
          <path d="m3.5 5.5 5.5-2 6 2 5.5-2v15l-5.5 2-6-2-5.5 2v-15Z" {...line} />
          <path d="M9 3.5v15M15 5.5v15" {...line} />
        </>
      )}
      {name === 'map-pin' && (
        <>
          <path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" {...line} />
          <circle cx="12" cy="10" r="2.2" {...line} />
        </>
      )}
      {name === 'maximize' && <path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5" {...line} />}
      {name === 'minus' && <path d="M5 12h14" {...line} />}
      {name === 'network' && (
        <>
          <path d="m8.2 8.2 2.5 2.5m5.1-2.5-2.5 2.5m-3.2 2.6-2.5 2.5m5.1-2.5 2.5 2.5" {...line} />
          <circle cx="6.5" cy="6.5" r="2.2" {...line} />
          <circle cx="17.5" cy="6.5" r="2.2" {...line} />
          <circle cx="12" cy="12" r="2.2" {...line} />
          <circle cx="6.5" cy="17.5" r="2.2" {...line} />
          <circle cx="17.5" cy="17.5" r="2.2" {...line} />
        </>
      )}
      {name === 'package' && (
        <>
          <path d="m4 7 8-3.5L20 7v10l-8 3.5L4 17V7Z" {...line} />
          <path d="m4 7 8 4 8-4M12 11v9" {...line} />
        </>
      )}
      {name === 'plus' && <path d="M12 5v14M5 12h14" {...line} />}
      {name === 'search' && (
        <>
          <circle cx="10.8" cy="10.8" r="6.3" {...line} />
          <path d="m16 16 4.5 4.5" {...line} />
        </>
      )}
      {name === 'scan' && (
        <>
          <path d="M8 3.5H5.5a2 2 0 0 0-2 2V8M16 3.5h2.5a2 2 0 0 1 2 2V8M8 20.5H5.5a2 2 0 0 1-2-2V16M16 20.5h2.5a2 2 0 0 0 2-2V16" {...line} />
          <path d="M8 9v6M10.2 10.5v3M12.4 9v6M14.6 10.5v3M16.8 9v6" {...line} />
          <path d="M6.5 12h11" {...line} opacity=".45" strokeWidth={strokeWidth + .35} />
        </>
      )}
      {name === 'send' && <path d="m3.5 11.5 17-8-5 17-4-7-8-2ZM11.5 13.5l9-10" {...line} />}
      {name === 'settings' && (
        <>
          <circle cx="12" cy="12" r="3" {...line} />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2.5V20a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.5h.4a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.5v.4a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v2.5h-.2a1.7 1.7 0 0 0-1.5 1.1Z" {...line} />
        </>
      )}
      {name === 'shield' && <path d="M12 3.5 19 6v5.5c0 4.2-2.8 7.5-7 9-4.2-1.5-7-4.8-7-9V6l7-2.5Z" {...line} />}
      {name === 'shopping-bag' && (
        <>
          <path d="M5 8.5h14l-1 11H6l-1-11Z" {...line} />
          <path d="M9 9V6.5a3 3 0 0 1 6 0V9" {...line} />
        </>
      )}
      {name === 'sliders' && (
        <>
          <line x1="4" y1="6" x2="20" y2="6" {...line} />
          <line x1="4" y1="12" x2="20" y2="12" {...line} />
          <line x1="4" y1="18" x2="20" y2="18" {...line} />
          <circle cx="9" cy="6" r="1.8" fill={color} stroke={color} strokeWidth="1" />
          <circle cx="15" cy="12" r="1.8" fill={color} stroke={color} strokeWidth="1" />
          <circle cx="11" cy="18" r="1.8" fill={color} stroke={color} strokeWidth="1" />
        </>
      )}
      {name === 'sparkles' && (
        <>
          <path d="m9 3 1.6 5.4L16 10l-5.4 1.6L9 17l-1.6-5.4L2 10l5.4-1.6L9 3Z" {...line} />
          <path d="m18 14 .9 2.6 2.6.9-2.6.9L18 21l-.9-2.6-2.6-.9 2.6-.9L18 14Z" {...line} />
        </>
      )}
      {name === 'trending-up' && <path d="m4 16 5-5 3.5 3.5L20 7M15 7h5v5" {...line} />}
      {name === 'user' && (
        <>
          <circle cx="12" cy="8" r="3.25" {...line} />
          <path d="M4.5 20c.7-3.8 3.2-6 7.5-6s6.8 2.2 7.5 6" {...line} />
        </>
      )}
      {name === 'farmer' && (
        <>
          <path d="M4 8.2c2.4-2.7 5.1-4 8-4s5.6 1.3 8 4c-2.4.8-5.1 1.2-8 1.2S6.4 9 4 8.2Z" {...line} />
          <path d="M6.4 8.8c.2 3.2 2.2 5.2 5.6 5.2s5.4-2 5.6-5.2" {...line} />
          <path d="M9.2 11.2c.7.6 1.6.9 2.8.9s2.1-.3 2.8-.9M10 13.8v1.3M14 13.8v1.3" {...line} />
          <path d="M4.5 20c.8-2.8 3.3-4.4 7.5-4.4s6.7 1.6 7.5 4.4" {...line} />
          <path d="M8.1 17.1 12 20l3.9-2.9" {...line} opacity=".72" />
        </>
      )}
      {name === 'users' && (
        <>
          <circle cx="9" cy="8" r="3" {...line} />
          <path d="M3.5 20c.5-3.6 2.3-5.5 5.5-5.5s5 1.9 5.5 5.5M15 5.5a3 3 0 0 1 0 5.8M16 14.7c2.2.7 3.5 2.4 4 5.3" {...line} />
        </>
      )}
      {name === 'bar-chart-2' && <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" {...line} />}
      {name === 'check' && <path d="m5 12.5 4.2 4.2L19.5 6.5" {...line} />}
      {name === 'x' && <path d="m6 6 12 12M18 6 6 18" {...line} />}
    </svg>
  );
}

export function AppNavGlyph({ name, size = 24 }: { name: 'bell' | 'shopping-cart'; size?: number }) {
  const main = brandTokens.primary;
  const light = brandTokens.accent;
  const shadow = brandTokens.foreground;
  const accent = brandTokens.primaryForeground;

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 30 30">
      {name === 'bell' ? (
        <>
          <path d="M5 20h20l-2.4-3.5v-4.7a7.6 7.6 0 0 0-15.2 0v4.7L5 20Z" fill={shadow} />
          <path d="M5 18.5h20l-2.4-3.5v-4.7a7.6 7.6 0 0 0-15.2 0V15L5 18.5Z" fill={main} />
          <path d="M7.6 13.5c.5-4.4 3-6.5 6.2-6.5 2.4 0 4.6 1.2 5.7 3.4-2.2-1.2-4.8-1.8-7.2-1.2-2.2.5-3.7 2-4.7 4.3Z" fill={light} opacity=".8" />
          <path d="M11 22c.8 2.6 7.2 2.6 8 0" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="15" cy="4.2" r="1.5" fill={accent} />
        </>
      ) : (
        <>
          <path d="M3.5 5.5h3l2 14h14l3-10H9.5" fill="none" stroke={shadow} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 4h3l2 14h14l3-10H9.5" fill="none" stroke={main} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 9.2h16l-2.3 8.2H10.2L9 9.2Z" fill={shadow} />
          <path d="M9 7.7h16l-2.3 8.2H10.2L9 7.7Z" fill={main} />
          <path d="M10.2 9.2h13.3l-.8 2.4H10.6l-.4-2.4Z" fill={light} opacity=".82" />
          <circle cx="11.5" cy="23.5" r="2" fill={shadow} />
          <circle cx="11.5" cy="22" r="2" fill={accent} />
          <circle cx="22" cy="23.5" r="2" fill={shadow} />
          <circle cx="22" cy="22" r="2" fill={accent} />
        </>
      )}
    </svg>
  );
}