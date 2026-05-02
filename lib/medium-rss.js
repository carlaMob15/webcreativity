const MEDIUM_FEED_URL = 'https://medium.com/feed/@wcwebcreativity'

function truncate(str, max) {
  if (!str) return ''
  const s = str.trim()
  if (s.length <= max) return s
  return `${s.slice(0, Math.max(0, max - 1)).trim()}…`
}

function stripSurrogateArtifacts(text) {
  return text.replace(/\u200a/g, ' ').replace(/\s+/g, ' ').trim()
}

/**
 * First meaningful hero image from Medium HTML; skips tracking pixels.
 * @param {string} html
 * @returns {string | null}
 */
function extractFeaturedImage(html) {
  if (!html) return null
  const imgTag = /<img\b[^>]*>/gi
  let tagMatch
  while ((tagMatch = imgTag.exec(html)) !== null) {
    const tag = tagMatch[0]
    const srcMatch = /\bsrc=["']([^"']+)["']/i.exec(tag)
    if (!srcMatch) continue
    const url = srcMatch[1]
    if (!url || url.includes('medium.com/_/stat')) continue
    if (/[?&]event=post\.clientViewed\b/.test(url)) continue
    const isTracking =
      /\bwidth=["']1["']/i.test(tag) && /\bheight=["']1["']/i.test(tag)
    if (isTracking) continue
    return url
  }
  return null
}

function normalizeItem(item) {
  const html = item['content:encoded'] || item.content || ''
  let excerpt =
    item['content:encodedSnippet'] || item.contentSnippet || item.summary || ''
  excerpt = truncate(stripSurrogateArtifacts(excerpt), 200)

  const publishedAt = item.isoDate || item.pubDate || null

  return {
    title: item.title || '',
    link: item.link || '',
    publishedAt,
    excerpt,
    imageUrl: extractFeaturedImage(html),
  }
}

/**
 * Latest posts from the Medium RSS feed (server-side).
 * @param {number} limit
 * @returns {Promise<Array<{ title: string, link: string, publishedAt: string | null, excerpt: string, imageUrl: string | null }>>}
 */
export async function getLatestMediumPosts(limit = 2) {
  try {
    const RSSParser = (await import('rss-parser')).default
    const parser = new RSSParser()
    const feed = await parser.parseURL(MEDIUM_FEED_URL)
    const items = (feed.items || []).slice(0, limit)
    return items.map(normalizeItem).filter((p) => p.link && p.title)
  } catch (error) {
    console.error('Medium RSS fetch failed:', error?.message || error)
    return []
  }
}
