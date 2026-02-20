/**
 * Normalize slug for comparison (case-insensitive, trimmed).
 * @param {string|{ current?: string }|undefined} slug - Project slug (string or Sanity slug object)
 * @returns {string}
 */
export function normalizeSlug(slug) {
  if (slug == null) return ''
  const s = typeof slug === 'object' && slug !== null && 'current' in slug ? slug.current : slug
  return String(s ?? '').toLowerCase().trim()
}
