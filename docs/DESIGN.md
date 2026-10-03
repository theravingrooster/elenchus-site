# Elenchus — Design

Visual family: Nous Research + Wyandanch Consulting.
Not a copy. Same discipline: one metaphor, huge type, tiny palette, interface chrome, almost no decoration.

## Metaphor

An examination room / research terminal.
The page should feel like an instrument you pick up, not a brochure that sells you a course.

Status-bar, command palette, question IDs, and mono labels are allowed.
Classroom clipart, mortarboards, lightbulbs, brains, and purple AI glow are not.

## Color

Two colors plus paper. No gradients.

| Token | Value | Use |
|---|---|---|
| Paper | `#0E0D0B` | Page ground |
| Ink | `#EDE6D6` | Type, rules, UI |
| Rule | `rgba(237,230,214,0.12)` | Grid, hairlines |
| Warn | `#EDE6D6` | Same as ink. Do not add a "brand accent" red/blue until v2 |

Hover states invert ink and paper. Never introduce a third hue. No glow.

v1 is dark by default (Ryan, Sep 25). The light pair, paper `#F4EFE4` and ink `#1A1714`, is retired and is not a toggle. There is one theme, and themes are never mixed on one page.

## Type

- Display: a sharp serif with real italics (source a comparable cut; do not default to Inter / Roboto / system UI for headlines).
- Body: the same serif at reading size, or a quiet grotesque if the serif fails at 16px.
- Mono: Geist Mono / IBM Plex Mono / Face for question IDs, status, paths, `Q-014`, `claim://`.

Rules:

- Hero type should feel too large, then get pulled back one step.
- Tracking on display: slightly tight.
- Never set body below 17px on desktop.
- One idea per block. If a heading needs a subtitle and a kicker and a badge, delete two of them.

## Layout

- Wide margins. Content column ~64–72ch for reading, full bleed only for the hero wordmark.
- Hairline rules instead of cards-with-shadows.
- Grid overlay at ~8% ink, the same grid on Home, Method, Examine, and Who. It stays mounted and visible while scrolling; never fade it to zero.
- Section labels in mono, left or overline: `01 / METHOD`, `02 / DRILL`.

## Motion

Allowed:

- Lenis (or equivalent) smooth scroll
- Hero question settling after load (40–80ms, no bounce)
- Command palette (`⌘K`) that jumps to sections
- 120ms ink wipes on buttons
- Staggered section labels on first intersection

Forbidden:

- Particle fields, 3D globes, looping gradients
- Autoplaying video backgrounds
- Bounce, elastic, confetti
- Motion that delays reading the question

## UI chrome

Use sparingly, as proof the site is an instrument:

- Command palette placeholder: `Jump to a section`. The palette only navigates; it saves nothing.
- On phones, the palette has a visible `Jump` button beside `Menu`; wider screens keep the `⌘K` hint.
- Header: wordmark and navigation, without a repeated status bar.
- Footer: wordmark and a `Back to top` link.

Do not build a fake terminal that types marketing copy.

## Components

Site buttons stay rectangular. The Oct 2, 2026 follow-up makes the demo an example conversation: a rounded panel with short message bubbles, reader questions on the right in ink-on-paper inversion, and Elenchus replies on the left. Small example selectors replace the three full-width table cells. Keep the history in a bounded, keyboard-scrollable area; sending a question shows it immediately, followed by an 800ms typing pause and a gradual reveal of two words every 100ms; scroll only the chat as the reply grows. Keep the streaming bubble at its final width to prevent horizontal growth. Static dots replace the pulse for reduced-motion readers, who receive the whole reply after the pause. Hide partial text from the accessibility tree and announce the completed reply once in the log; keep a short status outside the log while replying. The message area is 28rem on desktop and 26rem on phones, with a slightly wider desktop panel. The composer is a button for the next prepared question, with a send arrow. Initially, only the headline is in the conversation; the reader must send the first question. Send and Previous remain unavailable throughout the pause and reveal. Previous removes the latest exchange; choosing or reselecting a claim cancels any pending reply and resets the conversation to the headline with no questions sent. Keep the Example label clear. Do not add a fake input field, fabricated online status, or live generation.
No forms in v1. Nothing on the site collects input.
Images: one only, on Home. Ryan's single-ink Socrates line drawing (`docs/assets/socrates-source.jpg`), in paper and ink, never recolored and never a photograph. It is a mark on the right of the Home hero, not wallpaper: at most 0.22 opacity under type, or 1.0 in an empty right column; on phones hidden or at most 0.12, and never covering the display line or the sentence under it. Scaled so it sits close to the type without empty space beneath. Never in the nav, never tiled, no caption, laurel, or dates. Anywhere else, images must be diagrams or photographs of text, not stock thinkers.

## Accessibility

- Ink on paper contrast ≥ 7:1 for body.
- Focus rings visible (ink outline, 2px).
- Keyboard: `⌘K`, `Esc`, tab order through nav.
- `Skip to content` is the first keyboard stop, appears on focus, and targets the main content.
- Navigation marks the selected Home fragment with `aria-current="location"`; full pages use `aria-current="page"`.
- Reduced-motion: skip Lenis and hero settle.

## Test

The Oct 2, 2026 copy and layout refresh supersedes the previous requirement for tall conversation threads and repeated full-page sections. Keep the two approved hero sentences exact. Below the hero, use compact aligned sections, short headings, and clear spacing. Avoid duplicate labels and oversized closing questions.

Open the page next to nousresearch.com and wyandanch.consulting.
If it looks like a third SaaS template, it failed.
If it looks like a pamphlet with extra mono labels, it failed.
It passes when the first thing you do is read a question.
