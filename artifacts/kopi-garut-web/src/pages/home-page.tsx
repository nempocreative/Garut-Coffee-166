import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { ArrowRight, Gift, Heart } from 'lucide-react';
import {
  coffeeTours,
  diversifiedProducts,
  farmers,
  homeContent,
  hubStats,
  regions,
  type HomeIconName,
  type SharedCoffee,
} from '@workspace/kopi-garut-shared';
import { webCoffeeCatalog } from '../lib/coffee-catalog';
import { AppIcon, AppNavGlyph } from '../components/app-icon';
import { MenuIllustration } from '../components/menu-illustration';
import { SiteFooter } from '../components/site-footer';
import { ServiceLocationPicker } from '../components/service-location-picker';
import { getWebProductImage } from '../lib/web-product-images';
import {
  serviceModes,
  type DeliveryAddress,
  type ServiceLocationId,
  type ServiceMode,
} from '../lib/loyalty';
import './home-page.css';

type HomePageProps = {
  onNavigate: (path: string) => void;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
  programHighlights: HomeProgramHighlight[];
  points: number;
  serviceMode: ServiceMode;
  onSelectService: (mode: ServiceMode) => void;
  serviceLocationId: string;
  deliveryAddresses: DeliveryAddress[];
  selectedDeliveryAddressId: string;
  onSelectLocation: (id: ServiceLocationId) => void;
  onSelectDeliveryAddress: (id: string) => void;
  onAddDeliveryAddress: (label: string, address: string) => void;
  onRemoveDeliveryAddress: (id: string) => void;
};

type HomeProgramHighlight = {
  id: string;
  category: string;
  title: string;
  next: string;
  description: string;
  image: string;
};

type WeeklyBrewRecipe = {
  id: string;
  coffeeId: string;
  method: string;
  dose: string;
  water: string;
  ratio: string;
  temperature: string;
  duration: string;
  steps: readonly string[];
};

const weeklyBrewRecipeRotation = [
  {
    id: 'kamojang-v60',
    coffeeId: 'talaga-washed',
    method: 'V60',
    dose: '15 g',
    water: '225 ml',
    ratio: '1:15',
    temperature: '93°C',
    duration: '2:30–3:00',
    steps: [
      'Bilas filter, lalu masukkan kopi giling sedang.',
      'Tuang 45 ml air untuk bloom dan tunggu 30 detik.',
      'Tuang perlahan melingkar hingga 225 ml.',
    ],
  },
  {
    id: 'darajat-french-press',
    coffeeId: 'samarang-dark',
    method: 'French press',
    dose: '18 g',
    water: '270 ml',
    ratio: '1:15',
    temperature: '92°C',
    duration: '4:00',
    steps: [
      'Gunakan gilingan kasar dan masukkan kopi ke French press.',
      'Tuang 270 ml air, lalu aduk perlahan satu kali.',
      'Diamkan 4 menit dan tekan plunger secara perlahan.',
    ],
  },
  {
    id: 'cikuray-aeropress',
    coffeeId: 'cikajang-natural',
    method: 'Aeropress',
    dose: '15 g',
    water: '225 ml',
    ratio: '1:15',
    temperature: '90°C',
    duration: '2:00',
    steps: [
      'Pasang dan bilas filter, lalu masukkan kopi giling sedang.',
      'Tuang 225 ml air dan aduk perlahan selama 10 detik.',
      'Tekan perlahan mulai 1:30 hingga selesai sekitar 2 menit.',
    ],
  },
  {
    id: 'cikajang-chemex',
    coffeeId: 'cikajang-honey',
    method: 'Chemex',
    dose: '18 g',
    water: '270 ml',
    ratio: '1:15',
    temperature: '93°C',
    duration: '3:30–4:00',
    steps: [
      'Bilas filter Chemex dan masukkan kopi giling sedang.',
      'Tuang 54 ml air untuk bloom selama 30 detik.',
      'Tuang bertahap hingga 270 ml dan tunggu sampai selesai menetes.',
    ],
  },
  {
    id: 'papandayan-pour-over',
    coffeeId: 'papandayan-honey',
    method: 'Seduh tuang',
    dose: '15 g',
    water: '225 ml',
    ratio: '1:15',
    temperature: '92°C',
    duration: '2:45–3:15',
    steps: [
      'Bilas kertas filter dan masukkan kopi giling sedang.',
      'Basahi kopi dengan 45 ml air dan tunggu 30 detik.',
      'Tuang perlahan dalam dua tahap hingga 225 ml.',
    ],
  },
  {
    id: 'papandayan-kalita',
    coffeeId: 'papandayan-reserve',
    method: 'Kalita',
    dose: '15 g',
    water: '225 ml',
    ratio: '1:15',
    temperature: '92°C',
    duration: '2:45–3:15',
    steps: [
      'Bilas filter Kalita dan masukkan kopi giling sedang.',
      'Tuang 45 ml air untuk bloom selama 30 detik.',
      'Tuang perlahan dalam beberapa tahap hingga 225 ml.',
    ],
  },
] as const satisfies readonly WeeklyBrewRecipe[];

function getIsoWeekNumber(date: Date) {
  const thursday = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const weekday = thursday.getUTCDay() || 7;
  thursday.setUTCDate(thursday.getUTCDate() + 4 - weekday);
  const yearStart = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 1));
  return Math.ceil(((thursday.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getWeeklyBrewRecipes(date: Date): readonly WeeklyBrewRecipe[] {
  if (weeklyBrewRecipeRotation.length % 2 !== 0) {
    throw new Error('Weekly brew rotation must contain recipe pairs.');
  }
  const pairCount = weeklyBrewRecipeRotation.length / 2;
  const pairIndex = (getIsoWeekNumber(date) - 1) % pairCount;
  return weeklyBrewRecipeRotation.slice(pairIndex * 2, pairIndex * 2 + 2);
}

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`;

const formatPrice = (value: number) => `Rp ${value.toLocaleString('id-ID')}`;

const extensionTeam = [
  { id: 'rani-permata', name: 'Rani Permata', role: 'Penyuluh utama', regions: ['Cikajang', 'Cisurupan'], focus: 'Mutu lot & tindak lanjut kebun', image: 'penyuluh-rani-permata.webp' },
  { id: 'dimas-suryana', name: 'Dimas Suryana', role: 'Penyuluh lapangan', regions: ['Pakenjeng', 'Cisurupan'], focus: 'Perawatan tanaman & panen', image: 'penyuluh-dimas-suryana.webp' },
  { id: 'nia-kurniasih', name: 'Nia Kurniasih', role: 'Penyuluh lapangan', regions: ['Samarang', 'Cikajang'], focus: 'Pascapanen & pengeringan', image: 'penyuluh-nia-kurniasih.webp' },
] as const;

function Header({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <header className="gb-header" data-testid="home-header">
      <div className="gb-header-top">
        <div className="gb-header-actions">
          <button className="gb-icon-orb" onClick={() => onNavigate('/notifications')} aria-label="Buka notifikasi" data-testid="button-home-notifications">
            <AppNavGlyph name="bell" size={24} />
          </button>
          <button className="gb-icon-orb" onClick={() => onNavigate('/cart')} aria-label="Buka keranjang" data-testid="button-home-cart">
            <AppNavGlyph name="shopping-cart" size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

function SearchEntry({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <button className="gb-search-entry" onClick={() => onNavigate('/catalog')} data-testid="button-home-search" aria-label="Cari kopi, petani, atau wilayah">
      <img src={asset('coffee-bean-menu.webp')} alt="" data-testid="img-search-bean" decoding="async" />
      <span>Cari kopi, petani, atau wilayah</span>
      <span className="gb-filter-orb"><AppIcon name="sliders" size={16} /></span>
    </button>
  );
}

function PromoCarousel({ onNavigate }: { onNavigate: (path: string) => void }) {
  const promos = homeContent.promoSlides.slice(0, 3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % promos.length), 4200);
    return () => window.clearInterval(timer);
  }, [promos.length]);

  const visiblePromos = [-1, 0, 1].map((slot) => ({
    slot,
    promo: promos[(index + slot + promos.length) % promos.length],
  }));

  return (
    <section className="gb-promo" data-testid="promo-carousel" aria-label="Promosi Garut Beans">
      <div className="gb-promo-stage">
        {visiblePromos.map(({ slot, promo }) => {
          const isActive = slot === 0;
          return (
            <article
              className={`gb-promo-card ${isActive ? 'is-active' : slot < 0 ? 'is-prev' : 'is-next'}`}
              key={`${promo.id}-${slot}`}
              aria-hidden={!isActive}
            >
              <div className="gb-promo-slide">
                {isActive && (
                    <div className="gb-promo-copy">
                    <span className="gb-eyebrow">{promo.eyebrow}</span>
                    <h1 data-testid="text-promo-title">{promo.title}</h1>
                    <p>{promo.description}</p>
                    <button className="gb-text-action" onClick={() => onNavigate(promo.route)} data-testid="button-promo-action">
                      {promo.cta} <AppIcon name="arrow-up-right" size={15} />
                    </button>
                  </div>
                )}
                <div className="gb-promo-media">
                  <img src={asset(promo.image)} alt={isActive ? promo.title : ''} data-testid={`img-promo-${promo.id}`} loading="eager" fetchPriority={isActive ? 'high' : 'low'} decoding="async" />
                  <div className="gb-promo-shade" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CategoryTiles({ onNavigate }: { onNavigate: (path: string) => void }) {
  const categoryPages = Array.from({ length: Math.ceil(homeContent.categories.length / 5) }, (_, pageIndex) =>
    homeContent.categories.slice(pageIndex * 5, pageIndex * 5 + 5),
  );
  const categoryRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  const scrollToPage = (pageIndex: number) => {
    const container = categoryRef.current;
    if (!container) return;
    container.scrollTo({ left: pageIndex * container.clientWidth, behavior: 'smooth' });
    setActivePage(pageIndex);
  };

  return (
    <section className="gb-category-pager" data-testid="category-navigation">
      <div
        className="gb-category-grid"
        role="group"
        aria-label="Menu kategori Garut Beans"
        tabIndex={0}
        data-testid="category-scroll"
        ref={categoryRef}
        onScroll={(event) => {
          const container = event.currentTarget;
          if (container.clientWidth) setActivePage(Math.round(container.scrollLeft / container.clientWidth));
        }}
      >
        {categoryPages.map((page, pageIndex) => (
          <div className="gb-category-page" key={`category-page-${pageIndex}`}>
            {page.map((category) => {
              const isFeatured = category === page[Math.floor(page.length / 2)];
              return (
                <button className={`gb-category-tile ${isFeatured ? 'is-featured' : ''}`} key={category.label} onClick={() => onNavigate(category.route)} data-testid={`button-category-${category.label.toLowerCase().replaceAll(' ', '-')}`}>
                  <span className="gb-category-glyph">
                    <MenuIllustration name={category.icon} size={34} />
                  </span>
                  <span className="gb-category-tile-label">{category.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="gb-category-pagination" aria-label="Halaman menu kategori">
        {categoryPages.map((_, pageIndex) => (
          <button
            key={`category-page-dot-${pageIndex}`}
            className={`gb-page-dot ${activePage === pageIndex ? 'active' : ''}`}
            onClick={() => scrollToPage(pageIndex)}
            aria-label={`Tampilkan menu halaman ${pageIndex + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function StoryLead({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <button className="gb-story-lead" onClick={() => onNavigate('/collective')} data-testid="button-collective-story">
      <img className="gb-story-lead-desktop-image" src={asset('garut-mountain-coffee-banner.webp')} alt="" data-testid="img-collective-story" loading="lazy" decoding="async" />
      <img className="gb-story-lead-mobile-image" src={asset('garut-mountain-coffee-banner.webp')} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <span className="gb-story-lead-shade" />
      <span className="gb-story-lead-topline">
        <span>ASAL G-BEANS</span>
      </span>
      <span className="gb-story-lead-copy">
        <span className="gb-story-lead-kicker">CERITA DARI LERENG GARUT</span>
        <strong>Dari Garut, lahir rasa penuh cerita.</strong>
        <span>Tumbuh di tanah vulkanik, dirawat petani Garut.</span>
        <span className="gb-story-lead-footer">
          <span className="gb-story-lead-fact"><i /> 1.200 mdpl · Garut, Jawa Barat</span>
          <span className="gb-story-lead-link">Telusuri asal kopi <b>↗</b></span>
        </span>
      </span>
    </button>
  );
}

function VoucherCarousel({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [slide, setSlide] = useState(0);
  const vouchers = homeContent.vouchers;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % vouchers.length), 4500);
    return () => window.clearInterval(timer);
  }, [vouchers.length]);

  return (
    <section className="gb-vouchers" data-testid="voucher-carousel">
      <div className="gb-voucher-row">
        {vouchers[slide].map((voucher, index) => (
          <button className={`gb-voucher ${voucher.variant === 'dark' ? 'dark' : ''}`} key={voucher.code} onClick={() => onNavigate('/catalog')} data-testid={`button-voucher-${voucher.code}`}>
            <span className="gb-voucher-main">
              <span className="gb-voucher-kicker">VOUCHER</span>
              <strong>{voucher.discount}</strong>
              <span className="gb-voucher-title">{voucher.title}</span>
              <span className="gb-voucher-note">{voucher.note}</span>
            </span>
            <span className="gb-voucher-divider" />
            <span className="gb-voucher-action">
              <small>KODE</small>
              <span className="gb-voucher-code">{voucher.code}</span>
              <span className="gb-voucher-apply">Pakai</span>
            </span>
            <span className="gb-voucher-index">{index + 1}</span>
          </button>
        ))}
      </div>
      <div className="gb-voucher-dots">
        {vouchers.map((_, item) => (
          <button key={item} className={`gb-page-dot ${slide === item ? 'active' : ''}`} onClick={() => setSlide(item)} aria-label={`Tampilkan voucher halaman ${item + 1}`} data-testid={`button-voucher-page-${item}`} />
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ title, action, onAction }: { title: string; action: string; onAction: () => void }) {
  return (
    <div className="gb-section-heading">
      <h2 data-testid={`text-section-${title.toLowerCase().replaceAll(' ', '-')}`}>{title}</h2>
      <button onClick={onAction} data-testid={`button-section-${title.toLowerCase().replaceAll(' ', '-')}`}>
        {action}
      </button>
    </div>
  );
}

function CoffeeCard({ coffee, favorites, onAddToCart, onToggleFavorite, onNavigate }: {
  coffee: SharedCoffee;
  favorites: string[];
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onNavigate: (path: string) => void;
}) {
  const saved = favorites.includes(coffee.id);
  return (
    <article className="gb-coffee-card" data-testid={`card-coffee-${coffee.id}`}>
      <button className="gb-coffee-image-button" onClick={() => onNavigate(`/product/${coffee.id}`)} data-testid={`button-coffee-${coffee.id}`} aria-label={`Lihat ${coffee.name}`}>
        <img src={asset(coffee.image)} alt={coffee.name} data-testid={`img-coffee-${coffee.id}`} loading="lazy" decoding="async" />
        {coffee.badge && <span className="gb-badge">{coffee.badge}</span>}
      </button>
      <div className="gb-coffee-body">
        <div>
          <span className="gb-coffee-meta">{coffee.category} · {coffee.process}</span>
          <h3 data-testid={`text-coffee-name-${coffee.id}`}>{coffee.name}</h3>
          <p>{coffee.tagline}</p>
          <strong>{formatPrice(coffee.price)} <small>/ 200g</small></strong>
        </div>
        <button className={`gb-favorite ${saved ? 'saved' : ''}`} onClick={() => onToggleFavorite(coffee.id)} aria-label={saved ? `Hapus ${coffee.name} dari favorit` : `Simpan ${coffee.name} ke favorit`} data-testid={`button-favorite-${coffee.id}`}>
          <AppIcon name="heart" size={18} />
        </button>
      </div>
      <button className="gb-add-button" onClick={() => onAddToCart(coffee.id)} data-testid={`button-add-to-cart-${coffee.id}`}>
        Tambah
      </button>
    </article>
  );
}

function DiversifiedCard({ product, onNavigate, onAddToCart }: { product: typeof homeContent.diversifiedProducts[number]; onNavigate: (path: string) => void; onAddToCart: (id: string) => void }) {
  return (
    <article className="gb-diversified-card" data-testid={`card-diversified-${product.id}`}>
      <button className="gb-diversified-main" onClick={() => onNavigate('/diversification')} data-testid={`button-diversified-${product.id}`}>
        <span className="gb-diversified-image">
          <img src={asset(getWebProductImage(product.id, product.image))} alt={product.title} data-testid={`img-diversified-${product.id}`} loading="lazy" decoding="async" />
          <span>{product.badge}</span>
        </span>
        <span className="gb-diversified-body">
          <small>{product.category}</small>
          <strong>{product.title}</strong>
          <span>{product.price} <AppIcon name="arrow-up-right" size={13} /></span>
        </span>
      </button>
      <button className="gb-diversified-add" onClick={() => onAddToCart(product.id)} data-testid={`button-diversified-add-${product.id}`}>
        <AppIcon name="plus" size={13} /> Tambah
      </button>
    </article>
  );
}

function DiversifiedCarousel({ products, onNavigate, onAddToCart }: {
  products: typeof homeContent.diversifiedProducts;
  onNavigate: (path: string) => void;
  onAddToCart: (id: string) => void;
}) {
  const [frameStart, setFrameStart] = useState(0);
  const [isLoopResetting, setIsLoopResetting] = useState(false);
  const activeIndex = (frameStart + 1) % products.length;
  const carouselProducts = [...products, ...products];
  const visibleProducts = carouselProducts.map((product, index) => {
    const distance = index - frameStart;
    return {
      product,
      position: distance === 1 ? 'is-active' : distance === 0 ? 'is-prev' : distance === 2 ? 'is-next' : distance >= 3 && distance <= 4 ? 'is-visible' : 'is-hidden',
      key: `${product.id}-${index}`,
    };
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setFrameStart((current) => current + 1), 4200);
    return () => window.clearInterval(timer);
  }, [products.length]);

  useEffect(() => {
    if (frameStart !== products.length) return;
    const resetTimer = window.setTimeout(() => {
      setIsLoopResetting(true);
      setFrameStart(0);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setIsLoopResetting(false));
      });
    }, 960);
    return () => window.clearTimeout(resetTimer);
  }, [frameStart, products.length]);

  return (
    <div className="gb-diversified-carousel" data-testid="diversified-carousel">
      <div className="gb-diversified-carousel-stage">
        <div
          className={`gb-diversified-carousel-track ${isLoopResetting ? 'is-loop-resetting' : ''}`}
          style={{ '--diversified-frame-start': frameStart } as CSSProperties}
        >
          {visibleProducts.map(({ product, position, key }) => (
            <div className={`gb-diversified-slide ${position}`} key={key}>
              <DiversifiedCard product={product} onNavigate={onNavigate} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
      <div className="gb-coffee-dots" aria-label="Pilih produk turunan">
        {products.map((product, index) => (
          <button
            key={product.id}
            className={`gb-coffee-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setFrameStart((index - 1 + products.length) % products.length)}
            aria-label={`Pilih ${product.title}`}
            data-testid={`button-diversified-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}

function CoffeeCarousel({ coffees, favorites, onAddToCart, onToggleFavorite, onNavigate }: {
  coffees: SharedCoffee[];
  favorites: string[];
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onNavigate: (path: string) => void;
}) {
  const [frameStart, setFrameStart] = useState(0);
  const [isLoopResetting, setIsLoopResetting] = useState(false);
  const activeIndex = (frameStart + 1) % coffees.length;
  const carouselCoffees = [...coffees, ...coffees];
  const visibleCoffees = carouselCoffees.map((coffee, index) => {
    const distance = index - frameStart;
    return {
      coffee,
      position: distance === 1 ? 'is-active' : distance === 0 ? 'is-prev' : distance === 2 ? 'is-next' : distance >= 3 && distance <= 4 ? 'is-visible' : 'is-hidden',
      key: `${coffee.id}-${index}`,
    };
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setFrameStart((current) => current + 1), 3600);
    return () => window.clearInterval(timer);
  }, [coffees.length]);

  useEffect(() => {
    if (frameStart !== coffees.length) return;
    const resetTimer = window.setTimeout(() => {
      setIsLoopResetting(true);
      setFrameStart(0);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setIsLoopResetting(false));
      });
    }, 960);
    return () => window.clearTimeout(resetTimer);
  }, [frameStart, coffees.length]);

  return (
    <div className="gb-coffee-carousel" data-testid="coffee-carousel">
      <div className="gb-coffee-carousel-stage">
        <div
          className={`gb-coffee-carousel-track ${isLoopResetting ? 'is-loop-resetting' : ''}`}
          style={{ '--coffee-frame-start': frameStart } as CSSProperties}
        >
          {visibleCoffees.map(({ coffee, position, key }) => (
            <div className={`gb-coffee-slide ${position}`} key={key}>
              <CoffeeCard coffee={coffee} favorites={favorites} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} onNavigate={onNavigate} />
            </div>
          ))}
        </div>
      </div>
      <div className="gb-coffee-dots" aria-label="Pilih kopi">
        {coffees.map((coffee, index) => (
          <button
            key={coffee.id}
            className={`gb-coffee-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setFrameStart((index - 1 + coffees.length) % coffees.length)}
            aria-label={`Pilih ${coffee.name}`}
            data-testid={`button-coffee-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}

function GrowthStats({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <section className="gb-home-section gb-mobile-only gb-growth-section">
      <SectionTitle title="Tumbuh bersama" action="Lihat data" onAction={() => onNavigate('/dashboard')} />
      <button className="gb-growth-card" onClick={() => onNavigate('/dashboard')} data-testid="button-growth-stats">
        <div className="gb-growth-glow" />
        <div className="gb-growth-copy">
          <span className="gb-growth-kicker">G-BEANS HUB</span>
          <strong>Tumbuh dari kebun, terasa di setiap cangkir.</strong>
        </div>
        <div className="gb-growth-route">
          <span className="gb-growth-route-line" />
          {hubStats.map((stat, index) => (
            <span className="gb-growth-stop" key={stat.label}>
              <b className={index === 0 ? 'highlight' : ''}>{stat.value}</b>
              <small>{stat.label}</small>
            </span>
          ))}
        </div>
        <span className="gb-growth-footer">DARI KEBUN <b>→</b> KE CANGKIR <AppIcon name="arrow-up-right" size={14} /></span>
      </button>
    </section>
  );
}

function FarmerFeatureCard({ farmer, index, onNavigate }: { farmer: typeof farmers[number]; index: number; onNavigate: (path: string) => void }) {
  return (
    <button className="gb-farmer-feature" onClick={() => onNavigate(`/farmer/${farmer.id}`)} data-testid={`button-home-farmer-${farmer.id}`}>
      <span className={`gb-farmer-accent ${index === 0 ? 'gold' : ''}`} />
      <span className="gb-farmer-portrait">
        <img src={asset(farmer.image)} alt={farmer.name} loading="lazy" decoding="async" />
        <span className="gb-farmer-portrait-shade" />
      </span>
      <span className="gb-farmer-copy">
        <span className="gb-farmer-topline"><small>● PETANI PILIHAN</small><em>{farmer.membershipId}</em></span>
        <strong>{farmer.name}</strong>
        <span className="gb-farmer-location">{farmer.location}</span>
        <span className="gb-farmer-meta"><span>{farmer.coffeeType}</span><span>{farmer.landArea}</span></span>
        <span className="gb-farmer-story">{farmer.story}</span>
        <span className="gb-farmer-rule" />
        <span className="gb-farmer-bottomline">
          <span className="gb-farmer-verified"><b><AppIcon name="check" size={10} /></b> Diverifikasi</span>
          <span className="gb-farmer-profile">Lihat cerita <AppIcon name="arrow-up-right" size={12} /></span>
        </span>
      </span>
    </button>
  );
}

function ExtensionCard({ worker, onNavigate }: { worker: typeof extensionTeam[number]; onNavigate: (path: string) => void }) {
  return (
    <button className="gb-extension-card" onClick={() => onNavigate('/extension-dashboard')} data-testid={`button-home-extension-${worker.id}`}>
      <span className="gb-extension-image">
        <img src={asset(worker.image)} alt={worker.name} loading="lazy" decoding="async" />
        <span className="gb-extension-image-shade" />
        <span className="gb-extension-status"><b /> AKTIF</span>
        <strong>{worker.role}</strong>
      </span>
      <span className="gb-extension-copy">
        <strong>{worker.name}</strong>
        <span className="gb-extension-region">Wilayah: {worker.regions.join(' · ')}</span>
        <span className="gb-extension-focus">{worker.focus}</span>
        <span className="gb-extension-footer">PENDAMPINGAN KEBUN <AppIcon name="arrow-up-right" size={13} /></span>
      </span>
    </button>
  );
}

function RegionCard({ region, index, onNavigate }: { region: typeof regions[number]; index: number; onNavigate: (path: string) => void }) {
  return (
    <button className="gb-region-card" onClick={() => onNavigate(`/region/${region.id}`)} data-testid={`button-home-region-${region.id}`}>
      <span className="gb-region-image">
        <img src={asset(region.image)} alt={region.name} loading="lazy" decoding="async" />
        <span className="gb-region-image-shade" />
        <b>0{index + 1}</b>
      </span>
      <span className="gb-region-copy">
        <strong>{region.name}</strong>
        <small>{region.village} <i /> {region.elevation}</small>
        <em>{region.specialty}</em>
      </span>
    </button>
  );
}

function EventStoryRail({ onNavigate }: { onNavigate: (path: string) => void }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeStory, setActiveStory] = useState(0);
  const stories = homeContent.stories;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setActiveStory((current) => {
        const next = current >= Math.max(0, stories.length - 2) ? 0 : current + 1;
        const card = railRef.current?.querySelector<HTMLElement>('[data-story-reel-card]');
        railRef.current?.scrollTo({ left: next * ((card?.offsetWidth ?? 156) + 8), behavior: 'smooth' });
        return next;
      });
    }, 3800);
    return () => window.clearInterval(timer);
  }, [stories.length]);

  return (
    <div
      className="gb-horizontal-scroll gb-event-rail"
      ref={railRef}
      data-testid="rail-event-stories"
      onScroll={(event) => {
        const card = event.currentTarget.querySelector<HTMLElement>('[data-story-reel-card]');
        if (card) setActiveStory(Math.round(event.currentTarget.scrollLeft / (card.offsetWidth + 8)));
      }}
    >
      {stories.map((story, index) => (
        <button className="gb-event-card" data-story-reel-card key={story.id} onClick={() => onNavigate('/events')} data-testid={`button-home-event-${story.id}`}>
          <img src={asset(story.image)} alt={story.title} loading="lazy" decoding="async" />
          <span className="gb-event-shade" />
          <span className="gb-event-top"><b>◷ CERITA BARU</b><em>0{index + 1}</em></span>
          <span className="gb-event-copy">
            <small>{story.date} <i /> {story.location}</small>
            <strong>{story.title}</strong>
            <span>{story.type}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

function ProgramHighlightRail({ programs, onNavigate }: { programs: HomeProgramHighlight[]; onNavigate: (path: string) => void }) {
  return (
    <div className="gb-program-highlights" data-testid="rail-home-programs">
      {programs.map((program) => (
        <button
          className="gb-program-highlight"
          key={program.id}
          onClick={() => onNavigate('/program')}
          data-testid={`button-home-program-${program.id}`}
        >
          <img src={asset(program.image)} alt="" loading="lazy" decoding="async" />
          <span className="gb-program-highlight-copy">
            <small>{program.category}</small>
            <strong>{program.title}</strong>
            <span>{program.description}</span>
            <em>{program.next}</em>
            <b>Lihat program <i aria-hidden="true">↗</i></b>
          </span>
        </button>
      ))}
    </div>
  );
}

function TourCard({ tour, onNavigate }: { tour: typeof coffeeTours[number]; onNavigate: (path: string) => void }) {
  return (
    <button className="gb-tour-card" onClick={() => onNavigate('/tourism')} data-testid={`button-home-tour-${tour.id}`}>
      <img src={asset(tour.image)} alt={tour.title} loading="lazy" decoding="async" />
      <span className="gb-tour-shade" />
      <span className="gb-tour-copy">
        <small>{tour.type}</small>
        <strong>{tour.title}</strong>
        <span>{tour.duration} · {tour.location}</span>
      </span>
    </button>
  );
}

const coffeeTasteProfiles = {
  bright: {
    label: 'Segar & ringan (bright / floral)',
    categories: ['Cerah', 'Floral', 'Bersih'],
    notes: ['lemon', 'melati', 'gula batu', 'apel', 'jeruk', 'teh hitam', 'persik'],
  },
  fruity: {
    label: 'Manis & buah (sweet / juicy)',
    categories: ['Buah', 'Manis'],
    notes: ['stroberi', 'buah', 'molase', 'madu', 'persik', 'apel'],
  },
  cozy: {
    label: 'Cokelat & hangat (chocolatey / spicy)',
    categories: ['Nyaman', 'Hangat'],
    notes: ['karamel', 'cokelat', 'kakao', 'cengkeh', 'rempah'],
  },
  balanced: {
    label: 'Seimbang & bersih (balanced / clean)',
    categories: ['Seimbang', 'Harian', 'Bersih'],
    notes: ['gula aren', 'almon', 'jeruk', 'teh hitam', 'buah batu'],
  },
} as const;

const coffeePriceRanges = {
  under110: { label: 'Di bawah Rp110 rb', test: (price: number) => price < 110000 },
  from110to125: { label: 'Rp110–125 rb', test: (price: number) => price >= 110000 && price <= 125000 },
  over125: { label: 'Di atas Rp125 rb', test: (price: number) => price > 125000 },
} as const;

function CoffeeFinder({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [taste, setTaste] = useState<keyof typeof coffeeTasteProfiles | ''>('');
  const [brew, setBrew] = useState('');
  const [priceRange, setPriceRange] = useState<keyof typeof coffeePriceRanges | ''>('');
  const [recommendedCoffeeId, setRecommendedCoffeeId] = useState<string | null>(null);

  const recommendedCoffee = webCoffeeCatalog.find((coffee) => coffee.id === recommendedCoffeeId);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!taste || !brew || !priceRange) return;

    const profile = coffeeTasteProfiles[taste];
    const priceMatches = webCoffeeCatalog.filter((coffee) => coffeePriceRanges[priceRange].test(coffee.price));
    const bestMatch = [...priceMatches].sort((a, b) => {
      const score = (coffee: typeof webCoffeeCatalog[number]) => {
        const notes = coffee.tastingNotes.join(' ').toLocaleLowerCase('id-ID');
        const categoryScore = (profile.categories as readonly string[]).includes(coffee.category) ? 8 : 0;
        const noteScore = profile.notes.reduce((total, note) => total + (notes.includes(note) ? 2 : 0), 0);
        const brewScore = coffee.recommendedBrew === brew ? 5 : 0;
        return categoryScore + noteScore + brewScore;
      };
      return score(b) - score(a);
    })[0];

    if (bestMatch) setRecommendedCoffeeId(bestMatch.id);
  }

  return (
    <div className="gb-coffee-finder" data-testid="coffee-finder">
      <div className="gb-coffee-finder-heading">
        <div>
          <strong>Bantu pilih kopi</strong>
          <span>Isi tiga pilihan, dapat satu rekomendasi.</span>
        </div>
      </div>
      <form className="gb-coffee-finder-form" onSubmit={handleSubmit}>
        <label className="gb-coffee-finder-field">
          <span>Rasa</span>
          <select value={taste} onChange={(event) => { setTaste(event.target.value as typeof taste); setRecommendedCoffeeId(null); }} required aria-label="Pilih profil rasa" data-testid="select-coffee-taste">
            <option value="" disabled>Pilih rasa</option>
            {Object.entries(coffeeTasteProfiles).map(([value, profile]) => <option key={value} value={value}>{profile.label}</option>)}
          </select>
        </label>
        <label className="gb-coffee-finder-field">
          <span>Metode seduh</span>
          <select value={brew} onChange={(event) => { setBrew(event.target.value); setRecommendedCoffeeId(null); }} required aria-label="Pilih metode seduh" data-testid="select-coffee-brew">
            <option value="" disabled>Pilih metode</option>
            {[...new Set(webCoffeeCatalog.map((coffee) => coffee.recommendedBrew))].map((method) => <option key={method} value={method}>{method}</option>)}
          </select>
        </label>
        <label className="gb-coffee-finder-field">
          <span>Kisaran harga</span>
          <select value={priceRange} onChange={(event) => { setPriceRange(event.target.value as typeof priceRange); setRecommendedCoffeeId(null); }} required aria-label="Pilih kisaran harga" data-testid="select-coffee-price">
            <option value="" disabled>Pilih harga</option>
            {Object.entries(coffeePriceRanges).map(([value, range]) => <option key={value} value={value}>{range.label}</option>)}
          </select>
        </label>
        <button className="gb-coffee-finder-submit" type="submit" data-testid="button-coffee-finder-submit">
          Temukan kopi
        </button>
      </form>
      {recommendedCoffee && (
        <div className="gb-coffee-finder-result" aria-live="polite" data-testid="coffee-finder-result">
          <img src={asset(recommendedCoffee.image)} alt="" loading="lazy" decoding="async" />
          <div className="gb-coffee-finder-result-copy">
            <small>REKOMENDASI UNTUKMU</small>
            <strong>{recommendedCoffee.name}</strong>
            <span>{recommendedCoffee.tastingNotes.slice(0, 2).join(' · ')} · {formatPrice(recommendedCoffee.price)}</span>
          </div>
          <button onClick={() => onNavigate(`/product/${recommendedCoffee.id}`)} aria-label={`Lihat ${recommendedCoffee.name}`} data-testid="button-coffee-finder-result">
            Lihat <span aria-hidden="true">↗</span>
          </button>
        </div>
      )}
    </div>
  );
}

function WeeklyBrewGuide({ recipe, coffee, position, onNavigate }: {
  recipe: WeeklyBrewRecipe;
  coffee: SharedCoffee;
  position: number;
  onNavigate: (path: string) => void;
}) {
  const brewParameters = [
    { label: 'Kopi', value: recipe.dose },
    { label: 'Air', value: recipe.water },
    { label: 'Rasio', value: recipe.ratio },
    { label: 'Suhu air', value: recipe.temperature },
    { label: 'Total waktu', value: recipe.duration },
  ];

  return (
    <article className="gb-weekly-brew" data-testid={`weekly-brew-guide-${recipe.id}`}>
      <div className="gb-weekly-brew-visual">
        <img src={asset(coffee.image)} alt={`${coffee.name} untuk metode ${recipe.method}`} loading="lazy" decoding="async" />
        <span className="gb-weekly-brew-badge" aria-hidden="true">0{position}</span>
      </div>

      <div className="gb-weekly-brew-details">
        <div className="gb-weekly-brew-coffee">
          <div>
            <div className="gb-weekly-brew-heading">
              <span className="gb-weekly-brew-method-tag">{recipe.method}</span>
              <small>RESEP MINGGU INI · 0{position}</small>
            </div>
            <strong>{coffee.name}</strong>
            <span>{coffee.origin} · {coffee.tastingNotes.slice(0, 2).join(' · ')}</span>
          </div>
        </div>

        <div className="gb-weekly-brew-metrics" aria-label="Takaran resep seduh">
          {brewParameters.map(({ label, value }) => (
            <div className={label === 'Total waktu' ? 'is-time' : ''} key={label}>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <details className="gb-weekly-brew-step-disclosure">
          <summary>Lihat langkah seduh</summary>
          <ol className="gb-weekly-brew-steps">
            {recipe.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </details>
      </div>

      <button
        className="gb-weekly-brew-link"
        onClick={() => onNavigate(`/product/${coffee.id}`)}
        data-testid={`button-weekly-brew-coffee-${coffee.id}`}
      >
        Lihat kopi <span aria-hidden="true">↗</span>
      </button>
    </article>
  );
}

function HomeMemberPanel({
  points,
  serviceMode,
  serviceLocationId,
  deliveryAddresses,
  selectedDeliveryAddressId,
  onSelectLocation,
  onSelectDeliveryAddress,
  onAddDeliveryAddress,
  onRemoveDeliveryAddress,
  onSelectService,
  onNavigate,
}: Pick<HomePageProps,
  | 'points'
  | 'onNavigate'
  | 'serviceMode'
  | 'onSelectService'
  | 'serviceLocationId'
  | 'deliveryAddresses'
  | 'selectedDeliveryAddressId'
  | 'onSelectLocation'
  | 'onSelectDeliveryAddress'
  | 'onAddDeliveryAddress'
  | 'onRemoveDeliveryAddress'
>) {
  return (
    <section className="gb-member-order-area" aria-label="Poin, outlet, dan layanan">
      <div className="gb-member-summary">
        <div className="gb-member-identity">
          <span className="gb-member-heart"><Heart size={17} fill="currentColor" /></span>
          <span><small>G-BEANS MEMBER</small><strong>Member Garut Beans</strong></span>
        </div>
        <button
          type="button"
          className="gb-member-points"
          onClick={() => onNavigate('/points')}
          aria-label={`Lihat detail poin. Saldo ${points} poin`}
          title="Lihat detail poin dan hadiah"
          data-testid="home-points-button"
        >
          <span className="gb-member-points-label">POIN TERKUMPUL <ArrowRight size={10} aria-hidden="true" /></span>
          <span className="gb-member-points-value"><strong>{points.toLocaleString('id-ID')}</strong><span>PT</span></span>
        </button>
      </div>

      <ServiceLocationPicker
        serviceMode={serviceMode}
        selectedLocationId={serviceLocationId}
        selectedDeliveryAddressId={selectedDeliveryAddressId}
        deliveryAddresses={deliveryAddresses}
        onSelectLocation={onSelectLocation}
        onSelectDeliveryAddress={onSelectDeliveryAddress}
        onAddDeliveryAddress={onAddDeliveryAddress}
        onRemoveDeliveryAddress={onRemoveDeliveryAddress}
      />

      <div className="gb-service-inline">
        <span>Melayani</span>
        <div className="gb-service-options" role="group" aria-label="Pilihan layanan">
          {serviceModes.map((mode) => {
            const selected = serviceMode === mode.id;
            return <button
              type="button"
              key={mode.id}
              className={`gb-service-option ${selected ? 'selected' : ''} mode-${mode.id}`}
              aria-pressed={selected}
              onClick={() => onSelectService(mode.id)}
              data-testid={`home-service-${mode.id}`}
            ><span className="gb-service-dot" /><span>{mode.label}</span></button>;
          })}
        </div>
      </div>

    </section>
  );
}

export default function HomePage({
  onNavigate,
  onAddToCart,
  onToggleFavorite,
  favorites,
  programHighlights,
  points,
  serviceMode,
  onSelectService,
  serviceLocationId,
  deliveryAddresses,
  selectedDeliveryAddressId,
  onSelectLocation,
  onSelectDeliveryAddress,
  onAddDeliveryAddress,
  onRemoveDeliveryAddress,
}: HomePageProps) {
  const [giftBoxIsClosed, setGiftBoxIsClosed] = useState(true);
  const diversified = homeContent.diversifiedProducts.map((product) => ({
    ...product,
    image: getWebProductImage(product.id, product.image),
  }));
  const firstCoffees = webCoffeeCatalog.slice(0, 10);
  const weeklyBrewGuides = getWeeklyBrewRecipes(new Date()).map((recipe, index) => {
    const coffee = webCoffeeCatalog.find((item) => item.id === recipe.coffeeId);
    if (!coffee) throw new Error(`The weekly brew coffee ${recipe.coffeeId} is missing from the catalog.`);
    if (coffee.recommendedBrew !== recipe.method) {
      throw new Error(`The weekly brew method for ${coffee.name} no longer matches the catalog.`);
    }
    return { recipe, coffee, position: index + 1 };
  });

  return (
    <div className="gb-home">
      <div className="gb-home-shell">
        <Header onNavigate={onNavigate} />
        <main className="gb-home-content">
          <SearchEntry onNavigate={onNavigate} />
          <HomeMemberPanel
            points={points}
            serviceMode={serviceMode}
            onSelectService={onSelectService}
            serviceLocationId={serviceLocationId}
            deliveryAddresses={deliveryAddresses}
            selectedDeliveryAddressId={selectedDeliveryAddressId}
            onSelectLocation={onSelectLocation}
            onSelectDeliveryAddress={onSelectDeliveryAddress}
            onAddDeliveryAddress={onAddDeliveryAddress}
            onRemoveDeliveryAddress={onRemoveDeliveryAddress}
            onNavigate={onNavigate}
          />
          <PromoCarousel onNavigate={onNavigate} />
          <CategoryTiles onNavigate={onNavigate} />
          <div className="gb-home-feature-grid">
            <StoryLead onNavigate={onNavigate} />
            <VoucherCarousel onNavigate={onNavigate} />
          </div>

          <section className="gb-home-section gb-first-cup-section">
            <SectionTitle title="Untuk cangkir pertama" action="Lihat semua" onAction={() => onNavigate('/catalog')} />
            <CoffeeCarousel coffees={firstCoffees} favorites={favorites} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} onNavigate={onNavigate} />
          </section>

          <section id="gift-bundle-section" className="gb-home-section gb-gift-bundle-teaser" aria-labelledby="gift-bundle-teaser-title" data-testid="gift-bundle-section">
            <div className={`gb-gift-bundle-teaser-visual ${giftBoxIsClosed ? 'is-closed' : ''}`}>
              {giftBoxIsClosed && (
                <div className="gb-gift-closed-scene">
                  <span className="gb-gift-closed-caption">KONSEP KEMASAN TERTUTUP</span>
                  <img
                    className="gb-gift-closed-image"
                    src={`${import.meta.env.BASE_URL}assets/garut-beans-closed-gift-box-final.webp`}
                    alt="Konsep AI box tertutup dengan maskot domba Garut Beans berkemeja biru, memegang secangkir kopi, dan logo pada kotak."
                    loading="eager"
                  />
                </div>
              )}
              <div className="gb-gift-visual-toggle" role="group" aria-label="Pilih tampilan contoh paket">
                <button type="button" className={!giftBoxIsClosed ? 'is-selected' : ''} aria-pressed={!giftBoxIsClosed} onClick={() => setGiftBoxIsClosed(false)}>Terbuka</button>
                <button type="button" className={giftBoxIsClosed ? 'is-selected' : ''} aria-pressed={giftBoxIsClosed} onClick={() => setGiftBoxIsClosed(true)}>Tertutup</button>
              </div>
              <img
                className="gb-gift-teaser-backdrop"
                src={`${import.meta.env.BASE_URL}assets/garut-beans-empty-gift-box.webp`}
                alt="Box hadiah Garut Beans terbuka."
                loading="eager"
              />
              <div className="gb-gift-teaser-stage">
                <span className="gb-gift-teaser-brand">GARUT <strong>BEANS</strong><small>DARI TANAH GARUT</small></span>
                <div className="gb-gift-teaser-products" role="group" aria-label="Produk Paket A ditata di dalam box">
                  <img
                    className="gb-gift-teaser-product gb-gift-teaser-product-cikuray"
                    src={`${import.meta.env.BASE_URL}assets/gift-cikuray-cutout.webp`}
                    alt="Kemasan asli Kopi Cikuray Series"
                    loading="eager"
                  />
                  <img
                    className="gb-gift-teaser-product gb-gift-teaser-product-cookies"
                    src={`${import.meta.env.BASE_URL}assets/gift-cookies-cutout.webp`}
                    alt="Kemasan asli Cookies Ampas Kopi"
                    loading="eager"
                  />
                  <img
                    className="gb-gift-teaser-product gb-gift-teaser-product-soap"
                    src={`${import.meta.env.BASE_URL}assets/gift-soap-cutout.webp`}
                    alt="Kemasan asli Sabun Scrub Kopi"
                    loading="eager"
                  />
                </div>
                <div className="gb-gift-teaser-card" aria-label="Contoh kartu ucapan: Salam hangat dari Garut">
                  <small>SEBUAH PESAN KECIL</small>
                  <strong>Salam hangat<br />dari Garut</strong>
                  <span>Dengan cinta, Garut Beans</span>
                </div>
              </div>
            </div>
            <div className="gb-gift-bundle-teaser-copy">
              <span className="gb-gift-bundle-kicker"><Gift size={14} /> OLEH-OLEH GARUT</span>
              <h2 id="gift-bundle-teaser-title">Racik paket oleh-olehmu.</h2>
              <p>Kopi dan karya lokal Garut dalam box istimewa, lengkap dengan kartu ucapan untuk orang tersayang.</p>
              <div className="gb-gift-bundle-sizes" aria-label="Pilihan ukuran paket">
                <span><b>A</b><strong>3 produk</strong></span>
                <span><b>B</b><strong>4 produk</strong></span>
                <span><b>C</b><strong>5 produk</strong></span>
              </div>
              <button
                className="gb-gift-bundle-teaser-cta"
                type="button"
                onClick={() => onNavigate('/gift-bundle')}
                data-testid="button-open-gift-bundle"
              >
                Racik paket <ArrowRight size={16} />
              </button>
            </div>
          </section>

          <section className="gb-home-section gb-more-than-cup-section">
            <SectionTitle title="Lebih dari secangkir" action="Lihat semua" onAction={() => onNavigate('/diversification')} />
            <DiversifiedCarousel products={diversified} onNavigate={onNavigate} onAddToCart={onAddToCart} />
          </section>

          <GrowthStats onNavigate={onNavigate} />

          <section className="gb-home-section">
            <SectionTitle title="Mulai dari selera" action="Jelajahi" onAction={() => onNavigate('/catalog')} />
            <CoffeeFinder onNavigate={onNavigate} />
          </section>

          <section className="gb-home-section">
            <SectionTitle
              title="Resep seduh minggu ini"
              action="Lihat kopi"
              onAction={() => onNavigate('/catalog')}
            />
            <p className="gb-weekly-brews-intro">Dua resep pilihan berganti otomatis setiap pekan.</p>
            <div className="gb-weekly-brews" data-testid="weekly-brew-guides">
              {weeklyBrewGuides.map(({ recipe, coffee, position }) => (
                <WeeklyBrewGuide
                  key={recipe.id}
                  recipe={recipe}
                  coffee={coffee}
                  position={position}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </section>

          <section className="gb-home-section gb-farmer-section">
            <SectionTitle title="Orang di balik rasa" action="Semua petani" onAction={() => onNavigate('/farmers')} />
            <div className="gb-horizontal-scroll gb-farmer-rail" data-testid="rail-farmers">
              {farmers.slice(0, 4).map((farmer, index) => <FarmerFeatureCard key={farmer.id} farmer={farmer} index={index} onNavigate={onNavigate} />)}
            </div>
          </section>

          <section className="gb-home-section gb-mobile-only">
            <SectionTitle title="Penyuluh di lapangan" action="Ruang kerja" onAction={() => onNavigate('/extension-dashboard')} />
            <div className="gb-horizontal-scroll gb-extension-rail" data-testid="rail-extension">
              {extensionTeam.map((worker) => <ExtensionCard key={worker.id} worker={worker} onNavigate={onNavigate} />)}
            </div>
          </section>

          <section className="gb-home-section gb-mobile-only">
            <SectionTitle title="Baca peta rasa Garut" action="Lihat semua" onAction={() => onNavigate('/regions')} />
            <div className="gb-horizontal-scroll gb-region-rail" data-testid="rail-regions">
              {regions.slice(0, 3).map((region, index) => <RegionCard key={region.id} region={region} index={index} onNavigate={onNavigate} />)}
            </div>
          </section>

          <section className="gb-home-section">
            <SectionTitle title="Event kopi mendatang" action="Lihat agenda" onAction={() => onNavigate('/events')} />
            <EventStoryRail onNavigate={onNavigate} />
          </section>

          <section className="gb-home-section">
            <SectionTitle title="Program untuk tumbuh bersama" action="Semua program" onAction={() => onNavigate('/program')} />
            <ProgramHighlightRail programs={programHighlights} onNavigate={onNavigate} />
          </section>

          <section className="gb-home-section gb-mobile-only">
            <SectionTitle title="Datang ke kebunnya" action="Lihat wisata" onAction={() => onNavigate('/tourism')} />
            <div className="gb-tour-grid" data-testid="tour-grid">
              {coffeeTours.slice(0, 2).map((tour) => <TourCard key={tour.id} tour={tour} onNavigate={onNavigate} />)}
            </div>
          </section>

          <div className="gb-mobile-home-footer gb-mobile-only">
        <img src={asset('garut-mountains.webp')} alt="Ilustrasi pegunungan Garut" loading="lazy" decoding="async" />
            <span>DARI KEBUN GARUT, UNTUK SETIAP CANGKIR</span>
          </div>

        </main>
        <SiteFooter onNavigate={onNavigate} />
      </div>
    </div>
  );
}