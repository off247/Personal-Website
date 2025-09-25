import PageLayout from '../components/PageLayout'
import CapabilityGrid from '../components/CapabilityGrid'
import { experiential } from '../lib/projects'

export default function ExperientialDesign() {
  return (
    <PageLayout
      title="Experiential Design"
      intro="Physical-digital moments—installs, wayfinding, and in-venue motion that moves people."
    >
      <CapabilityGrid items={experiential} regionId="ex-bento-region" />
    </PageLayout>
  )
}
