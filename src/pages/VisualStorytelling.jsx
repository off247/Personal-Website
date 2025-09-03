import PageLayout from '../components/PageLayout'
import ProjectGrid from '../components/ProjectGrid'
import ProjectCard from '../components/ProjectCard'
import { visualStorytelling } from '../lib/projects'

export default function VisualStorytelling() {
  return (
    <PageLayout
      title="Visual Storytelling"
      intro="Narratives that feel tactile and personal—short-form docs, photo essays, and motion pieces."
    >
      <ProjectGrid>
        {visualStorytelling.map(p => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </ProjectGrid>
    </PageLayout>
  )
}