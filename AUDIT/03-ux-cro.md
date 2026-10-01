# UX and CRO Audit

## Homepage funnel review

### Hero section
- Actual headline: “YOUR BUSINESS. BUILT FOR THE WEB.”
- Supporting claim: “Beautiful websites, reliable hosting and ongoing support — without the technical headache.”
- CTAs: `START A PROJECT`; `VIEW OUR WORK`
- Trust cues: “AVAILABLE FOR NEW PROJECTS”, “EST. 2023 / SOUTH AFRICA”, proof strip, service list, and brand phrases
- Friction: speed/visual intensity is high, but there is no clear proof anchor near the CTA beyond brand styling.
- Recommendation: KEEP as primary hero, but add a stronger proof statement or short trust proof immediately below the CTA.

### Proof strip / strategic positioning
- Content: “DESIGN / DEVELOPMENT / HOSTING / SUPPORT / ONE TEAM. ONE POINT OF CONTACT.”
- Purpose: establish the integrated service promise.
- Evidence: the site itself presents this as the single-point-of-contact pitch.
- Recommendation: KEEP.

### Statement / brand section
- Content emphasizes that a website should explain, build confidence, and offer a next step.
- Purpose: reposition website from “online brochure” to business asset.
- Recommendation: KEEP; it supports the sales narrative well.

### Services section
- The service list is complete and clearly structured.
- CTA target: `#contact`
- Recommendation: KEEP as a conversion driver.

### Client portfolio / work section
- Contains both genuine client links and “concept directions” under the same work section.
- This may create ambiguity because some items are real client/public businesses and others are concept directions.
- Recommendation: MODIFY to explicitly separate VERIFIED CLIENT WORK from CONCEPT / SPECULATIVE WORK.

### Why SihleB / process / hosting sections
- These sections reinforce the “design → build → host → support” narrative.
- Recommendation: KEEP; these align with the proposition.

### Pricing section
- Packages shown: Essential, Launch, Growth, Signature.
- CTA: “DISCUSS YOUR PROJECT”
- Recommendation: KEEP, but the pricing needs stronger transparency because features and support terms are not fully explained.

### Contact / final CTA
- Form fields: name, business, email, service, budget, message, plus honeypot field `website`, and additional fields are expected by the API but are not visible in the main form HTML.
- CTA flow is good but the success state should be explicit and consistent.
- Recommendation: MODIFY to ensure the user sees confirmation prompt, next steps, and any required follow-up timing.

## CTA audit

### START A PROJECT
- Exact text: visible in multiple places.
- Destination: `#contact`
- Behavior: good anchor jump on desktop and mobile.
- Clear? Mostly yes. It is clear and repeated.
- Friction: low, except the form is long and the package choice is not anchored to a clear decision path.

### VIEW OUR WORK
- Destination: `#work`
- Purpose: prove work and client quality.
- Friction: current section mixes real work and speculative concepts, which weakens proof.

### WhatsApp CTA
- Destination: `https://wa.me/27674877278?...`
- Behavior: good mobile experience and proper `target="_blank"`.
- Clear? yes.
- Friction: low.

### Pricing CTAs
- Destination: `#contact`
- Good link from plan cards and the hosting section.
- Issue: not enough explanation of what changes between packages or what the long-term cost is.

## Conversion path analysis

### Visitor → Understand
- Strong: homepage quickly explains what SihleB does.
- Gap: not enough proof that the business can deliver results beyond design aesthetics.

### Visitor → Trust
- Moderate: brand presence, combined services, and in-house hosting/support help.
- Gap: no case studies with measurable outcomes, testimonials, or clear client proof for conversion-critical pages.

### Visitor → Evaluate
- Moderate: pricing is visible, but package differences are ambiguous and not fully explained.
- Gap: no comparison data like typical page counts, support hours, hosting terms, or renewal structure.

### Visitor → Enquire
- Strong: contact flow is simple and prominent.
- Gap: forms need stronger reassurance and expectation-setting.

## CRO recommendations
- P1: separate real client proof from concept work and highlight genuine outcomes.
- P1: create a clearer “Which package fits you?” helper near the pricing section.
- P1: add trust proof immediately under the hero CTA.
- P2: add a “what happens next?” block after the enquiry form success state.
- P2: improve pricing transparency with included support, renewal schedules, and handover details.

## Evidence-based status
- UX: AMBER
- CRO: AMBER
- Reason: the funnel is functional, but proof and package clarity are weaker than the rest of the sales narrative.
