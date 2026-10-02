---
name: Mockup CSS extraction
description: Keep sandboxed copies of existing pages accurate across empty and populated states.
---

When extracting an existing page into the mockup sandbox, copy the structural base CSS the component depends on—such as display, flex, grid, and positioning rules—in addition to theme tokens and visual refinements.

**Why:** The Pesanan empty state rendered correctly while the history cards and status timeline broke because their base layout rules were not in the group stylesheet.

**How to apply:** Compare the original component's CSS dependencies and verify both empty and populated states at desktop and mobile sizes before marking a mockup live.