import type { HomeIconName } from '@workspace/kopi-garut-shared';

type MenuIllustrationProps = {
  name: HomeIconName;
  size?: number;
  className?: string;
};

type Palette = {
  paper: string;
  warm: string;
  dark: string;
  green: string;
  gold: string;
  ink: string;
};

const palettes: Palette[] = [
  { paper: '#f7d9ae', warm: '#bd6848', dark: '#6a3529', green: '#4e6f4e', gold: '#f2ba58', ink: '#4a2b24' },
  { paper: '#f2c69b', warm: '#d27c55', dark: '#6f3d2c', green: '#355c55', gold: '#f6cf6e', ink: '#472d27' },
  { paper: '#e9dfbd', warm: '#8d9b61', dark: '#4a6547', green: '#2f5547', gold: '#e9b85b', ink: '#3f3026' },
  { paper: '#f0d5d0', warm: '#a56c8c', dark: '#573b57', green: '#466555', gold: '#f2c56b', ink: '#46313a' },
];

const leaf = (x: number, y: number, rotation: number, fill: string) => (
  <ellipse cx={x} cy={y} rx="4" ry="10" fill={fill} stroke="var(--menu-ink)" strokeWidth="1.2" transform={`rotate(${rotation} ${x} ${y})`} />
);

export function MenuIllustration({ name, size = 92, className }: MenuIllustrationProps) {
  const palette = palettes[Math.max(0, ['coffee', 'users', 'map', 'compass', 'calendar', 'graduation-cap', 'briefcase', 'grid', 'shield', 'alert-circle', 'package'].indexOf(name)) % palettes.length];
  const stroke = { stroke: palette.ink, strokeWidth: 1.65, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="presentation"
      aria-hidden="true"
      style={{ display: 'block', ['--menu-ink' as string]: palette.ink }}
    >
      <path d="M14 82c17-6 55-6 72 0-12 9-58 10-72 0Z" fill={palette.dark} opacity=".12" />
      <path d="M8 29c7-12 16-17 27-19 7 5 9 15 3 23-9 11-22 12-30-4Z" fill={palette.paper} opacity=".78" />
      <path d="M92 72c-7 10-17 15-29 15-5-7-3-15 5-20 9-8 19-6 24 5Z" fill={palette.gold} opacity=".2" />

      {name === 'coffee' && (
        <>
          <path d="M26 35 48 28l21 8-4 43H30Z" fill={palette.warm} {...stroke} />
          <path d="m26 35 22 8 21-7M48 43v35" fill="none" {...stroke} />
          <path d="M38 51c5 3 11 3 17 0M39 57h14" fill="none" {...stroke} />
          <path d="M70 61h15v11a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7V61Z" fill={palette.paper} {...stroke} />
          <path d="M85 64h2a5 5 0 0 1 0 9h-2M66 82h26" fill="none" {...stroke} />
          <ellipse cx="77" cy="61" rx="7.5" ry="2.5" fill={palette.dark} {...stroke} />
          {leaf(18, 36, -36, palette.green)}
          {leaf(14, 50, -54, palette.green)}
          <path d="M18 60c3-12 4-21 2-29" fill="none" {...stroke} />
          <ellipse cx="40" cy="84" rx="5" ry="2.5" fill={palette.dark} transform="rotate(-18 40 84)" />
          <ellipse cx="51" cy="86" rx="5" ry="2.5" fill={palette.warm} transform="rotate(22 51 86)" />
        </>
      )}

      {name === 'users' && (
        <>
          <path d="M20 36c12-9 32-9 45 0l-4 40H25Z" fill={palette.paper} {...stroke} />
          <path d="m20 36 23 8 22-8M43 44v31" fill="none" {...stroke} />
          <path d="M27 56h16M27 62h13" fill="none" {...stroke} />
          <circle cx="70" cy="47" r="10" fill={palette.warm} {...stroke} />
          <path d="M55 80c1-14 7-21 16-21s15 7 16 21Z" fill={palette.green} {...stroke} />
          <path d="M59 44c4-8 14-10 21-3-6-1-12 0-21 3Z" fill={palette.dark} {...stroke} />
          <path d="M32 28c8-8 19-9 28-2M31 29c-4-6-7-9-12-9" fill="none" {...stroke} />
          {leaf(16, 19, -38, palette.green)}
          {leaf(79, 25, 45, palette.green)}
          <path d="M77 28c-7 9-11 16-13 24" fill="none" {...stroke} />
        </>
      )}

      {name === 'map' && (
        <>
          <path d="m11 66 25-8 28 8 25-8v22l-25 8-28-8-25 8Z" fill={palette.paper} {...stroke} />
          <path d="m11 66 25-8 28 8 25-8M36 58v22M64 66v22" fill="none" {...stroke} />
          <path d="m18 59 14-17 10 11 12-20 24 27" fill={palette.green} opacity=".85" {...stroke} />
          <path d="m44 53 10-20 11 14" fill={palette.warm} opacity=".88" {...stroke} />
          <path d="M73 31c0 9-11 17-11 17S51 40 51 31a11 11 0 1 1 22 0Z" fill={palette.warm} {...stroke} />
          <circle cx="62" cy="31" r="3.5" fill={palette.paper} {...stroke} />
          {leaf(19, 29, -38, palette.green)}
          {leaf(28, 24, 30, palette.green)}
          <path d="M20 48c2-9 5-15 9-21" fill="none" {...stroke} />
        </>
      )}

      {name === 'compass' && (
        <>
          <path d="M26 36c12-8 29-8 42 0l-4 39H30Z" fill={palette.warm} {...stroke} />
          <path d="m26 36 21 8 21-8M47 44v30" fill="none" {...stroke} />
          <path d="M37 56c5 3 10 3 16 0M39 62h13" fill="none" {...stroke} />
          <circle cx="75" cy="38" r="15" fill={palette.paper} {...stroke} />
          <path d="m81 31-5 10-10 5 5-10 10-5Z" fill={palette.warm} {...stroke} />
          <circle cx="75" cy="38" r="2.5" fill={palette.green} {...stroke} />
          {leaf(18, 33, -40, palette.green)}
          {leaf(15, 47, -60, palette.green)}
          <path d="M18 58c4-13 5-22 2-31" fill="none" {...stroke} />
        </>
      )}

      {name === 'calendar' && (
        <>
          <rect x="21" y="25" width="58" height="53" rx="6" fill={palette.paper} {...stroke} />
          <path d="M21 42h58M34 20v11M66 20v11" fill="none" {...stroke} />
          <path d="M30 51h9v8h-9ZM45 51h9v8h-9ZM60 51h9v8h-9ZM30 64h9v8h-9ZM45 64h9v8h-9Z" fill={palette.warm} opacity=".86" />
          <path d="M60 64h9v8h-9Z" fill={palette.green} opacity=".86" />
          <ellipse cx="28" cy="21" rx="4" ry="7" fill={palette.green} {...stroke} transform="rotate(-26 28 21)" />
          <ellipse cx="77" cy="79" rx="5" ry="2.5" fill={palette.dark} transform="rotate(-20 77 79)" />
        </>
      )}

      {name === 'graduation-cap' && (
        <>
          <path d="m14 37 35-18 37 18-37 18-35-18Z" fill={palette.warm} {...stroke} />
          <path d="M27 45v18c11 9 27 9 39 0V45L49 54 27 45Z" fill={palette.paper} {...stroke} />
          <path d="M85 39v22" fill="none" {...stroke} />
          <circle cx="85" cy="64" r="3" fill={palette.gold} {...stroke} />
          <path d="m33 36 16-8 18 9-18 8-16-9Z" fill={palette.gold} opacity=".75" />
          {leaf(20, 74, -30, palette.green)}
          {leaf(13, 64, -58, palette.green)}
          <path d="M20 84c3-11 5-19 2-28" fill="none" {...stroke} />
          <ellipse cx="75" cy="83" rx="6" ry="3" fill={palette.dark} transform="rotate(18 75 83)" />
        </>
      )}

      {name === 'briefcase' && (
        <>
          <path d="M17 39h56v38H17Z" fill={palette.paper} {...stroke} />
          <path d="M17 49h56M39 49v8h12v-8M37 39v-8h16v8" fill="none" {...stroke} />
          <path d="M17 52h56v7H17Z" fill={palette.warm} opacity=".72" />
          <path d="M68 23c7 5 11 12 10 21M73 22c-7 3-11 8-13 15" fill="none" {...stroke} />
          {leaf(80, 21, 55, palette.green)}
          {leaf(61, 25, -42, palette.green)}
          <path d="M77 45c-6-11-10-17-15-22" fill="none" {...stroke} />
          <ellipse cx="28" cy="83" rx="6" ry="3" fill={palette.dark} transform="rotate(-16 28 83)" />
          <ellipse cx="40" cy="85" rx="5" ry="2.5" fill={palette.warm} transform="rotate(15 40 85)" />
        </>
      )}

      {name === 'grid' && (
        <>
          <path d="M17 30h24v22H17ZM48 30h24v22H48ZM17 57h24v22H17ZM48 57h24v22H48Z" fill={palette.paper} {...stroke} />
          <path d="M22 35h14v12H22ZM53 35h14v12H53ZM22 62h14v12H22ZM53 62h14v12H53Z" fill={palette.warm} opacity=".78" />
          <path d="M21 23c9-7 20-9 30-5M49 18c9-6 18-5 28 2" fill="none" {...stroke} />
          {leaf(23, 18, -34, palette.green)}
          {leaf(74, 18, 43, palette.green)}
          <ellipse cx="81" cy="83" rx="6" ry="3" fill={palette.dark} transform="rotate(-15 81 83)" />
        </>
      )}

      {name === 'shield' && (
        <>
          <path d="M50 18 78 28v22c0 17-12 27-28 34-16-7-28-17-28-34V28Z" fill={palette.paper} {...stroke} />
          <path d="M50 27 68 34v16c0 11-7 19-18 25-11-6-18-14-18-25V34Z" fill={palette.green} opacity=".8" {...stroke} />
          <path d="m40 49 7 7 14-15" fill="none" {...stroke} />
          <path d="M19 23c5-7 10-10 17-12M81 23c-5-7-10-10-17-12" fill="none" {...stroke} />
          {leaf(17, 18, -40, palette.green)}
          {leaf(83, 18, 40, palette.green)}
        </>
      )}

      {name === 'alert-circle' && (
        <>
          <path d="M29 33 50 24l21 9-3 45H32Z" fill={palette.warm} {...stroke} />
          <path d="m29 33 21 8 21-8M50 41v36" fill="none" {...stroke} />
          <circle cx="50" cy="59" r="12" fill={palette.paper} {...stroke} />
          <path d="M50 51v10M50 66h.01" fill="none" {...stroke} />
          {leaf(22, 35, -38, palette.green)}
          {leaf(17, 48, -60, palette.green)}
          <path d="M22 59c2-10 3-17 1-24" fill="none" {...stroke} />
        </>
      )}

      {name === 'package' && (
        <>
          <path d="m17 37 33-15 33 15v39L50 91 17 76V37Z" fill={palette.paper} {...stroke} />
          <path d="m17 37 33 16 33-16M50 53v38" fill="none" {...stroke} />
          <path d="m17 37 33-15 33 15-33 16-33-16Z" fill={palette.warm} opacity=".74" {...stroke} />
          <path d="M60 29c6 2 11 6 14 12M39 27c-7 3-11 8-13 15" fill="none" {...stroke} />
          {leaf(28, 25, -45, palette.green)}
          {leaf(71, 27, 40, palette.green)}
          <ellipse cx="75" cy="86" rx="6" ry="3" fill={palette.dark} transform="rotate(-18 75 86)" />
        </>
      )}
    </svg>
  );
}