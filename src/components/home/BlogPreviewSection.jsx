import Image from 'next/image'
import { ArrowUpRightIcon } from '../ProjectCard'
import { Container } from '../Container'
import { FadeIn } from '../Motion'

const SECTION_HEADING_ID = 'writing-reflections-heading'
const SECTION_DESC_ID = 'writing-reflections-description'

function formatPostDate(isoOrString) {
  if (!isoOrString) return ''
  const d = new Date(isoOrString)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function BlogPostCard({ post, titleId }) {
  const dateLabel = formatPostDate(post.publishedAt)

  return (
    <article className="min-w-0 flex-1">
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-labelledby={titleId}
        className="group block overflow-hidden rounded-2xl bg-white transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(99,102,241)] focus-visible:ring-offset-2 dark:bg-neutral-900 dark:focus-visible:ring-offset-neutral-900"
      >
        <div className="overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 group-hover:shadow-md">
          {/* 16:9 — use arbitrary aspect-[16/9] (not aspect-video): legacy @tailwindcss/aspect-ratio plugin does not ship aspect-video, so the box collapsed to 0 height and fill images disappeared */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            {post.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out transform-gpu group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div
                className="absolute inset-0 bg-neutral-300 dark:bg-neutral-700"
                aria-hidden
              />
            )}
          </div>
        </div>

        <div className="p-6">
          {dateLabel ? (
            <span className="mb-2 block text-sm font-medium text-neutral-500 transition-colors duration-300 group-hover:text-[rgb(99,102,241)] dark:text-neutral-400">
              {dateLabel}
            </span>
          ) : null}
          <div className="flex items-start justify-between gap-4">
            <h3
              id={titleId}
              className="min-w-0 flex-1 text-2xl font-bold text-neutral-900 transition-colors duration-300 group-hover:text-[rgb(99,102,241)] dark:text-white"
            >
              {post.title}
            </h3>
            <span
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[rgb(99,102,241)] bg-transparent text-[rgb(99,102,241)] transition-colors duration-300 group-hover:bg-[rgb(99,102,241)] group-hover:text-white"
              aria-hidden
            >
              <ArrowUpRightIcon />
            </span>
          </div>
          {post.excerpt ? (
            <p className="mt-2 text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-300">
              {post.excerpt}
            </p>
          ) : null}
        </div>
      </a>
    </article>
  )
}

export default function BlogPreviewSection({ posts = [] }) {
  if (!posts.length) return null

  return (
    <section
      aria-labelledby={SECTION_HEADING_ID}
      aria-describedby={SECTION_DESC_ID}
    >
      <Container className="mt-24 sm:mt-32">
        <div className="flex flex-col gap-10">
          <FadeIn>
            <div className="flex w-full min-w-0 flex-col gap-8">
              <h2
                id={SECTION_HEADING_ID}
                className="text-4xl font-semibold tracking-tight text-black dark:text-neutral-100"
              >
                Writing &amp; reflections
              </h2>
              <p
                id={SECTION_DESC_ID}
                className="w-full min-w-0 text-lg text-[#1e1e1e] dark:text-neutral-300"
              >
                I write about product design, creative work, and the thinking behind
                what I make, from complex systems and usability to broader ideas and
                reflections.
              </p>
            </div>
          </FadeIn>

          <ul className="flex w-full list-none flex-col gap-8 p-0 md:flex-row md:gap-10">
            {posts.map((post, index) => (
              <li key={post.link} className="min-w-0 flex-1">
                <BlogPostCard
                  post={post}
                  titleId={`blog-preview-title-${index}`}
                />
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center md:mt-12">
            <FadeIn>
              <a
                href="https://medium.com/@wcwebcreativity"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-base font-medium border-2 border-[rgb(99,102,241)] text-[rgb(99,102,241)] hover:bg-[rgb(99,102,241)] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[rgb(99,102,241)] focus:ring-offset-2"
                aria-label="View all articles on Medium (opens in a new tab)"
              >
                View all articles
              </a>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  )
}
