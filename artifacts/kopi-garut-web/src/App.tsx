import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ArrowLeft, ArrowRight, Bell, BriefcaseBusiness, CalendarDays, ChevronRight,
  CircleUserRound, Coffee, Compass, Heart, Home, Map, MapPin, Minus, Package, Plus,
  ScanLine, Search, Settings, ShieldCheck, ShoppingBag, SlidersHorizontal, Sparkles,
  Trash2, Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Route, Router as WouterRouter, Switch, useLocation, useParams } from 'wouter';

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`;

type Coffee = {
  id: string; name: string; tagline: string; price: number; origin: string;
  process: string; roast: string; altitude: string; notes: string[]; description: string;
  image: string; badge?: string;
};

const coffees: Coffee[] = [
  { id: 'papandayan-honey', name: 'Papandayan Series', tagline: 'Pagi cerah dari dataran tinggi.', price: 118000, origin: 'Cisurupan, Garut', process: 'Madu', roast: 'Ringan–sedang', altitude: '1.650 mdpl', notes: ['lemon Meyer', 'gula merah', 'melati'], description: 'Diproses dengan sinar matahari secara cermat, lot ini membawa udara sejuk Gunung Papandayan ke dalam cangkir yang manis dari tegukan pertama hingga terakhir.', image: asset('papandayan-series.webp'), badge: 'Favorit rumah' },
  { id: 'cikajang-natural', name: 'Cikuray Series', tagline: 'Buah beri, kakao lembut, akhir rasa panjang.', price: 132000, origin: 'Cikajang, Garut', process: 'Natural', roast: 'Sedang', altitude: '1.450 mdpl', notes: ['stroberi', 'biji kakao', 'molase'], description: 'Kopi natural yang dikeringkan perlahan dengan rasa buah yang kaya dan akhir rasa hangat. Cocok untuk pagi yang santai dan cangkir kedua.', image: asset('cikuray-series.webp'), badge: 'Lot kecil' },
  { id: 'talaga-washed', name: 'Kamojang Series', tagline: 'Bersih, tenang, kaya rasa.', price: 105000, origin: 'Pakenjeng, Garut', process: 'Cuci', roast: 'Sedang–ringan', altitude: '1.300 mdpl', notes: ['buah batu', 'almon', 'teh hitam'], description: 'Kopi harian yang seimbang dengan struktur seperti teh dan rasa manis yang pas untuk menemani hari kerja yang fokus.', image: asset('kamojang-series.webp') },
  { id: 'samarang-dark', name: 'Darajat Series', tagline: 'Karamel pekat untuk pagi yang terlambat.', price: 99000, origin: 'Samarang, Garut', process: 'Madu', roast: 'Sedang–gelap', altitude: '1.180 mdpl', notes: ['karamel', 'cokelat hitam', 'cengkeh'], description: 'Hangat dan nyaman tanpa terasa berat. Sangrai seimbang untuk kamu yang menyukai kopi dengan rasa yang bertahan lama.', image: asset('darajat-series.webp') },
];

const promos = [
  { image: asset('kopi-garut-panen-rasa-banner.webp'), eyebrow: 'KOPI GARUT', title: 'Panen rasa dari Garut', description: 'Temukan kopi spesialti dari lereng pilihan.', cta: 'Lihat koleksi', route: '/catalog' },
  { image: asset('kopi-garut-kenali-kebun-pilihan-banner.webp'), eyebrow: 'ASAL YANG TERJAGA', title: 'Kenali kebun pilihan', description: 'Ikuti cerita kopi dari kebun sampai cangkir.', cta: 'Jelajahi asal', route: '/farmers' },
  { image: asset('kopi-garut-seduh-sambil-menjelajah-banner.webp'), eyebrow: 'PENGALAMAN KOPI', title: 'Seduh sambil menjelajah', description: 'Nikmati perjalanan rasa di dataran tinggi Garut.', cta: 'Lihat wisata', route: '/tourism' },
  { image: asset('kopi-garut-dari-lereng-ke-cangkir-banner.webp'), eyebrow: 'WILAYAH KOPI', title: 'Dari lereng ke cangkir', description: 'Temukan karakter unik dari setiap wilayah.', cta: 'Buka wilayah', route: '/regions' },
  { image: asset('kopi-garut-banyak-orang-banner.webp'), eyebrow: 'TUMBUH BERSAMA', title: 'Kopi Garut untuk banyak orang', description: 'Satu ekosistem untuk petani dan penikmat kopi.', cta: 'Jelajah ekosistem', route: '/collective' },
  { image: asset('kopi-garut-bangun-rantai-kopi-banner.webp'), eyebrow: 'JADI MITRA', title: 'Bangun rantai kopi bersama', description: 'Temukan peluang kolaborasi dengan ekosistem Garut.', cta: 'Lihat kemitraan', route: '/partnership' },
];

const categories: { label: string; icon: LucideIcon; route: string }[] = [
  { label: 'Kopi', icon: Coffee, route: '/catalog' },
  { label: 'Petani', icon: Users, route: '/farmers' },
  { label: 'Wilayah', icon: Map, route: '/regions' },
  { label: 'Wisata', icon: Compass, route: '/tourism' },
  { label: 'Event', icon: CalendarDays, route: '/events' },
  { label: 'Mitra', icon: BriefcaseBusiness, route: '/partnership' },
  { label: 'Ekosistem', icon: Package, route: '/collective' },
  { label: 'Program', icon: ShieldCheck, route: '/program' },
  { label: 'Keluhan', icon: Bell, route: '/complaints' },
  { label: 'Produk turunan', icon: Package, route: '/diversification' },
];

const stories = [
  [asset('event-coffee-tasting.webp'), 'Cupping Session Papandayan'],
  [asset('event-coffee-festival.webp'), 'Festival Kopi Garut'],
  [asset('event-postharvest-class.webp'), 'Belajar pascapanen'],
  [asset('event-coffee-workshop.webp'), 'Bertemu para peracik'],
];

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

function Header({ home = false }: { home?: boolean }) {
  const [, setLocation] = useLocation();
  const { cart } = useStore();
  return <header className={home ? 'header' : 'subpage-head'}>
    {home ? <div className="header-top">
       <div className="brand"><div className="logo-frame"><img src={asset('kopi-garut-logo.png')} alt="Logo Kopi Garut" /></div><div className="brand-lines"><div className="brand-name"><span>Kopi</span><strong>Garut</strong></div><div className="brand-meta">KOPI SPESIALTI · GARUT</div></div></div>
      <div className="header-actions"><button className="icon-orb" onClick={() => setLocation('/notifications')} aria-label="Buka notifikasi" data-testid="button-notifications"><Bell size={19} /></button><button className="icon-orb" onClick={() => setLocation('/cart')} aria-label="Buka keranjang" data-testid="button-cart"><ShoppingBag size={19} />{cart.length > 0 && <span className="count-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}</button></div>
    </div> : <><button className="back-button" onClick={() => setLocation('/')} aria-label="Kembali" data-testid="button-back"><ArrowLeft size={18} /></button><h1 className="page-title">Kopi <span>Garut</span></h1><div className="header-actions" style={{ marginLeft: 'auto' }}><button className="icon-orb" onClick={() => setLocation('/')} aria-label="Kembali ke beranda" data-testid="button-header-home"><Home size={18} /></button><button className="icon-orb" onClick={() => setLocation('/cart')} aria-label="Buka keranjang" data-testid="button-header-cart"><ShoppingBag size={18} />{cart.length > 0 && <span className="count-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}</button></div></>}
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
  const vouchers = [
    [{ discount: '15%', title: 'Kopi pilihan', code: 'GARUT15', note: 'Min 150K' }, { discount: '20%', title: 'Panen baru', code: 'PANEN20', note: 'Koleksi natural' }],
    [{ discount: '25K', title: 'Ongkir hemat', code: 'KIRIM25', note: 'Min 200K' }, { discount: '10%', title: 'Teman ngopi', code: 'NGOPI10', note: 'Ajak teman' }],
    [{ discount: '30K', title: 'Kopi pertama', code: 'AWAL30', note: 'Pengguna baru' }, { discount: '15%', title: 'Petani pilihan', code: 'PETANI15', note: 'Kopi Garut' }],
    [{ discount: '10%', title: 'Langganan', code: 'RUTIN10', note: 'Pesanan rutin' }, { discount: '20%', title: 'Akhir pekan', code: 'WEEK20', note: 'Sabtu–Minggu' }],
  ];
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
  const diversified = [
    { image: 'coffee-essential-oil.webp', category: 'Aroma & perawatan', title: 'Essential oil kopi', price: 'Rp 55.000', badge: 'Produk baru' },
    { image: 'coffee-shoe-deodorizer.webp', category: 'Aroma & perawatan', title: 'Pewangi sepatu kopi', price: 'Rp 32.000', badge: 'Upcycle ampas' },
    { image: 'coffee-aroma-oil.webp', category: 'Aroma & perawatan', title: 'Minyak aroma kopi', price: 'Rp 42.000', badge: 'Produk UMKM' },
  ];
  return <Page><Header home /><main className="screen-section"><SearchEntry /><PromoCarousel /><CategoryTiles /><StoryLead /><VoucherCarousel /><SectionTitle title="Untuk cangkir pertama" action="Lihat semua" onAction={() => setLocation('/catalog')} /><div className="horizontal-scroll hide-scrollbar">{coffees.slice(0, 2).map((coffee) => <ProductCard coffee={coffee} key={coffee.id} />)}</div><SectionTitle title="Lebih dari secangkir" action="Lihat semua" onAction={() => setLocation('/diversification')} /><div className="horizontal-scroll hide-scrollbar">{diversified.map((product) => <article className="diversified-card" key={product.title} onClick={() => setLocation('/diversification')}><div className="diversified-image"><img src={asset(product.image)} alt={product.title} /><span>{product.badge}</span></div><div className="diversified-body"><small>{product.category}</small><strong>{product.title}</strong><div>{product.price} <ArrowRight size={13} /></div></div></article>)}</div><SectionTitle title="Mulai dari selera" action="Jelajahi" onAction={() => setLocation('/catalog')} /><div className="taste-grid">{[['Cerah & manis', 'Lemon, melati, gula merah', 'coffee-bean-menu-original.webp', '/product/papandayan-honey'], ['Buah & juicy', 'Stroberi, kakao, molase', 'coffee-palm-sugar-concentrate.webp', '/product/cikajang-natural'], ['Hangat & nyaman', 'Karamel, cokelat, rempah', 'garut-mug.webp', '/product/samarang-dark']].map(([title, detail, image, route], index) => <button key={title} className={`taste-card ${index === 1 ? 'featured' : ''}`} onClick={() => setLocation(route)}><img src={asset(image)} alt="" /><div className="taste-shade" /><strong>{title}</strong><span>{detail}</span><ArrowRight size={14} /></button>)}</div><SectionTitle title="Orang di balik rasa" action="Semua petani" onAction={() => setLocation('/farmers')} /><div className="horizontal-scroll hide-scrollbar story-rail">{stories.map(([image, title]) => <div className="story-card" key={title}><img src={image} alt={title} /><div className="story-title">{title}</div></div>)}</div></main><FloatingBadges /></Page>;
}

function Page({ children }: { children: ReactNode }) {
  return <div className="app-viewport"><div className="app-page">{children}</div><BottomNav /></div>;
}

function CatalogPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');
  const filters = ['Semua', 'Cerah', 'Buah', 'Harian', 'Nyaman'];
  const filtered = useMemo(() => coffees.filter((coffee) => (filter === 'Semua' || coffee.tagline.toLowerCase().includes(filter.toLowerCase()) || (filter === 'Cerah' && coffee.id === 'papandayan-honey') || (filter === 'Buah' && coffee.id === 'cikajang-natural') || (filter === 'Harian' && coffee.id === 'talaga-washed') || (filter === 'Nyaman' && coffee.id === 'samarang-dark')) && `${coffee.name} ${coffee.origin} ${coffee.tagline}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);
  return <Page><Header /><main className="subpage"><div className="subcopy">Kopi spesialti dan cerita dari lereng-lereng pilihan Garut.</div><SearchEntry catalog value={query} onChange={setQuery} /><div className="filter-pills">{filters.map((item) => <button className={`filter-pill ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)} key={item} data-testid={`filter-${item.toLowerCase()}`}>{item}</button>)}</div><div className="product-grid">{filtered.map((coffee) => <ProductCard key={coffee.id} coffee={coffee} />)}</div>{!filtered.length && <EmptyState icon={Search} title="Belum ada yang cocok" text="Coba kata kunci lain untuk menemukan kopi favoritmu." action="Bersihkan pencarian" onAction={() => setQuery('')} />}</main></Page>;
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
  return <Page><main className="subpage"><Header /><div className="profile-hero"><div className="avatar">AR</div><div><h2>Aruna Rahma</h2><p>Pecinta kopi dari Garut</p></div></div><div className="profile-menu"><button onClick={() => setLocation('/orders')} data-testid="profile-orders"><ShoppingBag size={18} /><span>Riwayat pesanan</span><ChevronRight size={16} /></button><button onClick={() => setLocation('/favorites')} data-testid="profile-favorites"><Heart size={18} /><span>Kopi favorit</span><ChevronRight size={16} /></button><button onClick={() => setLocation('/notifications')} data-testid="profile-notifications"><Bell size={18} /><span>Notifikasi</span><ChevronRight size={16} /></button><button onClick={() => setLocation('/profile/settings')} data-testid="profile-settings"><Settings size={18} /><span>Pengaturan akun</span><ChevronRight size={16} /></button></div></main></Page>;
}

function NotificationsPage() {
  return <Page><main className="subpage"><Header /><div className="subcopy">Kabar kecil dari ekosistem Kopi Garut.</div><div className="info-card"><h3>Panen baru sudah tiba</h3><p>Papandayan Series dari Cisurupan baru saja masuk ke katalog. Rasa lemon Meyer dan gula merahnya sedang paling dicari.</p></div><div className="info-card"><h3>Selamat datang di Kopi Garut</h3><p>Kenali kopi dari kebun, petani, dan wilayah yang membuat setiap cangkir punya cerita.</p></div></main></Page>;
}

function SimpleHubPage({ title, copy, icon: Icon }: { title: string; copy: string; icon: LucideIcon }) {
  return <Page><main className="subpage"><Header /><div className="info-card" style={{ padding: 22, marginTop: 8 }}><div className="empty-icon" style={{ margin: '0 0 14px' }}><Icon size={25} /></div><h3 style={{ fontSize: 20 }}>{title}</h3><p>{copy}</p></div></main></Page>;
}

function AppRouter() {
  return <Switch><Route path="/" component={HomePage} /><Route path="/catalog" component={CatalogPage} /><Route path="/product/:id" component={ProductDetailPage} /><Route path="/cart" component={CartPage} /><Route path="/favorites" component={FavoritesPage} /><Route path="/orders" component={OrdersPage} /><Route path="/profile" component={ProfilePage} /><Route path="/notifications" component={NotificationsPage} /><Route path="/traceability"><SimpleHubPage title="Jejak produk" copy="Telusuri perjalanan kopi Garut dari kebun, proses, hingga cangkir." icon={Search} /></Route><Route path="/farmers"><SimpleHubPage title="Petani Garut" copy="Kenali keluarga tani dan kelompok yang merawat kopi dari musim ke musim." icon={Users} /></Route><Route path="/regions"><SimpleHubPage title="Wilayah kopi" copy="Temukan karakter unik Papandayan, Cikuray, Kamojang, dan Darajat." icon={MapPin} /></Route><Route path="/tourism"><SimpleHubPage title="Wisata kopi" copy="Berjalan di kebun, belajar prosesnya, lalu menikmati seduhan dari asalnya." icon={Compass} /></Route><Route path="/events"><SimpleHubPage title="Event Kopi Garut" copy="Temu petani, roastery, barista, dan pecinta kopi dalam satu kalender." icon={CalendarDays} /></Route><Route path="/partnership"><SimpleHubPage title="Jadi mitra" copy="Bangun rantai kopi bersama kedai, hotel, UMKM, dan pelaku usaha." icon={BriefcaseBusiness} /></Route><Route path="/collective"><SimpleHubPage title="Ekosistem Kopi Garut" copy="Satu ruang untuk produksi, pascapanen, bisnis, edukasi, dan cerita kopi." icon={Package} /></Route><Route path="/program"><SimpleHubPage title="Program kopi" copy="Dukungan, pelatihan, dan program yang menjaga kualitas kopi Garut." icon={Sparkles} /></Route><Route path="/diversification"><SimpleHubPage title="Produk turunan" copy="Temukan olahan kopi, aroma, perawatan, dan merchandise dari ekosistem Garut." icon={Package} /></Route><Route path="/complaints"><SimpleHubPage title="Keluhan" copy="Sampaikan kendala dan bantu kami menjaga pengalaman Kopi Garut." icon={Bell} /></Route><Route path="/profile/settings"><SimpleHubPage title="Pengaturan akun" copy="Preferensi akun dan pengalaman belanja Kopi Garut." icon={Settings} /></Route><Route><SimpleHubPage title="Halaman belum ditemukan" copy="Coba kembali ke beranda Kopi Garut." icon={Home} /></Route></Switch>;
}

function App() {
  return <StoreProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><AppRouter /></WouterRouter></StoreProvider>;
}

export default App;