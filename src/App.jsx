import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import HomeSection from './sections/Home'
import ProjectsSection from './sections/Capabilities'
import AboutSection from './sections/About'
import ContactSection from './sections/Contact'
import useActiveSection from './hooks/useActiveSection'
import { NAV_ITEMS, ROOT_MARGIN } from './lib/constants'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VisualStorytelling from './pages/VisualStorytelling'
import SocialMedia from './pages/SocialMedia'
import WebMobile from './pages/WebMobile'
import ExperientialDesign from './pages/ExperientialDesign'

function App() {
  // Theme (light/dark) with system + localStorage preference
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
      root.style.colorScheme = 'light'
    }
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const navItems = useMemo(() => NAV_ITEMS, [])
  const activeId = useActiveSection(navItems, ROOT_MARGIN)

  return (
    <BrowserRouter>
      <div className="scroll-smooth min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Header navItems={navItems} activeId={activeId} theme={theme} setTheme={setTheme} />
        <main>
          <Routes>
            {/* Home (existing one-page sections) */}
            <Route
              path="/"
              element={
                <>
                  <HomeSection />
                  <AboutSection />
                  <ProjectsSection />
                  <ContactSection />
                </>
              }
            />

            {/* New capability pages */}
            <Route path="/visual-storytelling" element={<VisualStorytelling />} />
            <Route path="/social-media" element={<SocialMedia />} />
            <Route path="/web-mobile" element={<WebMobile />} />
            <Route path="/experiential-design" element={<ExperientialDesign />} />
          </Routes>
        </main>
        <footer className="border-t border-gray-200 dark:border-gray-800 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p>Website by Grace *and her robot friends*</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App