# AI Search Readiness (25/100)

- Critical: 0 words of content without JavaScript (agentic_check: 7 words, all from <title>). GPTBot, ClaudeBot, PerplexityBot and most AI fetchers do not run JavaScript, so they cannot read or cite any page.
- Pass: robots.txt allows all bots except /admin and /api; one `*` group, no named AI groups.
- Pass: AI user agents get the same 200 response as a browser (no WAF block).
- Fail: /llms.txt and /.well-known/ai-catalog.json return 200 HTML (soft 404). Fix the 404 first; llms.txt is optional (Google ignores it).
- Optional: `Content-Signal: search=yes, ai-input=yes, ai-train=<your choice>` in robots.txt.
- Citability once prerendered: product pages and /about have clear, factual passages. Add short definition paragraphs ("What is a time study?") and sourced numbers.
