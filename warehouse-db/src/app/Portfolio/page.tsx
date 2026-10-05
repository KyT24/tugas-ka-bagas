import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjects, getProjectBySlug } from '@/src/lib/project'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const projects = await getProjects()
  const list = []
  for (let i = 0; i < projects.length; i++) {
    list.push({ slug: projects[i].name })
  }
  return list
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return { title: 'Project not found' }
  }

  const description = project.description || `Project ${project.name}`
  return {
    title: project.name,
    description: description,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: `${project.name} | Hadev KyTra`,
      description: description,
      url: `/portfolio/${slug}`,
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description: description,
      images: ['/og-image.png'],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-extrabold">{project.name}</h1>
      <p className="mt-4 text-text-muted">{project.description}</p>
      <p className="mt-2 text-sm">Language: {project.language}</p>
      <a href={project.html_url} className="mt-6 inline-block text-gold">
        View on GitHub
      </a>
    </section>
  )
}