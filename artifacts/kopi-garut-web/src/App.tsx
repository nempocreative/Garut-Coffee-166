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

function Header({ home = false, title = 'Garut Beans' }: { home?: boolean; title?: string }) {
  const [, setLocation] = useLocation();
  const { cart } = useStore();
  return <header className={home ? 'header' : 'subpage-head'}>
     {home ? <div className="header-top">
       <div className="brand"><div className="logo-frame"><img src={asset('kopi-garut-logo.png')} alt="Logo Garut Beans" /></div><div className="brand-lines"><div className="brand-name"><span>Garut</span><strong>Beans</strong></div><div className="brand-meta">G-BEANS · SPECIALTY COFFEE</div></div></div>
      <div className="header-actions"><button className="icon-orb" onClick={() => setLocation('/notifications')} aria-label="Buka notifikasi" data-testid="button-notifications"><AppNavGlyph name="bell" size={24} /></button><button className="icon-orb" onClick={() => setLocation('/cart')} aria-label="Buka keranjang" data-testid="button-cart"><AppNavGlyph name="shopping-cart" size={24} />{cart.length > 0 && <span className="count-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}</button></div>
      </div> : <><button className="back-button" onClick={() => setLocation('/')} aria-label="Kembali" data-testid="button-back"><ArrowLeft size={18} /></button><h1 className="page-title">{title}</h1><div className="header-actions" style={{ marginLeft: 'auto' }}><button className="icon-orb" onClick={() => setLocation('/')} aria-label="Kembali ke beranda" data-testid="button-header-home"><img className="header-home-image" src={asset('home-coffee-house.png')} alt="" /></button><button className="icon-orb" onClick={() => setLocation('/cart')} aria-label="Buka keranjang" data-testid="button-header-cart"><AppNavGlyph name="shopping-cart" size={24} />{cart.length > 0 && <span className="count-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}</button></div></>}
    {home && <div className="header-copy"><div><div className="greeting">Mau <em>menikmati</em><br />kopi apa hari ini?</div><div className="date-line">{homeDate()}</div></div></div>}
  </header>;
}

function BottomNav() {
  const [location, setLocation] = useLocation();
  const active = location === '/' ? 'home' : location.startsWith('/catalog') || location.startsWith('/product') || location.startsWith('/favorites') ? 'explore' : location.startsWith('/traceability') ? 'trace' : location.startsWith('/orders') || location.startsWith('/cart') ? 'orders' : 'profile';
  const items: { id: string; label: string; icon: AppIconName; path: string }[] = [
    { id: 'home', label: 'Beranda', icon: 'home', path: '/' },
    { id: 'explore', label: 'Jelajah', icon: 'coffee', path: '/catalog' },
    { id: 'trace', label: 'Jejak', icon: 'scan', path: '/traceability' },
    { id: 'orders', label: 'Pesanan', icon: 'package', path: '/orders' },
    { id: 'profile', label: 'Akun', icon: 'farmer', path: '/profile' },
  ];
  return <nav className="bottom-nav" aria-label="Navigasi utama">{items.map(({ id, label, icon, path }) => <button key={id} className={`${active === id ? 'active' : ''} ${id === 'trace' ? 'center' : ''}`} onClick={() => setLocation(path)} data-testid={`nav-${id}`} aria-current={active === id ? 'page' : undefined}><span className="nav-icon"><AppIcon name={icon} size={24} /></span><span>{label}</span></button>)}</nav>;
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
    <div className="account-menu"><AccountMenuItem icon={ShieldCheck} title="Status verifikasi" description="Lihat kesiapan profil dan dokumen kebun" onClick={() => setLocation('/verification')} testId="farmer-verification" /><AccountMenuItem icon={FileText} title="Standar Garut Beans" description="Rujukan mutu untuk menjaga nilai lot" onClick={() => setLocation('/standards')} testId="farmer-standards" /><AccountMenuItem icon={Bell} title="Notifikasi program" description="Pelatihan, panen, dan kebutuhan dukungan" onClick={() => setLocation('/notifications')} testId="farmer-notifications" /><AccountMenuItem icon={ArrowLeft} title="Keluar dari akun" description="Kembali menjelajah sebagai tamu" onClick={signOut} destructive testId="profile-sign-out" /></div>
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

  return <div className="auth-screen">
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
  </div>;
}

function NotificationsPage() {
  return <Page><main className="subpage"><Header /><div className="subcopy">Kabar kecil dari ekosistem Garut Beans.</div><div className="info-card"><h3>Panen baru sudah tiba</h3><p>Papandayan Series dari Cisurupan baru saja masuk ke katalog. Rasa lemon Meyer dan gula merahnya sedang paling dicari.</p></div><div className="info-card"><h3>Selamat datang di Garut Beans</h3><p>Kenali kopi dari kebun, petani, dan wilayah yang membuat setiap cangkir punya cerita.</p></div></main></Page>;
}

const programOffers = [
  { id: 'beasiswa-anak-petani-kopi', category: 'Keluarga petani', title: 'Beasiswa anak petani kopi', description: 'Dukungan pendidikan untuk anak keluarga petani kopi agar bisa melanjutkan sekolah.', target: 'Keluarga petani kopi', support: 'Beasiswa 1 semester', deadline: '30 Nov 2026' },
  { id: 'klinik-kesehatan-petani', category: 'CSR petani kopi', title: 'Klinik kesehatan petani kopi', description: 'Layanan pemeriksaan dasar dan edukasi kesehatan untuk petani kopi serta keluarganya.', target: 'Petani kopi & keluarga', support: 'Hari layanan kesehatan', deadline: 'Pendaftaran dibuka' },
  { id: 'pohon-penaung-kebun', category: 'Lingkungan kebun', title: 'Pohon penaung kebun kopi', description: 'Penanaman pohon penaung dan tanaman pendamping untuk menjaga kelembapan serta mutu kebun kopi.', target: 'Petani kopi aktif', support: 'Bibit & pendampingan tanam', deadline: 'Musim hujan 2026' },
  { id: 'konservasi-mata-air-kebun', category: 'Lingkungan kebun', title: 'Konservasi mata air kebun', description: 'Menjaga sumber air di sekitar kebun kopi melalui aksi resapan dan perawatan bersama.', target: 'Kelompok tani kopi', support: 'Sarana konservasi', deadline: 'Seleksi desa' },
  { id: 'paket-panen-keluarga', category: 'Keluarga petani', title: 'Paket panen keluarga', description: 'Dukungan kebutuhan dasar bagi keluarga petani kopi selama masa panen dan perawatan kebun.', target: 'Keluarga petani kopi', support: 'Paket kebutuhan dasar', deadline: 'Pendaftaran dibuka' },
  { id: 'pemberdayaan-produk-turunan', category: 'Komunitas kopi', title: 'Pemberdayaan produk turunan kopi', description: 'Pendampingan desa untuk merancang, menguji, dan memasarkan produk baru berbasis kopi.', target: 'Desa & kelompok tani', support: 'Pendampingan 3 bulan', deadline: 'Pendaftaran dibuka' },
];

const regularPrograms = [
  { id: 'coffee-talk-garut', type: 'DIALOG & CERITA', title: 'Coffee Talk Garut', description: 'Obrolan santai bersama petani, roaster, barista, dan pelaku usaha kopi.', date: 'Sesi berikutnya · 10 Okt 2026', location: 'Garut', image: 'event-coffee-tasting.webp' },
  { id: 'sekolah-barista', type: 'KELAS KETERAMPILAN', title: 'Sekolah Barista Garut Beans', description: 'Belajar espresso, manual brew, pelayanan, dan cerita asal kopi untuk barista baru.', date: 'Batch 01 · 24 Okt 2026', location: 'Garut', image: 'event-coffee-workshop.webp' },
  { id: 'cupping-kenal-asal', type: 'MUTU & RASA', title: 'Cupping & Kenal Asal', description: 'Membaca rasa, membandingkan proses, dan mengenal orang di balik setiap lot.', date: 'Papandayan · 14 Nov 2026', location: 'Papandayan', image: 'event-cupping-papandayan.webp' },
  { id: 'kelas-pascapanen', type: 'UNTUK PETANI', title: 'Kelas Pascapanen', description: 'Praktik sortasi, pengeringan, dan pencatatan mutu untuk menjaga nilai jual kopi.', date: 'Cikajang · 17 Okt 2026', location: 'Cikajang', image: 'event-postharvest-class.webp' },
];

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

function HubPage({ kind }: { kind: string }) {
  const [, setLocation] = useLocation();
  const { notify } = useStore();
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useWebStorageJson<string[]>(`kopi-garut-${kind}-saved`, []);
  const cfg: Record<string, { title: string; eyebrow: string; copy: string; image: string }> = {
    collective: { eyebrow: 'TUMBUH BERSAMA', title: 'Ekosistem yang merawat rasa.', copy: 'Satu ruang untuk produksi, pascapanen, bisnis, edukasi, dan cerita Garut Beans.', image: 'kopi-garut-banyak-orang-banner.webp' },
    farmers: { eyebrow: 'ORANG DI BALIK RASA', title: 'Kenali petani Garut.', copy: 'Profil keluarga tani, kelompok, dan kebun yang menjaga kualitas dari musim ke musim.', image: 'farmer-asep-rahmat.webp' },
    regions: { eyebrow: 'WILAYAH KOPI', title: 'Dari lereng ke cangkir.', copy: 'Setiap ketinggian punya karakter rasa, proses, dan cerita yang berbeda.', image: 'regions-banner.webp' },
    tourism: { eyebrow: 'PENGALAMAN KOPI', title: 'Seduh sambil menjelajah.', copy: 'Datang ke kebun, belajar prosesnya, lalu nikmati seduhan dari asalnya.', image: 'kopi-garut-seduh-sambil-menjelajah-banner.webp' },
    events: { eyebrow: 'AGENDA KOPI', title: 'Temu, belajar, dan mencicipi.', copy: 'Kalender pertemuan petani, roastery, barista, dan pecinta Garut Beans.', image: 'event-coffee-festival.webp' },
    partnership: { eyebrow: 'JADI MITRA', title: 'Bangun rantai kopi bersama.', copy: 'Temukan cara berkolaborasi dengan kedai, hotel, UMKM, dan pelaku usaha.', image: 'kopi-garut-bangun-rantai-kopi-banner.webp' },
    diversification: { eyebrow: 'LEBIH DARI SECANGKIR', title: 'Dari kopi, lahir lebih banyak karya.', copy: 'Produk olahan, aroma, perawatan, dan merchandise dari ekosistem Garut.', image: 'coffee-essential-oil.webp' },
  };
  const content = cfg[kind];
  const filteredFarmers = farmers.filter((farmer) => `${farmer.name} ${farmer.group} ${farmer.location}`.toLowerCase().includes(query.toLowerCase()));
  const filteredRegions = regions.filter((region) => `${region.name} ${region.village} ${region.specialty}`.toLowerCase().includes(query.toLowerCase()));
  const filteredProducts = diversifiedProducts.filter((product) => `${product.title} ${product.category}`.toLowerCase().includes(query.toLowerCase()));
  if (kind === 'events') return <Page><main className="subpage"><Header /><HeroPanel {...content} /><div className="filter-pills"><span className="filter-pill active">Semua agenda</span><span className="filter-pill">Pelatihan</span><span className="filter-pill">Festival</span><span className="filter-pill">Kemitraan</span></div><div className="hub-list">{sharedHomeContent.stories.map((event) => <article className="event-card" key={event.id}><img src={asset(event.image)} alt={event.title} /><div className="event-copy"><span className="section-kicker">{event.type}</span><h3>{event.title}</h3><p>{event.description}</p><div className="event-meta"><span><CalendarDays size={13} />{event.date}</span><span><MapPin size={13} />{event.location}</span></div><button className="secondary-button" onClick={() => { setSaved((items) => items.includes(event.id) ? items : [...items, event.id]); notify(saved.includes(event.id) ? 'Agenda sudah tersimpan' : 'Agenda disimpan di perangkat'); }} data-testid={`button-save-event-${event.id}`}>{saved.includes(event.id) ? 'Tersimpan' : 'Simpan agenda'}</button></div></article>)}</div></main></Page>;
  if (kind === 'farmers') return <Page><main className="subpage"><Header /><HeroPanel {...content} /><SearchEntry catalog value={query} onChange={setQuery} /><MetricStrip metrics={[{ label: 'Petani terdaftar', value: '125', icon: 'users' }, { label: 'Kelompok tani', value: '18', icon: 'coffee' }, { label: 'Produksi tahunan', value: '312 ton', icon: 'chart' }]} /><div className="section-heading"><h2>Petani pilihan</h2><span className="section-kicker">4 profil</span></div><div className="farmer-grid">{filteredFarmers.map((farmer) => <article className="farmer-card" key={farmer.id}><img src={asset(farmer.image)} alt={farmer.name} /><div className="farmer-copy"><span className="section-kicker">{farmer.location}</span><h3>{farmer.name}</h3><p>{farmer.group}</p><div className="farmer-stats"><span>{farmer.landArea}</span><span>{farmer.coffeeType}</span></div><button className="secondary-button" onClick={() => setLocation(`/farmer/${farmer.id}`)} data-testid={`button-farmer-${farmer.id}`}>Lihat cerita <ArrowRight size={13} /></button></div></article>)}</div></main></Page>;
  if (kind === 'regions') return <Page><main className="subpage"><Header /><HeroPanel {...content} /><SearchEntry catalog value={query} onChange={setQuery} /><MetricStrip metrics={hubStats.map((item) => ({ label: item.label, value: item.value, icon: 'map' }))} /><div className="region-list">{filteredRegions.map((region) => <article className="region-card" key={region.id}><img src={asset(region.image)} alt={region.name} /><div className="region-copy"><span className="section-kicker">{region.village} · {region.elevation}</span><h3>{region.name}</h3><p>{region.specialty}</p><div className="region-foot"><span>{region.farmerCount} petani aktif</span><button className="text-button" onClick={() => setLocation(`/region/${region.id}`)} data-testid={`button-region-${region.id}`}>Buka wilayah <ArrowRight size={13} /></button></div></div></article>)}</div></main></Page>;
  if (kind === 'tourism') return <Page><main className="subpage"><Header /><HeroPanel {...content} /><div className="tour-grid">{coffeeTours.map((tour) => <article className="tour-card" key={tour.id}><img src={asset(tour.image)} alt={tour.title} /><div className="tour-copy"><span className="section-kicker">{tour.type} · {tour.duration}</span><h3>{tour.title}</h3><p>{tour.description}</p><div className="tour-foot"><strong>{formatPrice(tour.price)}</strong><button className="primary-button compact" onClick={() => { setSaved((items) => items.includes(tour.id) ? items : [...items, tour.id]); notify('Permintaan kunjungan dicatat di perangkat'); }} data-testid={`button-book-tour-${tour.id}`}>{saved.includes(tour.id) ? 'Tersimpan' : 'Ajukan kunjungan'}</button></div></div></article>)}</div></main></Page>;
  if (kind === 'diversification') return <Page><main className="subpage"><Header /><HeroPanel {...content} /><div className="filter-pills"><span className="filter-pill active">Semua</span><span className="filter-pill">Olahan kopi</span><span className="filter-pill">Aroma & perawatan</span><span className="filter-pill">Merchandise</span></div><SearchEntry catalog value={query} onChange={setQuery} /><div className="product-grid diversified-grid">{filteredProducts.map((product) => <article className="diversified-card" key={product.id}><div className="diversified-image"><img src={asset(product.image)} alt={product.title} /><span>{product.badge}</span></div><div className="diversified-body"><small>{product.category}</small><strong>{product.title}</strong><p>{product.status}</p><div><b>{product.price}</b><button className="text-button" onClick={() => { setSaved((items) => items.includes(product.id) ? items : [...items, product.id]); notify('Produk turunan disimpan untuk ditinjau'); }} data-testid={`button-save-product-${product.id}`}>{saved.includes(product.id) ? 'Tersimpan' : 'Simpan'} <ArrowRight size={13} /></button></div></div></article>)}</div></main></Page>;
  if (kind === 'partnership') return <PartnershipPage content={content} />;
  return <Page><main className="subpage"><Header /><HeroPanel {...content} /><MetricStrip metrics={hubStats.map((item) => ({ label: item.label, value: item.value, icon: item.label.includes('Petani') ? 'users' : item.label.includes('Wilayah') ? 'map' : 'chart' }))} /><div className="section-heading"><div><span className="section-kicker">PINTU EKOSISTEM</span><h2>Ruang yang saling terhubung.</h2></div></div><div className="module-grid">{[['coffee', 'Produksi & budidaya', 'Data kebun, luas lahan, produksi per musim, dan jadwal panen.'], ['package', 'Pascapanen', 'Catatan rumah produksi, stok, dan standar kualitas per lot.'], ['briefcase', 'Marketplace B2B', 'Temu hasil panen dengan cafe dan roastery yang mencari Garut Beans.'], ['shield', 'Sertifikasi & legalitas', 'Profil kesiapan usaha dan dokumen untuk memperluas akses pasar.'], ['calendar', 'Akademi Garut Beans', 'Materi budidaya, pascapanen, brewing, dan kewirausahaan kopi.'], ['compass', 'Wisata kopi', 'Pengalaman langsung dari kebun, proses, budaya, dan orang-orangnya.']].map(([icon, title, detail], index) => <ActionRow key={title} icon={icon} title={title} detail={detail} action="Jelajahi" onAction={() => { if (index === 5) setLocation('/tourism'); else if (index === 2) setLocation('/partnership'); else if (index === 4) setLocation('/program'); else notify(`${title} akan dibuka dari ruang kerja terkait`); }} />)}</div><div className="dark-callout"><span className="section-kicker">ROADMAP 2026</span><h2>Dari data kebun menuju keputusan yang lebih adil.</h2><p>Lot kopi, pre-order panen, kontrak kemitraan, pusat logistik, hingga QR Code Garut Beans dirancang dalam satu perjalanan.</p><button className="secondary-button" onClick={() => setLocation('/traceability')} data-testid="button-collective-trace">Lihat jejak kopi <ArrowRight size={14} /></button></div></main></Page>;
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
    ['Saya petani', 'Kelola profil kebun dan cerita panen.', '/farmers', 'users'],
    ['Saya pembeli', 'Temukan kopi dan kenali asalnya.', '/catalog', 'coffee'],
    ['Saya punya usaha', 'Jadi mitra dan bawa kopi ke pelanggan.', '/partnership', 'briefcase'],
    ['Saya ingin berkunjung', 'Rasakan kopi langsung dari Garut.', '/tourism', 'compass'],
  ] as const;
  return <Page><main className="subpage collective-page"><Header title="Ekosistem G-Beans" /><div className="collective-hero"><img src={asset('hero-coffee.webp')} alt="" /><div className="collective-hero-shade" /><div className="collective-hero-copy"><div className="collective-hero-top"><div className="collective-hero-icon"><Network size={24} /></div><span>01—04</span></div><small>RANTAI G-BEANS</small><h1>Satu alur,<br />banyak peran.</h1><b>KEBUN · MUTU · PASAR · CANGKIR</b></div></div><div className="collective-intro"><span className="section-kicker">BAGAIMANA KOPI BERJALAN</span><h2>Garut Beans bukan hanya katalog.</h2><p>Ini adalah ruang yang menghubungkan petani, pembeli, pelaku usaha, dan pengunjung dalam satu perjalanan kopi.</p></div><div className="collective-roles"><h3>Kamu datang sebagai siapa?</h3>{roleItems.map(([title, text, route, icon], index) => <button key={title} onClick={() => setLocation(route)}><span className={`collective-role-icon role-tone-${index % 2}`}>{createElement(iconFor(icon), { size: 17 })}</span><span><strong>{title}</strong><small>{text}</small></span><ArrowRight size={14} /></button>)}</div><div className="collective-stages">{ecosystemStages.map((stage, index) => <div className="collective-stage" key={stage.number}><div className="collective-stage-head"><b className={index === 0 ? 'current' : ''}>{stage.number}</b><span><small>{stage.label}</small><strong>{stage.title}</strong></span><i>{createElement(iconFor(stage.icon), { size: 18 })}</i></div>{stage.links.map(([label, route]) => <button key={label} onClick={() => setLocation(route)}><em />{label}<ArrowRight size={15} /></button>)}</div>)}</div><div className="collective-closing"><div><Heart size={19} /></div><span><strong>Sekarang pilih langkahmu.</strong><small>Mulai dari kebun, kopi, usaha, atau pengalaman.</small></span></div></main></Page>;
}

function PartnershipPage({ content }: { content: { image: string; eyebrow: string; title: string; copy: string } }) {
  const { notify } = useStore();
  const [form, setForm] = useState({ name: '', type: 'Cafe / Roastery', need: '' });
  const [sent, setSent] = useWebStorageJson<boolean>('kopi-garut-partnership-sent', false);
  return <Page><main className="subpage"><Header /><HeroPanel {...content} /><div className="partner-points"><ActionRow icon="coffee" title="Pasokan terkurasi" detail="Profil lot, asal, proses, dan standar mutu lebih mudah dibaca." /><ActionRow icon="users" title="Pendampingan ekosistem" detail="Temu petani, kelompok tani, penyuluh, dan pelaku usaha." /><ActionRow icon="briefcase" title="Kolaborasi yang jelas" detail="Mulai dari kebutuhan, volume, sampai bentuk kerja sama." /></div><div className="form-card"><span className="section-kicker">MULAI PERCAKAPAN</span><h2>Jadi bagian dari rantai ini.</h2><p className="form-hint">Ceritakan kebutuhan usaha atau bentuk kolaborasi yang sedang kamu cari.</p><label>Nama usaha<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Contoh: Ruang Seduh Roastery" data-testid="input-partner-name" /></label><label>Jenis mitra<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} data-testid="select-partner-type"><option>Cafe / Roastery</option><option>Hotel / Restoran</option><option>UMKM produk turunan</option><option>Program CSR</option></select></label><label>Kebutuhan atau ide kolaborasi<textarea value={form.need} onChange={(event) => setForm({ ...form, need: event.target.value })} placeholder="Contoh: kebutuhan 300 kg Arabika Grade 1 proses honey" data-testid="input-partner-need" /></label><button className="primary-button wide" onClick={() => { if (!form.name.trim() || !form.need.trim()) { notify('Lengkapi nama usaha dan kebutuhan terlebih dahulu'); return; } setSent(true); notify('Profil mitra tersimpan di perangkat'); }} data-testid="button-submit-partnership">{sent ? 'Tersimpan di perangkat' : 'Kirim kebutuhan mitra'} <Send size={15} /></button></div></main></Page>;
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
  const [, setLocation] = useLocation();
  const region = regions.find((item) => item.id === id) ?? regions[0];
  const regionalFarmers = farmers.filter((item) => item.location.toLowerCase().includes(region.village.toLowerCase()));
  return <Page><main className="subpage"><Header /><HeroPanel image={region.image} eyebrow={`${region.village} · ${region.elevation}`} title={`Karakter ${region.name}.`} copy={`${region.specialty}. ${region.farmerCount} petani aktif menjaga lanskap kopi di wilayah ini.`} /><MetricStrip metrics={[{ label: 'Petani aktif', value: String(region.farmerCount), icon: 'users' }, { label: 'Ketinggian', value: region.elevation, icon: 'map' }, { label: 'Karakter', value: region.specialty, icon: 'coffee' }]} /><div className="section-heading"><h2>Orang di wilayah ini</h2></div>{regionalFarmers.length ? regionalFarmers.map((farmer) => <ActionRow key={farmer.id} icon="users" title={farmer.name} detail={`${farmer.group} · ${farmer.coffeeType}`} action="Profil" onAction={() => setLocation(`/farmer/${farmer.id}`)} />) : <div className="info-card"><p>Profil petani wilayah sedang dikurasi. Data wilayah tetap dapat dibaca melalui katalog.</p></div>}<div className="dark-callout"><span className="section-kicker">RASA WILAYAH</span><h2>{region.specialty}</h2><p>Kenali asalnya sebelum memilih cangkir. Setiap lot membawa ketinggian, tanah, dan cara kerja kelompok tani.</p><button className="secondary-button" onClick={() => setLocation('/catalog')} data-testid="button-region-catalog">Lihat katalog kopi <ArrowRight size={14} /></button></div></main></Page>;
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
  { title: 'Pusat dokumen', route: '/documents', icon: 'file' },
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
    ? [{ title: 'Petani', detail: 'Verifikasi kebun, mutu lot, dan akses pasar.', route: '/verification', icon: 'coffee' }]
    : session?.id === 'penyuluh'
      ? [{ title: 'Penyuluh', detail: 'Catat kunjungan dan tindak lanjut kebun.', route: '/extension-dashboard', icon: 'mapPin' }]
      : [];
  return <Page><main className="subpage"><Header title="Program Garut Beans" /><HeroPanel image="program-menu-ai.webp" eyebrow="PROGRAM G-BEANS" title="Belajar, berbagi, tumbuh bersama." copy="Ruang untuk pelatihan, dukungan, dan program yang menjaga masa depan Garut Beans." /><MetricStrip metrics={[{ label: 'Program rutin', value: '04', icon: 'calendar' }, { label: 'Agenda kopi', value: '08', icon: 'coffee' }, { label: 'Ekosistem', value: '01', icon: 'users' }]} /><SectionTitle kicker="PROGRAM KAMI" title="Kegiatan rutin untuk yang mencintai kopi." /><p className="program-intro">Bukan hanya menjual kopi. Kami membuat ruang untuk belajar, bertemu, dan membangun masa depan Garut Beans bersama-sama.</p><div className="program-rail">{regularPrograms.map((item) => <article className="program-card" key={item.id}><img src={asset(item.image)} alt={item.title} /><div className="program-card-body"><span className="section-kicker">{item.type}</span><h3>{item.title}</h3><p>{item.description}</p><div className="event-meta"><span><CalendarDays size={13} />{item.date}</span><span><MapPin size={13} />{item.location}</span></div><button className="secondary-button" onClick={() => setLocation('/events')}>Lihat jadwal <ArrowRight size={13} /></button></div></article>)}</div><SectionTitle kicker="PEMBERDAYAAN DESA" title="Dari kopi, lahir lebih banyak karya." /><div className="dark-callout"><span className="section-kicker">PROGRAM DESA</span><h2>Produk turunan kopi</h2><p>Mengubah potensi kopi dan hasil sampingnya menjadi produk bernilai tambah yang bisa dibuat, dikelola, dan dipasarkan bersama oleh warga desa.</p><div className="mini-grid">{['Essential oil kopi', 'Pewangi sepatu', 'Merchandise desa', 'Oleh-oleh aroma'].map((item) => <div className="mini-card" key={item}><Package size={16} /><strong>{item}</strong></div>)}</div><button className="secondary-button" onClick={() => setLocation('/diversification')}>Lihat produk turunan <ArrowRight size={13} /></button></div><SectionTitle kicker="CSR G-BEANS" title="Kontribusi untuk petani & kebun kopi" /><p className="program-intro">Dukungan CSR yang kembali ke ekosistem kopi: memperkuat keluarga petani, menjaga kebun, dan merawat lingkungan tempat Garut Beans tumbuh.</p><div className="filter-pills">{programCategories.map((item) => <button key={item} className={`filter-pill ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="offer-list">{visibleOffers.map((offer) => { const applied = applications.includes(offer.id); return <article className="offer-card" key={offer.id}><div className="offer-head"><div className="row-icon"><Sparkles size={17} /></div><div><span className="section-kicker">{offer.category}</span><h3>{offer.title}</h3></div><span className="status-chip">Dibuka</span></div><p>{offer.description}</p><div className="offer-meta"><span><small>UNTUK</small><b>{offer.target}</b></span><span><small>DUKUNGAN</small><b>{offer.support}</b></span><span><small>BATAS</small><b>{offer.deadline}</b></span></div><button className={`primary-button wide ${applied ? 'is-secondary' : ''}`} onClick={() => { if (!session) { setLocation('/login?returnTo=/program'); return; } if (!applied) { setApplications((items) => [...items, offer.id]); notify(`Pengajuan ${offer.title} sudah dikirim.`); } }}><Check size={15} />{applied ? 'Sudah diajukan' : session ? 'Ajukan program' : 'Masuk untuk mengajukan'}</button></article>; })}</div><SectionTitle kicker="MULAI DARI PERANMU" title="Pilih ruang kerja" />{session && roleCards.length ? <div className="role-work-grid">{roleCards.map((role) => <button className="role-work-card" key={role.route} onClick={() => setLocation(role.route)}><div className="row-icon"><Coffee size={18} /></div><span><small>RUANG KERJA</small><strong>{role.title}</strong><em>{role.detail}</em></span><ArrowRight size={16} /></button>)}</div> : <div className="access-card"><div className="row-icon"><ShieldCheck size={18} /></div><div><h3>Buka akses program</h3><p>Masuk untuk melihat ruang kerja yang sesuai dengan peranmu.</p></div><button className="secondary-button" onClick={() => setLocation('/login?returnTo=/program')}>Masuk</button></div>}<SectionTitle kicker="SEMUA LAYANAN" title="Jelajahi program" /><div className="service-grid">{programServices.filter((item) => canAccessRoute(item.route, session?.id)).map((item) => <button className="service-card" key={item.route} onClick={() => setLocation(item.route)}><div className="row-icon">{createElement(iconFor(item.icon), { size: 17 })}</div><strong>{item.title}</strong><ArrowRight size={15} /></button>)}</div></main></Page>;
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
  documents: { eyebrow: 'PUSAT DOKUMEN', title: 'Panduan yang siap dibawa ke kebun.', copy: 'Simpan SOP, modul, regulasi, dan formulir program di satu tempat.', image: 'documents-menu-ai.webp', rows: [['Panduan budidaya Arabika Garut', 'PDF · 24 halaman · naungan, pemupukan, pemangkasan', 'Budidaya', 'coffee'], ['SOP panen dan pascapanen', 'PDF · 18 halaman · sortasi, fermentasi, pengeringan', 'Pascapanen', 'package'], ['Modul pelatihan cupping dasar', 'Modul · 12 halaman · aroma, rasa, body, acidity', 'Pelatihan', 'check'], ['Regulasi label dan ketertelusuran', 'Panduan · 9 halaman · kode lot dan kemasan', 'Regulasi', 'shield']] },
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

function ComplaintsPage() {
  const [, setLocation] = useLocation();
  const { session } = useAuth();
  const { notify } = useStore();
  const [category, setCategory] = useState('Petani belum terdata');
  const [location, setFieldLocation] = useState('');
  const [description, setDescription] = useState('');
  const [sent, setSent] = useWebStorageJson<boolean>('kopi-garut-complaint-sent', false);
  return <Page><main className="subpage"><Header /><HeroPanel image="complaints-menu-ai.webp" eyebrow="USULAN & DUKUNGAN" title="Sampaikan kebutuhan dari lapangan." copy="Bantu tim Garut Beans mengetahui petani, lahan, atau kebutuhan dukungan yang belum terhubung." /><div className="form-card"><span className="section-kicker">FORMULIR DUKUNGAN</span><h2>Apa yang perlu kami tahu?</h2><label>Kategori<select value={category} onChange={(event) => setCategory(event.target.value)}><option>Petani belum terdata</option><option>Bantuan bibit</option><option>Lahan siap dikembangkan</option><option>Pendampingan</option><option>Lainnya</option></select></label><label>Lokasi<input value={location} onChange={(event) => setFieldLocation(event.target.value)} placeholder="Contoh: Desa Mekarsari, Cikajang" /></label><label>Ceritakan kebutuhannya<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Tulis detail petani, kebun, atau dukungan yang dibutuhkan" /></label><button className="primary-button wide" onClick={() => { if (!session) { setLocation('/login?returnTo=/complaints'); return; } if (!location.trim() || !description.trim()) { notify('Lengkapi lokasi dan cerita dukungan terlebih dahulu'); return; } setSent(true); notify('Usulan sudah diterima dan disimpan di perangkat'); }}>{sent ? 'Usulan diterima' : 'Kirim usulan'} <Send size={15} /></button></div><div className="info-card"><span className="section-kicker">STATUS</span><h3>{sent ? 'Usulan sedang ditinjau' : 'Belum ada usulan tersimpan'}</h3><p>{sent ? `${category} · ${location}` : 'Setelah dikirim, usulan akan muncul di sini untuk kamu pantau.'}</p></div></main></Page>;
}

function PricesPage() {
  const [, setLocation] = useLocation();
  const prices = [['Cherry kopi', 'Rp 8.500', 'per kg', '+4,2% bulan ini'], ['Gabah kopi', 'Rp 22.000', 'per kg', '+2,1% bulan ini'], ['Green bean', 'Rp 68.000', 'per kg', 'Harga rata-rata'], ['Roasted bean', 'Rp 125.000', 'per 200 g', 'Harga rata-rata']];
  return <Page><main className="subpage"><Header /><HeroPanel image="price-menu-ai.webp" eyebrow="HARGA ACUAN" title="Baca harga, rencanakan langkah." copy="Harga referensi membantu petani, kelompok, dan pembeli berbicara dengan dasar yang sama." /><div className="price-list">{prices.map(([label, price, unit, change]) => <article className="price-card" key={label}><div><span className="section-kicker">{label}</span><h2>{price}</h2><p>{unit} · {change}</p></div><TrendingUp size={20} /></article>)}</div><div className="dark-callout"><span className="section-kicker">LIHAT PRODUK</span><h2>Bandingkan dengan lot yang tersedia.</h2><button className="secondary-button" onClick={() => setLocation('/catalog')}>Buka katalog <ArrowRight size={14} /></button></div></main></Page>;
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
    <Route path="/support"><OperationPage kind="documents" /></Route>
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
    { id: 'trace', label: 'Jejak', path: '/traceability', icon: Scan },
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
        </WouterRouter>
      </StoreProvider>
    </WebAuthProvider>
  );
}

export default App;