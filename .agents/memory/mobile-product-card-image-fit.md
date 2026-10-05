---
name: Mobile product-card image fit
description: Preserve complete product art and card bounds on the Garut Beans Web mobile homepage.
---

On Garut Beans Web mobile, show product-card artwork in full without cropping; size its image area to match the source image ratio and give the carousel enough height so the complete card and controls remain visible. Keep these refinements phone-only.

**Why:** The user explicitly corrected the Web mobile coffee carousel because the product image and card appeared cropped.

**How to apply:** Apply the phone-specific image and stage rules throughout the mobile layout (up to 767px), including widths above 420px. Verify 320px, 390px, 430px, and the 768px desktop breakpoint; account for carousel overflow and active-card transforms.
