export const brandTokens = {
  background: '#F6F0E8',
  foreground: '#2A201D',
  border: '#DFD1C1',
  input: '#D4C2B1',
  card: '#FFF9F1',
  cardForeground: '#2A201D',
  primary: '#A8543B',
  primaryForeground: '#FFF9F1',
  secondary: '#E7D9C8',
  secondaryForeground: '#3D2C26',
  muted: '#EDE3D6',
  mutedForeground: '#806E63',
  accent: '#D3A15F',
  accentForeground: '#3D2C26',
  destructive: '#B84E45',
  destructiveForeground: '#FFF9F1',
  brandHighlight: '#FFD84D',
} as const;

export type HomeRoute =
  | '/catalog'
  | '/farmers'
  | '/tourism'
  | '/regions'
  | '/collective'
  | '/partnership'
  | '/events'
  | '/program'
  | '/complaints'
  | '/diversification';

export type HomeIconName =
  | 'coffee'
  | 'users'
  | 'map'
  | 'compass'
  | 'calendar'
  | 'briefcase'
  | 'grid'
  | 'shield'
  | 'alert-circle'
  | 'package';

export type SharedPromoSlide = {
  id: string;
  route: HomeRoute;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
};

export type SharedCategoryItem = {
  icon: HomeIconName;
  label: string;
  route: HomeRoute;
};

export type SharedVoucher = {
  discount: string;
  title: string;
  code: string;
  note: string;
  variant: 'primary' | 'dark';
};

export type SharedStory = {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  type: string;
  description: string;
};

export type SharedHomeProduct = {
  id: string;
  category: 'Olahan kopi' | 'Aroma & perawatan' | 'Merchandise';
  title: string;
  price: string;
  image: string;
  badge: string;
};

export type SharedCoffee = {
  id: string;
  name: string;
  series: string;
  tagline: string;
  price: number;
  roast: string;
  process: string;
  altitude: string;
  origin: string;
  tastingNotes: string[];
  description: string;
  image: string;
  category: string;
  recommendedBrew: string;
  farmerName: string;
  farmerGroup: string;
  stock: number;
  badge?: string;
};

export const homeContent = {
  promoSlides: [
    {
      id: 'garut-promo',
      route: '/catalog',
      image: 'kopi-garut-panen-rasa-banner.webp',
      eyebrow: 'KOPI GARUT',
      title: 'Panen rasa dari Garut',
      description: 'Temukan kopi spesialti dari lereng pilihan.',
      cta: 'Lihat koleksi',
    },
    {
      id: 'traceability',
      route: '/farmers',
      image: 'kopi-garut-kenali-kebun-pilihan-banner.webp',
      eyebrow: 'ASAL YANG TERJAGA',
      title: 'Kenali kebun pilihan',
      description: 'Ikuti cerita kopi dari kebun sampai cangkir.',
      cta: 'Jelajahi asal',
    },
    {
      id: 'coffee-tour',
      route: '/tourism',
      image: 'kopi-garut-seduh-sambil-menjelajah-banner.webp',
      eyebrow: 'PENGALAMAN KOPI',
      title: 'Seduh sambil menjelajah',
      description: 'Nikmati perjalanan rasa di dataran tinggi Garut.',
      cta: 'Lihat wisata',
    },
    {
      id: 'coffee-regions',
      route: '/regions',
      image: 'kopi-garut-dari-lereng-ke-cangkir-banner.webp',
      eyebrow: 'WILAYAH KOPI',
      title: 'Dari lereng ke cangkir',
      description: 'Temukan karakter unik dari setiap wilayah.',
      cta: 'Buka wilayah',
    },
    {
      id: 'coffee-collective',
      route: '/collective',
      image: 'kopi-garut-banyak-orang-banner.webp',
      eyebrow: 'TUMBUH BERSAMA',
      title: 'Kopi Garut untuk banyak orang',
      description: 'Satu ekosistem untuk petani dan penikmat kopi.',
      cta: 'Jelajah ekosistem',
    },
    {
      id: 'coffee-partnership',
      route: '/partnership',
      image: 'kopi-garut-bangun-rantai-kopi-banner.webp',
      eyebrow: 'JADI MITRA',
      title: 'Bangun rantai kopi bersama',
      description: 'Temukan peluang kolaborasi dengan ekosistem Garut.',
      cta: 'Lihat kemitraan',
    },
  ] satisfies SharedPromoSlide[],

  categories: [
    { icon: 'coffee', label: 'Kopi', route: '/catalog' },
    { icon: 'users', label: 'Petani', route: '/farmers' },
    { icon: 'map', label: 'Wilayah', route: '/regions' },
    { icon: 'compass', label: 'Wisata', route: '/tourism' },
    { icon: 'calendar', label: 'Event', route: '/events' },
    { icon: 'briefcase', label: 'Mitra', route: '/partnership' },
    { icon: 'grid', label: 'Ekosistem', route: '/collective' },
    { icon: 'shield', label: 'Program', route: '/program' },
    { icon: 'alert-circle', label: 'Keluhan', route: '/complaints' },
    { icon: 'package', label: 'Produk turunan', route: '/diversification' },
  ] satisfies SharedCategoryItem[],

  vouchers: [
    [
      { discount: '15%', title: 'Kopi pilihan', code: 'GARUT15', note: 'Min 150K', variant: 'primary' },
      { discount: '20%', title: 'Panen baru', code: 'PANEN20', note: 'Koleksi natural', variant: 'dark' },
    ],
    [
      { discount: '25K', title: 'Ongkir hemat', code: 'KIRIM25', note: 'Min 200K', variant: 'dark' },
      { discount: '10%', title: 'Teman ngopi', code: 'NGOPI10', note: 'Ajak teman', variant: 'primary' },
    ],
    [
      { discount: '30K', title: 'Kopi pertama', code: 'AWAL30', note: 'Pengguna baru', variant: 'primary' },
      { discount: '15%', title: 'Petani pilihan', code: 'PETANI15', note: 'Kopi Garut', variant: 'dark' },
    ],
    [
      { discount: '10%', title: 'Langganan', code: 'RUTIN10', note: 'Pesanan rutin', variant: 'dark' },
      { discount: '20%', title: 'Akhir pekan', code: 'WEEK20', note: 'Sabtu–Minggu', variant: 'primary' },
    ],
  ] satisfies SharedVoucher[][],

  stories: [
    { id: 'coffee-talk-garut', title: 'Coffee Talk Garut: Dari Kebun ke Cangkir', image: 'event-coffee-tasting.webp', date: '10 Oktober 2026', location: 'Kota Garut', type: 'Coffee Talk', description: 'Obrolan rutin bersama petani, roaster, barista, dan pelaku usaha tentang masa depan kopi Garut.' },
    { id: 'festival-kopi', title: 'Festival Kopi Garut 2026', image: 'event-coffee-festival.webp', date: '3–4 Oktober 2026', location: 'Alun-alun Garut', type: 'Festival', description: 'Temu petani, roastery, cafe, dan pecinta kopi dalam satu perayaan.' },
    { id: 'kelas-pascapanen', title: 'Kelas Pascapanen untuk Kelompok Tani', image: 'event-postharvest-class.webp', date: '17 Oktober 2026', location: 'Cikajang', type: 'Pelatihan', description: 'Praktik sortasi, fermentasi, dan pengeringan untuk menjaga nilai jual kopi.' },
    { id: 'sekolah-barista', title: 'Sekolah Barista Kopi Garut — Batch 01', image: 'event-coffee-workshop.webp', date: '24 Oktober 2026', location: 'Kota Garut', type: 'Sekolah Barista', description: 'Kelas dasar espresso, manual brew, pelayanan, dan cerita asal kopi untuk barista baru.' },
    { id: 'temu-cafe', title: 'Temu Mitra Cafe', image: 'event-cafe-partners.webp', date: '7 November 2026', location: 'Kota Garut', type: 'Kemitraan', description: 'Sesi temu usaha untuk memperluas akses kopi Garut ke kedai-kedai Indonesia.' },
    { id: 'cupping-papandayan', title: 'Cupping Session Papandayan', image: 'event-cupping-papandayan.webp', date: '14 November 2026', location: 'Cisurupan', type: 'Cupping', description: 'Mencicipi profil rasa dari kebun Papandayan bersama petani dan roaster lokal.' },
    { id: 'pasar-kopi-garut', title: 'Pasar Kopi Garut', image: 'event-coffee-market.webp', date: '28 November 2026', location: 'Pendopo Garut', type: 'Pasar kopi', description: 'Temukan biji kopi, produk olahan, dan cerita dari pelaku ekosistem kopi Garut.' },
    { id: 'kelas-brew-di-rumah', title: 'Kelas Seduh di Rumah', image: 'event-home-brew.webp', date: '5 Desember 2026', location: 'Kota Garut', type: 'Kelas', description: 'Belajar menyeduh kopi Garut dengan alat sederhana dan resep yang mudah diikuti.' },
  ] satisfies SharedStory[],

  diversifiedProducts: [
    { id: 'essential-oil-kopi', category: 'Aroma & perawatan', title: 'Essential oil kopi', price: 'Rp 55.000', image: 'coffee-essential-oil.webp', badge: 'Produk baru' },
    { id: 'pewangi-sepatu-kopi', category: 'Aroma & perawatan', title: 'Pewangi sepatu kopi', price: 'Rp 32.000', image: 'coffee-shoe-deodorizer.webp', badge: 'Upcycle ampas' },
    { id: 'minyak-aroma-kopi', category: 'Aroma & perawatan', title: 'Minyak aroma kopi', price: 'Rp 42.000', image: 'coffee-aroma-oil.webp', badge: 'Produk UMKM' },
    { id: 'coffee-concentrate', category: 'Olahan kopi', title: 'Konsentrat kopi gula aren', price: 'Rp 28.000', image: 'coffee-palm-sugar-concentrate.webp', badge: 'Favorit baru' },
    { id: 'coffee-cookies', category: 'Olahan kopi', title: 'Cookies ampas kopi', price: 'Rp 35.000', image: 'coffee-cookies.webp', badge: 'Batch kecil' },
  ] satisfies SharedHomeProduct[],
} as const;

export const coffeeCatalog = [
  {
    id: 'papandayan-honey',
    name: 'Papandayan Series',
    series: 'Papandayan Series',
    tagline: 'Pagi cerah dari dataran tinggi.',
    price: 118000,
    roast: 'Ringan–sedang',
    process: 'Madu',
    altitude: '1.650 mdpl',
    origin: 'Cisurupan, Garut',
    tastingNotes: ['lemon Meyer', 'gula merah', 'melati'],
    description: 'Diproses dengan sinar matahari secara cermat, lot ini membawa udara sejuk Gunung Papandayan ke dalam cangkir yang manis dari tegukan pertama hingga terakhir.',
    image: 'papandayan-series.webp',
    category: 'Cerah',
    recommendedBrew: 'Seduh tuang',
    farmerName: 'H. Asep Rahmat',
    farmerGroup: 'KTH Papandayan Lestari',
    stock: 86,
    badge: 'Favorit rumah',
  },
  {
    id: 'cikajang-natural',
    name: 'Cikuray Series',
    series: 'Cikuray Series',
    tagline: 'Buah beri, kakao lembut, akhir rasa panjang.',
    price: 132000,
    roast: 'Sedang',
    process: 'Natural',
    altitude: '1.450 mdpl',
    origin: 'Cikajang, Garut',
    tastingNotes: ['stroberi', 'biji kakao', 'molase'],
    description: 'Kopi natural yang dikeringkan perlahan dengan rasa buah yang kaya dan akhir rasa hangat. Cocok untuk pagi yang santai dan cangkir kedua.',
    image: 'cikuray-series.webp',
    category: 'Buah',
    recommendedBrew: 'Aeropress',
    farmerName: 'Iis Nurhayati',
    farmerGroup: 'KTH Cikuray Mandiri',
    stock: 52,
    badge: 'Lot kecil',
  },
  {
    id: 'talaga-washed',
    name: 'Kamojang Series',
    series: 'Kamojang Series',
    tagline: 'Bersih, tenang, kaya rasa.',
    price: 105000,
    roast: 'Sedang–ringan',
    process: 'Cuci',
    altitude: '1.300 mdpl',
    origin: 'Pakenjeng, Garut',
    tastingNotes: ['buah batu', 'almon', 'teh hitam'],
    description: 'Kopi harian yang seimbang dengan struktur seperti teh dan rasa manis yang pas untuk menemani hari kerja yang fokus.',
    image: 'kamojang-series.webp',
    category: 'Harian',
    recommendedBrew: 'V60',
    farmerName: 'Deni Suhendar',
    farmerGroup: 'Kelompok Tani Talaga',
    stock: 74,
  },
  {
    id: 'samarang-dark',
    name: 'Darajat Series',
    series: 'Darajat Series',
    tagline: 'Karamel pekat untuk pagi yang terlambat.',
    price: 99000,
    roast: 'Sedang–gelap',
    process: 'Madu',
    altitude: '1.180 mdpl',
    origin: 'Samarang, Garut',
    tastingNotes: ['karamel', 'cokelat hitam', 'cengkeh'],
    description: 'Hangat dan nyaman tanpa terasa berat. Sangrai seimbang untuk kamu yang menyukai kopi dengan rasa yang bertahan lama.',
    image: 'darajat-series.webp',
    category: 'Nyaman',
    recommendedBrew: 'French press',
    farmerName: 'Ujang Kusnadi',
    farmerGroup: 'KTH Darajat Sejahtera',
    stock: 31,
  },
] satisfies SharedCoffee[];

export type AuthRole = 'pengguna' | 'petani' | 'penyuluh';

export type RoleProfile = {
  id: AuthRole;
  name: string;
  label: string;
  description: string;
  initials: string;
};

export const roleProfiles = [
  {
    id: 'pengguna',
    name: 'Aruna Rahma',
    label: 'Pembeli',
    description: 'Jelajahi kopi, simpan favorit, dan kirim usulan dukungan.',
    initials: 'AR',
  },
  {
    id: 'petani',
    name: 'Asep Hidayat',
    label: 'Petani',
    description: 'Kelola verifikasi kebun, mutu lot, dan akses pasar.',
    initials: 'AH',
  },
  {
    id: 'penyuluh',
    name: 'Rani Permata',
    label: 'Penyuluh',
    description: 'Catat kunjungan lapangan dan tindak lanjut kebun.',
    initials: 'RP',
  },
] satisfies RoleProfile[];

export const protectedRouteRoles: Record<string, AuthRole[]> = {
  '/verification': ['petani'],
  '/standards': ['pengguna', 'petani', 'penyuluh'],
  '/quality-check': ['petani'],
  '/harvest-log': ['petani'],
  '/sales-submissions': ['petani'],
  '/farm-costs': ['petani'],
  '/payment-records': ['petani'],
  '/farm-issues': ['petani'],
  '/farm-calendar': ['petani'],
  '/curation': ['petani'],
  '/group-dashboard': ['petani'],
  '/extension-dashboard': ['penyuluh'],
  '/extension-visits': ['penyuluh'],
  '/extension-training': ['penyuluh'],
  '/extension-reports': ['penyuluh'],
  '/extension-map': ['penyuluh'],
  '/extension-farmers': ['penyuluh'],
  '/extension-issues': ['penyuluh'],
  '/reports': ['pengguna', 'petani', 'penyuluh'],
  '/notifications': ['pengguna', 'petani', 'penyuluh'],
  '/documents': ['pengguna', 'petani', 'penyuluh'],
};

export const authSessionStorageKey = '@kopi/auth-session';

export function canAccessRoute(route: string, role?: AuthRole | null) {
  const allowedRoles = protectedRouteRoles[route];
  return !allowedRoles || Boolean(role && allowedRoles.includes(role));
}

export function getRoleProfile(role: AuthRole) {
  return roleProfiles.find((profile) => profile.id === role) ?? roleProfiles[0];
}