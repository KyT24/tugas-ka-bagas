import Link from 'next/link'

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-extrabold">Hi, I'm Hadev</h1>
      <p className="mt-6 max-w-md text-text-muted">
        I build websites and web apps. Take a look at my work or get in touch.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/portfolio"
          className="rounded-md border border-gold px-6 py-3 font-semibold text-gold"
        >
          View Portfolio
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-border px-6 py-3 font-semibold"
        >
          Contact Me
        </Link>
      </div>
    </section>
  )
}