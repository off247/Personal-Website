import PageLayout from '../components/PageLayout'
import CapabilityGrid from '../components/CapabilityGrid'
import { socialMedia } from '../lib/projects'

export default function SocialMedia() {
  return (
    <PageLayout
      title="Social Media"
      intro="Platform-native creative—motion, UGC, and campaigns designed to convert and delight."
    >
      <CapabilityGrid items={socialMedia} regionId="sm-bento-region" />
    </PageLayout>
  )
}
