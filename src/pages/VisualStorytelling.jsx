import { visualStorytelling } from '../lib/projects'
import PageLayout from '../components/PageLayout'
import CapabilityGrid from '../components/CapabilityGrid'

export default function VisualStorytelling() {
  return (
    <PageLayout
      title="Visual Storytelling"
      intro="Narrative-first visuals—photo, video, and mixed media that tell the story at a glance."
    >
      <CapabilityGrid items={visualStorytelling} regionId="vs-bento-region" />
    </PageLayout>
  )
}
