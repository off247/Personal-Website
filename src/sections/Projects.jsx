import { Link } from 'react-router-dom'
export default function ProjectsSection() {
  const projects = [
    { title: "VISUAL STORYTELLING", category: "Narrative • Photo/Video", image: "/projects/project6.png", link: "/visual-storytelling" },
    { title: "SOCIAL MEDIA", category: "Campaigns • Motion", image: "/projects/project3.png", link: "/social-media", comingSoon: true },
    { title: "WEB & MOBILE APP", category: "UX/UI • Front‑End", image: "/projects/project1.png", link: "/web-mobile" },
    { title: "EXPERIENTIAL DESIGN", category: "Installations • Wayfinding", image: "/projects/interior_design.png", link: "/experiential-design" },
  ];

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-5xl font-bold">capabilities</h2>
          <span className="text-xs uppercase tracking-widest text-gray-500">Selected</span>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            project.comingSoon ? (
              <div
                key={index}
                className="group border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-shadow block"
              >
                <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">{project.category}</p>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                  </div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                    Coming Soon
                  </span>
                </div>
              </div>
            ) : (
              <Link
                key={index}
                to={project.link}
                className="group border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/5 transition-shadow focus-within:ring-2 focus-within:ring-gray-900/10 dark:focus-within:ring-gray-100/10 block"
              >
                <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">{project.category}</p>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                  </div>
                  <span className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">→</span>
                </div>
              </Link>
            )
          ))}
        </div>
      </div>
    </section>
  )
}