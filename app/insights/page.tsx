import type { Metadata } from 'next'
import Link from 'next/link'
import { Schema } from '@/components/Schema'
import { breadcrumbSchema, siteUrl } from '@/lib/seo'
import { getInsights } from '@/lib/insights'

export const metadata: Metadata = {
  title: 'Web Design Insights South Africa | SihleB',
  description: 'Practical web design insights for South African businesses, covering SEO, conversion, website care and useful digital decisions.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Web Design Insights South Africa | SihleB',
    description: 'Practical web design insights for South African businesses, covering SEO, conversion, website care and useful digital decisions.',
    type: 'website',
    url: `${siteUrl}/insights`,
    siteName: 'SihleB Web Design + Hosting',
    locale: 'en_ZA',
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: 'SihleB Web Design + Hosting' }],
  },
}

export default function InsightsPage() {
  const insights = getInsights()

  return <main className="landing-page dark-section">
    <Schema data={breadcrumbSchema([{ name: 'SihleB', path: '/' }, { name: 'Insights', path: '/insights' }])} />
    <nav className="landing-nav" aria-label="Primary navigation"><Link href="/" className="landing-brand">SB / SIHLEB</Link><div><Link href="/web-design-south-africa">Services</Link><Link href="/pricing">Pricing</Link><Link href="/work">Work</Link><Link href="/about">About</Link></div></nav>
    <section className="landing-hero"><div className="section-kicker">[ INSIGHTS / SIHLEB ]</div><h1>Web design insights for South African businesses.</h1><p>Practical thinking on websites, search visibility, conversion and the decisions that make an online presence more useful.</p></section>
    <section className="landing-content"><div className="section-kicker">[ LATEST THINKING ]</div>{insights.length === 0 ? <p>No insights have been published yet.</p> : <div className="landing-points">{insights.map(insight => <article key={insight.slug}><span>{insight.date}</span><h2><Link href={`/insights/${insight.slug}`}>{insight.title}</Link></h2><p>{insight.excerpt}</p></article>)}</div>}</section>
    <section className="landing-footer"><div><div className="section-kicker">[ READY WHEN YOU ARE ]</div><h2>Make the website easier to choose.</h2><p>Tell us what you are building and where you want the business to go next.</p></div><Link href="/pricing" className="button button-blue">VIEW WEBSITE PRICING</Link></section>
  </main>
}
