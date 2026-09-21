import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, Order } from '@/data/coffees';
import { getCartProductPrice } from '@/data/cart-products';

type StoreValue = {
  favorites: string[];
  cart: CartItem[];
  orders: Order[];
  ready: boolean;
  toggleFavorite: (id: string) => void;
  addToCart: (id: string, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  placeOrder: (delivery: 'Standard' | 'Express') => Promise<void>;
};

const StoreContext = createContext<StoreValue | null>(null);
const keys = { favorites: '@kopi/favorites', cart: '@kopi/cart', orders: '@kopi/orders' };
const tap = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(keys.favorites),
      AsyncStorage.getItem(keys.cart),
      AsyncStorage.getItem(keys.orders),
    ]).then(([savedFavorites, savedCart, savedOrders]) => {
      try {
        setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
        setCart(savedCart ? JSON.parse(savedCart) : []);
        setOrders(savedOrders ? JSON.parse(savedOrders) : []);
      } finally {
        setReady(true);
      }
    }).catch(() => setReady(true));
  }, []);

  useEffect(() => { if (ready) void AsyncStorage.setItem(keys.favorites, JSON.stringify(favorites)); }, [favorites, ready]);
  useEffect(() => { if (ready) void AsyncStorage.setItem(keys.cart, JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { if (ready) void AsyncStorage.setItem(keys.orders, JSON.stringify(orders)); }, [orders, ready]);

  const toggleFavorite = useCallback((id: string) => {
    tap();
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }, []);
  const addToCart = useCallback((id: string, quantity = 1) => {
    tap();
    setCart((current) => {
      const existing = current.find((item) => item.coffeeId === id);
      return existing
        ? current.map((item) => item.coffeeId === id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { coffeeId: id, quantity }];
    });
  }, []);
  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart((current) => quantity <= 0 ? current.filter((item) => item.coffeeId !== id) : current.map((item) => item.coffeeId === id ? { ...item, quantity } : item));
  }, []);
  const removeFromCart = useCallback((id: string) => setCart((current) => current.filter((item) => item.coffeeId !== id)), []);
  const placeOrder = useCallback(async (delivery: 'Standard' | 'Express') => {
    if (!cart.length) return;
    const multiplier = delivery === 'Express' ? 1.08 : 1;
    const total = Math.round(cart.reduce((sum, item) => sum + getCartProductPrice(item.coffeeId) * item.quantity, 0) * multiplier);
    setOrders((current) => [{ id: `${Date.now()}`, items: cart, total, createdAt: new Date().toISOString(), status: 'Placed' }, ...current]);
    setCart([]);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [cart]);

  const value = useMemo(() => ({ favorites, cart, orders, ready, toggleFavorite, addToCart, updateQuantity, removeFromCart, placeOrder }), [favorites, cart, orders, ready, toggleFavorite, addToCart, updateQuantity, removeFromCart, placeOrder]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used within StoreProvider');
  return value;
}