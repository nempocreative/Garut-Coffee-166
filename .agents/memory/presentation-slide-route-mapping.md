---
name: Presentation slide route mapping
description: How the slide preview URL relates to JSX component filenames in the Garut Beans deck.
---

The slide preview route `/slideN` identifies the slide's manifest position, not necessarily a component file named `SlideN.tsx`.

**Why:** The deck contains legacy component filenames and a reordered manifest; editing by filename can change a different slide than the one visible at a route.

**How to apply:** Read `src/data/slides-manifest.json` first, map the requested slide number through `position`, then edit the filepath listed for that position and verify the matching `/slideN` preview.