---
name: Vite Web asset paths
description: Avoid double-prefixed asset URLs in the proxied Vite Web preview for content shown before React mounts.
---

For assets needed before React mounts, do not rely on `%BASE_URL%` substitution in static HTML when the Vite app is mounted under its artifact path. The Vite HTML transform and the preview mount can both apply the path prefix. Leave the static asset URL unset and assign it at runtime from `import.meta.env.BASE_URL`.

**Why:** A production build can contain the expected-looking URL while the proxied development preview resolves a double-prefixed URL and displays a broken image.

**How to apply:** Use the runtime Vite base for pre-React assets, then verify both the development preview and the production build.