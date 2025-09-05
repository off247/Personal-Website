import { useState, useEffect } from 'react'

export default function useGridColumns() {
  const [cols, setCols] = useState(1)

  useEffect(() => {
    const xl = window.matchMedia('(min-width: 1280px)')
    const lg = window.matchMedia('(min-width: 1024px)')
    const sm = window.matchMedia('(min-width: 640px)')

    const update = () => {
      if (xl.matches) setCols(4)
      else if (lg.matches) setCols(3)
      else if (sm.matches) setCols(2)
      else setCols(1)
    }

    update()
    xl.addEventListener('change', update)
    lg.addEventListener('change', update)
    sm.addEventListener('change', update)
    return () => {
      xl.removeEventListener('change', update)
      lg.removeEventListener('change', update)
      sm.removeEventListener('change', update)
    }
  }, [])

  return cols
}