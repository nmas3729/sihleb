# SihleB Production Deployment Readiness

This document records the repository’s actual local deployment evidence and the remaining production-only tasks. It intentionally excludes Resend configuration and live email delivery testing, per the current task constraints.

## 1. Confirmed hosting and deployment architecture

Status: PASS (repository-documented) / PENDING (production confirmation)

Confirmed from the repository:

- The app is a Next.js App Router project.
- The project uses `pnpm` and declares the runtime requirement in `package.json`:
  - `node >=20.9.0`
  - `packageManager: pnpm@10.33.0`
- The deployment instructions in [README.md](../../README.md) specify the deployment flow as a standard Node.js app with:
  - build command: `pnpm build`
  - start command: `pnpm start`
  - no Dockerfile required
- The same README identifies Coolify as the documented deployment target for the server-side environment variables and build flow.
- The repository does not contain a production deployment manifest, DNS config, or platform-specific deployment config that proves the live host beyond the documented Coolify setup.
- The app includes security headers in [next.config.mjs](../../next.config.mjs), which is consistent with a production-ready web server layer.

Important limitation:
- The repository does not prove the real production platform, domain, or environment values. The actual live deployment must still be confirmed in the production environment.

## 2. Local validation results

Status: PASS (executed locally)

The following checks were executed in the local repository and passed:

- `pnpm lint`
- `pnpm exec tsc --noEmit`
- `node --test tests/international-enquiry.test.ts`
- `pnpm build`

Results:

- ESLint completed successfully.
- TypeScript completed successfully.
- 12 focused tests passed.
- Production build completed successfully.

Not performed (explicitly out of scope):

- live Resend configuration
- sender-domain verification
- API key validation in the live environment
- email delivery tests to real recipients
- production DNS or domain routing checks

## 3. Required environment variables

Status: PASS (identified in code and docs)

The server-side email integration expects these environment variables only on the server; they are not public client variables:

- `RESEND_API_KEY`
  - Purpose: authenticates the Resend API client used by the enquiry routes.
- `RESEND_FROM_EMAIL`
  - Purpose: sets the sender address used when sending automated email messages.

Evidence:

- [README.md](../../README.md)
- [app/api/international-enquiry/route.ts](../../app/api/international-enquiry/route.ts)
- [app/api/project-enquiry/route.ts](../../app/api/project-enquiry/route.ts)

Important constraints:

- The code handles missing configured values safely by returning a safe server error instead of claiming delivery.
- The project does not expose these values through `NEXT_PUBLIC_*` variables.
- Their final production values were not configured or inspected in this local task.

## 4. Email integration configuration status

Status: PENDING (production task only)

This task did not configure or test Resend, as required.

What is already implemented in code:

- Both enquiry endpoints read `RESEND_API_KEY` and `RESEND_FROM_EMAIL` only from the server environment.
- The routes fail gracefully when the variables are missing:
  - `email_not_configured` response
  - generic user-facing message
  - no false claim of successful delivery
- The Resend SDK is used in server-only route handlers.

Deferred production-only task:

- Add the correct sender configuration in the actual production environment.
- Confirm the sender domain and approval status for the configured Resend sender address.
- Verify the live email integration using the live deployment environment, outside this local repository task.

## 5. Local review of the international enquiry flow

Status: PASS (code and tests verified locally)

The following checks remain intact in the code and local tests:

- server-side validation for required fields
- invalid email rejection
- invalid URL rejection
- fixed pricing integrity by market
- other-country custom quote path
- duplicate request ID protection
- IP-based rate limiting
- honeypot handling
- safe failure for missing email configuration
- separation from the South African project enquiry endpoint

Evidence:

- [app/api/international-enquiry/route.ts](../../app/api/international-enquiry/route.ts)
- [app/api/project-enquiry/route.ts](../../app/api/project-enquiry/route.ts)
- [components/global/GlobalApplicationForm.tsx](../../components/global/GlobalApplicationForm.tsx)
- [tests/international-enquiry.test.ts](../../tests/international-enquiry.test.ts)

Notable limitation:

- The in-memory `Map`/`Set` implementation is acceptable for a single-instance local environment, but it is not durable across multiple app instances or restarts. This is a production limitation and should be addressed if the app is deployed behind multiple instances or a horizontally scaled setup.

## 6. Route and SEO verification

Status: PASS (local code and build verification)

Verified:

- `/global` exists as a dedicated route in the app.
- The route includes metadata and canonical URL configuration.
- The route uses `metadataBase: new URL('https://sihleb.co.za')` and canonical `/global`.
- The page includes Open Graph metadata.
- `/global` is included in the sitemap generation in [app/sitemap.ts](../../app/sitemap.ts).
- `app/robots.ts` points to the production sitemap.
- The production build includes `/global` and generated sitemap entries.

Evidence:

- [app/global/page.tsx](../../app/global/page.tsx)
- [app/sitemap.ts](../../app/sitemap.ts)
- [app/robots.ts](../../app/robots.ts)
- [app/layout.tsx](../../app/layout.tsx)

Production caveat:

- The live URL and canonical output were not browser-checked in a deployed environment; they were verified in code and build output only.

## 7. Security, headers, and infrastructure review

Status: PASS (local code review and build)

Security and deployment-related settings present in the repo:

- `poweredByHeader: false` in [next.config.mjs](../../next.config.mjs)
- HSTS header configured
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` set to restrict camera/microphone/geolocation
- `X-Frame-Options: SAMEORIGIN`

These headers reduce common web-app attack surface and are consistent with a production web layer.

Remaining limitations:

- No explicit production firewall, WAF, CDN, or origin restrictions are defined in the repo.
- No production security scan or external penetration review was performed in this task.
- No production secrets were accessed or exposed.

## 8. Production limitations and deployment blockers

Status: PENDING / FAIL depending on requirement

The following are the main remaining deployment blockers or limitations:

1. Live email configuration is not set in the current environment.
   - Status: PENDING
   - Reason: Resend config is a production-only deployment requirement.

2. Sender-domain validation is not performed locally.
   - Status: PENDING
   - Reason: no production access or live domain validation was allowed in this task.

3. Multi-instance dedupe/rate limiting is not durable.
   - Status: PENDING
   - Reason: the app uses in-memory stores; this is not sufficient for horizontal scaling across multiple app instances.

4. Real production domain setup is not part of this local task.
   - Status: PENDING
   - Reason: DNS, domain routing, and live deployment were out of scope.

5. No production-run verification of the public site or live route behavior was performed.
   - Status: PENDING
   - Reason: this task was limited to the repository and local validation only.

6. No contractual or final hosting policy has been approved in repo documentation.
   - Status: PENDING
   - Reason: business policy remains separate from technical implementation.

## 9. Pre-deployment checklist

Status: PASS for local readiness / PENDING for production tasks

Executed locally:

- [x] Repository dependencies installed and project runs locally.
- [x] Lint passes locally.
- [x] TypeScript passes locally.
- [x] Focused tests pass locally.
- [x] Production build passes locally.
- [x] `/global` route is present in the generated app output.
- [x] Metadata and sitemap configuration are present in code.
- [x] Fixed-price validation is enforced in the server route.
- [x] South African enquiry endpoint remains separate from the international enquiry endpoint.

Remaining production-only steps (excluded from this task):

- [ ] Configure `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in the real hosting environment.
- [ ] Verify sender-domain approval in the Resend account.
- [ ] Validate the live form submission flow with a production deployment, without claiming this was done here.
- [ ] Confirm the production domain and DNS mapping.
- [ ] Confirm the final hosting platform and environment variables in the active production deployment.
- [ ] Decide whether a shared store is required for rate limiting and duplicate tracking in multi-instance production.

## 10. Deployment procedure based on the actual repository

Status: PASS (repository instructions only) / PENDING (live deployment)

Based on the repo evidence, the deployment flow is:

1. Ensure Node.js `>=20.9.0` and `pnpm@10.33.0` are available.
2. Install dependencies with `pnpm install`.
3. Run local validation:
   - `pnpm lint`
   - `pnpm exec tsc --noEmit`
   - `node --test tests/international-enquiry.test.ts`
   - `pnpm build`
4. Deploy the app using the documented Node.js build flow from [README.md](../../README.md):
   - build command: `pnpm build`
   - start command: `pnpm start`
5. Configure the required environment variables in the target environment only after the app is running in a non-production preview environment.
6. Confirm the production URL and route behavior after deployment.
7. Verify the live sitemap and metadata without claiming production verification that has not been performed here.

## 11. Post-deployment checks unrelated to email delivery

Status: PENDING

The following should be checked after deployment, but not as part of this local-only task:

- `/` loads successfully
- `/global` loads successfully
- `/sitemap.xml` is available
- `/robots.txt` is available
- canonical URLs resolve as expected
- Open Graph metadata renders as expected
- no console errors on page load
- server-side routes respond correctly for validation failures and duplicate submissions
- no unexpected redirects or broken links
- analytics and page scripts load without blocking the app

## 12. Rollback considerations

Status: PASS (documentation basis only)

Given the repo and build flow, rollback should be handled by:

- reusing the previous build artifact or commit
- reverting the deployment environment variables to the prior known-good config
- redeploying the previous app version in the production host
- confirming that the prior build still passes `pnpm build` locally before rollback

The repo does not include an automated blue/green or canary workflow, so a rollback plan should be handled by the deployment host’s own tooling and process.

## 13. Overall status summary

| Requirement | Status | Notes |
|---|---|---|
| Local build, lint, TypeScript, and tests | PASS | Executed locally and passed. |
| Route `/global` and metadata configuration | PASS | Confirmed in code and successful production build. |
| Server-side validation and pricing integrity | PASS | Verified in local tests for the international route. |
| Rate limiting and duplicate submission protection | PASS (local) / PENDING (production scaling) | In-memory implementation works locally but is not durable across multiple instances. |
| Resend configuration | PENDING | Deferred production task; not configured or tested locally. |
| Live email delivery | PENDING | Explicitly excluded from this task. |
| Production deployment | PENDING | No live deployment performed in this task. |
| Domain and DNS validation | PENDING | Not performed locally or in production. |
| Hosting policy approval | PENDING | Business approval still required. |

## 14. Remaining actions before deployment

These are the required actions before production deployment, excluding Resend setup and email delivery testing, which are explicitly deferred:

1. Confirm the actual production hosting environment and runtime settings.
2. Confirm the live domain and route mapping.
3. Ensure the production environment has the required server-only environment variables for the app to start without failing on build-time assumptions.
4. Review the production build one final time in the actual deployment environment.
5. Confirm the deployment host supports the Node.js runtime and `pnpm` build/start flow defined in the repo.
6. Ensure the app is behind a single-instance or properly shared-store setup if production traffic may scale across multiple processes.
7. Confirm the final business policy for the international offer before production promotion.
8. Schedule the Resend setup and email-delivery verification as a separate, production-only step after the app is live and configured.

No live email delivery or production deployment verification was claimed in this task. This document records only the repository evidence and the local validation results that were actually executed.
