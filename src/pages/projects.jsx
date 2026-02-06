import { motion } from 'framer-motion'
import { PageSEO } from '../components/SEO'
import { SimpleLayout } from '../components/SimpleLayout'
import ContactPurpleBlock from '../components/ContactPurpleBlock'
import { AvailableForWorkPill } from '../components/AvailableForWorkPill'
import { Container } from '../components/Container'
import { ProjectCard } from '../components/ProjectCard'
import { projectsData } from '../data/projectsData'
import { getProjectsPage, getProjects } from '../../lib/sanity-queries'

export default function Projects({ projectsPageData, projects }) {
  // Use Sanity data if available, otherwise fall back to static data
  const currentPageData = projectsPageData || {}
  const currentProjects = (projects && projects.length > 0) ? projects : projectsData

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
      <ContactPurpleBlock className="mt-24 sm:mt-32 mb-16" />
      <AvailableForWorkPill scrollThreshold={250} />
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
