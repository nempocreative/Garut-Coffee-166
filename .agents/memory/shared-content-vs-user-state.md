---
name: Shared content vs user state
description: The Kopi Garut mobile and web builds share screens and some static content, but local state is isolated per device or browser origin.
---

Shared source files keep default catalog and hub content aligned, but they do not synchronize user or operational state. Authentication role selection, favorites, cart, orders, program applications, complaints, notifications, farm records, and extension records stored through AsyncStorage remain local to the current device or browser origin. The API must persist and return these records before HP-to-web synchronization can be claimed.

**Why:** The web artifact exports the Expo mobile routes, while AsyncStorage has separate stores on a phone and in a browser. A calendar endpoint that only acknowledges a snapshot is not persistence or two-way synchronization.

**How to apply:** When investigating parity, separate static content parity, responsive layout parity, and cross-device state synchronization. Do not describe the latter as complete until a shared server-side source of truth and a read-after-write path exist.