---
name: Floating action visibility
description: Product behavior for the two floating shortcut icons during content scrolling.
---

The Mini Games and Live Chat floating shortcuts should be hidden while the user is scrolling and shown again shortly after scrolling stops.

**Why:** The user explicitly wants the floating shortcuts out of the way during reading and browsing, while keeping them available once the screen is still.

**How to apply:** Keep both shortcuts driven by the shared scroll-visibility state rather than implementing separate per-button scroll logic.