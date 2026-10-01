# Security Audit

## Verified security positives
- `next.config.mjs` includes these headers for all pages:
  - `Strict-Transport-Security`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `X-Frame-Options: SAMEORIGIN`
- `poweredByHeader` is explicitly turned off.
- The contact form includes a honeypot `website` field to reduce bot submission, which is a good pattern.
- The form has rate limiting by IP in `app/api/project-enquiry/route.ts`.
- Request IDs are generated and deduplicated to help prevent duplicate form spam.
- The app uses `runtime = 'nodejs'` for the form endpoint.

## Findings
- The form is protected by basic rate limiting but not by captcha or a more advanced bot challenge.
- The API checks the `website` honeypot field and rejects invalid service/budget values and malformed email input.
- The code uses `console.error` to record failures, which is acceptable for a small app but should be monitored.
- The endpoint will crash or fail gracefully when `RESEND_API_KEY` / `RESEND_FROM_EMAIL` are not available; the repository does not show whether those env vars are configured in the deployment environment.
- A secret was not exposed in the code review, but the environment variable names are present and would require deployment-level configuration monitoring.

## Secret handling note
- The code uses `process.env.RESEND_API_KEY` and `process.env.RESEND_FROM_EMAIL` in `app/api/project-enquiry/route.ts`.
- No actual value was displayed in this report; the safe statement is: `SECRET DETECTED — DO NOT DISPLAY VALUE` at the environment-variable layer, file: `app/api/project-enquiry/route.ts`.

## Security status
- Security posture: AMBER
- Reason: good baseline headers and rate-limiting are present, but deployment secrets, bot protection, and production monitoring require confirmation.

## Recommended actions
- P1: validate the environment variable setup and ensure secrets are managed in the deployment platform, not in source code.
- P1: consider stronger spam controls if the site starts receiving bot submissions.
- P2: add logging and alerting for failed form submissions and email delivery failures.
- P2: review whether the contact form should include a more explicit privacy notice or consent text.
