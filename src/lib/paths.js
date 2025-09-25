export const withBase = (p) => {
  if (!p) return p
  if (typeof p !== 'string') return p
  // If path starts with '/', prefix with BASE_URL for subpath-safe URLs
  return p.startsWith('/')
    ? `${import.meta.env.BASE_URL}${p.slice(1)}`
    : p
}

