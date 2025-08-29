import RotatingText from '../components/RotatingText'

export default function HomeSection() {
  return (
    <section id="home" className="relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          grace catherine homer
          <br />
          <RotatingText texts={['creative', 'thoughtful', 'curious',  'innovative']} interval={1200} finalDelay={1200} />
          <br />
          designer
        </h1>
      </div>
    </section>
  )
}