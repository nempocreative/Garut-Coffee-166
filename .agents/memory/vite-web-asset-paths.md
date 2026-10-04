---
name: Vite Web asset paths
description: Avoid double-prefixed asset URLs in the proxied Vite Web preview for content shown before React mounts.
---

For assets loaded after React starts, use `import.meta.env.BASE_URL`; do not rely on `%BASE_URL%` substitution in static `src` or preload URLs under an artifact path, because the Vite HTML transform and preview mount can both apply the prefix.

For the small brand mark shown by the initial loader, create a preload link in a classic inline script and assign the same artifact asset path from a synchronous inline script immediately after the loader markup. Do not put the already-prefixed path in a static HTML `href`: Vite adds the artifact base again.

**Why:** The proxied preview can double-prefix static Vite asset URLs, and waiting for the app bundle to assign a correct URL leaves the first loader frame blank.

**How to apply:** Use the runtime Vite base for regular app assets. For an immediate loader mark, create the preload in JavaScript and use its exact URL for the loader image before the app module runs; verify the request returns the image file and not the Vite shell.