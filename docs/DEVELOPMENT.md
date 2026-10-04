# Development and checks

Use Node.js 24 and install the locked dependencies with `npm ci`.

- `npm run dev`: run the development server.
- `npm run lint`: check source and tests.
- `npm test`: run component interaction tests in jsdom.
- `npm run build`: build and type-check the production site.

GitHub Actions runs lint, tests, and the production build on pushes and pull requests.
Vercel's existing Git integration publishes `main`; no deployment secrets are needed in CI.

The Examine examples can be read from Supabase `public.claims`. Configure
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel Preview
and Production, or in an ignored `.env.local` for local development. Use the anon
key only; never add a database password or service role key to the application.
`lib/claims.ts` reads published rows ordered by position on the server, with a
five-second timeout for foreground reads and a 60-second fetch cache. It returns the examples in
`content/practice.ts` if either variable is missing, the read fails, or the result
is empty or does not match the four-turn example shape. Builds and CI work without
these variables. The chat receives only claim data, and there are no client writes.

The ordered Examine track uses School, Family, then Medicine: baseline,
comparable populations and follow-up, then a modeled alternative and its assumptions.
Supabase's existing `position` field supplies the order; this requires no schema
change. Keep published row positions and the fallback array in that order, with
the first claim selected by default. Preserve the existing fallback behavior.
Numbered selectors allow skipping and revisiting any headline and cancel a pending
reply. After four completed replies, an intermediate example offers “Next headline”,
which resets the next example to its headline and sources with no questions sent.
The final example shows “End of track”. The counter tracks questions within the
current example, and progress is not saved. There is no gating, grading, or
completion celebration.

The tests exercise navigation state, history events, the mobile drawer, the command
palette, claim switching, and cumulative chat navigation including append, truncation, bounds, and reset. Track checks cover ordered advancement after four finished replies, reset on advancement, direct selection and cancellation during replies, revisiting, and the final track state. They use the real React components and mock the Next.js
router. Check the built site in a browser for actual scrolling, keyboard focus, and
layout before publishing interface changes.

Public metadata lives in `lib/metadata.ts`. Keep the production origin, per-page
canonical URLs, sitemap, and sharing image in sync if the public domain changes.
The sharing image and favicon use Next.js's static metadata file conventions.

Read `CONSTITUTION.md`, `DESIGN.md`, `PAGES.md`, and `VOICE.md` before changing
the site's content or product scope.
