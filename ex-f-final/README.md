# Personal Website – Rendering & SEO Refactor

## 1. Description & Tech Stack
Refactored my React (Vite) personal site into Next.js App Router with
SSG, ISR and CSR, semantic URLs, metadata, and Open Graph.
Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4, DaisyUI,
React Hook Form, Zod, React Toastify.

## 2. Run Locally
npm install
npm run build && npm run dev

## 3. Rendering Strategy
| Page | Strategy | Justification |
|---|---|---|
| / | SSG | Static content |
| /portfolio | ISR (1 hour) | External API data that changes slowly |
| /portfolio/[slug] | SSG (generateStaticParams) | Pre-built per project |
| /contact | SSG + CSR form | Page is static, form needs state |

## 4. Build Output
(screenshot of npm run build)

## 5. SEO Implementation
- Semantic URLs: /portfolio/project-name
- Static metadata on /, /portfolio, /contact
- generateMetadata() on /portfolio/[slug]
- Open Graph and Twitter Card on every page
- sitemap.xml and robots.txt

## 6. Performance Audit
(Mobile and Desktop screenshots)
Optimizations: next/image with priority, next/font, isolated 'use client'.