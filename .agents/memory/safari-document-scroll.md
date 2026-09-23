---
name: Safari document scrolling
description: The Expo static web export must preserve document scrolling for Safari toolbar collapse.
---

The Expo web artifact uses an explicit viewport-sized web ScrollView with a fixed bottom menu. Keep the root and body at viewport height, and preserve standalone iOS metadata for users who add the site to the Home Screen.

**Why:** The Expo static export's document scroll and flex-height behavior varied across preview/browser routes, leaving the page unscrollable. A dedicated web ScrollView is reliable; removing the browser toolbar entirely is only available in standalone Home Screen mode.

**How to apply:** After every Expo web export, verify the generated HTML gives `html`, `body`, and `#root` viewport height without an extra hidden inner wrapper. Keep native scrolling behavior unchanged and reserve bottom space for the fixed web menu.