import { ImageSource } from 'expo-image';
import { coffeeCatalog, type SharedCoffee } from '@workspace/kopi-garut-shared';

export type Coffee = Omit<SharedCoffee, 'image'> & { image: ImageSource };

export type CoffeeLot = {
  id: string;
  coffeeId: string;
  variety: string;
  region: string;
  weightKg: number;
  process: string;
  harvestPeriod: string;
  harvestDate: string;
  productionDate: string;
  qualityNote: string;
  storyTitle: string;
  story: string;
  impact: string;
  journey: { label: string; title: string; detail: string }[];
};

export type CartItem = { coffeeId: string; quantity: number };
export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: 'Placed' | 'Preparing' | 'Delivered';
};

const mobileCoffeeImages: Record<string, ImageSource> = {
  'papandayan-series.webp': require('../assets/images/papandayan-series.webp'),
  'papandayan-reserve.webp': require('../assets/images/papandayan-reserve.webp'),
  'cikajang-honey.webp': require('../assets/images/cikajang-honey.webp'),
  'cikuray-series.webp': require('../assets/images/cikuray-series.webp'),
  'kamojang-series.webp': require('../assets/images/kamojang-series.webp'),
  'kamojang-reserve.webp': require('../assets/images/kamojang-reserve.webp'),
  'darajat-series.webp': require('../assets/images/darajat-series.webp'),
};

export const coffees: Coffee[] = coffeeCatalog.map((coffee) => ({
  ...coffee,
  image: mobileCoffeeImages[coffee.image],
}));

export const coffeeLots: CoffeeLot[] = [
  {
    id: 'KG-26001',
    coffeeId: 'papandayan-honey',
    variety: 'Arabika',
    region: 'Papandayan',
    weightKg: 350,
    process: 'Madu',
    harvestPeriod: 'September 2026',
    harvestDate: '12 September 2026',
    productionDate: '20 September 2026',
    qualityNote: 'Lot terkurasi dari lereng Papandayan.',
    storyTitle: 'Satu cangkir, banyak kehidupan.',
    story:
      'Di lereng Papandayan, kopi dipetik saat kulitnya merah penuh oleh keluarga tani yang merawat kebun dari musim ke musim. Setelah melalui proses madu dan pengeringan perlahan, biji ini disangrai ringan–sedang agar rasa lemon, gula merah, dan melatinya tetap terasa jernih. Bagi mereka, kopi bukan sekadar panen: kopi adalah pekerjaan yang menghidupkan rumah, menjaga kebun tetap terawat, dan membuka kesempatan bagi tangan-tangan lain untuk ikut bekerja.',
    impact:
      'Saat kamu memilih lot ini, kamu ikut menjaga pekerjaan di kebun, rumah pengeringan, proses sortir, hingga pengiriman. Jadi, yang sampai ke cangkir bukan hanya rasa—tetapi juga kesempatan untuk tumbuh bersama.',
    journey: [
      {
        label: 'Kebun',
        title: 'Dipetik saat matang',
        detail: 'Buah merah dipilih satu per satu di ketinggian 1.650 mdpl.',
      },
      {
        label: 'Proses',
        title: 'Dikeringkan dengan sabar',
        detail: 'Lapisan madu dijaga selama pengeringan untuk membangun rasa manis.',
      },
      {
        label: 'Cangkir',
        title: 'Diseduh untuk dinikmati',
        detail: 'Sangrai ringan–sedang menjaga akhir rasa tetap bersih dan hangat.',
      },
    ],
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