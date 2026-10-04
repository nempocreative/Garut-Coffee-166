const webProductImages: Record<string, string> = {
  'essential-oil-kopi': 'coffee-essential-oil-garut-beans.webp',
  'pewangi-sepatu-kopi': 'coffee-shoe-deodorizer-garut-beans.webp',
  'minyak-aroma-kopi': 'coffee-aroma-oil-garut-beans.webp',
  'coffee-concentrate': 'coffee-concentrate-garut-beans.webp',
  'coffee-cookies': 'coffee-cookies-garut-beans.webp',
};

export function getWebProductImage(productId: string, image: string) {
  return webProductImages[productId] ?? image;
}