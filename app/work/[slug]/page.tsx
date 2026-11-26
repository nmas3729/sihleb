import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type CaseStudy = {
  title: string
  slug: string
  client: string
  problem: string
  solution: string
  result: string
  consent: boolean
}

const caseStudiesDirectory = path.join(process.cwd(), 'content/case-studies')

function getPublishedCaseStudies(): CaseStudy[] {
  return readdirSync(caseStudiesDirectory)
    .filter(file => file.endsWith('.json'))
    .map(file => JSON.parse(readFileSync(path.join(caseStudiesDirectory, file), 'utf8')) as CaseStudy)
    .filter(
      caseStudy =>
        caseStudy.consent &&
        typeof caseStudy.result === 'string' &&
        caseStudy.result.trim().length > 0,
    )
}

export function generateStaticParams() {
  return getPublishedCaseStudies().map(({ slug }) => ({ slug }))
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const caseStudy = getPublishedCaseStudies().find(item => item.slug === slug)

  if (!caseStudy) notFound()

  return (
    <main className="landing-page dark-section">
      <nav className="landing-nav" aria-label="Primary navigation">
        <Link href="/" className="landing-brand">SB / SIHLEB</Link>
        <div>
          <Link href="/work">Work</Link>
          <Link href="/#contact" className="landing-cta">START A PROJECT</Link>
        </div>
      </nav>
      <article>
        <header className="landing-hero">
          <div className="section-kicker">[ CASE STUDY / {caseStudy.client} ]</div>
          <h1>{caseStudy.title}</h1>
        </header>
        <div className="landing-content">
          <section>
            <div className="section-kicker">[ THE CHALLENGE ]</div>
            <p>{caseStudy.problem}</p>
          </section>
          <section>
            <div className="section-kicker">[ THE SOLUTION ]</div>
            <p>{caseStudy.solution}</p>
          </section>
          <section>
            <div className="section-kicker">[ THE RESULT ]</div>
            <p>{caseStudy.result}</p>
          </section>
        </div>
      </article>
    </main>
  )
}
