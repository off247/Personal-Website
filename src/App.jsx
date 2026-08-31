import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProjectsSection from './sections/Capabilities'
import AboutSection from './sections/About'
import ContactSection from './sections/Contact'
import useActiveSection from './hooks/useActiveSection'
import { NAV_ITEMS, ROOT_MARGIN } from './lib/constants'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import VisualStorytelling from './pages/VisualStorytelling'
import SocialMedia from './pages/SocialMedia'
import WebMobile from './pages/WebMobile'
import ExperientialDesign from './pages/ExperientialDesign'
import ClientPresentationDecks from './pages/work/ClientPresentationDecks'
import MarketingEventPhotography from './pages/work/MarketingEventPhotography'
import StudentExperienceVideoSeries from './pages/work/StudentExperienceVideoSeries'
import CinematicWeddingVideos from './pages/work/CinematicWeddingVideos'
import ShortFormVideoEditing from './pages/work/ShortFormVideoEditing'
import GameDayMarketingGraphics from './pages/work/GameDayMarketingGraphics'
import InAppFanEngagement from './pages/work/InAppFanEngagement'
import CustomFanWallpapers from './pages/work/CustomFanWallpapers'
import EmailMarketingForLiveEvents from './pages/work/EmailMarketingForLiveEvents'
import ResourceHubWebpage from './pages/work/ResourceHubWebpage'
import SingleGamePromotionsPage from './pages/work/SingleGamePromotionsPage'
import BrandedWallInstallation from './pages/work/BrandedWallInstallation'
import WayfindingSignage from './pages/work/WayfindingSignage'


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
  const scrollActiveId = useActiveSection(navItems, ROOT_MARGIN)

  return (
    <BrowserRouter>
      <AppContent
        navItems={navItems}
        scrollActiveId={scrollActiveId}
        theme={theme}
        setTheme={setTheme}
      />
    </BrowserRouter>
  )
}

function AppContent({ navItems, scrollActiveId, theme, setTheme }) {
  const location = useLocation()
  
  // Check if we're on a work project page - if so, make "projects" active
  const activeId = useMemo(() => {
    if (location.pathname.startsWith('/work/')) {
      return 'projects'
    }
    return scrollActiveId
  }, [location.pathname, scrollActiveId])

  // Handle hash scrolling when navigating to home page with hash
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.substring(1) // Remove the '#'
      const element = document.getElementById(sectionId)
      if (element) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location.pathname, location.hash])

  return (
    <div className="scroll-smooth min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Header navItems={navItems} activeId={activeId} theme={theme} setTheme={setTheme} />
        <main>
          <Routes>
            {/* Existing one-page sections */}
            <Route
              path="/"
              element={
                <>
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

            {/* Work detail pages */}
            <Route path="/client-presentation-decks" element={<ClientPresentationDecks />} />
            <Route path="/work/client-presentation-decks" element={<ClientPresentationDecks />} />
            <Route path="/work/marketing-event-photography" element={<MarketingEventPhotography />} />
            <Route path="/work/student-experience-video-series" element={<StudentExperienceVideoSeries />} />
            <Route path="/work/cinematic-wedding-videos" element={<CinematicWeddingVideos />} />
            <Route path="/work/short-form-video-editing" element={<ShortFormVideoEditing />} />
            <Route path="/work/game-day-marketing-graphics" element={<GameDayMarketingGraphics />} />
            <Route path="/work/in-app-fan-engagement" element={<InAppFanEngagement />} />
            <Route path="/work/custom-fan-wallpapers" element={<CustomFanWallpapers />} />
            <Route path="/work/email-marketing-for-live-events" element={<EmailMarketingForLiveEvents />} />
            <Route path="/work/resource-hub-webpage" element={<ResourceHubWebpage />} />
            <Route path="/work/single-game-promotions-page" element={<SingleGamePromotionsPage />} />
            <Route path="/work/branded-wall-installation" element={<BrandedWallInstallation />} />
            <Route path="/work/wayfinding-signage" element={<WayfindingSignage />} />
          </Routes>
        </main>
        <footer className="border-t border-gray-200 dark:border-gray-800 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p>Website by Grace *and her robot friends*</p>
          </div>
        </footer>
      </div>
    )
  }

export default App
