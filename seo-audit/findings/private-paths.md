# Private paths (checked from code only; not crawled)

| Path | robots.txt | meta robots | X-Robots-Tag header | Auth |
|---|---|---|---|---|
| /admin, /admin/** | Disallow (good) | noindex, nofollow via JS (`app.ts:101`) | none | client-side `adminGuard` |
| /api/** | Disallow (good) | n/a | none | per-endpoint (not verified) |
| /academy/access/:purchaseId | NOT blocked | index, follow (wrong) | none | purchase id in URL |

Fix:
1. `vercel.json` headers: `X-Robots-Tag: noindex, nofollow` for `/admin(.*)`, `/academy/access/(.*)`, `/api/(.*)`.
2. `app.ts`: set noindex for `/academy/access` too.
3. `public/robots.txt`: add `Disallow: /academy/access/` in the single `User-agent: *` group.
4. robots.txt is not access control: the admin guard runs only in the browser, so every `/api` write endpoint must check the token on the server. Not verified here.
Do not add these paths to the sitemap or llms.txt.
