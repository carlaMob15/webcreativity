import OptimizedImage from './OptimizedImage'
import SanityImage from './SanityImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const ArrowIcon = () => (
  <svg
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke="rgb(99,102,241)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-all duration-500 ease-out"
    />
  </svg>
)

const ArrowUpRightIcon = ({ className = '' }) => (
  <svg
    className={clsx('w-5 h-5 transition-colors duration-300', className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function ProjectCard({ project, className, noBackground, hideTags }) {
  const router = useRouter()
  if (!project) return null
  const slug = project.slug?.current ?? project.slug ?? ''

  const handleViewProject = (e) => {
    e.preventDefault()
    router.push(`/projects/${slug}`)
  }

  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      className={clsx(
        "group relative overflow-hidden rounded-2xl",
        noBackground
          ? "bg-transparent"
          : "bg-white dark:bg-neutral-900",
        "transition-all duration-500",
        "focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[rgb(99,102,241)] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900",
        className
      )}
      role="article"
      tabIndex="0"
    >
      <Link 
        href={`/projects/${slug}`}
        className="block rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[rgb(99,102,241)] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900 overflow-hidden"
        aria-label={`View project: ${project.title}`}
      >
        {project.mainImage ? (
          <SanityImage
            image={project.mainImage}
            alt={`${project.title} project preview`}
            priority={false}
            className="w-full h-auto rounded-2xl"
          />
        ) : (
          <div className="block relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <OptimizedImage
              src={project.image || "/placeholder.jpg"}
              alt={`${project.title} project preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              quality={85}
            />
          </div>
        )}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />
        {!hideTags && (
          <div className="absolute bottom-4 right-4">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-4 group-hover:translate-y-0">
              <button 
                onClick={handleViewProject}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-white/20 hover:bg-white/70 transition-all duration-500 ease-out cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[rgb(99,102,241)] focus-visible:ring-offset-2"
                aria-label={`View project details: ${project.title}`}
              >
                <ArrowIcon />
              </button>
            </div>
          </div>
        )}
      </Link>
      
      <div className="p-6">
        {hideTags ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <Link 
                href={`/projects/${slug}`}
                className="cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[rgb(99,102,241)] focus-visible:ring-offset-2 rounded-lg min-w-0 flex-1"
              >
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-[rgb(99,102,241)] transition-colors duration-300">
                  {project.title}
                </h3>
              </Link>
              <Link
                href={`/projects/${slug}`}
                className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-[rgb(99,102,241)] text-[rgb(99,102,241)] bg-transparent group-hover:bg-[rgb(99,102,241)] group-hover:text-white transition-colors duration-300 focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[rgb(99,102,241)] focus-visible:ring-offset-2"
                aria-label={`View project: ${project.title}`}
              >
                <ArrowUpRightIcon />
              </Link>
            </div>
          </>
        ) : (
          <>
            <span 
              className="text-sm font-medium text-neutral-500 dark:text-neutral-400 block mb-2 transition-colors duration-300 group-hover:text-[rgb(99,102,241)]"
              aria-label={`Project type: ${project.projectType || project.category || project.client}`}
            >
              {project.projectType ? (
                <span className="flex flex-wrap gap-2">
                  {project.projectType.split(',').map((type, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors duration-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                    >
                      {type.trim()}
                    </span>
                  ))}
                </span>
              ) : (
                project.category || project.client
              )}
            </span>
            <div className="flex items-center justify-between">
              <Link 
                href={`/projects/${slug}`}
                className="cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[rgb(99,102,241)] focus-visible:ring-offset-2 rounded-lg"
              >
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-[rgb(99,102,241)] transition-colors duration-300">
                  {project.title}
                </h3>
              </Link>
            </div>
          </>
        )}
        <p 
          className="text-neutral-600 dark:text-neutral-400 mt-2 transition-colors duration-300 group-hover:text-neutral-700 dark:group-hover:text-neutral-300"
          aria-label={`Project description: ${project.shortDescription || project.description}`}
        >
          {project.shortDescription || project.description}
        </p>
      </div>
    </motion.div>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    mainImage: PropTypes.object,
    projectType: PropTypes.string,
    category: PropTypes.string,
    client: PropTypes.string,
    timeline: PropTypes.string,
    description: PropTypes.string,
    shortDescription: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  noBackground: PropTypes.bool,
  hideTags: PropTypes.bool,
}

ProjectCard.defaultProps = {
  className: '',
  noBackground: false,
  hideTags: false,
} 