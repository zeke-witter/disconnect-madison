import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  return [
    // Core CTAs
    { url: baseUrl,                                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/pledge`,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/quiz`,                        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },

    // Learn hub + sub-pages
    { url: `${baseUrl}/learn`,                       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/learn/kids`,                  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/learn/depression`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/learn/attention`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/learn/sleep`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/learn/body-image`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/learn/dependency`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/learn/ecological-impact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // Guides
    { url: `${baseUrl}/help-yourself`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/before-you-go`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/breathe`,                     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },

    // Community / info
    { url: `${baseUrl}/about`,                       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/grow`,                        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/grow/flyer-locations`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/faq`,                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/news`,                        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${baseUrl}/sources`,                     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`,                     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
  ]
}
