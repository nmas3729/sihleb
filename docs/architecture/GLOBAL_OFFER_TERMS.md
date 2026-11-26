# GLOBAL_OFFER_TERMS

This document separates the confirmed technical implementation from the business decisions that still require approval before they can be treated as binding public commitments.

## 1. Confirmed requirements already implemented

The current implementation preserves the following business model:

- Eastern Europe: fixed price of €750 for the agreed package.
- Australia: fixed price of A$1,250 for the agreed package.
- €0 upfront.
- Client pays only after approving the completed, agreed website.
- Client owns and supplies the domain.
- Non-listed countries require a separate quote after evaluation.
- Hosting terms remain subject to final agreement before launch.
- Applications are reviewed before project acceptance.

These are the operational requirements currently encoded in the form and API flow:

1. A prospect submits an application.
2. The server validates the application and blocks invalid or tampered pricing.
3. The server rate-limits and deduplicates submissions based on request ID and IP.
4. SihleB reviews the application.
5. The form and page copy make clear that the project is subject to review and a written scope agreement.
6. No deposit or upfront payment is collected in code or UX.

## 2. Proposed package terms for review

The following package terms are a recommended operating model for the international offer and should remain clearly labelled as proposals until confirmed:

### Proposed base website package
- One custom-coded, responsive marketing landing page.
- Up to six agreed content sections.
- Contact or enquiry form within the agreed scope.
- Basic technical SEO and metadata.
- Mobile, tablet, and desktop layouts.
- Two consolidated revision rounds.
- Private staging preview before payment.
- Domain connection and deployment after payment.
- 12 months of hosting under agreed usage limits.

### Excluded work unless separately quoted
- E-commerce and payment processing.
- Membership systems and dashboards.
- Complex integrations and custom backend systems.
- Additional pages beyond the agreed scope.
- Copywriting, branding, logo design, and photography.
- Unlimited revisions and ongoing development.
- Paid third-party services and domain registration fees.

## 3. Unresolved decisions requiring business approval

The following items are still unresolved and should not be treated as final public policy without approval:

### 3.1 Exact deliverables and section limits
Recommended options:
- Option A: One landing page with up to six sections.
- Option B: One landing page plus a small number of extra pages.
- Option C: A broader website package with custom page counts.

Implications:
- The proposed package is a reasonable starting point, but the exact build boundary should still be agreed in writing.

### 3.2 Included revision rounds
Recommended options:
- Option A: One round of revisions included.
- Option B: Two rounds of revisions included.
- Option C: Two rounds with a final approval checkpoint.

Implications:
- The current proposal says “two consolidated revision rounds,” but this should be confirmed as the approved policy before being published as definitive.

### 3.3 Client review period and consolidated feedback
Recommended options:
- Option A: 5 business days to review the staging preview.
- Option B: 7 business days to review the staging preview.
- Option C: A longer approval window based on project size.

Implications:
- A fixed review window reduces delays but may not suit every project.
- The business should decide this before public messaging suggests a standard review period.

### 3.4 Rejection and unresponsive-client handling
Recommended options:
- Option A: Decline or pause unresponsive leads after a defined period.
- Option B: Offer a revised scope or a smaller package if the project is not a fit.
- Option C: Continue only with a formal acceptance and written project agreement.

Implications:
- This is operational and should be documented before a client is told that a review process is guaranteed.

### 3.5 Approval criteria
Recommended options:
- Option A: Acceptance is based on fit, technical feasibility, and scope clarity.
- Option B: Acceptance requires a signed scope document and review meeting.
- Option C: Acceptance requires a formal contract or SOW.

Implications:
- The current implementation supports review before acceptance, but it does not enforce a specific approval workflow.

### 3.6 Invoice timing
Recommended options:
- Option A: Invoice only after written approval of the agreed deliverables.
- Option B: Invoice after a staging approval milestone and final sign-off.
- Option C: Invoice at launch after payment confirmation.

Implications:
- The public promise should remain “payment only after approval” unless the business formalises the exact invoice milestone.

### 3.7 Source-code ownership and transfer
Recommended options:
- Option A: Client retains full ownership after approval and payment.
- Option B: Client retains project files while SihleB retains reusable framework patterns.
- Option C: Client owns content, while SihleB retains template-level assets and reusable IP.

Implications:
- This needs a final written agreement and should not be treated as a default position until approved.

### 3.8 Hosting limits, renewals, and support
Recommended options:
- Option A: 12 months included; post-year-one pricing and support are agreed separately.
- Option B: 12 months included with a defined hosting plan and additional charges after the first year.
- Option C: Hosting is included only under agreed resource and traffic limits.

Implications:
- The final hosting details must be confirmed before the public offer describes them as an approved policy.

### 3.9 Additional work and change requests
Recommended options:
- Option A: Additional work requires a written change order.
- Option B: Additional work is discussed and priced after approval.
- Option C: Additional work is accepted only after a revised scope is signed off.

Implications:
- The current UX and form language should continue to say “additional work requires written agreement” instead of implying a standard default position.

### 3.10 Delivery timeline expectations
Recommended options:
- Option A: Delivery is estimated within a mutually agreed window.
- Option B: Delivery is estimated as a range with recurring progress updates.
- Option C: Delivery is a fixed milestone date with change-order risk if delayed by client inputs.

Implications:
- The public copy should avoid promising exact turnaround dates until a specific delivery process is approved.

## 4. Recommended operating workflow before public commitment

The recommended workflow is:

1. Prospect submits application.
2. SihleB reviews fit, scope, and market alignment.
3. SihleB accepts or declines the project.
4. If accepted, both parties confirm the written scope, timelines, revision allowance, price, and launch terms.
5. SihleB builds the approved website without collecting an upfront project payment.
6. SihleB shares a private staging preview.
7. The client reviews the site and submits consolidated feedback.
8. The client approves the agreed deliverables.
9. SihleB invoices the agreed fixed fee.
10. After payment, SihleB completes launch and domain setup.

This remains a recommended process, not a final legal promise, because the business still needs to confirm the exact written agreement, hosting terms, and ownership position before the offer is treated as final.

## 5. Recommended next steps before public launch

1. Confirm the exact package definition and section count.
2. Confirm the revision round count and review period.
3. Confirm the website approval criteria, including what counts as sign-off.
4. Confirm invoice timing and a realistic payment process after approval.
5. Confirm ownership and hosting terms for the first year and renewal.
6. Review the public copy, FAQ, and form copy before promoting the offer externally.

## Summary

The code already enforces the zero-upfront offer and fixed pricing structure. The remaining risk is operational and commercial: specific clauses around revision limits, review periods, hosting, ownership, and the final acceptance workflow still need explicit approval before being treated as final business policy.
