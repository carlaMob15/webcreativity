import Image from 'next/image'
import { Container } from '../src/components/Container'
import { PageSEO } from '../src/components/SEO'
import siteMetadata from '../src/data/siteMetadata'
import ContactPurpleBlock from '../src/components/ContactPurpleBlock'
import { AvailableForWorkPill } from '../src/components/AvailableForWorkPill'
import ServicesAccordion from '../src/components/ServicesAccordion'
import ProcessBentoSection from '../src/components/ProcessBentoSection'
import ValuesSlidingCards from '../src/components/ValuesSlidingCards'
import UxUiIcon from '../src/images/icons/UxUiIcon'
import LightBulbIcon from '../src/images/icons/LightBulbIcon'
import FrontendIcon from '../src/images/icons/FrontendIcon'
import { getAboutPage } from '../lib/sanity-queries'
import { urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'

// Icon color: pass 'white' for accordion (dark bg), otherwise indigo
const ICON_INDIGO = 'rgb(99 102 241)'
const ICON_WHITE = 'white'

// Icon component mapper (about page – content from About page Sanity doc)
const getServiceIcon = (iconType, customIcon, customIconImage, iconColor) => {
  const color = iconColor === 'white' ? ICON_WHITE : ICON_INDIGO
  if (customIcon) {
    const iconUrl = urlFor(customIcon).width(32).height(32).url();
    return (
      <img
        src={iconUrl}
        alt="Service icon"
        width={32}
        height={32}
        style={{ display: 'block', filter: color === ICON_WHITE ? 'brightness(0) invert(1)' : undefined }}
      />
    );
  }
  switch (iconType) {
    case 'uxui':
      return <UxUiIcon stroke={color} fill={color} />
    case 'systems':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'product':
      return <LightBulbIcon fill={color} />
    case 'frontend':
      return <FrontendIcon stroke={color} />
    case 'creativity':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9H9.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 9H15.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'custom':
      return null;
    case 'custom-image':
      return customIconImage ? (
        <Image
          src={urlFor(customIconImage).width(32).height(32).url()}
          alt={customIconImage.alt || 'Service icon'}
          width={32}
          height={32}
          style={color === ICON_WHITE ? { filter: 'brightness(0) invert(1)' } : undefined}
        />
      ) : null
    default:
      return <div className="w-8 h-8 bg-indigo-500 rounded" style={color === ICON_WHITE ? { backgroundColor: 'white' } : undefined} />
  }
}

// Static fallback data (about page content from Sanity)
const fallbackData = {
  heroTitle: "Clean, Inclusive, Human-Centred Design",
  heroDescription: [
    {
      _type: 'block',
      children: [
        { _type: 'span', text: "Web Creativity Studio is a UK-based creative studio led by Carla Castillo, a Senior Product UX/UI Designer passionate about functional, inclusive, user-centred design." }
      ]
    },
    {
      _type: 'block',
      children: [
        { _type: 'span', text: "We collaborate with clients across the UK and Europe to craft intuitive websites and apps, digital products, and visual identities that connect — and make a lasting impact." }
      ]
    }
  ],
  servicesTitle: "What we do",
  servicesIntro: null,
  services: [
    { title: 'UX & UI Design', description: "We design digital experiences that are clear, functional, and visually engaging — tailored for real users on web and mobile.", iconType: 'uxui' },
    { title: 'Design Systems & Accessibility', description: "From scalable design systems to accessible components, we help teams build consistent, inclusive experiences that are easy to maintain and use.", iconType: 'systems' },
    { title: 'Product & Platform Design', description: "We specialise in UX/UI for SaaS, B2B, and e-commerce products — helping turn complex functionality into simple, intuitive interfaces.", iconType: 'product' },
    { title: 'Frontend-Aware Design', description: "We understand how digital products are built. Our designs are created with development in mind — meaning fewer handoff headaches and better implementation.", iconType: 'frontend' },
    { title: 'Creativity & Fun at Heart', description: "We like to work with teams to learn and explore new ideas together while having fun — because work doesn't have to be serious to be successful.", iconType: 'creativity' }
  ],
  aboutTitle: "A bit more about me",
  aboutDescription: [
    { _type: 'block', children: [{ _type: 'span', text: "I'm a Senior Product UX/UI Designer originally from Panama, now based in the UK." }] },
    { _type: 'block', children: [{ _type: 'span', text: "My path into design began by exploring how things work under the hood. I started my career as a front-end designer before moving into design fully — a journey that gave me a strong foundation for creating practical, buildable solutions." }] },
    { _type: 'block', children: [{ _type: 'span', text: "Over the years, I've worked with start-ups, studios, and organisations across Italy, Germany, and the UK — shaping digital products and strategies that put people first. While I enjoy the full design process, I have a particular love for visual design (UI) and inclusive systems that scale." }] },
    { _type: 'block', children: [{ _type: 'span', text: "And although I spend my days in the digital world, I still start every project the old-school way: pen and paper first, always." }] },
    { _type: 'block', children: [{ _type: 'span', text: "When I'm not designing, you'll probably find me experimenting in the kitchen, learning a new language, or chasing after my daughter." }] },
    { _type: 'block', children: [{ _type: 'span', text: "My family is at the centre of everything I do. They remind me daily that simplicity matters — and that maintaining a healthy work/life balance is key to showing up as my best self in both worlds." }] }
  ]
}

export async function getStaticProps() {
  try {
    const aboutPageData = await getAboutPage()
    return {
      props: {
        aboutPageData: aboutPageData || null,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching about page data:', error)
    return {
      props: {
        aboutPageData: null,
      },
      revalidate: 60,
    }
  }
}

const About = ({ aboutPageData }) => {
  const data = aboutPageData || fallbackData

  return (
    <>
      <PageSEO
        title="About"
        description="About Carla Castillo and Web Creativity Studio — UX/UI design, how we work, and what we do."
        canonical="/about"
      />

      {/* Hero Section */}
      <Container className="mt-24 sm:mt-40 mb-4">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.5] md:leading-[2] lg:leading-[1.5] text-neutral-900 dark:text-neutral-100 mb-8 text-left">
            {data.heroTitle}
            <span className="inline-block align-baseline ml-2 w-2.5 h-2.5 md:w-4 md:h-4 rounded-full bg-[rgb(99,102,241)]" style={{ verticalAlign: 'baseline' }}></span>
          </h1>
          <div className="text-lg text-neutral-600 dark:text-neutral-400 mb-4 text-left">
            {data.heroDescription ? (
              Array.isArray(data.heroDescription) ? (
                <PortableText
                  value={data.heroDescription}
                  components={{
                    block: {
                      normal: ({ children }) => <p className="mb-4">{children}</p>,
                    },
                  }}
                />
              ) : typeof data.heroDescription === 'string' ? (
                <p className="mb-4">{data.heroDescription}</p>
              ) : (
                <PortableText
                  value={[data.heroDescription]}
                  components={{
                    block: {
                      normal: ({ children }) => <p className="mb-4">{children}</p>,
                    },
                  }}
                />
              )
            ) : (
              <>
                <p className="mb-4">
                  Web Creativity Studio is a UK-based creative studio led by Carla Castillo, a Senior Product UX/UI Designer passionate about functional, inclusive, user-centred design.
                </p>
                <p className="mb-4">
                  We collaborate with clients across the UK and Europe to craft intuitive websites and apps, digital products, and visual identities that connect — and make a lasting impact.
                </p>
              </>
            )}
          </div>
        </div>
      </Container>

      {/* Services Section – Accordion (dark) */}
      <div className="mt-28 sm:mt-36">
        <ServicesAccordion
          title={data.servicesTitle || 'What we do'}
          intro={data.servicesIntro}
          services={data.services || fallbackData.services}
          getServiceIcon={(iconType, customIcon, customIconImage) =>
            getServiceIcon(iconType, customIcon, customIconImage, 'white')
          }
        />
      </div>

      {/* My Process – Bento */}
      {data.processSteps && data.processSteps.length > 0 && (
        <div className="mt-28 sm:mt-36">
          <ProcessBentoSection
            title={data.processTitle || 'My process'}
            intro={data.processIntro}
            steps={data.processSteps}
            processDotColor={data.processDotColor}
          />
        </div>
      )}

      {/* What I Care About – Sliding cards (same as Home) */}
      {data.valuesItems && data.valuesItems.length > 0 && (
        <div className="mt-28 sm:mt-36">
          <ValuesSlidingCards
            title={data.valuesTitle || 'What I care about'}
            items={data.valuesItems}
          />
        </div>
      )}

      {/* A bit more about me – single image */}
      <Container className="mt-28 sm:mt-36 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col justify-center max-w-xl mx-auto lg:mx-0 order-2 lg:order-1">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl mb-8">
              {data.aboutTitle || "A bit more about me"}
            </h2>
            <div className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              {Array.isArray(data.aboutDescription) ? (
                <PortableText
                  value={data.aboutDescription}
                  components={{
                    block: {
                      normal: ({ children }) => <p className="mb-4">{children}</p>,
                    },
                  }}
                />
              ) : data.aboutDescription ? (
                <p style={{ whiteSpace: 'pre-line' }}>{data.aboutDescription}</p>
              ) : (
                <p>
                  I'm a Senior Product UX/UI Designer originally from Panama, now based in the UK.<br /><br />
                  My path into design began by exploring how things work under the hood. I started my career as a front-end designer before moving into design fully — a journey that gave me a strong foundation for creating practical, buildable solutions.<br /><br />
                  Over the years, I've worked with start-ups, studios, and organisations across Italy, Germany, and the UK — shaping digital products and strategies that put people first. While I enjoy the full design process, I have a particular love for visual design (UI) and inclusive systems that scale.<br /><br />
                  And although I spend my days in the digital world, I still start every project the old-school way: pen and paper first, always.<br /><br />
                  When I'm not designing, you'll probably find me experimenting in the kitchen, learning a new language, or chasing after my daughter.<br /><br />
                  My family is at the centre of everything I do. They remind me daily that simplicity matters — and that maintaining a healthy work/life balance is key to showing up as my best self in both worlds.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center order-1 lg:order-2 w-full gap-6">
            <div className="relative w-full max-w-md min-h-[280px] sm:min-h-[360px] aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={data.aboutMainImage ? urlFor(data.aboutMainImage).width(800).height(800).url() : '/images/services/Carla.jpg'}
                alt={data.aboutMainImage?.alt || "Carla Castillo - Senior Product UX/UI Designer"}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 500px, (min-width: 768px) 400px, 100vw"
                priority
                quality={90}
              />
            </div>
            {data.aboutSecondaryImage && (
              <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={urlFor(data.aboutSecondaryImage).width(800).height(600).url()}
                  alt={data.aboutSecondaryImage?.alt || "About"}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 500px, (min-width: 768px) 400px, 100vw"
                  loading="lazy"
                  quality={85}
                />
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Experience highlights */}
      {data.experienceHighlights && data.experienceHighlights.length > 0 && (
        <Container className="mt-28 sm:mt-36 mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl mb-10">
            {data.experienceHighlightsTitle || "Experience highlights"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {data.experienceHighlights.map((highlight, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  {highlight.phrase}
                </span>
                {highlight.description && (
                  <p className="mt-1 text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
                    {highlight.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Container>
      )}

      <ContactPurpleBlock className="mt-28 sm:mt-36 mb-16" />
      <AvailableForWorkPill scrollThreshold={250} />
    </>
  )
}

export default About
