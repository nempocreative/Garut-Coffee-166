---
name: Expo iOS configuration
description: Expo SDK compatibility checks and splash-screen configuration for the Kopi Garut mobile app
---

Expo SDK 57 rejects a legacy top-level `splash` field in the static app configuration; use the `expo-splash-screen` config plugin for splash image and background settings, and run Expo Doctor after SDK package updates. If Expo Go fails immediately after scanning a Replit QR, use Expo tunnel mode; the public root can serve the web shell while native bundle paths require the tunnel route.

**Why:** The web preview can still bundle while an invalid native configuration blocks or breaks iOS build/startup behavior.

**How to apply:** After any Expo SDK or native package upgrade, run `expo install --check` and `expo-doctor`; resolve schema and version failures before investigating application screens. For device connection failures, start Expo with tunnel support and verify both the iOS manifest and Expo Router bundle return successfully before asking the user to rescan.