import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type CoffeeGameValue = {
  points: number;
  vouchers: string[];
  ready: boolean;
  addPoints: (amount: number) => void;
  redeemPoints: (rewardId: string, cost: number) => void;
  useVoucher: (rewardId: string) => void;
};

const CoffeeGameContext = createContext<CoffeeGameValue | null>(null);
const keys = {
  points: '@kopi/coffee-game-points',
  vouchers: '@kopi/coffee-game-vouchers',
};

export function CoffeeGameProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState(0);
  const [vouchers, setVouchers] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(keys.points), AsyncStorage.getItem(keys.vouchers)])
      .then(([savedPoints, savedVouchers]) => {
        try {
          setPoints(savedPoints ? Number(savedPoints) : 0);
          setVouchers(savedVouchers ? JSON.parse(savedVouchers) : []);
        } finally {
          setReady(true);
        }
      })
      .catch(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) void AsyncStorage.setItem(keys.points, String(points));
  }, [points, ready]);

  useEffect(() => {
    if (ready) void AsyncStorage.setItem(keys.vouchers, JSON.stringify(vouchers));
  }, [vouchers, ready]);

  const addPoints = useCallback((amount: number) => {
    if (amount > 0) setPoints((current) => current + amount);
  }, []);

  const redeemPoints = useCallback((rewardId: string, cost: number) => {
    if (points < cost) return;
    setPoints((current) => Math.max(0, current - cost));
    setVouchers((current) => [rewardId, ...current]);
  }, [points]);

  const useVoucher = useCallback((rewardId: string) => {
    setVouchers((current) => {
      const index = current.indexOf(rewardId);
      return index === -1 ? current : current.filter((_, voucherIndex) => voucherIndex !== index);
    });
  }, []);

  const value = useMemo(() => ({ points, vouchers, ready, addPoints, redeemPoints, useVoucher }), [points, vouchers, ready, addPoints, redeemPoints, useVoucher]);
  return <CoffeeGameContext.Provider value={value}>{children}</CoffeeGameContext.Provider>;
}

export function useCoffeeGame() {
  const value = useContext(CoffeeGameContext);
  if (!value) throw new Error('useCoffeeGame must be used within CoffeeGameProvider');
  return value;
}