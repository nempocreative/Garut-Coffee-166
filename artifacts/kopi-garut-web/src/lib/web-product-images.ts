const webProductImages: Record<string, string> = {
  'essential-oil-kopi': 'essential-oil-garut-series.jpg',
  'pewangi-sepatu-kopi': 'shoe-deodorizer-garut-series.jpg',
  'minyak-aroma-kopi': 'aroma-oil-garut-series.jpg',
  'coffee-concentrate': 'coffee-concentrate-garut-series.jpg',
  'coffee-cookies': 'coffee-cookies-garut-series.jpg',
  'coffee-soap': 'coffee-soap-product.jpg',
  'garut-tote-bag': 'garut-totebag-garut-beans.jpg',
  'garut-mug': 'garut-mug-garut-beans.jpg',
  'lilin-aroma-kopi': 'coffee-candle-garut-beans.jpg',
};

export function getWebProductImage(productId: string, image: string) {
  return webProductImages[productId] ?? image;
}