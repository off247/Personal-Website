import { useState, useMemo, useRef, useEffect } from 'react'
import { withBase } from '../lib/paths'
import { capabilities as capabilityData } from '../lib/projects'

export default function ProjectsSection() {
  // One-page, expandable capabilities with inline carousel per capability
  const capabilityList = useMemo(() => capabilityData, [])

  // Which capability is expanded? -1 = none
  const [active, setActive] = useState(-1)
  // Track slide index per capability
  const [slideIndex, setSlideIndex] = useState(0)
  const activeSlides = useMemo(
    () => (active > -1 ? capabilityList[active].slides ?? [] : []),
    [active, capabilityList]
  )

  // Slide viewport refs and height state
  const viewportRef = useRef(null)
  const slideRefs = useRef([])
  const [viewportHeight, setViewportHeight] = useState(0)

  const measure = () => {
    const el = slideRefs.current[slideIndex]
    if (el) {
      const { height } = el.getBoundingClientRect()
      setViewportHeight(height)
    }
  }

  // Keep slideRefs length in sync with active slides
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, activeSlides.length)
  }, [activeSlides.length])

  // Measure on slide change / open-close
  useEffect(() => {
    measure()
  }, [slideIndex, active])

  // Keep viewport height in sync with dynamic content changes (e.g., font swaps, async assets)
  useEffect(() => {
    if (active < 0) {
      setViewportHeight(0)
      return
    }

    const current = slideRefs.current[slideIndex]
    if (!current) return

    if (typeof ResizeObserver === 'undefined') {
      const { height } = current.getBoundingClientRect()
      setViewportHeight((prev) => (Math.abs(prev - height) < 0.5 ? prev : height))
      return
    }

    let frameId = null
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      const { height } = entry.contentRect
      frameId = window.requestAnimationFrame(() => {
        setViewportHeight((prev) => (Math.abs(prev - height) < 0.5 ? prev : height))
      })
    })

    observer.observe(current)

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
      observer.disconnect()
    }
  }, [active, slideIndex])

  // Re-measure on window resize (orientation changes on mobile)
  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const handleToggle = (idx) => {
    setSlideIndex(0)
    setActive((prev) => (prev === idx ? -1 : idx))
  }

  const next = () => {
    if (!activeSlides.length) return
    setSlideIndex((i) => (i + 1) % activeSlides.length)
  }
  const prev = () => {
    if (!activeSlides.length) return
    setSlideIndex((i) => (i - 1 + activeSlides.length) % activeSlides.length)
  }

  return (
    <section
      id="projects"
      className="py-16 md:py-24 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-5xl font-bold">capabilities</h2>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {capabilityList.map((project, idx) => {
            const isOpen = active === idx
            return (
              <article
                key={project.title}
                className={`group relative border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-shadow ${
                  isOpen ? 'md:col-span-2 ring-1 ring-gray-900/10 dark:ring-white/10 shadow-lg' : ''
                }`}
                aria-label={`${project.title} — ${project.category}`}
              >
                {/* Header (click target) */}
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/10 dark:focus-visible:ring-gray-100/10"
                >
                  {/* Banner transforms from thumbnail */}
                  <div className={`relative overflow-hidden ${isOpen ? 'aspect-[21/9]' : 'aspect-[16/10]'} bg-gray-100 dark:bg-gray-800`}>
                    <img
                      src={withBase(project.image)}
                      alt={project.title}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isOpen ? 'scale-105' : 'scale-100 group-hover:scale-[1.02]'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <p className="text-[11px] md:text-xs uppercase tracking-widest text-white/80">
                          {project.category}
                        </p>
                        <h3 className="text-lg md:text-2xl font-semibold text-white drop-shadow-sm">
                          {project.title}
                        </h3>
                      </div>
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-900 text-sm font-semibold transition-transform`}
                        aria-hidden
                      >
                        {isOpen ? '×' : '→'}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Expandable body */}
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden">
                    {/* Carousel */}
                    <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base md:text-lg font-semibold">Featured Work</h4>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={prev}
                            className="h-9 w-9 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                            aria-label="Previous"
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            onClick={next}
                            className="h-9 w-9 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                            aria-label="Next"
                          >
                            ›
                          </button>
                        </div>
                      </div>

                      {/* Slide viewport */}
                      <div
                        className="relative"
                        ref={viewportRef}
                        style={{ height: viewportHeight ? `${viewportHeight}px` : undefined }}
                      >
                        {activeSlides.map((s, i) => (
                          <div
                            key={s.title + i}
                            className={`absolute inset-0 transition-opacity duration-300 ${
                              i === slideIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                            aria-hidden={i !== slideIndex}
                          >
                            <div
                              ref={(el) => {
                                slideRefs.current[i] = el
                              }}
                              className="grid md:grid-cols-5 gap-4 md:gap-6 items-stretch"
                            >
                              <div className="md:col-span-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[16/10]">
                                <img
                                  src={withBase(s.image)}
                                  alt={s.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                  onLoad={measure}
                                />
                              </div>
                              <div className="md:col-span-2 flex flex-col">
                                <h5 className="text-lg font-semibold mb-2">{s.title}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {s.description}
                                </p>
                                {/* CTA row (optional) */}
                                <div className="mt-auto pt-4 flex items-center gap-3">
                                  <a
                                    href="#"
                                    className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    View case study
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Dots */}
                      <div className="flex items-center gap-2 justify-center pt-1">
                        {activeSlides.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => setSlideIndex(i)}
                            className={`h-2.5 w-2.5 rounded-full transition-all ${
                              i === slideIndex ? 'bg-gray-900 dark:bg-gray-100 w-6' : 'bg-gray-300 dark:bg-gray-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
