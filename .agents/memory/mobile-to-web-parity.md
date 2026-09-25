---
name: Web and app content parity
description: Keep the Garut Beans web artifact standalone while aligning its content and routes with Expo.
---

Keep the Kopi Garut web artifact as its own React/Vite app with its own web layout and base path. Align its routes, domain copy, shared data, and access rules with the Expo app without redirecting the website to `/`.

**Why:** Redirecting the website to the Expo root made the desktop artifact render the app shell instead of the intended standalone web experience. Shared domain data can preserve content parity without replacing the web entry point.

**How to apply:** Keep URL prefixes and navigation local to each artifact. Extract domain-level copy/data into the shared package where practical; use web-specific presentation on desktop while keeping mobile behavior in Expo. Check web and native route access separately.

Browser storage is shared only on the same browser origin; it does not sync with native-device storage unless a real server-side sync path exists.

For visual parity work, compare the web and Expo previews at the same phone viewport. Treat the Expo home screen as the mobile spacing and ordering reference, while preserving the web-specific desktop layout.

**Why:** The two artifacts share content but not rendering primitives, so screenshots at matched dimensions catch spacing and hierarchy drift that shared data cannot.

**How to apply:** Keep mobile-only parity overrides inside the web mobile breakpoint; do not copy those overrides into the desktop rules.
