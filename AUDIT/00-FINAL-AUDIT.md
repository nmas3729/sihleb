# Missing Audit Evidence

## 1. Audit scope

This audit is intentionally limited to evidence validation. It does not redesign the site, implement recommendations, or modify production code. It evaluates what is already present in the repository, the live production site, and the existing audit set.

Scope covered:
- repository implementation
- live site state
- security headers and API protection
- analytics configuration
- form flow and backend handling
- portfolio proof and trust layer
- pricing transparency and claims
- SEO technical state
- performance risks and measured evidence
- accessibility evidence and gaps
- route inventory and IA
- backlog review
- client-input requirements

## 2. Methodology

The audit was validated against:
- source files in the repo
- build output
- live HTTP response from the production site
- rendered HTML from the homepage
- existing audit documentation in /AUDIT
- explicit code-level evidence where available

Each finding is classified as one of:
- VERIFIED FACT
- VERIFIED PROBLEM
- IMPROVEMENT OPPORTUNITY
- UNKNOWN
- REQUIRES CLIENT INPUT
- NOT TESTED

## 3. Repository findings

### Verified facts
- The app is a Next.js 16 application using React 19 and TypeScript.
- The homepage is the main conversion landing page in [app/page.tsx](../app/page.tsx).
- The contact form is implemented on the homepage and submits to [app/api/project-enquiry/route.ts](../app/api/project-enquiry/route.ts).
- Google Analytics is initialized in [app/layout.tsx](../app/layout.tsx) with measurement ID G-6FX0L2L9GN.
- Vercel Analytics event tracking is used in [app/page.tsx](../app/page.tsx).
- Security headers are configured in [next.config.mjs](../next.config.mjs).
- Route generation and service-page metadata are handled in [app/[slug]/page.tsx](../app/[slug]/page.tsx).
- The site uses generated robots and sitemap in [app/robots.ts](../app/robots.ts) and [app/sitemap.ts](../app/sitemap.ts).
- There is a redirect at [app/website-design-gauteng/route.ts](../app/website-design-gauteng/route.ts).
- The insights section exists but has no content beyond placeholders and empty loading logic.

### Verified problems
- Direct img usage is present in [app/page.tsx](../app/page.tsx) and the project disables Next image optimization in [next.config.mjs](../next.config.mjs).
- Portfolio proof is mixed between real client links and concept work on the same page.
- Pricing is visible, but renewal/support terms are not visible in repo or public copy.
- The enquiry flow exists, but the success state does not clearly tell the user what happens next.

### Improvement opportunities
- Service routes overlap in intent and content scope.
- Analytics is present but not tied to a clear business KPI model.
- Accessibility validation is not fully evidenced.

### Unknowns
- Real conversion rates
- Real client outcomes
- Real support SLA performance
- Real project revenue attribution

## 4. Live-site findings

### Production status
- Live site returned HTTP 200.
- Homepage HTML includes:
  - title
  - canonical URL
  - OG and Twitter metadata
  - GA script
  - Schema.org Organization/WebSite/Service blocks
  - CTA and contact form markup

### Verified production-level evidence
- Headers present on live site:
  - strict-transport-security
  - x-content-type-options
  - x-frame-options
  - referrer-policy
  - permissions-policy
- Homepage uses a dark visual brand and a large conversion-focused single-page structure.
- The homepage renders real client work and concept work in different sections, but both are visible in the same conversion flow.

### Not observed
- production Lighthouse report
- production Core Web Vitals report
- production accessibility report
- GA dashboard evidence
- CRM or lead-to-sale reporting

## 5. Technical findings

### Architecture
- App Router architecture is present and active.
- The homepage is a single large sales page with a clear CTA structure.
- The site uses a server route for enquiries and email sending via Resend.
- There is no CMS or database implementation evident in the repo.

### Code quality notes
- The app builds successfully.
- The app is functional and coherent, but the homepage contains a significant amount of UI logic and styling in one place.
- The codebase is simple and maintainable for a small marketing site, but it is visually heavy and content-heavy for a single route.

## 6. UX / CRO findings

### Discovery
- The visitor can understand what SihleB does within seconds from the hero, service list, and value proposition.
- The target customer is visible: South African SMEs and service-based businesses.
- The offer is clear in broad terms.

### Trust
- Trust signals present:
  - company identity
  - service coverage
  - hosting/support integration
  - public-facing business URLs
  - contact details
- Trust gaps:
  - no strong case-study evidence with outcomes
  - no testimonials with proof context
  - no measurable result claims beyond marketing language
  - concept work is not separated clearly enough from real client work

### Evaluation
- Pricing is visible and easy to scan.
- Long-term cost transparency is missing.
- Support and renewal terms are not explicit.
- Package differences are clear by feature list, but not by complete commercial terms.

### Decision friction
- The strongest objection is missing proof and missing pricing certainty after the first 12 months.
- The site is persuasive but not yet fully proof-driven.

### Enquiry flow
- CTA hierarchy is strong.
- Form is easy to find and complete.
- WhatsApp and email CTAs are present.
- Success state and post-submission expectation are weaker than the rest of the funnel.

## 7. Business offer and commercial findings

### What is explicitly sold
- web design
- web development
- ecommerce
- hosting
- support
- SEO foundations
- website care

### Verified package data
- Essential: R7,500
- Launch: R13,700
- Growth: R18,500
- Signature: R32,000+

### Verified inclusions
- 12 months hosting is explicitly included for each package.
- Free .co.za domain for 12 months is explicitly included.
- Business email accounts are included in some package tiers.
- SEO foundations and analytics appear in selected tiers.

### Gaps requiring client input
- renewal pricing
- support plan details
- post-12-month hosting cost
- migration and ownership terms
- support response SLA
- package popularity evidence

### Classification
- “MOST POPULAR” claim: NOT VERIFIED
- “reliable hosting” claim: BUSINESS CLAIM
- “fast”, “secure”, “reliable”, “search ready”: BUSINESS CLAIM with no measured proof in the repo

## 8. Content and trust findings

### Claim inventory
| Claim | Location | Classification | Evidence |
|---|---|---|---|
| “Beautiful websites, reliable hosting and ongoing support” | Homepage hero | BUSINESS CLAIM | homepage copy in [app/page.tsx](../app/page.tsx) |
| “Built for real businesses” | work section | VERIFIED FACT | public links to real businesses are visible |
| “Selected concept directions” | work section | VERIFIED FACT | concept work is explicitly labelled |
| “Most popular” | pricing cards | NOT VERIFIED | no business data or repo evidence |
| “search ready” | performance section | BUSINESS CLAIM | no ranking or SEO proof shown |
| “secure” | performance section | BUSINESS CLAIM | headers exist, but no measured security audit beyond headers |
| “reliable” | hosting section | BUSINESS CLAIM | no uptime evidence |
| “Better enquiries” | marketing copy | BUSINESS CLAIM | no lead outcome proof shown |

### Trust status
- The site has clear identity and a coherent proposition.
- It does not yet show a strong proof layer tied to business outcomes.

## 9. Portfolio proof analysis

### Verified client work
The homepage includes publicly visible client websites:
- Travel Class SA
- Siko Mining
- NMAS Innovations
- Eclipse Power
- Lolly Beauty Bar

### Concept / speculative work
The homepage also includes obvious concept work:
- After Dark
- Field Notes
- The Good Work

These are explicitly marked as concept directions and not presented as real client work.

### Outcome evidence
- No case-study pages with measurable outcomes were found.
- No testimonials with names, roles, and project outcomes were found.
- No before/after conversion uplift evidence was found.

### Verdict
- The portfolio demonstrates capability and public presence.
- It does not yet demonstrate business results.

## 10. SEO technical findings

### Verified technical state
- robots file exists and points to sitemap.
- sitemap exists and includes public URLs.
- homepage metadata is present.
- canonical tags are present.
- OG and Twitter metadata are present.
- schema blocks exist.
- redirect route exists.
- live homepage returned HTTP 200.

### Missing technical evidence
- no ranking data
- no Search Console evidence
- no crawl/indexing report
- no keyword-performance evidence
- no business measurable ranking improvement

### Technical SEO status
- Technical SEO: VERIFIED FACT
- Actual search performance: UNKNOWN

## 11. Performance findings

### Measured evidence
- Build succeeded with pnpm lint && pnpm build.
- Lint reported 3 warnings, all from no-img-element.
- No Lighthouse or Core Web Vitals report was available.

### Actual metrics available
- LCP: NOT MEASURED
- INP: NOT MEASURED
- CLS: NOT MEASURED
- FCP: NOT MEASURED
- TTFB: NOT MEASURED
- total page weight: NOT MEASURED
- JavaScript size: NOT MEASURED
- CSS size: NOT MEASURED
- largest images: NOT MEASURED
- image dimensions: NOT MEASURED
- image formats: NOT MEASURED
- font loading: NOT MEASURED
- third-party script impact: PRESENT BUT NOT CONFIRMED

### Code-level risk
- images.unoptimized = true in [next.config.mjs](../next.config.mjs)
- direct img elements in [app/page.tsx](../app/page.tsx)
- animation-heavy visual layout in [app/globals.css](../app/globals.css)

### Classification
- Performance problem: IMPROVEMENT OPPORTUNITY backed by technical evidence
- Actual measured performance issue: NOT MEASURED

## 12. Accessibility findings

### Verified positive findings
- focus-visible styles exist
- form labels exist
- required fields exist
- mobile menu toggle exists

### Gaps
- no keyboard navigation pass evidence
- no contrast-ratio test evidence
- no reduced-motion validation evidence
- no screen-reader workflow evidence
- no skip-navigation implementation found

### Accessibility status
- AMBER
- not a confirmed WCAG violation without testing
- but it is not fully proven compliant either

## 13. Analytics findings

### Verified analytics implementation
- GA measurement ID G-6FX0L2L9GN is initialized in [app/layout.tsx](../app/layout.tsx)
- Vercel Analytics events are present in [app/page.tsx](../app/page.tsx)
- tracked events include:
  - whatsapp_click
  - project_enquiry_started
  - project_enquiry_submitted
  - project_enquiry_failed
  - portfolio_project_view
  - pricing_package_click
  - hosting_click
  - email_click

### What is not confirmed
- final conversion funnel in business reporting
- lead-source attribution model
- real KPI dashboard setup
- qualified lead stage definition
- form completion to revenue relationship

### Status
- Analytics instrumentation: VERIFIED
- Business-level conversion reporting: UNKNOWN

## 14. Security findings

### Verified headers
- strict-transport-security
- x-content-type-options
- x-frame-options
- referrer-policy
- permissions-policy
- poweredByHeader disabled

### Verified protective controls
- honeypot field in form
- rate limiting based on IP
- request deduplication
- server-side input validation

### Hardening opportunities
- CSP not present
- stronger bot protection may be needed if traffic increases
- deployment secret handling must be reviewed externally

### Classification
- Verified security issue: none proven from repo/live evidence
- Hardening opportunity: verified, but not a confirmed vulnerability

## 15. Form flow and enquiry trace

### Frontend
- Homepage form in [app/page.tsx](../app/page.tsx)
- Fields: name, business, email, service, budget, message, hidden website field
- Validation: HTML required fields plus server validation

### Backend
- API route: [app/api/project-enquiry/route.ts](../app/api/project-enquiry/route.ts)
- It validates:
  - required input
  - email format
  - allowed service values
  - allowed budget values
  - honeypot field
  - duplicate request IDs
  - rate limit by IP

### Email delivery
- Resend is configured
- internal email is sent to hello@sihleb.co.za
- confirmation email is sent to the source contact
- environment variables are required and should be managed externally

### User-visible result
- success state exists
- failure state exists
- user expectation after submission is not explicitly defined

## 16. Route inventory and information architecture

### Public routes found
- /
- /web-design-south-africa
- /web-design-johannesburg
- /website-design-gauteng (redirect)
- /web-development-johannesburg
- /ecommerce-website-design-south-africa
- /website-hosting-south-africa
- /website-maintenance
- /seo-web-design
- /pricing
- /work
- /about
- /insights
- /insights/[slug]
- /sitemap.xml
- /robots.txt

### Assessment
- The site is structured around a homepage conversion funnel plus service landing pages.
- Some service pages overlap by intent and local focus.
- The structure is coherent, but more proof and clarity would make it stronger.

## 17. Live vs repository comparison

### Result
NO MATERIAL DIFFERENCE FOUND

The live production HTML and metadata matched the repository implementation for homepage structure, metadata, GA script, and form layout.

## 18. Backlog review

### Recommendations review
| ID | Recommendation | Review |
|---|---|---|
| P1-1 | Separate verified client work from concept work | KEEP — evidence is strong |
| P1-2 | Add pricing transparency and renewal/support terms | KEEP — evidence is strong |
| P1-3 | Strengthen trust proof near CTA | KEEP — evidence is strong |
| P1-4 | Improve form success/confirmation expectations | KEEP — evidence is strong |
| P2-5 | Review overlapping service pages | MODIFY — valid but strategic |
| P2-6 | Add measurable analytics plan | KEEP — evidence is strong |
| P2-7 | Improve accessibility validation | KEEP — evidence is partial but valid |
| P2-8 | Improve image optimization | KEEP — evidence is strong |

### Reclassified items
- None are unsupported outright.
- Some are more strategy-oriented than defect-driven; those remain improvement opportunities rather than problems.

## 19. Do-not-change-yet list

These should not be changed before more evidence or business input:
- pricing amounts and package names
- hero positioning and brand expression
- client claims and public case-study status
- service-page consolidation decisions
- work/portfolio structure until client approval is confirmed
- support SLA and renewal policy
- analytics KPIs without business owner alignment

## 20. Client input required

### Commercial
- exact renewal pricing
- post-12-month hosting terms
- support scope and exclusions
- package-starting-price vs fixed-price interpretation

### Operations
- expected follow-up SLA
- issue escalation and support process
- privacy/legal page status

### Client proof
- which projects are approved for public case-study use
- which projects can be cited publicly
- testimonial availability and approval
- permission to use outcome claims

### Positioning
- whether concept work is intended as public narrative
- whether the site is local-only or wider
- which page is the real conversion priority

### Analytics/business data
- what counts as a qualified lead
- what source/medium is most important
- what business outcome defines success

## 21. Measurement gaps

The following were not measured and should not be treated as proven issues:
- Core Web Vitals
- actual page weight
- final CSS bundle size
- image load characteristics
- font loading impact
- Lighthouse score
- accessibility compliance pass
- GA conversion dashboard accuracy
- business lead quality and revenue attribution

## 22. Final audit conclusion

### What is working
- The site builds successfully.
- The live site responds with HTTP 200.
- SEO and metadata foundations are in place.
- Security headers are present.
- The homepage includes a working contact flow and email sends through a server endpoint.
- The value proposition and funnel are visible and coherent.

### What is objectively wrong
- The portfolio trust layer is weaker than the sales narrative suggests.
- The pricing model does not explain long-term cost and support policy clearly enough.
- The enquiry experience could set better user expectations.
- The site does not present measurable proof in the same way it presents marketing claims.
- Direct image usage and image optimization settings create a real technical performance concern, even without measured Core Web Vitals.

### What is merely an opportunity
- Service-page consolidation
- analytics KPI refinement
- accessibility validation
- deeper IA structure work

### What is unknown
- rankings and organic performance
- real case-study outcomes
- real support performance
- real conversion quality
- real revenue contribution

### What requires business decisions
- renewal policy
- support SLA policy
- public proof approval
- package popularity and market positioning
- which business outcome is the key KPI

### What should be measured before any change
- conversion funnel and lead quality
- actual homepage performance metrics
- accessibility pass results
- package demand and support policy

### What should not be changed yet
- pricing amounts
- package names
- hero identity
- brand direction
- public portfolio claims without approval
- service-page cleanup before business strategy is clarified

## 23. Master findings table

| ID | Area | Finding | Classification | Evidence | Severity | Confidence | Action |
|---|---|---|---|---|---|---|---|
| 1 | Portfolio & trust | Mixed real client work and concept work on the homepage | VERIFIED PROBLEM | [app/page.tsx](../app/page.tsx) | High | High | Keep but separate |
| 2 | Pricing | Renewal support and long-term costs are not stated | VERIFIED PROBLEM | [app/page.tsx](../app/page.tsx) and [AUDIT/13-questions-for-client.md](13-questions-for-client.md) | High | High | Requires client input |
| 3 | Trust | Proof layer is weaker than the sales narrative | VERIFIED PROBLEM | homepage copy and absence of outcomes | High | High | Requires proof |
| 4 | Form UX | Post-submission expectation is weak | VERIFIED PROBLEM | [app/page.tsx](../app/page.tsx) and [app/api/project-enquiry/route.ts](../app/api/project-enquiry/route.ts) | Medium | High | Business policy needed |
| 5 | SEO/IA | Similar service routes overlap | IMPROVEMENT OPPORTUNITY | [app/[slug]/page.tsx](../app/[slug]/page.tsx) | Medium | Medium | Strategy review |
| 6 | Analytics | Tracking is present but not tied to a KPI model | VERIFIED PROBLEM | [app/layout.tsx](../app/layout.tsx) and [app/page.tsx](../app/page.tsx) | Medium | High | Business KPI needed |
| 7 | Accessibility | Validated positives exist but compliance evidence is missing | IMPROVEMENT OPPORTUNITY | [app/globals.css](../app/globals.css) | Medium | Medium | Test required |
| 8 | Performance | Unoptimized image handling is present | VERIFIED PROBLEM | [next.config.mjs](../next.config.mjs) and [app/page.tsx](../app/page.tsx) | Medium | High | Implement optimization later |
| 9 | Security | Good baseline headers and form protection exist | VERIFIED FACT | [next.config.mjs](../next.config.mjs) | Low | High | Monitor and harden |
| 10 | Content | Insights route is empty | VERIFIED FACT | [app/insights/page.tsx](../app/insights/page.tsx) | Low | High | Content decision |

## 24. Final conclusion

The site is operational, coherent, and conversion-oriented. It has a workable technical base, a visible offer, and a contact funnel. The core audit issues are not broken code or missing core functionality. The missing evidence is concentrated in trust, commercial transparency, and measurable business performance.

The important distinction is this:
- the site is not failing in a technical sense
- the site is under-evidenced in the places where a buyer is most likely to hesitate
- the next step should be measurement and business clarification, not redesign

This is the correct evidence position before any improvement plan is produced.
