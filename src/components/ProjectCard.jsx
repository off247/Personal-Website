import { Link } from 'react-router-dom'

export default function ProjectCard({ title, tags = [], thumb, href }) {
  const Wrapper = href?.startsWith('/') ? Link : 'a'
  const wrapperProps = href?.startsWith('/')
    ? { to: href }
    : href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <div className="group rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white/60 dark:bg-gray-900/60 backdrop-blur hover:shadow-lg transition">
      {thumb && (
        <div className="aspect-[16/10] overflow-hidden">
          <img src={thumb} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-medium text-lg">{title}</h3>
        {tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map(t => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {t}
              </span>
            ))}
          </div>
        )}
        {href && (
          <Wrapper {...wrapperProps} className="inline-block mt-4 text-sm underline decoration-dotted">
            View
          </Wrapper>
        )}
      </div>
    </div>
  )
}