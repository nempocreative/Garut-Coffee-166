---
name: Shared workspace linking
description: Local workspace package symlink behavior in the Kopi Garut monorepo
---

New packages under `lib/*` can be present in the workspace manifest and app package.json files while still being unavailable to Vite and Metro until pnpm refreshes workspace links.

**Why:** Both previews previously failed with package-resolution errors even though the dependency declarations and workspace glob were correct.

**How to apply:** After adding or renaming a local workspace package, run the repository install step before restarting the affected web and mobile workflows.