# Changelog

## [Unreleased]

### Added

- **Third-party notices and security.txt** (2026-11-27, plan 132 P3): the build writes `THIRD-PARTY-NOTICES.txt`
  (every bundled package with its licence texts), linked from a footer as "Open-source software in this app";
  `public/.well-known/security.txt` as on www.healthdatasafe.org.
- **Licence: BSD-3-Clause** (2026-11-20, plan 132): `LICENSE`, `package.json` `license` and `author`, README
  footer, set with `source-licenser` (`npm run license`).

### Fixed

- Lint: unused `catch` binding in `src/api.ts` (2026-11-27).
