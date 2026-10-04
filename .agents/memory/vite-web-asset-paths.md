---
name: Vite Web asset paths
description: Avoid double-prefixed asset URLs in the proxied Vite Web preview for content shown before React mounts.
---

For assets loaded after React starts, use `import.meta.env.BASE_URL`; do not rely on `%BASE_URL%` substitution in static `src` or preload URLs under an artifact path, because the Vite HTML transform and preview mount can both apply the prefix.

For the small brand mark shown by the initial loader, preload its known artifact asset path and assign it from a synchronous inline script immediately after the loader markup. This starts the correct request before the app bundle can delay it.

**Why:** The proxied preview can double-prefix static Vite asset URLs, and waiting for the app bundle to assign a correct URL leaves the first loader frame blank.

**How to apply:** Use the runtime Vite base for regular app assets. For a loader mark that must appear immediately, use the artifact's explicit asset path in a preload hint and in the synchronous bootstrap script; verify the request returns the image file.