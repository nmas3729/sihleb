import fs from 'node:fs'
import path from 'node:path'

const insightsDirectory = path.join(process.cwd(), 'content/insights')

export type Insight = {
  slug: string
  title: string
  description: string
  date: string
  excerpt: string
  body: string
}

function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { fields: {}, body: source }

  const fields = Object.fromEntries(match[1].split('\n').flatMap(line => {
    const separator = line.indexOf(':')
    if (separator === -1) return []
    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '')
    return [[key, value]]
  }))

  return { fields, body: match[2].trim() }
}

export function getInsights(): Insight[] {
  if (!fs.existsSync(insightsDirectory)) return []

  return fs.readdirSync(insightsDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const source = fs.readFileSync(path.join(insightsDirectory, file), 'utf8')
      const { fields, body } = parseFrontmatter(source)
      const slug = file.replace(/\.mdx$/, '')
      return {
        slug,
        title: fields.title || slug,
        description: fields.description || '',
        date: fields.date || '',
        excerpt: fields.excerpt || fields.description || '',
        body,
      }
    })
    .filter(insight => insight.title && insight.description && insight.date)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getInsight(slug: string) {
  return getInsights().find(insight => insight.slug === slug)
}
