# Product Page Brief: "Time Study"

**Purpose of this file:** hand this to Claude Code (or any dev/AI) to generate a new public
product page for **Time Study**, the line-balancing / time-study / production-costing product
on the P41 platform. Everything below describes real, already-shipped functionality (verified
against the codebase) so the page can be built and sold honestly no invented features.

Use this as a content brief, not verbatim copy: keep the structure and facts, rewrite the
prose in your own voice/tone.

---

## 0. Context for the builder

- This repo has **no existing marketing/landing pages** it's currently a fully internal,
  login-gated SaaS app (Angular). The new page should be added as a **new, unauthenticated
  route** (e.g. `/time-study` or `/products/time-study`), placed before the `authGuard` in
  `app.routes.ts`.
- Match the app's existing visual language rather than inventing a new one: the `md-*` utility
  classes and `--md-*` CSS custom properties already used in `src/app/login/login.html` and
  `src/app/home/home.html` (Material-Design-inspired: `md-card`, `md-btn-filled`, `md-input`,
  surface/primary/on-surface color tokens). Reuse the same font (Inter "P41 brand look",
  see `src/index.html`).
- Tone: B2B, credible, engineering-literate. The audience is manufacturing/industrial
  engineering buyers (and their own sales reps), not a general consumer audience.

---

## 1. Product identity

- **Product name:** Time Study
- **One-line description:** A line-balancing, time-study, and production-costing workbench
  that turns a station-by-station work breakdown into a real, defensible takt time, balance
  loss %, and unit cost end to end, in one tool.
- **Category:** Industrial engineering / lean manufacturing software (time & motion study,
  line balancing, standard costing).

---

## 2. Hero section

**Headline (suggestion):** "From stopwatch to standard cost, in one workbench."

**Subheadline (suggestion):** Time Study replaces spreadsheets and disconnected time-study
tools with one system that balances your line, scores fatigue/allowance per international
standards, and prices the unit all from the same activity data.

**CTA:** "Book a demo" / "See it on your own line" (placeholder align with existing P41 CTA
wording elsewhere on the site).

---

## 3. What it is (short section)

Time Study is where an industrial engineer builds a study activity-by-activity (using a
reusable, standardized time-code library), and the system automatically:

1. Groups activities into workstations and computes **takt time** and **balance loss** per
   station including support for stations with multiple operators helping on one task, or
   genuinely different operators each running their own job in parallel.
2. Scores each activity's **rest & personal allowance** against a real published ergonomic
   standard (BSI‑3375), instead of a flat guessed percentage.
3. Turns the balanced line directly into a **personnel/machine/material cost model** and a
   sales price, per unit / pack / carton.
4. Publishes the result as **operator-facing work instructions** reorderable, media-rich,
   and exportable to PDF for the shop floor.

---

## 4. What we offer feature breakdown

Use these as feature-grid cards / accordion sections. Each is a real, shipped capability.

### Station Balance & Takt Time
Build the activity list once (from a standardized time-code library, see below), assign each
activity to a station, and the workbench computes takt time, per-station balance loss %, and
flags any station that's over takt live, as you edit. Two genuinely different multi-person
scenarios are both modeled correctly and separately:
- **Ops (helpers):** several people sharing one task doesn't speed up the task, but each
  person is paid for the full time.
- **Named operators:** two or more people doing *different* jobs at the same station in
  parallel the station's pace is set by the slowest one, not the sum of both.
- **Station duplication (St.×):** cloning an entire station into N independent parallel
  lines (e.g. 5 identical assembly lines) a distinct concept from the above, with its own
  throughput math.

A live bar chart visualizes every station against the takt line, color-coded by balance-loss
severity, with hover breakdowns showing exactly how a station's number was built.

### Standardized Time-Code Library (UAS)
A reusable, predetermined-time-system library (verb/object/level codes, walking/bending/
sitting motions with fixed time values, composable "elements" with built-in multipliers).
Engineers build studies out of standardized, auditable building blocks instead of one-off
stopwatch guesses the same element, reused across studies, always carries the same time.

### R&PV Allowance Engine (BSI‑3375)
A real, standards-based scoring system: score each activity against force, posture,
temperature, and monotony factors from the BSI‑3375‑5 / ILO point tables, and the system
looks up the correct rest-and-personal allowance percentage automatically instead of a
guessed flat 8–10% every competitor uses. This is a genuine compliance/credibility
differentiator worth leading with.

### Full Costing Engine
Personnel, machine, and material costs roll up from the same balanced-line data no
re-entry, no second spreadsheet. Personnel cost correctly splits into productive time and
paid balance-loss (idle) time, station by station, so the total reconciles exactly with the
"Total Norm Time per Unit" shown on the balance results. Overhead and margin layer on top to
produce a defendable sales price per unit, pack, or carton.

### Work Instructions, Drag-and-Drop, and PDF Export
Turn the same activity data into operator-facing work instructions: drag-and-drop to reorder
instruction groups and individual steps into the exact sequence an operator should follow,
attach images/videos/PDFs per step, and export the result as a real standalone PDF document
not a print-to-PDF hack. A separate lightweight "Operator" app lets shop-floor users view
their own station's instructions and confirm completion.

### Variants & Multi-Model Lines
Model optional build options (e.g. "steel top added") as variants with their own occurrence
%, feeding directly into the balance and cost math. A separate multi-model sequencing view
lets you arrange a real production sequence of variants and see whether a high-time variant's
overrun gets absorbed by its neighbors before it causes a line stoppage essential for mixed-
model lines (automotive-style sequencing).

### Workforce Planning, Analysis & Sensitivity
Dedicated tabs for headcount/shift planning, deeper analysis views, and sensitivity analysis
to stress-test takt/volume assumptions before committing capital.

### Compare Studies
Put two balance studies side by side to evaluate a proposed change before rolling it out.

### Built for Multi-Tenant SaaS
Role-based access (engineer, sales, production, operator, admin, owner) and per-tenant
feature flags mean the product naturally supports tiered packaging sell a lighter edition
to one customer and the full engineering suite to another, from the same codebase.

---

## 5. Why we're different (positioning section)

Lead with these three, in this order they're the hardest to copy:

1. **Standards-based allowances, not guesses.** The R&PV/BSI‑3375 scoring engine is a real,
   auditable ergonomic standard most competing tools use a flat guessed percentage.
2. **One system, not three spreadsheets.** Time study → line balance → cost → work
   instructions all share one activity dataset. Change an activity once; takt, cost, and the
   printed work instruction all update together.
3. **Correctly models real shop-floor scenarios others get wrong.** Helpers sharing a task,
   genuinely different operators on the same station, and fully duplicated parallel lines are
   three different situations with three different correct formulas Time Study is built to
   tell them apart instead of collapsing them into one (often wrong) number.

---

## 6. Suggested page structure (for the builder)

1. Hero (headline, subheadline, CTA, product screenshot/GIF of the station-balance chart)
2. "What it is" 3–4 sentence summary + short product screenshot strip
3. Feature grid (cards from §4 pick 6–8, keep card copy to 2–3 sentences each)
4. "Why we're different" (§5) 3-column or stacked comparison layout
5. Social proof / logos placeholder (if available elsewhere on the P41 site, reuse component)
6. Final CTA band (matches whatever the rest of the P41 site uses for closing CTAs)

---

## 7. Open questions for whoever builds this (flag, don't guess)

- Is there an existing P41 marketing site (outside this repo) whose visual style should be
  matched pixel-for-pixel, or is this the first public page and it should set the style?
- Target audience for this specific page: end customers, or the internal sales team's pitch
  deck source material?
- Any real customer logos/testimonials/screenshots approved for use, or placeholders only?
