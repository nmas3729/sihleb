import type { Metadata } from 'next'
import Link from 'next/link'
import type { ComponentType } from 'react'
import { notFound } from 'next/navigation'
import { Schema } from '@/components/Schema'
import { breadcrumbSchema, siteName, siteUrl } from '@/lib/seo'
import { getInsight, getInsights } from '@/lib/insights'

type InsightModule = { default: ComponentType }
type ContextRequire = { context: (directory: string, recursive: boolean, pattern: RegExp) => (request: string) => InsightModule }
const insightModules = (require as typeof require & ContextRequire).context('../../../content/insights', false, /\.mdx$/)

async function loadInsightContent(slug: string) {
  try {
    return insightModules(`./${slug}.mdx`).default
  } catch {
    notFound()
  }
}

export function generateStaticParams() {
  return getInsights().map(insight => ({ slug: insight.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const insight = getInsight(slug)
  if (!insight) return {}

  return {
    title: `${insight.title} | SihleB Insights`,
    description: insight.description,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: `${insight.title} | SihleB Insights`,
      description: insight.description,
      type: 'article',
      url: `${siteUrl}/insights/${slug}`,
      siteName,
      locale: 'en_ZA',
      publishedTime: insight.date,
      images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: 'SihleB Web Design + Hosting' }],
    },
  }
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const insight = getInsight(slug)
  if (!insight) notFound()
  const Content = await loadInsightContent(slug)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title,
    description: insight.description,
    datePublished: insight.date,
    dateModified: insight.date,
    author: { '@type': 'Organization', name: siteName, url: siteUrl },
    publisher: { '@type': 'Organization', name: siteName, url: siteUrl },
    mainEntityOfPage: `${siteUrl}/insights/${slug}`,
  }

  return <main className="landing-page dark-section">
    <Schema data={[breadcrumbSchema([{ name: 'SihleB', path: '/' }, { name: 'Insights', path: '/insights' }, { name: insight.title, path: `/insights/${slug}` }]), articleSchema]} />
    <nav className="landing-nav" aria-label="Primary navigation"><Link href="/" className="landing-brand">SB / SIHLEB</Link><div><Link href="/web-design-south-africa">Services</Link><Link href="/pricing">Pricing</Link><Link href="/work">Work</Link><Link href="/about">About</Link></div></nav>
    <article className="landing-hero"><div className="section-kicker">[ INSIGHTS / {insight.date} ]</div><h1>{insight.title}</h1><p>{insight.description}</p><div className="landing-content"><Content /></div></article>
    <section className="landing-footer"><div><div className="section-kicker">[ PLAN YOUR NEXT STEP ]</div><h2>Ready to make the website work harder?</h2><p>Explore the available starting points or tell us what you are building.</p></div><div className="landing-actions"><Link href="/pricing" className="button button-blue">VIEW WEBSITE PRICING</Link><Link href="/#contact" className="landing-text-link">START A PROJECT</Link></div></section>
  </main>
}
