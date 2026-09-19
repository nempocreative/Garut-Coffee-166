import { ImageSource } from 'expo-image';

export type Farmer = {
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
  image: ImageSource;
  story: string;
};

export type Region = {
  id: string;
  name: string;
  village: string;
  elevation: string;
  farmerCount: number;
  specialty: string;
  image: ImageSource;
};

export type CoffeeTour = {
  id: string;
  title: string;
  type: string;
  duration: string;
  price: number;
  location: string;
  description: string;
  image: ImageSource;
};

export type HubEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  description: string;
};

export const farmers: Farmer[] = [
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
    image: require('../assets/images/farmer-asep-rahmat.jpg'),
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
    image: require('../assets/images/farmer-iis-nurhayati.jpg'),
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
    image: require('../assets/images/farmer-deni-suhendar.jpg'),
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
    image: require('../assets/images/farmer-ujang-kusnadi.jpg'),
    story: 'Mengembangkan kopi sangrai yang nyaman untuk dinikmati di rumah maupun di kedai mitra.',
  },
];

export const regions: Region[] = [
  { id: 'papandayan', name: 'Papandayan', village: 'Cisurupan', elevation: '1.650 mdpl', farmerCount: 42, specialty: 'Rasa cerah dan manis', image: require('../assets/images/hero-coffee.jpg') },
  { id: 'cikuray', name: 'Cikuray', village: 'Cikajang', elevation: '1.450 mdpl', farmerCount: 36, specialty: 'Buah tropis dan kakao', image: require('../assets/images/origin-coffee.jpg') },
  { id: 'kamojang', name: 'Kamojang', village: 'Pakenjeng', elevation: '1.300 mdpl', farmerCount: 28, specialty: 'Bersih dan seimbang', image: require('../assets/images/hero-coffee.jpg') },
  { id: 'darajat', name: 'Darajat', village: 'Samarang', elevation: '1.180 mdpl', farmerCount: 19, specialty: 'Karamel dan cokelat', image: require('../assets/images/origin-coffee.jpg') },
];

export const coffeeTours: CoffeeTour[] = [
  { id: 'coffee-tour', title: 'Coffee Tour Lereng Papandayan', type: 'Kunjungan kebun', duration: '3 jam', price: 185000, location: 'Cisurupan', description: 'Berjalan di antara pohon kopi, belajar memetik cherry, lalu menikmati seduhan dari kebun yang dikunjungi.', image: require('../assets/images/hero-coffee.jpg') },
  { id: 'roasting-class', title: 'Kelas Roasting Garut', type: 'Edukasi roasting', duration: '2,5 jam', price: 275000, location: 'Kota Garut', description: 'Kenali proses sangrai dan bawa pulang kopi hasil racikanmu sendiri.', image: require('../assets/images/origin-coffee.jpg') },
  { id: 'camping-coffee', title: 'Camping & Coffee Experience', type: 'Paket wisata kopi', duration: '2 hari 1 malam', price: 850000, location: 'Darajat', description: 'Menginap di dataran tinggi, menikmati kopi saat matahari terbit, dan mendengar cerita petani.', image: require('../assets/images/hero-coffee.jpg') },
];

export const hubEvents: HubEvent[] = [
  { id: 'festival-kopi', title: 'Festival Kopi Garut 2026', date: '3–4 Oktober 2026', location: 'Alun-alun Garut', type: 'Festival', description: 'Temu petani, roastery, cafe, dan pecinta kopi dalam satu perayaan.' },
  { id: 'kelas-pascapanen', title: 'Kelas Pascapanen untuk Kelompok Tani', date: '17 Oktober 2026', location: 'Cikajang', type: 'Pelatihan', description: 'Praktik sortasi, fermentasi, dan pengeringan untuk menjaga nilai jual kopi.' },
  { id: 'temu-cafe', title: 'Temu Mitra Cafe', date: '7 November 2026', location: 'Kota Garut', type: 'Kemitraan', description: 'Sesi temu usaha untuk memperluas akses kopi Garut ke kedai-kedai Indonesia.' },
];

export const coffeePrices = [
  { label: 'Cherry kopi', price: 'Rp 8.500', unit: 'per kg', change: '+4,2% bulan ini' },
  { label: 'Gabah kopi', price: 'Rp 22.000', unit: 'per kg', change: '+2,1% bulan ini' },
  { label: 'Green bean', price: 'Rp 68.000', unit: 'per kg', change: 'Harga rata-rata' },
  { label: 'Roasted bean', price: 'Rp 125.000', unit: 'per 200 g', change: 'Harga rata-rata' },
];

export const hubStats = [
  { label: 'Petani terdaftar', value: '125' },
  { label: 'Luas lahan', value: '486 ha' },
  { label: 'Produksi tahunan', value: '312 ton' },
  { label: 'Wilayah aktif', value: '12' },
];

export type CollectiveModule = {
  id: string;
  icon: 'coffee' | 'package' | 'briefcase' | 'shield' | 'calendar' | 'users' | 'heart' | 'compass' | 'bar-chart-2' | 'info';
  title: string;
  description: string;
  items: string[];
};

export const collectiveModules: CollectiveModule[] = [
  {
    id: 'production',
    icon: 'coffee',
    title: 'Produksi & budidaya',
    description: 'Data kebun yang membantu petani menjaga kualitas dan merencanakan musim.',
    items: ['Data petani dan kelompok tani', 'Luas lahan dan pohon kopi', 'Produksi per musim', 'Jadwal panen'],
  },
  {
    id: 'post-harvest',
    icon: 'package',
    title: 'Pascapanen',
    description: 'Catatan rumah produksi, pengolahan, stok, dan standar kualitas kopi Garut.',
    items: ['Rumah produksi dan mesin', 'Jadwal pengeringan', 'Stok green bean dan roasted bean', 'Standar kualitas kopi'],
  },
  {
    id: 'b2b',
    icon: 'briefcase',
    title: 'Marketplace B2B',
    description: 'Ruang temu hasil panen dengan usaha yang ingin membeli kopi Garut secara berkelanjutan.',
    items: ['Permintaan pembelian', 'Penawaran hasil panen', 'Negosiasi harga', 'Kontrak pembelian'],
  },
  {
    id: 'certification',
    icon: 'shield',
    title: 'Sertifikasi & legalitas',
    description: 'Profil kesiapan usaha dan dokumen penting untuk memperluas akses pasar.',
    items: ['Sertifikat petani', 'Sertifikat halal', 'PIRT', 'NIB'],
  },
  {
    id: 'academy',
    icon: 'calendar',
    title: 'Akademi Kopi Garut',
    description: 'Materi belajar untuk petani, pelaku usaha, dan pecinta kopi dari hulu ke hilir.',
    items: ['Video budidaya dan teknik panen', 'Pascapanen dan roasting dasar', 'Brewing dasar', 'Kewirausahaan kopi'],
  },
  {
    id: 'events-media',
    icon: 'info',
    title: 'Event & pusat media',
    description: 'Satu tempat untuk mengikuti kegiatan dan cerita yang menggerakkan ekosistem kopi.',
    items: ['Festival dan cupping session', 'Kompetisi dan pelatihan', 'Artikel dan cerita petani', 'Kalender kegiatan'],
  },
  {
    id: 'partnership',
    icon: 'users',
    title: 'Program kemitraan',
    description: 'Hubungkan kopi Garut dengan cafe, hotel, UMKM, investor, dan eksportir.',
    items: ['Pendaftaran mitra langsung', 'Riwayat pendampingan', 'Pelatihan yang pernah diikuti', 'Kerja sama penyuluh pertanian'],
  },
  {
    id: 'membership',
    icon: 'heart',
    title: 'Voucher & membership',
    description: 'Benefit untuk anggota yang ingin menikmati ekosistem Kopi Garut lebih dekat.',
    items: ['Diskon di cafe mitra', 'Diskon wisata kopi', 'Event khusus anggota', 'Merchandise Kopi Garut'],
  },
  {
    id: 'tourism',
    icon: 'compass',
    title: 'Wisata kopi',
    description: 'Pengalaman langsung dari kebun, proses, budaya, dan orang-orang di balik kopi.',
    items: ['One Day Coffee Tour', 'Farm Experience', 'Coffee Camping', 'Coffee & Culture Experience', 'Petik kopi langsung'],
  },
  {
    id: 'government-dashboard',
    icon: 'bar-chart-2',
    title: 'Dashboard dinas',
    description: 'Ringkasan data untuk melihat pertumbuhan kopi Garut dari satu pintu.',
    items: ['Jumlah petani aktif', 'Produksi per kecamatan', 'Tren harga dan persebaran lahan', 'Data pelatihan dan kemitraan'],
  },
];

export const collectiveRoadmap = [
  {
    id: 'lot-catalog',
    icon: 'package' as const,
    title: 'Lot kopi',
    description: 'Setiap hasil panen punya identitas sendiri agar pembeli dapat memilih berdasarkan wilayah, proses, berat, dan musim panen.',
  },
  {
    id: 'harvest-preorder',
    icon: 'calendar' as const,
    title: 'Pre-order panen',
    description: 'Cafe dan roastery dapat memesan sebelum panen dengan kebutuhan, estimasi waktu, dan jenis proses yang jelas.',
  },
  {
    id: 'partnership-contract',
    icon: 'briefcase' as const,
    title: 'Kontrak kemitraan',
    description: 'Volume, kisaran harga, periode, standar kualitas, dan jadwal pengiriman tercatat bersama.',
  },
  {
    id: 'logistics',
    icon: 'map' as const,
    title: 'Pusat logistik',
    description: 'Informasi gudang, stok, kapasitas, pengiriman, dan pickup hasil panen dalam satu alur.',
  },
  {
    id: 'price-calculator',
    icon: 'trending-up' as const,
    title: 'Kalkulator harga kopi',
    description: 'Estimasi nilai jual berdasarkan berat panen, jenis kopi, proses, grade, dan harga acuan platform.',
  },
  {
    id: 'farm-calculator',
    icon: 'bar-chart-2' as const,
    title: 'Kalkulator produksi kebun',
    description: 'Catat jumlah tanaman, luas kebun, produktivitas, dan hasil panen dari musim ke musim.',
  },
  {
    id: 'farm-journal',
    icon: 'calendar' as const,
    title: 'Jurnal kebun',
    description: 'Buku digital untuk pemupukan, penyemprotan, pemangkasan, panen, pascapanen, dan foto perkembangan kebun.',
  },
  {
    id: 'qr-coffee',
    icon: 'maximize' as const,
    title: 'QR Code Kopi Garut',
    description: 'Scan kemasan untuk membuka perjalanan kopi dari kebun hingga cangkir, termasuk lot dan kelompok tani.',
  },
  {
    id: 'cafe-directory',
    icon: 'coffee' as const,
    title: 'Direktori cafe & roastery',
    description: 'Cari cafe di Garut yang menggunakan Kopi Garut atau roastery yang menjualnya.',
  },
  {
    id: 'coffee-map',
    icon: 'map' as const,
    title: 'Garut Coffee Map',
    description: 'Peta besar dari kecamatan, kebun, kelompok tani, pengolahan, cafe, sampai roastery.',
  },
  {
    id: 'business',
    icon: 'users' as const,
    title: 'Kopi Garut untuk bisnis',
    description: 'Ruang kebutuhan B2B untuk cafe, hotel, restoran, roastery, distributor, dan kantor atau perusahaan.',
  },
  {
    id: 'official-catalog',
    icon: 'grid' as const,
    title: 'Katalog Kopi Garut',
    description: 'Katalog kurasi dengan lima pintu: Explore, Shop, Farm, Business, dan Experience.',
  },
  {
    id: 'season-calendar',
    icon: 'calendar' as const,
    title: 'Kalender musim kopi',
    description: 'Musim berbunga, panen, pemupukan, dan perawatan untuk membantu petani dan pembeli membaca waktu terbaik.',
  },
  {
    id: 'market-demand',
    icon: 'trending-up' as const,
    title: 'Permintaan pasar',
    description: 'Cafe dan pembeli dapat memasang kebutuhan seperti 500 kg green bean Arabika Grade 1 untuk direspons kelompok tani.',
  },
  {
    id: 'farm-equipment',
    icon: 'settings' as const,
    title: 'Alat & mesin pertanian',
    description: 'Temukan lokasi, pemilik, dan status ketersediaan pulper, huller, dryer, dan roaster.',
  },
  {
    id: 'government-support',
    icon: 'shield' as const,
    title: 'Program bantuan dinas',
    description: 'Pendaftaran bantuan bibit, alat, pelatihan, dan pendampingan dalam satu menu.',
  },
  {
    id: 'consultation',
    icon: 'info' as const,
    title: 'Pusat konsultasi',
    description: 'Ruang bertanya tentang hama, penyakit, pemupukan, dan pascapanen kepada penyuluh atau tim pendamping.',
  },
  {
    id: 'gallery',
    icon: 'maximize' as const,
    title: 'Galeri Kopi Garut',
    description: 'Kumpulan foto dan video kebun, petani, panen, pengolahan, dan cafe mitra untuk memperkuat promosi.',
  },
  {
    id: 'quality',
    icon: 'check' as const,
    title: 'Penilaian mutu',
    description: 'Setiap lot dapat dilengkapi grade, moisture, defect, dan cupping score agar pembeli memilih dengan lebih yakin.',
  },
  {
    id: 'jobs',
    icon: 'briefcase' as const,
    title: 'Lowongan & kemitraan',
    description: 'Hubungkan talenta barista, roastery, cafe, dan UMKM kopi untuk membangun ekosistem yang lebih hidup.',
  },
  {
    id: 'adopt-tree',
    icon: 'heart' as const,
    title: 'Adopsi pohon kopi',
    description: 'Pengunjung dapat mengikuti perkembangan pohon, menerima laporan, dan memperoleh hasil panen atau produk.',
  },
  {
    id: 'export',
    icon: 'arrow-up-right' as const,
    title: 'Ekspor kopi Garut',
    description: 'Halaman bisnis untuk kopi siap ekspor, profil eksportir, standar mutu, dan kontak kerja sama.',
  },
];