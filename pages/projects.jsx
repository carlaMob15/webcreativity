import { PageSEO } from '../src/components/SEO'
import { SimpleLayout } from '../src/components/SimpleLayout'
import ContactPurpleBlock from '../src/components/ContactPurpleBlock'
import { Container } from '../src/components/Container'
import { ProjectCard } from '../src/components/ProjectCard'
import { projectsData } from '../src/data/projectsData'
import { getProjectsPage, getProjects } from '../lib/sanity-queries'
import { urlFor } from '../lib/sanity'

// Normalize a CMS project to the same shape as legacy (slug string, image url, projectType, shortDescription)
function normalizeCmsProjectForCard(cmsProject) {
  if (!cmsProject) return null
  const slug = cmsProject.slug?.current ?? cmsProject.slug ?? ''
  const thumb = cmsProject.thumbnailImage || cmsProject.heroImage
  const imageUrl = thumb ? urlFor(thumb).width(800).height(600).url() : ''
  return {
    slug,
    title: cmsProject.title,
    image: imageUrl,
    projectType: Array.isArray(cmsProject.tags) && cmsProject.tags.length
      ? cmsProject.tags.join(', ')
      : '',
    shortDescription: cmsProject.shortDescription || cmsProject.description || '',
    description: cmsProject.shortDescription || cmsProject.description || '',
  }
}

// CMS projects first (already sorted by publishedAt desc, then _createdAt desc), then legacy; dedupe by slug (CMS wins)
function mergeProjects(normalizedCmsProjects, legacyProjects) {
  const cms = normalizedCmsProjects ?? []
  const legacy = legacyProjects ?? []
  const cmsSlugs = new Set(cms.map((p) => p.slug ?? ''))
  const legacyOnly = legacy.filter((p) => !cmsSlugs.has(p.slug ?? ''))
  return [...cms, ...legacyOnly]
}

export default function Projects({ projectsPageData, projects }) {
  const currentPageData = projectsPageData || {}
  const currentProjects = mergeProjects(projects, projectsData)

  return (
    <>
      <PageSEO 
        title={currentPageData.seoTitle || currentPageData.title || "Work"}
        description={currentPageData.seoDescription || currentPageData.description || "Work samples and case studies showcasing my expertise in design and development"}
      />
      <SimpleLayout>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl mb-8">
          {currentPageData.title || "Work"}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12">
          {currentPageData.description || "Our Work – UX/UI Projects Across Web, Mobile & SaaS"}
        </p>
        <Container.Grid 
          cols={1} 
          smCols={1} 
          mdCols={2} 
          lgCols={2} 
          gap={8}
          className="mx-auto max-w-7xl"
        >
          {currentProjects.map((project) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
            />
          ))}
        </Container.Grid>
      </SimpleLayout>
      <ContactPurpleBlock className="mt-24 sm:mt-32 mb-16" />
    </>
  )
}

// Fetch data from Sanity at build time. CMS projects sorted by publishedAt desc (fallback _createdAt desc); then merge with legacy and dedupe by slug.
export async function getStaticProps() {
  try {
    const [projectsPageData, cmsProjects] = await Promise.all([
      getProjectsPage(),
      getProjects(),
    ])

    const normalizedCms = (cmsProjects || [])
      .map(normalizeCmsProjectForCard)
      .filter(Boolean)

    return {
      props: {
        projectsPageData: projectsPageData || null,
        projects: normalizedCms,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching projects page data:', error)

    return {
      props: {
        projectsPageData: null,
        projects: [],
      },
      revalidate: 60,
    }
  }
}
