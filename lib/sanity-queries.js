import { client } from './sanity'

// Fetch site settings
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]`
  return await client.fetch(query)
}

// Fetch navigation links
export async function getNavigationLinks() {
  const query = `*[_type == "navigationLink"] | order(order asc)`
  return await client.fetch(query)
}

// Fetch offerings/services
export async function getOfferings() {
  const query = `*[_type == "offering"] | order(order asc) {
    title,
    description,
    image,
    imageAttribution,
    testimonial,
    testimonialAuthor,
    testimonialAuthorTitle,
    order
  }`
  return await client.fetch(query)
}

// Fetch featured testimonial
export async function getFeaturedTestimonial() {
  const query = `*[_type == "testimonial" && featured == true][0] {
    comment,
    author,
    authorTitle,
    authorImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    imageAttribution,
    featured
  }`
  return await client.fetch(query)
}

// Fetch all testimonials
export async function getTestimonials() {
  const query = `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    comment,
    author,
    authorTitle,
    authorImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    imageAttribution,
    featured
  }`
  return await client.fetch(query)
}

// Fetch experience/education
export async function getExperience() {
  const query = `*[_type == "experience"] | order(order asc)`
  return await client.fetch(query)
}

// Fetch all projects for grid & "More Projects" (card fields only). Sorted by _createdAt desc.
export async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    thumbnailSummary,
    chips,
    _createdAt
  }`
  return await client.fetch(query)
}

// Featured projects for home: isFeatured == true, order by featuredOrder asc, fallback _createdAt desc.
export async function getFeaturedProjects() {
  const query = `*[_type == "project" && isFeatured == true] | order(featuredOrder asc, _createdAt desc) {
    title,
    slug,
    mainImage,
    thumbnailSummary,
    chips,
    client,
    year
  }`
  return await client.fetch(query)
}

// Single project by slug: meta + mainImage + sections for detail page.
// Uses published documents only (client has no perspective: 'previewDrafts'). Match is case-insensitive.
export async function getProjectBySlug(slug) {
  const query = `*[_type == "project" && lower(slug.current) == lower($slug)][0] {
    _id,
    title,
    slug,
    chips,
    intro,
    client,
    year,
    product,
    role,
    tools,
    mainImage,
    thumbnailSummary,
    isFeatured,
    featuredOrder,
    sections[] {
      _type,
      _key,
      heading,
      content,
      image,
      alt,
      caption,
      width,
      columns,
      items[] {
        image,
        alt,
        caption
      }
    }
  }`
  return await client.fetch(query, { slug })
}

// Fetch about page content (Sanity doc type is still "servicesPage" for existing data)
export async function getAboutPage() {
  const query = `*[_type == "servicesPage"][0] {
    heroTitle,
    heroDescription,
    servicesTitle,
    services[] | order(order asc) {
      title,
      description,
      iconType,
      customIcon,
      order
    },
    testimonialsTitle,
    showTestimonials,
    testimonialsToShow[]-> {
      _id,
      comment,
      author,
      authorTitle,
      authorImage {
        asset-> {
          _id,
          url
        },
        alt
      },
      imageAttribution,
      featured
    },
    howWeWorkTitle,
    howWeWorkDescription,
    howWeWorkImage,
    aboutTitle,
    aboutDescription,
    aboutMainImage,
    aboutSecondaryImages
  }`
  return await client.fetch(query)
}

// Fetch home page content
export async function getHomePage() {
  const query = `*[_type == "homePage"][0] {
    animatedPhrases[] | order(order asc) {
      phrase,
      order
    },
    scrollCueText,
    heroTitle,
    heroDescription,
    featuredWorkTitle,
    featuredWorkDescription
  }`
  return await client.fetch(query)
}

// Fetch projects page content
export async function getProjectsPage() {
  const query = `*[_type == "projectsPage"][0] {
    title,
    description,
    seoTitle,
    seoDescription
  }`
  return await client.fetch(query)
} 