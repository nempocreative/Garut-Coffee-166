import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import type { HomeIconName } from '@workspace/kopi-garut-shared';

type MenuIllustrationProps = {
  name: HomeIconName;
  size?: number;
  colors: {
    foreground: string;
    primary: string;
    accent: string;
    card: string;
  };
};

export function MenuIllustration({ name, size = 58, colors }: MenuIllustrationProps) {
  const ink = colors.foreground;
  const paper = colors.card;
  const warm = colors.primary;
  const green = colors.accent;
  const line = {
    stroke: ink,
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path d="M12 83c18-7 57-7 76 0-13 8-61 9-76 0Z" fill={ink} opacity={0.12} />
      {name === 'coffee' && (
        <>
          <Path d="M25 31 48 24l24 8-4 48H29Z" fill={warm} {...line} />
          <Path d="m25 31 23 8 24-7M48 39v41M37 50h20M39 56h16" fill="none" {...line} />
          <Ellipse cx="78" cy="61" rx="9" ry="3" fill={ink} {...line} />
          <Path d="M69 61h18v12a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8V61ZM87 65h2a5 5 0 0 1 0 9h-2M64 83h29" fill={paper} {...line} />
          <Ellipse cx="18" cy="36" rx="4.5" ry="10" fill={green} {...line} transform="rotate(-36 18 36)" />
          <Ellipse cx="14" cy="50" rx="4.5" ry="10" fill={green} {...line} transform="rotate(-58 14 50)" />
          <Path d="M18 62c3-14 4-24 2-34" fill="none" {...line} />
        </>
      )}
      {name === 'users' && (
        <>
          <Path d="M18 33c13-9 33-9 47 0l-4 46H23Z" fill={paper} {...line} />
          <Path d="m18 33 24 8 23-8M42 41v37M27 54h17M27 60h14" fill="none" {...line} />
          <Circle cx="72" cy="48" r="11" fill={warm} {...line} />
          <Path d="M55 83c1-14 7-21 17-21s16 7 17 21Z" fill={green} {...line} />
          <Path d="M61 44c3-7 13-11 22-4-7-1-14 0-22 4Z" fill={ink} {...line} />
          <Path d="M29 27c8-8 18-9 29-3" fill="none" {...line} />
        </>
      )}
      {name === 'map' && (
        <>
          <Path d="m10 65 25-8 30 8 25-8v23l-25 8-30-8-25 8Z" fill={paper} {...line} />
          <Path d="m10 65 25-8 30 8 25-8M35 57v23M65 65v23" fill="none" {...line} />
          <Path d="m17 58 15-18 10 12 13-21 27 30" fill={green} opacity={0.86} {...line} />
          <Path d="M76 32c0 10-12 19-12 19S52 42 52 32a12 12 0 1 1 24 0Z" fill={warm} {...line} />
          <Circle cx="64" cy="32" r="3.5" fill={paper} {...line} />
        </>
      )}
      {name === 'compass' && (
        <>
          <Path d="M25 33c13-9 31-9 45 0l-4 47H29Z" fill={warm} {...line} />
          <Path d="m25 33 22 8 23-8M47 41v39M37 53h20M39 59h16" fill="none" {...line} />
          <Circle cx="77" cy="36" r="16" fill={paper} {...line} />
          <Path d="m84 28-5 11-11 5 5-11 11-5Z" fill={green} {...line} />
          <Circle cx="77" cy="36" r="2.5" fill={warm} {...line} />
        </>
      )}
      {name === 'calendar' && (
        <>
          <Rect x="19" y="25" width="62" height="54" rx="6" fill={paper} {...line} />
          <Path d="M19 42h62M33 20v11M67 20v11" fill="none" {...line} />
          <Path d="M28 51h10v9H28ZM45 51h10v9H45ZM62 51h10v9H62ZM28 65h10v9H28ZM45 65h10v9H45ZM62 65h10v9H62Z" fill={warm} opacity={0.82} />
          <Ellipse cx="24" cy="21" rx="4" ry="8" fill={green} {...line} transform="rotate(-28 24 21)" />
        </>
      )}
      {name === 'graduation-cap' && (
        <>
          <Path d="m12 37 38-19 38 19-38 19-38-19Z" fill={warm} {...line} />
          <Path d="M26 45v19c12 9 28 9 40 0V45L50 55 26 45ZM87 39v24" fill={paper} {...line} />
          <Circle cx="87" cy="67" r="3" fill={green} {...line} />
          <Path d="m31 36 19-9 19 10-19 8-19-9Z" fill={colors.accent} opacity={0.7} />
        </>
      )}
      {name === 'briefcase' && (
        <>
          <Path d="M16 39h58v40H16Z" fill={paper} {...line} />
          <Path d="M16 50h58M38 50v8h14v-8M36 39v-9h18v9" fill="none" {...line} />
          <Path d="M16 53h58v7H16Z" fill={warm} opacity={0.72} />
          <Path d="M76 45c-5-12-10-19-17-23M63 25c8 1 14 7 16 17" fill="none" {...line} />
          <Ellipse cx="28" cy="85" rx="6" ry="3" fill={ink} transform="rotate(-16 28 85)" />
        </>
      )}
      {name === 'grid' && (
        <>
          <Path d="M15 29h27v24H15ZM48 29h27v24H48ZM15 58h27v24H15ZM48 58h27v24H48Z" fill={paper} {...line} />
          <Path d="M21 35h15v12H21ZM54 35h15v12H54ZM21 64h15v12H21ZM54 64h15v12H54Z" fill={warm} opacity={0.8} />
          <Path d="M22 21c8-7 19-8 28-4M51 17c9-5 18-3 27 4" fill="none" {...line} />
          <Ellipse cx="80" cy="85" rx="6" ry="3" fill={ink} transform="rotate(-18 80 85)" />
        </>
      )}
      {name === 'shield' && (
        <>
          <Path d="M50 17 80 28v23c0 18-13 29-30 36-17-7-30-18-30-36V28Z" fill={paper} {...line} />
          <Path d="M50 27 69 34v17c0 12-7 20-19 27-12-7-19-15-19-27V34Z" fill={green} opacity={0.78} {...line} />
          <Path d="m39 50 8 8 15-16" fill="none" {...line} />
        </>
      )}
      {name === 'alert-circle' && (
        <>
          <Path d="M27 33 50 24l23 9-4 48H31Z" fill={warm} {...line} />
          <Path d="m27 33 23 8 23-8M50 41v39" fill="none" {...line} />
          <Circle cx="50" cy="60" r="13" fill={paper} {...line} />
          <Path d="M50 51v11M50 68h.01" fill="none" {...line} />
          <Ellipse cx="20" cy="37" rx="4" ry="9" fill={green} {...line} transform="rotate(-40 20 37)" />
        </>
      )}
      {name === 'package' && (
        <>
          <Path d="m14 37 36-16 36 16v41L50 93 14 78V37Z" fill={paper} {...line} />
          <Path d="m14 37 36 17 36-17M50 54v39M14 37l36-16 36 16-36 17-36-17Z" fill="none" {...line} />
          <Path d="M26 27c-6 4-10 9-12 16M74 26c6 3 10 8 12 15" fill="none" {...line} />
          <Ellipse cx="78" cy="88" rx="6" ry="3" fill={ink} transform="rotate(-18 78 88)" />
        </>
      )}
    </Svg>
  );
}