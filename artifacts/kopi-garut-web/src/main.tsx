import { createRoot } from 'react-dom/client';
import { brandTokens } from '@workspace/kopi-garut-shared';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

const hexToHsl = (hex: string) => {
  const value = hex.replace('#', '');
  const red = Number.parseInt(value.slice(0, 2), 16) / 255;
  const green = Number.parseInt(value.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(value.slice(4, 6), 16) / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  if (max === min) return `0 0% ${Math.round(lightness * 100)}%`;
  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;
  if (max === red) hue = ((green - blue) / delta + (green < blue ? 6 : 0)) / 6;
  else if (max === green) hue = ((blue - red) / delta + 2) / 6;
  else hue = ((red - green) / delta + 4) / 6;
  return `${Math.round(hue * 360)} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%`;
};

const cssTokenMap = {
  background: 'background',
  foreground: 'foreground',
  border: 'border',
  input: 'input',
  card: 'card',
  cardForeground: 'card-foreground',
  primary: 'primary',
  primaryForeground: 'primary-foreground',
  secondary: 'secondary',
  secondaryForeground: 'secondary-foreground',
  muted: 'muted',
  mutedForeground: 'muted-foreground',
  accent: 'accent',
  accentForeground: 'accent-foreground',
  destructive: 'destructive',
  destructiveForeground: 'destructive-foreground',
} as const;

const rootStyle = document.documentElement.style;
Object.entries(cssTokenMap).forEach(([token, cssName]) => {
  rootStyle.setProperty(`--${cssName}`, hexToHsl(brandTokens[token as keyof typeof brandTokens]));
});
rootStyle.setProperty('--ring', hexToHsl(brandTokens.primary));

createRoot(document.getElementById('root')!, {
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
