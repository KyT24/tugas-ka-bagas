import Link from 'next/link'

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-text">
          <span className="text-gold">Home</span>
        </Link>

        <ul className="hidden gap-8 text-sm font-medium text-text-muted md:flex">
          <li>
            <Link href="/portfolio" className="transition-colors hover:text-gold">
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="/contact" className="transition-colors hover:text-gold">
              Contact
            </Link>
          </li>
        </ul>

        <Link
          href="/contact"
          className="rounded-md border border-gold px-4 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Resume
        </Link>
      </nav>
    </header>
  )
}

export default Navbar