# content/

Every word that appears on the site lives here, grouped by homepage section plus `chrome.ts`.
Owner: Elenchus Voice. Components in `components/` and `app/` only read from these files.

The authored site is one scrolling page: Home, Why we question, then Examine. The Why section
uses concise contextual prose from `why.ts` instead of numbered Method instructions. Navigation
and the command palette offer Home, Why, and Examine. Why preserves the `#method` anchor;
legacy routes redirect to the relevant homepage anchor.

Voice writes every string here against `/docs/VOICE.md`. Closing questions, CTAs, and chrome strings
named in `/docs/PAGES.md` or `/docs/DESIGN.md` are verbatim; change them only when the docs change.
