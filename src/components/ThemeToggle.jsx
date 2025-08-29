export default function ThemeToggle({ theme, setTheme }) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Theme</span>
        <div className="flex items-center gap-2 text-sm" role="group" aria-label="Toggle color theme">
          <button
            type="button"
            aria-pressed={theme === 'light'}
            onClick={() => setTheme('light')}
            className={`px-2 py-1 rounded outline-none ring-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-100 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 ${
              theme === 'light'
                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
            aria-label="Activate light mode"
          >
            Light
          </button>
          <button
            type="button"
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme('dark')}
            className={`px-2 py-1 rounded outline-none ring-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-100 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 ${
              theme === 'dark'
                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
            aria-label="Activate dark mode"
          >
            Dark
          </button>
        </div>
      </div>
    )
  }