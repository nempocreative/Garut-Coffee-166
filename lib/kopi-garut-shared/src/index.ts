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
  mutedForeground: '#6F584D',
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
  | 'graduation-cap'
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

export type SharedFarmer = {
  id: string;
  name: string;
  group: string;
  location: string;
  landArea: string;
  annualProduction: string;
  coffeeType: string;
  joinedAt: string;
  membershipId: string;
  products: string[];
  image: string;
  story: string;
};

export type SharedRegion = {
  id: string;
  name: string;
  village: string;
  elevation: string;
  farmerCount: number;
  specialty: string;
  image: string;
};

export type SharedCoffeeTour = {
  id: string;
  title: string;
  type: string;
  duration: string;
  price: number;
  location: string;
  description: string;
  image: string;
};

export type SharedDiversificationCategory = 'Semua' | 'Olahan kopi' | 'Aroma & perawatan' | 'Merchandise';

export type SharedDiversifiedProduct = {
  id: string;
  category: Exclude<SharedDiversificationCategory, 'Semua'>;
  icon: HomeIconName;
  title: string;
  price: string;
  status: string;
  image: string;
  badge: string;
  description?: string;
  maker?: string;
  impact?: string;
  size?: string;
};

export const homeContent = {
  promoSlides: [
    {
      id: 'garut-promo',
      route: '/catalog',
      image: 'kopi-garut-panen-rasa-banner.webp',
      eyebrow: 'GARUT BEANS · G-BEANS',
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
      title: 'Garut Beans G-Beans untuk banyak orang',
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
    { icon: 'graduation-cap', label: 'Program', route: '/program' },
    { icon: 'alert-circle', label: 'Keluhan', route: '/complaints' },
    { icon: 'package', label: 'Karya kopi', route: '/diversification' },
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
      { discount: '15%', title: 'Petani pilihan', code: 'PETANI15', note: 'Garut Beans G-Beans', variant: 'dark' },
    ],
    [
      { discount: '10%', title: 'Langganan', code: 'RUTIN10', note: 'Pesanan rutin', variant: 'dark' },
      { discount: '20%', title: 'Akhir pekan', code: 'WEEK20', note: 'Sabtu–Minggu', variant: 'primary' },
    ],
  ] satisfies SharedVoucher[][],

  stories: [
    { id: 'coffee-talk-garut', title: 'Coffee Talk Garut: Dari Kebun ke Cangkir', image: 'event-coffee-tasting.webp', date: '10 Oktober 2026', location: 'Kota Garut', type: 'Coffee Talk', description: 'Obrolan rutin bersama petani, roaster, barista, dan pelaku usaha tentang masa depan kopi Garut.' },
    { id: 'festival-kopi', title: 'Festival Garut Beans G-Beans 2026', image: 'event-coffee-festival.webp', date: '3–4 Oktober 2026', location: 'Alun-alun Garut', type: 'Festival', description: 'Temu petani, roastery, cafe, dan pecinta kopi dalam satu perayaan.' },
    { id: 'kelas-pascapanen', title: 'Kelas Pascapanen untuk Kelompok Tani', image: 'event-postharvest-class.webp', date: '17 Oktober 2026', location: 'Cikajang', type: 'Pelatihan', description: 'Praktik sortasi, fermentasi, dan pengeringan untuk menjaga nilai jual kopi.' },
    { id: 'sekolah-barista', title: 'Sekolah Barista Garut Beans G-Beans — Batch 01', image: 'event-coffee-workshop.webp', date: '24 Oktober 2026', location: 'Kota Garut', type: 'Sekolah Barista', description: 'Kelas dasar espresso, manual brew, pelayanan, dan cerita asal kopi untuk barista baru.' },
    { id: 'temu-cafe', title: 'Temu Mitra Cafe', image: 'event-cafe-partners.webp', date: '7 November 2026', location: 'Kota Garut', type: 'Kemitraan', description: 'Sesi temu usaha untuk memperluas akses kopi Garut ke kedai-kedai Indonesia.' },
    { id: 'cupping-papandayan', title: 'Cupping Session Papandayan', image: 'event-cupping-papandayan.webp', date: '14 November 2026', location: 'Cisurupan', type: 'Cupping', description: 'Mencicipi profil rasa dari kebun Papandayan bersama petani dan roaster lokal.' },
    { id: 'pasar-kopi-garut', title: 'Pasar Garut Beans G-Beans', image: 'event-coffee-market.webp', date: '28 November 2026', location: 'Pendopo Garut', type: 'Pasar kopi', description: 'Temukan biji kopi, produk olahan, dan cerita dari pelaku ekosistem kopi Garut.' },
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
  {
    id: 'garut-house-blend',
    name: 'Garut House Blend',
    series: 'Garut House Blend',
    tagline: 'Manis seimbang untuk teman setiap hari.',
    price: 110000,
    roast: 'Sedang',
    process: 'Campuran lot',
    altitude: '1.300–1.650 mdpl',
    origin: 'Garut, Jawa Barat',
    tastingNotes: ['gula aren', 'cokelat susu', 'jeruk'],
    description: 'Racikan seimbang dari beberapa lot pilihan Garut, dibuat untuk seduhan harian yang mudah disukai dan tetap punya cerita asal.',
    image: 'origin-coffee.webp',
    category: 'Seimbang',
    recommendedBrew: 'Tubruk',
    farmerName: 'Kolektif Petani Garut',
    farmerGroup: 'G-BEANS Collective',
    stock: 68,
    badge: 'Pilihan baru',
  },
  {
    id: 'papandayan-reserve',
    name: 'Papandayan Reserve',
    series: 'Papandayan Reserve',
    tagline: 'Bunga putih dan gula batu yang bersih.',
    price: 145000,
    roast: 'Ringan',
    process: 'Madu',
    altitude: '1.700 mdpl',
    origin: 'Cisurupan, Garut',
    tastingNotes: ['melati', 'gula batu', 'apel'],
    description: 'Lot pilihan dengan rasa yang jernih dan wangi bunga, dirawat perlahan untuk menjaga karakter dataran tinggi Papandayan.',
    image: 'hero-coffee.webp',
    category: 'Floral',
    recommendedBrew: 'Kalita',
    farmerName: 'Rani Permata',
    farmerGroup: 'KTH Papandayan Lestari',
    stock: 28,
    badge: 'Lot spesial',
  },
  {
    id: 'cikajang-honey',
    name: 'Cikajang Honey',
    series: 'Cikajang Honey',
    tagline: 'Manis buah dan akhir rasa hangat.',
    price: 128000,
    roast: 'Sedang–ringan',
    process: 'Madu',
    altitude: '1.480 mdpl',
    origin: 'Cikajang, Garut',
    tastingNotes: ['buah tropis', 'madu', 'cokelat'],
    description: 'Kopi dengan manis alami yang tebal dan tekstur lembut untuk seduhan yang terasa penuh tanpa kehilangan kesegarannya.',
    image: 'coffee-beans-natural.webp',
    category: 'Manis',
    recommendedBrew: 'Chemex',
    farmerName: 'Iis Nurhayati',
    farmerGroup: 'KTH Cikuray Mandiri',
    stock: 46,
    badge: 'Favorit baru',
  },
  {
    id: 'kamojang-reserve',
    name: 'Kamojang Reserve',
    series: 'Kamojang Reserve',
    tagline: 'Teh hitam, buah batu, dan akhir bersih.',
    price: 122000,
    roast: 'Sedang',
    process: 'Cuci',
    altitude: '1.340 mdpl',
    origin: 'Pakenjeng, Garut',
    tastingNotes: ['teh hitam', 'persik', 'almon'],
    description: 'Profil bersih dari kebun tinggi Kamojang dengan struktur ringan dan rasa yang tetap hadir setelah cangkir selesai.',
    image: 'coffee-bean-menu-original.webp',
    category: 'Bersih',
    recommendedBrew: 'V60',
    farmerName: 'Deni Suhendar',
    farmerGroup: 'Kelompok Tani Talaga',
    stock: 39,
    badge: 'Musim ini',
  },
  {
    id: 'darajat-sunset',
    name: 'Darajat Sunset',
    series: 'Darajat Sunset',
    tagline: 'Cokelat, karamel, dan rempah lembut.',
    price: 115000,
    roast: 'Sedang–gelap',
    process: 'Madu',
    altitude: '1.200 mdpl',
    origin: 'Samarang, Garut',
    tastingNotes: ['karamel', 'cokelat', 'rempah'],
    description: 'Sangrai hangat yang cocok untuk sore panjang, dengan rasa manis yang nyaman dan aroma rempah yang pelan-pelan muncul.',
    image: 'coffee-bean-menu.webp',
    category: 'Hangat',
    recommendedBrew: 'French press',
    farmerName: 'Ujang Kusnadi',
    farmerGroup: 'KTH Darajat Sejahtera',
    stock: 34,
    badge: 'Rasa hangat',
  },
  {
    id: 'garut-origin-selection',
    name: 'Garut Origin Selection',
    series: 'Garut Origin Selection',
    tagline: 'Koleksi karakter Garut dalam satu seduhan.',
    price: 135000,
    roast: 'Sedang',
    process: 'Pilihan lot',
    altitude: '1.180–1.700 mdpl',
    origin: 'Garut, Jawa Barat',
    tastingNotes: ['jeruk', 'gula aren', 'kakao'],
    description: 'Pilihan lot yang merangkum rasa khas Garut: cerah, manis, dan mudah dinikmati untuk memulai ritual kopi harian.',
    image: 'origin-coffee.webp',
    category: 'Koleksi',
    recommendedBrew: 'Origami',
    farmerName: 'Kolektif Petani Garut',
    farmerGroup: 'G-BEANS Collective',
    stock: 55,
    badge: 'Koleksi G-BEANS',
  },
] satisfies SharedCoffee[];

export const hubStats = [
  { label: 'Petani terdaftar', value: '125' },
  { label: 'Luas lahan', value: '486 ha' },
  { label: 'Produksi tahunan', value: '312 ton' },
  { label: 'Wilayah aktif', value: '12' },
] as const;

export const farmers = [
  {
    id: 'asep-rahmat',
    name: 'H. Asep Rahmat',
    group: 'KTH Papandayan Lestari',
    location: 'Cisurupan, Garut',
    landArea: '1,8 hektare',
    annualProduction: '4,2 ton cherry',
    coffeeType: 'Arabika Typica',
    joinedAt: '12 Maret 2021',
    membershipId: 'KGR-CIS-001',
    products: ['Papandayan Series'],
    image: 'farmer-asep-rahmat.webp',
    story: 'Menjaga kualitas dari pemetikan hingga pengeringan bersama anggota kelompok tani.',
  },
  {
    id: 'iis-nurhayati',
    name: 'Iis Nurhayati',
    group: 'KTH Cikuray Mandiri',
    location: 'Cikajang, Garut',
    landArea: '1,2 hektare',
    annualProduction: '2,8 ton cherry',
    coffeeType: 'Arabika Sigarar Utang',
    joinedAt: '8 Juli 2022',
    membershipId: 'KGR-CIK-014',
    products: ['Cikuray Series'],
    image: 'farmer-iis-nurhayati.webp',
    story: 'Mengolah kopi natural dengan sabar untuk menjaga rasa buah yang menjadi ciri kebunnya.',
  },
  {
    id: 'deni-suhendar',
    name: 'Deni Suhendar',
    group: 'Kelompok Tani Talaga',
    location: 'Pakenjeng, Garut',
    landArea: '2,4 hektare',
    annualProduction: '5,1 ton cherry',
    coffeeType: 'Arabika Lini S',
    joinedAt: '19 Januari 2020',
    membershipId: 'KGR-PAK-008',
    products: ['Kamojang Series'],
    image: 'farmer-deni-suhendar.webp',
    story: 'Membangun kebun yang produktif sambil mempertahankan naungan alami di lereng pegunungan.',
  },
  {
    id: 'ujang-kusnadi',
    name: 'Ujang Kusnadi',
    group: 'KTH Darajat Sejahtera',
    location: 'Samarang, Garut',
    landArea: '0,9 hektare',
    annualProduction: '1,9 ton cherry',
    coffeeType: 'Arabika Ateng',
    joinedAt: '27 September 2023',
    membershipId: 'KGR-SAM-021',
    products: ['Darajat Series'],
    image: 'farmer-ujang-kusnadi.webp',
    story: 'Mengembangkan kopi sangrai yang nyaman untuk dinikmati di rumah maupun di kedai mitra.',
  },
] satisfies SharedFarmer[];

export const regions = [
  { id: 'papandayan', name: 'Papandayan', village: 'Cisurupan', elevation: '1.650 mdpl', farmerCount: 42, specialty: 'Rasa cerah dan manis', image: 'regions-banner.webp' },
  { id: 'cikuray', name: 'Cikuray', village: 'Cikajang', elevation: '1.450 mdpl', farmerCount: 36, specialty: 'Buah tropis dan kakao', image: 'cikuray-series.webp' },
  { id: 'kamojang', name: 'Kamojang', village: 'Pakenjeng', elevation: '1.300 mdpl', farmerCount: 28, specialty: 'Bersih dan seimbang', image: 'kopi-garut-dari-lereng-ke-cangkir-banner.webp' },
  { id: 'darajat', name: 'Darajat', village: 'Samarang', elevation: '1.180 mdpl', farmerCount: 19, specialty: 'Karamel dan cokelat', image: 'farmer-story-2.webp' },
] satisfies SharedRegion[];

export const coffeeTours = [
  { id: 'coffee-tour', title: 'Coffee Tour Lereng Papandayan', type: 'Kunjungan kebun', duration: '3 jam', price: 185000, location: 'Cisurupan', description: 'Berjalan di antara pohon kopi, belajar memetik cherry, lalu menikmati seduhan dari kebun yang dikunjungi.', image: 'kopi-garut-seduh-sambil-menjelajah-banner.webp' },
  { id: 'roasting-class', title: 'Kelas Roasting Garut', type: 'Edukasi roasting', duration: '2,5 jam', price: 275000, location: 'Kota Garut', description: 'Kenali proses sangrai dan bawa pulang kopi hasil racikanmu sendiri.', image: 'farmer-story-1.webp' },
  { id: 'camping-coffee', title: 'Camping & Coffee Experience', type: 'Paket wisata kopi', duration: '2 hari 1 malam', price: 850000, location: 'Darajat', description: 'Menginap di dataran tinggi, menikmati kopi saat matahari terbit, dan mendengar cerita petani.', image: 'farmer-story-3.webp' },
] satisfies SharedCoffeeTour[];

export const diversifiedProducts = [
  { id: 'essential-oil-kopi', category: 'Aroma & perawatan', icon: 'package', title: 'Essential oil kopi', price: 'Rp 55.000', status: 'Aroma kopi premium', image: 'coffee-essential-oil.webp', badge: 'Produk baru' },
  { id: 'pewangi-sepatu-kopi', category: 'Aroma & perawatan', icon: 'package', title: 'Pewangi sepatu kopi', price: 'Rp 32.000', status: 'Aroma tahan lama', image: 'coffee-shoe-deodorizer.webp', badge: 'Upcycle ampas' },
  { id: 'minyak-aroma-kopi', category: 'Aroma & perawatan', icon: 'package', title: 'Minyak aroma kopi', price: 'Rp 42.000', status: 'Blend lokal Garut', image: 'coffee-aroma-oil.webp', badge: 'Produk UMKM' },
  { id: 'coffee-concentrate', category: 'Olahan kopi', icon: 'coffee', title: 'Konsentrat kopi gula aren', price: 'Rp 28.000', status: 'Siap minum', image: 'coffee-palm-sugar-concentrate.webp', badge: 'Favorit baru' },
  { id: 'coffee-cookies', category: 'Olahan kopi', icon: 'package', title: 'Cookies ampas kopi', price: 'Rp 35.000', status: 'Batch mingguan', image: 'coffee-cookies.webp', badge: 'Batch kecil' },
  { id: 'coffee-soap', category: 'Olahan kopi', icon: 'package', title: 'Sabun scrub kopi', price: 'Rp 32.000', status: 'Produk UMKM', image: 'coffee-scrub.webp', badge: 'Terbuat dari ampas' },
  { id: 'garut-tote-bag', category: 'Merchandise', icon: 'package', title: 'Totebag lereng Garut', price: 'Rp 79.000', status: 'Edisi petani', image: 'garut-totebag.webp', badge: 'Edisi terbatas' },
  { id: 'garut-mug', category: 'Merchandise', icon: 'coffee', title: 'Mug Garut Beans G-Beans', price: 'Rp 65.000', status: 'Stok terbatas', image: 'garut-mug.webp', badge: 'Koleksi rumah' },
  { id: 'lilin-aroma-kopi', category: 'Aroma & perawatan', icon: 'package', title: 'Lilin aroma kopi', price: 'Rp 68.000', status: 'Waktu nyala 24 jam', image: 'coffee-candle.webp', badge: 'Ruang lebih hangat', description: 'Lilin soy wax dengan aroma kopi panggang untuk ruang istirahat.', maker: 'Rumah Aroma Cikuray', impact: 'Wadah dapat dipakai ulang sebagai pot kecil', size: '100 g' },
] satisfies SharedDiversifiedProduct[];

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