---
name: Expo font loading
description: Keep Expo web preview usable when custom font loading does not resolve.
---

The root loading gate needs a timeout fallback in addition to the normal `fontsLoaded` and `fontError` states. Web preview font loading can stall without reporting an error, which leaves the branded loading screen visible forever even though the router and Metro bundle are healthy.

**Why:** The mobile preview stayed on the custom Kopi Garut splash indefinitely while Metro reported a successful web bundle.

**How to apply:** Keep the font gate for normal startup, but release the app after a short bounded timeout and let the system fallback font render if font loading remains unresolved.