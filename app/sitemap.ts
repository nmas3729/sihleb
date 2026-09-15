import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sihleb.co.za',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}