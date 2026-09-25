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
- Grid overlay at ~8% ink, visible in the hero, fading after first scroll.
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
- Footer path: `elenchus / constitution / v1`

Do not build a fake terminal that types marketing copy.

## Components

Buttons are rectangular, hairline border, no pill shapes.
No forms in v1. Nothing on the site collects input.
Images: none required for v1. If used, they must be diagrams or photographs of text, not stock thinkers.

## Accessibility

- Ink on paper contrast ≥ 7:1 for body.
- Focus rings visible (ink outline, 2px).
- Keyboard: `⌘K`, `Esc`, tab order through nav.
- Reduced-motion: skip Lenis and hero settle.

## Test

Open the page next to nousresearch.com and wyandanch.consulting.
If it looks like a third SaaS template, it failed.
If it looks like a pamphlet with extra mono labels, it failed.
It passes when the first thing you do is read a question.
