# DEPLOY_STATE — FTLDee

- **Canonical URL:** https://t3dy.github.io/FTLDee/ (game) · https://t3dy.github.io/FTLDee/portal/ (companion portal)
- **Host:** GitHub Pages, source = GitHub Actions (enabled 2026-10-03 via `gh api -X POST repos/t3dy/FTLDee/pages -f build_type=workflow`).
- **Repo / branch:** github.com/t3dy/FTLDee, branch `master`. The workflow (`.github/workflows/deploy.yml`) triggers on `main` and `master`.
- **Build:** `npm run build` with `VITE_BASE_URL=/FTLDee/` (set in the workflow). `vite.config.ts` reads it; local dev uses `/`.
  A build without that variable 404s every asset on Pages — the workspace's most common break.
- **Portal:** `portal/` is static HTML copied into `dist/portal/` by the workflow; links back to the game with `../index.html`.
- **Env vars / secrets:** none.
- **Dev-only hook:** `window.__ftldee` exists only under `import.meta.env.DEV`; absent in production (verified 2026-10-03).
- **Verification 2026-10-03:** `/` and `/portal/` return 200; game starts, HUD and 8-room Mortlake plan render, no console errors.
