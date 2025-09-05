import { useState, Fragment } from 'react'
import PageLayout from '../components/PageLayout'
import ProjectCard from '../components/ProjectCard'
import InlineBento from '../components/InlineBento'
import useGridColumns from '../hooks/useGridColumns'
import { experiential } from '../lib/projects'

export default function ExperientialDesign() {
  const [selected, setSelected] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const cols = useGridColumns()

  const handleSelect = (project, index) => {
    setSelected((curr) => (curr?.title === project.title ? null : project))
    setSelectedIndex((curr) => (curr === index && selected ? null : index))
    queueMicrotask(() => {
      const target = document.getElementById('ex-bento-region')
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <PageLayout
      title="Experiential Design"
      intro="Physical-digital moments—installs, wayfinding, and in-venue motion that moves people."
    >
      {/* Responsive grid with row-aware bento injection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {experiential.map((p, i) => {
          const isRowEnd = (i % cols) === cols - 1
          const rowStart = i - (i % cols)
          const rowEnd = rowStart + cols - 1
          const bentoBelongsAfterThisRow =
            selected && selectedIndex !== null && selectedIndex >= rowStart && selectedIndex <= rowEnd

          return (
            <Fragment key={p.title}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleSelect(p, i)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelect(p, i)}
                className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-xl cursor-pointer"
              >
                <ProjectCard {...p} />
              </div>

              {(isRowEnd || i === experiential.length - 1) && bentoBelongsAfterThisRow && (
                <InlineBento
                  regionId="ex-bento-region"
                  selected={selected}
                  onClose={() => { setSelected(null); setSelectedIndex(null) }}
                />
              )}
            </Fragment>
          )
        })}
      </div>
    </PageLayout>
  )
}