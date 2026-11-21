# P41.be Full SEO Audit

- Date: 2026-11-21
- Site: https://www.p41.be/ (apex `p41.be` redirects 307 to www)
- Stack: Angular 21 client-side SPA on Vercel, Prisma API under `/api`
- Business type: B2B industrial consultancy + training (Academy) + two software products
  (Time Study, TeamPlanner). Belgium, EN/NL.
- Pages audited (public only): `/`, `/about`, `/consultancy`, `/academy`, `/blog`, `/contact`,
  `/privacy`, `/time-study`, `/teamplanner`, plus a sample blog post and course page.
- Excluded by request: `/admin*`, `/api/*`, `/academy/access/*` (not fetched, not scored).
- Method: raw HTML fetch (what non-JS bots see), headless Chromium render (claude-seo
  `render_page.py`), `agentic_check.py --ua-matrix` for AI bots, live browser check, code review.
- Browser sandbox was on for all renders.

## Score

| Category | Weight | Score | Why |
|---|---|---|---|
| Technical SEO | 22% | 35 | No server HTML, soft 404s, sitemap misses 27 URLs, few headers |
| Content Quality | 23% | 55 | Good product pages; thin contact/blog; unsourced claims |
| On-Page SEO | 20% | 60 | Unique rendered titles and H1s; some short/long, academy H1 wrong |
| Schema | 10% | 50 | Organization + BlogPosting + Course; Offer without price, personal email |
| Performance (est.) | 10% | 45 | 0.8 to 1.2 MB hero JPGs, no image dimensions, blocking CSS |
| AI Search Readiness | 10% | 25 | 0 words visible without JavaScript |
| Images | 5% | 45 | Oversized, no width/height, some missing alt, hotlinked og:image |
| **Total** | | **47** | |

## Executive summary

Top issues
1. Every URL returns the same empty shell (0 words, canonical = homepage) until JavaScript runs. (Critical)
2. Unknown URLs return 200 with the homepage (soft 404). (High)
3. Live sitemap is a static file with 9 URLs; 5 blog posts and 22 courses are missing. (High)
4. `/academy/access/*` pages (private purchase links) are marked `index, follow`. (High)
5. Only HSTS is set; hashed JS is not cached. (High)

Quick wins
1. Delete `public/sitemap.xml` so the dynamic `/api/sitemap` is served.
2. Fix `academy.ts` apex canonical and third-party og:image.
3. Fix `mailto:ives@www.p41.be` on /privacy.
4. Add security and immutable cache headers in `vercel.json`.
5. Add `X-Robots-Tag: noindex` for `/admin` and `/academy/access`.

## What works
- robots.txt reachable, one `User-agent: *` group, blocks `/admin` and `/api`, lists the sitemap.
- AI bots (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot)
  get the same 200 response as a browser; no WAF blocking.
- HTTPS + HSTS (2 years). One canonical host (www).
- After rendering, every page has its own title, description, canonical, og:url and one H1.
- Blog posts output `BlogPosting` with author and date; courses output `Course`.
- Time Study and TeamPlanner pages are substantial (about 800 words each).
- Admin pages set `noindex, nofollow` in the client.

## Rendered page data

| URL | Title (len) | H1 | Words | Schema |
|---|---|---|---|---|
| / | P41 Industrial Intelligence \| Industry 4.0 Leader (49) | Fewer Errors. More Output. | 795 | Organization |
| /about | About P41 \| Our Vision & Methods (32) | Architecting Industrial Excellence | 1106 | Organization |
| /consultancy | Industrial Consultancy \| P41 Services (37) | Fewer Errors. More Output. Without Big Investments. | 472 | Organization |
| /academy | P41 Academy - Lean, Six Sigma & Industry 4.0 Training (53) | Time Study (course name) | 700 | Organization |
| /blog | Industry Insights Blog \| P41 Industrial Intelligence (52) | Our Blog | 357 | Organization |
| /contact | Contact P41 \| Book a Free Talk (30) | Let's Connect | 110 | Organization |
| /privacy | Privacy Policy \| P41 Industrial Intelligence (44) | Privacy Statement | 597 | Organization |
| /time-study | Time Study Software \| Line Balancing, Takt Time & Costing \| P41 (63) | From stopwatch to standard cost, in one workbench. | 791 | SoftwareApplication |
| /teamplanner | TeamPlanner \| Field Crew Scheduling & Workforce Planning Software \| P41 (71) | Workforce scheduling built for crews who work in the field. | 822 | SoftwareApplication |
| /blog/what-should-we-automate | What should we automate? ... \| P41 Blog | same as title | 343 | BlogPosting |
| /academy/cmp4gom... | Time Study \| P41 Academy | Time Study | 321 | Course |

Raw HTML (no JavaScript) for all of the above: title "P41 | Time Study & Industrial Efficiency",
canonical `https://www.p41.be/`, 0 words, 0 links, no H1, no JSON-LD.

Note: lazy routes (`/privacy`, `/time-study`, `/teamplanner`) needed more than the toolkit's
default render wait to show content. They work, but load later than the other pages, one more
reason to prerender.

## Findings by category
See `findings/`:
- `technical.md`
- `content-onpage.md`
- `schema.md`
- `performance-images.md`
- `ai-readiness.md`
- `private-paths.md`

All fixes, with files and verification steps: `ACTION-PLAN.md`.
