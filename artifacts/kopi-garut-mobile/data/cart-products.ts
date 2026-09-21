import type { ImageSource } from 'expo-image';
import { findCoffee } from '@/data/coffees';
import { findDiversifiedProduct, parseDiversifiedPrice } from '@/data/diversified-products';

export type CartProduct = {
  id: string;
  name: string;
  image: ImageSource;
  price: number;
  detail: string;
  kind: 'coffee' | 'diversified';
};

export function findCartProduct(id?: string): CartProduct | undefined {
  if (!id) return undefined;

  const coffee = findCoffee(id);
  if (coffee) {
    return {
      id: coffee.id,
      name: coffee.name,
      image: coffee.image,
      price: coffee.price,
      detail: coffee.origin,
      kind: 'coffee',
    };
  }

  const diversifiedProduct = findDiversifiedProduct(id);
  if (diversifiedProduct) {
    return {
      id: diversifiedProduct.id,
      name: diversifiedProduct.title,
      image: diversifiedProduct.image,
      price: parseDiversifiedPrice(diversifiedProduct.price),
      detail: diversifiedProduct.maker ?? diversifiedProduct.category,
      kind: 'diversified',
    };
  }

  return undefined;
}

export function getCartProductPrice(id?: string) {
  return findCartProduct(id)?.price ?? 0;
}