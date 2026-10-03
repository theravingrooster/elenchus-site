# Elenchus — Design

Visual family: Nous Research + Wyandanch Consulting.
Same discipline: one metaphor, huge type, tiny palette, and restrained interface chrome. The Oct 3, 2026 background request adds fine etched ornament over the black ground.

## Metaphor

An examination room / research terminal.
The page should feel like an instrument you pick up, not a brochure that sells you a course.

Status-bar, command palette, question IDs, and mono labels are allowed.
Classroom clipart, mortarboards, lightbulbs, brains, and purple AI glow are not.

## Color

Keep the black ground and cream ink. Gradients may control opacity in the backdrop and reply reveal; they do not introduce another hue.

| Token | Value | Use |
|---|---|---|
| Paper | `#0E0D0B` | Page ground |
| Ink | `#EDE6D6` | Type, rules, UI |
| Rule | `rgba(237,230,214,0.12)` | Borders, hairlines |
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
- The site is one scrolling page, ordered Home hero, Why, then Examine. Use aligned sections and enough spacing to make that sequence clear.
- A fixed overlay of flowing ink contours and sparse stippling on the black background replaces the square grid. Keep the formations at the viewport edges and their opacity low behind the reading column. It is static server-rendered SVG, with no scroll listeners or animation.
- Section labels in mono, left or overline: `01 / WHY WE QUESTION`, `02 / EXAMINE`.

## Motion

Allowed:

- Lenis (or equivalent) smooth scroll
- Hero question settling after load (40–80ms, no bounce)
- Command palette (`⌘K`) that jumps to sections
- 120ms ink wipes on buttons
- Staggered section labels on first intersection
- After the short typing pause, demo replies uncover each wrapped line from left to right through a soft edge, then continue to the next line. The text itself stays still.

Forbidden:

- Animated particle fields, 3D globes, looping gradients
- Autoplaying video backgrounds
- Bounce, elastic, confetti
- Motion that delays reading the question

## UI chrome

Use sparingly, as proof the site is an instrument:

- Command palette placeholder: `Jump to a section`. The palette only navigates; it saves nothing.
- On phones, the palette has a visible `Jump` button beside `Menu`; wider screens keep the `⌘K` hint.
- Header: wordmark and Why / Examine anchor links, without a repeated status bar. The wordmark returns to Home; the palette offers Home, Why, and Examine. Why retains the `#method` anchor so existing links continue to work.
- Footer: wordmark and a `Back to top` link.

Do not build a fake terminal that types marketing copy.

## Components

Site buttons stay rectangular. The demo is an example conversation: a rounded panel with short message bubbles, reader questions on the right in ink-on-paper inversion, and Elenchus replies on the left. Small example selectors replace the three full-width table cells. Sending a question shows it immediately, followed by an 800ms typing pause and a 2600ms reveal that sweeps left to right along each actual wrapped line, in reading order. Reserve the full reply's width and height during the pause, so its lines and the surrounding history stay still throughout the reveal. Measure native text wrapping, refresh after font loading or resizing, and retain the reveal clock through remeasurement. Only the inner chat scrolls when a message is added. Static dots replace the pulse for reduced-motion readers, who receive the whole reply after the pause. Hide the provisional reply from the accessibility tree and announce the completed reply once in the log; keep a short status outside the log while replying. The bounded, keyboard-scrollable message area is 38rem on desktop and 32rem on phones. The composer is a button for the next prepared question, with a send arrow. Initially, only the headline is in the conversation; the reader must send the first question. Send and Previous remain unavailable throughout the pause and reveal. Previous removes the latest exchange; choosing or reselecting a claim cancels any pending reply and resets the conversation to the headline with no questions sent. Keep the Example label clear. Do not add a fake input field, fabricated online status, or live generation.
No forms in v1. Nothing on the site collects input.

Images: two generated classical engravings in cream ink, with transparent backgrounds that let the black ground show through. The latest user request replaces the previous one-image constraint:

- A full-body Socrates lounging in a toga sits on the right of the Home hero, replacing the old standing line drawing. Preserve the entire reclining figure and its drapery.
- Rodin's Dante-inspired Thinker sits beneath the heading in the left Why column. Match its etched linework and cream tone to Socrates and the surrounding ornament.

Keep both images static, scale them responsively, and give the text clear space. Preserve transparent edges rather than putting either image in a panel. No new captions, stock photographs, decorative copies, or images in the navigation.

## Accessibility

- Ink on paper contrast ≥ 7:1 for body.
- Focus rings visible (ink outline, 2px).
- Keyboard: `⌘K`, `Esc`, tab order through nav.
- `Skip to content` is the first keyboard stop, appears on focus, and targets the main content.
- Navigation marks the selected homepage fragment with `aria-current="location"`.
- Reduced-motion: skip Lenis and hero settle.

## Test

Keep the two approved hero sentences exact. All authored information belongs below that hero on the same page, with Why before Examine. The Why heading is exactly “Why we stopped questioning.” Its rationale uses two consecutive brief paragraphs: first the pressures of school, work, and family; then the habit of staying quiet and room to ask again. Use no context subheadings or separate closing divider. Remove the Who section. Use aligned sections, short headings, and clear spacing while preserving the taller conversation window and elaborate black-ground overlay. Avoid duplicate labels and oversized closing questions.

Open the page next to nousresearch.com and wyandanch.consulting.
If it looks like a third SaaS template, it failed.
If it looks like a pamphlet with extra mono labels, it failed.
It passes when the first thing you do is read a question.
