import { useState, useMemo, useRef, useEffect } from 'react'
import { withBase } from '../lib/paths'
import { capabilities as capabilityData } from '../lib/projects'
import { getWorkProjectByTitle } from '../lib/workProjects'

// Feature flag: toggle Case Study CTA visibility
const SHOW_CASE_STUDY = true

// Helper: make a URL-safe slug that matches our route style
const toSlug = (s = '') =>
  s
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export default function ProjectsSection() {
  // One-page, expandable capabilities with inline carousel per capability
  const capabilityList = useMemo(
    () =>
      capabilityData.map((capability) => ({
        ...capability,
        slides: (capability.slides ?? []).map((slide) => {
          const project = getWorkProjectByTitle(slide.title)
          // Prefer explicit slug from data or project, else generate from title
          const slug = slide.slug || project?.slug || toSlug(slide.title)
          // Build canonical path to the work page (matches <Route path="/work/<slug>")
          const path = project?.path || `/work/${slug}`

          const caseStudy = (() => {
            if (!SHOW_CASE_STUDY) return undefined
            if (slide.caseStudy === false) return undefined

            const base = typeof slide.caseStudy === 'object' && slide.caseStudy !== null ? slide.caseStudy : {}

            let hrefCandidate
            if ('href' in base) {
              hrefCandidate = base.href
            } else if (slide.caseStudy === undefined) {
              hrefCandidate = project?.path || path
            }

            const normalizedHref = typeof hrefCandidate === 'string' ? hrefCandidate.trim() : hrefCandidate
            const hasHref = typeof normalizedHref === 'string' ? normalizedHref.length > 0 : Boolean(normalizedHref)
            const comingSoon = Boolean(base.comingSoon) || !hasHref
            const label = comingSoon
              ? base.comingSoonLabel || base.label || 'Details coming soon'
              : base.label || 'View case study'

            return {
              ...base,
              href: comingSoon ? undefined : normalizedHref,
              label,
              comingSoon,
            }
          })()

          return {
            ...slide,
            slug,
            path,
            caseStudy,
          }
        }),
      })),
    []
  )

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
  const videoRefs = useRef([])
  const [mutedByIndex, setMutedByIndex] = useState([])
  const [carouselIndices, setCarouselIndices] = useState({})
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
    videoRefs.current = videoRefs.current.slice(0, activeSlides.length)
    // Initialize all slides as muted when the active set changes
    setMutedByIndex((prev) => {
      const next = Array.from({ length: activeSlides.length }, (_, i) => prev[i] ?? true)
      return next
    })
    // Ensure we have an index entry per slide for nested carousels
    setCarouselIndices((prev) => {
      const next = {}
      activeSlides.forEach((_, i) => {
        next[i] = prev[i] ?? 0
      })
      return next
    })
  }, [activeSlides.length])

  // Measure on slide change / open-close (after refs attach)
  useEffect(() => {
    let id = window.requestAnimationFrame(measure)
    return () => window.cancelAnimationFrame(id)
  }, [slideIndex, active, activeSlides.length])

  // Keep viewport height in sync with dynamic content changes (e.g., font swaps, async assets)
  useEffect(() => {
    if (active < 0) {
      setViewportHeight(0)
      return
    }

    const current = slideRefs.current[slideIndex]

    // If the ref isn't attached yet, measure on the next frame
    if (!current) {
      let id = window.requestAnimationFrame(measure)
      return () => window.cancelAnimationFrame(id)
    }

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
  }, [active, slideIndex, activeSlides.length])

  // Re-measure on window resize (orientation changes on mobile)
  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const handleToggle = (idx) => {
    setSlideIndex(0)
    setMutedByIndex([])
    videoRefs.current = []
    setCarouselIndices({})
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

  useEffect(() => {
    if (active < 0) return
    const currentSlide = activeSlides[slideIndex]
    if (!currentSlide || !Array.isArray(currentSlide.carousel)) return
    setCarouselIndices((prev) => {
      if (prev[slideIndex] === 0) return prev
      return { ...prev, [slideIndex]: 0 }
    })
  }, [active, slideIndex, activeSlides])

  useEffect(() => {
    if (active < 0) return undefined
    const currentSlide = activeSlides[slideIndex]
    if (!currentSlide || !Array.isArray(currentSlide.carousel) || currentSlide.carousel.length < 2) {
      return undefined
    }

    setCarouselIndices((prev) => {
      if (prev[slideIndex] !== undefined) return prev
      return { ...prev, [slideIndex]: 0 }
    })

    const intervalDuration = currentSlide.carouselIntervalMs ?? 4000

    const id = window.setInterval(() => {
      setCarouselIndices((prev) => {
        const current = prev[slideIndex] ?? 0
        const nextIndex = (current + 1) % currentSlide.carousel.length
        return { ...prev, [slideIndex]: nextIndex }
      })
      window.requestAnimationFrame(measure)
    }, intervalDuration)

    return () => window.clearInterval(id)
  }, [active, activeSlides, slideIndex])

  const toggleMute = (i) => {
    const vid = videoRefs.current[i]
    if (!vid) return
    setMutedByIndex((prev) => {
      const next = [...prev]
      next[i] = !Boolean(prev[i])
      // Apply to DOM video element
      vid.muted = next[i]
      if (!next[i]) {
        // Ensure playback continues with sound after user gesture
        try { vid.play() } catch {}
      }
      return next
    })
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
                className={`group relative border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-shadow !align-top leading-none ${
                  isOpen ? 'md:col-span-2 ring-1 ring-gray-900/10 dark:ring-white/10 shadow-lg' : ''
                }`}
                aria-label={`${project.title} — ${project.category}`}
              >
                {/* Header (click target) */}
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  aria-expanded={isOpen}
                  className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/10 dark:focus-visible:ring-gray-100/10"
                >
                  {/* Banner transforms from thumbnail */}
                  <div
                    className={`block align-top relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${
                      isOpen ? 'aspect-[21/9]' : 'aspect-[16/10]'
                    }`}
                    style={{ lineHeight: 0 }}
                  >
                    <img
                      src={withBase(project.image)}
                      alt={project.title}
                      loading="lazy"
                      className={`block w-full h-full object-cover transition-transform duration-500 ${
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
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-900 text-sm font-semibold transition-transform duration-200 ${isOpen ? 'hover:scale-110' : 'group-hover:animate-bounce'}`}
                        aria-hidden
                      >
                        {isOpen ? '×' : '↓'}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Expandable body */}
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows,max-height,opacity] duration-500 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] max-h-[200rem] opacity-100'
                      : 'grid-rows-[0fr] max-h-0 opacity-0 pointer-events-none'
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden">
                    {/* Carousel */}
                    <div className="px-6 md:px-8 py-4 md:py-6 flex flex-col gap-4 md:gap-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base md:text-lg font-semibold">Previous Projects</h4>

                      </div>

                      {/* Slide viewport */}
                      <div
                        className="relative"
                        ref={viewportRef}
                      >
                        {/* Left Arrow */}
                        {activeSlides.length > 1 && (
                          <button
                            type="button"
                            onClick={prev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 h-10 w-10 rounded-full bg-white dark:bg-gray-900 border-1 border-gray-300 dark:border-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-110 transition-all flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 dark:focus-visible:ring-gray-100/20"
                            aria-label="Previous project"
                          >
                            <span className="text-2xl font-bold leading-none">‹</span>
                          </button>
                        )}
                        {/* Right Arrow */}
                        {activeSlides.length > 1 && (
                          <button
                            type="button"
                            onClick={next}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 h-10 w-10 rounded-full bg-white dark:bg-gray-900 border-1 border-gray-300 dark:border-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-110 transition-all flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 dark:focus-visible:ring-gray-100/20"
                            aria-label="Next project"
                          >
                            <span className="text-2xl font-bold leading-none">›</span>
                          </button>
                        )}
                        {activeSlides.map((s, i) => {
                          const activeCarouselIndex = carouselIndices[i] ?? 0

                          return (
                            <div
                              key={s.title + i}
                              className={i === slideIndex ? '' : 'hidden'}
                              aria-hidden={i !== slideIndex}
                            >
                              <div
                                ref={(el) => {
                                  slideRefs.current[i] = el
                                }}
                                className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700"
                              >
                                <div className="grid md:grid-cols-5 gap-4 md:gap-6 items-stretch">
                                  {/* media block inside the slide card */}
                                  <div className="md:col-span-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[16/10] relative">
                                  {Array.isArray(s.carousel) && s.carousel.length > 0 ? (
                                    <div className="relative h-full w-full">
                                      {s.carousel.map((item, imgIdx) => {
                                        const isActive = activeCarouselIndex === imgIdx
                                        const { src, alt } =
                                          typeof item === 'string'
                                            ? { src: item, alt: `${s.title} gallery image ${imgIdx + 1}` }
                                            : {
                                                src: item?.src,
                                                alt:
                                                  item?.alt || `${s.title} gallery image ${imgIdx + 1}`,
                                              }

                                        if (!src) return null

                                        return (
                                          <img
                                            key={`${s.title}-${imgIdx}`}
                                            src={withBase(src)}
                                            alt={alt}
                                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                                              isActive ? 'opacity-100' : 'opacity-0'
                                            }`}
                                            style={{ willChange: 'opacity' }}
                                            aria-hidden={!isActive}
                                            onLoad={() => {
                                              if (isActive) measure()
                                            }}
                                          />
                                        )
                                      })}
                                      {s.carousel.length > 1 && (
                                        <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur select-none">
                                          {`${(activeCarouselIndex % s.carousel.length) + 1} / ${s.carousel.length}`}
                                        </div>
                                      )}
                                    </div>
                                  ) : s.video ? (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => toggleMute(i)}
                                        className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-black/60 text-white text-xs px-2.5 py-1.5 backdrop-blur hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                                        aria-label={mutedByIndex[i] ? 'Unmute video' : 'Mute video'}
                                      >
                                        <span aria-hidden>{mutedByIndex[i] ? '🔇' : '🔊'}</span>
                                        <span className="hidden sm:inline">{mutedByIndex[i] ? 'Unmute' : 'Mute'}</span>
                                      </button>
                                      <video
                                        ref={(el) => {
                                          videoRefs.current[i] = el
                                        }}
                                        src={withBase(s.video)}
                                        autoPlay
                                        muted={mutedByIndex[i] ?? true}
                                        loop
                                        playsInline
                                        className="block h-full w-full object-cover"
                                        onLoadedMetadata={measure}
                                      />
                                    </>
                                  ) : (
                                    <img
                                      src={withBase(s.image)}
                                      alt={s.title}
                                      className="block w-full h-full object-cover"
                                      loading="lazy"
                                      decoding="async"
                                      onLoad={measure}
                                    />
                                  )}
                                </div>
                                <div className="md:col-span-2 flex flex-col">
                                  <h5 className="text-lg font-semibold mb-2">{s.title}</h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {s.description}
                                  </p>
                                  {/* CTA row (optional) */}
                                  {s.caseStudy && (
                                    <div className="mt-auto pt-4 flex items-center gap-3">
                                      {s.caseStudy.comingSoon ? (
                                        <button
                                          type="button"
                                          disabled
                                          className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        >
                                          {s.caseStudy.label}
                                        </button>
                                      ) : s.caseStudy.href ? (
                                        <a
                                          href={s.caseStudy.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                          {s.caseStudy.label || 'View case study'}
                                        </a>
                                      ) : null}
                                    </div>
                                  )}
                                </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
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
