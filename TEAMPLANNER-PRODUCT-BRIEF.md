# TeamPlanner Content Brief for the P41 Website "TeamPlanner" Page

> **Instructions for the agent building this page (read first):**
> This file is a content/feature brief, not a design spec. Build the new "TeamPlanner" product page using the **existing P41 website's own layout system, components, spacing, typography and color tokens** match whatever pattern the site already uses for its other product/feature pages (hero, feature grid, "how it works" section, CTA, etc.) rather than inventing a new visual language. Reuse existing components (buttons, cards, section headers, nav) wherever they already exist in this codebase instead of writing new ones from scratch. If the site has a pattern for screenshots/mockups on other pages, follow it here too (placeholders are fine if no real screenshots are supplied). The content below is organized so you can lift sections directly into hero copy, feature cards, and FAQ blocks adapt phrasing to the site's existing voice, but keep the factual claims accurate to what's written here. This copy is meant to double as sales material the P41 team can use when demoing the product, so keep it concrete and specific rather than generic SaaS marketing filler.

---

## 1. One-line positioning

**TeamPlanner is workforce scheduling built for crews who work in the field, not behind a desk** plan jobs, staff them with the right people and vehicles, track who actually showed up, and invoice what it really cost, all from one board.

## 2. What it is (elevator pitch)

TeamPlanner is a day-to-day operations tool for companies that send teams out to customer sites landscaping, maintenance, cleaning, installation and similar field-service work. Instead of juggling a spreadsheet, a group chat, and a driver's memory of who's in which van, a planner builds a job, assigns a crew and a vehicle, and the system checks automatically whether that assignment is actually valid: is this person trained for the task, are they free that day, do they get along with the rest of the crew, is there room in the van. Coaches and managers see attendance live each morning, drag people between jobs in seconds when someone calls in sick, and every job feeds straight into a real cost breakdown and invoice at the end.

It's built multi-tenant and multi-language from the ground up (Dutch/English today), so it runs independently for every client company that uses it.

## 3. Who it's for

- **Planners / office managers** who build the week's or month's job schedule and need to know, before they commit, whether a crew assignment will actually work.
- **Coaches / team leads** who run a crew day-to-day and need a fast way to see who's present, who's not, and who needs to be moved.
- **Owners / managers** who need accurate job costing and invoicing without re-keying hours and materials into a separate spreadsheet.
- **HR** who need to onboard temporary or future-dated staff (a hire starting in October, an intern for one semester) without them cluttering today's planner.

Any business that repeatedly sends trained crews, in vehicles, to do skilled, schedulable work with real constraints on who can do what, who can work with whom, and how many seats are in the van.

## 4. Why it's different the core differentiators

### Drag-and-drop, not form-filling
The Attendance board and Planning sheet are built to be operated with the mouse (or finger, on a tablet in the yard). Moving someone off a job because they're absent, or covering for someone at short notice, is a drag from one job card to another not a multi-screen edit flow. The system re-validates the move in real time and tells you immediately if it creates a conflict, rather than letting a bad assignment go out silently.

### A rule engine that actually enforces the rules and only the ones you want
Most scheduling tools either check nothing or check everything, all the time, whether you want it or not. TeamPlanner's assignment engine checks five independent dimensions before a crew member can be placed on a job:

| Check | What it catches |
|---|---|
| **Competence** | Is this person actually trained/qualified for this task, at what skill level (Basic / Professional / Trainer)? |
| **Conflict** | Does this person have a known personality/working conflict with someone else already on the crew? |
| **Presence** | Are they marked present today, or for future dates do they even work that day / are they on leave? |
| **Hours** | Would this assignment push them past their daily hour cap, or overlap another job they're already booked on? |
| **Vehicle capacity** | Is there still a free seat in the van/bus assigned to this job? |

Every one of these is **opt-in per company**, configurable in Settings a customer who just wants a simple presence board can run with presence-only checking; a customer who wants every dimension enforced strictly, in a specific order, can turn them all on and choose whether a violation on one dimension blocks the assignment outright or just flags it alongside every other issue found. Nothing is hard-coded logic buried in the product it's a rule sequence the customer controls.

### Built around how real crews are actually structured
TeamPlanner models three kinds of team leadership, not just "manager assigns worker":
- **A real Coach and their declared team** a named person with a specific crew and van, who (correctly) can only run one job at a time, same as anyone else.
- **An "Empty/Leave Coach"** a placeholder team (e.g. "Coach 1", "Relief Team") for situations where the actual people change job to job but the slot itself needs to exist on the schedule and, unlike a real coach, an empty-coach placeholder *can* be used on multiple jobs the same day, because it's not one physical person being double-booked.
- **Interns and temporary/future-dated staff** any employee, of any role, can be given a start date and an optional end date, so a hire starting in October or a one-semester intern is scheduled correctly from day one without a human remembering to add or remove them from the active roster.

### Two honestly different views of "who's working"
A presence board that shows the same colors for today and for three weeks from now is lying to you nobody can "confirm" that someone will show up next month. TeamPlanner keeps that distinction explicit:
- **Today:** starts neutral/unconfirmed, turns **green** the moment someone is marked present *and* on a job, **orange** if they're present but idle with nothing assigned.
- **The future:** shows **who's scheduled to work** (based on their work-day pattern and any logged absences) in a distinct dark/light shading, with anyone not working that day shown in italics a planning view, not a pretend attendance record. Managers can still drag people onto future jobs to plan ahead; the board just never claims to know something it can't know yet.

### Real calendar weeks, not "Week 1, Week 2…"
The planning sheet labels weeks with their actual ISO calendar week number (Week 36, Week 37…) the same numbering your team already uses on paper calendars, in Outlook, and in Google Calendar instead of an arbitrary counter that resets every time you scroll.

### Flexible, intelligent job repetition
A job that needs to happen every week, every other Tuesday and Thursday, or for the length of a season doesn't need to be re-built by hand each time. The Repeat panel builds the whole cadence in one step, automatically skipping weekends, public holidays and any closures the company has configured and if a handful of dates can't be created (a real vehicle or material shortage on that specific day), it tells you exactly which dates and why, instead of silently failing the whole batch or blocking the ones that were perfectly fine.

### Costing that's built from what actually happened, not a flat estimate
Every crew member, machine and material line on a job can carry its own role/rate, set per job (the same electrician can cost differently on two different jobs, if that's how the business actually bills). The Cost tab builds a live breakdown Personnel → Machines → Materials → flat costs → vehicle costs → overhead % → margin % up to a selling price, and invoicing pulls from that same real breakdown, freezing a snapshot at invoice time so a PDF generated today still matches exactly what it said even if the underlying job changes later.

### Multi-language, multi-tenant from day one
Every customer company runs on their own isolated data, and the whole interface is available in multiple languages (Dutch and English today) so international teams and Belgian companies with mixed-language staff both work in the language they're comfortable in.

## 5. Feature list (for a feature grid / bullet section)

- **Job planning board** build, schedule, and repeat jobs on a calendar with real ISO week numbers, weekend/holiday-aware.
- **Drag-and-drop crew assignment** move people between jobs instantly, on both the live Attendance board and future planning views.
- **5-dimension assignment rule engine** (competence, conflict, presence, hours, vehicle capacity) fully configurable per company, sequenced or checked in parallel.
- **Live attendance tracking** a real-time presence board with clear, honest color states for today vs. future scheduling.
- **Coach & team management** real coaches with declared crews and vans, plus flexible "empty coach" placeholder teams for slots that change day to day.
- **Skills & competence matrix** track who's trained for what, at what level, and get warned before assigning someone unqualified.
- **Conflict management** flag known personality/working conflicts so the system keeps incompatible people off the same crew automatically.
- **Vehicle & resource capacity tracking** vans, machines and materials all have finite quantities that get checked before double-booking.
- **HR scheduling for any role** give any employee (coach, worker, intern, temp hire) a start and/or end date so they only ever appear on the active planner while they're actually employed.
- **Resource-driven job costing** a full cost breakdown built from real crew rates, machine and material costs, overhead and margin.
- **Invoicing with frozen snapshots** invoices lock in exactly what was billed at creation time, immune to later job edits.
- **Role-based permissions**, including a dedicated HR role with appropriately scoped, money-safe access.
- **Multi-language interface** (Dutch/English) and multi-tenant architecture one deployment, fully isolated per customer.

## 6. Suggested page structure (adapt to the site's existing page pattern)

1. **Hero** one-line positioning (§1) + a short supporting line from the elevator pitch (§2) + primary CTA (e.g. "Book a demo" / "Talk to us").
2. **Problem/solution strip** the spreadsheet-and-group-chat pain point vs. one board that actually checks the constraints for you.
3. **Differentiators section** 4–6 cards pulled from §4 (Rule engine, Drag-and-drop, Honest presence vs. future views, Flexible repeats, Resource-driven costing, Team structures). Keep each card to a headline + 1–2 sentences; the table in §4 can become supporting detail or a tooltip/expand rather than dumped wholesale onto the page.
4. **Feature grid** the bullet list in §5, in whatever card/grid pattern the site's other feature pages already use.
5. **Who it's for** §3, as short persona blurbs or logos/roles.
6. **How it works** (optional, if other pages have this) Plan a job → Staff it (rule engine checks it) → Track attendance live → Cost & invoice automatically.
7. **CTA / closing** match whatever closing pattern other P41 product pages use.

## 7. Tone & voice notes

- Concrete over abstract: say "checks five things before letting you assign someone" rather than "intelligent workforce optimization."
- This is for people who run field crews, not software buyers reading a generic SaaS deck plain language, real scenarios (someone calls in sick, a van only has 6 seats, an intern starts in October).
- It's fine (encouraged) to use it as a sales page a manager can literally walk a prospect through feature by feature don't bury the differentiators under mission-statement copy.
