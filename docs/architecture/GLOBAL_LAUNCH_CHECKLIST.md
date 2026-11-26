# GLOBAL_LAUNCH_CHECKLIST

This checklist separates what is already verified in the implementation from what is still a proposed business policy requiring approval before the first international project is accepted.

## 1. Verified implementation facts

The current implementation already contains these confirmed technical facts:

- The `/global` route is present, uses the SihleB dark-navy and lime visual language, and includes route-level metadata and canonical URL settings.
- The app uses an international lead form at `components/global/GlobalApplicationForm.tsx` and a dedicated API route at `app/api/international-enquiry/route.ts`.
- The server keeps pricing authoritative and rejects client tampering for recognized markets.
- The accepted market prices in code are:
  - Eastern Europe: €750
  - Australia: A$1,250
  - Other countries: custom quote path only
- The zero-upfront model is preserved in the UX and API flow: no deposit or upfront payment is collected in code.
- The API validates required fields, invalid emails, invalid URLs, market assignment, and payment/approval acknowledgements.
- The route includes a honeypot field, request ID validation, duplicate request protection, and IP-based in-memory rate limiting.
- Resend is integrated through `RESEND_API_KEY` and `RESEND_FROM_EMAIL` and the route distinguishes between accepted applications and confirmation-email failures.
- The route does not claim successful delivery if the email configuration is missing; it responds with a safe failure state.
- `/global` is included in the public sitemap and the page uses standard metadata and OG fields.
- The local validation performed earlier included focused tests for pricing integrity, invalid inputs, duplicate submissions, and safe failure states.

## 2. Final package scope for the first real international clients

The following package scope is recommended for pre-approval discussion and should be treated as a proposal until the business confirms it in writing.

### 2.1 Eastern Europe — €750 fixed price

Recommended final scope for approval:
- One custom-coded, responsive marketing landing page.
- Up to six agreed content sections.
- Contact or enquiry form within the agreed scope.
- Basic technical SEO and metadata.
- Mobile, tablet, and desktop layouts.
- Two consolidated revision rounds.
- Private staging preview before payment.
- Domain connection and deployment after payment.
- 12 months of hosting under agreed usage limits.

### 2.2 Australia — A$1,250 fixed price

Recommended final scope for approval:
- Same proposed structure as the Eastern Europe package.
- Same fixed price logic and zero-upfront process.
- Same requirement that the client reviews, approves, and pays after the agreed website is approved.

### 2.3 Exclusions and non-standard work

These items are excluded from the standard package unless separately quoted and agreed in writing:
- E-commerce and payment processing.
- Membership systems and dashboards.
- Complex integrations and custom backend systems.
- Additional pages beyond the agreed block.
- Copywriting, branding, logo design, and photography.
- Unlimited revisions and ongoing development.
- Paid third-party services and domain registration fees.

## 3. Deliverables, exclusions, and revision policy requiring business approval

These are business policies that must be approved before the first real client is accepted.

### 3.1 Deliverables and section limit
Status: PENDING

Recommended default:
- One landing page with up to six agreed sections.

Business owner decisions required:
- Does the package remain limited to one landing page?
- Are extra pages accepted at a fixed rate or by separate quote?
- Are there different limits for Australian versus Eastern European work?

### 3.2 Revision policy
Status: PENDING

Recommended default:
- Two consolidated revision rounds included.

Business owner decisions required:
- Confirm the revision count.
- Confirm how revision rounds are grouped and what counts as a revision.
- Confirm whether a final approval checkpoint is required before payment.

### 3.3 Additional work and change requests
Status: PENDING

Recommended default:
- Additional work requires a written change request and separate approval.

Business owner decisions required:
- What qualifies as additional work?
- How are extra pages or features priced?
- Are there limits on feedback volume or turnaround during review?

## 4. Written scope agreement, client approval, rejection, and unresponsive-client procedures

### 4.1 Written scope agreement
Status: PENDING

Recommended default:
- SihleB confirms the final scope, timeline, revision allowance, launch steps, hosting limits, and price in writing before build begins.

Business owner decisions required:
- Short SOW, project brief, or full contract?
- Whether a signed scope document is mandatory before build starts.
- Whether the client must confirm acceptance of the scope in writing.

### 4.2 Client approval and payment gate
Status: PENDING

Recommended default:
- The client reviews the private staging preview.
- The client submits consolidated feedback.
- The client approves the agreed deliverables.
- The invoice is issued only after approval.

Business owner decisions required:
- What counts as formal approval?
- Does approval require written sign-off or can it be email-based?
- Is the invoice sent immediately after approval or only after a final check?

### 4.3 Rejection procedure
Status: PENDING

Recommended default:
- SihleB may decline or pause a project after application review if it is not a fit or scope cannot be agreed.

Business owner decisions required:
- Does SihleB send a brief rejection email?
- Is a revised smaller-scope option offered for borderline cases?
- Does any rejection trigger a separate follow-up path?

### 4.4 Unresponsive-client procedure
Status: PENDING

Recommended default:
- If a client becomes unresponsive after preview or revision rounds, SihleB pauses work and defines a clear next step.

Business owner decisions required:
- What review window is considered reasonable?
- Is the project automatically paused after a defined period of silence?
- Is the client still responsible for any agreed project costs if the project stalls?

## 5. Invoice timing and source-code ownership requirements

### 5.1 Invoice timing
Status: PENDING

Recommended default:
- Invoice only after confirmation of the approved deliverables.
- No deposit, no milestone payment required before approval.

Business owner decisions required:
- Should invoice timing be after the final staging approval, or after launch?
- Is a final written approval needed before the invoice is issued?
- Is the payment due in a fixed number of days after issue?

### 5.2 Source-code and asset ownership
Status: PENDING

Recommended default:
- The final ownership position is confirmed in the project agreement.
- For public messaging, the business should avoid implying a final default ownership position unless approved.

Business owner decisions required:
- Does the client own the final website code and assets after approval and payment?
- Does SihleB retain reusable framework patterns or templates?
- Is the content created by SihleB considered part of the project or separate from the client’s assets?

## 6. Hosting limits, domain responsibilities, and renewal pricing requirements

### 6.1 Hosting inclusions
Status: PENDING

Recommended default:
- 12 months of hosting included under agreed usage limits.

Business owner decisions required:
- Are usage limits included in writing?
- Is hosting limited to one site or multiple services?
- What is included in the managed hosting package?

### 6.2 Domain responsibility
Status: PENDING

Verified implementation fact:
- The public page and form state that the client supplies and owns the domain.

Business owner decisions required:
- Who manages DNS, domain renewal, and launch configuration?
- Should SihleB assist with DNS changes after approval and payment?
- Is SihleB responsible for domain transfers or only for DNS pointing and launch support?

### 6.3 Renewal pricing and support
Status: PENDING

Recommended default:
- Post-year-one hosting, renewals, and support are confirmed before launch and remain subject to final agreed terms.

Business owner decisions required:
- What is the renewal price after 12 months?
- Is there a recurring hosting fee?
- Is there any support SLA or support inclusion beyond hosting?

## 7. Resend production configuration and live email delivery test steps

### 7.1 Production configuration
Status: PENDING

Verified implementation fact:
- The API route expects `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to be configured.
- It safely fails with a structured error state when they are absent.

Production requirements to complete before live launch:
- Confirm the sender address is valid and approved in the production Resend account.
- Confirm the destination email is correct and monitored.
- Confirm the applicant confirmation email is valid and expected by the business.
- Confirm the environment variables are set in the real deployment environment, not only locally.
- Confirm that any rate limits and dedupe limitations remain acceptable in the real environment.

### 7.2 Live email delivery tests
Status: PENDING

Required test steps before public launch:
1. Set real Resend credentials in the production environment.
2. Submit a valid test application using the real route.
3. Confirm the internal email reaches the business inbox.
4. Confirm the applicant acknowledgement email reaches the tester’s inbox.
5. Confirm the wrong sender or invalid environment configuration fails safely and does not claim success.
6. Confirm a Resend timeout or partial failure is handled without telling the applicant their application was fully processed when it was not.
7. Evaluate the message body for compliance, clarity, and professionalism.
8. Confirm duplicate retry behaviour remains correct.

Important restriction:
- Do not claim live email delivery or production send success unless actual email tests are performed in the real environment.

## 8. Application form validation and end-to-end test scenarios

### 8.1 Form validation scenarios
Status: PASS (verified locally in the existing implementation)

The current local implementation includes validation coverage for:
- valid Eastern Europe submissions
- valid Australian submissions
- other-country custom quote path
- missing required fields
- invalid email addresses
- invalid URL values
- unconfirmed commercial acknowledgements
- client-side price tampering
- duplicate request IDs
- invalid JSON requests
- missing Resend configuration failure states

### 8.2 End-to-end acceptance scenarios to complete before launch
Status: PENDING

Required before first real project:
- Submit a valid real-world application through the production route.
- Confirm that the business receives the internal notification email.
- Confirm the applicant sees a correct acknowledgement message.
- Verify that the server rejects malformed or tampered payloads.
- Confirm duplicate retries trigger the expected duplicate submission message.
- Confirm rate limiting triggers only after the configured threshold.
- Confirm the form remains accessible and responsive on mobile and desktop.

## 9. Production rate-limiting and duplicate-submission limitations

### 9.1 Current technical limitation
Status: PASS with caveat

Verified implementation fact:
- The current rate limiting and duplicate protection are implemented in-memory using a Map and Set.
- This is acceptable for local development and single-instance environments.

Production caveat:
- This does not reliably protect across multiple app instances or server restarts.
- It should be treated as a temporary operational safeguard, not a durable production anti-abuse system.

### 9.2 Production requirement before scale-up
Status: PENDING

Recommended next step:
- Use a shared store such as a managed Redis/Vercel KV-like solution if the site is deployed across multiple nodes or the business expects real traffic.

Important restriction:
- Do not add a new paid service or production dependency without explicit approval.

## 10. Mobile, desktop, accessibility, SEO, and production route verification

### 10.1 Mobile and desktop layout
Status: PASS (from implementation review)

Verified implementation fact:
- The page is built to be responsive and preserves the existing dark navy / lime brand styling.
- The layout uses mobile-friendly spacing and stacked sections at smaller widths.

Production verification needed:
- Confirm there is no horizontal overflow on the real target browsers.
- Confirm the form remains readable on small screens.

### 10.2 Accessibility and keyboard use
Status: PASS (structural review)

Verified implementation fact:
- Labels are present for major form controls.
- The form uses visible focus states and keyboard-friendly controls.
- Inputs and buttons are standard HTML form elements.

Production verification needed:
- Run a real browser accessibility check on the `/global` page and form.
- Confirm error text is announced clearly and visible to keyboard and screen-reader users.

### 10.3 SEO verification
Status: PASS (implementation review)

Verified implementation fact:
- The page has a canonical `/global` URL and OG metadata.
- The route is included in the sitemap.
- The page uses standard metadata conventions already aligned with the current Next.js structure.

Production verification needed:
- Check the live rendered HTML for the final canonical URL and OG values.
- Ensure metadata matches the final approved offer wording.

### 10.4 Production route verification
Status: PENDING

Required before first real client launch:
- Confirm the live route is served correctly at `/global`.
- Confirm no South African routes were unintentionally changed.
- Confirm the production build continues to serve the route after deployment.

## 11. Prioritized launch checklist

### Priority 1 — business approval required before accepting the first international lead
Status: PENDING

- Confirm exact package scope and section limit.
- Confirm revision allowance and approval process.
- Confirm invoice timing and approval policy.
- Confirm source-code ownership and hosting terms.
- Confirm post-year-one hosting pricing and support.

### Priority 2 — production email and infrastructure readiness
Status: PENDING

- Configure real Resend credentials in the deployment environment.
- Test internal notification email delivery.
- Test applicant confirmation delivery.
- Confirm safe failure handling for partial or failed emails.
- Confirm rate-limit or dedupe strategy for multi-instance deployment.

### Priority 3 — route and user experience verification
Status: PENDING

- Validate `/global` route in production.
- Validate full form flow on desktop and mobile.
- Validate hidden-honeypot behaviour and duplicate request handling.
- Validate error states, success states, and retry behaviour.
- Confirm the sitemap and metadata remain correct in the live environment.

### Priority 4 — operational readiness
Status: PENDING

- Define the internal review workflow.
- Define how application rejections are handled.
- Define how unsupported or unresponsive projects are managed.
- Define how the business responds when a client changes scope or asks for extra work.

## 12. Launch decision summary

### PASS
- Static pricing and market enforcement in the current implementation.
- Zero-upfront payment model and no upfront-charge behaviour.
- Local validation coverage for major input, pricing, and failure paths.
- Basic route metadata and sitemap inclusion.
- Existing branding and page architecture remain aligned with the broader SihleB site.

### FAIL
- No production deployment has been performed.
- No real Resend delivery test has been performed.
- No business-approved final terms for revision limits, ownership, or hosting renewals have been finalized.
- No production anti-abuse store has been selected or approved for multi-instance deployments.

### PENDING
- Final written scope agreement format.
- Final acceptance and rejection workflow.
- Final invoice and payment timing.
- Final source-code ownership language.
- Final hosting limits and renewal pricing.
- Full live email and production route verification.
- Final business sign-off on the public offer wording.

## 13. Specific decisions the business owner must make before accepting the first international project

The business owner should approve these decisions before the first real international client is accepted:

1. The exact package definition and scope limits for the €750 and A$1,250 offers.
2. The number of included revision rounds and the review period.
3. What counts as formal approval of the final website.
4. When the invoice is sent and what triggers payment.
5. The exact ownership position for website code, content, and project assets.
6. Whether 12 months of hosting is included and what the post-year-one renewal price is.
7. Who owns the domain and who manages DNS and launch configuration.
8. Whether SihleB accepts or declines projects after an application review, and how unresponsive clients are handled.
9. Whether a project brief, scope document, or contract is required before the work begins.
10. Whether a durable shared store is required for rate limiting and duplicate protection before the site is promoted beyond a small pilot.

Until these decisions are made and documented, the current implementation is ready for technical review and safe internal testing, but not yet ready for the first real international client engagement.
