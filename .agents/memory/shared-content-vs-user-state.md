---
name: Shared content vs user state
description: The Kopi Garut mobile and web builds share screens and some static content, but local state is isolated per device or browser origin.
---

Shared source files keep default catalog and hub content aligned, but they do not synchronize user or operational state. Authentication role selection, favorites, cart, orders, program applications, complaints, notifications, farm records, and extension records stored through AsyncStorage remain local to the current device or browser origin. The API must persist and return these records before HP-to-web synchronization can be claimed.

**Why:** The web artifact exports the Expo mobile routes, while AsyncStorage has separate stores on a phone and in a browser. A calendar endpoint that only acknowledges a snapshot is not persistence or two-way synchronization.

**How to apply:** When investigating parity, separate static content parity, responsive layout parity, and cross-device state synchronization. Do not describe the latter as complete until a shared server-side source of truth and a read-after-write path exist.

Garut Beans Web loyalty points and vouchers are persisted on a Clerk buyer account and remain separate from the mobile app. Delivery addresses stay browser-local.

**Why:** The user chose account-linked Web points and vouchers, a one-time copy of legacy browser data, and no synchronization with mobile. Delivery addresses remain local.

**How to apply:** Do not use the device-local role as buyer identity; use the authenticated account for loyalty reads and writes. Never suggest that Web points, vouchers, or addresses appear in the mobile app.

G-Beans Web points expire 365 days after earning. Redeeming rewards consumes the oldest active points first. Legacy numeric balances without earning dates receive a one-year grace period when migrated.

**Why:** The user set a one-year expiry rule, and older browser balances do not contain earning timestamps.

**How to apply:** Record each Web point award with its earning time and avoid expiring legacy balances immediately during migration.

New Web Mini Game harvest actions award a fixed 10 PT.

**Why:** The user chose a consistent 10 PT reward for each harvest action.

**How to apply:** Keep the displayed reward and server-awarded amount aligned; do not let the browser choose a different amount.