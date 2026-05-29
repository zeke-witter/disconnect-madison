import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/verify', '/add-news', '/login', '/style-guide'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
