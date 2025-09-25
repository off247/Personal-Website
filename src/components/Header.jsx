import ThemeToggle from './ThemeToggle'
import { Link } from 'react-router-dom'

export default function Header({ navItems, activeId, theme, setTheme }) {
  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link to="/" className="w-10 h-10 flex items-center justify-center" aria-label="Home">
            <img src="/gch_logo_black.svg" alt="GCH Logo" className="w-9 h-9 dark:invert" />
          </Link>
          <span className="text-sm tracking-widest">PORTFOLIO</span>
        </div>
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm transition-colors ${
                activeId === item.id
                  ? 'text-gray-900 dark:text-gray-100 font-semibold'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              }`}
            >
              {item.label === 'Projects' ? 'Capabilities' : item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <div className="sr-only" role="status" aria-live="polite">Theme is {theme}</div>
    </header>
  )
}
