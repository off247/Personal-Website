import PageLayout from './PageLayout'
import { withBase } from '../lib/paths'
import { getWorkProjectBySlug } from '../lib/workProjects'

export default function WorkProjectTemplate({ slug }) {
  const project = getWorkProjectBySlug(slug)

  if (!project) {
    return (
      <PageLayout title="Project not found" intro="The project you're looking for isn't available yet.">
        <p className="text-base text-gray-600 dark:text-gray-300">
          Double-check the link or reach out if you need something specific.
        </p>
      </PageLayout>
    )
  }

  const { title, description, image, video, capability } = project
  const summary = description || 'Detailed case study coming soon.'

  return (
    <PageLayout title={title} intro={summary}>
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <p className="text-base leading-7">
          Full case study in progress—get in touch if you'd like a deeper walkthrough or supporting materials.
        </p>
        {video && (
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <video
              src={withBase(video)}
              controls
              className="w-full h-auto"
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {image && !video && (
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <img src={withBase(image)} alt={title} className="w-full h-auto object-cover" loading="lazy" />
          </div>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Part of the {capability.toLowerCase()} capability.
        </p>
      </div>
    </PageLayout>
  )
}
