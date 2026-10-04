export type PointLot = {
  amount: number;
  earnedAt: number;
};

export type PointExpirySummary = {
  amount: number;
  expiresAt: number;
};

export const POINTS_LIFETIME_MS = 365 * 24 * 60 * 60 * 1000;

export function normalizePointLots(value: unknown): PointLot[] {
  if (!Array.isArray(value)) return [];

  return value
    .flatMap((candidate): PointLot[] => {
      if (typeof candidate !== 'object' || candidate === null) return [];
      const amount = Number((candidate as Partial<PointLot>).amount);
      const earnedAt = Number((candidate as Partial<PointLot>).earnedAt);
      const normalizedAmount = Math.floor(amount);
      if (!Number.isFinite(amount) || !Number.isFinite(earnedAt) || normalizedAmount <= 0) return [];
      return [{ amount: normalizedAmount, earnedAt: Math.floor(earnedAt) }];
    })
    .sort((left, right) => left.earnedAt - right.earnedAt);
}

export function getActivePointLots(value: unknown, now = Date.now()): PointLot[] {
  return normalizePointLots(value).filter((lot) => lot.earnedAt + POINTS_LIFETIME_MS > now);
}

export function getPointsBalance(lots: PointLot[]): number {
  return lots.reduce((total, lot) => total + lot.amount, 0);
}

export function consumeOldestPointLots(value: unknown, amount: number, now = Date.now()): PointLot[] {
  let remaining = Math.max(0, Math.floor(amount));
  return getActivePointLots(value, now).flatMap((lot) => {
    if (remaining <= 0) return [lot];
    const consumed = Math.min(lot.amount, remaining);
    remaining -= consumed;
    return lot.amount > consumed ? [{ ...lot, amount: lot.amount - consumed }] : [];
  });
}

export function getNextPointExpiry(lots: PointLot[]): PointExpirySummary | null {
  const earliestLot = lots[0];
  if (!earliestLot) return null;
  const expiresAt = earliestLot.earnedAt + POINTS_LIFETIME_MS;
  const amount = lots
    .filter((lot) => lot.earnedAt + POINTS_LIFETIME_MS === expiresAt)
    .reduce((total, lot) => total + lot.amount, 0);
  return { amount, expiresAt };
}