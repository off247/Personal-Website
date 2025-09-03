import PageLayout from '../components/PageLayout'
import ProjectGrid from '../components/ProjectGrid'
import ProjectCard from '../components/ProjectCard'
import { socialMedia } from '../lib/projects'

export default function SocialMedia() {
  return (
    <PageLayout
      title="Social Media"
      intro="Platform-native creative—motion, UGC, and campaigns designed to convert and delight."
    >
      <ProjectGrid>
        {socialMedia.map(p => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </ProjectGrid>
    </PageLayout>
  )
}