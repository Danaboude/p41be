# Technical SEO (35/100)

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| Critical | No server-rendered HTML | All URLs: same 50,989-byte shell, 0 words, canonical `https://www.p41.be/` | Angular SSG prerender (ACTION-PLAN C1) |
| High | Soft 404 | `/xyz`, `/llms.txt`, `/.well-known/ai-catalog.json` return 200 HTML; `app.routes.ts` `**` redirects to home | NotFound route + real 404 (H1) |
| High | Sitemap incomplete | Static `public/sitemap.xml` (9 URLs) shadows `/api/sitemap`; 5 posts + 22 courses missing; no lastmod | Delete static file, add courses (H2) |
| High | Few security headers | Only HSTS | `vercel.json` headers (H4) |
| High | Hashed JS not cached | `main-*.js`: `max-age=0, must-revalidate` | immutable cache header (H4) |
| High | Apex redirect temporary | `p41.be` -> 307 -> `www` | 308 in Vercel Domains (H5, you) |
| Medium | Raw canonical points at home on every URL | Fixed only after JS | Solved by C1 |
| Medium | Course URLs are database ids | `/academy/cmp4gomnw000cepj0fyvvr4zg` | Optional: slugs + 301 from ids |
| Low | Lazy routes render late | `/time-study`, `/teamplanner`, `/privacy` empty at early render | Solved by C1 |
