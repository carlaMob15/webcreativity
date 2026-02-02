import { motion } from 'framer-motion'
import { PageSEO } from '../src/components/SEO'
import { SimpleLayout } from '../src/components/SimpleLayout'
import ContactPurpleBlock from '../src/components/ContactPurpleBlock'
import { Container } from '../src/components/Container'
import { ProjectCard } from '../src/components/ProjectCard'
import { projectsData } from '../src/data/projectsData'
import { getProjectsPage, getProjects } from '../lib/sanity-queries'

// Merge CMS projects (first) with hard-coded projects; deduplicate by slug (CMS wins)
function mergeProjects(cmsProjects, legacyProjects) {
  const cms = cmsProjects ?? []
  const legacy = legacyProjects ?? []
  const cmsSlugs = new Set(cms.map((p) => p.slug?.current ?? p.slug ?? ''))
  const legacyOnly = legacy.filter((p) => !cmsSlugs.has(p.slug ?? ''))
  return [...cms, ...legacyOnly]
}

export default function Projects({ projectsPageData, projects }) {
  const currentPageData = projectsPageData || {}
  const currentProjects = mergeProjects(projects, projectsData)

  // Sort projects by most recent year (descending)
  const sortedProjects = [...currentProjects].sort((a, b) => {
    // Extract the first year from timeline (handles ranges like '2020 - 2023')
    const getYear = (timeline) => {
      if (!timeline) return 0;
      const match = timeline.match(/\d{4}/g);
      return match ? parseInt(match[match.length - 1], 10) : 0;
    };
    return getYear(b.timeline) - getYear(a.timeline);
  });

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
          {sortedProjects.map((project) => (
            <ProjectCard 
              key={project.slug?.current || project.slug} 
              project={project} 
            />
          ))}
        </Container.Grid>
      </SimpleLayout>
      <Container>
        <ContactPurpleBlock className="mt-24 sm:mt-32 mb-16" />
      </Container>
    </>
  )
}

// Fetch data from Sanity at build time
export async function getStaticProps() {
  try {
    const [projectsPageData, projects] = await Promise.all([
      getProjectsPage(),
      getProjects()
    ])

    return {
      props: {
        projectsPageData: projectsPageData || null,
        projects: projects || []
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching projects page data:', error)
    
    return {
      props: {
        projectsPageData: null,
        projects: []
      },
      revalidate: 60,
    }
  }
}
