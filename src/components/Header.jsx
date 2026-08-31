import { useState, useRef, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { withBase } from '../lib/paths'
import { workProjects } from '../lib/workProjects'

export default function Header({ navItems, activeId, theme, setTheme }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle navigation to home page sections
  const handleSectionClick = (sectionId, e) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`)
      // Wait for navigation, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link to="/" className="w-10 h-10 flex items-center justify-center" aria-label="Home">
            <img src={withBase('/gch_logo_black.svg')} alt="GCH Logo" className="w-9 h-9 dark:invert" />
          </Link>
          <span className="text-sm tracking-widest">PORTFOLIO</span>
        </div>
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navItems.map((item) => {
            if (item.id === 'projects') {
              return (
                <div key={item.id} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onMouseEnter={() => setDropdownOpen(true)}
                    className={`text-sm transition-colors ${
                      activeId === item.id
                        ? 'text-gray-900 dark:text-gray-100 font-semibold'
                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                    }`}
                  >
                    Capabilities
                  </button>
                  {dropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg py-2 max-h-96 overflow-y-auto transition-opacity duration-200"
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 mb-1">
                        Examples
                      </div>
                      {workProjects.map((project) => (
                        <Link
                          key={project.slug}
                          to={project.path}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {project.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <Link
                key={item.id}
                to={location.pathname === '/' ? `#${item.id}` : `/#${item.id}`}
                onClick={(e) => handleSectionClick(item.id, e)}
                className={`text-sm transition-colors ${
                  activeId === item.id
                    ? 'text-gray-900 dark:text-gray-100 font-semibold'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <div className="sr-only" role="status" aria-live="polite">Theme is {theme}</div>
    </header>
  )
}
