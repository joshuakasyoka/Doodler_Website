# assets-source

Original and working files: camera RAW, PSD, Figma exports, oversized masters, original videos.
**Everything in this folder except this README is git-ignored.** Only serve-ready, pre-sized
files go in `/public` (see CONTENT.md → "Add or replace an image").

## Where the canonical masters live

- **Old static site** (HTML, CSS, original images and videos):
  `~/Doodler Website/site/`. `original-site/` here is a copy of its HTML pages and logo, used by
  `npm run copy:audit` and the migration scripts in `scripts/migration/`.
- **Original videos** before re-encoding: `videos/` here (copied from `~/Doodler Website/site/assets/media/`).
- **Hero animation source** (React + esbuild): `~/Doodler Website/app-animation/`.
- **Photography and design masters**: TODO, record the shared drive or Figma file that holds them.

When you add a master, note here where the full-size original lives so it can be re-exported later.
