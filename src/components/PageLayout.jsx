export default function PageLayout({ title, intro, children }) {
    return (
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
            {intro && <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-300">{intro}</p>}
          </header>
          {children}
        </div>
      </section>
    )
  }