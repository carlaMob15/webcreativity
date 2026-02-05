import Head from 'next/head'
import { motion } from 'framer-motion'
import { Container } from '../src/components/Container'
import { ProjectCard } from '../src/components/ProjectCard'
import ContactPurpleBlock from '../src/components/ContactPurpleBlock'
import { FadeIn, FadeInStagger } from '../src/components/Motion'
import Link from 'next/link'
import { getSiteSettings, getFeaturedProjects, getHomePage } from '../lib/sanity-queries'
import siteMetadata from '../src/data/siteMetadata'
import { projectsData } from '../src/data/projectsData'

const Home = ({ siteSettings, projects, homePageData }) => {
  // Use Sanity data if available, otherwise fall back to static data
  const currentSiteSettings = siteSettings || siteMetadata
  const currentProjects = (projects && projects.length > 0) ? projects : projectsData
  const currentHomeData = homePageData || {}

  // Sort projects by most recent year (descending) - for static data
  const sortedProjects = [...currentProjects].sort((a, b) => {
    const getYear = (timeline) => {
      if (!timeline) return 0;
      const match = timeline.match(/\d{4}/g);
      return match ? parseInt(match[match.length - 1], 10) : 0;
    };
    return getYear(b.timeline) - getYear(a.timeline);
  });

  return (
    <>
      <Head>
        <title>{currentSiteSettings?.title || 'Web Creativity Studio | Thoughtful UX & UI Design'}</title>
        <meta name="description" content={currentSiteSettings?.description || 'Web Creativity Studio helps brands, artists, and founders solve complex problems through beautiful, thoughtful digital design.'} />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main className="relative">
        {/* Main Content */}
        <div className="relative z-0">
          {/* Hero Section */}
          <Container className="mt-24 sm:mt-32">
            <FadeIn>
              <div className="max-w-4xl">
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.35] md:leading-[1.5] lg:leading-[1.35] text-neutral-900 dark:text-neutral-100 mb-16 text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Senior Product Designer helping teams turn complex products into clear, usable experiences
                  <span className="inline-block align-baseline ml-1 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[rgb(99,102,241)]" style={{ verticalAlign: 'baseline' }}></span>
                </motion.h1>
                <div className="flex flex-col sm:flex-row items-start gap-8 mt-10 sm:mt-16 w-full">
                  {/* Image placeholder - circular; on mobile: larger and centered */}
                  <div className="flex-shrink-0 w-40 h-40 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full bg-amber-200 dark:bg-amber-300/60 flex items-center justify-center overflow-hidden self-center sm:self-auto">
                    <span className="text-neutral-500 dark:text-neutral-600 text-sm text-center px-2">Photo</span>
                  </div>
                  {/* Body Copy */}
                  <div className="text-lg text-neutral-800 dark:text-neutral-100 max-w-2xl text-left flex-1 min-w-0">
                    <div className="leading-relaxed">
                      <p className="mb-4">Hello, I&apos;m Carla - a UK-based Senior Product Designer (UI/UX) with 10+ years of experience designing clear, practical digital products across web and mobile.</p>
                      <p>I&apos;ve mainly worked on B2B SaaS and data-heavy platforms, including AI-led products, where the challenge is turning complex systems into calm, usable experiences and building design foundations teams can grow with.</p>
                    </div>
                  </div>
                </div>
                {/* Scroll to explore */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="flex flex-col items-center gap-2 mt-20 sm:mt-24"
                >
                  <span className="text-base md:text-lg text-neutral-400 font-medium">Scroll to explore</span>
                  <span className="text-xl md:text-2xl text-neutral-400 animate-bounce">↓</span>
                </motion.div>
              </div>
            </FadeIn>
          </Container>

          {/* Projects Grid */}
          <Container className="mt-32 sm:mt-40">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
                {currentHomeData.featuredWorkTitle || "Featured Work"}
              </h2>
              {currentHomeData.featuredWorkDescription && (
                <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
                  {currentHomeData.featuredWorkDescription}
                </p>
              )}
            </FadeIn>
            <Container.Grid 
              cols={1} 
              smCols={1} 
              mdCols={2} 
              gap={8}
              className="mt-16"
            >
              {sortedProjects
                .filter(project => project.title && (project.slug || project.slug?.current) && project.description)
                .slice(0, 5)
                .map((project) => (
                  <ProjectCard 
                    key={project.slug?.current || project.slug || project.title} 
                    project={project} 
                  />
                ))}
            </Container.Grid>
          </Container>

          {/* Contact Section */}
          <Container>
            <ContactPurpleBlock className="mt-24 sm:mt-32 mb-16" siteSettings={currentSiteSettings} />
          </Container>
        </div>
      </main>
    </>
  )
}

// Fetch data from Sanity at build time
export async function getStaticProps() {
  try {
    const [siteSettings, projects, homePageData] = await Promise.all([
      getSiteSettings(),
      getFeaturedProjects(),
      getHomePage()
    ])

    return {
      props: {
        siteSettings: siteSettings || null,
        projects: projects || [],
        homePageData: homePageData || null,
      },
      revalidate: 60, // Revalidate every minute
    }
  } catch (error) {
    console.error('Error fetching data from Sanity:', error)
    
    // Return fallback data if Sanity fails
    return {
      props: {
        siteSettings: null,
        projects: [],
        homePageData: null,
      },
      revalidate: 60,
    }
  }
}

export default Home
