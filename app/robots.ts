import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://timewipe.com'}/sitemap.xml`,
  }
}

