# Accessibility Audit

## Verified facts
- The code includes focus-visible styling for links and buttons in `app/globals.css`.
- There is a `menu-toggle` button for mobile navigation and a fullscreen mobile navigation overlay with `role="dialog"` and `aria-modal="true"`.
- The contact form includes labels and required fields.
- The form includes a honeypot field with `aria-hidden="true"` and `tabIndex={-1}`.
- Many interactive elements have text content and are keyboard navigable in standard HTML.

## Accessibility concerns
- The site uses a lot of visual design cues (grid animations, abstract shapes, and text-heavy styling) but many of these are not fully paired with strong semantic structure or clearly labelled region headings.
- There is an obvious reliance on the form and CTA pattern; the visual-only emphasis may make the page less accessible for keyboard-first or screen-reader-first users if focus order is not carefully managed.
- The `menu-toggle` is present and likely usable, but the mobile menu needs a clear focus and close treatment validation in actual browser testing.
- There is no evidence of skip navigation or landmark utility beyond the standard page structure.
- The choice to use `aria-live` on the form status area is helpful, but no actual statuses are rendered in the static HTML; the success/error UI is inserted after user action in JavaScript.
- Without browser-level testing, it is not possible to confirm full WCAG AA satisfaction for contrast, keyboard behaviour, and focus states across all sections.

## Assessment
- Accessibility risk: AMBER
- Reason: the code shows a strong start but there is not enough evidence yet that every interactive element, form state, and mobile menu path meets WCAG 2.2 AA across the site.

## Recommended actions
- P1: test keyboard navigation and focus order across the landing page, mobile menu, and contact form.
- P1: validate color contrast across the yellow/white/dark combinations used in the hero and pricing sections.
- P1: confirm form validation and error messaging are explicit and announced to assistive tech.
- P2: add skip-navigation and additional ARIA or landmark structure where needed.
- P2: review motion and reduced-motion handling for the heavy visual effects.
