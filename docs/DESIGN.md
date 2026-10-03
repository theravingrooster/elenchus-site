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

- Top status: `ELENCHUS · PRACTICE`
- Command palette placeholder: `Jump to a section`. The palette only navigates; it saves nothing.
- On phones, the palette has a visible `Jump` button beside `Menu`; wider screens keep the `⌘K` hint.
- Footer path: `elenchus / constitution / v1`

Do not build a fake terminal that types marketing copy.

## Components

Buttons are rectangular, hairline border, no pill shapes. The one exception to square corners is the Examine chat bubbles, which may be rounded rectangles with a hairline border and no fill color beyond paper and ink.
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

Open the page next to nousresearch.com and wyandanch.consulting.
If it looks like a third SaaS template, it failed.
If it looks like a pamphlet with extra mono labels, it failed.
It passes when the first thing you do is read a question.
