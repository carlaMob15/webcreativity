import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

// Define the schemas based on actual usage
// Single project document: source of truth for Work thumbnails AND project detail (case study) page
const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // — Card / list (Work page)
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Shown as pills on the card (e.g. "Mobile App", "B2B", "Healthcare")',
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'Shown on the Work card and as meta description.',
    },
    {
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image for the Work list card. Fallback: Hero Image.',
    },
    {
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      description: 'Used to sort projects (newest first). Fallback: creation date.',
    },
    // — Case study page
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main hero image on the project detail page.',
    },
    {
      name: 'heroImageAlt',
      title: 'Hero Image Alt',
      type: 'string',
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'text',
    },
    {
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
    },
    {
      name: 'timeline',
      title: 'Timeline / Year',
      type: 'string',
      description: 'e.g. "2024" or "2020 - 2023"',
    },
    {
      name: 'services',
      title: 'Services',
      type: 'string',
    },
    {
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Figma, Sketch, React',
    },
    {
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
    },
    {
      name: 'solution',
      title: 'The Solution',
      type: 'text',
    },
    {
      name: 'impact',
      title: 'Project Impact & Reflection',
      type: 'text',
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'alt', title: 'Alt text', type: 'string' },
          ],
          preview: {
            select: { caption: 'caption' },
            prepare: ({ caption }) => ({ title: caption || 'Gallery image' }),
          },
        },
      ],
    },
    {
      name: 'technicalApproach',
      title: 'Technical Approach',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'technicalApproachImages',
      title: 'Technical Approach Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'alt', title: 'Alt text', type: 'string' },
          ],
          preview: {
            select: { caption: 'caption' },
            prepare: ({ caption }) => ({ title: caption || 'Tech approach image' }),
          },
        },
      ],
    },
    {
      name: 'impactImage',
      title: 'Impact Image',
      type: 'object',
      fields: [
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
        { name: 'caption', title: 'Caption', type: 'string' },
        { name: 'alt', title: 'Alt text', type: 'string' },
      ],
    },
    // Legacy / optional
    {
      name: 'description',
      title: 'Description (legacy)',
      type: 'text',
      description: 'Fallback for short description if not set.',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Optional manual order override.',
    },
  ],
}

const offeringSchema = {
  name: 'offering',
  title: 'Offering',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'imageAttribution',
      title: 'Image Attribution',
      type: 'string',
    },
    {
      name: 'testimonial',
      title: 'Testimonial',
      type: 'text',
    },
    {
      name: 'testimonialAuthor',
      title: 'Testimonial Author',
      type: 'string',
    },
    {
      name: 'testimonialAuthorTitle',
      title: 'Testimonial Author Title',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
}

const testimonialSchema = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'authorTitle',
      title: 'Author Title',
      type: 'string',
    },
    {
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'imageAttribution',
      title: 'Image Attribution',
      type: 'string',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
    },
  ],
}

const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
    },
  ],
}

const navigationLinkSchema = {
  name: 'navigationLink',
  title: 'Navigation Link',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
}

const experienceSchema = {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
}

const homePageSchema = {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'animatedPhrases',
      title: 'Animated Phrases',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'phrase', title: 'Phrase', type: 'string' },
            { name: 'order', title: 'Order', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'scrollCueText',
      title: 'Scroll Cue Text',
      type: 'string',
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
    },
    {
      name: 'featuredWorkTitle',
      title: 'Featured Work Title',
      type: 'string',
    },
    {
      name: 'featuredWorkDescription',
      title: 'Featured Work Description',
      type: 'text',
    },
  ],
}

const servicesPageSchema = {
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
    },
    {
      name: 'servicesTitle',
      title: 'Services Title',
      type: 'string',
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'iconType', title: 'Icon Type', type: 'string' },
            { name: 'customIcon', title: 'Custom Icon', type: 'image' },
            { name: 'order', title: 'Order', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'testimonialsTitle',
      title: 'Testimonials Title',
      type: 'string',
    },
    {
      name: 'showTestimonials',
      title: 'Show Testimonials Section',
      type: 'boolean',
      description: 'Toggle to show/hide the testimonials section on the services page',
    },
    {
      name: 'testimonialsToShow',
      title: 'Testimonials to Show',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
      description: 'Select which testimonials to display on the services page',
    },
    {
      name: 'howWeWorkTitle',
      title: 'How We Work Title',
      type: 'string',
    },
    {
      name: 'howWeWorkDescription',
      title: 'How We Work Description',
      type: 'text',
    },
    {
      name: 'howWeWorkImage',
      title: 'How We Work Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
    },
    {
      name: 'aboutDescription',
      title: 'About Description',
      type: 'text',
    },
    {
      name: 'aboutMainImage',
      title: 'About Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'aboutSecondaryImages',
      title: 'About Secondary Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
}

const projectsPageSchema = {
  name: 'projectsPage',
  title: 'Projects Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
    },
  ],
}

export default defineConfig({
  name: 'default',
  title: 'Carla Castillo Portfolio',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dvy4l5vj',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [
    deskTool(),
    visionTool(),
  ],
  
  schema: {
    types: [
      projectSchema,
      offeringSchema,
      testimonialSchema,
      siteSettingsSchema,
      navigationLinkSchema,
      experienceSchema,
      homePageSchema,
      servicesPageSchema,
      projectsPageSchema,
    ],
  },
}) 