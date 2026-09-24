---
name: Mobile-to-web parity
description: Durable guidance for keeping the Kopi Garut browser experience identical to the Expo mobile system.
---

The Kopi Garut web entry point uses the Expo Router web export from the mobile artifact, served under its own website path. Keep routes, role rules, copy, assets, state, and behavior shared, while allowing the desktop web presentation to adapt independently at wide breakpoints.

**Why:** A single app source prevents route and behavior drift, but stretching phone layouts across desktop widths leaves awkward spacing and weak hierarchy.

**How to apply:** Keep the web artifact as a prefix-aware Expo export launcher. Make shared changes in the mobile source; use `Platform.OS` and viewport dimensions for desktop-only layout refinements. Verify both a desktop and a phone viewport.

Web-only behavior may branch at the mobile root layout with `Platform.OS === 'web'`; native phone sizing and component structure should remain unchanged. Keep web scrolling, bottom-menu behavior, and browser-safe animation fallbacks in the shared mobile components. Treat mobile/web state as device-local unless a real server-side sync path exists.
