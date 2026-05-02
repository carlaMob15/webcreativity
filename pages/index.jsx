import Head from 'next/head'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Container } from '../src/components/Container'
import { AvailableForWorkPill } from '../src/components/AvailableForWorkPill'
import { ProjectCard } from '../src/components/ProjectCard'
import ContactPurpleBlock from '../src/components/ContactPurpleBlock'
import WhatICanHelpWith from '../src/components/WhatICanHelpWith'
import HomeHowIWorkSection from '../src/components/home/HomeHowIWorkSection'
import BlogPreviewSection from '../src/components/home/BlogPreviewSection'
import OptimizedImage from '../src/components/OptimizedImage'
import { FadeIn, FadeInStagger } from '../src/components/Motion'
import Link from 'next/link'
import { getSiteSettings, getFeaturedProjects, getHomePage } from '../lib/sanity-queries'
import { getLatestMediumPosts } from '../lib/medium-rss'
import { urlFor } from '../lib/sanity'
import siteMetadata from '../src/data/siteMetadata'
function normalizeFeaturedProject(cmsProject) {
  if (!cmsProject) return null
  const slug = cmsProject.slug?.current ?? cmsProject.slug ?? ''
  const imageUrl = cmsProject.mainImage
    ? urlFor(cmsProject.mainImage).width(1600).quality(88).auto('format').url()
    : ''
  return {
    slug,
    title: cmsProject.title,
    image: imageUrl,
    mainImage: cmsProject.mainImage?.asset ? cmsProject.mainImage : null,
    shortDescription: cmsProject.thumbnailSummary || '',
    description: cmsProject.thumbnailSummary || '',
    client: cmsProject.client || '',
    timeline: cmsProject.year || '',
  }
}

function getFeaturedProjectsList(cmsFeatured) {
  const normalized = (cmsFeatured || []).map(normalizeFeaturedProject).filter(Boolean)
  const getYear = (timeline) => {
    if (!timeline) return 0
    const match = String(timeline).match(/\d{4}/g)
    return match ? parseInt(match[match.length - 1], 10) : 0
  }
  return normalized.sort((a, b) => getYear(b.timeline) - getYear(a.timeline)).slice(0, 3)
}

const Home = ({ siteSettings, homePageData, featuredProjects, mediumPosts }) => {
  const heroRef = useRef(null)
  const currentSiteSettings = siteSettings || siteMetadata
  const currentHomeData = homePageData || {}
  const featured = featuredProjects || []

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
          <Container ref={heroRef} className="mt-24 sm:mt-32">
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
                  {/* Hero avatar - circular; on mobile: larger and centered */}
                  <div className="relative flex-shrink-0 w-40 h-40 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden self-center sm:self-auto">
                    <OptimizedImage
                      src="/images/hero-avatar.jpg?v=2"
                      alt="Carla"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 144px, 176px"
                      priority
                    />
                  </div>
                  {/* Body Copy */}
                  <div className="text-lg text-neutral-800 dark:text-neutral-100 max-w-2xl text-left flex-1 min-w-0">
                    <div className="leading-relaxed">
                      <p className="mb-4">Hello, I&apos;m Carla — a UK-based Senior Product Designer (UI/UX) with 10+ years of experience designing clear, practical digital products across web and mobile.</p>
                      <p>I&apos;ve mostly worked on B2B SaaS and data-heavy platforms, including AI-led products, helping teams make complex systems clear, structured, and usable. I bring that same approach to any product that values clarity, structure, and thoughtful design.</p>
                    </div>
                  </div>
                </div>
                {/* Scroll to explore – extra padding so it stays visible above the stacking cards */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="relative z-10 flex flex-col items-center gap-2 mt-20 sm:mt-24 pb-24 md:pb-32"
                >
                  <span className="text-base md:text-lg text-neutral-400 font-medium">Scroll to explore</span>
                  <span className="text-xl md:text-2xl text-neutral-400 animate-bounce">↓</span>
                </motion.div>
              </div>
            </FadeIn>
          </Container>

          {/* What I can help with – scroll-driven stacking cards */}
          <WhatICanHelpWith />

          {/* Featured projects */}
          <Container className="mt-32 sm:mt-40">
            <FadeIn>
              <div className="min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
                  Featured projects
                </h2>
                <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
                  A selection of recent work, focused on complex products, real constraints, and practical outcomes.
                </p>
              </div>
            </FadeIn>
            <div className="mt-12 md:mt-16 space-y-8 md:space-y-10">
              {featured[0] && (
                <div className="w-full">
                  <ProjectCard
                    key={featured[0].slug || featured[0].title}
                    project={featured[0]}
                    hideTags
                  />
                </div>
              )}
              {featured.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {featured.slice(1, 3).map((project) => (
                    <ProjectCard
                      key={project.slug || project.title}
                      project={project}
                      hideTags
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="mt-10 md:mt-12 flex justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-base font-medium border-2 border-[rgb(99,102,241)] text-[rgb(99,102,241)] hover:bg-[rgb(99,102,241)] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[rgb(99,102,241)] focus:ring-offset-2"
              >
                See more projects
              </Link>
            </div>
          </Container>

          {/* How I work – dark section, content matches container width, chips edge to edge */}
          <div className="mt-24 sm:mt-32">
            <HomeHowIWorkSection />
          </div>

          <BlogPreviewSection posts={mediumPosts || []} />

          {/* Contact Section – same width as scrolling cards (max-w-5xl lg:max-w-7xl) */}
          <ContactPurpleBlock className="mt-24 sm:mt-32 mb-16" siteSettings={currentSiteSettings} />
        </div>
        <AvailableForWorkPill heroRef={heroRef} />
      </main>
    </>
  )
}

// Fetch data from Sanity at build time
export async function getStaticProps() {
  try {
    const [siteSettings, cmsFeatured, homePageData, mediumPosts] =
      await Promise.all([
        getSiteSettings(),
        getFeaturedProjects(),
        getHomePage(),
        getLatestMediumPosts(2),
      ])

    const featuredProjects = getFeaturedProjectsList(cmsFeatured)

    return {
      props: {
        siteSettings: siteSettings || null,
        homePageData: homePageData || null,
        featuredProjects,
        mediumPosts,
      },
      // Align with Medium RSS refresh cadence (6h); ISR updates writing section automatically
      revalidate: 21600,
    }
  } catch (error) {
    console.error('Error fetching data from Sanity:', error)

    const featuredProjects = getFeaturedProjectsList([])
    let mediumPosts = []
    try {
      mediumPosts = await getLatestMediumPosts(2)
    } catch {
      mediumPosts = []
    }

    return {
      props: {
        siteSettings: null,
        homePageData: null,
        featuredProjects,
        mediumPosts,
      },
      revalidate: 21600,
    }
  }
}

export default Home
