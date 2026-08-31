import { useState } from 'react'
import PageLayout from '../../components/PageLayout'
import { withBase } from '../../lib/paths'
import { getWorkProjectBySlug } from '../../lib/workProjects'

export default function StudentExperienceVideoSeries() {
  const project = getWorkProjectBySlug('student-experience-video-series')
  const [isMuted, setIsMuted] = useState(true)

  if (!project) {
    return (
      <PageLayout title="Project not found" intro="The project you're looking for isn't available yet.">
        <p className="text-base text-gray-600 dark:text-gray-300">
          Double-check the link or reach out if you need something specific.
        </p>
      </PageLayout>
    )
  }

  const { title, description, capability } = project
  const summary = description || 'Detailed case study coming soon.'
  const videos = [
    {
      id: 1,
      src: '/assets/capabilities/work/sarah_munns.mp4'
    },
    {
      id: 2,
      src: '/assets/capabilities/work/sarah_munns.mp4'
    },
    {
      id: 3,
      src: '/assets/capabilities/work/sarah_munns.mp4'
    }
  ]

  return (
    <PageLayout title={title} intro={summary}>
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <p className="text-base leading-7">
          Built around a sit-down student interview, these videos combine authentic student perspective through interview footage and contextual campus b-roll to illustrate day-to-day life and personal growth. The edits focus on natural pacing, clean audio, and subtle transitions to keep the student's voice at the center while reinforcing a welcoming campus experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {videos.map((video) => (
            <div
              key={video.id}
              className="w-full"
            >
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 relative">
                <video
                  src={withBase(video.src)}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-auto"
                  controls={!isMuted}
                >
                  Your browser does not support the video tag.
                </video>

                {isMuted && (
                  <button
                    onClick={() => setIsMuted(false)}
                    className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/60 text-white text-sm px-4 py-2 backdrop-blur hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-colors"
                    aria-label="Unmute video"
                  >
                    <span aria-hidden>🔊</span>
                    <span>Unmute</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Part of the {capability.toLowerCase()} capability.
        </p>
      </div>
    </PageLayout>
  )
}
