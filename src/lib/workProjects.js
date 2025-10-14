import { capabilities } from './projects'

const slugMap = {
  'Client Presentation Decks': 'client-presentation-decks',
  'Marketing & Event Photography': 'marketing-event-photography',
  'Student Experience Video Series': 'student-experience-video-series',
  'Cinematic Wedding Videos': 'cinematic-wedding-videos',
  'Short-Form Video Editing': 'short-form-video-editing',
  'Real-Time Highlight Clipping': 'real-time-highlight-clipping',
  'Game Day & Marketing Graphics': 'game-day-marketing-graphics',
  'In-App Fan Engagement Experience Design': 'in-app-fan-engagement',
  'Custom Fan Wallpapers': 'custom-fan-wallpapers',
  'Email Marketing for Live Events': 'email-marketing-for-live-events',
  'Resource Hub Webpage': 'resource-hub-webpage',
  'Single-Game Promotions Page': 'single-game-promotions-page',
  'Branded Wall Installation': 'branded-wall-installation',
  'In-Store Wayfinding Signage': 'wayfinding-signage'
}

const fallbackSlugify = (title) =>
  title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '')

const makeSlug = (title) => {
  const key = title?.trim()
  if (!key) return ''
  return slugMap[key] ?? fallbackSlugify(key)
}

export const workProjects = capabilities.flatMap((capability) => {
  const slides = capability.slides ?? []
  return slides
    .filter((slide) => slide.caseStudy !== false)
    .map((slide) => {
      const slug = makeSlug(slide.title)
      return {
        capability: capability.title,
        category: capability.category,
        slug,
        path: `/work/${slug}`,
        title: slide.title,
        description: slide.description || '',
        image: slide.image || slide.cover || null,
        cover: slide.cover || slide.image || null,
      }
    })
})

const bySlug = new Map(workProjects.map((project) => [project.slug, project]))
const byTitle = new Map(workProjects.map((project) => [project.title, project]))

export const getWorkProjectBySlug = (slug) => (slug ? bySlug.get(slug) : undefined)
export const getWorkProjectByTitle = (title) => (title ? byTitle.get(title) : undefined)
export const getWorkProjectPath = (identifier) => {
  if (!identifier) return undefined
  const project = bySlug.get(identifier) ?? byTitle.get(identifier)
  return project?.path
}
export const allWorkProjectSlugs = workProjects.map((project) => project.slug)
