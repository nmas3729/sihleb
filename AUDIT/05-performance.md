# Performance Audit

## Verified performance facts
- `next build` completed successfully with 0 errors.
- ESLint reported 3 warnings, all from `no-img-element` warnings in `app/page.tsx` for `img` tags used in logo and brand mark rendering.
- `next.config.mjs` sets `images.unoptimized = true`, which means Next.js image optimization is intentionally disabled.
- Remote images from a blob URL are used; no responsive size configuration is applied for those images.
- The homepage relies on a large CSS file and custom animation-heavy styles for a single-page marketing site.
- The site uses a fixed, animated background grid and multiple visual effects in the main hero and portfolio sections, which can increase rendering cost on lower-powered devices.

## Likely performance opportunities
- Heavy CSS and large custom style blocks in `app/globals.css` increase initial weight and complexity.
- `img` elements are used directly instead of `next/image` despite the project being Next.js.
- Remote images are full-size and unoptimized, which increases LCP risk if the logo or portfolio imagery is large.
- The custom background animations and hover effects can add paint and layout complexity, especially mobile.
- The homepage is visually rich and may be heavier than necessary for a first-time visitor who only needs a clear conversion path.

## Current condition
- Build health: GREEN
- Runtime performance risk: AMBER
- Reason: the site is functional and builds cleanly, but it is not yet optimized for mobile-first performance best-practice given the CSS/animation weight and unoptimized `img` usage.

## Recommended improvements
- P1: replace `img` tags with `next/image` or a deliberately managed image strategy.
- P1: reduce or simplify heavy animations for mobile and above-the-fold content.
- P2: set explicit dimensions and responsive variants for remote images.
- P2: audit any unused CSS and heavy sections that are not materially aiding conversion.
- P3: review whether the portfolio concept art and motion-heavy hero effects are necessary for the core sales conversion journey.

## Evidence-based note
The main evidence is in the code: `next.config.mjs` disables `images.unoptimized`, and the homepage uses direct `img` tags. There is no site performance benchmark or Lighthouse report in the repository, so actual LCP/CLS/INP values remain UNKNOWN without measurement tooling or a production performance report.
