# Schema (50/100)

Present (all injected by JavaScript only):
- Organization on most pages: name, url, logo, sameAs LinkedIn, contactPoint email `ives@p41.be`.
- SoftwareApplication on /time-study and /teamplanner.
- BlogPosting on posts (headline, description, image, datePublished, author Person, publisher).
- Course on course pages (name, description, provider).

Issues:
- High: SoftwareApplication `offers` has `priceCurrency` and `availability` but no `price`. Add a real price or remove `offers`.
- Medium: personal email in Organization contactPoint; prefer a role mailbox.
- Medium: logo is a plain URL; use ImageObject with width/height. No `address`.
- Low: publisher name "P41" vs Organization "P41 Industrial Intelligence"; use one name and an `@id`.
- Low: Course provider name "P41 Academy" with `sameAs` to the homepage; reference the Organization `@id` instead.
- Not present (fine): no fake SearchAction, no FAQ, no LocalBusiness, no HowTo.
