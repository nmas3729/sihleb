# Improvement Backlog

## P0 — Critical
- None identified from the evidence reviewed in the repository and live site.
- Reason: the site builds successfully, the live homepage returns HTTP 200, and there are no obvious security or core functionality failures that block business usage.

## P1 — High impact
1. Separate verified client work from concept/speculative work in the portfolio section.
   - Problem: the current work section mixes real client businesses with concept directions.
   - Evidence: homepage and portfolio area include `clientProjects` plus concept entries in a single work block.
   - Recommended change: clearly label and separate these categories; use verified work as the primary trust layer.
   - Expected benefit: trust and conversion confidence.
   - Effort: Medium
   - Risk: Low if handled with clear labels.
   - Dependency: client approval for any publicly shared case-study details.

2. Add clearer pricing transparency and renewal/support terms.
   - Problem: package differences and long-term costs are not fully explained.
   - Evidence: `plans` array lists features but no support after 12 months, renewal price, or terms are visible in the code or public page copy.
   - Recommended change: add an explanatory block for included 12 months, renewal pricing, support scope, and exclusions.
   - Expected benefit: lower purchase friction and fewer dropped enquiries.
   - Effort: Medium
   - Risk: Low if kept factual.
   - Dependency: client confirmation of pricing and support policy.

3. Strengthen trust proof directly in the hero and conversion flow.
   - Problem: the site is visually strong but lacks enough proof to support the claim that the site is proven and reliable.
   - Evidence: the homepage positions trust in design, not in measurable result or case-study proof.
   - Recommended change: add a small proof block with actual client names, outcome summaries, or a clearly labelled “what we’ve delivered” summary.
   - Expected benefit: greater credibility and better quality enquiries.
   - Effort: Medium
   - Risk: Low if supported by evidence.
   - Dependency: client approval on approved proof content.

4. Improve form success/confirmation expectations.
   - Problem: the form sends an email and a confirmation email, but the public UX does not clearly define what happens next.
   - Evidence: the API sends a confirmation email and the UI shows a success state when `formStatus === 'success'`, but the user journey after submission is not explicit.
   - Recommended change: define the next step and expected response time in the success message or a confirmation page.
   - Expected benefit: fewer drop-off concerns and better conversion confidence.
   - Effort: Low
   - Risk: Low
   - Dependency: business process confirmation for response times and follow-up.

## P2 — Medium impact
5. Review service-page overlap and keyword cannibalization risk.
   - Problem: several landing pages cover similar services and audiences.
   - Evidence: the Pages map includes multiple overlapping service pages.
   - Recommended change: either consolidate or clarify the purpose of each route.
   - Expected benefit: cleaner search intent and easier user decision-making.
   - Effort: Medium
   - Risk: Low to medium depending on content strategy.
   - Dependency: marketing strategy confirmation.

6. Add a measurable analytics plan tied to real funnel stages.
   - Problem: the current tracking is present but not clearly connected to business goals.
   - Evidence: GA and Vercel analytics exist, but no documented KPI structure is present in the repo.
   - Recommended change: define funnel metrics and ensure key events are measured consistently.
   - Expected benefit: better commercial decision-making and clearer optimization prioritization.
   - Effort: Low to Medium
   - Risk: Low
   - Dependency: business owner and analytics goal confirmation.

7. Improve accessibility validation for keyboard/focus and contrast.
   - Problem: the site is visually rich and may have weak accessibility test coverage.
   - Evidence: focus styles are present, but no evidence of full keyboard and contrast testing is in the repository or audit evidence.
   - Recommended change: run a structured accessibility pass on the hero, mobile nav, form, and pricing cards.
   - Expected benefit: reduced exclusion and fewer conversion blockers for assistive users.
   - Effort: Low to Medium
   - Risk: Low
   - Dependency: browser and QA testing.

8. Improve performance by replacing direct `img` usage with optimized image handling.
   - Problem: Next.js image optimization is disabled and direct `img` elements are used.
   - Evidence: `next.config.mjs` has `images.unoptimized = true` and multiple `img` tags exist in `app/page.tsx`.
   - Recommended change: adopt either Next.js optimized images or a reviewed image strategy with known sizes and caching.
   - Expected benefit: faster LCP and better mobile performance.
   - Effort: Medium
   - Risk: Low
   - Dependency: no external constraints beyond implementation work.

## P3 — Nice to have
9. Publish or consolidate the empty insights section.
   - Problem: the `insights` index is effectively empty.
   - Evidence: `content/insights` contains only `.gitkeep` and the `getInsights()` logic returns no items.
   - Recommended change: either add actual insights or remove the empty route until content exists.
   - Expected benefit: stronger topical depth and better content depth.
   - Effort: Low to Medium
   - Risk: Low
   - Dependency: content strategy.

10. Simplify or clarify overlapping local service pages.
   - Problem: several keyword variants may create a noisy or repetitive experience.
   - Evidence: many similar pages exist in the slug map.
   - Recommended change: consolidate or clearly differentiate service intent by region and offer type.
   - Expected benefit: shorter user decision time and stronger SEO clarity.
   - Effort: Medium
   - Risk: Medium
   - Dependency: marketing-planning input.
