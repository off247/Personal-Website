import PageLayout from '../components/PageLayout'
import ProjectGrid from '../components/ProjectGrid'
import ProjectCard from '../components/ProjectCard'
import { experiential } from '../lib/projects'

export default function ExperientialDesign() {
  return (
    <PageLayout
      title="Experiential Design"
      intro="Physical-digital moments—installs, wayfinding, and in-venue motion that moves people."
    >
      <ProjectGrid>
        {experiential.map(p => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </ProjectGrid>
    </PageLayout>
  )
}