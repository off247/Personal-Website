export default function ContactSection() {
    return (
      <section id="contact" className="py-16 md:py-24 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <h2 className="text-3xl md:text-5xl font-bold col-span-1">hmu</h2>
            <div className="md:col-span-2 space-y-6">
              <div className="overflow-hidden whitespace-nowrap mb-6" style={{ maxWidth: '100%' }}>
                <span className="inline-block text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  {'waaaaaasuuuuuuuuup'.split('').map((char, i) => (
                    <span
                      key={i}
                      className="inline-block bloom-letter"
                      style={{
                        animation: `bloom 1.2s cubic-bezier(0.23, 1, 0.32, 1) both`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                <style>
                  {`
                    @keyframes bloom {
                      0% { opacity: 0; transform: scale(0.8) translateY(20px) blur(8px); letter-spacing: 0.2em; }
                      60% { opacity: 1; transform: scale(1.05) translateY(-2px) blur(0px); letter-spacing: 0.1em; }
                      100% { opacity: 1; transform: scale(1) translateY(0) blur(0px); letter-spacing: 0.05em; }
                    }
                  `}
                </style>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300">Don’t be shy—email me and we’ll talk through what you need.</p>
              <div className="flex flex-col sm:flex-row gap-4 text-gray-800 dark:text-gray-200">
                <a className="underline underline-offset-4" href="mailto:grace_homer@msn.com">grace_homer@msn.com</a>
                <a className="underline underline-offset-4" href="https://www.linkedin.com/in/gracehomer/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="underline underline-offset-4" href="https://gondola.cc/GraceHomer" target="_blank" rel="noreferrer">Gondola</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }