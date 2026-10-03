import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';
import { brandTokens } from '@workspace/kopi-garut-shared';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';
import './orders-page.css';

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

const initialLoaderBean = document.querySelector<HTMLImageElement>('[data-initial-loader-bean]');
if (initialLoaderBean) {
  initialLoaderBean.src = `${import.meta.env.BASE_URL}assets/coffee-bean-menu.webp`;
}

function AppBootstrap() {
  useEffect(() => {
    const loader = document.getElementById('gb-initial-loader');
    const root = document.getElementById('root');
    if (!loader) {
      root?.removeAttribute('aria-hidden');
      root?.removeAttribute('inert');
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minimumVisibleMs = reducedMotion ? 180 : 1250;
    const startedAt = Number(loader.dataset.startedAt);
    const elapsed = Number.isFinite(startedAt) ? performance.now() - startedAt : 0;
    const dismissTimer = window.setTimeout(() => {
      loader.classList.add('is-hiding');

      let removalFallback: number;
      const finish = () => {
        window.clearTimeout(removalFallback);
        if (loader.isConnected) loader.remove();
        root?.removeAttribute('aria-hidden');
        root?.removeAttribute('inert');
      };

      loader.addEventListener('transitionend', finish, { once: true });
      removalFallback = window.setTimeout(finish, 700);
    }, Math.max(0, minimumVisibleMs - elapsed));

    return () => window.clearTimeout(dismissTimer);
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')!, {
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <AppBootstrap />
  </ErrorBoundary>,
);
