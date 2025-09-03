import PageLayout from '../components/PageLayout'
import ProjectGrid from '../components/ProjectGrid'
import ProjectCard from '../components/ProjectCard'
import { webMobile } from '../lib/projects'

export default function WebMobile() {
  return (
    <PageLayout
      title="Web & Mobile App"
      intro="Interfaces inspired by retro OS vibes—modern UX, responsive UI, and smooth interactions."
    >
      <ProjectGrid>
        {webMobile.map(p => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </ProjectGrid>
    </PageLayout>
  )
}