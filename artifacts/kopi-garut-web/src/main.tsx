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

const rootElement = document.getElementById('root');
const trackImage = (image: HTMLImageElement) => {
  image.dataset.gbImageState = image.complete && image.naturalWidth > 0 ? 'ready' : 'loading';
};
const trackImagesInNode = (node: Node) => {
  if (node instanceof HTMLImageElement) {
    trackImage(node);
    return;
  }
  if (node instanceof Element) {
    node.querySelectorAll('img').forEach(trackImage);
  }
};

if (rootElement) {
  const imageObserver = new MutationObserver((records) => {
    records.forEach((record) => {
      if (record.type === 'attributes' && record.target instanceof HTMLImageElement) {
        trackImage(record.target);
      }
      record.addedNodes.forEach(trackImagesInNode);
    });
  });
  imageObserver.observe(rootElement, {
    attributes: true,
    attributeFilter: ['src', 'srcset'],
    childList: true,
    subtree: true,
  });
  rootElement.querySelectorAll('img').forEach(trackImage);
}

document.addEventListener(
  'load',
  (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) return;
    const sourceAtLoad = image.currentSrc || image.src;
    const markReady = () => {
      if ((image.currentSrc || image.src) === sourceAtLoad && image.complete && image.naturalWidth > 0) {
        image.dataset.gbImageState = 'ready';
      }
    };
    if (typeof image.decode === 'function') {
      void image.decode().then(markReady, markReady);
    } else {
      markReady();
    }
  },
  true,
);

document.addEventListener(
  'error',
  (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) return;
    if (image.dataset.imageFallback === 'true') {
      image.dataset.gbImageState = 'ready';
      return;
    }

    image.dataset.imageFallback = 'true';
    image.dataset.gbImageState = 'loading';
    const imageDescription = `${image.alt} ${image.className}`.toLowerCase();
    const isSmallBrandMark = Math.max(image.clientWidth, image.clientHeight) <= 60
      || /logo|icon|avatar|app-nav-image/.test(imageDescription);
    const fallbackImage = isSmallBrandMark ? 'coffee-bean-menu.webp' : 'origin-coffee.webp';
    image.src = `${import.meta.env.BASE_URL}assets/${fallbackImage}`;
  },
  true,
);

function waitForImageReady(image: HTMLImageElement, timeoutMs: number) {
  return new Promise<void>((resolve) => {
    let timeout: number | undefined;
    let isSettled = false;
    const finish = () => {
      if (isSettled) return;
      isSettled = true;
      if (timeout !== undefined) window.clearTimeout(timeout);
      image.removeEventListener('load', onLoad);
      image.removeEventListener('error', finish);
      resolve();
    };
    const onLoad = () => {
      if (typeof image.decode === 'function') {
        void image.decode().then(finish, finish);
      } else {
        finish();
      }
    };

    timeout = window.setTimeout(finish, timeoutMs);
    if (image.complete) {
      if (image.naturalWidth > 0) onLoad();
      else finish();
      return;
    }
    image.addEventListener('load', onLoad, { once: true });
    image.addEventListener('error', finish, { once: true });
  });
}

function waitForVisibleImages(timeoutMs: number) {
  const visibleImages = Array.from(document.images).filter((image) => {
    if (image.loading === 'lazy') return false;
    const bounds = image.getBoundingClientRect();
    return bounds.width > 0
      && bounds.height > 0
      && bounds.top < window.innerHeight
      && bounds.bottom > 0
      && bounds.left < window.innerWidth
      && bounds.right > 0;
  });
  const imageLoads = visibleImages.map((image) => waitForImageReady(image, timeoutMs));
  if (document.querySelector('.gb-home .gb-header')) {
    const mastheadImage = new Image();
    mastheadImage.src = `${import.meta.env.BASE_URL}assets/garut-beans-header.webp`;
    imageLoads.push(waitForImageReady(mastheadImage, timeoutMs));
  }
  return Promise.all(imageLoads);
}

function AppBootstrap() {
  useEffect(() => {
    const loader = document.getElementById('gb-initial-loader');
    const root = rootElement;
    if (!loader) {
      root?.removeAttribute('aria-hidden');
      root?.removeAttribute('inert');
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const maximumWaitMs = reducedMotion ? 900 : 2200;
    let isDismissed = false;
    let maximumTimer: number | undefined;
    let removalFallback: number | undefined;
    const dismiss = () => {
      if (isDismissed) return;
      isDismissed = true;
      loader.classList.add('is-hiding');

      const finish = () => {
        if (removalFallback !== undefined) window.clearTimeout(removalFallback);
        loader.removeEventListener('transitionend', handleTransitionEnd);
        if (loader.isConnected) loader.remove();
        root?.removeAttribute('aria-hidden');
        root?.removeAttribute('inert');
      };
      const handleTransitionEnd = (event: TransitionEvent) => {
        if (event.target === loader) finish();
      };

      loader.addEventListener('transitionend', handleTransitionEnd);
      removalFallback = window.setTimeout(finish, 650);
    };
    maximumTimer = window.setTimeout(dismiss, maximumWaitMs);
    void waitForVisibleImages(maximumWaitMs).then(dismiss);

    return () => {
      if (maximumTimer !== undefined) window.clearTimeout(maximumTimer);
      if (removalFallback !== undefined) window.clearTimeout(removalFallback);
    };
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
