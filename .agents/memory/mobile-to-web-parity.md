---
name: Mobile-to-web parity
description: Durable guidance for keeping the Kopi Garut web experience duplicated from the Expo mobile system.
---

When duplicating an Expo flow into the web app, treat the mobile routes, role rules, copy, and local state behavior as the source of truth. Reuse shared package data where possible; adapt only navigation, layout primitives, and platform-specific controls to the 430px web canvas.

**Why:** The product requirement is parity across navigation, roles, data, screens, and behavior, not just matching colors or a landing page. A generic web hub quickly drifts from the mobile system.

**How to apply:** Add every mobile route to the web router, keep protected routes behind the shared `canAccessRoute` rules, and use persistent local state for web equivalents of mobile form and action flows until a shared backend is introduced.