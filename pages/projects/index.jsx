import { PageSEO } from '../../src/components/SEO'
import { SimpleLayout } from '../../src/components/SimpleLayout'
import ContactPurpleBlock from '../../src/components/ContactPurpleBlock'
import { AvailableForWorkPill } from '../../src/components/AvailableForWorkPill'
import { Container } from '../../src/components/Container'
import { ProjectCard } from '../../src/components/ProjectCard'
import { projectsData } from '../../src/data/projectsData'
import { getProjectsPage, getProjects } from '../../lib/sanity-queries'
import { urlFor } from '../../lib/sanity'
import { mergeProjectLists } from '../../lib/projectMerge'

// Normalize a CMS project to card shape (slug, title, image, projectType, shortDescription)
function normalizeCmsProjectForCard(cmsProject) {
  if (!cmsProject) return null
  const slug = cmsProject.slug?.current ?? cmsProject.slug ?? ''
  const imageUrl = cmsProject.mainImage
    ? urlFor(cmsProject.mainImage).width(800).height(600).url()
    : ''
  return {
    slug,
    title: cmsProject.title,
    image: imageUrl,
    projectType: Array.isArray(cmsProject.chips) && cmsProject.chips.length
      ? cmsProject.chips.join(', ')
      : '',
    shortDescription: cmsProject.thumbnailSummary || '',
    description: cmsProject.thumbnailSummary || '',
  }
}

export default function Projects({ projectsPageData, projects }) {
  const currentPageData = projectsPageData || {}
  const currentProjects = mergeProjectLists(projects, projectsData)

  return (
    <>
      <PageSEO
        title={currentPageData.seoTitle || currentPageData.title || 'Projects'}
        description={currentPageData.seoDescription || currentPageData.description || 'Selected work across web, mobile, and SaaS products'}
      />
      <SimpleLayout>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl mb-8">
          {currentPageData.title || 'Projects'}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12">
          {currentPageData.description || 'Selected work across web, mobile, and SaaS products'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-7xl">
          {currentProjects.filter(Boolean).map((project) => (
            <ProjectCard
              key={project.slug?.current ?? project.slug ?? project.title}
              project={project}
              hideTags
            />
          ))}
        </div>
      </SimpleLayout>
      <ContactPurpleBlock className="mt-24 sm:mt-32 mb-16" />
      <AvailableForWorkPill scrollThreshold={250} />
    </>
  )
}

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
