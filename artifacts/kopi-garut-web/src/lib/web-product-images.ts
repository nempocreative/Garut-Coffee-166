const webProductImages: Record<string, string> = {
  'essential-oil-kopi': 'essential-oil-scrub-style.jpg',
  'pewangi-sepatu-kopi': 'coffee-shoe-deodorizer-garut-beans.webp',
  'minyak-aroma-kopi': 'coffee-aroma-oil-garut-beans.webp',
  'coffee-concentrate': 'coffee-concentrate-garut-beans.webp',
  'coffee-cookies': 'coffee-cookies-garut-beans.webp',
  'coffee-soap': 'coffee-soap-product.jpg',
  'garut-tote-bag': 'garut-totebag-garut-beans.jpg',
  'garut-mug': 'garut-mug-garut-beans.jpg',
  'lilin-aroma-kopi': 'coffee-candle-garut-beans.jpg',
};

export function getWebProductImage(productId: string, image: string) {
  return webProductImages[productId] ?? image;
}