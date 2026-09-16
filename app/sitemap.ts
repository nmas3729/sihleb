import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', 'web-design-south-africa', 'web-design-johannesburg', 'website-design-gauteng', 'web-development-johannesburg', 'ecommerce-website-design-south-africa', 'website-hosting-south-africa', 'website-maintenance', 'seo-web-design', 'pricing', 'work', 'about', 'insights']
  return routes.map((route, index) => ({
    url: `https://sihleb.co.za/${route}`,
    changeFrequency: 'monthly' as const,
    priority: index === 0 ? 1 : 0.7,
  }))
}