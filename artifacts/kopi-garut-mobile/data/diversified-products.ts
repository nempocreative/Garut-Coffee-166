import { ImageSource } from 'expo-image';
import type { BrandIconName } from '@/components/BrandIcon';

export type DiversificationCategory = 'Semua' | 'Olahan kopi' | 'Aroma & perawatan' | 'Merchandise';

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

export const diversificationCategories: DiversificationCategory[] = ['Semua', 'Olahan kopi', 'Aroma & perawatan', 'Merchandise'];

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
    image: require('../assets/images/coffee-cookies.png'),
    badge: 'Batch kecil',
  },
  {
    id: 'coffee-soap',
    category: 'Olahan kopi',
    icon: 'repeat',
    title: 'Sabun scrub kopi',
    price: 'Rp 32.000',
    status: 'Produk UMKM',
    image: require('../assets/images/coffee-scrub.png'),
    badge: 'Terbuat dari ampas',
  },
  {
    id: 'garut-tote-bag',
    category: 'Merchandise',
    icon: 'shopping-bag',
    title: 'Totebag lereng Garut',
    price: 'Rp 79.000',
    status: 'Edisi petani',
    image: require('../assets/images/garut-totebag.png'),
    badge: 'Edisi terbatas',
  },
  {
    id: 'garut-mug',
    category: 'Merchandise',
    icon: 'coffee',
    title: 'Mug Kopi Garut',
    price: 'Rp 65.000',
    status: 'Stok terbatas',
    image: require('../assets/images/garut-mug.png'),
    badge: 'Koleksi rumah',
  },
  {
    id: 'lilin-aroma-kopi',
    category: 'Aroma & perawatan',
    icon: 'circle',
    title: 'Lilin aroma kopi',
    price: 'Rp 68.000',
    status: 'Waktu nyala 24 jam',
    image: require('../assets/images/coffee-candle.png'),
    badge: 'Ruang lebih hangat',
    description: 'Lilin soy wax dengan aroma kopi panggang untuk ruang istirahat.',
    maker: 'Rumah Aroma Cikuray',
    impact: 'Wadah dapat dipakai ulang sebagai pot kecil',
    size: '100 g',
  },
];