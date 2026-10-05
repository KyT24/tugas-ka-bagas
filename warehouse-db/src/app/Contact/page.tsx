import type { Metadata } from 'next'
import ContactForm from '@/src/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Hadev KyTra.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Hadev KyTra',
    description: 'Get in touch with Hadev KyTra.',
    url: '/contact',
    images: ['/og-image.png'],
  },
}

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-extrabold">Contact</h1>
      <ContactForm />
    </section>
  )
}