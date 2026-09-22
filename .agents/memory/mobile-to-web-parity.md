---
name: Mobile-to-web parity
description: Durable guidance for keeping the Kopi Garut browser experience identical to the Expo mobile system.
---

The Kopi Garut web entry point must launch the Expo Router web build, not maintain a second React/Vite implementation. The mobile app is the single source of truth for screens, routes, role rules, copy, assets, state, and behavior.

**Why:** The product requirement is exact parity in structure and behavior, not an approximate visual recreation. A second web router inevitably drifts.

**How to apply:** Keep the web artifact as a prefix-stripping launcher to the Expo development/production host. When mobile routes or UI change, verify them through the web launcher; do not rebuild the same screen in the old web source.