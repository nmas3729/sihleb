# Analytics Audit

## Verified tracking implementation
- Google Tag Manager / GA script is present in `app/layout.tsx` with ID `G-6FX0L2L9GN`.
- Vercel Analytics is installed and tracked in the homepage with `track()` calls for:
  - `whatsapp_click`
  - `project_enquiry_started`
  - `project_enquiry_submitted`
  - `project_enquiry_failed`
  - `portfolio_project_view`
  - `pricing_package_click`
  - `hosting_click`
  - `email_click`

## What is available today
- The website can measure some page-level traffic using GA.
- It can track WhatsApp click events, enquiry start, submit, and failure.
- It can track clicks on portfolio projects, pricing packages, hosting CTA, and mailbox links.

## Gaps in measurement
- There is no evidence of custom dimensions or event naming for package selection by the user.
- There is no evidence of a dedicated conversion funnel report for: visitor → click CTA → start form → complete form → converted lead.
- No form completion attribution is visible beyond the generic success/failure events.
- There is no evidence of a standard lead source/source/medium reporting layer beyond GA traffic.
- No integrated Search Console or SEO performance tracking is visible in the repo.
- There is no evidence of conversion tracking for phone click events outside the email/WhatsApp patterns.

## Recommendation for measurement
- P1: confirm whether GA4 is connected properly in the live environment and whether the business has a reporting dashboard set up.
- P1: define the core KPIs: page-level enquiry volume, CTA click share, form start rate, form completion rate, WhatsApp conversion rate, source/medium conversion.
- P1: add a final “enquiry success confirmed” event tied to the actual business outcome.
- P2: review whether package categories should be measured as lead-intent segments.
- P2: add event names and a measurement plan that does not rely on assumptions.

## Analytics status
- Analytics capability: AMBER
- Reason: tracking exists at a basic level, but the business may not have a clear measurement model that answers which page or CTA truly produces enquiries.
