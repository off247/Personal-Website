import { useMemo } from 'react'

export default function InlineBento({ regionId, selected, onClose }) {
  const bento = useMemo(() => {
    if (!selected) return null
    const cover = selected.cover || selected.images?.[0]
    const alt = selected.alt || selected.title
    const summary = selected.summary || selected.description || selected.blurb
    const stats = selected.stats || []
    const links = selected.links || (selected.url ? [{ label: 'Visit', href: selected.url }] : [])
    return { cover, alt, summary, stats, links }
  }, [selected])

  if (!selected) return null

  return (
    <div id={regionId} className="col-span-full">
      <div className="mt-2 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md p-4 sm:p-6 transition-all duration-300">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">{selected.title}</h3>
            {selected.client && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{selected.client}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
            {bento?.cover ? (
              <img src={bento.cover} alt={bento.alt} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Add <code>cover</code> or <code>images[0]</code>.
                </span>
              </div>
            )}
          </div>

          <div className="col-span-1 lg:col-span-2 row-span-1 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 p-5 bg-white dark:bg-zinc-900">
            <h4 className="font-medium mb-2">Story</h4>
            <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">{bento?.summary}</p>
          </div>

          <div className="col-span-1 row-span-1 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 p-5 bg-white dark:bg-zinc-900 flex flex-col gap-3">
            <h4 className="font-medium">Details</h4>
            <ul className="text-sm text-zinc-700 dark:text-zinc-300 grid grid-cols-1 gap-2">
              {(bento?.stats || []).map((s, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">{s.label}</span>
                  <span className="font-medium">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 row-span-1 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 p-5 bg-white dark:bg-zinc-900 flex items-center justify-between gap-3">
            <div>
              <h4 className="font-medium">Explore</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Dive deeper.</p>
            </div>
            <div className="flex gap-2">
              {(bento?.links || []).length > 0 ? (
                bento.links.map((l, i) => (
                  <a key={i} href={l.href} className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                    {l.label}
                  </a>
                ))
              ) : (
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Add <code>links</code> or <code>url</code>.</span>
              )}
            </div>
          </div>

          <div className="col-span-1 row-span-1 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex">
            {selected?.process?.[0] ? (
              <img src={selected.process[0]} alt="Process" className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="m-auto text-sm text-zinc-500 dark:text-zinc-400 p-4 text-center">Optionally add <code>process[0]</code>.</div>
            )}
          </div>

          <div className="col-span-1 row-span-1 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex">
            {selected?.outcomes?.[0] ? (
              <img src={selected.outcomes[0]} alt="Outcome" className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="m-auto text-sm text-zinc-500 dark:text-zinc-400 p-4 text-center">Optionally add <code>outcomes[0]</code>.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}