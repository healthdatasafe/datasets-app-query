# Changelog

## [Unreleased]

### Added

- **Deploy script and CI** (2026-11-27): `npm run deploy` (`scripts/deploy.sh`) deploys `main` to gh-pages from a
  clean tree not behind `origin/main`, refuses a `node_modules` out of sync with the lockfile or holding symlinks,
  writes `version.json` and waits until the site serves it (`scripts/verify-pages.sh`). GitHub Actions CI on Node 24:
  `npm ci`, lint, build.
- **`VITE_DATASETS_API`** overrides the datasets API base (local dev in a workspace with offset ports).
- **Dev server on `https://app-datasets.backloop.dev:5173/`** (`vite-plugin-backloop.dev`, dev server only;
  `npm run dev:raw` without it).
- **Third-party notices and security.txt** (2026-11-27, plan 132 P3): the build writes `THIRD-PARTY-NOTICES.txt`
  (every bundled package with its licence texts), linked from a footer as "Open-source software in this app";
  `public/.well-known/security.txt` as on www.healthdatasafe.org.
- **Licence: BSD-3-Clause** (2026-11-20, plan 132): `LICENSE`, `package.json` `license` and `author`, README
  footer, set with `source-licenser` (`npm run license`).

### Changed

- `tsconfig.tsbuildinfo` is no longer committed (the build regenerates it). README: npm commands, setup, deploy.

### Fixed

- Lint: unused `catch` binding in `src/api.ts` (2026-11-27).
