---
name: Role-based access
description: The mobile app currently uses a device-local role session because no external authentication provider is configured.
---

Use the centralized role-to-route rules as the boundary for menu visibility and deep-link protection. The current MVP supports Pengguna, Petani, and Penyuluh profiles stored locally; replace the session source with server authentication later without changing the access model.

**Why:** The project has no configured auth provider, but program menus still need predictable role-specific behavior for demos and early product validation.

**How to apply:** Keep public discovery available to guests, require a selected role for internal program routes, and avoid presenting protected data as if it were server-authorized until real authentication is connected.