---
name: Safari document scrolling
description: The Expo static web export must preserve document scrolling for Safari toolbar collapse.
---

The Expo web artifact uses browser document scrolling for long image-heavy pages; keep the fixed menu outside the document flow on desktop and reserve bottom space for the mobile web menu. Native routes keep their React Native ScrollView.

**Why:** The inner React Native web ScrollView made the home page stutter during preview scrolling because it combined a large image surface, animation work, and per-scroll visibility updates. Browser document scrolling lets the browser handle the main scroll path more efficiently.

**How to apply:** After every Expo web export, verify the generated HTML gives `html`, `body`, and `#root` usable viewport height and that the document grows beyond the viewport. Keep `viewport-fit=cover`, `visualViewport` height updates, and `env(safe-area-inset-bottom)` handling for the fixed menu. Throttle scroll-driven visibility state so repeated scroll events do not rerender consumers.