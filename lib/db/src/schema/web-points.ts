import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const webPointsEventsTable = pgTable(
  "web_points_events",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    eventType: text("event_type").notNull(),
    pointsDelta: integer("points_delta").notNull(),
    idempotencyKey: text("idempotency_key").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("web_points_events_user_key").on(
      table.userId,
      table.idempotencyKey,
    ),
    index("web_points_events_user_created").on(table.userId, table.createdAt),
  ],
);

export const webPointLotsTable = pgTable(
  "web_point_lots",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    eventId: integer("event_id")
      .notNull()
      .references(() => webPointsEventsTable.id),
    amount: integer("amount").notNull(),
    remaining: integer("remaining").notNull(),
    earnedAt: timestamp("earned_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("web_point_lots_user_earned").on(table.userId, table.earnedAt),
  ],
);

export const webPointImportsTable = pgTable(
  "web_point_imports",
  {
    migrationId: text("migration_id").primaryKey(),
    userId: text("user_id").notNull(),
    pointsImported: integer("points_imported").notNull().default(0),
    importedAt: timestamp("imported_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [uniqueIndex("web_point_imports_user").on(table.userId)],
);

export const webPointVouchersTable = pgTable(
  "web_point_vouchers",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    rewardId: text("reward_id").notNull(),
    redeemedAt: timestamp("redeemed_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    orderId: text("order_id"),
  },
  (table) => [
    index("web_point_vouchers_user_active").on(table.userId, table.usedAt),
    uniqueIndex("web_point_vouchers_one_active_reward")
      .on(table.userId, table.rewardId)
      .where(sql`${table.usedAt} is null`),
  ],
);