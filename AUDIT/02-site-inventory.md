# Site Inventory

## Framework and stack
- Framework: Next.js 16.3.5
- Language: TypeScript + React 19
- CSS architecture: Tailwind CSS v4 plus custom CSS in `app/globals.css`
- Build system: Next.js build pipeline with ESLint
- Package manager: `pnpm`
- Key dependencies: `resend`, `lucide-react`, `@vercel/analytics`, `@base-ui/react`, `tailwindcss`, `@tailwindcss/postcss`
- Routing: file-based app router under `app/`
- CMS: no CMS detected in the repository
- Database: none detected in the app code
- APIs: `POST /api/project-enquiry` sends emails through Resend
- Forms: homepage enquiry form and WhatsApp CTA
- Analytics/tracking: Google Analytics via `G-6FX0L2L9GN`; Vercel Analytics via `track()` calls
- Images: remote image URLs from a public blob; no local image optimization pipeline evident
- Fonts: no custom font loading detected; system font stack is used
- Hosting/deployment: likely Vercel given Next.js and Vercel analytics; no explicit deployment config found in repo beyond Next config and build scripts
- SEO config: `app/robots.ts`, `app/sitemap.ts`, metadata in `app/layout.tsx` and slug pages
- Redirects: `app/website-design-gauteng/route.ts` redirects to `/web-design-johannesburg` with a 301
- Security headers: configured in `next.config.mjs`
- Error handling: default Next.js error boundary; no custom 404/500 pages found

## Public routes and pages

| Path | Purpose | Evidence | Status |
|---|---|---|---|
| `/` | Main homepage / conversion landing page | `app/page.tsx` main hero, services, pricing, about, CTA | Verified |
| `/web-design-south-africa` | Service landing page | `app/[slug]/page.tsx` `pages` map | Verified |
| `/web-design-johannesburg` | Local service page | `app/[slug]/page.tsx` `pages` map | Verified |
| `/website-design-gauteng` | Redirect route | `app/website-design-gauteng/route.ts` redirects 301 to `/web-design-johannesburg` | Verified |
| `/web-development-johannesburg` | Service landing page | `app/[slug]/page.tsx` map | Verified |
| `/ecommerce-website-design-south-africa` | Service landing page | `app/[slug]/page.tsx` map | Verified |
| `/website-hosting-south-africa` | Hosting landing page | `app/[slug]/page.tsx` map | Verified |
| `/website-maintenance` | Maintenance/support landing page | `app/[slug]/page.tsx` map | Verified |
| `/seo-web-design` | SEO landing page | `app/[slug]/page.tsx` map | Verified |
| `/pricing` | Pricing page | `app/[slug]/page.tsx` map | Verified |
| `/work` | Portfolio/case-study listing page | `app/[slug]/page.tsx` map | Verified |
| `/about` | Company page | `app/[slug]/page.tsx` map | Verified |
| `/insights` | Insights index page | `app/insights/page.tsx` | Verified |
| `/insights/[slug]` | Individual insight article | `app/insights/[slug]/page.tsx` | Verified |
| `/sitemap.xml` | Generated sitemap | `app/sitemap.ts` | Verified |
| `/robots.txt` | Generated robots | `app/robots.ts` | Verified |

## Page inventory notes
- The main homepage is the single strongest conversion page; the route-driven pages are mostly service-focused landing pages rather than full portfolio/case-study pages.
- `work` is present in the page map but appears more like an editorial project gallery than a comprehensive case-study archive. Public evidence is limited.
- The `insights` section currently has no `.mdx` files in `content/insights/` beyond a `.gitkeep`, so the insights index is effectively empty. This is confirmed by the list of files and by `getInsights()` returning `[]` when no MDX files are present.
- There is a redirect route at `/website-design-gauteng` that points to a different service page, creating a likely route split/composition issue.

## Duplicate, orphan, or dead routes
- Duplicate/competing local service language: `web-design-south-africa`, `web-design-johannesburg`, and `website-design-gauteng` all cover similar positioning with overlapping audience segments.
- Orphan/unfinished: `work` and `insights` exist as routes but do not yet have strong supporting content beyond static placeholders and a pattern page.
- Dead route risk: if no content exists for a slug, the dynamic route returns `null` and therefore serves a blank page. This is possible for any unrecognized slug and should be validated in production.

## Missing metadata or content quality issues
- The homepage is strong on marketing copy but light on proof and measurable outcomes.
- The `work` route is present, but the evidence for case studies is thin; the homepage itself says “Detailed client case studies and project outcomes will be added when the relevant information is available.”
- The `insights` section is empty in the repo and likely empty in production until content is added.
