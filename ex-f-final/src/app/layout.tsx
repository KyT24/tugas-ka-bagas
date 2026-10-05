import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/src/components/Navbar'
import ToastProvider from '@/src/components/ToastProvider'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://your-site.vercel.app'),
  title: {
    default: 'Hadev KyTra | Full-Stack Web Developer',
    template: '%s | Hadev KyTra',
  },
  description:
    'Building scalable and high-performance web solutions for your business needs.',
  keywords: ['full-stack developer', 'web developer', 'Next.js', 'React'],
  openGraph: {
    type: 'website',
    siteName: 'Hadev KyTra',
    title: 'Hadev KyTra | Full-Stack Web Developer',
    description: 'Building scalable and high-performance web solutions.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hadev KyTra | Full-Stack Web Developer',
    description: 'Building scalable and high-performance web solutions.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} root-shell bg-ink text-text`}>
        <Navbar />
        <main>{children}</main>
        <ToastProvider />
      </body>
    </html>
  )
}