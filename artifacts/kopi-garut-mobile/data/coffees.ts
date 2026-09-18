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
    tagline: 'A bright morning from the highlands.',
    price: 118000,
    roast: 'Light-medium',
    process: 'Honey',
    altitude: '1,650 masl',
    origin: 'Cisurupan, Garut',
    tastingNotes: ['Meyer lemon', 'brown sugar', 'jasmine'],
    description: 'Sun-washed and precise, this lot carries the cool air of Mount Papandayan into a cup that stays sweet from first sip to last.',
    image: require('../assets/images/hero-coffee.jpg'),
    category: 'Bright',
    recommendedBrew: 'Pour over',
    badge: 'House favourite',
  },
  {
    id: 'cikajang-natural',
    name: 'Cikajang Natural',
    tagline: 'Wild berry, soft cocoa, long finish.',
    price: 132000,
    roast: 'Medium',
    process: 'Natural',
    altitude: '1,450 masl',
    origin: 'Cikajang, Garut',
    tastingNotes: ['strawberry', 'cocoa nib', 'molasses'],
    description: 'A slow-dried natural with generous fruit and a warm finish. Designed for unhurried mornings and a second cup.',
    image: require('../assets/images/origin-coffee.jpg'),
    category: 'Fruity',
    recommendedBrew: 'Aeropress',
    badge: 'Small lot',
  },
  {
    id: 'talaga-washed',
    name: 'Talaga Washed',
    tagline: 'Clean, calm, quietly complex.',
    price: 105000,
    roast: 'Medium-light',
    process: 'Washed',
    altitude: '1,300 masl',
    origin: 'Pakenjeng, Garut',
    tastingNotes: ['stone fruit', 'almond', 'black tea'],
    description: 'A polished everyday coffee with an elegant tea-like structure and just enough sweetness for a focused workday.',
    image: require('../assets/images/hero-coffee.jpg'),
    category: 'Everyday',
    recommendedBrew: 'V60',
  },
  {
    id: 'samarang-dark',
    name: 'Samarang Afterglow',
    tagline: 'Deep caramel for late starts.',
    price: 99000,
    roast: 'Medium-dark',
    process: 'Honey',
    altitude: '1,180 masl',
    origin: 'Samarang, Garut',
    tastingNotes: ['caramel', 'dark chocolate', 'clove'],
    description: 'Comforting without being heavy. A rounded roast for people who like their coffee to hold the room.',
    image: require('../assets/images/origin-coffee.jpg'),
    category: 'Comfort',
    recommendedBrew: 'French press',
  },
];

export const findCoffee = (id?: string) => coffees.find((coffee) => coffee.id === id);
export const formatPrice = (amount: number) =>
  `Rp ${amount.toLocaleString('id-ID')}`;