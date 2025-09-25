import { useState, Fragment } from 'react'
import ProjectCard from './ProjectCard'
import InlineBento from './InlineBento'
import useGridColumns from '../hooks/useGridColumns'

export default function CapabilityGrid({ items = [], regionId }) {
  const [selected, setSelected] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const cols = useGridColumns()

  const handleSelect = (project, index) => {
    setSelected((curr) => (curr?.title === project.title ? null : project))
    setSelectedIndex((curr) => (curr === index && selected ? null : index))
    queueMicrotask(() => {
      const target = document.getElementById(regionId)
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((p, i) => {
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

            {(isRowEnd || i === items.length - 1) && bentoBelongsAfterThisRow && (
              <InlineBento
                regionId={regionId}
                selected={selected}
                onClose={() => { setSelected(null); setSelectedIndex(null) }}
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

