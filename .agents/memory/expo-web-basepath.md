---
name: Expo web artifact base paths
description: The reliable way to serve an Expo Router web build under a Replit artifact preview prefix.
---

Expo Router's development bundle keeps route matching in development mode and does not apply the configured base URL when the browser is opened under a Replit artifact prefix. A same-source static export with `experiments.baseUrl`, served by a prefix-aware static server, preserves the browser URL and avoids external redirects.

**Why:** Proxying a development Metro server can return the correct HTML and bundle while the hydrated router still resolves `/artifact-prefix/...` as an unknown route. It can also conflict with the separate mobile Metro workflow.

**How to apply:** Keep the UI source shared with mobile, set the web-only base path through a dynamic Expo config, export web assets before serving, and map the artifact prefix to the exported files. Do not redirect to the Expo dev domain.