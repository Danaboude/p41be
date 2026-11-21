# P41.be SEO Action Plan

Audit date: 2026-11-21. Live site: https://www.p41.be/ (Angular 21 SPA on Vercel).
Toolkit: claude-seo (render_page.py, agentic_check.py) plus a live browser check.
Scope: public pages only. `/admin*`, `/api/*` and `/academy/access/*` were NOT crawled or scored.

**SEO Health Score: 47 / 100** (see FULL-AUDIT-REPORT.md for the breakdown)

The single biggest problem: the server sends the same empty HTML shell for every URL. Its title,
description and canonical all point to the homepage. Google has to run JavaScript to see any page.
Most AI crawlers (GPTBot, ClaudeBot, PerplexityBot and others) do not run JavaScript, so they see
nothing on any page.

---

## Critical

### C1. Prerender every public page (no content without JavaScript)
- Evidence: raw HTML of all 9 sitemap URLs is 50,989 bytes, 0 visible words, 0 links, no H1,
  no JSON-LD, title "P41 | Time Study & Industrial Efficiency" and `canonical=https://www.p41.be/`.
  The real title/canonical/content only appear after JavaScript runs.
- Impact: AI search (ChatGPT, Claude, Perplexity) cannot read or cite any page. Google sees a raw
  canonical pointing at the homepage for every URL before rendering, which risks pages being
  folded into the homepage.
- Fix: switch the Angular build to static prerendering (SSG).
  - `ng add @angular/ssr` then in `angular.json` build options set `"outputMode": "static"`.
  - `src/app/app.routes.server.ts`: `RenderMode.Prerender` for `''`, `about`, `consultancy`,
    `contact`, `academy`, `blog`, `privacy`, `time-study`, `teamplanner`; `getPrerenderParams`
    for `blog/:slug` and `academy/:courseId` (read slugs/ids from the database at build time);
    `RenderMode.Client` for `admin/**` and `academy/access/**`.
  - Guard browser-only code (`localStorage`, `window`) with `isPlatformBrowser` / `afterNextRender`
    in: `auth.service.ts`, `translation.service.ts`, `home.ts`, `about.ts`, `course-detail.ts`,
    `blog-detail.ts`, `time-study.ts`, `teamplanner.ts`.
  - Point Vercel output at `dist/p41.be/browser` (check `vercel.json` / project settings).
- Verify: `curl -s https://www.p41.be/time-study | grep -o "<h1[^>]*>[^<]*"` shows the real H1,
  and the raw `<link rel="canonical">` equals the page URL.

## High

### H1. Real 404 for unknown URLs (soft 404 today)
- Evidence: `/this-does-not-exist`, `/llms.txt`, `/.well-known/ai-catalog.json` all return 200 HTML.
  `app.routes.ts` has `{ path: '**', redirectTo: '' }` (shows the homepage on any bad URL).
- Fix: add a `NotFoundComponent` with `noindex` for `**`. With prerendering, Vercel serves
  `404.html` with status 404; replace the catch-all rewrite in `vercel.json` so only real routes
  map to HTML.
- Verify: `curl -s -o /dev/null -w "%{http_code}" https://www.p41.be/xyz` returns 404.

### H2. Sitemap is missing all blog posts and courses
- Evidence: live `/sitemap.xml` is the static `public/sitemap.xml` (9 URLs). Vercel serves the
  static file before the `/sitemap.xml -> /api/sitemap` rewrite, so `api/sitemap.ts` is never used.
  Missing: 5 blog posts (`/blog/what-should-we-automate`, `/blog/the-customers-truffle`,
  `/blog/getting-back-to-basics`, `/blog/where-should-companies-focus-on-to-stay-competitive`,
  `/blog/why-doing-a-lot-of-improvements-in-your-company-might-work-against-you`) and 22
  `/academy/<id>` course pages.
- Fix: delete `public/sitemap.xml` so the API one is served, and add courses to `api/sitemap.ts`
  (or generate the sitemap at prerender time). Add `<lastmod>` from `updatedAt`.
- Verify: `curl -s https://www.p41.be/sitemap.xml | grep -c "<loc>"` is 36 or more.

### H3. Private course-access pages are indexable
- Evidence: `/academy/access/:purchaseId` has no `seoKey` and `app.ts:101` only sets `noindex`
  for `/admin`, so these pages get `index, follow`. robots.txt does not block them.
- Fix: in `app.ts` treat `/academy/access` like `/admin` (noindex, nofollow); add
  `Disallow: /academy/access/` to `public/robots.txt`; add an `X-Robots-Tag: noindex, nofollow`
  header for `/admin/(.*)` and `/academy/access/(.*)` in `vercel.json` `headers`.
- Note: `/admin` noindex is only set by JavaScript today, so non-JS bots get no noindex. The
  header fixes that. The admin guard is client-side only; confirm every `/api` write endpoint
  checks the admin token on the server (not verified in this audit, by your instruction).

### H4. Security and cache headers
- Evidence: only `Strict-Transport-Security` is sent. Hashed JS (`main-22URWEJ7.js`) is served
  with `max-age=0, must-revalidate`.
- Fix (`vercel.json` `headers`): `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and
  `Cache-Control: public, max-age=31536000, immutable` for `/(main|chunk|polyfills|styles)-*.{js,css}`.
  Do not add a CSP without testing (Vimeo, LinkedIn, Google Fonts, cdnjs are used).
- Verify: `curl -sI https://www.p41.be/ | grep -i x-content-type`.

### H5. Apex redirect is temporary
- Evidence: `https://p41.be/` answers `307` to `https://www.p41.be/`.
- Fix: in Vercel Domains, set the apex redirect to 308 (permanent). Hosting setting, not code:
  you need to change this yourself.

## Medium

### M1. Wrong canonical and hotlinked image on /academy
- `src/app/pages/academy/academy.ts:45` uses `https://p41.be/academy` (apex) for canonical and
  og:url; every other page uses `www`. Remove the `url` line so the default `www` URL is used.
- Line 46 sets og:image to a file on `www.blomconsultancy.nl` (third-party, may break, may not be
  licensed). Use a P41 image.
- The academy page H1 is the first course name ("Time Study"), not a page heading. Make the
  page heading the H1 and course titles H2/H3.

### M2. Schema fixes
- Organization (`seo.service.ts:101`): uses personal email `ives@p41.be`; use a role mailbox
  (e.g. info@) if one exists. Add `logo` as an `ImageObject` with width/height, add `address`.
- SoftwareApplication on `/time-study` and `/teamplanner` has an `Offer` with no `price`. Google
  flags this. Either add a real price or remove `offers`.
- Pages built on lazy routes lose the Organization block (only SoftwareApplication is present).
  Fine, but keep one Organization `@id` and reference it from `provider`/`publisher`.
- Blog `publisher` is `"P41"` while Organization is `"P41 Industrial Intelligence"`. Use one name.

### M3. Images (performance and LCP)
- Hero/background images are 2560px JPG, 0.8 to 1.2 MB each: `hero_backgournd.jpg` (1.19 MB),
  `ives front look.jpg` (1.05 MB), `CrossRoads-22-1-scaled-1.jpg` (0.96 MB),
  `CrossRoads-29-scaled.jpg` (0.83 MB), `ives_with_mic_hero.png` (0.66 MB).
- Convert to WebP/AVIF at 1600px max, add `width`/`height` to every `<img>` (none have them),
  `loading="lazy"` below the fold, `fetchpriority="high"` on the hero. Rename files with spaces.
- Use `NgOptimizedImage` (`ngSrc`) to get most of this automatically.
- 7 images on `/blog` have empty or missing `alt`.

### M4. Render-blocking third-party CSS
- `index.html` loads Font Awesome full CSS (cdnjs), Material Symbols and two Google font families
  synchronously. Add `preconnect` to fonts.gstatic.com, subset Material Symbols with `&icon_names=`,
  and consider dropping Font Awesome if only a few icons are used.

### M5. Titles and descriptions
| Page | Title length | Issue |
|---|---|---|
| /contact | 30 | Short; add the service: "Contact P41: Book a Free Time Study Talk" |
| /about | 32 | Short |
| /consultancy | 37 | Short and generic ("P41 Services") |
| /time-study | 63 | Slightly long |
| /teamplanner | 71 | Too long, will be cut |
- Descriptions over 160 chars: `/time-study` (170), `/teamplanner` (177).
- `/consultancy` description is vague; say what you do (time study, error analysis, shop floor).
- Raw `index.html` still has a `keywords` meta tag (ignored by Google, can be removed).

### M6. Broken email link on /privacy
- `src/app/pages/privacy/privacy.html:116`: `mailto:ives@www.p41.be` (wrong domain). Should be
  `ives@p41.be` (or the role mailbox).

### M7. Dutch content has no URL
- The EN/NL switch changes text on the same URL; `<html lang>` changes only after JS. Google and
  AI bots only ever see English. If Dutch search matters, give NL its own URLs (`/nl/...`) with
  `hreflang` pairs. Until then, do not add hreflang.

## Low

- L1. No `llms.txt`. After H1 (real 404) it is "not applicable"; optionally publish one in
  `public/llms.txt` listing the public pages. Never list admin/access paths.
- L2. robots.txt has one `User-agent: *` group (good). Optionally add a `Content-Signal` line to
  state your AI training/search preference.
- L3. Blog posts are short (about 340 words) and the blog image comes from the Vimeo CDN. Longer,
  first-hand posts help both Google and AI citations.
- L4. `app.spec.ts:21` still expects "Hello, p41.be" (stale default test).

## Needs you (no guessing)
- Claims shown without a source: "at least 10% efficiency gains within 3 months",
  "More than 100 companies helped since 1995", "Industry 4.0 Leader" (home title). Keep only if
  you can back them (client names, case studies, dates).
- A role mailbox to use in schema/contact instead of a personal one.
- Real prices for Time Study and TeamPlanner, or confirm to remove `offers`.
- Business address for the Organization schema.
- Vercel apex redirect 307 -> 308 (hosting setting).
- Whether Dutch should get its own URLs.

## Not in scope
- Admin dashboard, `/api/*`, `/academy/access/*`: not crawled, by request.
- No PageSpeed / Search Console API keys: Core Web Vitals are not measured, only estimated from
  image weights and blocking resources.

---

## Fix status (2026-11-21)

Verified with a local build (`ng build`: "Prerendered 36 static routes") and a browser check of
the built pages (hydration on, no console errors, blog/academy data reused from the build, no
extra API calls on first load). Nothing committed or deployed.

| Item | Status | What changed |
|---|---|---|
| C1 Prerender | Fixed | `@angular/ssr` + `@angular/platform-server`; `angular.json` `outputMode: static`; `src/main.server.ts`, `app.config.server.ts`, `app.routes.server.ts`; hydration in `app.config.ts`. 36 pages are static HTML (9 main pages, 5 posts, 22 courses), 120 to 1,100 words each, correct title/canonical/H1/JSON-LD before JavaScript. Admin and access pages stay client-only. Blog/course lists are read from the live API at build time. |
| H1 Real 404 | Fixed | `pages/not-found` (noindex) replaces the `**` redirect to home; `scripts/postbuild.mjs` writes `404.html`; catch-all rewrite removed from `vercel.json`. |
| H2 Sitemap | Fixed | `public/sitemap.xml` deleted so `/api/sitemap` is served; it now lists courses too, with `lastmod`. |
| H3 Private paths | Fixed | `X-Robots-Tag: noindex, nofollow` on `/admin*`, `/academy/access/*`, `/api/*`; `app.ts` noindex for access pages; robots.txt `Disallow: /academy/access/`. |
| H4 Headers | Fixed | nosniff, SAMEORIGIN, referrer, permissions, HSTS includeSubDomains; 1-year immutable cache for hashed JS/CSS. No CSP added. |
| H5 Apex 307 | Needs you | Vercel Domains setting. |
| M1 Academy | Fixed | `www` canonical, own og:image, page H1 "P41 Academy: Professional Training", course title now H2. |
| M2 Schema | Fixed (partly) | Organization `@id`, logo ImageObject 210x375, founder; priceless `offers` removed; blog/course/software point to the same Organization. Email unchanged (needs a role mailbox). |
| M3 Images | Fixed | 6 heavy images to WebP (1.2 MB hero to 406 KB, 1 MB portrait to 185 KB, 0.6 MB PNG to 70 KB), width/height on every replaced image, `fetchpriority=high` on heroes, lazy below the fold, 2 KB avatar for the 48 px byline, alt text on blog images. New 1200x630 `og-image.jpg`. Originals kept. |
| M4 Blocking CSS | Fixed (partly) | Font Awesome reduced to brand icons only; font preconnects. Material Symbols not subset. |
| M5 Titles/descriptions | Fixed | about, consultancy, contact, time-study, teamplanner (EN + NL); `keywords` meta removed. Home title unchanged (contains an unsourced claim, see Needs you). |
| M6 Privacy email | Fixed | `ives@p41.be`. |
| M7 Dutch URLs | Not done | Decision for you. |
| L1 to L4 | Not done | Optional. |

### After deploying, check
- `curl -s https://www.p41.be/time-study | grep -o "<h1[^>]*>"` shows the H1.
- `curl -s -o /dev/null -w "%{http_code}" https://www.p41.be/xyz` returns 404.
- `curl -s https://www.p41.be/sitemap.xml | grep -c "<loc>"` is 36.
- `curl -sI https://www.p41.be/admin/login | grep -i x-robots-tag` shows noindex.
- Log in to the admin once to confirm it still works (it is served from `index.csr.html`).
- New blog posts and courses still open right away (client-rendered fallback), but they are only
  prerendered on the next deploy. Add a Vercel Deploy Hook and call it when publishing.

### Notes
- `.npmrc` sets `legacy-peer-deps=true`: npm otherwise tried to pull a newer `@angular/router`
  than the installed 21.2.8 when adding `@angular/ssr`.
- Local `npm run build` into `dist/` failed once with EPERM (a file in `dist/` was locked by
  another program); building to another folder worked. Close whatever holds `dist/` and rebuild.
- The initial-bundle budget warning (770 kB vs 500 kB) predates this work.
