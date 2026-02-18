/**
 * Gradual CMS migration: single source of truth for merging CMS + hardcoded projects.
 *
 * Rules:
 * - Show both CMS and hardcoded (legacy) projects.
 * - If a CMS project has the same slug as a hardcoded project, prefer CMS and exclude the hardcoded one.
 * - Slug comparison is case-insensitive so "My-Project" and "my-project" count as the same.
 *
 * Use mergeProjectLists() for: Projects grid, Featured projects, "More projects" section, and any list that must hide legacy when CMS exists for that slug.
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
 * Use for: projects grid, "More projects", and any combined list.
 *
 * @param {Array<{ slug?: string }>} cmsCards - CMS projects already normalized to card shape (with string slug)
 * @param {Array<{ slug?: string }>} legacyProjects - Hardcoded projects from projectsData
 * @returns {Array} Combined list: all CMS + legacy projects whose slug is not taken by CMS
 */
export function mergeProjectLists(cmsCards, legacyProjects) {
  const cms = cmsCards ?? []
  const legacy = legacyProjects ?? []
  const cmsSlugs = new Set(cms.map((p) => normalizeSlug(p.slug)))
  const legacyOnly = legacy.filter((p) => !cmsSlugs.has(normalizeSlug(p.slug)))
  return [...cms, ...legacyOnly]
}
