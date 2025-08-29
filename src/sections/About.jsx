export default function AboutSection() {
    return (
      <section id="about" className="py-16 md:py-24 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <h2 className="text-3xl md:text-5xl font-bold col-span-1">elevator pitch</h2>
            <div className="md:col-span-2 space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I am a designer who believes great work should feel as good as it looks. With a background working in sports, tech, and higher education, I bring ideas to life through bold visuals, intuitive interactions, and a touch of playful charm.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">Expertise</p>
                  <ul className="space-y-1 text-gray-800 dark:text-gray-200">
                    <li>Graphic Design</li>
                    <li>UX/UI Design</li>
                    <li>Content Creation</li>
                    <li>Branding & Visual Identity</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">Worked with</p>
                  <ul className="space-y-1 text-gray-800 dark:text-gray-200">
                    <li>Minnesota Timberwolves & Lynx</li>
                    <li>San Francisco 49ers</li>
                    <li>Oklahoma City Thunder</li>
                    <li>USA Triathlon</li>
                    <li>and more...</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }