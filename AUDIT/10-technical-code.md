# Technical Code Audit

## Verified architecture
- App Router structure under `app/`
- Components include `components/home/ConversionTracking.tsx`, `components/home/Header.tsx`, and `components/Schema.tsx`
- There is no obvious CMS or database layer in the public repo
- The main homepage is a long client component and contains significant logic for nav state, cursor effects, and form submission
- There is a direct API route for contact form processing with Resend

## Code quality observations
- The homepage code is comprehensive and business-focused, but it is large and complex for a single landing page.
- The form logic is robust and includes validation and rate-limiting, which is a positive sign.
- The route-driven landing pages are structured cleanly and are straightforward to follow.
- The `insights` route uses a custom `require.context` pattern to load MDX modules; this is workable but introduces complexity and a potential maintenance burden if the content library grows.
- There are duplicate or overlapping content routes for different service variants, which can increase maintenance cost and content drift over time.

## Issues
- `app/page.tsx` includes a large amount of UI logic and a long JSX tree; this can be harder to maintain over time.
- The site uses a single global CSS file with heavy styling; this is common for a landing page, but the complexity is significant.
- The `work` content is split between actual client links and concept directions in the same page, which may reduce clarity and maintainability.
- Code warnings show the use of `img` elements rather than `next/image`, which is not a functional bug but is a performance concern.

## Code health status
- Technical quality: AMBER
- Reason: the app is valid and builds, but it contains a large amount of logic and styling in a single place and would benefit from clearer separation of actual content from marketing/creative sections.

## Recommended actions
- P2: split repeated sections into reusable components as the content grows.
- P2: review the heavy single-page homepage structure and split conversion-critical sections into clearer modules.
- P2: decide whether duplicate service pages are truly needed or if the intent should be consolidated.
