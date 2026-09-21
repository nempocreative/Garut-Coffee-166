import { ImageSource } from 'expo-image';
import type { BrandIconName } from '@/components/BrandIcon';

export type DiversificationCategory = 'Semua' | 'Olahan kopi' | 'Aroma & perawatan' | 'Merchandise' | 'Paket hadiah';

export type DiversifiedProduct = {
  id: string;
  category: Exclude<DiversificationCategory, 'Semua'>;
  icon: BrandIconName;
  title: string;
  price: string;
  status: string;
  image: ImageSource;
  badge: string;
  description?: string;
  maker?: string;
  impact?: string;
  size?: string;
};

export const diversificationCategories: DiversificationCategory[] = ['Semua', 'Olahan kopi', 'Aroma & perawatan', 'Merchandise', 'Paket hadiah'];

export const parseDiversifiedPrice = (price: string) => Number(price.replace(/[^\d]/g, ''));

export const findDiversifiedProduct = (id?: string) => diversifiedProducts.find((product) => product.id === id);

export const diversifiedProducts: DiversifiedProduct[] = [
  {
    id: 'essential-oil-kopi',
    category: 'Aroma & perawatan',
    icon: 'trending-up',
    title: 'Essential oil kopi',
    price: 'Rp 55.000',
    status: 'Aroma kopi premium',
    image: require('../assets/images/coffee-essential-oil.png'),
    badge: 'Produk baru',
  },
  {
    id: 'pewangi-sepatu-kopi',
    category: 'Aroma & perawatan',
    icon: 'package',
    title: 'Pewangi sepatu kopi',
    price: 'Rp 32.000',
    status: 'Aroma tahan lama',
    image: require('../assets/images/coffee-shoe-deodorizer.png'),
    badge: 'Upcycle ampas',
  },
  {
    id: 'minyak-aroma-kopi',
    category: 'Aroma & perawatan',
    icon: 'repeat',
    title: 'Minyak aroma kopi',
    price: 'Rp 42.000',
    status: 'Blend lokal Garut',
    image: require('../assets/images/coffee-aroma-oil.png'),
    badge: 'Produk UMKM',
  },
  {
    id: 'coffee-concentrate',
    category: 'Olahan kopi',
    icon: 'coffee',
    title: 'Konsentrat kopi gula aren',
    price: 'Rp 28.000',
    status: 'Siap minum',
    image: require('../assets/images/coffee-palm-sugar-concentrate.png'),
    badge: 'Favorit baru',
  },
  {
    id: 'coffee-cookies',
    category: 'Olahan kopi',
    icon: 'package',
    title: 'Cookies ampas kopi',
    price: 'Rp 35.000',
    status: 'Batch mingguan',
    image: require('../assets/images/origin-coffee.jpg'),
    badge: 'Batch kecil',
  },
  {
    id: 'coffee-soap',
    category: 'Olahan kopi',
    icon: 'repeat',
    title: 'Sabun scrub kopi',
    price: 'Rp 32.000',
    status: 'Produk UMKM',
    image: require('../assets/images/coffee-beans-natural.png'),
    badge: 'Terbuat dari ampas',
  },
  {
    id: 'garut-tote-bag',
    category: 'Merchandise',
    icon: 'shopping-bag',
    title: 'Totebag lereng Garut',
    price: 'Rp 79.000',
    status: 'Edisi petani',
    image: require('../assets/images/mountain-banner.png'),
    badge: 'Edisi terbatas',
  },
  {
    id: 'garut-mug',
    category: 'Merchandise',
    icon: 'coffee',
    title: 'Mug Kopi Garut',
    price: 'Rp 65.000',
    status: 'Stok terbatas',
    image: require('../assets/images/event-festival-garut.jpg'),
    badge: 'Koleksi rumah',
  },
  {
    id: 'sticker-pack',
    category: 'Merchandise',
    icon: 'package',
    title: 'Paket pin & stiker',
    price: 'Rp 25.000',
    status: 'Koleksi baru',
    image: require('../assets/images/kopi-garut-promo-banner.jpg'),
    badge: 'Koleksi baru',
  },
  {
    id: 'cold-brew-concentrate',
    category: 'Olahan kopi',
    icon: 'coffee',
    title: 'Cold brew konsentrat',
    price: 'Rp 45.000',
    status: 'Seduh dingin 12 jam',
    image: require('../assets/images/hero-coffee.jpg'),
    badge: 'Siap racik',
    description: 'Kopi dingin dengan rasa cokelat dan karamel untuk campuran susu.',
    maker: 'Roastery Papandayan',
    impact: 'Biji dari lot petani terverifikasi',
    size: '500 ml',
  },
  {
    id: 'granola-ampas-kopi',
    category: 'Olahan kopi',
    icon: 'package',
    title: 'Granola ampas kopi',
    price: 'Rp 39.000',
    status: 'Sarapan renyah',
    image: require('../assets/images/origin-coffee.jpg'),
    badge: 'Zero waste',
    description: 'Granola oat, kelapa, dan kacang dengan sentuhan pahit kopi yang ringan.',
    maker: 'Dapur Pangan Cisurupan',
    impact: 'Mengurangi sisa ampas dari proses seduh',
    size: '180 g',
  },
  {
    id: 'lilin-aroma-kopi',
    category: 'Aroma & perawatan',
    icon: 'circle',
    title: 'Lilin aroma kopi',
    price: 'Rp 68.000',
    status: 'Waktu nyala 24 jam',
    image: require('../assets/images/coffee-beans-natural.png'),
    badge: 'Ruang lebih hangat',
    description: 'Lilin soy wax dengan aroma kopi panggang untuk ruang istirahat.',
    maker: 'Rumah Aroma Cikuray',
    impact: 'Wadah dapat dipakai ulang sebagai pot kecil',
    size: '100 g',
  },
  {
    id: 'coffee-dripper-keramik',
    category: 'Merchandise',
    icon: 'coffee',
    title: 'Dripper keramik Garut',
    price: 'Rp 125.000',
    status: 'Buat seduhan manual',
    image: require('../assets/images/mountain-banner.png'),
    badge: 'Dibuat tangan',
    description: 'Dripper keramik dengan motif lereng untuk ritual seduh yang tenang.',
    maker: 'Keramik Cikajang',
    impact: 'Mendukung bengkel keramik keluarga',
    size: '1 dripper',
  },
  {
    id: 'gift-set-ritual-pagi',
    category: 'Paket hadiah',
    icon: 'shopping-bag',
    title: 'Paket ritual pagi',
    price: 'Rp 165.000',
    status: 'Kopi, mug, dan cerita',
    image: require('../assets/images/kopi-garut-promo-banner.jpg'),
    badge: 'Paling lengkap',
    description: 'Satu paket untuk memulai hari: kopi pilihan, mug, dan kartu cerita.',
    maker: 'Kolektif Kopi Garut',
    impact: 'Nilai belanja dibagi untuk petani dan perajin',
    size: '3 item',
  },
  {
    id: 'gift-set-upcycle',
    category: 'Paket hadiah',
    icon: 'repeat',
    title: 'Paket sirkular ampas',
    price: 'Rp 89.000',
    status: 'Aroma dan perawatan',
    image: require('../assets/images/coffee-beans-natural.png'),
    badge: 'Pilihan sadar',
    description: 'Pewangi sepatu dan sabun scrub yang memulai hidup kedua ampas kopi.',
    maker: 'Koperasi Rasa Garut',
    impact: 'Dua produk dari satu alur pemanfaatan ampas',
    size: '2 item',
  },
];