import { createContext, createElement, Fragment, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Trash2, ClipboardList, Clock3, FileText, Factory, Leaf, LocateFixed, MessageSquare, Menu,
  Wallet, Wheat,
} from 'lucide-react';
import type { LucideIcon, LucideProps } from 'lucide-react';
import { Route, Router as WouterRouter, Switch, useLocation, useParams } from 'wouter';
import {
  authSessionStorageKey,
  brandTokens,
  canAccessRoute,
  coffeeCatalog,
  getRoleProfile,
  roleProfiles,
  farmers,
  regions,
  coffeeTours,
  diversifiedProducts,
  hubStats,
  homeContent as sharedHomeContent,
  type AuthRole,
  type RoleProfile,
  type SharedCoffee,
} from '@workspace/kopi-garut-shared';
import HomePage from '@/pages/home-page';
import { useWebStorageJson } from '@/lib/web-storage';
import { AppIcon, AppNavGlyph, type AppIconName } from '@/components/app-icon';

const mobileIcon = (name: AppIconName): LucideIcon => {
  const Icon = ({ size = 24, color = 'currentColor', strokeWidth = 1.8, className, style }: LucideProps) => (
    <AppIcon
      name={name}
      size={size}
      color={color}
      strokeWidth={Number(strokeWidth) || 1.8}
      className={className}
      style={style}
    />
  );
  return Icon as LucideIcon;
};

const ArrowLeft = mobileIcon('arrow-left');
const ArrowRight = mobileIcon('arrow-up-right');
const Barcode = mobileIcon('barcode');
const Bell = mobileIcon('bell');
const BriefcaseBusiness = mobileIcon('briefcase');
const CalendarDays = mobileIcon('calendar');
const ChevronRight = mobileIcon('chevron-right');
const CircleUserRound = mobileIcon('user');
const Coffee = mobileIcon('coffee');
const Compass = mobileIcon('compass');
const Heart = mobileIcon('heart');
const Home = mobileIcon('home');
const Map = mobileIcon('map');
const MapPin = mobileIcon('map-pin');
const Minus = mobileIcon('minus');
const Package = mobileIcon('package');
const Plus = mobileIcon('plus');
const Search = mobileIcon('search');
const Scan = mobileIcon('scan');
const Settings = mobileIcon('settings');
const ShieldCheck = mobileIcon('shield');
const ShoppingBag = mobileIcon('shopping-bag');
const SlidersHorizontal = mobileIcon('sliders');
const Sparkles = mobileIcon('sparkles');
const Users = mobileIcon('users');
const BarChart3 = mobileIcon('bar-chart-2');
const Check = mobileIcon('check');
const CheckCircle2 = mobileIcon('check');
const GraduationCap = mobileIcon('graduation-cap');
const Network = mobileIcon('network');
const Send = mobileIcon('send');
const TrendingUp = mobileIcon('trending-up');
const X = mobileIcon('x');
const Farmer = mobileIcon('farmer');

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`;

type Coffee = Omit<SharedCoffee, 'image' | 'tastingNotes'> & { notes: string[]; image: string };

const coffees: Coffee[] = coffeeCatalog.map(({ tastingNotes, image, ...coffee }) => ({
  ...coffee,
  notes: tastingNotes,
  image: asset(image),
}));

const traceabilityLot = {
  id: 'KG-26001',
  coffeeId: 'papandayan-honey',
  variety: 'Arabika',
  region: 'Papandayan',
  weightKg: 350,
  process: 'Madu',
  harvestDate: '12 September 2026',
  productionDate: '20 September 2026',
  storyTitle: 'Satu cangkir, banyak kehidupan.',
  story: 'Di lereng Papandayan, kopi dipetik saat kulitnya merah penuh oleh keluarga tani yang merawat kebun dari musim ke musim. Setelah melalui proses madu dan pengeringan perlahan, biji ini disangrai ringan–sedang agar rasa lemon, gula merah, dan melatinya tetap terasa jernih. Bagi mereka, kopi bukan sekadar panen: kopi adalah pekerjaan yang menghidupkan rumah, menjaga kebun tetap terawat, dan membuka kesempatan bagi tangan-tangan lain untuk ikut bekerja.',
  impact: 'Saat kamu memilih lot ini, kamu ikut menjaga pekerjaan di kebun, rumah pengeringan, proses sortir, hingga pengiriman. Jadi, yang sampai ke cangkir bukan hanya rasa—tetapi juga kesempatan untuk tumbuh bersama.',
  journey: [
    { label: 'Kebun', title: 'Dipetik saat matang', detail: 'Buah merah dipilih satu per satu di ketinggian 1.650 mdpl.' },
    { label: 'Proses', title: 'Dikeringkan dengan sabar', detail: 'Lapisan madu dijaga selama pengeringan untuk membangun rasa manis.' },
    { label: 'Cangkir', title: 'Diseduh untuk dinikmati', detail: 'Sangrai ringan–sedang menjaga akhir rasa tetap bersih dan hangat.' },
  ],
} as const;

const formatPrice = (value: number) => `Rp ${value.toLocaleString('id-ID')}`;
const weekdays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const homeDate = () => { const d = new Date(); return `${weekdays[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`; };
const orderStatusSteps = ['Dipesan', 'Diproses', 'Diantar'] as const;
const orderStatusDescriptions: Record<(typeof orderStatusSteps)[number], string> = {
  Dipesan: 'Pesanan diterima dan menunggu diproses.',
  Diproses: 'Kopi sedang disiapkan dengan teliti.',
  Diantar: 'Pesanan sudah sampai di rumahmu.',
};
const getOrderStatusIndex = (status: string) => {
  if (status === 'Preparing' || status === 'Diproses') return 1;
  if (status === 'Delivered' || status === 'Diantar') return 2;
  return 0;
};

type CartItem = { id: string; quantity: number };
type Order = { id: string; items: CartItem[]; total: number; createdAt: string; status: string };
type StoreValue = {
  cart: CartItem[]; favorites: string[]; orders: Order[];
  cartNotice: { id: string; quantity: number } | null;
  addToCart: (id: string, quantity?: number) => void; updateQuantity: (id: string, quantity: number) => void;
  toggleFavorite: (id: string) => void; placeOrder: () => void; notify: (message: string) => void; dismissCartNotice: () => void;
};
const StoreContext = createContext<StoreValue | null>(null);
const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('StoreProvider is missing');
  return context;
};

function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useWebStorageJson<CartItem[]>('kopi-garut-cart', []);
  const [favorites, setFavorites] = useWebStorageJson<string[]>('kopi-garut-favorites', []);
  const [orders, setOrders] = useWebStorageJson<Order[]>('kopi-garut-orders', []);
  const [notice, setNotice] = useState('');
  const [cartNotice, setCartNotice] = useState<{ id: string; quantity: number } | null>(null);
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(''), 2200); return () => window.clearTimeout(timer); }, [notice]);
  useEffect(() => { if (!cartNotice) return; const timer = window.setTimeout(() => setCartNotice(null), 4800); return () => window.clearTimeout(timer); }, [cartNotice]);
  const notify = (message: string) => setNotice(message);
  const addToCart = (id: string, quantity = 1) => {
    setCartNotice({ id, quantity });
    setCart((current) => {
      const found = current.find((item) => item.id === id);
      return found ? current.map((item) => item.id === id ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { id, quantity }];
    });
  };
  const dismissCartNotice = () => setCartNotice(null);
  const updateQuantity = (id: string, quantity: number) => setCart((current) => quantity <= 0 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item));
  const toggleFavorite = (id: string) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    notify(favorites.includes(id) ? 'Dihapus dari favorit' : 'Disimpan ke favorit');
  };
  const placeOrder = () => {
    if (!cart.length) return;
    const total = cart.reduce((sum, item) => sum + (coffees.find((coffee) => coffee.id === item.id)?.price || 0) * item.quantity, 0);
    setOrders((current) => [{ id: `KG-${Date.now().toString().slice(-6)}`, items: cart, total, createdAt: homeDate(), status: 'Dipesan' }, ...current]);
    setCart([]);
    notify('Pesanan berhasil dibuat');
  };
  return <StoreContext.Provider value={{ cart, favorites, orders, cartNotice, addToCart, updateQuantity, toggleFavorite, placeOrder, notify, dismissCartNotice }}>{children}{notice && <div className="toast" role="status" data-testid="status-toast">{notice}</div>}</StoreContext.Provider>;
}

type WebAuthValue = {
  session: RoleProfile | null;
  signIn: (role: AuthRole) => void;
  signOut: () => void;
};

const WebAuthContext = createContext<WebAuthValue | null>(null);
const useAuth = () => {
  const context = useContext(WebAuthContext);
  if (!context) throw new Error('WebAuthProvider is missing');
  return context;
};

function WebAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<RoleProfile | null>(() => {
    try {
      const stored = localStorage.getItem(authSessionStorageKey);
      const parsed = stored ? JSON.parse(stored) as { id?: AuthRole } : null;
      return parsed?.id ? getRoleProfile(parsed.id) : null;
    } catch {
      return null;
    }
  });

  const signIn = (role: AuthRole) => {
    const nextSession = getRoleProfile(role);
    setSession(nextSession);
    localStorage.setItem(authSessionStorageKey, JSON.stringify(nextSession));
  };
  const signOut = () => {
    setSession(null);
    localStorage.removeItem(authSessionStorageKey);
  };

  return <WebAuthContext.Provider value={{ session, signIn, signOut }}>{children}</WebAuthContext.Provider>;
}

function Header({ home = false, title = 'Garut Beans', subtitle }: { home?: boolean; title?: string; subtitle?: string }) {
  const [, setLocation] = useLocation();
  const { cart } = useStore();
  return <header className={home ? 'header' : 'subpage-head'}>
     {home ? <div className="header-top">
       <div className="brand"><div className="logo-frame"><img src={asset('kopi-garut-logo.png')} alt="Logo Garut Beans" /></div><div className="brand-lines"><div className="brand-name"><span>Garut</span><strong>Beans</strong></div><div className="brand-meta">G-BEANS · SPECIALTY COFFEE</div></div></div>
      <div className="header-actions"><button className="icon-orb" onClick={() => setLocation('/notifications')} aria-label="Buka notifikasi" data-testid="button-notifications"><AppNavGlyph name="bell" size={24} /></button><button className="icon-orb" onClick={() => setLocation('/cart')} aria-label="Buka keranjang" data-testid="button-cart"><AppNavGlyph name="shopping-cart" size={24} />{cart.length > 0 && <span className="count-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}</button></div>
       </div> : <><button className="back-button" onClick={() => setLocation('/')} aria-label="Kembali" data-testid="button-back"><ArrowLeft size={18} /></button><div className="subpage-title-wrap"><h1 className="page-title">{title}</h1>{subtitle && <span className="subpage-subtitle">{subtitle}</span>}</div><div className="header-actions" style={{ marginLeft: 'auto' }}><button className="icon-orb" onClick={() => setLocation('/')} aria-label="Kembali ke beranda" data-testid="button-header-home"><img className="header-home-image" src={asset('home-coffee-house.png')} alt="" /></button><button className="icon-orb" onClick={() => setLocation('/cart')} aria-label="Buka keranjang" data-testid="button-header-cart"><AppNavGlyph name="shopping-cart" size={24} />{cart.length > 0 && <span className="count-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}</button></div></>}
    {home && <div className="header-copy"><div><div className="greeting">Mau <em>menikmati</em><br />kopi apa hari ini?</div><div className="date-line">{homeDate()}</div></div></div>}
  </header>;
}

function BottomNav() {
  const [location, setLocation] = useLocation();
  const active = location === '/' ? 'home' : location.startsWith('/catalog') || location.startsWith('/product') || location.startsWith('/favorites') ? 'explore' : location.startsWith('/traceability') ? 'trace' : location.startsWith('/orders') || location.startsWith('/cart') ? 'orders' : 'profile';
  const items: { id: string; label: string; icon: AppIconName; path: string }[] = [
    { id: 'home', label: 'Beranda', icon: 'home', path: '/' },
    { id: 'explore', label: 'Jelajah', icon: 'coffee', path: '/catalog' },
    { id: 'trace', label: 'Jejak', icon: 'barcode', path: '/traceability' },
    { id: 'orders', label: 'Pesanan', icon: 'package', path: '/orders' },
    { id: 'profile', label: 'Akun', icon: 'farmer', path: '/profile' },
  ];
  return <nav className="bottom-nav" aria-label="Navigasi utama">{items.map(({ id, label, icon, path }) => <button key={id} className={`${active === id ? 'active' : ''} ${id === 'trace' ? 'center' : ''}`} onClick={() => setLocation(path)} data-testid={`nav-${id}`} aria-current={active === id ? 'page' : undefined}><span className="nav-icon"><AppIcon name={icon} size={24} /></span><span>{label}</span></button>)}</nav>;
}

function FloatingActions() {
  const [, setLocation] = useLocation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let showTimer: number | undefined;
    const handleScroll = () => {
      setVisible(false);
      if (showTimer) window.clearTimeout(showTimer);
      showTimer = window.setTimeout(() => setVisible(true), 260);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (showTimer) window.clearTimeout(showTimer);
    };
  }, []);

  return (
    <div className={`floating-actions ${visible ? 'is-visible' : 'is-hidden'}`} aria-label="Akses cepat">
      <button className="floating-action floating-action-chat" onClick={() => setLocation('/support')} aria-label="Buka chat bantuan" data-testid="floating-chat">
        <span className="floating-action-icon"><MessageSquare size={18} /></span>
        <span className="floating-action-label">Chat</span>
      </button>
      <button className="floating-action floating-action-game" onClick={() => setLocation('/coffee-game')} aria-label="Buka mini games" data-testid="floating-games">
        <span className="floating-action-icon"><Coffee size={18} /></span>
        <span className="floating-action-label">Games</span>
      </button>
    </div>
  );
}

function CartPreview() {
  const [, setLocation] = useLocation();
  const { cart, cartNotice, dismissCartNotice } = useStore();
  if (!cartNotice) return null;
  const coffee = coffees.find((item) => item.id === cartNotice.id);
  if (!coffee) return null;
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  return <button className="cart-preview" onClick={() => { dismissCartNotice(); setLocation('/cart'); }} aria-label={`Buka keranjang, ${count} item`} data-testid="cart-preview"><img src={coffee.image} alt="" /><span className="cart-preview-copy"><small>{cartNotice.quantity} item ditambahkan</small><strong>{coffee.name}</strong><em>{count} item di keranjang</em></span><span className="cart-preview-action"><ShoppingBag size={15} /> Lihat</span></button>;
}

function SearchEntry({ catalog = false, value: controlledValue, onChange, filterOpen = false, onFilterToggle, activeFilterCount = 0 }: { catalog?: boolean; value?: string; onChange?: (value: string) => void; filterOpen?: boolean; onFilterToggle?: () => void; activeFilterCount?: number }) {
  const [, setLocation] = useLocation();
  const [localValue, setLocalValue] = useState('');
  const value = controlledValue ?? localValue;
  const handleChange = (nextValue: string) => { onChange ? onChange(nextValue) : setLocalValue(nextValue); };
  return <div className={`search-entry ${catalog ? 'catalog-search' : ''}`}><img className="search-bean" src={asset('coffee-bean-menu.webp')} alt="" /><input value={value} onChange={(event) => handleChange(event.target.value)} onFocus={() => !catalog && setLocation('/catalog')} placeholder={catalog ? 'Cari nama, asal, atau rasa' : 'Cari kopi, petani, atau wilayah'} aria-label="Cari kopi" data-testid={catalog ? 'input-catalog-search' : 'input-home-search'} />{catalog ? <button type="button" className={`filter-orb ${filterOpen ? 'active' : ''}`} onClick={onFilterToggle} aria-label={filterOpen ? 'Tutup filter kategori' : 'Buka filter kategori'} aria-expanded={filterOpen} data-testid="button-catalog-filter"><Menu size={17} />{activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}</button> : <div className="filter-orb"><SlidersHorizontal size={15} /></div>}</div>;
}

function ProductCard({ coffee }: { coffee: Coffee }) {
  const [, setLocation] = useLocation();
  const { favorites, toggleFavorite, addToCart } = useStore();
  const saved = favorites.includes(coffee.id);
  return <article className="product-card" data-testid={`card-product-${coffee.id}`}>
    <button className="product-image-wrap" onClick={() => setLocation(`/product/${coffee.id}`)} data-testid={`button-product-${coffee.id}`}>
      <img className="product-image" src={coffee.image} alt={coffee.name} />
      {coffee.badge && <span className="badge">{coffee.badge}</span>}
    </button>
    <div className="product-card-body">
      <div className="product-title">{coffee.name}</div>
      <div className="product-origin"><MapPin size={11} /> {coffee.origin}</div>
      <div className="product-tagline">{coffee.tagline}</div>
      <div className="product-specs"><span>{coffee.process}</span><span>{coffee.roast}</span><span>{coffee.altitude}</span></div>
      <div className="product-notes">{coffee.notes.slice(0, 2).map((note) => <span key={note}>{note}</span>)}</div>
      <div className="product-price">{formatPrice(coffee.price)} <span>/ 200g · {coffee.stock} tersedia</span></div>
    </div>
    <button className={`fav-button ${saved ? 'saved' : ''}`} onClick={() => toggleFavorite(coffee.id)} aria-label={saved ? `Hapus ${coffee.name} dari favorit` : `Simpan ${coffee.name}`} data-testid={`button-favorite-${coffee.id}`}><Heart size={17} fill={saved ? 'currentColor' : 'none'} /></button>
    <button className="product-add" onClick={() => addToCart(coffee.id)} data-testid={`button-add-${coffee.id}`}><Plus size={15} /> Tambah ke keranjang</button>
  </article>;
}

function DiversifiedProductCard({ product, saved, onSave }: { product: typeof diversifiedProducts[number]; saved: boolean; onSave: () => void }) {
  return <article className="diversified-card catalog-diversified-card" data-testid={`card-catalog-product-${product.id}`}>
    <div className="diversified-image"><img src={asset(product.image)} alt={product.title} /><span>{product.badge}</span></div>
    <div className="diversified-body">
      <small>{product.category}</small>
      <strong>{product.title}</strong>
      <p>{product.status}</p>
      {product.size && <em>{product.size}</em>}
      <div><b>{product.price}</b><button className="text-button" onClick={onSave} data-testid={`button-save-catalog-product-${product.id}`}>{saved ? 'Tersimpan' : 'Simpan'} <ArrowRight size={13} /></button></div>
    </div>
  </article>;
}

function SectionTitle({ kicker, title, action, onAction }: { kicker?: string; title: string; action?: string; onAction?: () => void }) {
  return <div className="section-heading"><div>{kicker && <div className="section-kicker">{kicker}</div>}<h2>{title}</h2></div>{action && <button className="see-all" onClick={onAction} data-testid={`button-see-${title.toLowerCase().replaceAll(' ', '-')}`}>{action}</button>}</div>;
}

function WebHomeRoute() {
  const [, setLocation] = useLocation();
  const { favorites, addToCart, toggleFavorite } = useStore();
  return <>
    <HomePage
      onNavigate={setLocation}
      onAddToCart={(id) => addToCart(id)}
      onToggleFavorite={toggleFavorite}
      favorites={favorites}
    />
    <BottomNav />
    <CartPreview />
  </>;
}

function Page({ children }: { children: ReactNode }) {
  return <div className="app-viewport"><div className="app-page">{children}</div><BottomNav /><CartPreview /></div>;
}

function CatalogPage() {
  const [, setLocation] = useLocation();
  const { notify } = useStore();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [scope, setScope] = useState<'Semua' | 'Kopi' | 'Karya kopi'>('Semua');
  const [filterOpen, setFilterOpen] = useState(false);
  const [savedProducts, setSavedProducts] = useWebStorageJson<string[]>('kopi-garut-catalog-products', []);
  const coffeeCategories = Array.from(new Set(coffees.map((coffee) => coffee.category)));
  const productCategories = Array.from(new Set(diversifiedProducts.map((product) => product.category)));
  const filters = scope === 'Kopi'
    ? ['Semua', ...coffeeCategories]
    : scope === 'Karya kopi'
      ? ['Semua', ...productCategories]
      : ['Semua', ...coffeeCategories, ...productCategories];
  const normalizedQuery = query.trim().toLowerCase();
  const filteredCoffees = useMemo(() => coffees.filter((coffee) => {
    const matchesFilter = filter === 'Semua' || coffee.category === filter;
    const searchable = [
      coffee.name, coffee.series, coffee.tagline, coffee.origin, coffee.process, coffee.roast,
      coffee.altitude, coffee.category, coffee.recommendedBrew, coffee.farmerName, coffee.farmerGroup,
      coffee.notes.join(' '),
    ].join(' ').toLowerCase();
    return scope !== 'Karya kopi' && matchesFilter && searchable.includes(normalizedQuery);
  }), [filter, normalizedQuery, scope]);
  const filteredProducts = useMemo(() => diversifiedProducts.filter((product) => {
    const matchesFilter = filter === 'Semua' || product.category === filter;
    const searchable = [product.title, product.category, product.status, product.badge, product.description, product.maker, product.impact, product.size].filter(Boolean).join(' ').toLowerCase();
    return scope !== 'Kopi' && matchesFilter && searchable.includes(normalizedQuery);
  }), [filter, normalizedQuery, scope]);
  const resultCount = filteredCoffees.length + filteredProducts.length;
  const totalCatalogProducts = coffees.length + diversifiedProducts.length;
  const featuredCoffee = coffees[0];
  const activeFilterCount = (scope !== 'Semua' ? 1 : 0) + (filter !== 'Semua' ? 1 : 0);
  const selectScope = (nextScope: 'Semua' | 'Kopi' | 'Karya kopi') => {
    setScope(nextScope);
    setFilter('Semua');
  };
  const saveProduct = (id: string, title: string) => {
    const alreadySaved = savedProducts.includes(id);
    setSavedProducts((current) => alreadySaved ? current.filter((item) => item !== id) : [...current, id]);
    notify(alreadySaved ? `${title} dihapus dari simpanan` : `${title} disimpan di perangkat`);
  };
  return <Page><main className="subpage catalog-page">
    <Header title="Jelajahi kopi" />
    <CatalogCarousel onNavigate={setLocation} />
    <div className="catalog-discovery-panel">
       <SearchEntry catalog value={query} onChange={setQuery} filterOpen={filterOpen} onFilterToggle={() => setFilterOpen((open) => !open)} activeFilterCount={activeFilterCount} />
       {filterOpen && <div className="catalog-filter-drawer" aria-label="Filter pencarian katalog">
         <div className="catalog-filter-drawer-head">
           <div><span className="section-kicker">FILTER PENCARIAN</span><strong>Pilih kategori</strong></div>
           <button type="button" className="catalog-filter-reset" onClick={() => { setFilter('Semua'); setScope('Semua'); }} disabled={activeFilterCount === 0}>Bersihkan</button>
         </div>
         <div className="catalog-scope-pills" role="tablist" aria-label="Jenis produk">
           {(['Semua', 'Kopi', 'Karya kopi'] as const).map((item) => <button key={item} className={`catalog-scope-pill ${scope === item ? 'active' : ''}`} onClick={() => selectScope(item)} role="tab" aria-selected={scope === item} data-testid={`catalog-scope-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}<small>{item === 'Semua' ? totalCatalogProducts : item === 'Kopi' ? coffees.length : diversifiedProducts.length}</small></button>)}
         </div>
         <div className="catalog-filter-options" aria-label="Kategori">
           {filters.map((item) => {
             const count = item === 'Semua'
               ? (scope === 'Kopi' ? coffees.length : scope === 'Karya kopi' ? diversifiedProducts.length : totalCatalogProducts)
               : (scope !== 'Karya kopi' ? coffees.filter((coffee) => coffee.category === item).length : 0) + (scope !== 'Kopi' ? diversifiedProducts.filter((product) => product.category === item).length : 0);
             return <button className={`filter-pill ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)} key={item} data-testid={`filter-${item.toLowerCase().replaceAll(' ', '-')}`}>{filter === item && <Check size={12} />}{item}<small>{count}</small></button>;
           })}
         </div>
       </div>}
       <CatalogVoucherStrip onSelect={(code) => notify(`Kode voucher ${code} siap digunakan`)} />
    </div>
     {filteredCoffees.length > 0 && <section className="catalog-group"><div className="catalog-group-heading"><div><h2>Kopi pilihan</h2></div><small>{filteredCoffees.length} profil kopi</small></div><div className="product-grid catalog-product-grid">{filteredCoffees.map((coffee) => <ProductCard key={coffee.id} coffee={coffee} />)}</div></section>}
     {filteredProducts.length > 0 && <section className="catalog-group catalog-products-group"><div className="catalog-group-heading"><div><h2>Karya kopi</h2></div><small>{filteredProducts.length} produk turunan</small></div><div className="product-grid catalog-product-grid">{filteredProducts.map((product) => <DiversifiedProductCard key={product.id} product={product} saved={savedProducts.includes(product.id)} onSave={() => saveProduct(product.id, product.title)} />)}</div></section>}
    {!resultCount && <EmptyState icon={Search} title="Belum ada yang cocok" text="Coba nama produk, rasa, wilayah, atau kategori lain untuk menemukan pilihanmu." action="Bersihkan pencarian" onAction={() => { setQuery(''); setFilter('Semua'); setScope('Semua'); }} />}
  </main></Page>;
}

function CatalogVoucherStrip({ onSelect }: { onSelect: (code: string) => void }) {
  const vouchers = sharedHomeContent.vouchers.flat();
  return <section className="catalog-voucher-section" aria-label="Voucher yang tersedia">
    <div className="catalog-voucher-rail">
      {vouchers.map((voucher, index) => <button type="button" className={`catalog-voucher-card ${voucher.variant === 'dark' ? 'dark' : ''}`} key={voucher.code} onClick={() => onSelect(voucher.code)} data-testid={`catalog-voucher-${voucher.code}`}>
        <span className="catalog-voucher-copy">
          <small>VOUCHER</small>
          <strong>{voucher.discount}</strong>
          <b>{voucher.title}</b>
          <em>{voucher.note}</em>
        </span>
        <span className="catalog-voucher-code"><small>KODE</small><b>{voucher.code}</b><em>Pakai</em></span>
        <span className="catalog-voucher-index">{index + 1}</span>
      </button>)}
    </div>
  </section>;
}

function CatalogCarousel({ onNavigate }: { onNavigate: (path: string) => void }) {
  const cleanPromoImages = ['kopi-garut-panen-rasa-banner.webp', 'origin-coffee.webp', 'hero-coffee.webp'] as const;
  const promos = sharedHomeContent.promoSlides.slice(0, 3).map((promo, promoIndex) => ({ ...promo, image: cleanPromoImages[promoIndex] }));
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

  return <section className="gb-promo catalog-home-promo" data-testid="catalog-promo-carousel" aria-label="Promosi Garut Beans">
    <div className="gb-promo-stage">
      {visiblePromos.map(({ slot, promo }) => {
        const isActive = slot === 0;
        return <article className={`gb-promo-card ${isActive ? 'is-active' : slot < 0 ? 'is-prev' : 'is-next'}`} key={`${promo.id}-${slot}`} aria-hidden={!isActive}>
          <div className="gb-promo-slide">
            {isActive && <div className="gb-promo-copy">
              <span className="gb-eyebrow">{promo.eyebrow}</span>
              <h1 data-testid="text-catalog-promo-title">{promo.title}</h1>
              <p>{promo.description}</p>
              <button className="gb-text-action" onClick={() => onNavigate(promo.route)} data-testid="button-catalog-promo-action">{promo.cta} <ArrowRight size={15} /></button>
            </div>}
            <div className="gb-promo-media">
              <img src={asset(promo.image)} alt={isActive ? promo.title : ''} data-testid={`img-catalog-promo-${promo.id}`} />
              <div className="gb-promo-shade" />
            </div>
          </div>
        </article>;
      })}
    </div>
  </section>;
}

function EmptyState({ icon: Icon, title, text, action, onAction }: { icon: LucideIcon; title: string; text: string; action?: string; onAction?: () => void }) {
  return <div className="empty-state"><div className="empty-icon"><Icon size={25} /></div><h3>{title}</h3><p>{text}</p>{action && <button className="primary-button" onClick={onAction} data-testid="button-empty-action">{action}</button>}</div>;
}

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const coffee = coffees.find((item) => item.id === id) || coffees[0];
  const { favorites, toggleFavorite, addToCart } = useStore();
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const saved = favorites.includes(coffee.id);
  return <Page><main className="subpage"><div className="detail-image"><img src={coffee.image} alt={coffee.name} /><button className="back-button" onClick={() => setLocation('/catalog')} aria-label="Kembali ke katalog" data-testid="button-detail-back"><ArrowLeft size={18} /></button><button className={`fav-button ${saved ? 'saved' : ''}`} onClick={() => toggleFavorite(coffee.id)} aria-label="Simpan favorit" data-testid="button-detail-favorite"><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button></div><div className="detail-copy"><div className="detail-series">{coffee.origin} · {coffee.process}</div><h1 className="detail-name">{coffee.name}</h1><p className="detail-tagline">{coffee.tagline}</p><div className="detail-price">{formatPrice(coffee.price)} <small>/ 200g</small></div><div className="stat-row"><div className="stat"><b>{coffee.roast}</b><span>Sangrai</span></div><div className="stat"><b>{coffee.process}</b><span>Proses</span></div><div className="stat"><b>{coffee.altitude}</b><span>Ketinggian</span></div></div><p className="detail-description">{coffee.description}</p><div className="taste-list">{coffee.notes.map((note) => <span className="taste" key={note}>{note}</span>)}</div><div className="sticky-buy"><div className="quantity"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Kurangi jumlah" data-testid="button-detail-minus"><Minus size={14} /></button><b data-testid="text-detail-quantity">{quantity}</b><button onClick={() => setQuantity((value) => value + 1)} aria-label="Tambah jumlah" data-testid="button-detail-plus"><Plus size={14} /></button></div><button className="primary-button" onClick={() => addToCart(coffee.id, quantity)} data-testid="button-detail-add">Tambah ke keranjang</button></div></div></main></Page>;
}

function CartPage() {
  const { cart, updateQuantity, placeOrder } = useStore();
  const [, setLocation] = useLocation();
  const rows = cart.map((item) => ({ ...item, coffee: coffees.find((coffee) => coffee.id === item.id) })).filter((item) => item.coffee);
  const total = rows.reduce((sum, item) => sum + (item.coffee?.price || 0) * item.quantity, 0);
  return <Page><main className="subpage"><Header /><div className="subcopy">Periksa kembali kopi yang akan menemani harimu.</div>{rows.length ? <><div className="cart-list">{rows.map(({ id, quantity, coffee }) => coffee && <div className="cart-row" key={id}><img src={coffee.image} alt={coffee.name} /><div><div className="cart-name">{coffee.name}</div><div className="cart-detail">{coffee.origin}</div><div className="cart-price">{formatPrice(coffee.price)}</div></div><div className="cart-controls"><button className="delete-button" onClick={() => updateQuantity(id, 0)} aria-label={`Hapus ${coffee.name}`} data-testid={`button-delete-${id}`}><Trash2 size={14} /></button><div className="quantity"><button onClick={() => updateQuantity(id, quantity - 1)} aria-label="Kurangi" data-testid={`button-minus-${id}`}><Minus size={12} /></button><b>{quantity}</b><button onClick={() => updateQuantity(id, quantity + 1)} aria-label="Tambah" data-testid={`button-plus-${id}`}><Plus size={12} /></button></div></div></div>)}</div><div className="summary"><div className="summary-line"><span>Subtotal</span><b>{formatPrice(total)}</b></div><div className="summary-line"><span>Pengiriman</span><b>Ditentukan saat checkout</b></div><div className="summary-line total"><span>Total sementara</span><b>{formatPrice(total)}</b></div><button className="primary-button" onClick={placeOrder} data-testid="button-place-order">Buat pesanan</button></div></> : <EmptyState icon={ShoppingBag} title="Keranjang masih kosong" text="Pilih kopi yang ingin kamu bawa pulang dari lereng Garut." action="Jelajahi katalog" onAction={() => setLocation('/catalog')} />}</main></Page>;
}

function FavoritesPage() {
  const { favorites } = useStore();
  const [, setLocation] = useLocation();
  const saved = coffees.filter((coffee) => favorites.includes(coffee.id));
  return <Page><main className="subpage"><Header /><div className="subcopy">Simpan rasa yang ingin kamu seduh lagi.</div>{saved.length ? <div className="product-grid">{saved.map((coffee) => <ProductCard key={coffee.id} coffee={coffee} />)}</div> : <EmptyState icon={Heart} title="Belum ada favorit" text="Tekan ikon hati pada kopi yang ingin kamu ingat." action="Lihat katalog" onAction={() => setLocation('/catalog')} />}</main></Page>;
}

function OrdersPage() {
  const { orders } = useStore();
  const [, setLocation] = useLocation();
  return <Page><main className="subpage orders-page">
    <Header title="Pesanan" />
    <section className="orders-intro">
      <div className="orders-intro-copy">
        <span className="section-kicker">RIWAYAT BELANJA</span>
        <h1>{orders.length > 0 ? 'Kopi yang pernah kamu pilih.' : 'Mulai ritual kopimu.'}</h1>
        <p>{orders.length > 0 ? 'Semua perjalanan pesananmu tersimpan di sini.' : 'Pesanan pertamamu akan menjadi awal perjalanan rasa.'}</p>
      </div>
      <div className="orders-intro-icon"><Package size={27} /><strong>{orders.length.toString().padStart(2, '0')}</strong></div>
    </section>
    {orders.length === 0 ? <section className="orders-empty">
      <span className="orders-empty-icon"><Coffee size={24} /></span>
      <h2>Belum ada pesanan</h2>
      <p>Jelajahi Garut Beans dan temukan cangkir yang ingin kamu bawa pulang.</p>
      <button className="primary-button orders-browse-button" onClick={() => setLocation('/catalog')} data-testid="orders-browse-coffee">Jelajahi kopi <ArrowRight size={15} /></button>
    </section> : <div className="orders-list">
      {orders.map((order, index) => {
        const firstCoffee = coffees.find((coffee) => coffee.id === order.items[0]?.id);
        const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
        const itemNames = order.items.map((item) => coffees.find((coffee) => coffee.id === item.id)?.name).filter(Boolean).join(' · ');
        const statusIndex = getOrderStatusIndex(order.status);
        const statusLabel = orderStatusSteps[statusIndex];
        return <article className="orders-card" key={order.id} style={{ '--order-delay': `${index * 70}ms` } as React.CSSProperties}>
          <div className="orders-card-top">
            <div className="orders-card-meta"><div className="orders-label-row"><span /> <small>PESANAN TERBARU</small></div><strong>#{order.id.slice(-6)}</strong></div>
            <span className="orders-status"><i />{statusLabel}</span>
          </div>
          <time className="orders-date">{order.createdAt}</time>
          <div className="orders-status-summary">
            <span>{statusIndex === 2 ? <Check size={17} /> : statusIndex === 1 ? <Coffee size={17} /> : <Package size={17} />}</span>
            <div><strong>{orderStatusDescriptions[statusLabel]}</strong><small>{statusIndex === 2 ? 'Terima kasih sudah memilih Garut Beans.' : 'Kami akan memberi kabar di setiap tahap.'}</small></div>
          </div>
          <div className="orders-progress" aria-label={`Status pesanan ${statusLabel}`}>
            {orderStatusSteps.map((step, stepIndex) => <Fragment key={step}><div className="orders-progress-step"><span className={stepIndex <= statusIndex ? 'complete' : ''}>{stepIndex <= statusIndex && <Check size={10} />}</span><small>{step}</small></div>{stepIndex < orderStatusSteps.length - 1 && <i className={stepIndex < statusIndex ? 'complete' : ''} />}</Fragment>)}
          </div>
          <div className="orders-divider" />
          <div className="orders-product-row">
            {firstCoffee && <img src={firstCoffee.image} alt="" />}
            <div><strong>{itemNames || 'Pesanan Garut Beans'}</strong><small>{itemCount} item · Total pesanan</small></div>
            <div className="orders-total"><small>TOTAL</small><strong>{formatPrice(order.total)}</strong></div>
          </div>
          <div className="orders-actions">
            <button className="orders-detail-button" onClick={() => firstCoffee && setLocation(`/product/${firstCoffee.id}`)} disabled={!firstCoffee} data-testid={`order-view-${order.id}`}>Lihat kopi <ArrowRight size={14} /></button>
            <button className="orders-reorder-button" onClick={() => setLocation('/catalog')} data-testid={`order-reorder-${order.id}`}><ShoppingBag size={15} /> Belanja lagi</button>
          </div>
        </article>;
      })}
    </div>}
  </main></Page>;
}

function AccountStat({ value, label }: { value: string; label: string }) {
  return <div className="account-stat"><strong>{value}</strong><span>{label}</span></div>;
}

function AccountMenuItem({ icon: Icon, title, description, onClick, destructive = false, testId }: { icon: LucideIcon; title: string; description: string; onClick: () => void; destructive?: boolean; testId: string }) {
  return <button className={`account-menu-item ${destructive ? 'destructive' : ''}`} onClick={onClick} data-testid={testId}>
    <span className="account-menu-icon"><Icon size={17} /></span>
    <span className="account-menu-copy"><strong>{title}</strong><small>{description}</small></span>
    <ChevronRight size={16} />
  </button>;
}

function GuestAccountPage() {
  const [, setLocation] = useLocation();
  return <Page><main className="subpage account-page">
    <Header title="Akun" />
    <section className="account-login-layout">
      <div className="account-login-visual">
        <div className="account-brand-line"><div className="account-brand-mark"><img src={asset('kopi-garut-logo.png')} alt="" /></div><div><strong>Garut <em>Beans</em></strong><small>G-BEANS · SPECIALTY COFFEE</small></div></div>
        <div className="account-visual-copy"><span>RUANG PERSONAL</span><h1>Ritual yang<br /><em>punya cerita.</em></h1><p>Kenali kopi, simpan pilihanmu, dan tetap dekat dengan orang-orang di balik setiap cangkir.</p></div>
        <div className="account-visual-foot"><span>GARUT, JAWA BARAT</span><span>01 / 03</span></div>
      </div>
      <div className="account-login-form">
        <span className="section-kicker">AKUN G-BEANS</span>
        <h2>Masuk ke ruangmu.</h2>
        <p className="account-form-intro">Pilih akses untuk melanjutkan pengalaman Garut Beans.</p>
        <button className="account-login-button" onClick={() => setLocation('/login?returnTo=/profile')} data-testid="profile-login">Masuk ke akun <ArrowRight size={16} /></button>
        <div className="account-role-line"><span>PILIHAN AKSES</span><strong>Pembeli · Petani · Penyuluh</strong></div>
        <div className="account-form-note"><span>Jelajah tetap terbuka</span><p>Katalog dan cerita kopi dapat diakses tanpa masuk akun.</p></div>
      </div>
    </section>
  </main></Page>;
}

function BuyerAccountPage({ profile }: { profile: RoleProfile }) {
  const [, setLocation] = useLocation();
  const { orders, cart, favorites, notify } = useStore();
  const { signOut } = useAuth();
  const [voucherSaved, setVoucherSaved] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const firstName = profile.name.split(' ')[0];
  const activeOrder = orders.find((order) => order.status !== 'Diantar' && order.status !== 'Delivered');
  const latestOrder = activeOrder ?? orders[0];
  const firstCoffee = latestOrder ? coffees.find((coffee) => coffee.id === latestOrder.items[0]?.id) : undefined;
  return <Page><main className="subpage account-page buyer-account-page">
    <Header title="Akun pembeli" />
    <section className="buyer-account-hero">
      <div className="buyer-account-top"><div className="avatar">{profile.initials}</div><span className="member-badge"><i /> MEMBER G-BEANS</span></div>
      <span className="account-hero-kicker">RUANG BELANJAMU</span><h1>Halo, {firstName}.</h1>
      <p>Pantau pesanan, gunakan voucher, dan temukan kopi untuk ritual berikutnya.</p>
      <div className="account-hero-foot"><div><small>AKUN AKTIF</small><strong>Pembeli kopi pilihan</strong></div><ShoppingBag size={26} /></div>
    </section>
    <div className="account-stat-row"><AccountStat value={`${orders.length}`} label="Pesanan" /><AccountStat value={`${cartCount}`} label="Keranjang" /><AccountStat value={`${favorites.length}`} label="Favorit" /></div>
    <section className="account-section">
      <div className="account-section-heading"><div><span className="section-kicker">PESANANMU</span><h2>Sedang berjalan</h2></div><button className="text-button" onClick={() => setLocation('/orders')} data-testid="profile-all-orders">Riwayat <ArrowRight size={13} /></button></div>
      {latestOrder && firstCoffee ? <article className="account-order-card"><img src={firstCoffee.image} alt="" /><div><strong>{latestOrder.items.map((item) => coffees.find((coffee) => coffee.id === item.id)?.name).filter(Boolean).join(' · ')}</strong><small>{latestOrder.createdAt} · {getOrderStatusIndex(latestOrder.status) === 2 ? 'Selesai' : 'Sedang diproses'}</small></div><b>{formatPrice(latestOrder.total)}</b></article> : <div className="account-empty-note"><Coffee size={19} /><span>Pesanan pertamamu akan muncul di sini. Mulai dengan kopi yang menemani pagi ini.</span></div>}
    </section>
    <section className="account-voucher">
      <div className="voucher-stamp"><strong>15%</strong><small>OFF</small></div><div><span>VOUCHER PILIHAN</span><strong>Selamat datang di ritual baru.</strong><p>Min. belanja Rp 150.000 · berlaku minggu ini</p><code>GARUT15 <Check size={13} /></code></div><button onClick={() => { setVoucherSaved((saved) => !saved); notify(voucherSaved ? 'Voucher dihapus dari simpanan' : 'Voucher GARUT15 disimpan'); }} data-testid="buyer-voucher-save">{voucherSaved ? 'Tersimpan' : 'Simpan'}</button>
    </section>
    <section className="account-section"><span className="section-kicker">BELANJA & AKUN</span><div className="account-action-grid"><button onClick={() => setLocation('/cart')} data-testid="buyer-cart"><ShoppingBag size={18} /><strong>Keranjang</strong><small>{cartCount ? `${cartCount} item siap dibayar` : 'Belum ada item'}</small></button><button onClick={() => setLocation('/favorites')} data-testid="buyer-favorites"><Heart size={18} /><strong>Favorit</strong><small>{favorites.length ? `${favorites.length} kopi tersimpan` : 'Simpan kopi favorit'}</small></button><button onClick={() => setLocation('/catalog')} data-testid="buyer-shop-again"><Coffee size={18} /><strong>Belanja lagi</strong><small>Temukan kopi pilihan</small></button><button onClick={() => setLocation('/orders')} data-testid="buyer-orders"><Package size={18} /><strong>Semua pesanan</strong><small>{orders.length} riwayat belanja</small></button></div></section>
    <div className="account-menu"><AccountMenuItem icon={MapPin} title="Alamat pengiriman" description="Atur alamat untuk pesanan berikutnya" onClick={() => notify('Alamat pengiriman akan tersedia saat checkout berikutnya')} testId="buyer-address" /><AccountMenuItem icon={Bell} title="Notifikasi pesanan" description="Lihat kabar terbaru tentang ritualmu" onClick={() => setLocation('/notifications')} testId="buyer-notifications" /><AccountMenuItem icon={CircleUserRound} title="Pusat bantuan" description="Butuh bantuan dengan pesanan?" onClick={() => notify('Tim Garut Beans siap membantu melalui kanal dukungan')} testId="buyer-help" /><AccountMenuItem icon={ArrowLeft} title="Keluar dari akun" description="Kembali menjelajah sebagai tamu" onClick={signOut} destructive testId="profile-sign-out" /></div>
  </main></Page>;
}

function FarmerAccountPage({ profile }: { profile: RoleProfile }) {
  const [, setLocation] = useLocation();
  const { signOut } = useAuth();
  const farmer = farmers[0];
  return <Page><main className="subpage account-page role-account-page">
    <Header title="Akun petani" />
    <section className="role-account-hero farmer-account-hero"><img src={asset(farmer.image)} alt="" /><div className="role-account-shade" /><div className="role-account-content"><div className="role-account-top"><span className="verified-badge"><i /> PETANI TERVERIFIKASI</span><span className="avatar">{profile.initials}</span></div><span className="account-hero-kicker">RUANG KEBUN</span><h1>{profile.name}</h1><p>{farmer.group} · {farmer.location}</p><div className="account-hero-foot"><div><small>ANGGOTA SEJAK</small><strong>{farmer.joinedAt}</strong></div><Coffee size={25} /></div></div></section>
    <section className="identity-card"><span><ShieldCheck size={19} /></span><div><small>ID KEANGGOTAAN</small><strong>{farmer.membershipId}</strong><p>Profil aktif di ekosistem Garut Beans</p></div><button onClick={() => setLocation('/verification')} aria-label="Buka status verifikasi"><ArrowRight size={15} /></button></section>
    <div className="account-stat-row farmer-stat-row"><AccountStat value={farmer.landArea} label="Luas kebun" /><AccountStat value={farmer.annualProduction.replace(' cherry', '')} label="Produksi / tahun" /><AccountStat value="5 tahun" label="Bersama kami" /></div>
    <section className="account-section"><div className="account-section-heading"><div><span className="section-kicker">PROFIL KEBUN</span><h2>Data yang siap dipercaya</h2></div><MapPin size={21} /></div><div className="account-detail-card"><div><small>WILAYAH KEBUN</small><strong>{farmer.location.split(',')[0]} · 1.450 mdpl</strong></div><div><small>KELOMPOK TANI</small><strong>{farmer.group}</strong></div><div><small>VARIETAS UTAMA</small><strong>{farmer.coffeeType}</strong></div><div><small>PRODUK UNGGULAN</small><strong>{farmer.products.join(' · ')}</strong></div></div></section>
    <section className="account-readiness-card">
      <div className="account-readiness-top"><div><span className="section-kicker">KESIAPAN PROFIL</span><h2>Profil kebun 82% lengkap</h2><p>Tinggal lengkapi foto pascapanen untuk memperkuat kepercayaan pembeli.</p></div><strong>82%</strong></div>
      <div className="account-progress-track"><span /></div>
      <button className="text-button account-readiness-action" onClick={() => setLocation('/documents')} data-testid="farmer-complete-profile">Lengkapi profil <ArrowRight size={13} /></button>
    </section>
    <section className="account-section">
      <div className="account-section-heading"><div><span className="section-kicker">AKSES PETANI</span><h2>Ruang kerja kebun</h2></div><Coffee size={21} /></div>
      <div className="account-action-grid farmer-action-grid">
        <button onClick={() => setLocation('/verification')} data-testid="farmer-action-verification"><ShieldCheck size={18} /><strong>Verifikasi kebun</strong><small>Perbarui status dan dokumen</small></button>
        <button onClick={() => setLocation('/quality-check')} data-testid="farmer-action-quality-check"><Check size={18} /><strong>Cek standar kopi</strong><small>Ukur kesiapan mutu lot</small></button>
        <button onClick={() => setLocation('/harvest-log')} data-testid="farmer-action-harvest"><CalendarDays size={18} /><strong>Catatan panen</strong><small>Simpan hasil dan biaya kebun</small></button>
        <button onClick={() => setLocation('/sales-submissions')} data-testid="farmer-action-sales"><Send size={18} /><strong>Pengajuan penjualan</strong><small>Tawarkan lot dan terima permintaan</small></button>
        <button onClick={() => setLocation('/farm-costs')} data-testid="farmer-action-costs"><TrendingUp size={18} /><strong>Biaya kebun</strong><small>Catat biaya dan hitung laba bersih</small></button>
        <button onClick={() => setLocation('/payment-records')} data-testid="farmer-action-payments"><BriefcaseBusiness size={18} /><strong>Pembayaran</strong><small>Catat uang muka dan sisa transaksi</small></button>
        <button onClick={() => setLocation('/farm-issues')} data-testid="farmer-action-issues"><MessageSquare size={18} /><strong>Laporan masalah kebun</strong><small>Kirim foto dan minta arahan penyuluh</small></button>
        <button onClick={() => setLocation('/farm-calendar')} data-testid="farmer-action-calendar"><CalendarDays size={18} /><strong>Kalender kegiatan kebun</strong><small>Atur agenda kerja dan kunjungan</small></button>
        <button onClick={() => setLocation('/curation')} data-testid="farmer-action-lot"><Package size={18} /><strong>Lot & mutu</strong><small>Catat panen dan kualitas</small></button>
        <button onClick={() => setLocation('/group-dashboard')} data-testid="farmer-action-group"><Users size={18} /><strong>Kelompok tani</strong><small>Lihat gerak kelompok</small></button>
        <button onClick={() => setLocation('/reports')} data-testid="farmer-action-reports"><BarChart3 size={18} /><strong>Laporan kebun</strong><small>Pantau hasil dan peluang</small></button>
      </div>
    </section>
    <section className="account-section">
      <div className="account-section-heading"><div><span className="section-kicker">PERJALANAN TERBARU</span><h2>Aktivitas kebun</h2></div><span className="section-kicker">Maret 2026</span></div>
      <div className="account-activity-card">
        <div><span className="account-activity-icon"><Check size={14} /></span><span><strong>Profil petani terverifikasi</strong><small>Data dasar dan kelompok tani telah diperiksa</small></span><b>Selesai</b></div>
        <div><span className="account-activity-icon"><Package size={14} /></span><span><strong>Lot Papandayan Series diperbarui</strong><small>Arabika Typica · proses natural</small></span><b>12 Mar</b></div>
        <div><span className="account-activity-icon"><CalendarDays size={14} /></span><span><strong>Pendampingan pascapanen berikutnya</strong><small>Kelas sortasi dan pengeringan</small></span><b>17 Okt</b></div>
      </div>
    </section>
    <span className="section-kicker account-membership-kicker">KEANGGOTAAN & BANTUAN</span>
    <div className="account-menu">
      <AccountMenuItem icon={FileText} title="Dokumen & legalitas" description="Kelola dokumen pendukung profil" onClick={() => setLocation('/documents')} testId="farmer-documents" />
      <AccountMenuItem icon={CalendarDays} title="Catatan panen" description="Simpan tanggal, hasil, blok, dan biaya produksi" onClick={() => setLocation('/harvest-log')} testId="farmer-harvest-menu" />
      <AccountMenuItem icon={Check} title="Cek standar kopi" description="Isi pemeriksaan mutu langsung dari perangkat" onClick={() => setLocation('/quality-check')} testId="farmer-quality-menu" />
      <AccountMenuItem icon={Check} title="Standar mutu kopi" description="Lihat panduan kualitas dan kesiapan lot" onClick={() => setLocation('/standards')} testId="farmer-standards" />
      <AccountMenuItem icon={TrendingUp} title="Harga kopi terbaru" description="Lihat harga acuan per bentuk dan mutu" onClick={() => setLocation('/prices')} testId="farmer-prices" />
      <AccountMenuItem icon={Send} title="Pengajuan penjualan" description="Tawarkan lot dan kelola permintaan pembeli" onClick={() => setLocation('/sales-submissions')} testId="farmer-sales-menu" />
      <AccountMenuItem icon={TrendingUp} title="Pencatatan biaya kebun" description="Catat biaya dan lihat perkiraan keuntungan bersih" onClick={() => setLocation('/farm-costs')} testId="farmer-costs-menu" />
      <AccountMenuItem icon={BriefcaseBusiness} title="Pencatatan pembayaran" description="Catat harga jual, uang muka, dan sisa pembayaran" onClick={() => setLocation('/payment-records')} testId="farmer-payments-menu" />
      <AccountMenuItem icon={MessageSquare} title="Laporan masalah kebun" description="Kirim foto, lokasi, dan keterangan ke penyuluh" onClick={() => setLocation('/farm-issues')} testId="farmer-issues-menu" />
      <AccountMenuItem icon={CalendarDays} title="Kalender kegiatan kebun" description="Atur pemupukan, panen, pengeringan, dan kunjungan" onClick={() => setLocation('/farm-calendar')} testId="farmer-calendar-menu" />
      <AccountMenuItem icon={BriefcaseBusiness} title="Kemitraan & pasar" description="Temukan peluang pembelian hasil kebun" onClick={() => setLocation('/partnership')} testId="farmer-partnership" />
      <AccountMenuItem icon={ArrowLeft} title="Ganti akun" description="Beralih ke ruang pengguna lain" onClick={() => setLocation('/login')} testId="farmer-switch-account" />
      <AccountMenuItem icon={ArrowLeft} title="Keluar dari akun" description="Kembali menjelajah sebagai tamu" onClick={signOut} destructive testId="profile-sign-out" />
    </div>
  </main></Page>;
}

function EducatorAccountPage({ profile }: { profile: RoleProfile }) {
  const [, setLocation] = useLocation();
  const { signOut } = useAuth();
  return <Page><main className="subpage account-page role-account-page">
    <Header title="Akun penyuluh" />
    <section className="buyer-account-hero educator-account-hero"><div className="buyer-account-top"><div className="avatar">{profile.initials}</div><span className="member-badge"><i /> RUANG PENDAMPINGAN</span></div><span className="account-hero-kicker">PUSAT AKSI LAPANGAN</span><h1>{profile.name}</h1><p>Catat kunjungan, tindak lanjut kebun, dan kebutuhan petani dari satu ruang kerja.</p><div className="account-hero-foot"><div><small>AKUN AKTIF</small><strong>Penyuluh Garut Beans</strong></div><Users size={25} /></div></section>
    <div className="account-stat-row"><AccountStat value="12" label="Kunjungan" /><AccountStat value="04" label="Tindak lanjut" /><AccountStat value="08" label="Petani aktif" /></div>
    <section className="account-section"><div className="account-section-heading"><div><span className="section-kicker">AGENDA TERDEKAT</span><h2>Jaga kebun tetap terhubung</h2></div><CalendarDays size={21} /></div><div className="account-priority-card"><span className="account-status-dot" /><div><small>KUNJUNGAN BERIKUTNYA</small><strong>Kelompok Tani Papandayan</strong><p>Cisurupan · tindak lanjut kebun</p></div><b>10 Okt</b></div></section>
    <div className="account-menu"><AccountMenuItem icon={MapPin} title="Kunjungan lapangan" description="Catat agenda dan tindak lanjut kebun" onClick={() => setLocation('/extension-visits')} testId="educator-visits" /><AccountMenuItem icon={FileText} title="Pusat dokumen" description="SOP, modul, formulir, dan regulasi" onClick={() => setLocation('/documents')} testId="educator-documents" /><AccountMenuItem icon={CheckCircle2} title="Laporan pendampingan" description="Lihat catatan dan progres program" onClick={() => setLocation('/extension-reports')} testId="educator-reports" /><AccountMenuItem icon={Bell} title="Notifikasi program" description="Pelatihan, panen, dan kebutuhan dukungan" onClick={() => setLocation('/notifications')} testId="educator-notifications" /><AccountMenuItem icon={ArrowLeft} title="Keluar dari akun" description="Kembali menjelajah sebagai tamu" onClick={signOut} destructive testId="profile-sign-out" /></div>
  </main></Page>;
}

function ProfilePage() {
  const { session } = useAuth();
  if (!session) return <GuestAccountPage />;
  if (session.id === 'petani') return <FarmerAccountPage profile={session} />;
  if (session.id === 'penyuluh') return <EducatorAccountPage profile={session} />;
  return <BuyerAccountPage profile={session} />;
}

function LoginPage({ returnTo: requestedReturnTo }: { returnTo?: string }) {
  const [, setLocation] = useLocation();
  const { session, signIn } = useAuth();
  const [selectedRole, setSelectedRole] = useState<AuthRole>(session?.id ?? 'pengguna');
  const params = new URLSearchParams(window.location.search);
  const requestedPath = requestedReturnTo || params.get('returnTo') || '/program';
  const returnTo = requestedPath.startsWith('/') ? requestedPath : '/program';
  const selectedProfile = getRoleProfile(selectedRole);

  return <div className="auth-viewport">
    <div className="auth-screen">
      <div className="auth-hero">
        <div className="eyebrow">EKOSISTEM G-BEANS</div>
        <h1>Satu ruang untuk cerita kopi.</h1>
        <p>Masuk untuk menemukan asal, rasa, dan orang-orang di balik setiap cangkir.</p>
      </div>
      <div className="auth-copy"><div className="section-kicker">PILIH AKSES</div><h2>Kamu masuk sebagai siapa?</h2><p>Menu dan pengalaman akan menyesuaikan peran yang kamu pilih.</p></div>
      <div className="role-list">{roleProfiles.map((profile) => <button key={profile.id} className={`role-card ${profile.id === selectedRole ? 'selected' : ''}`} onClick={() => setSelectedRole(profile.id)} data-testid={`login-role-${profile.id}`}><span className="avatar">{profile.initials}</span><span className="role-card-copy"><strong>{profile.label}</strong><b>{profile.name}</b><small>{profile.description}</small></span><span className="role-check">{profile.id === selectedRole ? '✓' : '○'}</span></button>)}</div>
      <div className="selected-access"><b>AKSES TERPILIH</b><span>{selectedProfile.label} · {selectedProfile.name}</span></div>
      <button className="primary-button auth-submit" onClick={() => { signIn(selectedRole); setLocation(returnTo); }} data-testid="login-submit">{session ? 'Simpan peran ini' : 'Masuk sebagai akun ini'} <ArrowRight size={15} /></button>
      <p className="auth-note">Akun ini masih lokal di perangkat. Login server dan akun lintas perangkat dapat disambungkan kemudian.</p>
    </div>
    <BottomNav />
  </div>;
}

function NotificationsPage() {
  const [, setLocation] = useLocation();
  const { session } = useAuth();
  const notifications = session?.id === 'petani'
    ? [
        ['Panen', 'Jadwal panen tinggal 7 hari', 'Panen Papandayan Series · 29 Sep 2026 · Blok Utara. Pastikan cherry merah siap dipetik.', 'Hari ini', '/farm-calendar'],
        ['Data panen', 'Batas pengumpulan data panen', 'Lengkapi catatan hasil, biaya, dan asal blok paling lambat 30 Sep 2026.', 'Besok', '/harvest-log'],
        ['Pelatihan', 'Pelatihan sortasi & defect', '29 Sep, 09.00 · Rumah produksi Cikuray. Bawa sampel kopi 300 gram.', '2 hari lagi', '/documents'],
        ['Harga', 'Harga Arabika Grade 1 naik', 'Harga acuan terbaru Rp68.000/kg, naik Rp4.000 dari pembaruan sebelumnya.', 'Kemarin', '/prices'],
        ['Verifikasi lot', 'Status verifikasi lot diperbarui', 'Arabika Honey Lot 06 masih dalam tinjauan. Kurator menunggu foto kemasan.', 'Kemarin', '/verification'],
      ]
    : session?.id === 'penyuluh'
      ? [
          ['Laporan masalah', 'Daun menguning di blok 2', 'Iis Nurhayati · hujan panjang · menunggu arahan penyuluh.', '1 jam lalu', '/extension-issues'],
          ['Tindak lanjut', 'Kunjungan berikutnya sudah dijadwalkan', '19 Juni 2026 · Blok utara Mekarsari, Cikajang.', '3 jam lalu', '/extension-visits'],
          ['Pelatihan', 'Pelatihan sortasi & defect', 'Besok, 09.00 di Rumah produksi Cikuray. Bawa sampel 300 gram.', 'Kemarin', '/extension-training'],
        ]
      : [
          ['Pelatihan', 'Pelatihan sortasi besok', 'Besok, 09.00 di Rumah produksi Cikuray. Bawa sampel 300 gram.', '1 jam lalu', '/events'],
          ['Pasar', 'Permintaan pembeli baru', 'Ruang Seduh Roastery mencari 300 kg Arabika Grade 1 proses honey.', '3 jam lalu', '/partnership'],
          ['Musim', 'Musim panen dimulai', 'Puncak panen Arabika Garut diperkirakan mulai 2 minggu lagi.', 'Kemarin', '/farmers'],
        ];
  return <Page><main className="subpage"><Header title={session?.id === 'petani' ? 'Pengingat petani' : session?.id === 'penyuluh' ? 'Tugas penyuluh' : 'Notifikasi program'} /><div className="subcopy">{session?.id === 'petani' ? 'Pengingat panen, data, pelatihan, harga, dan verifikasi lot dalam satu tempat.' : session?.id === 'penyuluh' ? 'Laporan baru dari petani dan agenda pendampingan yang perlu ditindaklanjuti.' : 'Pengingat penting agar ritme pelatihan, pasar, dan musim kebun tetap terbaca.'}</div><div className="info-card notification-summary"><Bell size={18} /><div><span className="section-kicker">PEMBARUAN TERKINI</span><h3>{notifications.length} notifikasi untukmu</h3></div></div><div className="notification-list">{notifications.map(([type, title, detail, time, route]) => <button className="info-card notification-card" key={title} onClick={() => setLocation(route)} data-testid={`notification-${title.toLowerCase().replaceAll(' ', '-')}`}><div className="notification-card-top"><span className="section-kicker">{type}</span><small>{time}</small></div><h3>{title}</h3><p>{detail}</p><span className="text-button">Buka detail <ArrowRight size={13} /></span></button>)}</div></main></Page>;
}

const programOffers = [
  { id: 'beasiswa-anak-petani-kopi', category: 'Keluarga petani', icon: 'calendar', title: 'Beasiswa anak petani kopi', description: 'Dukungan pendidikan untuk anak keluarga petani kopi agar bisa melanjutkan sekolah.', target: 'Keluarga petani kopi', support: 'Beasiswa 1 semester', deadline: '30 Nov 2026' },
  { id: 'klinik-kesehatan-petani', category: 'CSR petani kopi', icon: 'heart', title: 'Klinik kesehatan petani kopi', description: 'Layanan pemeriksaan dasar dan edukasi kesehatan untuk petani kopi serta keluarganya.', target: 'Petani kopi & keluarga', support: 'Hari layanan kesehatan', deadline: 'Pendaftaran dibuka' },
  { id: 'pohon-penaung-kebun', category: 'Lingkungan kebun', icon: 'coffee', title: 'Pohon penaung kebun kopi', description: 'Penanaman pohon penaung dan tanaman pendamping untuk menjaga kelembapan serta mutu kebun kopi.', target: 'Petani kopi aktif', support: 'Bibit & pendampingan tanam', deadline: 'Musim hujan 2026' },
  { id: 'konservasi-mata-air-kebun', category: 'Lingkungan kebun', icon: 'mapPin', title: 'Konservasi mata air kebun', description: 'Menjaga sumber air di sekitar kebun kopi melalui aksi resapan dan perawatan bersama.', target: 'Kelompok tani kopi', support: 'Sarana konservasi', deadline: 'Seleksi desa' },
  { id: 'paket-panen-keluarga', category: 'Keluarga petani', icon: 'package', title: 'Paket panen keluarga', description: 'Dukungan kebutuhan dasar bagi keluarga petani kopi selama masa panen dan perawatan kebun.', target: 'Keluarga petani kopi', support: 'Paket kebutuhan dasar', deadline: 'Pendaftaran dibuka' },
];

const regularPrograms = [
  { id: 'coffee-talk-garut', category: 'DIALOG & CERITA', title: 'Coffee Talk Garut', cycle: 'Rutin setiap bulan', next: 'Sesi berikutnya · 10 Okt 2026', description: 'Obrolan santai bersama petani, roaster, barista, dan pelaku usaha kopi.', image: 'event-coffee-tasting.webp' },
  { id: 'sekolah-barista', category: 'KELAS KETERAMPILAN', title: 'Sekolah Barista Garut Beans', cycle: 'Batch per kuartal', next: 'Batch 01 · 24 Okt 2026', description: 'Belajar espresso, manual brew, pelayanan, dan cerita asal kopi untuk barista baru.', image: 'event-coffee-workshop.webp' },
  { id: 'cupping-kenal-asal', category: 'MUTU & RASA', title: 'Cupping & Kenal Asal', cycle: 'Rutin setiap dua minggu', next: 'Papandayan · 14 Nov 2026', description: 'Membaca rasa, membandingkan proses, dan mengenal orang di balik setiap lot.', image: 'event-cupping-papandayan.webp' },
  { id: 'kelas-pascapanen', category: 'UNTUK PETANI', title: 'Kelas Pascapanen', cycle: 'Menjelang musim panen', next: 'Cikajang · 17 Okt 2026', description: 'Praktik sortasi, pengeringan, dan pencatatan mutu untuk menjaga nilai jual kopi.', image: 'event-postharvest-class.webp' },
];

const derivativeProgramOffer = {
  id: 'pemberdayaan-produk-turunan',
  category: 'Komunitas kopi',
  icon: 'users',
  title: 'Pemberdayaan produk turunan kopi',
  description: 'Pendampingan desa untuk merancang, menguji, dan memasarkan produk baru berbasis kopi.',
  target: 'Desa & kelompok tani',
  support: 'Pendampingan 3 bulan',
  deadline: 'Pendaftaran dibuka',
};

const derivativeProducts = [
  ['Essential oil kopi', 'Aroma kopi untuk ruang, relaksasi, dan produk wellness desa.', 'trending'],
  ['Pewangi sepatu', 'Produk harian berbahan kopi yang praktis dan mudah dipasarkan.', 'package'],
  ['Merchandise desa', 'Tote bag, pin, kartu cerita, dan suvenir dengan identitas Garut.', 'shopping-bag'],
  ['Oleh-oleh aroma', 'Lilin, sabun, dan paket aroma untuk memperluas cerita kopi.', 'coffee'],
] as const;

const standards = [
  ['Grade', 'Grade 1 · Specialty', 'Biji seragam, bersih, dan dapat ditelusuri sampai lot panen.'],
  ['Proses pascapanen', 'Tercatat per lot', 'Natural, washed, honey, atau proses lain wajib memiliki catatan waktu dan metode.'],
  ['Kadar air', '10–12%', 'Diukur sebelum penyimpanan dan dicatat pada lembar mutu.'],
  ['Defect', 'Maks. 5 defect / 300 g', 'Sortasi fisik dilakukan sebelum cupping dan pengemasan.'],
  ['Cupping', 'Min. 80 poin', 'Cupping memakai lembar penilaian Garut Beans dan panel terlatih.'],
  ['Kemasan', 'Food grade + lot code', 'Sertakan asal, proses, berat bersih, tanggal sangrai, dan kode lot.'],
];

const curationProducts = [
  { name: 'Arabika Honey Cikuray', producer: 'KTH Cikuray Mandiri', stage: 4, note: 'Siap tampil di katalog resmi.' },
  { name: 'Papandayan Natural Lot 06', producer: 'KTH Papandayan Lestari', stage: 2, note: 'Menunggu sesi cupping kurator.' },
  { name: 'Kamojang Washed 2026', producer: 'Kelompok Tani Talaga', stage: 1, note: 'Foto kebun dan dokumen sedang ditinjau.' },
];
const curationStages = ['Daftar', 'Verifikasi', 'Kurasi', 'Diterima', 'Masuk Katalog Garut Beans'];
const iconFor = (kind: string): LucideIcon => ({
  users: Users, map: Map, mapPin: MapPin, coffee: Coffee, package: Package, shield: ShieldCheck,
  calendar: CalendarDays, briefcase: BriefcaseBusiness, chart: BarChart3, file: FileText,
  leaf: Leaf, wallet: Wallet, wheat: Wheat, check: CheckCircle2, message: MessageSquare,
  repeat: Package, send: Send, trending: TrendingUp, clock: Clock3, compass: Compass, user: CircleUserRound,
  heart: Heart, 'shopping-bag': ShoppingBag,
}[kind] ?? Package);

function MetricStrip({ metrics }: { metrics: ReadonlyArray<{ label: string; value: string; icon?: string }> }) {
  return <div className="metric-strip">{metrics.map((metric) => { const Icon = iconFor(metric.icon || 'chart'); return <div className="metric-card" key={metric.label}><div className="metric-icon"><Icon size={17} /></div><strong>{metric.value}</strong><span>{metric.label}</span></div>; })}</div>;
}

function HeroPanel({ image, eyebrow, title, copy, action, onAction }: { image: string; eyebrow: string; title: string; copy: string; action?: string; onAction?: () => void }) {
  return <div className="hub-hero"><img src={asset(image)} alt="" /><div className="hub-hero-shade" /><div className="hub-hero-copy"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{copy}</p>{action && onAction && <button className="hero-link" onClick={onAction} data-testid="button-hero-action">{action}<ArrowRight size={14} /></button>}</div></div>;
}

function ActionRow({ icon, title, detail, action, onAction, status }: { icon: string; title: string; detail: string; action?: string; onAction?: () => void; status?: string }) {
  const Icon = iconFor(icon);
  return <div className="action-row"><div className="row-icon"><Icon size={17} /></div><div className="row-copy"><strong>{title}</strong><span>{detail}</span></div>{status && <span className="status-chip">{status}</span>}{action && onAction && <button className="row-action" onClick={onAction} data-testid={`button-row-${title.toLowerCase().replaceAll(' ', '-')}`}>{action}<ChevronRight size={14} /></button>}</div>;
}

function RegionMapHero() {
  return <section className="region-map-hero">
    <img src={asset('mountain-banner.webp')} alt="" />
    <div className="region-map-shade" />
    <div className="region-map-glow" />
    <div className="region-map-top">
      <div className="region-map-heading">
        <span className="region-map-kicker"><Map size={12} /> JEJAK WILAYAH</span>
        <h1>Dari lereng ke cangkir.</h1>
        <p>Kenali kebun, petani, dan karakter rasa dari tiap sudut Garut.</p>
      </div>
      <span className="region-map-icon"><Compass size={22} /></span>
    </div>
    <div className="region-route" aria-hidden="true">
      <span className="region-route-line" />
      <span className="region-route-dots"><i /><i /><i /><i /></span>
    </div>
    <div className="region-map-stats">
      <span><strong>4</strong><small>wilayah kurasi</small></span>
      <i />
      <span><strong>125+</strong><small>petani terhubung</small></span>
    </div>
  </section>;
}

function TourismHero() {
  return <section className="tourism-hero">
    <img src={asset('kopi-garut-seduh-sambil-menjelajah-banner.webp')} alt="" />
    <div className="tourism-hero-shade" />
    <div className="tourism-hero-glow" />
    <div className="tourism-hero-top">
      <span className="tourism-hero-kicker"><Compass size={13} /> PENGALAMAN PILIHAN</span>
      <span className="tourism-hero-count">3 rute</span>
    </div>
    <div className="tourism-hero-copy">
      <h1>Datang sebagai tamu, pulang bawa cerita.</h1>
      <p>Rasakan Garut dari kebunnya: belajar, tinggal lebih lama, dan bertemu orang-orang di balik kopi.</p>
    </div>
    <div className="tourism-hero-stats">
      <span><strong>3</strong><small>pengalaman</small></span>
      <i />
      <span><strong>1–2</strong><small>hari perjalanan</small></span>
      <i />
      <span><strong>Garut</strong><small>dataran tinggi</small></span>
    </div>
  </section>;
}

function HubPage({ kind }: { kind: string }) {
  const [, setLocation] = useLocation();
  const { notify } = useStore();
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useWebStorageJson<string[]>(`kopi-garut-${kind}-saved`, []);
  const [eventFilter, setEventFilter] = useState('Semua');
  const cfg: Record<string, { title: string; eyebrow: string; copy: string; image: string }> = {
    collective: { eyebrow: 'TUMBUH BERSAMA', title: 'Ekosistem yang merawat rasa.', copy: 'Satu ruang untuk produksi, pascapanen, bisnis, edukasi, dan cerita Garut Beans.', image: 'kopi-garut-banyak-orang-banner.webp' },
    farmers: { eyebrow: 'ORANG DI BALIK RASA', title: 'Kenali petani Garut.', copy: 'Profil keluarga tani, kelompok, dan kebun yang menjaga kualitas dari musim ke musim.', image: 'farmer-asep-rahmat.webp' },
    regions: { eyebrow: 'WILAYAH KOPI', title: 'Dari lereng ke cangkir.', copy: 'Setiap ketinggian punya karakter rasa, proses, dan cerita yang berbeda.', image: 'regions-banner.webp' },
    tourism: { eyebrow: 'PENGALAMAN KOPI', title: 'Seduh sambil menjelajah.', copy: 'Datang ke kebun, belajar prosesnya, lalu nikmati seduhan dari asalnya.', image: 'kopi-garut-seduh-sambil-menjelajah-banner.webp' },
    events: { eyebrow: 'AGENDA KOPI', title: 'Temu, belajar, dan mencicipi.', copy: 'Kalender pertemuan petani, roastery, barista, dan pecinta Garut Beans.', image: 'event-coffee-festival.webp' },
    partnership: { eyebrow: 'DARI KEBUN GARUT', title: 'Bawa cerita kopi ke lebih banyak meja.', copy: 'Jadikan usahamu bagian dari perjalanan Garut Beans.', image: 'kopi-garut-promo-banner.webp' },
    diversification: { eyebrow: 'LEBIH DARI SECANGKIR', title: 'Dari kopi, lahir lebih banyak karya.', copy: 'Produk olahan, aroma, perawatan, dan merchandise dari ekosistem Garut.', image: 'coffee-essential-oil.webp' },
  };
  const content = cfg[kind];
  const filteredFarmers = farmers.filter((farmer) => `${farmer.name} ${farmer.group} ${farmer.location}`.toLowerCase().includes(query.toLowerCase()));
  const filteredRegions = regions.filter((region) => `${region.name} ${region.village} ${region.specialty}`.toLowerCase().includes(query.toLowerCase()));
  const filteredProducts = diversifiedProducts.filter((product) => `${product.title} ${product.category}`.toLowerCase().includes(query.toLowerCase()));
  const eventFilters = ['Semua', ...Array.from(new Set(sharedHomeContent.stories.map((event) => event.type)))];
  const visibleEvents = eventFilter === 'Semua' ? sharedHomeContent.stories : sharedHomeContent.stories.filter((event) => event.type === eventFilter);
  if (kind === 'events') return <Page><main className="subpage events-page">
    <Header title="Event & pelatihan" />
    <section className="events-intro">
      <span className="events-intro-kicker"><CalendarDays size={13} /> CATAT AGENDA</span>
      <h1>Temukan alasan untuk datang ke Garut.</h1>
      <p>Festival, kelas, dan pertemuan yang mempertemukan petani, usaha, dan pecinta kopi.</p>
    </section>
    <div className="event-filter-rail" role="tablist" aria-label="Filter agenda">
      {eventFilters.map((filter) => <button key={filter} className={`event-filter ${eventFilter === filter ? 'active' : ''}`} onClick={() => setEventFilter(filter)} role="tab" aria-selected={eventFilter === filter} data-testid={`event-filter-${filter.toLowerCase().replaceAll(' ', '-')}`}>{filter}</button>)}
    </div>
    {visibleEvents[0] && <section className="event-featured-card">
      <img src={asset(visibleEvents[0].image)} alt="" />
      <div className="event-featured-shade" />
      <div className="event-featured-top"><span className="event-featured-badge"><CalendarDays size={12} /> AGENDA PILIHAN</span><span className="event-featured-arrow"><ArrowRight size={16} /></span></div>
      <div className="event-featured-copy"><div className="event-featured-meta"><strong>{visibleEvents[0].type}</strong><i /> <span>{visibleEvents[0].location}</span></div><h2>{visibleEvents[0].title}</h2><span className="event-featured-date"><CalendarDays size={14} />{visibleEvents[0].date}</span></div>
    </section>}
    <div className="events-section-heading"><div><h2>Agenda berikutnya</h2><p>{visibleEvents.length} agenda untuk kamu jelajahi</p></div><span>{String(visibleEvents.length).padStart(2, '0')}</span></div>
    <div className="event-agenda-list">{visibleEvents.slice(1).map((event) => <article className="event-agenda-card" key={event.id}>
      <div className="event-date-block"><CalendarDays size={18} /><strong>{event.date}</strong></div>
      <div className="event-agenda-body"><div className="event-agenda-meta"><strong>{event.type}</strong><span><MapPin size={11} />{event.location}</span></div><h3>{event.title}</h3><p>{event.description}</p></div>
      <span className="event-agenda-arrow"><ChevronRight size={16} /></span>
    </article>)}
    {!visibleEvents.slice(1).length && <div className="event-empty-state"><span><CalendarDays size={22} /></span><h3>Ini agenda terdepannya</h3><p>Pilih kategori lain untuk melihat agenda berikutnya.</p></div>}
    </div>
    <div className="events-closing-card"><span><Coffee size={21} /></span><div><strong>Datang, belajar, tumbuh bersama.</strong><p>Setiap pertemuan membawa cerita baru dari kebun Garut.</p></div></div>
  </main></Page>;
  if (kind === 'farmers') return <Page><main className="subpage"><Header /><HeroPanel {...content} /><SearchEntry catalog value={query} onChange={setQuery} /><MetricStrip metrics={[{ label: 'Petani terdaftar', value: '125', icon: 'users' }, { label: 'Kelompok tani', value: '18', icon: 'coffee' }, { label: 'Produksi tahunan', value: '312 ton', icon: 'chart' }]} /><div className="section-heading"><h2>Petani pilihan</h2><span className="section-kicker">4 profil</span></div><div className="farmer-grid">{filteredFarmers.map((farmer) => <article className="farmer-card" key={farmer.id}><img src={asset(farmer.image)} alt={farmer.name} /><div className="farmer-copy"><span className="section-kicker">{farmer.location}</span><h3>{farmer.name}</h3><p>{farmer.group}</p><div className="farmer-stats"><span>{farmer.landArea}</span><span>{farmer.coffeeType}</span></div><button className="secondary-button" onClick={() => setLocation(`/farmer/${farmer.id}`)} data-testid={`button-farmer-${farmer.id}`}>Lihat cerita <ArrowRight size={13} /></button></div></article>)}</div></main></Page>;
  if (kind === 'regions') return <Page><main className="subpage regions-page">
    <Header title="Peta Garut Beans" />
    <RegionMapHero />
    <div className="region-section-heading"><div><span className="section-kicker">PILIH DESTINASIMU</span><h2>Wilayah utama</h2></div><span className="region-count-pill">{regions.length} zona</span></div>
    <p className="region-section-description">Setiap wilayah punya elevasi, petani, dan profil rasa yang berbeda.</p>
    <div className="region-list">{filteredRegions.map((region) => <button className="region-card" key={region.id} onClick={() => setLocation(`/region/${region.id}`)} data-testid={`region-card-${region.id}`} aria-label={`Buka profil wilayah ${region.name}`}>
      <img src={asset(region.image)} alt="" />
      <div className="region-copy"><div className="region-card-heading"><h3>{region.name}</h3><span className="region-farmer-pill"><Users size={11} />{region.farmerCount}</span></div><strong className="region-specialty">{region.specialty}</strong><span className="region-meta"><MapPin size={12} />{region.village}<i />{region.elevation}</span></div>
      <span className="region-card-arrow"><ArrowRight size={17} /></span>
    </button>)}</div>
  </main></Page>;
  if (kind === 'tourism') return <Page><main className="subpage tourism-page">
    <Header title="Wisata kopi" />
    <TourismHero />
    <div className="tourism-section-heading"><span className="section-kicker">PILIH PERJALANANMU</span><h2>Cerita yang bisa kamu datangi.</h2></div>
    <div className="tour-grid">{coffeeTours.map((tour, index) => <article className="tour-card" key={tour.id}>
      <div className="tour-image-wrap"><img src={asset(tour.image)} alt={tour.title} /><div className="tour-image-shade" /><span className="tour-type-badge">{tour.type}</span><span className="tour-duration-badge"><CalendarDays size={12} />{tour.duration}</span>{index === 0 && <span className="tour-featured-badge">PALING DICARI</span>}</div>
      <div className="tour-copy"><h3>{tour.title}</h3><span className="tour-location"><MapPin size={13} />{tour.location}, Garut</span><p>{tour.description}</p><div className="tour-foot"><div><small>MULAI DARI</small><strong>{formatPrice(tour.price)} <em>/ orang</em></strong></div><button className="primary-button compact" onClick={() => { setSaved((items) => items.includes(tour.id) ? items : [...items, tour.id]); notify(`Minat untuk ${tour.title} sudah dicatat. Tim kami akan menghubungi kamu.`); }} data-testid={`tour-book-${tour.id}`}>{saved.includes(tour.id) ? 'Tersimpan' : 'Pesan'} <ArrowRight size={14} /></button></div></div>
    </article>)}</div>
    <div className="tour-group-note"><span><Users size={16} /></span><div><strong>Datang bersama rombongan?</strong><p>Paket dapat disesuaikan untuk komunitas, sekolah, cafe, dan rombongan.</p></div></div>
  </main></Page>;
  if (kind === 'diversification') return <Page><main className="subpage"><Header /><HeroPanel {...content} /><div className="filter-pills"><span className="filter-pill active">Semua</span><span className="filter-pill">Olahan kopi</span><span className="filter-pill">Aroma & perawatan</span><span className="filter-pill">Merchandise</span></div><SearchEntry catalog value={query} onChange={setQuery} /><div className="product-grid diversified-grid">{filteredProducts.map((product) => <article className="diversified-card" key={product.id}><div className="diversified-image"><img src={asset(product.image)} alt={product.title} /><span>{product.badge}</span></div><div className="diversified-body"><small>{product.category}</small><strong>{product.title}</strong><p>{product.status}</p><div><b>{product.price}</b><button className="text-button" onClick={() => { setSaved((items) => items.includes(product.id) ? items : [...items, product.id]); notify('Produk turunan disimpan untuk ditinjau'); }} data-testid={`button-save-product-${product.id}`}>{saved.includes(product.id) ? 'Tersimpan' : 'Simpan'} <ArrowRight size={13} /></button></div></div></article>)}</div></main></Page>;
   if (kind === 'partnership') return <PartnershipPage content={content} />;
  return <Page><main className="subpage"><Header /><HeroPanel {...content} /><MetricStrip metrics={hubStats.map((item) => ({ label: item.label, value: item.value, icon: item.label.includes('Petani') ? 'users' : item.label.includes('Wilayah') ? 'map' : 'chart' }))} /><div className="section-heading"><div><span className="section-kicker">PINTU EKOSISTEM</span><h2>Ruang yang saling terhubung.</h2></div></div><div className="module-grid">{[['coffee', 'Produksi & budidaya', 'Data kebun, luas lahan, produksi per musim, dan jadwal panen.', '/farm-calendar'], ['package', 'Pascapanen', 'Catatan rumah produksi, stok, dan standar kualitas per lot.', '/quality-check'], ['briefcase', 'Marketplace B2B', 'Temu hasil panen dengan cafe dan roastery yang mencari Garut Beans.', '/partnership'], ['shield', 'Sertifikasi & legalitas', 'Profil kesiapan usaha dan dokumen untuk memperluas akses pasar.', '/documents'], ['calendar', 'Akademi Garut Beans', 'Materi budidaya, pascapanen, brewing, dan kewirausahaan kopi.', '/program'], ['compass', 'Wisata kopi', 'Pengalaman langsung dari kebun, proses, budaya, dan orang-orangnya.', '/tourism']].map(([icon, title, detail, route]) => <ActionRow key={title} icon={icon} title={title} detail={detail} action="Jelajahi" onAction={() => setLocation(route)} />)}</div><div className="dark-callout"><span className="section-kicker">ROADMAP 2026</span><h2>Dari data kebun menuju keputusan yang lebih adil.</h2><p>Lot kopi, pre-order panen, kontrak kemitraan, pusat logistik, hingga QR Code Garut Beans dirancang dalam satu perjalanan.</p><button className="secondary-button" onClick={() => setLocation('/traceability')} data-testid="button-collective-trace">Lihat jejak kopi <ArrowRight size={14} /></button></div></main></Page>;
}

const ecosystemStages = [
  { number: '01', label: 'KEBUN', title: 'Kenali asalnya', icon: 'map', links: [['Petani & kebun', '/farmers'], ['Wilayah kopi', '/regions']] },
  { number: '02', label: 'PROSES & MUTU', title: 'Jaga kualitasnya', icon: 'package', links: [['Standar Garut Beans', '/standards'], ['Lacak lot lewat QR', '/traceability']] },
  { number: '03', label: 'PASAR & MITRA', title: 'Bawa lebih jauh', icon: 'briefcase', links: [['Katalog kopi', '/catalog'], ['Jadi mitra', '/partnership']] },
  { number: '04', label: 'PENGALAMAN', title: 'Datang & rasakan', icon: 'coffee', links: [['Event & pelatihan', '/events'], ['Wisata kopi', '/tourism']] },
] as const;

function CollectivePage() {
  const [, setLocation] = useLocation();
  const roleItems = [
    ['Saya petani', 'Kelola profil kebun dan cerita panen.', '/farmers', 'user'],
    ['Saya pembeli', 'Temukan kopi dan kenali asalnya.', '/catalog', 'coffee'],
    ['Saya punya usaha', 'Jadi mitra dan bawa kopi ke pelanggan.', '/partnership', 'briefcase'],
    ['Saya ingin berkunjung', 'Rasakan kopi langsung dari Garut.', '/tourism', 'compass'],
  ] as const;
  return <Page><main className="subpage collective-page"><Header title="Ekosistem Kopi" subtitle="DARI KEBUN KE CANGKIR" /><div className="collective-hero"><img src={asset('hero-coffee.webp')} alt="" /><div className="collective-hero-shade" /><div className="collective-hero-copy"><div className="collective-hero-top"><div className="collective-hero-icon"><Network size={24} /></div><span>01—04</span></div><small>RANTAI G-BEANS</small><h1>Satu alur,<br />banyak peran.</h1><b>KEBUN · MUTU · PASAR · CANGKIR</b></div></div><div className="collective-intro"><span className="section-kicker">BAGAIMANA KOPI BERJALAN</span><h2>Garut Beans bukan hanya katalog.</h2><p>Ini adalah ruang yang menghubungkan petani, pembeli, pelaku usaha, dan pengunjung dalam satu perjalanan kopi.</p></div><div className="collective-roles"><h3>Kamu datang sebagai siapa?</h3>{roleItems.map(([title, text, route, icon], index) => <button key={title} onClick={() => setLocation(route)}><span className={`collective-role-icon role-tone-${index % 2}`}>{createElement(iconFor(icon), { size: 17 })}</span><span><strong>{title}</strong><small>{text}</small></span><ArrowRight size={14} /></button>)}</div><div className="collective-stages">{ecosystemStages.map((stage, index) => <Fragment key={stage.number}><div className="collective-stage"><div className="collective-stage-head"><b className={index === 0 ? 'current' : ''}>{stage.number}</b><span><small>{stage.label}</small><strong>{stage.title}</strong></span><i>{createElement(iconFor(stage.icon), { size: 18 })}</i></div>{stage.links.map(([label, route]) => <button key={label} onClick={() => setLocation(route)}><em />{label}<ArrowRight size={15} /></button>)}</div>{index < ecosystemStages.length - 1 && <div className="collective-connector" aria-hidden="true"><span /></div>}</Fragment>)}</div><div className="collective-closing"><div><Heart size={19} /></div><span><strong>Sekarang pilih langkahmu.</strong><small>Mulai dari kebun, kopi, usaha, atau pengalaman.</small></span></div></main></Page>;
}

function PartnershipPage({ content }: { content: { image: string; eyebrow: string; title: string; copy: string } }) {
  const { notify } = useStore();
  const [form, setForm] = useState({ name: '', city: '', type: 'Cafe & restoran' });
  const [sent, setSent] = useWebStorageJson<boolean>('kopi-garut-partnership-sent', false);
  const activePartners = [
    { name: 'Ruang Seduh Roastery', type: 'CAFE & ROASTERY', location: 'Garut Kota', detail: 'Menyajikan Papandayan Series sebagai pilihan pour-over untuk pelanggan.', image: 'origin-coffee.webp', icon: Coffee },
    { name: 'Dapur Lereng', type: 'RESTORAN', location: 'Cisurupan', detail: 'Memasangkan Garut Beans dengan menu rumahan dan hasil kebun lokal.', image: 'event-festival-garut.webp', icon: Users },
    { name: 'Hotel Darajat View', type: 'HOTEL', location: 'Samarang', detail: 'Menghadirkan kopi asal Garut sebagai sambutan hangat untuk setiap tamu.', image: 'farmer-story-3.webp', icon: BriefcaseBusiness },
    { name: 'Kedai Pagi Garut', type: 'CAFE', location: 'Tarogong', detail: 'Menjadikan kopi petani Garut bagian dari ritual pagi warga kota.', image: 'coffee-cookies.webp', icon: Coffee },
  ] as const;
  const benefits = [
    { icon: Coffee, title: 'Sumber yang jelas', text: 'Kopi pilihan dengan cerita kebun yang bisa kamu bagikan.' },
    { icon: Users, title: 'Tumbuh bersama', text: 'Terhubung langsung dengan petani dan ekosistem Garut.' },
    { icon: ShieldCheck, title: 'Mitra resmi', text: 'Bangun kepercayaan pelanggan bersama identitas Garut Beans.' },
  ] as const;
  const partnerTypes = ['Cafe & restoran', 'Roastery', 'Hotel & kantor'] as const;
  const submit = () => {
    if (!form.name.trim() || !form.city.trim()) {
      notify('Isi nama usaha dan kota terlebih dahulu');
      return;
    }
    setSent(true);
    notify(`Pengajuan ${form.name} tersimpan di perangkat`);
    setForm({ name: '', city: '', type: form.type });
  };
  return <Page><main className="subpage partnership-page">
    <Header title="Kemitraan cafe" />
    <section className="partnership-hero">
      <img src={asset(content.image)} alt="" />
      <div className="partnership-hero-shade" />
      <div className="partnership-hero-badge"><BriefcaseBusiness size={13} /> PROGRAM MITRA</div>
      <div className="partnership-hero-copy">
        <span>{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.copy}</p>
      </div>
    </section>
    <div className="partnership-trust">
      <div><strong>01</strong><span>Asal terjaga</span></div>
      <i />
      <div><strong>100%</strong><span>Cerita nyata</span></div>
      <i />
      <div><strong>GARUT</strong><span>Satu ekosistem</span></div>
    </div>
    <section className="partnership-section partnership-showcase">
      <div className="partnership-heading"><div><span className="section-kicker">SUDAH BERJALAN BERSAMA</span><h2>Dari meja sarapan sampai lobi hotel.</h2></div><span className="partnership-heading-icon"><ArrowRight size={17} /></span></div>
      <p className="partnership-intro">Mereka membawa cerita kebun Garut lebih dekat ke pelanggan, tamu, dan keluarga di berbagai meja.</p>
      <div className="partner-card-grid">
        {activePartners.map((partner, index) => <article className="partner-card" key={partner.name}>
          <div className="partner-card-image"><img src={asset(partner.image)} alt={partner.name} /><div className="partner-card-shade" /><span className="partner-card-type"><partner.icon size={11} /> {partner.type}</span><b>{String(index + 1).padStart(2, '0')}</b></div>
          <div className="partner-card-copy"><h3>{partner.name}</h3><span className="partner-location"><MapPin size={11} /> {partner.location}</span><p>{partner.detail}</p></div>
        </article>)}
      </div>
    </section>
    <section className="partnership-section">
      <div className="partnership-section-heading"><span className="section-kicker">KENAPA BERGABUNG</span><h2>Partner yang baik terasa di setiap cangkir.</h2></div>
      <div className="partnership-benefits">{benefits.map((benefit, index) => <article className="partnership-benefit" key={benefit.title}><span><benefit.icon size={19} /></span><div><h3>{benefit.title}</h3><p>{benefit.text}</p></div><b>{String(index + 1).padStart(2, '0')}</b></article>)}</div>
    </section>
    <section className="partnership-section">
      <div className="partnership-section-heading"><span className="section-kicker">CARA KERJA</span><h2>Mulai dari percakapan sederhana.</h2></div>
      <div className="partnership-steps">
        <div><strong>01</strong><h3>Kenalan</h3><p>Ceritakan usaha dan kebutuhan kopimu.</p></div>
        <i /><div><strong>02</strong><h3>Pilih rasa</h3><p>Kami carikan profil yang cocok untuk pelangganmu.</p></div>
        <i /><div><strong>03</strong><h3>Tumbuh</h3><p>Bangun pengalaman ngopi yang punya asal.</p></div>
      </div>
    </section>
    <section className="partnership-section partnership-form-section">
      <div className="partnership-form-heading"><div><span className="section-kicker">LANGKAH PERTAMA</span><h2>Mari ngobrol soal usahamu.</h2></div><span><Send size={18} /></span></div>
      <div className="form-card">
        <strong className="partnership-field-label">Kamu bergerak di bidang apa?</strong>
        <div className="partnership-type-rail" role="listbox" aria-label="Jenis usaha">
          {partnerTypes.map((type) => <button type="button" key={type} className={`partnership-type-chip ${form.type === type ? 'active' : ''}`} onClick={() => setForm({ ...form, type })} aria-selected={form.type === type}>{type}</button>)}
        </div>
        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Nama usaha" aria-label="Nama usaha" data-testid="input-partner-name" />
        <input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} placeholder="Kota dan area" aria-label="Kota dan area" data-testid="input-partner-city" />
        <button className="primary-button wide" onClick={submit} data-testid="button-submit-partnership">{sent ? 'Kirim pengajuan lagi' : 'Kirim pengajuan'} <Send size={15} /></button>
        <p className="form-hint partnership-form-note">Tim Garut Beans akan menghubungi kamu untuk percakapan berikutnya.</p>
      </div>
    </section>
  </main></Page>;
}

function FarmerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const farmer = farmers.find((item) => item.id === id) ?? farmers[0];
  const coffee = coffees.find((item) => item.farmerName === farmer.name);
  return <Page><main className="subpage"><Header /><div className="detail-image"><img src={asset(farmer.image)} alt={farmer.name} /><button className="back-button" onClick={() => setLocation('/farmers')} aria-label="Kembali ke petani" data-testid="button-farmer-detail-back"><ArrowLeft size={18} /></button></div><div className="detail-copy"><span className="detail-series">{farmer.location} · {farmer.membershipId}</span><h1 className="detail-name">{farmer.name}</h1><p className="detail-tagline">{farmer.group}</p><div className="stat-row"><div className="stat"><b>{farmer.landArea}</b><span>Luas lahan</span></div><div className="stat"><b>{farmer.annualProduction}</b><span>Produksi</span></div><div className="stat"><b>{farmer.coffeeType}</b><span>Varietas</span></div></div><div className="info-card"><span className="section-kicker">CERITA KEBUN</span><p>{farmer.story}</p><p className="detail-description">Bergabung sejak {farmer.joinedAt}. Produk yang tercatat: {farmer.products.join(', ')}.</p></div>{coffee && <div className="info-card"><span className="section-kicker">LOT YANG DAPAT DICICIPI</span><h3>{coffee.name}</h3><p>{coffee.tagline} · {coffee.process} · {coffee.altitude}</p><button className="primary-button wide" onClick={() => setLocation(`/product/${coffee.id}`)} data-testid="button-farmer-coffee">Lihat kopi dari kebun ini <ArrowRight size={14} /></button></div>}</div></main></Page>;
}

function RegionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const region = regions.find((item) => item.id === id) ?? regions[0];
  return <Page><main className="subpage region-detail-page">
    <Header title={`Profil ${region.name}`} />
    <section className="region-detail-hero">
      <span className="region-detail-icon"><MapPin size={22} /></span>
      <span className="section-kicker">PROFIL WILAYAH KOPI</span>
      <h1>{region.name}, {region.village}</h1>
      <p>Bukan hanya tentang petani, tetapi juga kondisi kebun, karakter rasa, dan musim yang membentuk kopi dari wilayah ini.</p>
    </section>
    <div className="region-detail-stats">
      <div><strong>{region.elevation}</strong><small>KETINGGIAN</small></div>
      <div><strong>{region.specialty}</strong><small>KARAKTER RASA</small></div>
      <div><strong>{region.farmerCount} petani</strong><small>JUMLAH PETANI</small></div>
    </div>
    <section className="region-detail-section"><h2>Cerita wilayah</h2><p>{region.name} dikenal dengan karakter {region.specialty.toLowerCase()}. Profil ini menjadi ruang untuk menghubungkan cerita kebun, kelompok tani, pengolah, cafe mitra, dan pembeli dalam satu asal yang jelas.</p></section>
    <section className="region-detail-section"><h2>Data yang perlu dilengkapi</h2><div className="region-detail-fields">{['JENIS TANAH', 'CURAH HUJAN', 'LUAS LAHAN'].map((label) => <div key={label}><small>{label}</small><strong>Menunggu pendataan lapangan</strong></div>)}</div></section>
    <section className="region-detail-section"><h2>Kalender musim kopi</h2><div className="region-seasons">{['Musim berbunga', 'Musim panen', 'Musim pemupukan', 'Musim perawatan'].map((season) => <div key={season}><CalendarDays size={16} /><strong>{season}</strong></div>)}</div></section>
  </main></Page>;
}

function TraceabilityPage() {
  const [, setLocation] = useLocation();
  const [scanned, setScanned] = useState(() => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('lotId'));
  const coffee = coffees[0];
  const farmer = farmers.find((item) => item.group === coffee.farmerGroup) ?? farmers[0];
  const originRows = [
    { icon: Map, label: 'ASAL KEBUN', value: farmer.location, meta: `Wilayah ${traceabilityLot.region}, Garut · ${coffee.altitude}` },
    { icon: Users, label: 'PETANI PRODUSEN', value: farmer.name, meta: farmer.group },
    { icon: Coffee, label: 'JENIS KOPI', value: farmer.coffeeType, meta: `${traceabilityLot.variety} · Proses ${traceabilityLot.process}` },
    { icon: CalendarDays, label: 'TANGGAL PANEN', value: traceabilityLot.harvestDate, meta: 'Buah kopi dipetik saat matang' },
    { icon: Package, label: 'TANGGAL PRODUKSI', value: traceabilityLot.productionDate, meta: 'Lot disiapkan dan dikemas untuk dijual' },
  ];
  return <Page><main className="subpage traceability-page">
    <Header title="Jejak produk" />
    <section className="trace-hero">
      <div className="trace-hero-top">
        <div className="qr-mark"><AppIcon name="maximize" size={44} color={brandTokens.primary} /></div>
        <div className="trace-hero-badge"><span /> TERLACAK</div>
      </div>
      <span className="section-kicker">SCAN QR KEMASAN</span>
      <h1>Satu scan, satu cerita utuh.</h1>
      <p>Kenali kebun, proses, dan rasa yang akhirnya sampai di cangkir.</p>
      <button className="primary-button trace-scan-button" onClick={() => setScanned(true)} data-testid="button-trace-scan">
        {scanned ? <CheckCircle2 size={16} /> : <AppIcon name="maximize" size={16} color={brandTokens.primaryForeground} />}
        {scanned ? 'Cerita terbuka' : 'Buka cerita kopi'}
      </button>
    </section>
    {scanned && <div className="trace-result">
      <div className="success-banner">
        <span className="trace-success-icon"><CheckCircle2 size={17} /></span>
        <div><span className="section-kicker">SCAN BERHASIL</span><strong>Kemasan ini punya cerita.</strong></div>
        <code>{traceabilityLot.id}</code>
      </div>

      <section className="trace-photo">
        <img src={asset(farmer.image)} alt={farmer.name} />
        <div className="trace-photo-shade" />
        <div className="trace-photo-copy"><span className="section-kicker">PETANI PRODUSEN</span><h2>{farmer.name}</h2></div>
        <span className="status-chip"><ShieldCheck size={13} /> TERVERIFIKASI</span>
      </section>

      <div className="trace-result-copy">
        <span className="section-kicker">LOT {traceabilityLot.id}</span>
        <h2>{coffee.name}</h2>
        <p>{traceabilityLot.variety} · {traceabilityLot.process} · {traceabilityLot.weightKg} kg</p>
      </div>

      <section className="trace-origin-card">
        <div className="trace-card-heading"><span className="trace-card-icon"><MapPin size={17} /></span><div><span className="section-kicker">ASAL & PRODUSEN</span><h2>Kenali kebun dan petaninya</h2></div></div>
        {originRows.map(({ icon: Icon, label, value, meta }) => <div className="trace-origin-row" key={label}><span className="trace-row-icon"><Icon size={15} /><span /></span><div><small>{label}</small><strong>{value}</strong><em>{meta}</em></div></div>)}
      </section>

      <section className="trace-story-card">
        <div className="trace-story-heading"><span className="trace-story-icon"><Coffee size={18} /></span><span className="section-kicker">CERITA DI BALIK CANGKIR</span></div>
        <h2>{traceabilityLot.storyTitle}</h2>
        <p>{traceabilityLot.story}</p>
        <blockquote>“Yang menghangatkan cangkir ini bukan hanya kopi, tetapi juga kehidupan yang dijaganya.”</blockquote>
        <div className="trace-impact"><span><BriefcaseBusiness size={16} /></span><div><small>DAMPAK DI BALIK RASA</small><strong>{traceabilityLot.impact}</strong></div></div>
      </section>

      <div className="trace-section-heading"><div><span className="section-kicker">PERJALANAN LOT</span><h2>Dari kebun sampai cangkir</h2></div><span>3 tahap</span></div>
      <section className="trace-timeline">
        {traceabilityLot.journey.map((step, index) => <div className="trace-timeline-row" key={step.label}><div className="trace-timeline-rail"><span className={index === traceabilityLot.journey.length - 1 ? 'final' : ''}>{index + 1}</span>{index < traceabilityLot.journey.length - 1 && <i />}</div><div><small>{step.label.toUpperCase()}</small><strong>{step.title}</strong><p>{step.detail}</p></div></div>)}
      </section>

      <section className="trace-tasting-card">
        <div className="trace-tasting-top"><div><span className="section-kicker">SAAT KAMU MENIKMATINYA</span><h2>Yang terasa di cangkir</h2></div><Coffee size={25} /></div>
        <p>Rasa cerah lemon Meyer membuka tegukan, lalu gula merah dan melati tinggal lebih lama di akhir.</p>
        <div className="taste-list">{coffee.notes.map((note) => <span className="taste" key={note}>{note}</span>)}</div>
      </section>

      <section className="trace-final-card"><div><span className="section-kicker">SIAP MENYEDUH?</span><h2>Bawa cerita ini ke rumah.</h2><p>Paling nikmat sebagai {coffee.recommendedBrew.toLowerCase()}.</p></div><button className="secondary-button" onClick={() => setLocation(`/product/${coffee.id}`)} data-testid="button-trace-product">Lihat kopi <ArrowRight size={14} /></button></section>
    </div>}
  </main></Page>;
}

function DashboardPage() {
  const [, setLocation] = useLocation();
  const dashboardPrices = [
    ['Cherry kopi', 'Rp 8.500', 'per kg'],
    ['Gabah kopi', 'Rp 22.000', 'per kg'],
    ['Green bean', 'Rp 68.000', 'per kg'],
  ];
  return <Page><main className="subpage dashboard-page"><Header title="Dashboard dinas" /><div className="dashboard-banner"><BarChart3 size={22} /><div><strong>G-Beans Hub</strong><span>Ringkasan ekosistem Garut Beans</span></div></div><MetricStrip metrics={hubStats} /><div className="dashboard-section-heading"><h2>Sebaran wilayah</h2><span>Diperbarui hari ini</span></div><div className="dashboard-regions">{regions.map((region) => <button key={region.id} onClick={() => setLocation(`/region/${region.id}`)}><span className="dashboard-region-icon"><MapPin size={16} /></span><span><strong>{region.name}</strong><small>{region.farmerCount} petani · {region.elevation}</small></span><b>{region.specialty}</b></button>)}</div><h2 className="dashboard-price-title">Harga acuan</h2><div className="dashboard-prices">{dashboardPrices.map(([label, price, unit]) => <div key={label}><span>{label}</span><strong>{price} <small>{unit}</small></strong></div>)}</div></main></Page>;
}

const programCategories = ['Semua', 'CSR petani kopi', 'Lingkungan kebun', 'Keluarga petani', 'Komunitas kopi'];
const programServices = [
  { title: 'Verifikasi petani & produk', route: '/verification', icon: 'shield' },
  { title: 'Standar Garut Beans', route: '/standards', icon: 'check' },
  { title: 'Kurasi produk', route: '/curation', icon: 'repeat' },
  { title: 'Dashboard kelompok tani', route: '/group-dashboard', icon: 'users' },
  { title: 'Dashboard penyuluh', route: '/extension-dashboard', icon: 'mapPin' },
  { title: 'Laporan digital', route: '/reports', icon: 'chart' },
  { title: 'Notifikasi program', route: '/notifications', icon: 'message' },
  { title: 'Pusat dokumen', route: '/documents', icon: 'package' },
  { title: 'Usulan & kebutuhan dukungan', route: '/complaints', icon: 'send' },
];

function ProgramPage() {
  const [, setLocation] = useLocation();
  const { session } = useAuth();
  const { notify } = useStore();
  const [category, setCategory] = useState('Semua');
  const [applications, setApplications] = useWebStorageJson<string[]>('kopi-garut-program-applications', []);
  const visibleOffers = category === 'Semua' ? programOffers : programOffers.filter((offer) => offer.category === category);
  const roleCards = session?.id === 'petani'
    ? [{ title: 'Petani', detail: 'Verifikasi kebun, mutu lot, dan akses pasar.', route: '/verification', icon: 'coffee' }, { title: 'Ketua kelompok', detail: 'Pantau anggota, produksi, dan program bantuan.', route: '/group-dashboard', icon: 'users' }]
    : session?.id === 'penyuluh'
      ? [{ title: 'Penyuluh', detail: 'Catat kunjungan dan tindak lanjut kebun.', route: '/extension-dashboard', icon: 'mapPin' }]
      : [];
  const visibleServices = session ? programServices.filter((item) => canAccessRoute(item.route, session.id)) : [];
  const applicationOffers = [...programOffers, derivativeProgramOffer];
  const applyForProgram = (offer: { id: string; title: string }) => {
    if (!session) {
      setLocation('/login?returnTo=/program');
      return;
    }
    if (applications.includes(offer.id)) {
      notify('Pengajuan ini sudah tercatat dan sedang ditinjau.');
      return;
    }
    setApplications((items) => [...items, offer.id]);
    notify(`Pengajuan ${offer.title} sudah dikirim.`);
  };

  return (
    <Page>
      <main className="subpage program-page">
        <Header title="Program Garut Beans" subtitle="PROGRAM · GARUT" />
        <HeroPanel image="program-menu-ai.webp" eyebrow="PROGRAM G-BEANS" title="Belajar, berbagi, tumbuh bersama." copy="Ruang untuk pelatihan, dukungan, dan program yang menjaga masa depan Garut Beans." />
        <MetricStrip metrics={[{ label: 'Program rutin', value: String(regularPrograms.length).padStart(2, '0'), icon: 'calendar' }, { label: 'Agenda kopi', value: '08', icon: 'coffee' }, { label: 'Ekosistem', value: '01', icon: 'users' }]} />

        <SectionTitle kicker="PROGRAM KAMI" title="Kegiatan rutin untuk yang mencintai kopi." />
        <p className="program-intro">Bukan hanya menjual kopi. Kami membuat ruang untuk belajar, bertemu, dan membangun masa depan Garut Beans bersama-sama.</p>
        <div className="program-rail">
          {regularPrograms.map((item) => (
            <article className="program-card" key={item.id}>
              <img src={asset(item.image)} alt={item.title} />
              <div className="program-card-body">
                <span className="section-kicker">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="event-meta"><span>{item.cycle}</span><span>{item.next}</span></div>
                <button className="secondary-button" onClick={() => setLocation('/events')}>Lihat jadwal <ArrowRight size={13} /></button>
              </div>
            </article>
          ))}
        </div>

        <SectionTitle kicker="PEMBERDAYAAN DESA" title="Dari kopi, lahir lebih banyak karya." />
        <div className="dark-callout">
          <span className="section-kicker">PROGRAM DESA</span>
          <h2>Produk turunan kopi</h2>
          <p>Mengubah potensi kopi dan hasil sampingnya menjadi produk bernilai tambah yang bisa dibuat, dikelola, dan dipasarkan bersama oleh warga desa.</p>
          <div className="mini-grid">
            {derivativeProducts.map(([title, description, icon]) => <div className="mini-card" key={title}><span className="mini-card-icon">{createElement(iconFor(icon), { size: 16 })}</span><span><strong>{title}</strong><small>{description}</small></span></div>)}
          </div>
          <p className="derivative-note">Dikembangkan bersama desa, dari ide sampai siap dijual.</p>
          <button className="secondary-button" onClick={() => applyForProgram(derivativeProgramOffer)}><ArrowRight size={13} />{applications.includes(derivativeProgramOffer.id) ? 'Sudah diajukan' : session ? 'Ajukan pendampingan desa' : 'Masuk untuk mengajukan'}</button>
        </div>

        <SectionTitle kicker="CSR G-BEANS" title="Kontribusi untuk petani & kebun kopi" />
        <p className="program-intro">Dukungan CSR yang kembali ke ekosistem kopi: memperkuat keluarga petani, menjaga kebun, dan merawat lingkungan tempat Garut Beans tumbuh.</p>
        <div className="filter-pills">{programCategories.map((item) => <button key={item} className={`filter-pill ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="offer-list">
          {visibleOffers.map((offer) => {
            const applied = applications.includes(offer.id);
            return <article className="offer-card" key={offer.id}>
              <div className="offer-head"><div className="row-icon">{createElement(iconFor(offer.icon), { size: 17 })}</div><div><span className="section-kicker">{offer.category}</span><h3>{offer.title}</h3></div><span className="status-chip">Dibuka</span></div>
              <p>{offer.description}</p>
              <div className="offer-meta"><span><small>UNTUK</small><b>{offer.target}</b></span><span><small>DUKUNGAN</small><b>{offer.support}</b></span><span><small>BATAS</small><b>{offer.deadline}</b></span></div>
              <button className={`primary-button wide ${applied ? 'is-secondary' : ''}`} onClick={() => applyForProgram(offer)}><span>{applied ? <Check size={15} /> : <ArrowRight size={15} />}</span>{applied ? 'Sudah diajukan' : session ? 'Ajukan program' : 'Masuk untuk mengajukan'}</button>
            </article>;
          })}
        </div>

        {session && applications.length > 0 && <><SectionTitle kicker="PENGAJUAN SAYA" title="Sedang ditinjau" /><div className="application-list">{applications.map((applicationId) => { const offer = applicationOffers.find((item) => item.id === applicationId); return offer ? <div className="application-card" key={applicationId}><div className="row-icon"><Check size={16} /></div><div><strong>{offer.title}</strong><small>Pengajuan diterima · menunggu verifikasi</small></div><span>PROSES</span></div> : null; })}</div></>}

        <SectionTitle kicker="MULAI DARI PERANMU" title="Pilih ruang kerja" />
        {session && roleCards.length ? <div className="role-work-grid">{roleCards.map((role) => <button className="role-work-card" key={role.route} onClick={() => setLocation(role.route)}><div className="row-icon">{createElement(iconFor(role.icon), { size: 18 })}</div><span><small>RUANG KERJA</small><strong>{role.title}</strong><em>{role.detail}</em></span><ArrowRight size={16} /></button>)}</div> : <div className="access-card"><div className="row-icon"><ShieldCheck size={18} /></div><div><h3>Buka akses program</h3><p>Masuk untuk melihat ruang kerja yang sesuai.</p></div><button className="secondary-button" onClick={() => setLocation('/login?returnTo=/program')}>Masuk</button></div>}

        {session && <><SectionTitle kicker="SEMUA LAYANAN" title="Jelajahi program" /><div className="service-grid">{visibleServices.map((item) => <button className="service-card" key={item.route} onClick={() => setLocation(item.route)}><div className="row-icon">{createElement(iconFor(item.icon), { size: 17 })}</div><strong>{item.title}</strong><ArrowRight size={15} /></button>)}</div></>}
      </main>
    </Page>
  );
}

const operationConfigs: Record<string, { eyebrow: string; title: string; copy: string; image: string; rows: Array<[string, string, string, string?]>; metrics?: Array<{ label: string; value: string; icon?: string }>; form?: { label: string; placeholder: string; action: string } }> = {
  verification: { eyebrow: 'VERIFIKASI · PETANI', title: 'Status yang jelas untuk setiap kebun.', copy: 'Pastikan identitas, kelompok, lokasi kebun, dan lot kopi tercatat dengan rapi.', image: 'verification-menu-ai.webp', rows: [['Terverifikasi', 'Profil petani dan identitas usaha sudah cocok.', 'Lengkap', 'check'], ['Kelompok tani terverifikasi', 'Keanggotaan tercatat di kelompok aktif.', 'Lengkap', 'users'], ['Lokasi kebun terverifikasi', 'Titik kebun dan luas lahan sudah dipetakan.', 'Lengkap', 'mapPin'], ['Produk terverifikasi', 'Lot Arabika Honey 2026 menunggu foto kemasan.', 'Dalam tinjauan', 'package']] },
  standards: { eyebrow: 'RUJUKAN MUTU', title: 'Standar Garut Beans.', copy: 'Rujukan mutu internal untuk setiap lot, dari kebun hingga kemasan.', image: 'standards-menu-ai.webp', rows: standards.map(([title, value, detail]) => [title, `${value} · ${detail}`, 'Standar', 'check']) },
  quality: { eyebrow: 'CEK MUTU LOT', title: 'Ukur kesiapan mutu lot.', copy: 'Pastikan lot siap dicatat, dicicipi, dan ditawarkan ke pembeli.', image: 'standards-menu-ai.webp', rows: [['Kadar air', '10–12% sebelum penyimpanan', 'Siap dicek', 'coffee'], ['Defect', 'Maks. 5 defect / 300 g', 'Siap dicek', 'check'], ['Cupping', 'Minimum 80 poin', 'Belum diisi', 'chart'], ['Kemasan', 'Food grade + kode lot', 'Siap dicek', 'package']], form: { label: 'Catatan pemeriksaan', placeholder: 'Contoh: kadar air 11,2%, lot siap untuk cupping', action: 'Simpan hasil cek' } },
  curation: { eyebrow: 'KURASI PRODUK', title: 'Dari kebun menuju katalog.', copy: 'Ikuti setiap tahap agar produk yang tampil membawa cerita dan mutu yang jelas.', image: 'reports-menu-ai.webp', rows: curationProducts.map((item) => [item.name, `${item.producer} · ${item.note}`, `${curationStages[item.stage]}`, 'package']) },
  extensionDashboard: { eyebrow: 'PENYULUH · DASHBOARD', title: 'Bawa data kebun ke lapangan.', copy: 'Ringkasan kunjungan, kondisi kebun, dan tindak lanjut dalam satu ruang kerja.', image: 'regions-banner.webp', metrics: [{ label: 'Kunjungan bulan ini', value: '18', icon: 'mapPin' }, { label: 'Kondisi kebun baik', value: '14', icon: 'check' }, { label: 'Masalah terbuka', value: '06', icon: 'message' }, { label: 'Jatuh tempo', value: '03', icon: 'calendar' }], rows: [['Iis Nurhayati', 'Daun menguning di blok 2 setelah hujan panjang.', 'Menunggu arahan', 'leaf'], ['H. Asep Rahmat', 'Pemetaan blok panen dan foto lot.', 'Dijadwalkan', 'calendar'], ['Deni Suhendar', 'Pengecekan naungan kebun.', 'Selesai', 'check']] },
  extensionVisits: { eyebrow: 'PENYULUH · KUNJUNGAN', title: 'Catatan kunjungan lapangan.', copy: 'Simpan hasil observasi dan rekomendasi yang bisa ditindaklanjuti.', image: 'farmer-story-1.webp', rows: [['Iis Nurhayati', 'Mekarsari, Cikajang · 12 Juni 2026', 'Kunjungan terakhir', 'mapPin'], ['Kunjungan berikutnya', '19 Juni 2026 · Blok utara', 'Dijadwalkan', 'calendar']], form: { label: 'Catatan kunjungan baru', placeholder: 'Tulis kondisi kebun, masalah, dan rekomendasi', action: 'Simpan kunjungan' } },
  extensionTraining: { eyebrow: 'PENYULUH · PELATIHAN', title: 'Pelatihan yang bergerak bersama kebun.', copy: 'Atur materi dan agenda pendampingan untuk kelompok tani.', image: 'event-postharvest-class.webp', rows: [['Pelatihan sortasi & defect', 'Besok, 09.00 · Rumah produksi Cikuray', 'Terjadwal', 'calendar'], ['Kelas pascapanen', '17 Oktober 2026 · Cikajang', 'Pendaftaran', 'coffee'], ['Cupping & Kenal Asal', '14 November 2026 · Cisurupan', 'Terjadwal', 'chart']] },
  extensionReports: { eyebrow: 'PENYULUH · LAPORAN', title: 'Ringkas pendampingan dengan jelas.', copy: 'Lihat perkembangan kunjungan, kondisi kebun, dan tindak lanjut.', image: 'reports-menu-ai.webp', metrics: [{ label: 'Laporan tersimpan', value: '24', icon: 'file' }, { label: 'Selesai bulan ini', value: '18', icon: 'check' }, { label: 'Perlu respons', value: '06', icon: 'message' }], rows: [['Rekap Cikajang', '14 kunjungan · 6 rekomendasi aktif', 'Terbaru', 'chart'], ['Rekap Cisurupan', '9 kunjungan · 2 tindak lanjut', 'Ditinjau', 'chart']] },
  extensionFarmers: { eyebrow: 'PENYULUH · PETANI BINAAN', title: 'Kenali kebun yang kamu dampingi.', copy: 'Buka profil petani, catatan kunjungan, dan kebutuhan dukungan.', image: 'farmer-asep-rahmat.webp', rows: farmers.map((farmer) => [farmer.name, `${farmer.group} · ${farmer.location}`, farmer.annualProduction, 'users']) },
  extensionIssues: { eyebrow: 'PENYULUH · MASALAH KEBUN', title: 'Tindak lanjut yang tidak tercecer.', copy: 'Prioritaskan kendala kebun dan hubungkan dengan rekomendasi penyuluh.', image: 'farmer-story-2.webp', rows: [['Daun menguning di blok 2', 'Iis Nurhayati · hujan panjang', 'Menunggu arahan', 'leaf'], ['Drainase blok utara', 'H. Asep Rahmat · puncak panen', 'Dijadwalkan', 'mapPin'], ['Foto lot belum lengkap', 'KTH Cikuray Mandiri', 'Sudah ditinjau', 'check']], form: { label: 'Catatan tindak lanjut', placeholder: 'Tambahkan arahan untuk petani', action: 'Simpan arahan' } },
  groupDashboard: { eyebrow: 'KELOMPOK TANI', title: 'Satu meja untuk gerak kelompok.', copy: 'Pantau anggota, produksi, permintaan pembeli, dan jadwal kelompok.', image: 'collective-banner.webp', metrics: [{ label: 'Anggota aktif', value: '42', icon: 'users' }, { label: 'Produksi musim ini', value: '8,4 ton', icon: 'coffee' }, { label: 'Panen berjalan', value: '1,8 ton', icon: 'calendar' }, { label: 'Penjualan tercatat', value: 'Rp 186 jt', icon: 'wallet' }], rows: [['Permintaan Arabika Grade 1', 'Ruang Seduh Roastery · 300 kg · proses honey', 'Menunggu respons', 'briefcase'], ['Program dryer bersama', 'Dinas Pertanian Garut · 1 unit', 'Verifikasi dokumen', 'package'], ['Pelatihan sortasi & defect', 'Besok, 09.00 · Rumah produksi Cikuray', 'Agenda', 'calendar']] },
  reports: { eyebrow: 'LAPORAN DIGITAL', title: 'Baca pertumbuhan dengan jelas.', copy: 'Bandingkan produksi, penjualan, dan pendampingan di wilayah Garut Beans.', image: 'reports-menu-ai.webp', metrics: hubStats.map((item) => ({ label: item.label, value: item.value, icon: 'chart' })), rows: [['Produksi Arabika Cikajang', 'KTH Cikuray Mandiri · kenaikan 12,4%', 'Di atas target', 'trending'], ['Panen Papandayan', 'KTH Papandayan Lestari · dryer bersama dijadwalkan', 'Perlu pendampingan', 'calendar'], ['Penjualan lot Kamojang', 'Kelompok Tani Talaga · dua pembeli baru', 'Naik bulan ini', 'wallet']] },
  documents: { eyebrow: 'PUSAT DOKUMEN', title: 'Panduan yang siap dibawa ke kebun.', copy: 'Simpan SOP, modul, regulasi, dan formulir program di satu tempat.', image: 'documents-menu-ai.webp', rows: [['Panduan budidaya Arabika Garut', 'PDF · 24 halaman · naungan, pemupukan, pemangkasan', 'Budidaya', 'coffee'], ['SOP panen dan pascapanen', 'PDF · 18 halaman · sortasi, fermentasi, pengeringan', 'Pascapanen', 'package'], ['Modul pelatihan cupping dasar', 'Modul · 12 halaman · aroma, rasa, body, acidity', 'Pelatihan', 'check'], ['Regulasi label dan ketertelusuran', 'Panduan · 9 halaman · kode lot dan kemasan', 'Regulasi', 'shield'], ['Formulir verifikasi kebun dan lot', 'Formulir · identitas petani, lokasi, proses, dan kode lot', 'Verifikasi', 'file'], ['Modul pendampingan kelompok tani', 'Modul · kunjungan, arahan, dan tindak lanjut penyuluh', 'Pendampingan', 'users']] },
  farmCalendar: { eyebrow: 'PETANI · KALENDER', title: 'Rencanakan musim kebun.', copy: 'Atur panen, pemupukan, pemangkasan, dan kunjungan dari satu kalender.', image: 'event-postharvest-class.webp', rows: [['Panen Papandayan Series', '29 September 2026 · Blok utara', '7 hari lagi', 'calendar'], ['Pelatihan sortasi & defect', '29 September 2026 · 09.00', 'Agenda', 'users'], ['Pengumpulan data panen', '30 September 2026 · hasil dan biaya', 'Besok', 'chart']], form: { label: 'Agenda kebun baru', placeholder: 'Contoh: pemupukan blok selatan, 2 Oktober 2026', action: 'Tambah agenda' } },
  harvestLog: { eyebrow: 'PETANI · CATATAN PANEN', title: 'Catat hasil dari setiap blok.', copy: 'Simpan hasil, biaya, dan asal panen agar nilai kebun terbaca.', image: 'farmer-asep-rahmat.webp', rows: [['Panen Papandayan Series', 'Blok utara · cherry merah · 420 kg', 'Tersimpan', 'coffee'], ['Musim sebelumnya', 'Blok timur · cherry merah · 380 kg', 'Arsip', 'file']], form: { label: 'Catatan panen baru', placeholder: 'Contoh: Blok utara, 420 kg cherry, 29 September 2026', action: 'Simpan catatan panen' } },
  farmCosts: { eyebrow: 'PETANI · BIAYA KEBUN', title: 'Hitung biaya sebelum menghitung laba.', copy: 'Catat kebutuhan kebun, tenaga, dan pascapanen dengan lebih tertib.', image: 'coffee-palm-sugar-concentrate.webp', rows: [['Pemupukan blok utara', 'Rp 1.850.000 · September 2026', 'Tercatat', 'wallet'], ['Tenaga petik', 'Rp 3.200.000 · musim berjalan', 'Tercatat', 'users'], ['Pengeringan lot', 'Rp 780.000 · proses madu', 'Perlu rincian', 'package']], form: { label: 'Biaya kebun baru', placeholder: 'Contoh: pupuk kompos · Rp 850.000 · blok selatan', action: 'Simpan biaya' } },
  paymentRecords: { eyebrow: 'PETANI · PEMBAYARAN', title: 'Transaksi yang mudah dilacak.', copy: 'Catat uang muka, pelunasan, dan sisa transaksi per lot.', image: 'reports-menu-ai.webp', rows: [['Papandayan Series', 'Uang muka · Ruang Seduh Roastery · Rp 12.000.000', 'Diterima', 'wallet'], ['Cikuray Natural', 'Pelunasan · Kedai Lereng · Rp 8.400.000', 'Menunggu', 'clock']], form: { label: 'Catatan pembayaran', placeholder: 'Contoh: pelunasan lot 06 · Rp 8.400.000 · 30 September', action: 'Simpan pembayaran' } },
  salesSubmissions: { eyebrow: 'PETANI · AKSES PASAR', title: 'Tawarkan lot dengan cerita lengkap.', copy: 'Bawa detail asal, proses, stok, dan harga ke pembeli yang tepat.', image: 'kopi-garut-bangun-rantai-kopi-banner.webp', rows: [['Papandayan Series', '86 kg · madu · 1.650 mdpl', 'Tayang', 'coffee'], ['Cikuray Natural', '52 kg · natural · 1.450 mdpl', 'Menunggu foto', 'package']], form: { label: 'Ajukan lot baru', placeholder: 'Contoh: Kamojang Washed 2026 · 40 kg · proses cuci', action: 'Kirim pengajuan' } },
};

function OperationPage({ kind }: { kind: string }) {
  const [, setLocation] = useLocation();
  const { notify } = useStore();
  const config = operationConfigs[kind] ?? operationConfigs.reports;
  const [saved, setSaved] = useWebStorageJson<string[]>(`kopi-garut-${kind}-records`, []);
  const [note, setNote] = useState('');
  return <Page><main className="subpage"><Header /><HeroPanel image={config.image} eyebrow={config.eyebrow} title={config.title} copy={config.copy} />{config.metrics && <MetricStrip metrics={config.metrics} />}<div className="section-heading"><div><span className="section-kicker">RUANG KERJA</span><h2>Ringkasan terbaru</h2></div><span className="section-kicker">{config.rows.length} catatan</span></div><div className="operation-list">{config.rows.map(([title, detail, status, icon]) => <ActionRow icon={icon ?? 'package'} title={title} detail={detail} status={status} key={`${title}-${detail}`} action={kind === 'extensionFarmers' ? 'Buka' : undefined} onAction={kind === 'extensionFarmers' ? () => setLocation(`/farmer/${farmers.find((farmer) => farmer.name === title)?.id ?? farmers[0].id}`) : undefined} />)}</div>{config.form && <div className="form-card"><span className="section-kicker">CATATAN PERANGKAT</span><h2>{config.form.label}</h2><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder={config.form.placeholder} data-testid={`input-${kind}-note`} /><button className="primary-button wide" onClick={() => { if (!note.trim()) { notify('Tulis catatan terlebih dahulu'); return; } setSaved((items) => [...items, note]); setNote(''); notify(`${config.form?.action} berhasil disimpan di perangkat`); }} data-testid={`button-${kind}-save`}>{config.form.action} <Check size={15} /></button>{saved.length > 0 && <div className="saved-note"><CheckCircle2 size={16} /><span>{saved.length} catatan tersimpan di perangkat ini.</span></div>}</div>}<div className="dark-callout"><span className="section-kicker">LANJUTKAN</span><h2>Data yang rapi membantu keputusan yang lebih baik.</h2><p>Hubungkan catatan ini dengan katalog, petani, wilayah, dan program Garut Beans lainnya.</p><button className="secondary-button" onClick={() => setLocation(kind.startsWith('extension') ? '/extension-dashboard' : '/program')}>{kind.startsWith('extension') ? 'Kembali ke dashboard penyuluh' : 'Buka semua program'} <ArrowRight size={14} /></button></div></main></Page>;
}

type WebComplaintCategory = 'Petani belum terdata' | 'Bantuan bibit' | 'Lahan siap dikembangkan' | 'Pendampingan' | 'Lainnya';
type WebComplaint = {
  id: string;
  category: WebComplaintCategory;
  location: string;
  description: string;
  status: 'Diterima' | 'Ditinjau';
  createdAt: string;
};
type WebComplaintDraft = Pick<WebComplaint, 'category' | 'location' | 'description'>;

const webComplaintCategories: WebComplaintCategory[] = ['Petani belum terdata', 'Bantuan bibit', 'Lahan siap dikembangkan', 'Pendampingan', 'Lainnya'];
const webComplaintGuidance: Record<WebComplaintCategory, { icon: string; title: string; description: string; shortDescription: string }> = {
  'Petani belum terdata': {
    icon: 'users',
    title: 'Kenalkan petani atau kelompoknya',
    shortDescription: 'Jangkau petani atau kelompok yang belum tercatat.',
    description: 'Sebutkan nama petani atau kelompok, lokasi kebun, dan apakah mereka sudah pernah mendapat pendampingan.',
  },
  'Bantuan bibit': {
    icon: 'package',
    title: 'Jelaskan rencana penanamannya',
    shortDescription: 'Ajukan kebutuhan bibit untuk lahan yang siap ditanam.',
    description: 'Tuliskan luas lahan, jenis kopi yang dibutuhkan, perkiraan jumlah bibit, dan waktu tanam.',
  },
  'Lahan siap dikembangkan': {
    icon: 'map',
    title: 'Ceritakan potensi lahannya',
    shortDescription: 'Usulkan lahan yang siap masuk tahap pengembangan.',
    description: 'Sebutkan lokasi, perkiraan luas, kondisi lahan, dan bentuk bantuan yang paling dibutuhkan.',
  },
  Pendampingan: {
    icon: 'briefcase',
    title: 'Sampaikan pendampingan yang dibutuhkan',
    shortDescription: 'Minta kunjungan atau arahan dari tim lapangan.',
    description: 'Contoh: budidaya, pascapanen, pembentukan kelompok, akses program, atau pemasaran.',
  },
  Lainnya: {
    icon: 'message',
    title: 'Berikan konteks selengkap mungkin',
    shortDescription: 'Sampaikan kebutuhan lain yang belum tercantum.',
    description: 'Tuliskan siapa yang perlu dibantu, lokasinya, dan dukungan yang paling dibutuhkan.',
  },
};

function ComplaintsPage() {
  const [, setLocation] = useLocation();
  const { session } = useAuth();
  const { notify } = useStore();
  const [draft, setDraft] = useWebStorageJson<WebComplaintDraft | null>('kopi-garut-program-complaint-draft', null);
  const [complaints, setComplaints] = useWebStorageJson<WebComplaint[]>('kopi-garut-program-complaints', []);
  const [category, setCategory] = useState<WebComplaintCategory>(draft?.category ?? 'Petani belum terdata');
  const [fieldLocation, setFieldLocation] = useState(draft?.location ?? '');
  const [description, setDescription] = useState(draft?.description ?? '');
  const [feedback, setFeedback] = useState('');
  const selectedGuidance = webComplaintGuidance[category];
  const summary = useMemo(() => ({
    total: complaints.length,
    received: complaints.filter((item) => item.status === 'Diterima').length,
    reviewed: complaints.filter((item) => item.status === 'Ditinjau').length,
  }), [complaints]);
  const isSuccess = feedback.startsWith('Keluhan diterima');

  const submitComplaint = () => {
    if (!fieldLocation.trim() || !description.trim()) {
      setFeedback('Lengkapi lokasi dan kebutuhan dukungan sebelum mengirim.');
      return;
    }
    if (!session) {
      setDraft({ category, location: fieldLocation.trim(), description: description.trim() });
      setLocation('/login?returnTo=/complaints');
      return;
    }
    const next: WebComplaint = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      category,
      location: fieldLocation.trim(),
      description: description.trim(),
      status: 'Diterima',
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setComplaints((items) => [next, ...items]);
    setFieldLocation('');
    setDescription('');
    setDraft(null);
    setFeedback('Keluhan diterima. Tim program akan meninjau dan menghubungi kamu bila perlu.');
    notify('Usulan sudah diterima dan disimpan di perangkat');
  };

  return (
    <Page>
      <main className="subpage complaints-page">
        <Header title="Sampaikan keluhan" subtitle="PROGRAM · RUANG KELUHAN" />
        <HeroPanel image="complaints-menu-ai.webp" eyebrow="RUANG KELUHAN" title="Ada yang perlu dibenahi?" copy="Ceritakan kondisi di lapangan. Setiap laporan membantu tim Garut Beans menentukan dukungan yang lebih tepat." />
        <div className="complaint-hero-callout">
          <div className="complaint-hero-top"><span><Send size={17} /></span><small>LAPORANMU BERARTI</small></div>
          <h2>Satu laporan, satu langkah lebih dekat</h2>
          <p>Tim akan membaca laporanmu dan mengarahkannya ke pendamping atau program yang sesuai.</p>
          <div className="complaint-hero-footer"><i />Tanpa data pribadi sensitif</div>
        </div>

        <SectionTitle kicker="01 · PILIH TOPIK" title="Apa yang terjadi?" />
        <p className="complaint-section-hint">Pilih topik yang paling dekat dengan kondisi di lapangan.</p>
        <div className="complaint-category-grid">
          {webComplaintCategories.map((item, index) => {
            const guidance = webComplaintGuidance[item];
            const selected = category === item;
            return <button key={item} className={`complaint-category-card ${selected ? 'selected' : ''}`} onClick={() => setCategory(item)} aria-pressed={selected}>
              <div className="complaint-category-top"><span>{createElement(iconFor(guidance.icon), { size: 17 })}</span><small>{String(index + 1).padStart(2, '0')}</small>{selected && <Check size={15} />}</div>
              <strong>{item}</strong>
              <p>{guidance.shortDescription}</p>
            </button>;
          })}
        </div>
        <div className="complaint-guidance">
          <span>{createElement(iconFor(selectedGuidance.icon), { size: 17 })}</span>
          <div><small>INFORMASI YANG MEMBANTU</small><strong>{selectedGuidance.title}</strong><p>{selectedGuidance.description}</p></div>
        </div>

        <SectionTitle kicker="02 · DETAIL LAPANGAN" title="Ceritakan kondisinya" />
        <div className="form-card complaint-form-card">
          <div className="complaint-form-heading"><span><MapPin size={17} /></span><div><strong>Bantu tim menemukan lokasinya</strong><small>Lokasi yang spesifik mempercepat tindak lanjut.</small></div></div>
          <label><span>Lokasi petani atau lahan <b>Wajib</b></span><input value={fieldLocation} onChange={(event) => setFieldLocation(event.target.value)} placeholder="Contoh: Desa Mekarsari, Blok 2" /></label>
          <label><span>Ceritakan kebutuhanmu <b>Wajib</b></span><textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Contoh: Ada 12 petani kopi yang belum terdata dan membutuhkan bibit Arabika." /></label>
          <small className="complaint-field-note">Sertakan nama kelompok, perkiraan jumlah penerima, atau waktu yang diharapkan. Hindari NIK, nomor telepon, dan data pribadi.</small>
        </div>

        {feedback && <div className={`complaint-feedback ${isSuccess ? 'success' : ''}`}><span>{isSuccess ? <Check size={16} /> : <CircleUserRound size={16} />}</span><p>{feedback}</p></div>}
        <div className="complaint-submit-group">
          <button className="primary-button wide" onClick={submitComplaint}>{session ? 'Kirim keluhan' : 'Masuk untuk mengirim keluhan'} {session ? <Send size={15} /> : <ShieldCheck size={15} />}</button>
          <small>{session ? 'Laporan akan tersimpan di perangkat ini dan masuk ke riwayat.' : 'Draf akan tetap tersimpan saat kamu masuk ke akun.'}</small>
        </div>

        <SectionTitle kicker="03 · RIWAYAT DI PERANGKAT INI" title="Laporan terbaru" />
        <div className="complaint-summary">
          <div className="complaint-summary-intro"><Send size={16} />Ringkasan usulanmu</div>
          <div className="complaint-summary-stats"><span><strong>{summary.total}</strong><small>Total</small></span><i /><span><strong>{summary.received}</strong><small>Diterima</small></span><i /><span><strong>{summary.reviewed}</strong><small>Ditinjau</small></span></div>
        </div>
        {complaints.length > 0 ? <div className="complaint-history">{complaints.slice(0, 3).map((item) => <div className="info-card complaint-history-card" key={item.id}><div className="complaint-history-top"><span>{createElement(iconFor(webComplaintGuidance[item.category]?.icon ?? 'message'), { size: 17 })}</span><div><strong>{item.category}</strong><small>{item.location} · {item.createdAt}</small></div><em className={item.status === 'Diterima' ? 'positive' : ''}>{item.status}</em></div><div className="complaint-history-divider" /><p>{item.description}</p><small className="complaint-history-status">{item.status === 'Diterima' ? '✓ Tersimpan dan menunggu peninjauan.' : 'ⓘ Usulan sedang dipelajari oleh tim.'}</small></div>)}</div> : <div className="complaint-empty"><span><Send size={19} /></span><strong>Belum ada usulan</strong><p>Usulan tentang petani, lahan, atau kebutuhan bantuan akan tersimpan di perangkat ini.</p></div>}
      </main>
    </Page>
  );
}

function PricesPage() {
  const [, setLocation] = useLocation();
  const prices = [['Cherry kopi', 'Rp 8.500', 'per kg', '+4,2% bulan ini'], ['Gabah kopi', 'Rp 22.000', 'per kg', '+2,1% bulan ini'], ['Green bean', 'Rp 68.000', 'per kg', 'Harga rata-rata'], ['Roasted bean', 'Rp 125.000', 'per 200 g', 'Harga rata-rata']];
  return <Page><main className="subpage"><Header /><HeroPanel image="price-menu-ai.webp" eyebrow="HARGA ACUAN" title="Baca harga, rencanakan langkah." copy="Harga referensi membantu petani, kelompok, dan pembeli berbicara dengan dasar yang sama." /><div className="price-list">{prices.map(([label, price, unit, change]) => <article className="price-card" key={label}><div><span className="section-kicker">{label}</span><h2>{price}</h2><p>{unit} · {change}</p></div><TrendingUp size={20} /></article>)}</div><div className="dark-callout"><span className="section-kicker">LIHAT PRODUK</span><h2>Bandingkan dengan lot yang tersedia.</h2><button className="secondary-button" onClick={() => setLocation('/catalog')}>Buka katalog <ArrowRight size={14} /></button></div></main></Page>;
}

type SupportMessage = { id: string; text: string; sender: 'user' | 'assistant' };

const supportFaqs = [
  { question: 'Bagaimana cara memilih Garut Beans?', answer: 'Mulai dari rasa yang kamu suka. Lihat profil rasa di halaman Jelajah untuk membandingkan kopi dari tiap wilayah.' },
  { question: 'Berapa lama pesanan diproses?', answer: 'Pesanan biasanya diproses dalam 1–2 hari kerja setelah pembayaran terkonfirmasi.' },
  { question: 'Apa arti kode lot pada kopi?', answer: 'Kode lot membantu melacak asal kebun, proses pascapanen, dan waktu panen. Buka menu Jejak untuk detailnya.' },
  { question: 'Bagaimana cara berdiskusi soal program petani?', answer: 'Pilih mode Live CS di atas, lalu tuliskan pertanyaanmu agar tim Garut Beans dapat menindaklanjutinya.' },
] as const;

function SupportPage() {
  const [mode, setMode] = useState<'faq' | 'live'>('faq');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<SupportMessage[]>([
    { id: 'welcome', sender: 'assistant', text: 'Halo, saya asisten Garut Beans. Pilih pertanyaan yang sering ditanyakan atau tulis pertanyaanmu.' },
  ]);

  const askQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    const answer = mode === 'faq'
      ? supportFaqs.find((item) => item.question === trimmed)?.answer ?? 'Saya belum menemukan jawaban yang pas. Coba pilih salah satu FAQ di atas atau lanjutkan ke Live CS.'
      : 'Pesanmu sudah masuk ke antrean tim CS. Sambil menunggu, kamu bisa melihat katalog atau mengirim detail pesanan agar kami dapat membantu lebih cepat.';
    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-${current.length}`, sender: 'user', text: trimmed },
      { id: `${Date.now()}-${current.length}-answer`, sender: 'assistant', text: answer },
    ]);
    setInput('');
  };

  return (
    <Page>
      <main className="subpage support-page">
        <Header title={mode === 'live' ? 'Chat Live CS' : 'FAQ Chat'} subtitle={mode === 'live' ? 'BANTUAN · TIM G-BEANS' : 'BANTUAN · JAWABAN CEPAT'} />
        <div className="support-mode-switch" role="tablist" aria-label="Mode bantuan">
          <button className={mode === 'faq' ? 'active' : ''} onClick={() => setMode('faq')} role="tab" aria-selected={mode === 'faq'} data-testid="support-mode-faq">FAQ Chat</button>
          <button className={mode === 'live' ? 'active' : ''} onClick={() => setMode('live')} role="tab" aria-selected={mode === 'live'} data-testid="support-mode-live">Live CS</button>
        </div>
        <section className="support-intro">
          <span className="support-intro-icon"><MessageSquare size={20} /></span>
          <div><span className="section-kicker">{mode === 'faq' ? 'JAWABAN DALAM HITUNGAN DETIK' : 'TIM SIAP MEMBANTU'}</span><h2>{mode === 'faq' ? 'Tanya apa saja soal Garut Beans' : 'Mari cari solusi bersama'}</h2><p>{mode === 'faq' ? 'Pilih FAQ atau tulis pertanyaan dengan bahasamu sendiri.' : 'Sampaikan nomor pesanan atau kebutuhanmu secara singkat. Hindari mengirim data sensitif.'}</p></div>
        </section>
        {mode === 'faq' && <section className="support-faq-list"><span className="section-kicker">PERTANYAAN POPULER</span>{supportFaqs.map((item) => <button key={item.question} onClick={() => askQuestion(item.question)} data-testid={`support-faq-${item.question}`}><span>{item.question}</span><ArrowRight size={15} /></button>)}</section>}
        <section className="support-chat">
          <span className="section-kicker">PERCAKAPAN</span>
          <div className="support-message-list">{messages.map((message) => <div className={`support-message ${message.sender}`} key={message.id}>{message.text}</div>)}</div>
          <form className="support-composer" onSubmit={(event) => { event.preventDefault(); askQuestion(input); }}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={mode === 'faq' ? 'Tulis pertanyaan…' : 'Tulis pesan untuk CS…'} aria-label={mode === 'faq' ? 'Tulis pertanyaan FAQ' : 'Tulis pesan untuk CS'} data-testid="support-message-input" />
            <button type="submit" aria-label="Kirim pesan" data-testid="support-send-message"><Send size={17} /></button>
          </form>
        </section>
      </main>
    </Page>
  );
}

function CoffeeGamePage() {
  const { notify } = useStore();
  const [score, setScore] = useState(0);
  return <Page><main className="subpage"><Header /><HeroPanel image="games-coffee-beans.webp" eyebrow="MINI GAMES" title="Panen biji, raih skor." copy="Permainan ringan untuk mengenal ritme panen Garut Beans." /><div className="game-board"><div className="game-score"><span>SKOR</span><strong>{score}</strong></div><img src={asset(score % 2 ? 'games-cart.webp' : 'games-basket.webp')} alt="Keranjang kopi" /><p>Klik tombol untuk mengumpulkan biji kopi.</p><button className="primary-button wide" onClick={() => { setScore((value) => value + 10); notify('Biji kopi terkumpul'); }}>Panen biji kopi <Coffee size={16} /></button></div></main></Page>;
}

function SimpleHubPage({ title, copy, icon: Icon }: { title: string; copy: string; icon: LucideIcon }) {
  return <Page><main className="subpage"><Header /><div className="info-card" style={{ padding: 22, marginTop: 8 }}><div className="empty-icon" style={{ margin: '0 0 14px' }}><Icon size={25} /></div><h3 style={{ fontSize: 20 }}>{title}</h3><p>{copy}</p></div></main></Page>;
}

function AppRouter() {
  const [location, setLocation] = useLocation();
  const { session } = useAuth();
  const route = location.split('?')[0];
  if (!canAccessRoute(route, session?.id)) {
    return <LoginRedirect route={route} onRedirect={() => setLocation(`/login?returnTo=${encodeURIComponent(route)}`)} />;
  }
  return <Switch>
    <Route path="/" component={WebHomeRoute} />
    <Route path="/login"><LoginPage /></Route>
    <Route path="/catalog" component={CatalogPage} />
    <Route path="/product/:id" component={ProductDetailPage} />
    <Route path="/cart" component={CartPage} />
    <Route path="/favorites" component={FavoritesPage} />
    <Route path="/orders" component={OrdersPage} />
    <Route path="/profile" component={ProfilePage} />
    <Route path="/profile/settings"><SimpleHubPage title="Pengaturan akun" copy="Preferensi akun dan pengalaman Garut Beans tersimpan di perangkat ini." icon={Settings} /></Route>
    <Route path="/notifications" component={NotificationsPage} />
    <Route path="/traceability" component={TraceabilityPage} />
    <Route path="/farmers"><HubPage kind="farmers" /></Route>
    <Route path="/farmer/:id" component={FarmerDetailPage} />
    <Route path="/regions"><HubPage kind="regions" /></Route>
    <Route path="/region/:id" component={RegionDetailPage} />
    <Route path="/tourism"><HubPage kind="tourism" /></Route>
    <Route path="/events"><HubPage kind="events" /></Route>
    <Route path="/partnership"><HubPage kind="partnership" /></Route>
    <Route path="/collective" component={CollectivePage} />
    <Route path="/program" component={ProgramPage} />
    <Route path="/diversification"><HubPage kind="diversification" /></Route>
    <Route path="/dashboard" component={DashboardPage} />
    <Route path="/prices" component={PricesPage} />
    <Route path="/standards"><OperationPage kind="standards" /></Route>
    <Route path="/verification"><OperationPage kind="verification" /></Route>
    <Route path="/quality-check"><OperationPage kind="quality" /></Route>
    <Route path="/harvest-log"><OperationPage kind="harvestLog" /></Route>
    <Route path="/sales-submissions"><OperationPage kind="salesSubmissions" /></Route>
    <Route path="/farm-costs"><OperationPage kind="farmCosts" /></Route>
    <Route path="/payment-records"><OperationPage kind="paymentRecords" /></Route>
    <Route path="/farm-issues"><OperationPage kind="extensionIssues" /></Route>
    <Route path="/farm-calendar"><OperationPage kind="farmCalendar" /></Route>
    <Route path="/curation"><OperationPage kind="curation" /></Route>
    <Route path="/group-dashboard"><OperationPage kind="groupDashboard" /></Route>
    <Route path="/extension-dashboard"><OperationPage kind="extensionDashboard" /></Route>
    <Route path="/extension-visits"><OperationPage kind="extensionVisits" /></Route>
    <Route path="/extension-training"><OperationPage kind="extensionTraining" /></Route>
    <Route path="/extension-reports"><OperationPage kind="extensionReports" /></Route>
    <Route path="/extension-map"><OperationPage kind="extensionDashboard" /></Route>
    <Route path="/extension-farmers"><OperationPage kind="extensionFarmers" /></Route>
    <Route path="/extension-issues"><OperationPage kind="extensionIssues" /></Route>
    <Route path="/reports"><OperationPage kind="reports" /></Route>
    <Route path="/documents"><OperationPage kind="documents" /></Route>
    <Route path="/complaints" component={ComplaintsPage} />
    <Route path="/support" component={SupportPage} />
    <Route path="/coffee-game" component={CoffeeGamePage} />
    <Route><SimpleHubPage title="Halaman belum ditemukan" copy="Coba kembali ke beranda Garut Beans." icon={Home} /></Route>
  </Switch>;
}

function LoginRedirect({ route, onRedirect }: { route: string; onRedirect: () => void }) {
  useEffect(() => {
    onRedirect();
  }, [onRedirect]);
  return <LoginPage returnTo={route} />;
}

function DesktopTopNav() {
  const [location, setLocation] = useLocation();
  const active = location === '/'
    ? 'home'
    : location.startsWith('/catalog') || location.startsWith('/product') || location.startsWith('/favorites')
      ? 'explore'
      : location.startsWith('/traceability')
        ? 'trace'
        : location.startsWith('/orders') || location.startsWith('/cart')
          ? 'orders'
          : location.startsWith('/profile')
            ? 'account'
            : '';
  const items: { id: string; label: string; path: string; icon: LucideIcon }[] = [
    { id: 'home', label: 'Beranda', path: '/', icon: Home },
    { id: 'explore', label: 'Jelajah', path: '/catalog', icon: Coffee },
    { id: 'trace', label: 'Jejak', path: '/traceability', icon: Barcode },
    { id: 'orders', label: 'Pesanan', path: '/orders', icon: ClipboardList },
    { id: 'account', label: 'Akun', path: '/profile', icon: Farmer },
  ];

  return (
    <nav className="desktop-top-nav" aria-label="Navigasi utama">
      <div className="desktop-top-nav-inner">
        <button className="desktop-top-brand" onClick={() => setLocation('/')} aria-label="Garut Beans, kembali ke beranda">
          <img src={asset('kopi-garut-logo.png')} alt="" />
          <span>
            <strong>Garut Beans</strong>
            <small>G-BEANS · SPECIALTY COFFEE</small>
          </span>
        </button>
        <div className="desktop-top-links">
          {items.map(({ id, label, path, icon }) => (
            <button
              key={id}
              className={`desktop-top-link ${active === id ? 'active' : ''}`}
              onClick={() => setLocation(path)}
              aria-current={active === id ? 'page' : undefined}
              data-testid={`desktop-nav-${id}`}
            >
              {createElement(icon, { size: 17, strokeWidth: 1.8 })}
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <WebAuthProvider>
      <StoreProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <DesktopTopNav />
          <AppRouter />
           <FloatingActions />
        </WouterRouter>
      </StoreProvider>
    </WebAuthProvider>
  );
}

export default App;