import { ImageSource } from 'expo-image';

export type Farmer = {
  id: string;
  name: string;
  group: string;
  location: string;
  landArea: string;
  annualProduction: string;
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
    products: ['Papandayan Series'],
    image: require('../assets/images/hero-coffee.jpg'),
    story: 'Menjaga kualitas dari pemetikan hingga pengeringan bersama anggota kelompok tani.',
  },
  {
    id: 'iis-nurhayati',
    name: 'Iis Nurhayati',
    group: 'KTH Cikuray Mandiri',
    location: 'Cikajang, Garut',
    landArea: '1,2 hektare',
    annualProduction: '2,8 ton cherry',
    products: ['Cikuray Series'],
    image: require('../assets/images/origin-coffee.jpg'),
    story: 'Mengolah kopi natural dengan sabar untuk menjaga rasa buah yang menjadi ciri kebunnya.',
  },
  {
    id: 'deni-suhendar',
    name: 'Deni Suhendar',
    group: 'Kelompok Tani Talaga',
    location: 'Pakenjeng, Garut',
    landArea: '2,4 hektare',
    annualProduction: '5,1 ton cherry',
    products: ['Kamojang Series'],
    image: require('../assets/images/hero-coffee.jpg'),
    story: 'Membangun kebun yang produktif sambil mempertahankan naungan alami di lereng pegunungan.',
  },
  {
    id: 'ujang-kusnadi',
    name: 'Ujang Kusnadi',
    group: 'KTH Darajat Sejahtera',
    location: 'Samarang, Garut',
    landArea: '0,9 hektare',
    annualProduction: '1,9 ton cherry',
    products: ['Darajat Series'],
    image: require('../assets/images/origin-coffee.jpg'),
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
  { id: 'festival-kopi', title: 'Festival Kopi Garut 2026', date: '12–14 Juni 2026', location: 'Alun-alun Garut', type: 'Festival', description: 'Temu petani, roastery, cafe, dan pecinta kopi dalam satu perayaan.' },
  { id: 'kelas-pascapanen', title: 'Kelas Pascapanen untuk Kelompok Tani', date: '22 Juni 2026', location: 'Cikajang', type: 'Pelatihan', description: 'Praktik sortasi, fermentasi, dan pengeringan untuk menjaga nilai jual kopi.' },
  { id: 'temu-cafe', title: 'Temu Mitra Cafe', date: '5 Juli 2026', location: 'Kota Garut', type: 'Kemitraan', description: 'Sesi temu usaha untuk memperluas akses kopi Garut ke kedai-kedai Indonesia.' },
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