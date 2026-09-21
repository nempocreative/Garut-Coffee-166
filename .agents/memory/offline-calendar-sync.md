---
name: Offline calendar sync
description: The offline-first synchronization decision for field workflows with unreliable connectivity.
---

For field workflows, keep the device-local record authoritative while offline, persist a pending-sync marker beside it, and retry through the generated API client when a lightweight reachability check succeeds. This keeps data entry usable on both Expo native and web without adding a native connectivity dependency.

**Why:** The product must remain usable in weak-signal areas, and the workspace supports both Expo native and web previews. A native-only network listener would add compatibility and dependency risk for a feature that can retry safely.

**How to apply:** Use the same pattern for other field records that need offline entry. Keep server sync idempotent at the snapshot or record level before adding conflict resolution.