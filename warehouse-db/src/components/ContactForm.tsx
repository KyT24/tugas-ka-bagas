'use client'

import { useState, type FormEvent } from 'react'
import { toast } from 'react-toastify'
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa6'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (!name || !email || !message) {
      toast.error('Please fill in every field.')
      return
    }

    toast.success("Message sent — thanks for reaching out!")
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="section-heading text-3xl font-extrabold">Contact</h1>
      <p className="mt-6 max-w-md text-text-muted">
        Have a project in mind or just want to say hello? Fill out the form
        below or reach out directly.
      </p>

      <div className="mt-10 grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-text-muted">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-md border border-border bg-panel-soft px-4 py-3 text-text outline-none focus:border-gold"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-border bg-panel-soft px-4 py-3 text-text outline-none focus:border-gold"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm text-text-muted">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full resize-none rounded-md border border-border bg-panel-soft px-4 py-3 text-text outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-fit rounded-md border border-gold px-6 py-3 font-semibold text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Send Message
          </button>
        </form>

        <div className="flex flex-col gap-4">
          <a
            href="mailto:hello@example.com"
            className="flex items-center gap-3 text-text-muted transition-colors hover:text-gold"
          >
            <FaEnvelope size={18} />
            hello@example.com
          </a>
          <a
            href="https://github.com/"
            className="flex items-center gap-3 text-text-muted transition-colors hover:text-gold"
          >
            <FaGithub size={18} />
            github.com/yourusername
          </a>
          <a
            href="https://linkedin.com/"
            className="flex items-center gap-3 text-text-muted transition-colors hover:text-gold"
          >
            <FaLinkedinIn size={18} />
            linkedin.com/in/yourusername
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact