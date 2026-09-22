export const siteUrl = 'https://sihleb.co.za'
export const siteName = 'SihleB Web Design + Hosting'
export const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SihleB-Logo-JpSPCq41GEy8rmSC4pNgsNT35LqblJ.jpeg'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: logoUrl,
  description: 'Web design, development, hosting and support for South African businesses.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Johannesburg',
    addressCountry: 'ZA',
  },
  areaServed: ['Johannesburg', 'Gauteng', 'South Africa'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@sihleb.co.za',
    availableLanguage: 'English',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'NMAS INNOVATIONS (Pty) Ltd',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  inLanguage: 'en-ZA',
  publisher: { '@id': `${siteUrl}/#organization` },
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }
}

export function serviceSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: name,
    description,
    url: `${siteUrl}${path}`,
    provider: { '@id': `${siteUrl}/#organization` },
    areaServed: ['Johannesburg', 'Gauteng', 'South Africa'],
  }
}
