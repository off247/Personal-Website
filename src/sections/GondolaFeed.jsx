export default function GondolaSection() {
    return (
      <section id="gondola" className="py-16 md:py-24 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <h2 className="text-3xl md:text-5xl font-bold col-span-1">My Work Feed</h2>
            <iframe
              src="https://gondola.cc/GraceHomer"
              title="Gondola Feed"
              className="col-span-2 w-full max-w-3xl h-[600px] border border-gray-200 dark:border-gray-800 rounded"
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-same-origin allow-scripts allow-popups"
            ></iframe>
          </div>
        </div>
      </section>
    )
  }