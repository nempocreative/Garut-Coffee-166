const webProductImages: Record<string, string> = {
  'essential-oil-kopi': 'essential-oil-scrub-style.jpg',
  'pewangi-sepatu-kopi': 'coffee-shoe-deodorizer-scrub-style.jpg',
  'minyak-aroma-kopi': 'coffee-aroma-oil-scrub-style.jpg',
  'coffee-concentrate': 'coffee-concentrate-scrub-style.jpg',
  'coffee-cookies': 'coffee-cookies-scrub-style.jpg',
  'coffee-soap': 'coffee-soap-product.jpg',
  'garut-tote-bag': 'garut-totebag-garut-beans.jpg',
  'garut-mug': 'garut-mug-garut-beans.jpg',
  'lilin-aroma-kopi': 'coffee-candle-garut-beans.jpg',
};

export function getWebProductImage(productId: string, image: string) {
  return webProductImages[productId] ?? image;
}