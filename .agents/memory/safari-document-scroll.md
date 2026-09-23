---
name: Safari document scrolling
description: The Expo static web export must preserve document scrolling for Safari toolbar collapse.
---

The Expo web artifact uses an explicit viewport-sized web ScrollView with a fixed bottom menu. Keep the root and body at viewport height, derive a CSS viewport variable from `visualViewport` when available, and preserve standalone iOS metadata for users who add the site to the Home Screen.

**Why:** The Expo static export's document scroll and flex-height behavior varied across preview/browser routes, leaving the page unscrollable. A dedicated web ScrollView is reliable, and browser chrome can change the visible viewport while the page is open. Removing the browser toolbar entirely is only available in standalone Home Screen mode.

**How to apply:** After every Expo web export, verify the generated HTML gives `html`, `body`, and `#root` viewport height without an extra hidden inner wrapper. At runtime update `--kg-viewport-height` from `visualViewport.resize` with a `100dvh` fallback. Use `viewport-fit=cover` and `env(safe-area-inset-bottom)` for the fixed menu, keep native scrolling unchanged, and reserve matching bottom space.