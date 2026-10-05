import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://your-site.vercel.app'
  return [
    { url: base },
    { url: `${base}/portfolio` },
    { url: `${base}/contact` },
  ]
}