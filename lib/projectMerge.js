/**
 * Gradual CMS migration: single source of truth for merging CMS + legacy projects.
 *
 * Rules:
 * - Fetch cmsProjects, import legacyProjects from data/legacy-projects.js.
 * - Use slug as the unique identifier. If a CMS project exists with the same slug, exclude the legacy one.
 * - Final rendered list: [...cmsProjects, ...filteredLegacyProjects]. CMS always wins.
 *
 * Once all projects are in CMS: delete data/legacy-projects.js, its imports, and this merge logic.
 */

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

/**
 * Merge CMS projects (card-shaped) with legacy projects. CMS wins by slug: if a CMS project has the same slug as a legacy project, the legacy one is excluded.
 * Result: [...cmsProjects, ...filteredLegacyProjects]. No duplicates.
 *
 * @param {Array<{ slug?: string }>} cmsCards - CMS projects already normalized to card shape (with string slug)
 * @param {Array<{ slug?: string }>} legacyProjects - Hardcoded projects from data/legacy-projects.js
 * @returns {Array} Combined list: all CMS + legacy projects whose slug is not taken by CMS
 */
export function mergeProjectLists(cmsCards, legacyProjects) {
  const cms = cmsCards ?? []
  const legacy = legacyProjects ?? []
  const cmsSlugs = new Set(cms.map((p) => normalizeSlug(p.slug)))
  const legacyOnly = legacy.filter((p) => !cmsSlugs.has(normalizeSlug(p.slug)))
  return [...cms, ...legacyOnly]
}
