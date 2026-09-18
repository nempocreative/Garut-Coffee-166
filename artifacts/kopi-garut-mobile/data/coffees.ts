import { ImageSource } from 'expo-image';

export type Coffee = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  roast: string;
  process: string;
  altitude: string;
  origin: string;
  tastingNotes: string[];
  description: string;
  image: ImageSource;
  category: string;
  recommendedBrew: string;
  badge?: string;
};

export type CartItem = { coffeeId: string; quantity: number };
export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: 'Placed' | 'Preparing' | 'Delivered';
};

export const coffees: Coffee[] = [
  {
    id: 'papandayan-honey',
    name: 'Papandayan Honey',
    tagline: 'Pagi cerah dari dataran tinggi.',
    price: 118000,
    roast: 'Ringan–sedang',
    process: 'Madu',
    altitude: '1.650 mdpl',
    origin: 'Cisurupan, Garut',
    tastingNotes: ['lemon Meyer', 'gula merah', 'melati'],
    description: 'Diproses dengan sinar matahari secara cermat, lot ini membawa udara sejuk Gunung Papandayan ke dalam cangkir yang manis dari tegukan pertama hingga terakhir.',
    image: require('../assets/images/hero-coffee.jpg'),
    category: 'Cerah',
    recommendedBrew: 'Seduh tuang',
    badge: 'Favorit rumah',
  },
  {
    id: 'cikajang-natural',
    name: 'Cikajang Natural',
    tagline: 'Buah beri, kakao lembut, akhir rasa panjang.',
    price: 132000,
    roast: 'Sedang',
    process: 'Natural',
    altitude: '1.450 mdpl',
    origin: 'Cikajang, Garut',
    tastingNotes: ['stroberi', 'biji kakao', 'molase'],
    description: 'Kopi natural yang dikeringkan perlahan dengan rasa buah yang kaya dan akhir rasa hangat. Cocok untuk pagi yang santai dan cangkir kedua.',
    image: require('../assets/images/origin-coffee.jpg'),
    category: 'Buah',
    recommendedBrew: 'Aeropress',
    badge: 'Lot kecil',
  },
  {
    id: 'talaga-washed',
    name: 'Talaga Washed',
    tagline: 'Bersih, tenang, kaya rasa.',
    price: 105000,
    roast: 'Sedang–ringan',
    process: 'Cuci',
    altitude: '1.300 mdpl',
    origin: 'Pakenjeng, Garut',
    tastingNotes: ['buah batu', 'almon', 'teh hitam'],
    description: 'Kopi harian yang seimbang dengan struktur seperti teh dan rasa manis yang pas untuk menemani hari kerja yang fokus.',
    image: require('../assets/images/hero-coffee.jpg'),
    category: 'Harian',
    recommendedBrew: 'V60',
  },
  {
    id: 'samarang-dark',
    name: 'Samarang Afterglow',
    tagline: 'Karamel pekat untuk pagi yang terlambat.',
    price: 99000,
    roast: 'Sedang–gelap',
    process: 'Madu',
    altitude: '1.180 mdpl',
    origin: 'Samarang, Garut',
    tastingNotes: ['karamel', 'cokelat hitam', 'cengkeh'],
    description: 'Hangat dan nyaman tanpa terasa berat. Sangrai seimbang untuk kamu yang menyukai kopi dengan rasa yang bertahan lama.',
    image: require('../assets/images/origin-coffee.jpg'),
    category: 'Nyaman',
    recommendedBrew: 'French press',
  },
];

export const findCoffee = (id?: string) => coffees.find((coffee) => coffee.id === id);
export const orderStatusLabels: Record<Order['status'], string> = {
  Placed: 'Dipesan',
  Preparing: 'Diproses',
  Delivered: 'Diantar',
};
export const formatPrice = (amount: number) =>
  `Rp ${amount.toLocaleString('id-ID')}`;