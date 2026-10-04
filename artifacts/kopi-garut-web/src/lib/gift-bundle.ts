export const giftBundleProductCounts = {
  'paket-a': 3,
  'paket-b': 4,
  'paket-c': 5,
} as const;

export type GiftBundleType = keyof typeof giftBundleProductCounts;
export type GiftBoxType = 'standard' | 'custom';

export const customBoxMinimumQuantity = 12;
export const customBoxSurchargePerPackage = 25_000;