import PageLayout from '../components/PageLayout'
import CapabilityGrid from '../components/CapabilityGrid'
import { webMobile } from '../lib/projects'

export default function WebMobile() {
  return (
    <PageLayout
      title="Web & Mobile"
      intro="UX/UI and front‑end builds—sites, prototypes, and apps."
    >
      <CapabilityGrid items={webMobile} regionId="wm-bento-region" />
    </PageLayout>
  )
}
