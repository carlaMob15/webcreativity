export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // Get the slug/path from the request
    const { slug, _type } = req.body

    // Revalidate different pages based on content type
    switch (_type) {
      case 'siteSettings':
        // Revalidate all pages when site settings change
        await res.revalidate('/')
        await res.revalidate('/about')
        await res.revalidate('/contact')
        await res.revalidate('/projects')
        break
      
      case 'navigationLink':
        // Revalidate all pages when navigation changes
        await res.revalidate('/')
        await res.revalidate('/about')
        await res.revalidate('/contact')
        await res.revalidate('/projects')
        break
      
      case 'project':
        // Revalidate project pages
        await res.revalidate('/projects')
        if (slug) {
          await res.revalidate(`/projects/${slug}`)
        }
        break
      
      case 'servicesPage':
        // About page content (Sanity doc type is still "servicesPage")
        await res.revalidate('/about')
        break
      
      case 'offering':
      case 'testimonial':
        // Revalidate about page and home page
        await res.revalidate('/')
        await res.revalidate('/about')
        break
      
      default:
        // Revalidate home page for any other content type
        await res.revalidate('/')
    }

    return res.json({ revalidated: true })
  } catch (err) {
    console.error('Error revalidating:', err)
    return res.status(500).send('Error revalidating')
  }
} 