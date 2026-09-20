# Website report implementation — 19 September 2026

Reviewed `P41_website_report.md` (the report present in this checkout). Existing edits to the translation service and consultancy page were preserved and extended.

| Report item | Result |
| --- | --- |
| 4.1 Concrete home and consultancy opening | Existing revised EN/NL heroes retained; grammar improved. Consultancy calls to action now lead to Contact. |
| 4.2 Consistent evidence and numbers | Removed remaining three-continent claims and 10x ROI guarantee. Company counts now say companies, not facilities. Aligned the existing database article's 10–30% claim to the report's 10% within 3 months / under-one-year payback wording, preserving its original date. |
| 4.3 Trust details | Footer year updates automatically; existing three-book copy and neutral contact placeholders retained. Replaced inactive newsletter inputs on Blog/footer with working contact links. |
| 4.4 Founder credibility | Existing expanded founder biography and credentials retained. No new credentials or affiliations invented. |
| 4.5 Proof | Existing consultancy proof section translated to Dutch and English, with clearer patent/book wording. Existing client logos and ISO reference retained. Named client results, patent identifiers and publication references still need supplied evidence and permission. |
| 4.6 Outreach destination | Use `/consultancy` or `/time-study` in production outreach. Both products retained; no external campaigns edited. |
| 4.7 Academy statistics | Removed unsupported student/rating/completion claims from public Academy and course cards/details. Course count now comes from loaded courses. Replaced summary stats with documented experience/books/company count. Database rating fields remain for future verified use. |
| 4.8 Main CTA | Consultancy and blog contact links lead to `/contact`. Campaign wording and links must be aligned by the campaign owner. |
| 4.9 Blog freshness | Added separate LinkedIn section, two seeded posts, videos, publication dates and full admin management. Original article dates preserved. |

## LinkedIn posts and dates

The two posts from `post.md` are stored as normal BlogPost records with `kind=LINKEDIN`. Admin Blog supports article/LinkedIn type, create/edit/delete, optional original LinkedIn URL, allowlisted Vimeo/Streamable embed URL, and approximate-date flag.

Relative ages are anchored to 19 September 2026: four months ago = approximately May 2026; six months ago = approximately March 2026. Day 1 is stored only for sorting. Public cards, related cards and detail pages show the month and approximate label. Exact publication metadata is omitted for approximate dates. Original LinkedIn URLs were not supplied, so none were invented. Videos are loaded only after clicking Play video.

`prisma/blog-update.sql` adds four columns without deleting existing data. The update and seed were applied to the database configured by `.env.local`. Three original articles remain alongside the two new updates. Long existing article excerpts were replaced with concise summaries; full article text remains, except the explicitly corrected efficiency claim.

For another environment, configure DATABASE_URL and JWT_SECRET, then run:

```powershell
node --env-file=.env.local prisma/apply-blog-update.cjs
npx prisma generate
npm run seed:linkedin
node --env-file=.env.local prisma/align-blog-claim.cjs
```

The LinkedIn seed uses slug upserts with an empty update, so rerunning it preserves admin edits. Do not use the existing `prisma/seed.js` to deploy this change: it deletes users, courses and articles.

## SEO

Article pages use their actual publication date, canonical public URL, concise description, author and BlogPosting structured data. Approximate dates are not represented as exact dates. Metadata from previous routes is cleared; admin pages and missing posts receive noindex. EN/NL document language and Dutch date formatting are supported. Generic shell copy was made concrete, and duplicate Twitter property/name tags normalized.

`/sitemap.xml` is rewritten by Vercel to `api/sitemap.ts`, which includes both product pages and current blog records. New/deleted posts appear after cache expiry (up to 15 minutes). A static base-page sitemap remains as a local fallback. Stale hard-coded 2024 modification dates were removed.

Reference: [Google's Article structured data guidance](https://developers.google.com/search/docs/appearance/structured-data/article).

The site remains client-rendered Angular. Social platforms that do not execute JavaScript may still display the generic shell preview. Server rendering or prerendering is a separate improvement; it was not introduced as part of this change.

## Checks and remaining decisions

- Production Angular build passes; the existing 500 kB initial-bundle warning remains (approximately 718 kB).
- Targeted blog/sitemap API TypeScript check passes.
- 17 focused API/validation tests pass, including authentication, CRUD, invalid dates, duplicate slugs and embed URL allowlisting.
- Desktop and 375px mobile visual checks; EN/NL rendering; Vimeo player; local preview create/edit/delete workflow. Preview mutations use in-memory copies, not production data.
- The full API TypeScript check finds pre-existing errors in `api/payments/mollie/index.ts` (nullable client and baseUrl declaration/scope). The payment handler was not changed.
- Website code has not been deployed. Database changes have been applied.

Manager decisions still needed: the public relationship between P41 and Aeriez, final cross-platform brand name/contact identity, approved named client case results and source references, campaign scope for TeamPlanner, and evidence before reinstating Academy statistics. The website continues using the existing P41 identity and contact information.
