import { getAuth } from "@clerk/express";
import {
  EarnBuyerPointsBody,
  EarnBuyerPointsResponse,
  GetBuyerPointsResponse,
  ImportLegacyBuyerPointsBody,
  ImportLegacyBuyerPointsResponse,
  RedeemBuyerPointsBody,
  RedeemBuyerPointsResponse,
  UseBuyerPointsVoucherBody,
  UseBuyerPointsVoucherResponse,
} from "@workspace/api-zod";
import { pool } from "@workspace/db";
import { Router, type IRouter, type Request, type Response } from "express";

const POINT_LIFETIME_DAYS = 365;
const POINT_LIFETIME_MS = POINT_LIFETIME_DAYS * 24 * 60 * 60 * 1000;
const GAME_HARVEST_POINTS = 10;

const rewards = {
  "discount-10k": { cost: 10_000 },
  "discount-25k": { cost: 25_000 },
  "discount-50k": { cost: 50_000 },
} as const;

type RewardId = keyof typeof rewards;
type PointLot = { amount: number; earnedAt: Date };

const router: IRouter = Router();

function requireBuyer(req: Request, res: Response): string | null {
  const userId = getAuth(req).userId;
  if (userId) return userId;
  res.status(401).json({ error: "Sign in to access buyer points." });
  return null;
}

async function loadBuyerPoints(userId: string) {
  const [lotsResult, vouchersResult] = await Promise.all([
    pool.query<{ amount: number; earnedAt: Date }>(
      `SELECT remaining AS amount, earned_at AS "earnedAt"
       FROM web_point_lots
       WHERE user_id = $1
         AND remaining > 0
         AND earned_at > NOW() - INTERVAL '${POINT_LIFETIME_DAYS} days'
       ORDER BY earned_at ASC, id ASC`,
      [userId],
    ),
    pool.query<{ rewardId: RewardId }>(
      `SELECT reward_id AS "rewardId"
       FROM web_point_vouchers
       WHERE user_id = $1 AND used_at IS NULL
       ORDER BY redeemed_at ASC, id ASC`,
      [userId],
    ),
  ]);

  const lots = lotsResult.rows.map((lot) => ({
    amount: Number(lot.amount),
    earnedAt: new Date(lot.earnedAt),
  }));
  return {
    balance: lots.reduce((total, lot) => total + lot.amount, 0),
    lots,
    vouchers: [...new Set(vouchersResult.rows.map((voucher) => voucher.rewardId))],
  };
}

router.get("/points", async (req, res): Promise<void> => {
  const userId = requireBuyer(req, res);
  if (!userId) return;

  const snapshot = await loadBuyerPoints(userId);
  res.json(GetBuyerPointsResponse.parse(snapshot));
});

router.post("/points/import", async (req, res): Promise<void> => {
  const userId = requireBuyer(req, res);
  if (!userId) return;
  const parsed = ImportLegacyBuyerPointsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const client = await pool.connect();
  let imported = false;
  let importedPoints = 0;
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [userId]);
    const priorImport = await client.query<{
      migrationId: string;
      userId: string;
      pointsImported: number;
    }>(
      `SELECT migration_id AS "migrationId",
              user_id AS "userId",
              points_imported AS "pointsImported"
       FROM web_point_imports
       WHERE user_id = $1 OR migration_id = $2
       LIMIT 1`,
      [userId, parsed.data.migrationId],
    );

    if (priorImport.rowCount === 0) {
      const now = Date.now();
      const activeLots: PointLot[] = parsed.data.lots
        .map((lot) => ({
          amount: lot.amount,
          earnedAt: lot.earnedAt.getTime() > now ? new Date(now) : lot.earnedAt,
        }))
        .filter((lot) => lot.earnedAt.getTime() + POINT_LIFETIME_MS > now);
      importedPoints = activeLots.reduce((total, lot) => total + lot.amount, 0);

      await client.query(
        `INSERT INTO web_point_imports (migration_id, user_id, points_imported)
         VALUES ($1, $2, $3)`,
        [parsed.data.migrationId, userId, importedPoints],
      );

      const event = await client.query<{ id: number }>(
        `INSERT INTO web_points_events (user_id, event_type, points_delta, idempotency_key)
         VALUES ($1, 'legacy_import', $2, $3)
         RETURNING id`,
        [
          userId,
          importedPoints,
          `legacy-import:${parsed.data.migrationId}`,
        ],
      );
      const eventId = event.rows[0]?.id;
      if (eventId === undefined) throw new Error("Could not create import event.");

      for (const lot of activeLots) {
        await client.query(
          `INSERT INTO web_point_lots (user_id, event_id, amount, remaining, earned_at)
           VALUES ($1, $2, $3, $3, $4)`,
          [userId, eventId, lot.amount, lot.earnedAt],
        );
      }
      for (const rewardId of parsed.data.vouchers) {
        await client.query(
          `INSERT INTO web_point_vouchers (user_id, reward_id)
           VALUES ($1, $2)
           ON CONFLICT (user_id, reward_id) WHERE used_at IS NULL DO NOTHING`,
          [userId, rewardId],
        );
      }
      imported = true;
    } else {
      const prior = priorImport.rows[0];
      if (
        prior?.userId === userId &&
        prior.migrationId === parsed.data.migrationId
      ) {
        imported = true;
        importedPoints = Number(prior.pointsImported);
      }
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }

  const snapshot = await loadBuyerPoints(userId);
  res.json(
    ImportLegacyBuyerPointsResponse.parse({
      ...snapshot,
      imported,
      importedPoints,
    }),
  );
});

router.post("/points/earn", async (req, res): Promise<void> => {
  const userId = requireBuyer(req, res);
  if (!userId) return;
  const parsed = EarnBuyerPointsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const client = await pool.connect();
  let awardedPoints = 0;
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [userId]);
    const event = await client.query<{ id: number }>(
      `INSERT INTO web_points_events (user_id, event_type, points_delta, idempotency_key)
       VALUES ($1, 'game_harvest', $2, $3)
       ON CONFLICT (user_id, idempotency_key) DO NOTHING
       RETURNING id`,
      [userId, GAME_HARVEST_POINTS, `game:${parsed.data.actionId}`],
    );
    const eventId = event.rows[0]?.id;
    if (eventId !== undefined) {
      await client.query(
        `INSERT INTO web_point_lots (user_id, event_id, amount, remaining, earned_at)
         VALUES ($1, $2, $3, $3, NOW())`,
        [userId, eventId, GAME_HARVEST_POINTS],
      );
      awardedPoints = GAME_HARVEST_POINTS;
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }

  const snapshot = await loadBuyerPoints(userId);
  res.json(EarnBuyerPointsResponse.parse({ ...snapshot, awardedPoints }));
});

router.post("/points/redeem", async (req, res): Promise<void> => {
  const userId = requireBuyer(req, res);
  if (!userId) return;
  const parsed = RedeemBuyerPointsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const rewardId = parsed.data.rewardId as RewardId;
  const reward = rewards[rewardId];
  const client = await pool.connect();
  let insufficientPoints = false;
  let alreadyOwned = false;
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [userId]);
    const idempotencyKey = `redeem:${parsed.data.actionId}`;
    const priorEvent = await client.query(
      `SELECT id FROM web_points_events
       WHERE user_id = $1 AND idempotency_key = $2`,
      [userId, idempotencyKey],
    );
    if (priorEvent.rowCount === 0) {
      const activeVoucher = await client.query(
        `SELECT id FROM web_point_vouchers
         WHERE user_id = $1 AND reward_id = $2 AND used_at IS NULL
         LIMIT 1`,
        [userId, rewardId],
      );
      if ((activeVoucher.rowCount ?? 0) > 0) {
        alreadyOwned = true;
      } else {
        const lots = await client.query<{ id: number; remaining: number }>(
          `SELECT id, remaining
           FROM web_point_lots
           WHERE user_id = $1
             AND remaining > 0
             AND earned_at > NOW() - INTERVAL '${POINT_LIFETIME_DAYS} days'
           ORDER BY earned_at ASC, id ASC
           FOR UPDATE`,
          [userId],
        );
        const balance = lots.rows.reduce(
          (total, lot) => total + Number(lot.remaining),
          0,
        );
        if (balance < reward.cost) {
          insufficientPoints = true;
        } else {
          const event = await client.query<{ id: number }>(
            `INSERT INTO web_points_events (user_id, event_type, points_delta, idempotency_key)
             VALUES ($1, 'redeem', $2, $3)
             ON CONFLICT (user_id, idempotency_key) DO NOTHING
             RETURNING id`,
            [userId, -reward.cost, idempotencyKey],
          );
          const eventId = event.rows[0]?.id;
          if (eventId !== undefined) {
            let remainingToSpend = reward.cost;
            for (const lot of lots.rows) {
              if (remainingToSpend <= 0) break;
              const balanceInLot = Number(lot.remaining);
              const consumed = Math.min(balanceInLot, remainingToSpend);
              remainingToSpend -= consumed;
              await client.query(
                `UPDATE web_point_lots
                 SET remaining = remaining - $1
                 WHERE id = $2 AND user_id = $3`,
                [consumed, lot.id, userId],
              );
            }
            await client.query(
              `INSERT INTO web_point_vouchers (user_id, reward_id)
               VALUES ($1, $2)`,
              [userId, rewardId],
            );
          }
        }
      }
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }

  if (insufficientPoints) {
    res.status(400).json({ error: "Not enough active points for this reward." });
    return;
  }
  if (alreadyOwned) {
    res.status(400).json({ error: "This voucher is already active." });
    return;
  }

  const snapshot = await loadBuyerPoints(userId);
  res.json(RedeemBuyerPointsResponse.parse(snapshot));
});

router.post("/points/vouchers/use", async (req, res): Promise<void> => {
  const userId = requireBuyer(req, res);
  if (!userId) return;
  const parsed = UseBuyerPointsVoucherBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const client = await pool.connect();
  let used = false;
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [userId]);
    const result = await client.query(
      `UPDATE web_point_vouchers
       SET used_at = NOW(), order_id = $3
       WHERE user_id = $1
         AND reward_id = $2
         AND used_at IS NULL
       RETURNING id`,
      [userId, parsed.data.rewardId, parsed.data.orderId],
    );
    used = (result.rowCount ?? 0) > 0;
    if (!used) {
      const duplicateUse = await client.query(
        `SELECT id FROM web_point_vouchers
         WHERE user_id = $1 AND reward_id = $2 AND order_id = $3
         LIMIT 1`,
        [userId, parsed.data.rewardId, parsed.data.orderId],
      );
      used = (duplicateUse.rowCount ?? 0) > 0;
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }

  if (!used) {
    res.status(400).json({ error: "This voucher is not active on the account." });
    return;
  }
  const snapshot = await loadBuyerPoints(userId);
  res.json(UseBuyerPointsVoucherResponse.parse(snapshot));
});

export default router;