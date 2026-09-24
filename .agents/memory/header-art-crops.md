---
name: Header artwork crop safety
description: Practical crop constraints when placing generated images in wide mobile headers.
---

Wide header artwork can crop the top and bottom of AI-generated square images even when the prompt requests a panoramic scene. Put the essential figure and landmarks inside the central horizontal band, and keep expendable sky or foreground outside it.

**Why:** The shared header renders images with `preserveAspectRatio="xMidYMid slice"`, and generated output dimensions may not match the requested banner shape.

**How to apply:** Inspect generated assets before wiring them into the header, check the actual phone-sized crop, and refine the composition if the subject clips or becomes oversized.