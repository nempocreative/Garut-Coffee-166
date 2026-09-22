---
name: Mobile-to-web parity
description: Durable guidance for keeping the Kopi Garut browser experience identical to the Expo mobile system.
---

The Kopi Garut web entry point must launch the Expo Router web build, not maintain a second React/Vite implementation. The mobile app is the single source of truth for screens, routes, role rules, copy, assets, state, and behavior.

**Why:** The product requirement is exact parity in structure and behavior, not an approximate visual recreation. A second web router inevitably drifts.

**How to apply:** Keep the web artifact as a prefix-stripping launcher to the Expo development/production host. In development, watch the mobile source and rebuild the web export automatically after relevant mobile changes. When mobile routes or UI change, verify them through the web launcher; do not rebuild the same screen in the old web source.

For web-only layout changes, branch at the mobile root layout using `Platform.OS === 'web'`; do not change the native max-width behavior just to make the browser export fill the viewport.

**Why:** The browser artifact is generated from the mobile source, so edits in the older web source do not affect the live web URL, while unscoped layout changes can break the native phone composition.

**How to apply:** Keep the native viewport constrained for the phone UI and let only the web viewport stretch to 100% width. Validate through the web launcher after its watched rebuild completes.

On web, the bottom navigation belongs at the end of each scrollable page rather than as a viewport overlay; native keeps the persistent bottom navigation.

**Why:** Safari users expect a normal document footer to move below the content when scrolling, while the native app uses persistent navigation.

**How to apply:** Render the web menu from the shared `Screen` flow and keep the native menu in the root layout. Verify both the iPhone web route and native typecheck after changes.

For small looping motion, keep a browser-safe fallback when a Reanimated worklet is not visibly advancing in the static Expo web export; the mobile implementation can continue using Reanimated.

**Why:** The Expo web bundle can contain the correct animated component and asset while browser rendering still fails to show the motion consistently.

**How to apply:** Pair the native Reanimated animation with a lightweight web-only state/timer fallback for important decorative motion that must be visible in both artifacts.