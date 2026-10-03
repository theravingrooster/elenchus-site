# Development and checks

Use Node.js 24 and install the locked dependencies with `npm ci`.

- `npm run dev`: run the development server.
- `npm run lint`: check source and tests.
- `npm test`: run component interaction tests in jsdom.
- `npm run build`: build and type-check the production site.

GitHub Actions runs lint, tests, and the production build on pushes and pull requests.
Vercel's existing Git integration publishes `main`; no deployment secrets are needed in CI.

The tests exercise navigation state, history events, the mobile drawer, the command
palette, and claim switching. They use the real React components and mock the Next.js
router. Check the built site in a browser for actual scrolling, keyboard focus, and
layout before publishing interface changes.

Public metadata lives in `lib/metadata.ts`. Keep the production origin, per-page
canonical URLs, sitemap, and sharing image in sync if the public domain changes.
The sharing image and favicon use Next.js's static metadata file conventions.

Read `CONSTITUTION.md`, `DESIGN.md`, `PAGES.md`, and `VOICE.md` before changing
the site's content or product scope.
