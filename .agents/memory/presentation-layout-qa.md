---
name: Presentation layout QA
description: Durable layout rules for the Kopi Garut presentation when typography or content density changes.
---

When presentation text is enlarged for readability, preserve a dedicated footer safe area and reflow dense card grids to reduce row count instead of hiding overflow. In split layouts, keep a visible gap between lead copy and any bottom philosophy/list block.

**Why:** Fixed two-column grids and bottom footers can collide when larger text increases card height; screenshots caught overlaps that static manifest and type checks cannot detect.

**How to apply:** After typography changes, preview representative slides at the presentation viewport, check the densest cards and phone mockups, and move or reflow blocks before considering smaller text or clipping. Shorten supporting copy before shrinking body type when a list begins to collide with the lead paragraph.