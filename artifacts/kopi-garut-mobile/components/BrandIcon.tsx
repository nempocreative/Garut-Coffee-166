import React from 'react';
import { ColorValue } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

export type BrandIconName =
  | 'home'
  | 'grid'
  | 'package'
  | 'user'
  | 'search'
  | 'sliders'
  | 'arrow-up-right'
  | 'arrow-left'
  | 'plus'
  | 'minus'
  | 'chevron-right'
  | 'coffee'
  | 'users'
  | 'map'
  | 'map-pin'
  | 'compass'
  | 'trending-up'
  | 'calendar'
  | 'briefcase'
  | 'bar-chart-2'
  | 'maximize'
  | 'shopping-bag'
  | 'shopping-cart'
  | 'bell'
  | 'heart'
  | 'repeat'
  | 'check'
  | 'shield'
  | 'settings'
  | 'info'
  | 'lock'
  | 'circle'
  | 'alert-circle'
  | 'x'
  | 'send';

type BrandIconProps = {
  name: BrandIconName;
  size?: number;
  color: ColorValue;
  strokeWidth?: number;
};

const iconProps = (color: ColorValue, strokeWidth: number) => ({
  fill: 'none' as const,
  stroke: color,
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export function BrandIcon({ name, size = 20, color, strokeWidth = 1.8 }: BrandIconProps) {
  const props = iconProps(color, strokeWidth);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'home' && (
        <>
          <Path d="M3.5 10.5 12 3.5l8.5 7" {...props} />
          <Path d="M5.5 9.5V20h13V9.5M9.5 20v-5h5v5" {...props} />
        </>
      )}
      {name === 'grid' && (
        <>
          <Rect x="3.5" y="3.5" width="7" height="7" rx="1.5" {...props} />
          <Rect x="13.5" y="3.5" width="7" height="7" rx="1.5" {...props} />
          <Rect x="3.5" y="13.5" width="7" height="7" rx="1.5" {...props} />
          <Rect x="13.5" y="13.5" width="7" height="7" rx="1.5" {...props} />
        </>
      )}
      {name === 'package' && (
        <>
          <Path d="m4 7 8-3.5L20 7v10l-8 3.5L4 17V7Z" {...props} />
          <Path d="m4 7 8 4 8-4M12 11v9" {...props} />
        </>
      )}
      {name === 'user' && (
        <>
          <Circle cx="12" cy="8" r="3.25" {...props} />
          <Path d="M4.5 20c.7-3.8 3.2-6 7.5-6s6.8 2.2 7.5 6" {...props} />
        </>
      )}
      {name === 'search' && (
        <>
          <Circle cx="10.8" cy="10.8" r="6.3" {...props} />
          <Path d="m16 16 4.5 4.5" {...props} />
        </>
      )}
      {name === 'sliders' && (
        <>
          <Line x1="4" y1="6" x2="20" y2="6" {...props} />
          <Line x1="4" y1="12" x2="20" y2="12" {...props} />
          <Line x1="4" y1="18" x2="20" y2="18" {...props} />
          <Circle cx="9" cy="6" r="1.8" fill={color} stroke={color} strokeWidth="1" />
          <Circle cx="15" cy="12" r="1.8" fill={color} stroke={color} strokeWidth="1" />
          <Circle cx="11" cy="18" r="1.8" fill={color} stroke={color} strokeWidth="1" />
        </>
      )}
      {name === 'arrow-up-right' && (
        <>
          <Path d="M7 17 17 7M9 7h8v8" {...props} />
        </>
      )}
      {name === 'arrow-left' && <Path d="m15 6-6 6 6 6M9 12h11" {...props} />}
      {name === 'plus' && <Path d="M12 5v14M5 12h14" {...props} />}
      {name === 'minus' && <Path d="M5 12h14" {...props} />}
      {name === 'chevron-right' && <Path d="m9 5 7 7-7 7" {...props} />}
      {name === 'coffee' && (
        <>
          <Path d="M5 8h11v5.5A4.5 4.5 0 0 1 11.5 18h-2A4.5 4.5 0 0 1 5 13.5V8Z" {...props} />
          <Path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M3.5 21h14" {...props} />
          <Path d="M8 5.5c-1-1 .5-1.5 0-3M11 5.5c-1-1 .5-1.5 0-3" {...props} />
        </>
      )}
      {name === 'users' && (
        <>
          <Circle cx="9" cy="8" r="3" {...props} />
          <Path d="M3.5 20c.5-3.6 2.3-5.5 5.5-5.5s5 1.9 5.5 5.5" {...props} />
          <Path d="M15 5.5a3 3 0 0 1 0 5.8M16 14.7c2.2.7 3.5 2.4 4 5.3" {...props} />
        </>
      )}
      {name === 'map' && (
        <>
          <Path d="m3.5 5.5 5.5-2 6 2 5.5-2v15l-5.5 2-6-2-5.5 2v-15Z" {...props} />
          <Path d="M9 3.5v15M15 5.5v15" {...props} />
        </>
      )}
      {name === 'map-pin' && (
        <>
          <Path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" {...props} />
          <Circle cx="12" cy="10" r="2.2" {...props} />
        </>
      )}
      {name === 'compass' && (
        <>
          <Circle cx="12" cy="12" r="8.5" {...props} />
          <Path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" {...props} />
        </>
      )}
      {name === 'trending-up' && <Path d="m4 16 5-5 3.5 3.5L20 7M15 7h5v5" {...props} />}
      {name === 'calendar' && (
        <>
          <Rect x="4" y="5.5" width="16" height="15" rx="2" {...props} />
          <Path d="M8 3.5v4M16 3.5v4M4 10h16" {...props} />
        </>
      )}
      {name === 'briefcase' && (
        <>
          <Rect x="3.5" y="7.5" width="17" height="12.5" rx="2" {...props} />
          <Path d="M8.5 7.5v-2h7v2M3.5 12h17M10 12v2h4v-2" {...props} />
        </>
      )}
      {name === 'bar-chart-2' && (
        <>
          <Path d="M4 20V10M10 20V4M16 20v-7M22 20H2" {...props} />
        </>
      )}
      {name === 'maximize' && <Path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5" {...props} />}
      {name === 'shopping-bag' && (
        <>
          <Path d="M5 8.5h14l-1 11H6l-1-11Z" {...props} />
          <Path d="M9 9V6.5a3 3 0 0 1 6 0V9" {...props} />
        </>
      )}
      {name === 'shopping-cart' && (
        <>
          <Path d="M4 5h2l1.6 10.5h10.8L21 8H7" {...props} />
          <Path d="M9 19.5h.01M17 19.5h.01" {...props} strokeWidth={2.6} />
          <Path d="M7.7 15.5h10.8" {...props} />
        </>
      )}
      {name === 'bell' && (
        <>
          <Path d="M6.5 17.5h11l-1.3-2v-4a4.7 4.7 0 0 0-9.4 0v4l-1.3 2Z" {...props} />
          <Path d="M10 20a2.2 2.2 0 0 0 4 0M12 4.2v1.1" {...props} />
        </>
      )}
      {name === 'heart' && <Path d="M20.5 8.8c0 5-8.5 10-8.5 10s-8.5-5-8.5-10A4.5 4.5 0 0 1 12 6.2a4.5 4.5 0 0 1 8.5 2.6Z" {...props} />}
      {name === 'repeat' && <Path d="M17 2.5 20.5 6 17 9.5M4 6h16M7 21.5 3.5 18 7 14.5M20 18H4" {...props} />}
      {name === 'check' && <Path d="m5 12.5 4.2 4.2L19.5 6.5" {...props} />}
      {name === 'shield' && <Path d="M12 3.5 19 6v5.5c0 4.2-2.8 7.5-7 9-4.2-1.5-7-4.8-7-9V6l7-2.5Z" {...props} />}
      {name === 'settings' && (
        <>
          <Circle cx="12" cy="12" r="3" {...props} />
          <Path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2.5V20a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.5h.4a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.5v.4a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v2.5h-.2a1.7 1.7 0 0 0-1.5 1.1Z" {...props} />
        </>
      )}
      {name === 'info' && (
        <>
          <Circle cx="12" cy="12" r="8.5" {...props} />
          <Path d="M12 11v5M12 8h.01" {...props} />
        </>
      )}
      {name === 'lock' && (
        <>
          <Rect x="5" y="10" width="14" height="10" rx="2" {...props} />
          <Path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" {...props} />
        </>
      )}
      {name === 'circle' && <Circle cx="12" cy="12" r="8.5" {...props} />}
      {name === 'alert-circle' && (
        <>
          <Circle cx="12" cy="12" r="8.5" {...props} />
          <Path d="M12 8v5M12 16h.01" {...props} />
        </>
      )}
      {name === 'x' && <Path d="m6 6 12 12M18 6 6 18" {...props} />}
      {name === 'send' && <Path d="m3.5 11.5 17-8-5 17-4-7-8-2Z M11.5 13.5 20.5 3.5" {...props} />}
    </Svg>
  );
}

export type ThreeDNavIconName = 'home' | 'grid' | 'coffee' | 'product' | 'orders' | 'account' | 'package' | 'user' | 'farmer' | 'scan' | 'bell' | 'shopping-cart';

type ThreeDNavIconProps = {
  name: ThreeDNavIconName;
  size?: number;
  mainColor: ColorValue;
  lightColor: ColorValue;
  shadowColor: ColorValue;
  accentColor: ColorValue;
};

/**
 * Small layered glyphs for the bottom navigation.
 *
 * Each icon is drawn with a dark extrusion, a front face, and a highlight
 * plane so it stays legible even when the tab bar is translucent.
 */
export function ThreeDNavIcon({
  name,
  size = 30,
  mainColor,
  lightColor,
  shadowColor,
  accentColor,
}: ThreeDNavIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30">
      {name === 'home' && (
        <>
          <Path d="m3.5 13 11.5-9.5L26.5 13v13h-23V13Z" fill={shadowColor} />
          <Path d="m3.5 11.5 11.5-9L26.5 11.5v13h-23v-13Z" fill={mainColor} />
          <Path d="m15 2.5 11.5 9-5.8 2.4L15 9.6 9.3 13.9 3.5 11.5l11.5-9Z" fill={lightColor} opacity={0.9} />
          <Path d="M10.5 24.5v-7h9v7" fill={accentColor} />
          <Path d="M12.5 24.5v-5h5v5" fill={mainColor} opacity={0.82} />
        </>
      )}
      {name === 'grid' && (
        <>
          <Path d="m4 6 7-2 5 2-7 2-5-2ZM17 10l8-2v7l-8 2v-7ZM4 19l7-2v7l-7 2v-7ZM17 20l8-2v7l-8 2v-7Z" fill={shadowColor} />
          <Path d="m3 4.5 7-2 5 2-7 2-5-2ZM16 8.5l8-2v7l-8 2v-7ZM3 17.5l7-2v7l-7 2v-7ZM16 18.5l8-2v7l-8 2v-7Z" fill={mainColor} />
          <Path d="m3 4.5 5 2v7l-5-2v-7ZM16 8.5l8-2v7l-8 2v-7ZM3 17.5l7-2v7l-7 2v-7ZM16 18.5l8-2v7l-8 2v-7Z" fill={lightColor} opacity={0.82} />
          <Path d="m10 2.5 5 2-7 2-5-2 7-2ZM24 6.5l-8 2 8-2ZM10 15.5l-7 2 7-2ZM24 16.5l-8 2 8-2Z" fill={accentColor} opacity={0.85} />
        </>
      )}
      {name === 'coffee' && (
        <>
          <Path d="M5 9h15v7a6 6 0 0 1-6 6h-3a6 6 0 0 1-6-6V9Z" fill={shadowColor} />
          <Path d="M4 7.5h15v7a6 6 0 0 1-6 6h-3a6 6 0 0 1-6-6v-7Z" fill={mainColor} />
          <Path d="M19 10h1.5a3.5 3.5 0 0 1 0 7H19" fill="none" stroke={shadowColor} strokeWidth="2.4" strokeLinecap="round" />
          <Path d="M19 8.5h1.5a3.5 3.5 0 0 1 0 7H19" fill="none" stroke={lightColor} strokeWidth="2.2" strokeLinecap="round" />
          <Path d="M7 12h9v2.5a4.5 4.5 0 0 1-4.5 4.5h-1A4.5 4.5 0 0 1 7 14.5V12Z" fill={lightColor} opacity={0.72} />
          <Path d="M8 4.5c-1.2-1.2.8-1.7 0-3M12 4.5c-1.2-1.2.8-1.7 0-3" fill="none" stroke={accentColor} strokeWidth="1.6" strokeLinecap="round" />
          <Path d="M3 24h17" fill="none" stroke={shadowColor} strokeWidth="2.4" strokeLinecap="round" />
          <Path d="M3 22.5h17" fill="none" stroke={mainColor} strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
      {name === 'package' && (
        <>
          <Path d="m3.5 9.5 11.5-5 11.5 5v13l-11.5 5-11.5-5v-13Z" fill={shadowColor} />
          <Path d="m3.5 8 11.5-5 11.5 5v13l-11.5 5-11.5-5V8Z" fill={mainColor} />
          <Path d="m3.5 8 11.5-5 11.5 5-11.5 5L3.5 8Z" fill={lightColor} />
          <Path d="m15 13 11.5-5v13L15 26V13Z" fill={accentColor} opacity={0.72} />
          <Path d="M15 13v13M3.5 8 15 13l11.5-5" fill="none" stroke={shadowColor} strokeWidth="1.4" strokeLinejoin="round" />
        </>
      )}
      {name === 'user' && (
        <>
          <Circle cx="15" cy="9.5" r="5" fill={shadowColor} />
          <Circle cx="15" cy="8" r="5" fill={mainColor} />
          <Circle cx="13.4" cy="6.5" r="1.7" fill={lightColor} opacity={0.92} />
          <Path d="M3.5 26c.7-6.2 4.3-9.5 11.5-9.5S25.8 19.8 26.5 26Z" fill={shadowColor} />
          <Path d="M3.5 24.5c.7-6.2 4.3-9.5 11.5-9.5s10.8 3.3 11.5 9.5Z" fill={mainColor} />
          <Path d="M15 15c5.3 0 9.1 2.4 10.7 6.8-3.1-1.9-6.7-2.9-10.7-2.9s-7.6 1-10.7 2.9C5.9 17.4 9.7 15 15 15Z" fill={lightColor} opacity={0.72} />
          <Path d="M9.2 23.3c3.8-1.2 7.7-1.2 11.6 0" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity={0.9} />
        </>
      )}
      {name === 'farmer' && (
        <>
          <Path d="M3 11 15 4l12 7c-7 2.8-17 2.8-24 0Z" fill={shadowColor} />
          <Path d="M3 9.5 15 2.5l12 7c-7 2.8-17 2.8-24 0Z" fill={mainColor} />
          <Path d="M7 8.8 15 4.1l8 4.7c-4.8 1.3-11.2 1.3-16 0Z" fill={lightColor} opacity={0.85} />
          <Circle cx="15" cy="16.5" r="5.3" fill={shadowColor} />
          <Circle cx="15" cy="15" r="5.3" fill={mainColor} />
          <Path d="M9 14.2c1.8-2.3 4-3.3 6.3-3.3 2.1 0 3.9.8 5.2 2.3-3.6-.5-7.4-.1-11.5 1Z" fill={lightColor} opacity={0.8} />
          <Path d="M7 29c.7-5.7 3.3-8.3 8-8.3s7.3 2.6 8 8.3Z" fill={shadowColor} />
          <Path d="M7 27.5c.7-5.7 3.3-8.3 8-8.3s7.3 2.6 8 8.3Z" fill={mainColor} />
          <Path d="M10.5 24.2c2.8-1.5 6.2-1.5 9 0v3.3h-9Z" fill={accentColor} opacity={0.82} />
          <Circle cx="12.8" cy="15.5" r="0.8" fill={accentColor} />
          <Circle cx="17.2" cy="15.5" r="0.8" fill={accentColor} />
        </>
      )}
      {name === 'scan' && (
        <>
          <Path d="M5 11H3V4h7v2H5v5ZM20 4h7v7h-2V6h-5V4ZM3 19h2v5h5v2H3v-7ZM25 19h2v7h-7v-2h5v-5Z" fill={shadowColor} />
          <Path d="M5 9.5H3V2.5h7v2H5v5ZM20 2.5h7v7h-2v-5h-5v-2ZM3 17.5h2v5h5v2H3v-7ZM25 17.5h2v7h-7v-2h5v-5Z" fill={mainColor} />
          <Path d="M5 4.5h5v1.4H6.5v3.6H5v-5ZM20 4.5h5v5h-1.5V5.9H20V4.5ZM5 18.5h1.5v3.6H10v1.4H5v-5ZM23.5 18.5H25v5h-5v-1.4h3.5v-3.6Z" fill={lightColor} />
          <Circle cx="15" cy="15" r="2.2" fill={accentColor} />
        </>
      )}
      {name === 'bell' && (
        <>
          <Path d="M5 20h20l-2.4-3.5v-4.7a7.6 7.6 0 0 0-15.2 0v4.7L5 20Z" fill={shadowColor} />
          <Path d="M5 18.5h20l-2.4-3.5v-4.7a7.6 7.6 0 0 0-15.2 0V15L5 18.5Z" fill={mainColor} />
          <Path d="M7.6 13.5c.5-4.4 3-6.5 6.2-6.5 2.4 0 4.6 1.2 5.7 3.4-2.2-1.2-4.8-1.8-7.2-1.2-2.2.5-3.7 2-4.7 4.3Z" fill={lightColor} opacity={0.8} />
          <Path d="M11 22c.8 2.6 7.2 2.6 8 0" fill="none" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
          <Circle cx="15" cy="4.2" r="1.5" fill={accentColor} />
        </>
      )}
      {name === 'shopping-cart' && (
        <>
          <Path d="M3.5 5.5h3l2 14h14l3-10H9.5" fill="none" stroke={shadowColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M3.5 4h3l2 14h14l3-10H9.5" fill="none" stroke={mainColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M9 9.2h16l-2.3 8.2H10.2L9 9.2Z" fill={shadowColor} />
          <Path d="M9 7.7h16l-2.3 8.2H10.2L9 7.7Z" fill={mainColor} />
          <Path d="M10.2 9.2h13.3l-.8 2.4H10.6l-.4-2.4Z" fill={lightColor} opacity={0.82} />
          <Circle cx="11.5" cy="23.5" r="2" fill={shadowColor} />
          <Circle cx="11.5" cy="22" r="2" fill={accentColor} />
          <Circle cx="22" cy="23.5" r="2" fill={shadowColor} />
          <Circle cx="22" cy="22" r="2" fill={accentColor} />
        </>
      )}
    </Svg>
  );
}