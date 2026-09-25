---
name: Web and app content parity
description: Keep the Garut Beans web artifact standalone while aligning its content and routes with Expo.
---

Keep the Kopi Garut web artifact as its own React/Vite app with its own web layout and base path. Align its routes, domain copy, shared data, and access rules with the Expo app without redirecting the website to `/`.

**Why:** Redirecting the website to the Expo root made the desktop artifact render the app shell instead of the intended standalone web experience. Shared domain data can preserve content parity without replacing the web entry point.

**How to apply:** Keep URL prefixes and navigation local to each artifact. Extract domain-level copy/data into the shared package where practical; use web-specific presentation on desktop while keeping mobile behavior in Expo. Check web and native route access separately.

Browser storage is shared only on the same browser origin; it does not sync with native-device storage unless a real server-side sync path exists.

For exact mobile-web parity, route narrow web viewports to the Expo app's web route on the same origin instead of maintaining a second set of mobile screens. Keep the standalone web implementation for desktop.

**Why:** The standalone web and Expo apps have independent screen implementations; their content and layout drift structurally. Reusing the Expo route is the reliable way to keep mobile web identical without replacing the desktop website.

**How to apply:** Use the Expo app's desktop breakpoint as the redirect threshold, preserve route paths and query strings when leaving the web artifact prefix, and keep desktop web routing unchanged.
