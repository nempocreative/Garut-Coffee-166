---
name: Expo DevTools warning
description: Environment warning seen when Expo tries to install optional React Native DevTools
---

Expo can log an error about `libgbm.so.1` while installing the optional React Native DevTools binary, then continue starting Metro and bundling the app successfully.

**Why:** The missing shared library affects the optional debugging binary, not the Expo app bundle or preview server.

**How to apply:** Treat the warning as non-blocking when the Expo workflow reports a tunnel, Metro, and web bundle successfully. Only investigate it if the app itself fails to start or preview.