import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  coffeeCatalog,
  coffeeTours,
  farmers,
  homeContent,
  hubStats,
  regions,
  type HomeIconName,
  type SharedCoffee,
} from '@workspace/kopi-garut-shared';
import { AppIcon, AppNavGlyph } from '../components/app-icon';
import './home-page.css';

type HomePageProps = {
  onNavigate: (path: string) => void;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
};

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`;

const promoAsset = (promo: (typeof homeContent.promoSlides)[number]) =>
  promo.id === 'coffee-tour' ? asset('coffee-tour-banner-featured.png') : asset(promo.image);

const categoryArt: Partial<Record<HomeIconName, string>> = {
  coffee: 'app-menu-coffee.png',
  users: 'app-menu-farmer.png',
  map: 'app-menu-region.png',
  compass: 'app-menu-tourism.png',
  calendar: 'app-menu-event.webp',
  'graduation-cap': 'app-menu-program.webp',
  briefcase: 'app-menu-partnership.png',
  grid: 'app-menu-collective.png',
  'alert-circle': 'app-menu-complaints.png',
  package: 'app-menu-product.png',
};

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
      <img src={asset('coffee-bean-menu.webp')} alt="" data-testid="img-search-bean" />
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
          const hasEmbeddedCopy = promo.id === 'coffee-tour';
          return (
            <article
              className={`gb-promo-card ${isActive ? 'is-active' : slot < 0 ? 'is-prev' : 'is-next'}`}
              key={`${promo.id}-${slot}`}
              aria-hidden={!isActive}
            >
              <div className="gb-promo-slide">
                {isActive && (
                  <div className={`gb-promo-copy ${hasEmbeddedCopy ? 'gb-promo-copy--embedded' : ''}`}>
                    <span className="gb-eyebrow">{promo.eyebrow}</span>
                    <h1 data-testid="text-promo-title">{promo.title}</h1>
                    <p>{promo.description}</p>
                    <button className="gb-text-action" onClick={() => onNavigate(promo.route)} data-testid="button-promo-action">
                      {promo.cta} <AppIcon name="arrow-up-right" size={15} />
                    </button>
                  </div>
                )}
                <div className="gb-promo-media">
                  {hasEmbeddedCopy ? (
                    <picture>
                      <source media="(min-width: 768px)" srcSet={promoAsset(promo)} />
                      <img src={asset(promo.image)} alt={isActive ? promo.title : ''} data-testid={`img-promo-${promo.id}`} />
                    </picture>
                  ) : (
                    <img src={asset(promo.image)} alt={isActive ? promo.title : ''} data-testid={`img-promo-${promo.id}`} />
                  )}
                  <div className="gb-promo-shade" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="gb-promo-dots" aria-label="Pilih promo">
        {promos.map((item, itemIndex) => (
          <button
            key={item.id}
            className={`gb-promo-dot ${index === itemIndex ? 'active' : ''}`}
            onClick={() => setIndex(itemIndex)}
            aria-label={`Promo ${itemIndex + 1}: ${item.title}`}
            data-testid={`button-promo-dot-${itemIndex}`}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryTiles({ onNavigate }: { onNavigate: (path: string) => void }) {
  const categoryPages = Array.from({ length: Math.ceil(homeContent.categories.length / 8) }, (_, pageIndex) =>
    homeContent.categories.slice(pageIndex * 8, pageIndex * 8 + 8),
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
      <div className="gb-category-heading">
        <div>
          <span className="gb-category-eyebrow">JELAJAHI GARUT BEANS</span>
          <h2>Menu utama</h2>
        </div>
        <span className="gb-category-scroll-hint">Geser ke samping untuk melihat semua menu →</span>
      </div>
      <div
        className="gb-category-grid"
        role="group"
        aria-label="Menu kategori, geser ke samping untuk melihat semua pilihan"
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
              const iconArt = categoryArt[category.icon];
              return (
                <button className="gb-category-tile" key={category.label} onClick={() => onNavigate(category.route)} data-testid={`button-category-${category.label.toLowerCase().replaceAll(' ', '-')}`}>
                  <span className="gb-category-glyph">
                    {iconArt ? <img src={asset(iconArt)} alt="" /> : <AppIcon name="package" size={26} />}
                  </span>
                  <span>{category.label}</span>
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
      <img className="gb-story-lead-desktop-image" src={asset('collective-banner.webp')} alt="" data-testid="img-collective-story" />
      <img className="gb-story-lead-mobile-image" src={asset('story-background.webp')} alt="" aria-hidden="true" />
      <span className="gb-story-lead-shade" />
      <span className="gb-story-lead-copy">
        <strong>Kopi dari tanah pegunungan.</strong>
        <span>Dari lereng Garut, setiap biji membawa cerita petani, ketinggian, dan proses yang dirawat dengan penuh perhatian.</span>
        <img src={asset('coffee-beans-natural.webp')} alt="" data-testid="img-story-beans" />
      </span>
    </button>
  );
}

function SiteFooter({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <footer className="gb-footer" data-testid="site-footer">
      <div className="gb-footer-inner">
        <div className="gb-footer-brand">
          <button className="gb-footer-logo" onClick={() => onNavigate('/')} aria-label="Kembali ke Beranda">
            <img src={asset('kopi-garut-logo.png')} alt="Logo Garut Beans" />
          </button>
          <div>
            <div className="gb-footer-name"><span>Garut</span> <strong>Beans</strong></div>
            <p>Kopi spesialti dari lereng Garut, dirawat bersama dari kebun sampai cangkir.</p>
          </div>
        </div>
        <div className="gb-footer-columns">
          <div>
            <span className="gb-footer-label">JELAJAHI</span>
            <button onClick={() => onNavigate('/catalog')}>Kopi pilihan</button>
            <button onClick={() => onNavigate('/farmers')}>Cerita petani</button>
            <button onClick={() => onNavigate('/regions')}>Wilayah Garut</button>
          </div>
          <div>
            <span className="gb-footer-label">TUMBUH BERSAMA</span>
            <button onClick={() => onNavigate('/program')}>Program G-Beans</button>
            <button onClick={() => onNavigate('/events')}>Agenda kopi</button>
            <button onClick={() => onNavigate('/partnership')}>Kemitraan</button>
          </div>
        </div>
        <div className="gb-footer-contact">
          <span className="gb-footer-label">TEMUI KAMI</span>
          <p>Garut, Jawa Barat<br />Senin—Sabtu · 08.00—17.00</p>
          <button onClick={() => onNavigate('/complaints')}>Hubungi tim Garut Beans <AppIcon name="arrow-up-right" size={13} /></button>
        </div>
      </div>
      <div className="gb-footer-bottom">
        <span>© 2026 Garut Beans. Tumbuh bersama.</span>
        <button onClick={() => onNavigate('/traceability')}>Lihat jejak kopi <AppIcon name="arrow-up-right" size={12} /></button>
      </div>
    </footer>
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
              <span className="gb-voucher-kicker"><AppIcon name="shopping-bag" size={12} /> VOUCHER</span>
              <strong>{voucher.discount}</strong>
              <span className="gb-voucher-title">{voucher.title}</span>
              <span className="gb-voucher-note">{voucher.note}</span>
            </span>
            <span className="gb-voucher-divider" />
            <span className="gb-voucher-action">
              <small>KODE</small>
              <span className="gb-voucher-code">{voucher.code}</span>
              <span className="gb-voucher-apply">Pakai <AppIcon name="arrow-up-right" size={11} /></span>
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
        {action} <AppIcon name="arrow-up-right" size={13} />
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
        <img src={asset(coffee.image)} alt={coffee.name} data-testid={`img-coffee-${coffee.id}`} />
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
          <img src={asset(product.image)} alt={product.title} data-testid={`img-diversified-${product.id}`} />
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
        <img src={asset(farmer.image)} alt={farmer.name} />
        <span className="gb-farmer-portrait-shade" />
        <span className="gb-farmer-badge"><AppIcon name="coffee" size={16} /></span>
      </span>
      <span className="gb-farmer-copy">
        <span className="gb-farmer-topline"><small>● PETANI PILIHAN</small><em>{farmer.membershipId}</em></span>
        <strong>{farmer.name}</strong>
        <span className="gb-farmer-location"><AppIcon name="map-pin" size={12} /> {farmer.location}</span>
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
        <img src={asset(worker.image)} alt={worker.name} />
        <span className="gb-extension-image-shade" />
        <span className="gb-extension-status"><b /> AKTIF</span>
        <strong>{worker.role}</strong>
      </span>
      <span className="gb-extension-copy">
        <strong>{worker.name}</strong>
        <span className="gb-extension-region"><AppIcon name="map-pin" size={12} /> Wilayah: {worker.regions.join(' · ')}</span>
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
        <img src={asset(region.image)} alt={region.name} />
        <span className="gb-region-image-shade" />
        <b>0{index + 1}</b>
        <span><AppIcon name="arrow-up-right" size={14} /></span>
      </span>
      <span className="gb-region-copy">
        <strong>{region.name}</strong>
        <small><AppIcon name="map-pin" size={12} /> {region.village} <i /> {region.elevation}</small>
        <em><AppIcon name="coffee" size={12} /> {region.specialty}</em>
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
          <img src={asset(story.image)} alt={story.title} />
          <span className="gb-event-shade" />
          <span className="gb-event-top"><b>◷ CERITA BARU</b><em>0{index + 1}</em></span>
          <span className="gb-event-copy">
            <small>{story.date} <i /> {story.location}</small>
            <strong>{story.title}</strong>
            <span>{story.type} <b><AppIcon name="arrow-up-right" size={13} /></b></span>
          </span>
        </button>
      ))}
    </div>
  );
}

function TourCard({ tour, onNavigate }: { tour: typeof coffeeTours[number]; onNavigate: (path: string) => void }) {
  return (
    <button className="gb-tour-card" onClick={() => onNavigate('/tourism')} data-testid={`button-home-tour-${tour.id}`}>
      <img src={asset(tour.image)} alt={tour.title} />
      <span className="gb-tour-shade" />
      <span className="gb-tour-copy">
        <small>{tour.type}</small>
        <strong>{tour.title}</strong>
        <span>{tour.duration} · {tour.location}</span>
      </span>
    </button>
  );
}

function TasteCarousel({ onNavigate }: { onNavigate: (path: string) => void }) {
  const tastes = [
    ['Cerah & manis', 'Lemon, melati, gula merah', 'coffee-bean-menu-original.webp', '/product/papandayan-honey'],
    ['Buah & juicy', 'Stroberi, kakao, molase', 'coffee-palm-sugar-concentrate.webp', '/product/cikajang-natural'],
    ['Hangat & nyaman', 'Karamel, cokelat, rempah', 'garut-mug.webp', '/product/samarang-dark'],
  ] as const;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % tastes.length), 4200);
    return () => window.clearInterval(timer);
  }, [tastes.length]);

  return (
    <div className="gb-taste-carousel" data-testid="taste-carousel">
      <div className="gb-taste-stage" aria-label="Pilihan jenis kopi berdasarkan profil rasa">
        {tastes.map(([title, detail, image, route], itemIndex) => {
          const relativePosition = (itemIndex - activeIndex + tastes.length) % tastes.length;
          const position = relativePosition === 0 ? 'is-active' : relativePosition === 1 ? 'is-next' : 'is-prev';
          const isActive = position === 'is-active';
          return (
            <button
              className={`gb-taste-card gb-taste-slide ${position}`}
              key={title}
              onClick={() => isActive && onNavigate(route)}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${title}: ${detail}`}
              data-testid={`button-taste-${itemIndex}`}
            >
              <img src={asset(image)} alt="" data-testid={`img-taste-${itemIndex}`} />
              <span className="gb-taste-shade" />
              <span className="gb-taste-icon"><AppIcon name="coffee" size={16} /></span>
              <span className="gb-taste-kicker">PROFIL RASA</span>
              <strong>{title}</strong>
              <span>{detail}</span>
              <AppIcon name="arrow-up-right" size={14} />
            </button>
          );
        })}
      </div>
      <div className="gb-taste-dots" aria-label="Pilih jenis kopi">
        {tastes.map(([title], itemIndex) => (
          <button
            key={title}
            className={`gb-page-dot ${activeIndex === itemIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(itemIndex)}
            aria-label={`Tampilkan profil ${title}`}
            aria-current={activeIndex === itemIndex}
            data-testid={`button-taste-dot-${itemIndex}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage({ onNavigate, onAddToCart, onToggleFavorite, favorites }: HomePageProps) {
  const diversified = homeContent.diversifiedProducts;
  const firstCoffees = coffeeCatalog.slice(0, 10);

  return (
    <div className="gb-home">
      <div className="gb-home-shell">
        <Header onNavigate={onNavigate} />
        <main className="gb-home-content">
          <SearchEntry onNavigate={onNavigate} />
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

          <section className="gb-home-section">
            <SectionTitle title="Lebih dari secangkir" action="Lihat semua" onAction={() => onNavigate('/diversification')} />
            <DiversifiedCarousel products={diversified} onNavigate={onNavigate} onAddToCart={onAddToCart} />
          </section>

          <GrowthStats onNavigate={onNavigate} />

          <section className="gb-home-section">
            <SectionTitle title="Mulai dari selera" action="Jelajahi" onAction={() => onNavigate('/catalog')} />
            <TasteCarousel onNavigate={onNavigate} />
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

          <section className="gb-home-section gb-mobile-only">
            <SectionTitle title="Selalu ada cerita baru" action="Lihat agenda" onAction={() => onNavigate('/events')} />
            <EventStoryRail onNavigate={onNavigate} />
          </section>

          <section className="gb-home-section gb-mobile-only">
            <SectionTitle title="Datang ke kebunnya" action="Lihat wisata" onAction={() => onNavigate('/tourism')} />
            <div className="gb-tour-grid" data-testid="tour-grid">
              {coffeeTours.slice(0, 2).map((tour) => <TourCard key={tour.id} tour={tour} onNavigate={onNavigate} />)}
            </div>
          </section>

          <div className="gb-mobile-home-footer gb-mobile-only">
            <img src={asset('garut-mountains.webp')} alt="Ilustrasi pegunungan Garut" />
            <span>DARI KEBUN GARUT, UNTUK SETIAP CANGKIR</span>
          </div>

        </main>
        <SiteFooter onNavigate={onNavigate} />
        <nav className="gb-bottom-nav" aria-label="Navigasi utama">
          <button className="active" onClick={() => onNavigate('/')} data-testid="nav-home"><span className="gb-home-nav-mark"><img src={asset('home-coffee-house.png')} alt="" /></span><span>Beranda</span></button>
          <button onClick={() => onNavigate('/catalog')} data-testid="nav-explore"><span className="gb-nav-app-icon"><img src={asset('app-menu-product.png')} alt="" /></span><span>Produk</span></button>
          <button className="gb-nav-center" onClick={() => onNavigate('/traceability')} data-testid="nav-traceability"><span><img src={asset('app-nav-traceability.png')} alt="" /></span><span>Jejak</span></button>
          <button onClick={() => onNavigate('/orders')} data-testid="nav-orders"><span className="gb-nav-app-icon"><img src={asset('app-nav-orders.png')} alt="" /></span><span>Pesanan</span></button>
          <button onClick={() => onNavigate('/profile')} data-testid="nav-profile"><span className="gb-nav-app-icon"><img src={asset('app-nav-account.png')} alt="" /></span><span>Akun</span></button>
        </nav>
      </div>
    </div>
  );
}