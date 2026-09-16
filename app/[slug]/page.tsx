import type { Metadata } from 'next'
import Link from 'next/link'

const pages = {
  'web-design-south-africa': {
    title: 'Web Design South Africa | SihleB',
    description: 'Premium web design for South African businesses that want to look credible, get found and generate better enquiries.',
    eyebrow: 'WEB DESIGN / SOUTH AFRICA',
    heading: 'Web design that earns its place in the business.',
    intro: 'SihleB designs and builds high-quality websites for South African businesses that need more than an online brochure. We create a clearer path from first impression to enquiry, then keep the website supported after launch.',
    points: ['Clearer positioning and page structure', 'Responsive, maintainable development', 'Technical SEO foundations', 'Hosting and human support after launch'],
    related: ['web-design-johannesburg', 'pricing', 'website-maintenance'],
  },
  'web-design-johannesburg': {
    title: 'Web Design Johannesburg | SihleB',
    description: 'Web design for Johannesburg businesses that need a credible, search-ready website and a reliable partner after launch.',
    eyebrow: 'WEB DESIGN / JOHANNESBURG',
    heading: 'A better digital first impression for Johannesburg businesses.',
    intro: 'SihleB helps Johannesburg and Gauteng businesses turn an unclear or outdated website into a more credible, useful and enquiry-focused business asset. We work directly with you from planning through hosting and support.',
    points: ['Designed for professional services and growing brands', 'Mobile-first customer journeys', 'Local SEO-ready structure', 'One team from design to support'],
    related: ['web-design-south-africa', 'website-design-gauteng', 'pricing'],
  },
  'website-design-gauteng': {
    title: 'Website Design Gauteng | SihleB',
    description: 'Thoughtful website design for Gauteng businesses, with development, SEO foundations, hosting and ongoing support.',
    eyebrow: 'WEBSITE DESIGN / GAUTENG',
    heading: 'Websites for businesses ready for their next stage.',
    intro: 'Your website should make it easier for the right customers to understand, trust and contact your business. SihleB combines design, development and practical support for Gauteng businesses that want a dependable online presence.',
    points: ['Business-first content structure', 'Conversion-focused calls to action', 'Technical SEO foundations', 'Transparent starting points'],
    related: ['web-design-johannesburg', 'web-development-johannesburg', 'website-hosting-south-africa'],
  },
  'web-development-johannesburg': {
    title: 'Web Development Johannesburg | SihleB',
    description: 'Fast, maintainable web development for Johannesburg businesses that need a dependable website underneath the design.',
    eyebrow: 'WEB DEVELOPMENT / JOHANNESBURG',
    heading: 'A dependable build underneath the design.',
    intro: 'SihleB develops responsive, maintainable websites with the performance, structure and integrations your business needs. We keep the technology practical, so the website remains useful after launch rather than becoming another system to manage.',
    points: ['Responsive front-end development', 'Forms, analytics and useful integrations', 'Performance-minded implementation', 'Hosting, maintenance and support'],
    related: ['web-design-johannesburg', 'ecommerce-website-design-south-africa', 'website-maintenance'],
  },
  'ecommerce-website-design-south-africa': {
    title: 'Ecommerce Website Design South Africa | SihleB',
    description: 'Ecommerce website design for South African businesses that want a clearer path from product discovery to purchase.',
    eyebrow: 'E-COMMERCE / SOUTH AFRICA',
    heading: 'An online store built around how customers buy.',
    intro: 'SihleB creates ecommerce experiences that make products easier to discover, understand and purchase. We focus on useful structure, mobile experience, trust and the operational details that make a store work beyond launch.',
    points: ['Product and category structure', 'Mobile-first buying journeys', 'Payment and enquiry pathways', 'Ongoing support and improvement'],
    related: ['web-development-johannesburg', 'seo-web-design', 'pricing'],
  },
  'website-hosting-south-africa': {
    title: 'Website Hosting South Africa | SihleB',
    description: 'Reliable website hosting in South Africa with SSL, backups, security monitoring and human support.',
    eyebrow: 'HOSTING / SOUTH AFRICA',
    heading: 'A better home for your website.',
    intro: 'Hosting should remove technical worry, not add another dashboard to manage. SihleB provides reliable hosting with SSL, backups, security monitoring and a direct support relationship.',
    points: ['Hosting from R250/month', 'SSL and regular backups', 'Security monitoring', 'Human support when something changes'],
    related: ['website-maintenance', 'pricing', 'web-design-south-africa'],
  },
  'website-maintenance': {
    title: 'Website Maintenance and Support | SihleB',
    description: 'Website maintenance, updates, monitoring and support for South African businesses that want their website looked after properly.',
    eyebrow: 'WEBSITE CARE / SOUTH AFRICA',
    heading: 'Keep the website useful after launch.',
    intro: 'A website is not finished when it goes live. SihleB helps businesses keep their website secure, current and useful with hosting, monitoring, updates and practical support plans.',
    points: ['Website Care from R450/month', 'Updates and minor content changes', 'Form and broken-link checks', 'Priority support on higher tiers'],
    related: ['website-hosting-south-africa', 'seo-web-design', 'pricing'],
  },
  'seo-web-design': {
    title: 'SEO Web Design South Africa | SihleB',
    description: 'SEO-aware website design for South African businesses that want a stronger foundation for organic visibility and enquiries.',
    eyebrow: 'SEO FOUNDATIONS / SOUTH AFRICA',
    heading: 'Build a website search engines and customers can understand.',
    intro: 'SEO is not a checkbox added after the design. SihleB builds clear page structures, useful content pathways, technical foundations and calls to action that support both search visibility and human decisions.',
    points: ['Search-focused information architecture', 'Technical SEO foundations', 'Local and service-page structure', 'Analytics and lead tracking'],
    related: ['web-design-south-africa', 'web-design-johannesburg', 'website-maintenance'],
  },
  pricing: {
    title: 'Website Design Pricing South Africa | SihleB',
    description: 'Clear starting points for SihleB website design, development, ecommerce, hosting and ongoing support.',
    eyebrow: 'PRICING / SOUTH AFRICA',
    heading: 'A clear starting point for the next stage of your business.',
    intro: 'SihleB projects start from R9,500 for a focused business website. Larger websites, ecommerce, integrations and strategy are quoted according to scope. Every project has an agreed scope, milestones and launch process.',
    points: ['Launch from R9,500', 'Growth from R18,500', 'Signature from R32,000', 'Hosting from R250/month'],
    related: ['web-design-south-africa', 'website-maintenance', 'web-development-johannesburg'],
  },
  work: {
    title: 'Website Design Portfolio and Case Studies | SihleB',
    description: 'Explore SihleB website design directions and follow the work as client case studies are published with permission.',
    eyebrow: 'SELECTED WORK / SIHLEB',
    heading: 'Work built around the business behind it.',
    intro: 'Every project starts with a different problem. A new business needs credibility. An established brand needs clarity. A growing company needs a website that can turn attention into action. Client case studies are published with permission as projects launch.',
    points: ['Strategy and content structure', 'Visual direction and UX', 'Development and launch', 'Hosting and ongoing support'],
    related: ['pricing', 'web-design-south-africa', 'website-maintenance'],
  },
  about: {
    title: 'About SihleB | Web Design and Hosting South Africa',
    description: 'Meet SihleB, the web design and hosting division of NMAS INNOVATIONS (Pty) Ltd.',
    eyebrow: 'ABOUT / SIHLEB',
    heading: 'A capable web partner, without the agency layers.',
    intro: 'SihleB is the web design and hosting division of NMAS INNOVATIONS (Pty) Ltd. We work directly with businesses that want thoughtful design, dependable technology and a straightforward relationship after launch.',
    points: ['Direct communication', 'Premium, practical design', 'Dependable technology', 'One point of contact after launch'],
    related: ['web-design-south-africa', 'pricing', 'website-maintenance'],
  },
  insights: {
    title: 'Website, SEO and Conversion Insights | SihleB',
    description: 'Practical insights on website design, SEO foundations, conversion and website care for South African businesses.',
    eyebrow: 'INSIGHTS / SIHLEB',
    heading: 'Useful thinking for better websites.',
    intro: 'SihleB shares practical guidance on website design, search visibility, conversion and the decisions that make a website more useful to a business. New articles will be added as they are prepared.',
    points: ['Website cost and scope', 'Local SEO and search structure', 'Conversion-focused website planning', 'Hosting and maintenance decisions'],
    related: ['pricing', 'seo-web-design', 'website-maintenance'],
  },
} as const

type Slug = keyof typeof pages

export function generateStaticParams() {
  return Object.keys(pages).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = pages[slug as Slug]
  return page ? { title: page.title, description: page.description, alternates: { canonical: `/${slug}` } } : {}
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = pages[slug as Slug]
  if (!page) return null

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'SihleB', item: 'https://sihleb.co.za' }, { '@type': 'ListItem', position: 2, name: page.title, item: `https://sihleb.co.za/${slug}` }] },
      { '@type': 'Service', name: page.title, description: page.description, provider: { '@type': 'Organization', name: 'SihleB Web Design + Hosting', url: 'https://sihleb.co.za' }, areaServed: 'ZA', url: `https://sihleb.co.za/${slug}` },
    ],
  }

  return <main className="landing-page dark-section">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <nav className="landing-nav" aria-label="Primary navigation"><Link href="/" className="landing-brand">SB / SIHLEB</Link><div><Link href="/web-design-south-africa">Services</Link><Link href="/pricing">Pricing</Link><Link href="/work">Work</Link><Link href="/#contact" className="landing-cta">START A PROJECT</Link></div></nav>
    <section className="landing-hero"><div className="section-kicker">[ {page.eyebrow} ]</div><h1>{page.heading}</h1><p>{page.intro}</p><div className="landing-actions"><Link href="/#contact" className="button button-blue">PLAN MY WEBSITE</Link><Link href="/pricing" className="landing-text-link">VIEW PRICING</Link></div></section>
    <section className="landing-content"><div className="section-kicker">[ WHAT THIS INCLUDES ]</div><div className="landing-points">{page.points.map((point, index) => <div key={point}><span>0{index + 1}</span><h2>{point}</h2></div>)}</div><div className="landing-related"><strong>Continue exploring</strong>{page.related.map(related => <Link key={related} href={`/${related}`}>{pages[related as Slug].title}</Link>)}</div></section>
    <section className="landing-footer"><div><div className="section-kicker">[ READY WHEN YOU ARE ]</div><h2>Make the website easier to choose.</h2><p>Tell us what you are building and where you want the business to go next.</p></div><Link href="/#contact" className="button button-blue">START A PROJECT</Link></section>
  </main>
}
