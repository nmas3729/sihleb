# SEO Audit

## Technical SEO
- `robots.ts` allows all user agents and points to `https://sihleb.co.za/sitemap.xml`.
- `sitemap.ts` generates a static list including the homepage and all service landing pages.
- Metadata is defined in `app/layout.tsx` and includes `metadataBase`, `openGraph`, and keywords.
- Canonical tags are set at the root and service pages via `alternates: { canonical: ... }`.
- The site responds with `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`, which is good for security and crawlability.
- There is no evidence of custom 404/410 handling beyond Next.js defaults.
- Redirect behaviour is limited to one explicit redirect from `/website-design-gauteng` to `/web-design-johannesburg`.
- There is no evidence of duplicate canonical or `noindex` issues on the key routes.

## On-page SEO
- Homepage title: “Web Design South Africa | Websites That Generate Enquiries | SihleB”
- Homepage description: matches the main proposition and includes South African intent.
- Service pages have title/description metadata defined in the slug map in `app/[slug]/page.tsx`.
- H1 and H2 usage is present on the homepage and slug pages.
- Keyword/topic alignment is relatively coherent: web design, development, ecommerce, hosting, SEO, website maintenance.
- Schema is present on the homepage and service pages, including Organization and Service JSON-LD.
- BreadcrumbList and Service schema are present on the dynamic landing pages.
- There is no evidence of FAQ, LocalBusiness, or WebSite schema beyond the basic Organization/WebSite/Service blocks.

## Content and indexability
- Public content is broad enough to cover service keywords and landing page intent.
- However, the website is using a large number of landing-page URLs for similar target phrases; not all channels are clearly differentiated in actual user value.
- The `insights` section appears empty; this may reduce crawl depth and topical coverage until new content is added.
- The `work` route is present but not yet backed by many case-study pages or measurable proof.

## Search appearance and local SEO
- The site is using South African local context and `en_ZA` locale in metadata.
- Service pages are likely relevant for local queries mixed with agency/service intent.
- The homepage has a strong local SEO pattern but could benefit from more specific proof of local credibility and unique outcomes.

## SEO status
- Technical SEO: GREEN-AMBER
- On-page SEO: AMBER
- Structured data: AMBER
- Reason: core SEO foundations exist, but stronger evidence and content depth are needed for more durable rankings and conversion quality.

## Recommended SEO actions
- P1: review whether the service pages are too close in topic and overlap; consolidate or clearly differentiate the intent of each one.
- P1: add a stronger proof layer to service pages so they are not only landing pages but also trust pages.
- P2: publish actual insight content to avoid a thin `insights` section.
- P2: consider whether a clearer local business schema and/or LocalBusiness addition would be justified by explicit business details and address data.
- P3: audit the sitemap route list against actual published pages to ensure no stale URLs or duplicates remain.
