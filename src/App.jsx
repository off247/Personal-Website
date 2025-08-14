import React, { useEffect, useMemo, useRef, useState } from 'react'

function App() {
  const [isMusicOn, setIsMusicOn] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/audio.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.5
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isMusicOn) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
      audio.currentTime = 0
    }
  }, [isMusicOn])

  const navItems = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'projects', label: 'Projects' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' },
    ],
    []
  )

  const [activeId, setActiveId] = useState('home')
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 }
    )

    navItems.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [navItems])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">o</div>
            <span className="text-sm tracking-widest">PORTFOLIO</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm transition-colors ${
                  activeId === item.id ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-gray-500">Music</span>
            <div className="flex items-center gap-2 text-sm">
              <button
                aria-pressed={isMusicOn}
                onClick={() => setIsMusicOn(true)}
                className={`px-2 py-1 rounded ${isMusicOn ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}
              >
                ON
              </button>
              <button
                aria-pressed={!isMusicOn}
                onClick={() => setIsMusicOn(false)}
                className={`px-2 py-1 rounded ${!isMusicOn ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}
              >
                OFF
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">Bonjour</p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Your Name
              <br />
              <span className="text-gray-500">digital</span>
              <br />
              designer
            </h1>
            <div className="mt-10 flex items-center gap-6">
              <a href="#projects" className="text-sm underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900">Projects</a>
              <a href="#about" className="text-sm underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900">About me</a>
              <a href="#contact" className="text-sm underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900">Contact</a>
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 md:py-24 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-3xl md:text-5xl font-bold">Projects</h2>
              <span className="text-xs uppercase tracking-widest text-gray-500">Selected</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Project visual</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-widest text-gray-500">UI / UX DESIGN</p>
                      <h3 className="text-lg font-semibold">Project Title</h3>
                    </div>
                    <span className="text-gray-400 group-hover:text-gray-900 transition-colors">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-10 items-start">
              <h2 className="text-3xl md:text-5xl font-bold col-span-1">I am</h2>
              <div className="md:col-span-2 space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  A short introduction about you. Describe your design philosophy, specialties, and what sets your work apart. Keep it concise and impactful.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">Expertise</p>
                    <ul className="space-y-1 text-gray-800">
                      <li>UI Design</li>
                      <li>UX Design</li>
                      <li>Art Direction</li>
                      <li>Prototyping</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">Worked with</p>
                    <ul className="space-y-1 text-gray-800">
                      <li>Agency / Brand 1</li>
                      <li>Agency / Brand 2</li>
                      <li>Agency / Brand 3</li>
                      <li>And more…</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 md:py-24 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-10 items-start">
              <h2 className="text-3xl md:text-5xl font-bold col-span-1">Contact</h2>
              <div className="md:col-span-2 space-y-6">
                <p className="text-lg text-gray-700">Don't be shy, feel free to mail me, and we'll discuss your needs.</p>
                <div className="flex flex-col sm:flex-row gap-4 text-gray-800">
                  <a className="underline underline-offset-4" href="mailto:hello@example.com">hello@example.com</a>
                  <a className="underline underline-offset-4" href="#" target="_blank" rel="noreferrer">LinkedIn</a>
                  <a className="underline underline-offset-4" href="#" target="_blank" rel="noreferrer">Behance</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 py-10 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>Website by You — Music toggle expects <code>/public/audio.mp3</code></p>
        </div>
      </footer>
    </div>
  )
}

export default App

