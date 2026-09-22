import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ArrowLeft, ArrowRight, Bell, BriefcaseBusiness, CalendarDays, ChevronRight,
  CircleUserRound, Coffee, Compass, Heart, Home, Map, MapPin, Minus, Package, Plus,
  ScanLine, Search, Settings, ShieldCheck, ShoppingBag, SlidersHorizontal, Sparkles,
  Trash2, Users, BarChart3, Check, CheckCircle2, ClipboardList, Clock3, FileText,
  Factory, Leaf, LocateFixed, MessageSquare, Send, TrendingUp, Wallet, Wheat, X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Route, Router as WouterRouter, Switch, useLocation, useParams } from 'wouter';
import {
  authSessionStorageKey,
  canAccessRoute,
  coffeeCatalog,
  getRoleProfile,
  homeContent,
  roleProfiles,
  farmers,
  regions,
  coffeeTours,
  diversifiedProducts,
  hubStats,
  homeContent as sharedHomeContent,
  type AuthRole,
  type HomeIconName,
  type RoleProfile,
  type SharedCoffee,
} from '@workspace/kopi-garut-shared';

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`;

type Coffee = Omit<SharedCoffee, 'image' | 'tastingNotes'> & { notes: string[]; image: string };

const coffees: Coffee[] = coffeeCatalog.map(({ tastingNotes, image, ...coffee }) => ({
  ...coffee,
  notes: tastingNotes,
  image: asset(image),
}));

const promos = homeContent.promoSlides.map((promo) => ({
  ...promo,
  image: asset(promo.image),
}));

const categoryIcons: Record<HomeIconName, LucideIcon> = {
  coffee: Coffee,
  users: Users,
  map: Map,
  compass: Compass,
  calendar: CalendarDays,
  briefcase: BriefcaseBusiness,
  grid: Package,
  shield: ShieldCheck,
  'alert-circle': Bell,
  package: Package,
};

const categories = homeContent.categories.map((category) => ({
  ...category,
  icon: categoryIcons[category.icon],
}));

const stories = homeContent.stories.map((story) => [asset(story.image), story.title] as const);

const formatPrice = (value: number) => `Rp ${value.toLocaleString('id-ID')}`;
const weekdays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const homeDate = () => { const d = new Date(); return `${weekdays[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`; };

type CartItem = { id: string; quantity: number };
type Order = { id: string; items: CartItem[]; total: number; createdAt: string; status: string };
type StoreValue = {
  cart: CartItem[]; favorites: string[]; orders: Order[];
  addToCart: (id: string, quantity?: number) => void; updateQuantity: (id: string, quantity: number) => void;
  toggleFavorite: (id: string) => void; placeOrder: () => void; notify: (message: string) => void;
};
const StoreContext = createContext<StoreValue | null>(null);
const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('StoreProvider is missing');
  return context;
};

function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => JSON.parse(localStorage.getItem('kopi-garut-cart') || '[]'));
  const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('kopi-garut-favorites') || '[]'));
  const [orders, setOrders] = useState<Order[]>(() => JSON.parse(localStorage.getItem('kopi-garut-orders') || '[]'));
  const [notice, setNotice] = useState('');
  useEffect(() => localStorage.setItem('kopi-garut-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('kopi-garut-favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('kopi-garut-orders', JSON.stringify(orders)), [orders]);
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(''), 2200); return () => window.clearTimeout(timer); }, [notice]);
  const notify = (message: string) => setNotice(message);
  const addToCart = (id: string, quantity = 1) => {
    setCart((current) => {
      const found = current.find((item) => item.id === id);
      return found ? current.map((item) => item.id === id ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { id, quantity }];
    });
    notify('Kopi ditambahkan ke keranjang');
  };
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
  return <StoreContext.Provider value={{ cart, favorites, orders, addToCart, updateQuantity, toggleFavorite, placeOrder, notify }}>{children}{notice && <div className="toast" role="status" data-testid="status-toast">{notice}</div>}</StoreContext.Provider>;
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

function Header({ home = false, title = 'Kopi Garut' }: { home?: boolean; title?: string }) {
  const [, setLocation] = useLocation();
  const { cart } = useStore();
  return <header className={home ? 'header' : 'subpage-head'}>
     {home ? <div className="header-top">
       <div className="brand"><div className="logo-frame"><img src={asset('kopi-garut-logo.png')} alt="Logo Kopi Garut" /></div><div className="brand-lines"><div className="brand-name"><span>Kopi</span><strong>Garut</strong></div><div className="brand-meta">KOPI SPESIALTI · GARUT</div></div></div>
      <div className="header-actions"><button className="icon-orb" onClick={() => setLocation('/notifications')} aria-label="Buka notifikasi" data-testid="button-notifications"><Bell size={19} /></button><button className="icon-orb" onClick={() => setLocation('/cart')} aria-label="Buka keranjang" data-testid="button-cart"><ShoppingBag size={19} />{cart.length > 0 && <span className="count-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}</button></div>
     </div> : <><button className="back-button" onClick={() => setLocation('/')} aria-label="Kembali" data-testid="button-back"><ArrowLeft size={18} /></button><h1 className="page-title">{title}</h1><div className="header-actions" style={{ marginLeft: 'auto' }}><button className="icon-orb" onClick={() => setLocation('/')} aria-label="Kembali ke beranda" data-testid="button-header-home"><Home size={18} /></button><button className="icon-orb" onClick={() => setLocation('/cart')} aria-label="Buka keranjang" data-testid="button-header-cart"><ShoppingBag size={18} />{cart.length > 0 && <span className="count-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}</button></div></>}
    {home && <div className="header-copy"><div><div className="greeting">Mau <em>menikmati</em><br />kopi apa hari ini?</div><div className="date-line">{homeDate()}</div></div></div>}
  </header>;
}

function BottomNav() {
  const [location, setLocation] = useLocation();
  const active = location === '/' ? 'home' : location.startsWith('/catalog') || location.startsWith('/product') || location.startsWith('/favorites') ? 'explore' : location.startsWith('/traceability') ? 'trace' : location.startsWith('/orders') || location.startsWith('/cart') ? 'orders' : 'profile';
  const items: { id: string; label: string; icon: LucideIcon; path: string }[] = [
    { id: 'home', label: 'Beranda', icon: Home, path: '/' },
    { id: 'explore', label: 'Jelajah', icon: Sparkles, path: '/catalog' },
    { id: 'trace', label: 'Jejak', icon: ScanLine, path: '/traceability' },
    { id: 'orders', label: 'Pesanan', icon: Package, path: '/orders' },
    { id: 'profile', label: 'Akun', icon: CircleUserRound, path: '/profile' },
  ];
  return <nav className="bottom-nav" aria-label="Navigasi utama">{items.map(({ id, label, icon: Icon, path }) => <button key={id} className={`${active === id ? 'active' : ''} ${id === 'trace' ? 'center' : ''}`} onClick={() => setLocation(path)} data-testid={`nav-${id}`}><span className="nav-icon"><Icon size={id === 'trace' ? 22 : 20} /></span><span>{label}</span></button>)}</nav>;
}

function FloatingBadges() {
  return <div className="floating-badges"><button className="floating-badge" aria-label="Buka mini games" data-testid="button-games"><img src={asset('mini-games-icon.webp')} alt="Mini games" /></button><button className="floating-badge" aria-label="Buka bantuan chat" data-testid="button-chat"><img src={asset('faq-live-chat.webp')} alt="Bantuan" /></button></div>;
}

function SearchEntry({ catalog = false, value: controlledValue, onChange }: { catalog?: boolean; value?: string; onChange?: (value: string) => void }) {
  const [, setLocation] = useLocation();
  const [localValue, setLocalValue] = useState('');
  const value = controlledValue ?? localValue;
  const handleChange = (nextValue: string) => { onChange ? onChange(nextValue) : setLocalValue(nextValue); };
  return <div className={`search-entry ${catalog ? 'catalog-search' : ''}`}><img className="search-bean" src={asset('coffee-bean-menu.webp')} alt="" /><input value={value} onChange={(event) => handleChange(event.target.value)} onFocus={() => !catalog && setLocation('/catalog')} placeholder={catalog ? 'Cari nama, asal, atau rasa' : 'Cari kopi, petani, atau wilayah'} aria-label="Cari kopi" data-testid={catalog ? 'input-catalog-search' : 'input-home-search'} /><div className="filter-orb"><SlidersHorizontal size={15} /></div></div>;
}

function PromoCarousel() {
  const [, setLocation] = useLocation();
  const [index, setIndex] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setIndex((value) => (value + 1) % promos.length), 4200); return () => window.clearInterval(timer); }, []);
  const promo = promos[index];
  return <div className="hero" data-testid="promo-carousel"><img src={promo.image} alt={promo.title} /><div className="hero-copy"><div className="eyebrow">{promo.eyebrow}</div><div className="hero-title">{promo.title}</div><div className="hero-desc">{promo.description}</div><button className="hero-link" onClick={() => setLocation(promo.route)} data-testid="button-promo">{promo.cta}<ArrowRight size={14} /></button></div><div className="hero-dots">{promos.map((item, itemIndex) => <button key={item.title} className={`hero-dot ${itemIndex === index ? 'active' : ''}`} onClick={() => setIndex(itemIndex)} aria-label={`Promo ${itemIndex + 1}`} data-testid={`promo-dot-${itemIndex}`} />)}</div></div>;
}

function CategoryTiles() {
  const [, setLocation] = useLocation();
  const [page, setPage] = useState(0);
  const pageItems = categories.slice(page * 8, page * 8 + 8);
  return <div className="category-pager"><div className="categories">{pageItems.map(({ label, icon: Icon, route }, index) => <button key={label} className="category-tile" onClick={() => setLocation(route)} data-testid={`category-${label.toLowerCase()}`}><span className="category-glyph"><Icon size={24} /></span><span className="category-label">{label}</span></button>)}</div><div className="category-pagination">{[0, 1].map((item) => <button key={item} className={`category-pagination-dot ${page === item ? 'active' : ''}`} onClick={() => setPage(item)} aria-label={`Tampilkan menu halaman ${item + 1}`} />)}</div></div>;
}

function StoryLead() {
  const [, setLocation] = useLocation();
  return <button className="story-lead" onClick={() => setLocation('/collective')} data-testid="collective-story"><img src={asset('collective-banner.webp')} alt="" /><div className="story-lead-shade" /><div className="story-lead-copy"><h3>Kopi dari tanah pegunungan.</h3><p>Dari lereng Garut, setiap biji membawa cerita petani, ketinggian, dan proses yang dirawat dengan penuh perhatian.</p><img className="story-beans" src={asset('coffee-beans-natural.webp')} alt="" /></div></button>;
}

function VoucherCarousel() {
  const [, setLocation] = useLocation();
  const [slide, setSlide] = useState(0);
  const vouchers = homeContent.vouchers;
  useEffect(() => { const timer = window.setInterval(() => setSlide((value) => (value + 1) % vouchers.length), 4500); return () => window.clearInterval(timer); }, [vouchers.length]);
  return <div className="voucher-carousel"><div className="voucher-row">{vouchers[slide].map((item, index) => <button className={`voucher ${index ? 'dark' : ''}`} key={item.code} onClick={() => setLocation('/catalog')}><span className="voucher-kicker">VOUCHER</span><div className="voucher-discount">{item.discount}</div><div className="voucher-title">{item.title}</div><div className="voucher-note">{item.note}</div><div className="voucher-code">{item.code} <span>↗</span></div></button>)}</div><div className="voucher-dots">{vouchers.map((_, index) => <button key={index} className={`voucher-dot ${index === slide ? 'active' : ''}`} onClick={() => setSlide(index)} aria-label={`Tampilkan voucher halaman ${index + 1}`} />)}</div></div>;
}

function ProductCard({ coffee }: { coffee: Coffee }) {
  const [, setLocation] = useLocation();
  const { favorites, toggleFavorite, addToCart } = useStore();
  const saved = favorites.includes(coffee.id);
  return <article className="product-card" data-testid={`card-product-${coffee.id}`}><button className="product-image-wrap" onClick={() => setLocation(`/product/${coffee.id}`)} data-testid={`button-product-${coffee.id}`}><img className="product-image" src={coffee.image} alt={coffee.name} />{coffee.badge && <span className="badge">{coffee.badge}</span>}</button><div className="product-card-body"><div className="product-title">{coffee.name}</div><div className="product-tagline">{coffee.tagline}</div><div className="product-price">{formatPrice(coffee.price)} <span>/ 200g</span></div></div><button className={`fav-button ${saved ? 'saved' : ''}`} onClick={() => toggleFavorite(coffee.id)} aria-label={saved ? `Hapus ${coffee.name} dari favorit` : `Simpan ${coffee.name}`} data-testid={`button-favorite-${coffee.id}`}><Heart size={17} fill={saved ? 'currentColor' : 'none'} /></button><button className="product-add" onClick={() => addToCart(coffee.id)} data-testid={`button-add-${coffee.id}`}><Plus size={15} /> Tambah ke keranjang</button></article>;
}

function SectionTitle({ kicker, title, action, onAction }: { kicker?: string; title: string; action?: string; onAction?: () => void }) {
  return <div className="section-heading"><div>{kicker && <div className="section-kicker">{kicker}</div>}<h2>{title}</h2></div>{action && <button className="see-all" onClick={onAction} data-testid={`button-see-${title.toLowerCase().replaceAll(' ', '-')}`}>{action}</button>}</div>;
}

function HomePage() {
  const [, setLocation] = useLocation();
  const diversified = homeContent.diversifiedProducts;
  return <Page><Header home /><main className="screen-section"><SearchEntry /><PromoCarousel /><CategoryTiles /><StoryLead /><VoucherCarousel /><SectionTitle title="Untuk cangkir pertama" action="Lihat semua" onAction={() => setLocation('/catalog')} /><div className="horizontal-scroll hide-scrollbar">{coffees.slice(0, 2).map((coffee) => <ProductCard coffee={coffee} key={coffee.id} />)}</div><SectionTitle title="Lebih dari secangkir" action="Lihat semua" onAction={() => setLocation('/diversification')} /><div className="horizontal-scroll hide-scrollbar">{diversified.map((product) => <article className="diversified-card" key={product.title} onClick={() => setLocation('/diversification')}><div className="diversified-image"><img src={asset(product.image)} alt={product.title} /><span>{product.badge}</span></div><div className="diversified-body"><small>{product.category}</small><strong>{product.title}</strong><div>{product.price} <ArrowRight size={13} /></div></div></article>)}</div><SectionTitle title="Mulai dari selera" action="Jelajahi" onAction={() => setLocation('/catalog')} /><div className="taste-grid">{[['Cerah & manis', 'Lemon, melati, gula merah', 'coffee-bean-menu-original.webp', '/product/papandayan-honey'], ['Buah & juicy', 'Stroberi, kakao, molase', 'coffee-palm-sugar-concentrate.webp', '/product/cikajang-natural'], ['Hangat & nyaman', 'Karamel, cokelat, rempah', 'garut-mug.webp', '/product/samarang-dark']].map(([title, detail, image, route], index) => <button key={title} className={`taste-card ${index === 1 ? 'featured' : ''}`} onClick={() => setLocation(route)}><img src={asset(image)} alt="" /><div className="taste-shade" /><strong>{title}</strong><span>{detail}</span><ArrowRight size={14} /></button>)}</div><SectionTitle title="Orang di balik rasa" action="Semua petani" onAction={() => setLocation('/farmers')} /><div className="horizontal-scroll hide-scrollbar story-rail">{stories.map(([image, title]) => <div className="story-card" key={title}><img src={image} alt={title} /><div className="story-title">{title}</div></div>)}</div></main><FloatingBadges /></Page>;
}

function Page({ children }: { children: ReactNode }) {
  return <div className="app-viewport"><div className="app-page">{children}</div><BottomNav /></div>;
}

function CatalogPage() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');
  const filters = ['Semua', 'Cerah', 'Buah', 'Harian', 'Nyaman'];
  const filtered = useMemo(() => coffees.filter((coffee) => {
    const matchesFilter = filter === 'Semua'
      || (filter === 'Cerah' && coffee.id === 'papandayan-honey')
      || (filter === 'Buah' && coffee.id === 'cikajang-natural')
      || (filter === 'Harian' && coffee.id === 'talaga-washed')
      || (filter === 'Nyaman' && coffee.id === 'samarang-dark');
    return matchesFilter && `${coffee.name} ${coffee.origin} ${coffee.notes.join(' ')}`.toLowerCase().includes(query.toLowerCase());
  }), [filter, query]);
  const featuredCoffee = coffees[0];
  return <Page><main className="subpage catalog-page"><Header /><h1 className="catalog-title">Jelajahi kopi</h1><button className="catalog-featured" onClick={() => setLocation(`/product/${featuredCoffee.id}`)} data-testid="catalog-featured-coffee"><img src={asset('hero-coffee.webp')} alt="" /><div className="catalog-featured-shade" /><div className="catalog-featured-copy"><span className="catalog-eyebrow">KURASI MINGGU INI</span><strong>Temukan rasa yang cocok dengan ritmemu</strong><span>{featuredCoffee.name} · {featuredCoffee.notes.slice(0, 2).join(' dan ')}</span><b>Lihat kurasi <ArrowRight size={14} /></b></div></button><div className="catalog-search-heading"><div><h2>Cari kopi pilihanmu</h2><p>Dari kebun Garut, untuk ritualmu</p></div><div className="catalog-search-badge"><Coffee size={15} /></div></div><SearchEntry catalog value={query} onChange={setQuery} /><div className="catalog-filter-heading"><strong>Pilih suasana</strong><span>Geser untuk melihat semua</span></div><div className="filter-pills">{filters.map((item) => <button className={`filter-pill ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)} key={item} data-testid={`filter-${item.toLowerCase()}`}>{filter === item && <Check size={12} />}{item}</button>)}</div><div className="catalog-result-row"><div><strong>{filtered.length} produk pilihan</strong><span>{filter === 'Semua' ? 'Siap menemani setiap ritual' : `Nuansa ${filter.toLowerCase()} untuk hari ini`}</span></div><small><i /> TERSEDIA</small></div><div className="product-grid">{filtered.map((coffee) => <ProductCard key={coffee.id} coffee={coffee} />)}</div>{!filtered.length && <EmptyState icon={Search} title="Belum ada yang cocok" text="Coba kata kunci lain untuk menemukan kopi favoritmu." action="Bersihkan pencarian" onAction={() => setQuery('')} />}</main></Page>;
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
  return <Page><main className="subpage"><Header /><div className="subcopy">Pantau perjalanan pesanan kopimu.</div>{orders.length ? orders.map((order) => <div className="order-card" key={order.id}><div className="order-head"><div className="order-id">{order.id}</div><div className="status-chip">{order.status}</div></div><div className="order-meta">{order.createdAt} · {order.items.reduce((sum, item) => sum + item.quantity, 0)} item</div><div className="order-total">{formatPrice(order.total)}</div></div>) : <EmptyState icon={ShoppingBag} title="Belum ada pesanan" text="Pesananmu akan muncul di sini setelah checkout." action="Mulai belanja" onAction={() => setLocation('/catalog')} />}</main></Page>;
}

function ProfilePage() {
  const [, setLocation] = useLocation();
  const { session, signOut } = useAuth();
  const profile = session ?? roleProfiles[0];
  return <Page><main className="subpage"><Header /><div className="profile-hero"><div className="avatar">{profile.initials}</div><div><h2>{profile.name}</h2><p>{profile.label} · Kopi Garut</p></div></div><div className="profile-menu"><button onClick={() => setLocation('/orders')} data-testid="profile-orders"><ShoppingBag size={18} /><span>Riwayat pesanan</span><ChevronRight size={16} /></button><button onClick={() => setLocation('/favorites')} data-testid="profile-favorites"><Heart size={18} /><span>Kopi favorit</span><ChevronRight size={16} /></button><button onClick={() => setLocation('/notifications')} data-testid="profile-notifications"><Bell size={18} /><span>Notifikasi</span><ChevronRight size={16} /></button><button onClick={() => setLocation('/profile/settings')} data-testid="profile-settings"><Settings size={18} /><span>Pengaturan akun</span><ChevronRight size={16} /></button><button onClick={signOut} data-testid="profile-sign-out"><ArrowLeft size={18} /><span>Keluar dari akun</span><ChevronRight size={16} /></button></div></main></Page>;
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
      <div className="eyebrow">EKOSISTEM KOPI GARUT</div>
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
  return <Page><main className="subpage"><Header /><div className="subcopy">Kabar kecil dari ekosistem Kopi Garut.</div><div className="info-card"><h3>Panen baru sudah tiba</h3><p>Papandayan Series dari Cisurupan baru saja masuk ke katalog. Rasa lemon Meyer dan gula merahnya sedang paling dicari.</p></div><div className="info-card"><h3>Selamat datang di Kopi Garut</h3><p>Kenali kopi dari kebun, petani, dan wilayah yang membuat setiap cangkir punya cerita.</p></div></main></Page>;
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
  { id: 'sekolah-barista', type: 'KELAS KETERAMPILAN', title: 'Sekolah Barista Kopi Garut', description: 'Belajar espresso, manual brew, pelayanan, dan cerita asal kopi untuk barista baru.', date: 'Batch 01 · 24 Okt 2026', location: 'Garut', image: 'event-coffee-workshop.webp' },
  { id: 'cupping-kenal-asal', type: 'MUTU & RASA', title: 'Cupping & Kenal Asal', description: 'Membaca rasa, membandingkan proses, dan mengenal orang di balik setiap lot.', date: 'Papandayan · 14 Nov 2026', location: 'Papandayan', image: 'event-cupping-papandayan.webp' },
  { id: 'kelas-pascapanen', type: 'UNTUK PETANI', title: 'Kelas Pascapanen', description: 'Praktik sortasi, pengeringan, dan pencatatan mutu untuk menjaga nilai jual kopi.', date: 'Cikajang · 17 Okt 2026', location: 'Cikajang', image: 'event-postharvest-class.webp' },
];

const standards = [
  ['Grade', 'Grade 1 · Specialty', 'Biji seragam, bersih, dan dapat ditelusuri sampai lot panen.'],
  ['Proses pascapanen', 'Tercatat per lot', 'Natural, washed, honey, atau proses lain wajib memiliki catatan waktu dan metode.'],
  ['Kadar air', '10–12%', 'Diukur sebelum penyimpanan dan dicatat pada lembar mutu.'],
  ['Defect', 'Maks. 5 defect / 300 g', 'Sortasi fisik dilakukan sebelum cupping dan pengemasan.'],
  ['Cupping', 'Min. 80 poin', 'Cupping memakai lembar penilaian Kopi Garut dan panel terlatih.'],
  ['Kemasan', 'Food grade + lot code', 'Sertakan asal, proses, berat bersih, tanggal sangrai, dan kode lot.'],
];

const curationProducts = [
  { name: 'Arabika Honey Cikuray', producer: 'KTH Cikuray Mandiri', stage: 4, note: 'Siap tampil di katalog resmi.' },
  { name: 'Papandayan Natural Lot 06', producer: 'KTH Papandayan Lestari', stage: 2, note: 'Menunggu sesi cupping kurator.' },
  { name: 'Kamojang Washed 2026', producer: 'Kelompok Tani Talaga', stage: 1, note: 'Foto kebun dan dokumen sedang ditinjau.' },
];
const curationStages = ['Daftar', 'Verifikasi', 'Kurasi', 'Diterima', 'Masuk Katalog Kopi Garut'];
const iconFor = (kind: string): LucideIcon => ({
  users: Users, map: Map, mapPin: MapPin, coffee: Coffee, package: Package, shield: ShieldCheck,
  calendar: CalendarDays, briefcase: BriefcaseBusiness, chart: BarChart3, file: FileText,
  leaf: Leaf, wallet: Wallet, wheat: Wheat, check: CheckCircle2, message: MessageSquare,
}[kind] ?? Package);

function useLocalJson<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try { const stored = localStorage.getItem(key); return stored ? JSON.parse(stored) as T : initial; } catch { return initial; }
  });
  const update = (next: T | ((current: T) => T)) => {
    setValue((current) => {
      const result = typeof next === 'function' ? (next as (current: T) => T)(current) : next;
      localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };
  return [value, update] as const;
}

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
  const [saved, setSaved] = useLocalJson<string[]>(`kopi-garut-${kind}-saved`, []);
  const cfg: Record<string, { title: string; eyebrow: string; copy: string; image: string }> = {
    collective: { eyebrow: 'TUMBUH BERSAMA', title: 'Ekosistem yang merawat rasa.', copy: 'Satu ruang untuk produksi, pascapanen, bisnis, edukasi, dan cerita kopi Garut.', image: 'kopi-garut-banyak-orang-banner.webp' },
    farmers: { eyebrow: 'ORANG DI BALIK RASA', title: 'Kenali petani Garut.', copy: 'Profil keluarga tani, kelompok, dan kebun yang menjaga kualitas dari musim ke musim.', image: 'farmer-asep-rahmat.webp' },
    regions: { eyebrow: 'WILAYAH KOPI', title: 'Dari lereng ke cangkir.', copy: 'Setiap ketinggian punya karakter rasa, proses, dan cerita yang berbeda.', image: 'regions-banner.webp' },
    tourism: { eyebrow: 'PENGALAMAN KOPI', title: 'Seduh sambil menjelajah.', copy: 'Datang ke kebun, belajar prosesnya, lalu nikmati seduhan dari asalnya.', image: 'kopi-garut-seduh-sambil-menjelajah-banner.webp' },
    events: { eyebrow: 'AGENDA KOPI', title: 'Temu, belajar, dan mencicipi.', copy: 'Kalender pertemuan petani, roastery, barista, dan pecinta kopi Garut.', image: 'event-coffee-festival.webp' },
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
  return <Page><main className="subpage"><Header /><HeroPanel {...content} /><MetricStrip metrics={hubStats.map((item) => ({ label: item.label, value: item.value, icon: item.label.includes('Petani') ? 'users' : item.label.includes('Wilayah') ? 'map' : 'chart' }))} /><div className="section-heading"><div><span className="section-kicker">PINTU EKOSISTEM</span><h2>Ruang yang saling terhubung.</h2></div></div><div className="module-grid">{[['coffee', 'Produksi & budidaya', 'Data kebun, luas lahan, produksi per musim, dan jadwal panen.'], ['package', 'Pascapanen', 'Catatan rumah produksi, stok, dan standar kualitas per lot.'], ['briefcase', 'Marketplace B2B', 'Temu hasil panen dengan cafe dan roastery yang mencari kopi Garut.'], ['shield', 'Sertifikasi & legalitas', 'Profil kesiapan usaha dan dokumen untuk memperluas akses pasar.'], ['calendar', 'Akademi Kopi Garut', 'Materi budidaya, pascapanen, brewing, dan kewirausahaan kopi.'], ['compass', 'Wisata kopi', 'Pengalaman langsung dari kebun, proses, budaya, dan orang-orangnya.']].map(([icon, title, detail], index) => <ActionRow key={title} icon={icon} title={title} detail={detail} action="Jelajahi" onAction={() => { if (index === 5) setLocation('/tourism'); else if (index === 2) setLocation('/partnership'); else if (index === 4) setLocation('/program'); else notify(`${title} akan dibuka dari ruang kerja terkait`); }} />)}</div><div className="dark-callout"><span className="section-kicker">ROADMAP 2026</span><h2>Dari data kebun menuju keputusan yang lebih adil.</h2><p>Lot kopi, pre-order panen, kontrak kemitraan, pusat logistik, hingga QR Code Kopi Garut dirancang dalam satu perjalanan.</p><button className="secondary-button" onClick={() => setLocation('/traceability')} data-testid="button-collective-trace">Lihat jejak kopi <ArrowRight size={14} /></button></div></main></Page>;
}

const ecosystemStages = [
  { number: '01', label: 'KEBUN', title: 'Kenali asalnya', icon: 'map', links: [['Petani & kebun', '/farmers'], ['Wilayah kopi', '/regions']] },
  { number: '02', label: 'PROSES & MUTU', title: 'Jaga kualitasnya', icon: 'package', links: [['Standar Kopi Garut', '/standards'], ['Lacak lot lewat QR', '/traceability']] },
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
  return <Page><main className="subpage collective-page"><Header title="Ekosistem Kopi" /><div className="collective-hero"><img src={asset('hero-coffee.webp')} alt="" /><div className="collective-hero-shade" /><div className="collective-hero-copy"><div className="collective-hero-top"><div className="collective-hero-icon"><Coffee size={24} /></div><span>01—04</span></div><small>RANTAI KOPI GARUT</small><h1>Satu alur,<br />banyak peran.</h1><b>KEBUN · MUTU · PASAR · CANGKIR</b></div></div><div className="collective-intro"><span className="section-kicker">BAGAIMANA KOPI BERJALAN</span><h2>Kopi Garut bukan hanya katalog.</h2><p>Ini adalah ruang yang menghubungkan petani, pembeli, pelaku usaha, dan pengunjung dalam satu perjalanan kopi.</p></div><div className="collective-roles"><h3>Kamu datang sebagai siapa?</h3>{roleItems.map(([title, text, route, icon], index) => <button key={title} onClick={() => setLocation(route)}><span className={`collective-role-icon role-tone-${index % 2}`}>{createElement(iconFor(icon), { size: 17 })}</span><span><strong>{title}</strong><small>{text}</small></span><ArrowRight size={14} /></button>)}</div><div className="collective-stages">{ecosystemStages.map((stage, index) => <div className="collective-stage" key={stage.number}><div className="collective-stage-head"><b className={index === 0 ? 'current' : ''}>{stage.number}</b><span><small>{stage.label}</small><strong>{stage.title}</strong></span><i>{createElement(iconFor(stage.icon), { size: 18 })}</i></div>{stage.links.map(([label, route]) => <button key={label} onClick={() => setLocation(route)}><em />{label}<ArrowRight size={15} /></button>)}</div>)}</div><div className="collective-closing"><div><Heart size={19} /></div><span><strong>Sekarang pilih langkahmu.</strong><small>Mulai dari kebun, kopi, usaha, atau pengalaman.</small></span></div></main></Page>;
}

function PartnershipPage({ content }: { content: { image: string; eyebrow: string; title: string; copy: string } }) {
  const { notify } = useStore();
  const [form, setForm] = useState({ name: '', type: 'Cafe / Roastery', need: '' });
  const [sent, setSent] = useLocalJson<boolean>('kopi-garut-partnership-sent', false);
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
  const [scanned, setScanned] = useState(false);
  const coffee = coffees[0];
  const farmer = farmers[0];
  return <Page><main className="subpage"><Header /><div className="trace-hero"><div className="qr-mark"><ScanLine size={44} /></div><span className="section-kicker">SCAN QR KEMASAN</span><h1>Satu scan, satu cerita utuh.</h1><p>Kenali kebun, proses, dan rasa yang akhirnya sampai di cangkir.</p><button className="primary-button" onClick={() => setScanned(true)} data-testid="button-trace-scan">{scanned ? 'Cerita terbuka' : 'Buka cerita kopi'} <ScanLine size={15} /></button></div>{scanned && <div className="trace-result"><div className="success-banner"><CheckCircle2 size={20} /><div><span className="section-kicker">SCAN BERHASIL</span><strong>Kemasan ini punya cerita.</strong></div><code>LOT-PAP-06</code></div><div className="trace-photo"><img src={asset(farmer.image)} alt={farmer.name} /><div><span className="section-kicker">PETANI PRODUSEN</span><h2>{farmer.name}</h2></div><span className="status-chip">TERVERIFIKASI</span></div><div className="info-card"><span className="section-kicker">ASAL & PRODUSEN</span><h2>{coffee.name}</h2><ActionRow icon="mapPin" title="Asal kebun" detail={`${farmer.location} · ${coffee.altitude}`} /><ActionRow icon="users" title="Petani produsen" detail={`${farmer.name} · ${farmer.group}`} /><ActionRow icon="coffee" title="Jenis dan proses" detail={`${farmer.coffeeType} · proses ${coffee.process}`} /><ActionRow icon="calendar" title="Tanggal panen" detail="29 September 2026 · buah dipetik saat matang" /></div><div className="timeline-card"><span className="section-kicker">PERJALANAN LOT</span><h2>Dari kebun sampai cangkir</h2>{[['01', 'Kebun', 'Cherry merah dipetik dari blok utara Papandayan.'], ['02', 'Pascapanen', 'Proses madu dan pengeringan matahari dicatat per lot.'], ['03', 'Katalog', 'Disangrai dan dikirim sebagai Papandayan Series.']].map(([number, title, detail]) => <div className="timeline-row" key={number}><b>{number}</b><div><strong>{title}</strong><span>{detail}</span></div></div>)}</div><div className="trace-taste"><span className="section-kicker">YANG TERASA DI CANGKIR</span><h2>Lemon Meyer, gula merah, melati.</h2><div className="taste-list">{coffee.notes.map((note) => <span className="taste" key={note}>{note}</span>)}</div><button className="secondary-button" onClick={() => setLocation(`/product/${coffee.id}`)} data-testid="button-trace-product">Lihat kopi <ArrowRight size={14} /></button></div></div>}</main></Page>;
}

function DashboardPage() {
  const [, setLocation] = useLocation();
  const dashboardPrices = [
    ['Cherry kopi', 'Rp 8.500', 'per kg'],
    ['Gabah kopi', 'Rp 22.000', 'per kg'],
    ['Green bean', 'Rp 68.000', 'per kg'],
  ];
  return <Page><main className="subpage dashboard-page"><Header title="Dashboard dinas" /><div className="dashboard-banner"><BarChart3 size={22} /><div><strong>Garut Coffee Hub</strong><span>Ringkasan ekosistem kopi Garut</span></div></div><MetricStrip metrics={hubStats} /><div className="dashboard-section-heading"><h2>Sebaran wilayah</h2><span>Diperbarui hari ini</span></div><div className="dashboard-regions">{regions.map((region) => <button key={region.id} onClick={() => setLocation(`/region/${region.id}`)}><span className="dashboard-region-icon"><MapPin size={16} /></span><span><strong>{region.name}</strong><small>{region.farmerCount} petani · {region.elevation}</small></span><b>{region.specialty}</b></button>)}</div><h2 className="dashboard-price-title">Harga acuan</h2><div className="dashboard-prices">{dashboardPrices.map(([label, price, unit]) => <div key={label}><span>{label}</span><strong>{price} <small>{unit}</small></strong></div>)}</div></main></Page>;
}

const programCategories = ['Semua', 'CSR petani kopi', 'Lingkungan kebun', 'Keluarga petani', 'Komunitas kopi'];
const programServices = [
  { title: 'Verifikasi petani & produk', route: '/verification', icon: 'shield' },
  { title: 'Standar Kopi Garut', route: '/standards', icon: 'check' },
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
  const [applications, setApplications] = useLocalJson<string[]>('kopi-garut-program-applications', []);
  const visibleOffers = category === 'Semua' ? programOffers : programOffers.filter((offer) => offer.category === category);
  const roleCards = session?.id === 'petani'
    ? [{ title: 'Petani', detail: 'Verifikasi kebun, mutu lot, dan akses pasar.', route: '/verification', icon: 'coffee' }]
    : session?.id === 'penyuluh'
      ? [{ title: 'Penyuluh', detail: 'Catat kunjungan dan tindak lanjut kebun.', route: '/extension-dashboard', icon: 'mapPin' }]
      : [];
  return <Page><main className="subpage"><Header title="Program Kopi Garut" /><HeroPanel image="program-menu-ai.webp" eyebrow="PROGRAM KOPI GARUT" title="Belajar, berbagi, tumbuh bersama." copy="Ruang untuk pelatihan, dukungan, dan program yang menjaga masa depan kopi Garut." /><MetricStrip metrics={[{ label: 'Program rutin', value: '04', icon: 'calendar' }, { label: 'Agenda kopi', value: '08', icon: 'coffee' }, { label: 'Ekosistem', value: '01', icon: 'users' }]} /><SectionTitle kicker="PROGRAM KAMI" title="Kegiatan rutin untuk yang mencintai kopi." /><p className="program-intro">Bukan hanya menjual kopi. Kami membuat ruang untuk belajar, bertemu, dan membangun masa depan kopi Garut bersama-sama.</p><div className="program-rail">{regularPrograms.map((item) => <article className="program-card" key={item.id}><img src={asset(item.image)} alt={item.title} /><div className="program-card-body"><span className="section-kicker">{item.type}</span><h3>{item.title}</h3><p>{item.description}</p><div className="event-meta"><span><CalendarDays size={13} />{item.date}</span><span><MapPin size={13} />{item.location}</span></div><button className="secondary-button" onClick={() => setLocation('/events')}>Lihat jadwal <ArrowRight size={13} /></button></div></article>)}</div><SectionTitle kicker="PEMBERDAYAAN DESA" title="Dari kopi, lahir lebih banyak karya." /><div className="dark-callout"><span className="section-kicker">PROGRAM DESA</span><h2>Produk turunan kopi</h2><p>Mengubah potensi kopi dan hasil sampingnya menjadi produk bernilai tambah yang bisa dibuat, dikelola, dan dipasarkan bersama oleh warga desa.</p><div className="mini-grid">{['Essential oil kopi', 'Pewangi sepatu', 'Merchandise desa', 'Oleh-oleh aroma'].map((item) => <div className="mini-card" key={item}><Package size={16} /><strong>{item}</strong></div>)}</div><button className="secondary-button" onClick={() => setLocation('/diversification')}>Lihat produk turunan <ArrowRight size={13} /></button></div><SectionTitle kicker="CSR KOPI GARUT" title="Kontribusi untuk petani & kebun kopi" /><p className="program-intro">Dukungan CSR yang kembali ke ekosistem kopi: memperkuat keluarga petani, menjaga kebun, dan merawat lingkungan tempat kopi Garut tumbuh.</p><div className="filter-pills">{programCategories.map((item) => <button key={item} className={`filter-pill ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="offer-list">{visibleOffers.map((offer) => { const applied = applications.includes(offer.id); return <article className="offer-card" key={offer.id}><div className="offer-head"><div className="row-icon"><Sparkles size={17} /></div><div><span className="section-kicker">{offer.category}</span><h3>{offer.title}</h3></div><span className="status-chip">Dibuka</span></div><p>{offer.description}</p><div className="offer-meta"><span><small>UNTUK</small><b>{offer.target}</b></span><span><small>DUKUNGAN</small><b>{offer.support}</b></span><span><small>BATAS</small><b>{offer.deadline}</b></span></div><button className={`primary-button wide ${applied ? 'is-secondary' : ''}`} onClick={() => { if (!session) { setLocation('/login?returnTo=/program'); return; } if (!applied) { setApplications((items) => [...items, offer.id]); notify(`Pengajuan ${offer.title} sudah dikirim.`); } }}><Check size={15} />{applied ? 'Sudah diajukan' : session ? 'Ajukan program' : 'Masuk untuk mengajukan'}</button></article>; })}</div><SectionTitle kicker="MULAI DARI PERANMU" title="Pilih ruang kerja" />{session && roleCards.length ? <div className="role-work-grid">{roleCards.map((role) => <button className="role-work-card" key={role.route} onClick={() => setLocation(role.route)}><div className="row-icon"><Coffee size={18} /></div><span><small>RUANG KERJA</small><strong>{role.title}</strong><em>{role.detail}</em></span><ArrowRight size={16} /></button>)}</div> : <div className="access-card"><div className="row-icon"><ShieldCheck size={18} /></div><div><h3>Buka akses program</h3><p>Masuk untuk melihat ruang kerja yang sesuai dengan peranmu.</p></div><button className="secondary-button" onClick={() => setLocation('/login?returnTo=/program')}>Masuk</button></div>}<SectionTitle kicker="SEMUA LAYANAN" title="Jelajahi program" /><div className="service-grid">{programServices.filter((item) => canAccessRoute(item.route, session?.id)).map((item) => <button className="service-card" key={item.route} onClick={() => setLocation(item.route)}><div className="row-icon">{createElement(iconFor(item.icon), { size: 17 })}</div><strong>{item.title}</strong><ArrowRight size={15} /></button>)}</div></main></Page>;
}

const operationConfigs: Record<string, { eyebrow: string; title: string; copy: string; image: string; rows: Array<[string, string, string, string?]>; metrics?: Array<{ label: string; value: string; icon?: string }>; form?: { label: string; placeholder: string; action: string } }> = {
  verification: { eyebrow: 'VERIFIKASI · PETANI', title: 'Status yang jelas untuk setiap kebun.', copy: 'Pastikan identitas, kelompok, lokasi kebun, dan lot kopi tercatat dengan rapi.', image: 'verification-menu-ai.webp', rows: [['Terverifikasi', 'Profil petani dan identitas usaha sudah cocok.', 'Lengkap', 'check'], ['Kelompok tani terverifikasi', 'Keanggotaan tercatat di kelompok aktif.', 'Lengkap', 'users'], ['Lokasi kebun terverifikasi', 'Titik kebun dan luas lahan sudah dipetakan.', 'Lengkap', 'mapPin'], ['Produk terverifikasi', 'Lot Arabika Honey 2026 menunggu foto kemasan.', 'Dalam tinjauan', 'package']] },
  standards: { eyebrow: 'RUJUKAN MUTU', title: 'Standar Kopi Garut.', copy: 'Rujukan mutu internal untuk setiap lot, dari kebun hingga kemasan.', image: 'standards-menu-ai.webp', rows: standards.map(([title, value, detail]) => [title, `${value} · ${detail}`, 'Standar', 'check']) },
  quality: { eyebrow: 'CEK MUTU LOT', title: 'Ukur kesiapan mutu lot.', copy: 'Pastikan lot siap dicatat, dicicipi, dan ditawarkan ke pembeli.', image: 'standards-menu-ai.webp', rows: [['Kadar air', '10–12% sebelum penyimpanan', 'Siap dicek', 'coffee'], ['Defect', 'Maks. 5 defect / 300 g', 'Siap dicek', 'check'], ['Cupping', 'Minimum 80 poin', 'Belum diisi', 'chart'], ['Kemasan', 'Food grade + kode lot', 'Siap dicek', 'package']], form: { label: 'Catatan pemeriksaan', placeholder: 'Contoh: kadar air 11,2%, lot siap untuk cupping', action: 'Simpan hasil cek' } },
  curation: { eyebrow: 'KURASI PRODUK', title: 'Dari kebun menuju katalog.', copy: 'Ikuti setiap tahap agar produk yang tampil membawa cerita dan mutu yang jelas.', image: 'reports-menu-ai.webp', rows: curationProducts.map((item) => [item.name, `${item.producer} · ${item.note}`, `${curationStages[item.stage]}`, 'package']) },
  extensionDashboard: { eyebrow: 'PENYULUH · DASHBOARD', title: 'Bawa data kebun ke lapangan.', copy: 'Ringkasan kunjungan, kondisi kebun, dan tindak lanjut dalam satu ruang kerja.', image: 'regions-banner.webp', metrics: [{ label: 'Kunjungan bulan ini', value: '18', icon: 'mapPin' }, { label: 'Kondisi kebun baik', value: '14', icon: 'check' }, { label: 'Masalah terbuka', value: '06', icon: 'message' }, { label: 'Jatuh tempo', value: '03', icon: 'calendar' }], rows: [['Iis Nurhayati', 'Daun menguning di blok 2 setelah hujan panjang.', 'Menunggu arahan', 'leaf'], ['H. Asep Rahmat', 'Pemetaan blok panen dan foto lot.', 'Dijadwalkan', 'calendar'], ['Deni Suhendar', 'Pengecekan naungan kebun.', 'Selesai', 'check']] },
  extensionVisits: { eyebrow: 'PENYULUH · KUNJUNGAN', title: 'Catatan kunjungan lapangan.', copy: 'Simpan hasil observasi dan rekomendasi yang bisa ditindaklanjuti.', image: 'farmer-story-1.webp', rows: [['Iis Nurhayati', 'Mekarsari, Cikajang · 12 Juni 2026', 'Kunjungan terakhir', 'mapPin'], ['Kunjungan berikutnya', '19 Juni 2026 · Blok utara', 'Dijadwalkan', 'calendar']], form: { label: 'Catatan kunjungan baru', placeholder: 'Tulis kondisi kebun, masalah, dan rekomendasi', action: 'Simpan kunjungan' } },
  extensionTraining: { eyebrow: 'PENYULUH · PELATIHAN', title: 'Pelatihan yang bergerak bersama kebun.', copy: 'Atur materi dan agenda pendampingan untuk kelompok tani.', image: 'event-postharvest-class.webp', rows: [['Pelatihan sortasi & defect', 'Besok, 09.00 · Rumah produksi Cikuray', 'Terjadwal', 'calendar'], ['Kelas pascapanen', '17 Oktober 2026 · Cikajang', 'Pendaftaran', 'coffee'], ['Cupping & Kenal Asal', '14 November 2026 · Cisurupan', 'Terjadwal', 'chart']] },
  extensionReports: { eyebrow: 'PENYULUH · LAPORAN', title: 'Ringkas pendampingan dengan jelas.', copy: 'Lihat perkembangan kunjungan, kondisi kebun, dan tindak lanjut.', image: 'reports-menu-ai.webp', metrics: [{ label: 'Laporan tersimpan', value: '24', icon: 'file' }, { label: 'Selesai bulan ini', value: '18', icon: 'check' }, { label: 'Perlu respons', value: '06', icon: 'message' }], rows: [['Rekap Cikajang', '14 kunjungan · 6 rekomendasi aktif', 'Terbaru', 'chart'], ['Rekap Cisurupan', '9 kunjungan · 2 tindak lanjut', 'Ditinjau', 'chart']] },
  extensionFarmers: { eyebrow: 'PENYULUH · PETANI BINAAN', title: 'Kenali kebun yang kamu dampingi.', copy: 'Buka profil petani, catatan kunjungan, dan kebutuhan dukungan.', image: 'farmer-asep-rahmat.webp', rows: farmers.map((farmer) => [farmer.name, `${farmer.group} · ${farmer.location}`, farmer.annualProduction, 'users']) },
  extensionIssues: { eyebrow: 'PENYULUH · MASALAH KEBUN', title: 'Tindak lanjut yang tidak tercecer.', copy: 'Prioritaskan kendala kebun dan hubungkan dengan rekomendasi penyuluh.', image: 'farmer-story-2.webp', rows: [['Daun menguning di blok 2', 'Iis Nurhayati · hujan panjang', 'Menunggu arahan', 'leaf'], ['Drainase blok utara', 'H. Asep Rahmat · puncak panen', 'Dijadwalkan', 'mapPin'], ['Foto lot belum lengkap', 'KTH Cikuray Mandiri', 'Sudah ditinjau', 'check']], form: { label: 'Catatan tindak lanjut', placeholder: 'Tambahkan arahan untuk petani', action: 'Simpan arahan' } },
  groupDashboard: { eyebrow: 'KELOMPOK TANI', title: 'Satu meja untuk gerak kelompok.', copy: 'Pantau anggota, produksi, permintaan pembeli, dan jadwal kelompok.', image: 'collective-banner.webp', metrics: [{ label: 'Anggota aktif', value: '42', icon: 'users' }, { label: 'Produksi musim ini', value: '8,4 ton', icon: 'coffee' }, { label: 'Panen berjalan', value: '1,8 ton', icon: 'calendar' }, { label: 'Penjualan tercatat', value: 'Rp 186 jt', icon: 'wallet' }], rows: [['Permintaan Arabika Grade 1', 'Ruang Seduh Roastery · 300 kg · proses honey', 'Menunggu respons', 'briefcase'], ['Program dryer bersama', 'Dinas Pertanian Garut · 1 unit', 'Verifikasi dokumen', 'package'], ['Pelatihan sortasi & defect', 'Besok, 09.00 · Rumah produksi Cikuray', 'Agenda', 'calendar']] },
  reports: { eyebrow: 'LAPORAN DIGITAL', title: 'Baca pertumbuhan dengan jelas.', copy: 'Bandingkan produksi, penjualan, dan pendampingan di wilayah Kopi Garut.', image: 'reports-menu-ai.webp', metrics: hubStats.map((item) => ({ label: item.label, value: item.value, icon: 'chart' })), rows: [['Produksi Arabika Cikajang', 'KTH Cikuray Mandiri · kenaikan 12,4%', 'Di atas target', 'trending'], ['Panen Papandayan', 'KTH Papandayan Lestari · dryer bersama dijadwalkan', 'Perlu pendampingan', 'calendar'], ['Penjualan lot Kamojang', 'Kelompok Tani Talaga · dua pembeli baru', 'Naik bulan ini', 'wallet']] },
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
  const [saved, setSaved] = useLocalJson<string[]>(`kopi-garut-${kind}-records`, []);
  const [note, setNote] = useState('');
  return <Page><main className="subpage"><Header /><HeroPanel image={config.image} eyebrow={config.eyebrow} title={config.title} copy={config.copy} />{config.metrics && <MetricStrip metrics={config.metrics} />}<div className="section-heading"><div><span className="section-kicker">RUANG KERJA</span><h2>Ringkasan terbaru</h2></div><span className="section-kicker">{config.rows.length} catatan</span></div><div className="operation-list">{config.rows.map(([title, detail, status, icon]) => <ActionRow icon={icon ?? 'package'} title={title} detail={detail} status={status} key={`${title}-${detail}`} action={kind === 'extensionFarmers' ? 'Buka' : undefined} onAction={kind === 'extensionFarmers' ? () => setLocation(`/farmer/${farmers.find((farmer) => farmer.name === title)?.id ?? farmers[0].id}`) : undefined} />)}</div>{config.form && <div className="form-card"><span className="section-kicker">CATATAN PERANGKAT</span><h2>{config.form.label}</h2><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder={config.form.placeholder} data-testid={`input-${kind}-note`} /><button className="primary-button wide" onClick={() => { if (!note.trim()) { notify('Tulis catatan terlebih dahulu'); return; } setSaved((items) => [...items, note]); setNote(''); notify(`${config.form?.action} berhasil disimpan di perangkat`); }} data-testid={`button-${kind}-save`}>{config.form.action} <Check size={15} /></button>{saved.length > 0 && <div className="saved-note"><CheckCircle2 size={16} /><span>{saved.length} catatan tersimpan di perangkat ini.</span></div>}</div>}<div className="dark-callout"><span className="section-kicker">LANJUTKAN</span><h2>Data yang rapi membantu keputusan yang lebih baik.</h2><p>Hubungkan catatan ini dengan katalog, petani, wilayah, dan program Kopi Garut lainnya.</p><button className="secondary-button" onClick={() => setLocation(kind.startsWith('extension') ? '/extension-dashboard' : '/program')}>{kind.startsWith('extension') ? 'Kembali ke dashboard penyuluh' : 'Buka semua program'} <ArrowRight size={14} /></button></div></main></Page>;
}

function ComplaintsPage() {
  const [, setLocation] = useLocation();
  const { session } = useAuth();
  const { notify } = useStore();
  const [category, setCategory] = useState('Petani belum terdata');
  const [location, setFieldLocation] = useState('');
  const [description, setDescription] = useState('');
  const [sent, setSent] = useLocalJson<boolean>('kopi-garut-complaint-sent', false);
  return <Page><main className="subpage"><Header /><HeroPanel image="complaints-menu-ai.webp" eyebrow="USULAN & DUKUNGAN" title="Sampaikan kebutuhan dari lapangan." copy="Bantu tim Kopi Garut mengetahui petani, lahan, atau kebutuhan dukungan yang belum terhubung." /><div className="form-card"><span className="section-kicker">FORMULIR DUKUNGAN</span><h2>Apa yang perlu kami tahu?</h2><label>Kategori<select value={category} onChange={(event) => setCategory(event.target.value)}><option>Petani belum terdata</option><option>Bantuan bibit</option><option>Lahan siap dikembangkan</option><option>Pendampingan</option><option>Lainnya</option></select></label><label>Lokasi<input value={location} onChange={(event) => setFieldLocation(event.target.value)} placeholder="Contoh: Desa Mekarsari, Cikajang" /></label><label>Ceritakan kebutuhannya<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Tulis detail petani, kebun, atau dukungan yang dibutuhkan" /></label><button className="primary-button wide" onClick={() => { if (!session) { setLocation('/login?returnTo=/complaints'); return; } if (!location.trim() || !description.trim()) { notify('Lengkapi lokasi dan cerita dukungan terlebih dahulu'); return; } setSent(true); notify('Usulan sudah diterima dan disimpan di perangkat'); }}>{sent ? 'Usulan diterima' : 'Kirim usulan'} <Send size={15} /></button></div><div className="info-card"><span className="section-kicker">STATUS</span><h3>{sent ? 'Usulan sedang ditinjau' : 'Belum ada usulan tersimpan'}</h3><p>{sent ? `${category} · ${location}` : 'Setelah dikirim, usulan akan muncul di sini untuk kamu pantau.'}</p></div></main></Page>;
}

function PricesPage() {
  const [, setLocation] = useLocation();
  const prices = [['Cherry kopi', 'Rp 8.500', 'per kg', '+4,2% bulan ini'], ['Gabah kopi', 'Rp 22.000', 'per kg', '+2,1% bulan ini'], ['Green bean', 'Rp 68.000', 'per kg', 'Harga rata-rata'], ['Roasted bean', 'Rp 125.000', 'per 200 g', 'Harga rata-rata']];
  return <Page><main className="subpage"><Header /><HeroPanel image="price-menu-ai.webp" eyebrow="HARGA ACUAN" title="Baca harga, rencanakan langkah." copy="Harga referensi membantu petani, kelompok, dan pembeli berbicara dengan dasar yang sama." /><div className="price-list">{prices.map(([label, price, unit, change]) => <article className="price-card" key={label}><div><span className="section-kicker">{label}</span><h2>{price}</h2><p>{unit} · {change}</p></div><TrendingUp size={20} /></article>)}</div><div className="dark-callout"><span className="section-kicker">LIHAT PRODUK</span><h2>Bandingkan dengan lot yang tersedia.</h2><button className="secondary-button" onClick={() => setLocation('/catalog')}>Buka katalog <ArrowRight size={14} /></button></div></main></Page>;
}

function CoffeeGamePage() {
  const { notify } = useStore();
  const [score, setScore] = useState(0);
  return <Page><main className="subpage"><Header /><HeroPanel image="games-coffee-beans.webp" eyebrow="MINI GAMES" title="Panen biji, raih skor." copy="Permainan ringan untuk mengenal ritme panen Kopi Garut." /><div className="game-board"><div className="game-score"><span>SKOR</span><strong>{score}</strong></div><img src={asset(score % 2 ? 'games-cart.webp' : 'games-basket.webp')} alt="Keranjang kopi" /><p>Klik tombol untuk mengumpulkan biji kopi.</p><button className="primary-button wide" onClick={() => { setScore((value) => value + 10); notify('Biji kopi terkumpul'); }}>Panen biji kopi <Coffee size={16} /></button></div></main></Page>;
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
    <Route path="/" component={HomePage} />
    <Route path="/login"><LoginPage /></Route>
    <Route path="/catalog" component={CatalogPage} />
    <Route path="/product/:id" component={ProductDetailPage} />
    <Route path="/cart" component={CartPage} />
    <Route path="/favorites" component={FavoritesPage} />
    <Route path="/orders" component={OrdersPage} />
    <Route path="/profile" component={ProfilePage} />
    <Route path="/profile/settings"><SimpleHubPage title="Pengaturan akun" copy="Preferensi akun dan pengalaman Kopi Garut tersimpan di perangkat ini." icon={Settings} /></Route>
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
    <Route><SimpleHubPage title="Halaman belum ditemukan" copy="Coba kembali ke beranda Kopi Garut." icon={Home} /></Route>
  </Switch>;
}

function LoginRedirect({ route, onRedirect }: { route: string; onRedirect: () => void }) {
  useEffect(() => {
    onRedirect();
  }, [onRedirect]);
  return <LoginPage returnTo={route} />;
}

function App() {
  return <WebAuthProvider><StoreProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><AppRouter /></WouterRouter></StoreProvider></WebAuthProvider>;
}

export default App;