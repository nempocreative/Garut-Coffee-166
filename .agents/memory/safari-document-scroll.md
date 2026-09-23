---
name: Safari document scrolling
description: The Expo static web export must preserve document scrolling for Safari toolbar collapse.
---

Do not leave the Expo static export's default `body{overflow:hidden}` reset in place on the browser artifact. Keep the root at least viewport-height, allow the document to scroll, and use standalone iOS metadata for users who add the site to the Home Screen.

**Why:** Safari does not reliably collapse its bottom browser toolbar when the page is implemented as an internal fixed-height scroll area. Removing the browser toolbar entirely is only available in standalone Home Screen mode; a normal Safari tab remains browser-controlled.

**How to apply:** After every Expo web export, verify the generated HTML reset still uses document scrolling and that the mobile web root retains viewport height. Keep native scrolling behavior unchanged.