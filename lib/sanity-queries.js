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

// Fetch all published projects for Work list (card fields only). Sorted by publishedAt desc, then _createdAt desc.
export async function getProjects() {
  const query = `*[_type == "project"] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    slug,
    tags,
    shortDescription,
    description,
    thumbnailImage,
    heroImage,
    publishedAt,
    _createdAt
  }`
  return await client.fetch(query)
}

// Fetch featured projects (card fields)
export async function getFeaturedProjects() {
  const query = `*[_type == "project" && featured == true] | order(publishedAt desc, _createdAt desc) {
    title,
    slug,
    tags,
    shortDescription,
    description,
    thumbnailImage,
    heroImage
  }`
  return await client.fetch(query)
}

// Fetch single project by slug (full case study fields for detail page)
export async function getProjectBySlug(slug) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    tags,
    shortDescription,
    description,
    thumbnailImage,
    heroImage,
    heroImageAlt,
    publishedAt,
    _createdAt,
    overview,
    liveUrl,
    client,
    timeline,
    services,
    tools,
    challenge,
    solution,
    impact,
    gallery[] {
      image,
      caption,
      alt
    },
    technicalApproach,
    technicalApproachImages[] {
      image,
      caption,
      alt
    },
    impactImage {
      image,
      caption,
      alt
    }
  }`
  return await client.fetch(query, { slug })
}

// Fetch services page content
export async function getServicesPage() {
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