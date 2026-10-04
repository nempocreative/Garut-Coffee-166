export const webRewards = [
  {
    id: 'discount-10k',
    cost: 100,
    amount: 10_000,
    minimumSubtotal: 100_000,
    title: 'Potongan Rp10.000',
  },
  {
    id: 'discount-25k',
    cost: 220,
    amount: 25_000,
    minimumSubtotal: 180_000,
    title: 'Potongan Rp25.000',
  },
  {
    id: 'discount-50k',
    cost: 400,
    amount: 50_000,
    minimumSubtotal: 300_000,
    title: 'Potongan Rp50.000',
  },
] as const;

export const serviceModes = [
  { id: 'delivery', label: 'Delivery', description: 'Diantar ke alamatmu' },
  { id: 'pickup', label: 'Pickup', description: 'Ambil di outlet' },
  { id: 'dine-in', label: 'Dine In', description: 'Nikmati di outlet' },
] as const;

export type ServiceMode = (typeof serviceModes)[number]['id'];

export const serviceLocations = [
  { id: 'papandayan', name: 'Ruko Papandayan Garut', area: 'Papandayan, Garut' },
  { id: 'ruang-seduh', name: 'Ruang Seduh Roastery', area: 'Garut Kota' },
  { id: 'kedai-pagi', name: 'Kedai Pagi Garut', area: 'Tarogong' },
] as const;

export type ServiceLocationId = (typeof serviceLocations)[number]['id'];

export type DeliveryAddress = {
  id: string;
  label: string;
  address: string;
};