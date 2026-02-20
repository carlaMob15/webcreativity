import Image from 'next/image';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useState, useEffect, useMemo } from 'react';
import { PortableText } from '@portabletext/react';
import { Container } from '../../src/components/Container';
import { ProjectCard } from '../../src/components/ProjectCard';
import SanityImage from '../../src/components/SanityImage';
import ZoomableSanityImage from '../../src/components/ZoomableSanityImage';
import ContactPurpleBlock from '../../src/components/ContactPurpleBlock';
import BackToTop from '../../src/components/BackToTop';
import { AvailableForWorkPill } from '../../src/components/AvailableForWorkPill';
import { getProjects, getProjectBySlug } from '../../lib/sanity-queries';
import { urlFor } from '../../lib/sanity';
import { normalizeSlug } from '../../lib/projectMerge';
import { SiFigma, SiReact, SiTailwindcss, SiNextdotjs, SiMongodb, SiStripe, SiStorybook, SiConfluence, SiJira, SiSketch, SiInvision, SiMiro } from 'react-icons/si';
import { HiMagnifyingGlass, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

// Replace undefined with null so Next.js getStaticProps can serialize (JSON does not support undefined)
function sanitizeForSerialization(value) {
  if (value === undefined) return null
  if (value === null || typeof value !== 'object') return value
  if (Array.isArray(value)) return value.map(sanitizeForSerialization)
  const out = {}
  for (const key of Object.keys(value)) {
    const v = value[key]
    out[key] = v === undefined ? null : sanitizeForSerialization(v)
  }
  return out
}

function normalizeCmsForCard(cmsProject) {
  if (!cmsProject) return null
  const slug = cmsProject.slug?.current ?? cmsProject.slug ?? ''
  const imageUrl = cmsProject.mainImage
    ? urlFor(cmsProject.mainImage).width(1200).quality(88).auto('format').url()
    : ''
  return {
    slug,
    title: cmsProject.title,
    image: imageUrl,
    projectType: Array.isArray(cmsProject.chips) && cmsProject.chips.length ? cmsProject.chips.join(', ') : '',
    shortDescription: cmsProject.thumbnailSummary || '',
    description: cmsProject.thumbnailSummary || '',
  }
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Inline SVGs with currentColor so each pill’s icon matches that pill’s darker tone (e.g. rose, amber)
function NotionIcon({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.716 29.2178L2.27664 24.9331C1.44913 23.9023 1 22.6346 1 21.3299V5.81499C1 3.86064 2.56359 2.23897 4.58071 2.10125L20.5321 1.01218C21.691 0.933062 22.8428 1.24109 23.7948 1.8847L29.3992 5.67391C30.4025 6.35219 31 7.46099 31 8.64426V26.2832C31 28.1958 29.4626 29.7793 27.4876 29.9009L9.78333 30.9907C8.20733 31.0877 6.68399 30.4237 5.716 29.2178Z"
        fill="currentColor"
      />
      {/* N character — light fill so it’s visible on the dark doc shape */}
      <path
        d="M11.2481 13.5787V13.3756C11.2481 12.8607 11.6605 12.4337 12.192 12.3982L16.0633 12.1397L21.417 20.0235V13.1041L20.039 12.9204V12.824C20.039 12.303 20.4608 11.8732 20.9991 11.8456L24.5216 11.6652V12.1721C24.5216 12.41 24.3446 12.6136 24.1021 12.6546L23.2544 12.798V24.0037L22.1906 24.3695C21.3018 24.6752 20.3124 24.348 19.8036 23.5803L14.6061 15.7372V23.223L16.2058 23.5291L16.1836 23.6775C16.1137 24.1423 15.7124 24.4939 15.227 24.5155L11.2481 24.6926C11.1955 24.1927 11.5701 23.7456 12.0869 23.6913L12.6103 23.6363V13.6552L11.2481 13.5787Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.6749 2.96678L4.72347 4.05585C3.76799 4.12109 3.02734 4.88925 3.02734 5.81499V21.3299C3.02734 22.1997 3.32676 23.0448 3.87843 23.7321L7.3178 28.0167C7.87388 28.7094 8.74899 29.0909 9.65435 29.0352L27.3586 27.9454C28.266 27.8895 28.9724 27.1619 28.9724 26.2832V8.64426C28.9724 8.10059 28.6979 7.59115 28.2369 7.27951L22.6325 3.49029C22.0613 3.10413 21.3702 2.91931 20.6749 2.96678ZM5.51447 6.057C5.29261 5.89274 5.3982 5.55055 5.6769 5.53056L20.7822 4.44711C21.2635 4.41259 21.7417 4.54512 22.1309 4.82088L25.1617 6.96813C25.2767 7.04965 25.2228 7.22563 25.0803 7.23338L9.08387 8.10336C8.59977 8.12969 8.12193 7.98747 7.73701 7.7025L5.51447 6.057ZM8.33357 10.8307C8.33357 10.311 8.75341 9.88177 9.29027 9.85253L26.203 8.93145C26.7263 8.90296 27.1667 9.30534 27.1667 9.81182V25.0853C27.1667 25.604 26.7484 26.0328 26.2126 26.0633L9.40688 27.0195C8.8246 27.0527 8.33357 26.6052 8.33357 26.0415V10.8307Z"
        fill="currentColor"
      />
    </svg>
  );
}
function CursorIcon({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 466.73 532.09"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M457.43,125.94L244.42,2.96c-6.84-3.95-15.28-3.95-22.12,0L9.3,125.94c-5.75,3.32-9.3,9.46-9.3,16.11v247.99c0,6.65,3.55,12.79,9.3,16.11l213.01,122.98c6.84,3.95,15.28,3.95,22.12,0l213.01-122.98c5.75-3.32,9.3-9.46,9.3-16.11v-247.99c0-6.65-3.55-12.79-9.3-16.11h-.01ZM444.05,151.99l-205.63,356.16c-1.39,2.4-5.06,1.42-5.06-1.36v-233.21c0-4.66-2.49-8.97-6.53-11.31L24.87,145.67c-2.4-1.39-1.42-5.06,1.36-5.06h411.26c5.84,0,9.49,6.33,6.57,11.39h-.01Z" />
    </svg>
  );
}


// Technology icons mapping
const techIcons = {
  'Figma': SiFigma,
  'React': SiReact,
  'Tailwind CSS': SiTailwindcss,
  'Next.js': SiNextdotjs,
  'MongoDB': SiMongodb,
  'Stripe': SiStripe,
  'Storybook': SiStorybook,
  'Confluence': SiConfluence,
  'Jira': SiJira,
  'Sketch': SiSketch,
  'InVision': SiInvision,
  'Miro': SiMiro,
  'Notion': NotionIcon,
  'Cursor': CursorIcon
};

// Expanded color palette for tags (light pills)
const tagColors = [
  'bg-indigo-100 text-indigo-800',
  'bg-violet-100 text-violet-800',
  'bg-pink-100 text-pink-800',
  'bg-amber-100 text-amber-800',
  'bg-teal-100 text-teal-800',
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-rose-100 text-rose-800',
  'bg-cyan-100 text-cyan-800',
  'bg-fuchsia-100 text-fuchsia-800',
  'bg-orange-100 text-orange-800',
  'bg-lime-100 text-lime-800',
];


export default function ProjectDetail({ project, otherProjects, slug: slugProp }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Derived values and hooks must run before any early return (rules-of-hooks)
  const otherProjectsList = otherProjects || [];
  const sections = Array.isArray(project?.sections) ? project.sections : [];
  const useCmsLayout = project && (project.mainImage != null || Array.isArray(project.sections) || (project.slug && typeof project.slug === 'object' && project.slug.current));
  const sanityHeroUrl = (img) => urlFor(img).width(2000).quality(88).auto('format').url();
  const sanityBodyUrl = (img) => urlFor(img).width(1600).quality(88).auto('format').url();
  const sanityModalUrl = (img) => urlFor(img).width(2400).quality(90).auto('format').url();

  const lightboxSlides = useMemo(() => {
    if (!project) return [];
    if (useCmsLayout) {
      const slides = [];
      if (project.mainImage?.asset) {
        try {
          slides.push({ src: sanityModalUrl(project.mainImage), alt: project.title || 'Project image' });
        } catch (_) {}
      }
      (project.sections || []).forEach((section) => {
        if (section._type === 'imageSection' && section.image?.asset) {
          try {
            slides.push({ src: sanityModalUrl(section.image), alt: section.alt || '' });
          } catch (_) {}
        }
        if (section._type === 'imageGridSection' && section.items) {
          (section.items || []).forEach((item) => {
            if (item.image?.asset) {
              try {
                slides.push({ src: sanityModalUrl(item.image), alt: item.alt || '' });
              } catch (_) {}
            }
          });
        }
      });
      return slides;
    }
    return [
      { src: project.image, alt: project.imageAlt || project.title },
      ...(project.gallery || []).map((image, index) => ({ src: image, alt: project.galleryAlt?.[index] || `Gallery image ${index + 1}` }))
    ];
  }, [useCmsLayout, project]);

  const galleryImages = useMemo(() => {
    if (!project || !useCmsLayout) return [];
    const list = [];
    if (project.mainImage?.asset) {
      list.push({ image: project.mainImage, alt: project.title || 'Project image' });
    }
    (project.sections || []).forEach((section) => {
      if (section._type === 'imageSection' && section.image?.asset) {
        list.push({ image: section.image, alt: section.alt || '' });
      }
      if (section._type === 'imageGridSection' && section.items) {
        (section.items || []).forEach((item) => {
          if (item.image?.asset) list.push({ image: item.image, alt: item.alt || '' });
        });
      }
    });
    return list;
  }, [useCmsLayout, project]);

  const galleryStartIndexBySection = useMemo(() => {
    if (!project || !useCmsLayout || !project.sections) return [];
    let index = project.mainImage?.asset ? 1 : 0;
    return project.sections.map((section) => {
      if (section._type === 'imageSection' && section.image?.asset) {
        const start = index;
        index += 1;
        return start;
      }
      if (section._type === 'imageGridSection' && section.items?.length) {
        const start = index;
        const count = section.items.filter((item) => item.image?.asset).length;
        index += count;
        return start;
      }
      return null;
    });
  }, [useCmsLayout, project]);

  if (!project) {
    return (
      <>
        <Head>
          <title>Project not found</title>
        </Head>
        <Container className="pt-24 pb-32 px-4 sm:px-8 md:px-12">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">Project not found</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              No project found for <strong>{slugProp || 'this slug'}</strong>. Check that the slug exists in Sanity (published).
            </p>
            <a href="/projects" className="inline-block text-indigo-600 dark:text-indigo-400 hover:underline">
              ← Back to projects
            </a>
          </div>
        </Container>
      </>
    );
  }

  const projectsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(otherProjectsList.length / projectsPerPage);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      position: 'absolute',
      width: '100%',
      scale: 0.95,
      zIndex: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
      width: '100%',
      scale: 1,
      zIndex: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      position: 'absolute',
      width: '100%',
      scale: 0.95,
      zIndex: 0
    })
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const currentProjects = otherProjectsList.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Head>
        <title>{project.title} - Project Details</title>
        <meta name="description" content={project.thumbnailSummary || project.intro || (project.description || '')} />
      </Head>

      <Container className="pt-24 pb-32 md:pt-32 md:pb-40 px-4 sm:px-8 md:px-12">
        <BackToTop />
        {useCmsLayout && (
          <>
            <motion.div
              className="max-w-3xl space-y-16 mb-24 md:mb-32 mx-auto"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <div className="space-y-8">
                {project.chips && project.chips.length > 0 && (
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {project.chips.map((chip, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight md:leading-tight">
                  {project.title}
                </h1>
                {project.intro && (
                  <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mt-4 whitespace-pre-line">
                    {project.intro}
                  </p>
                )}
              </div>
              {/* Meta block — 3 columns: Client | Year | Role; Tools full width below */}
              <div className="mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-10">
                  {project.client && (
                    <div>
                      <h3 className="text-sm text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-semibold mb-2">Client</h3>
                      <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1">{project.client}</p>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <h3 className="text-sm text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-semibold mb-2">Year</h3>
                      <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1">{project.year}</p>
                    </div>
                  )}
                  {project.role && (
                    <div className="min-w-0">
                      <h3 className="text-sm text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-semibold mb-2">Role</h3>
                      <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1">{project.role}</p>
                    </div>
                  )}
                </div>
                {project.tools && project.tools.length > 0 && (
                  <div className="mt-14">
                    <h3 className="text-sm text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-semibold mb-2">Tools</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tools.map((tool, index) => {
                        const trimmed = tool.trim();
                        const Icon = techIcons[trimmed];
                        const colorClass = tagColors[index % tagColors.length];
                        return (
                          <span
                            key={index}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm ${colorClass}`}
                          >
                            {Icon && <Icon className="h-4 w-4" />}
                            <span>{trimmed}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            {/* Hero: mainImage — zoomable with shared overlay + lightbox */}
            {galleryImages.length > 0 && (
              <motion.div
                className="w-full mb-24 md:mb-32 rounded-3xl overflow-hidden shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ZoomableSanityImage
                  image={galleryImages[0].image}
                  alt={galleryImages[0].alt}
                  index={0}
                  onImageClick={handleImageClick}
                  priority
                  className="w-full h-auto rounded-3xl"
                  roundedClass="rounded-3xl"
                />
              </motion.div>
            )}
            {/* Sections */}
            <motion.div
              className="space-y-20 md:space-y-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {sections.map((section, idx) => {
                if (section._type === 'textSection') {
                  return (
                    <div key={section._key || idx} className="space-y-6">
                      {section.heading && (
                        <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
                      )}
                      {section.content && (
                        <div className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 prose prose-zinc dark:prose-invert max-w-none">
                          <PortableText value={section.content} />
                        </div>
                      )}
                    </div>
                  );
                }
                if (section._type === 'imageSection' && section.image) {
                  const isWide = section.width === 'wide';
                  const galleryIndex = galleryStartIndexBySection[idx];
                  if (galleryIndex == null) return null;
                  return (
                    <div key={section._key || idx} className="space-y-4">
                      <div className={`w-full ${isWide ? 'max-w-full' : 'max-w-4xl mx-auto'}`}>
                        <ZoomableSanityImage
                          image={section.image}
                          alt={section.alt || ''}
                          index={galleryIndex}
                          onImageClick={handleImageClick}
                          priority={false}
                          className="w-full h-auto rounded-2xl"
                          roundedClass="rounded-2xl"
                        />
                      </div>
                      {section.caption && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">{section.caption}</p>
                      )}
                    </div>
                  );
                }
                if (section._type === 'imageGridSection' && section.items && section.items.length > 0) {
                  const cols = section.columns === 4 ? 4 : section.columns === 3 ? 3 : 2;
                  const sectionStart = galleryStartIndexBySection[idx];
                  return (
                    <div key={section._key || idx} className="space-y-6">
                      {section.heading && (
                        <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
                      )}
                      <div className={`grid grid-cols-1 gap-8 ${cols >= 2 ? 'md:grid-cols-2' : ''} ${cols >= 3 ? 'lg:grid-cols-3' : ''} ${cols >= 4 ? 'xl:grid-cols-4' : ''}`}>
                        {section.items.map((item, i) => {
                          if (!item.image?.asset || sectionStart == null) return null;
                          const galleryIndex = sectionStart + section.items.slice(0, i).filter((it) => it.image?.asset).length;
                          return (
                            <div key={i} className="space-y-2">
                              <ZoomableSanityImage
                                image={item.image}
                                alt={item.alt || ''}
                                index={galleryIndex}
                                onImageClick={handleImageClick}
                                priority={false}
                                className="w-full h-auto rounded-2xl"
                                roundedClass="rounded-2xl"
                              />
                              {item.caption && (
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.caption}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </motion.div>
          </>
        )}
      </Container>

      {/* More Projects Section with Background */}
      <div className="relative w-full mt-40 md:mt-48">
        {/* Full width background */}
        <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-900/50" aria-hidden="true" />
        {/* Content aligned with main content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-16 md:mb-20">
              <h2 className="text-2xl font-semibold tracking-tight">More projects</h2>
            </div>
            <div className="relative">
              <div className="min-h-[400px] md:min-h-[600px] relative overflow-hidden">
                <AnimatePresence initial={false} custom={currentPage} mode="sync">
                  <motion.div
                    key={currentPage}
                    custom={currentPage}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { 
                        type: "spring", 
                        stiffness: 150, 
                        damping: 20,
                        mass: 1
                      },
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.4 }
                    }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                  >
                    {currentProjects.map((project, index) => (
                      <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.5,
                          delay: isMobile ? 0 : index * 0.1,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        className="h-full"
                      >
                        <ProjectCard
                          project={project}
                          noBackground
                          hideTags
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Navigation Arrows */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 space-x-4">
                  <motion.button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      currentPage === 0
                        ? 'text-zinc-400 cursor-not-allowed'
                        : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                    }`}
                    aria-label="Previous projects"
                  >
                    <HiChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.span 
                    className="text-sm text-zinc-600 dark:text-zinc-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {currentPage + 1} of {totalPages}
                  </motion.span>
                  <motion.button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      currentPage === totalPages - 1
                        ? 'text-zinc-400 cursor-not-allowed'
                        : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                    }`}
                    aria-label="Next projects"
                  >
                    <HiChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Work Together Section – same width as homepage scrolling cards */}
      <ContactPurpleBlock className="mt-24 sm:mt-32 mb-16" />
      <AvailableForWorkPill scrollThreshold={250} />

      {/* Lightbox Gallery */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={Math.min(currentImageIndex, Math.max(0, lightboxSlides.length - 1))}
        slides={lightboxSlides}
        carousel={{
          padding: "16px",
          spacing: "16px",
        }}
        animation={{ fade: 500 }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
          },
          slide: {
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            padding: "64px",
            "@media (max-width: 768px)": {
              padding: "16px",
            },
          },
          slideImage: {
            borderRadius: "24px",
            overflow: "hidden",
          },
          button: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            borderRadius: "50%",
            padding: "12px",
            color: "white",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 1px 1px rgba(0, 0, 0, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: "scale(1.05) translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              color: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            },
            "&:active": {
              transform: "scale(0.98) translateY(0)",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            },
            "@media (max-width: 768px)": {
              padding: "8px",
            },
          },
          close: {
            position: "absolute",
            top: "16px",
            right: "16px",
            padding: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            borderRadius: "50%",
            color: "white",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 1px 1px rgba(0, 0, 0, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: "scale(1.05) translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              color: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            },
            "&:active": {
              transform: "scale(0.98) translateY(0)",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            },
            "&::after": {
              content: '"Close"',
              position: "absolute",
              bottom: "-24px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              fontSize: "12px",
              whiteSpace: "nowrap",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
            },
            "@media (max-width: 768px)": {
              padding: "8px",
            },
          },
          navigation: {
            container: {
              position: "absolute",
              bottom: "32px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "160px",
              padding: "0 32px",
              "@media (max-width: 768px)": {
                bottom: "24px",
                gap: "120px",
                padding: "0 24px",
              },
            },
            prev: {
              position: "relative",
              left: "auto",
              transform: "none",
            },
            next: {
              position: "relative",
              left: "auto",
              transform: "none",
            },
          },
        }}
      />
    </>
  );
}

export async function getStaticPaths() {
  let cmsSlugs = [];
  try {
    const cmsProjects = await getProjects();
    cmsSlugs = (cmsProjects || []).map((p) => p.slug?.current ?? p.slug).filter(Boolean);
  } catch (e) {
    console.warn('getStaticPaths: getProjects failed', e?.message);
  }
  const slugs = [...new Set(cmsSlugs.map(normalizeSlug))];
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const rawSlug = params?.slug;
  if (!rawSlug) return { notFound: true };
  const slug = typeof rawSlug === 'string' ? rawSlug.toLowerCase().trim() : rawSlug;

  let cmsProject = null;
  let cmsProjects = [];
  try {
    [cmsProject, cmsProjects] = await Promise.all([
      getProjectBySlug(slug),
      getProjects(),
    ]);
  } catch (e) {
    console.warn('getStaticProps: Sanity fetch failed', e?.message);
  }

  const normalizedCmsForCard = (cmsProjects || []).map(normalizeCmsForCard).filter(Boolean);
  const otherProjects = normalizedCmsForCard.filter((p) => normalizeSlug(p.slug) !== slug);

  if (cmsProject) {
    return { props: sanitizeForSerialization({ project: cmsProject, otherProjects, slug }), revalidate: 60 };
  }

  return { notFound: true };
}
 