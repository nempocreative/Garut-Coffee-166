---
name: Mobile-to-web split
description: Durable guidance for keeping the Kopi Garut website responsive without coupling it to the native Expo app.
---

The Kopi Garut web and mobile experiences are separate frontends. The website owns its responsive browser layout, navigation, and route presentation; the Expo app owns the native mobile experience. Shared catalog and brand data may still come from the shared package.

**Why:** The browser needs a flexible desktop/tablet layout, while native needs a phone-first interaction model. Keeping the runtimes separate prevents responsive website work from destabilizing the mobile app.

**How to apply:** Build browser-facing screens in the web artifact and native screens in the mobile artifact. Reuse shared content and role rules where practical, but do not use Expo export as the web runtime or assume visual parity means shared layout code.

The web app should use normal document flow and responsive CSS, with a wide content container on desktop and the existing compact composition on small screens.

**Why:** A separate web runtime makes browser behavior observable and editable without adding web-specific branches to every native screen.

**How to apply:** Keep the web artifact's Vite entry point active for development and production. Treat mobile/web state as device-local unless a real server-side sync path exists.
