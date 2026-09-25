---
name: Mobile-to-web parity
description: Durable guidance for keeping the Kopi Garut browser experience identical to the Expo mobile system.
---

The Kopi Garut web artifact is a prefix-aware redirect into the Expo app served at `/`. Strip the web artifact prefix while preserving the route, query, and hash so both entry points use the same screens, access rules, content, and browser storage.

**Why:** The former standalone web copy had parallel route implementations and separate storage keys, leaving field-operation screens incomplete and user state inconsistent. The Expo app already has web-responsive layout handling, so forwarding avoids maintaining a second product implementation.

**How to apply:** Make content and behavior changes in the Expo app. Keep the web redirect route-preserving; do not restore duplicate page implementations. Use `Platform.OS` and viewport dimensions for desktop-only refinements while preserving native phone layout and browser scroll behavior.

Browser storage is shared only on the same browser origin; it does not sync with native-device storage unless a real server-side sync path exists.
