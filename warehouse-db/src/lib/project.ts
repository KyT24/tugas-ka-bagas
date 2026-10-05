const USERNAME = 'your-github-username'

export type Project = {
  name: string
  description: string | null
  html_url: string
  language: string | null
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=12`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) {
    return []
  }
  return res.json()
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const res = await fetch(`https://api.github.com/repos/${USERNAME}/${slug}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) {
    return null
  }
  return res.json()
}