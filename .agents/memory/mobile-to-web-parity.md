---
name: Mobile-to-web parity
description: Durable guidance for keeping the Kopi Garut browser experience identical to the Expo mobile system.
---

The Kopi Garut web entry point uses the Expo Router web export from the mobile artifact, served under its own website path. The mobile app is the single source of truth for screens, routes, role rules, copy, assets, state, and behavior.

**Why:** The user requires the website and app to look and behave the same. A separate web router or duplicate screen implementation will drift from the mobile source.

**How to apply:** Keep the web artifact as a prefix-aware Expo export launcher. Watch the mobile source in development and rebuild the website export after relevant mobile changes. Make visual or route changes in the mobile artifact first.

Web-only behavior may branch at the mobile root layout with `Platform.OS === 'web'`, but native phone sizing and component structure should remain unchanged.

**Why:** The browser needs document scrolling and its own safe-area handling, while the native app must keep device-safe insets and phone interaction behavior.

**How to apply:** Keep web scroll handling, bottom menu behavior, and browser-safe animation fallbacks in the shared mobile components. Treat mobile/web state as device-local unless a real server-side sync path exists.
