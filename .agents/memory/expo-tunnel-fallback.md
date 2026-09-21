---
name: Expo tunnel fallback
description: Why the Kopi Garut mobile workflow needs a local-network fallback during Expo tunnel outages.
---

The mobile development command should try Expo tunnel mode first, then fall back to LAN mode if the tunnel exits. Expo dependency checks can pass while the tunnel service still disconnects, and that failure otherwise stops Metro even though the app itself is healthy.

**Why:** The Replit mobile workflow previously stopped with `failed to start tunnel: remote gone away`, while Metro could start normally in LAN mode.

**How to apply:** Preserve the tunnel-first/LAN-fallback behavior when changing the mobile dev command. Treat native DevTools shared-library messages as non-blocking if Metro reaches its QR/Web output.