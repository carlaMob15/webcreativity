import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

// — Section types for flexible project detail page builder (reorderable)
const textSectionSchema = {
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }) => ({ title: heading || 'Text section' }),
  },
}

const imageSectionSchema = {
  name: 'imageSection',
  title: 'Image Section',
  type: 'object',
  fields: [
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'alt', title: 'Alt text', type: 'string' },
    { name: 'caption', title: 'Caption', type: 'string' },
    {
      name: 'width',
      title: 'Width',
      type: 'string',
      options: {
        list: [
          { value: 'standard', title: 'Standard' },
          { value: 'wide', title: 'Wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
    },
  ],
  preview: {
    select: { caption: 'caption' },
    prepare: ({ caption }) => ({ title: caption || 'Image section' }),
  },
}

const imageGridSectionSchema = {
  name: 'imageGridSection',
  title: 'Image Grid Section',
  type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string', description: 'Optional' },
    {
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: { list: [2, 3, 4], layout: 'radio' },
      validation: (Rule) => Rule.required().min(2).max(4),
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'alt', title: 'Alt text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
          preview: {
            select: { caption: 'caption' },
            prepare: ({ caption }) => ({ title: caption || 'Grid image' }),
          },
        },
      ],
    },
  ],
  preview: {
    select: { heading: 'heading', columns: 'columns' },
    prepare: ({ heading, columns }) => ({ title: heading || `Image grid (${columns || 2} cols)` }),
  },
}

// Single project document: flexible CMS only (no legacy fields).
// Thumbnail + hero = mainImage; page content = sections (textSection, imageSection, imageGridSection).
const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // — Core (required for meta)
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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'chips',
      title: 'Chips',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Pills on cards and detail (e.g. "Mobile App", "B2B")',
    },
    {
      name: 'intro',
      title: 'Intro',
      type: 'text',
      description: 'Short paragraph under the title on the detail page.',
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. "2024" or "2020 – 2023"',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Figma, React',
    },
    // — Main image (thumbnail + hero)
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Used as project thumbnail (grid, home) and hero on the detail page.',
    },
    {
      name: 'thumbnailSummary',
      title: 'Thumbnail Summary',
      type: 'string',
      description: 'Short text used in grid cards.',
    },
    {
      name: 'isFeatured',
      title: 'Featured on Home',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'featuredOrder',
      title: 'Featured Order',
      type: 'number',
      description: 'Order on homepage when featured (lower = first).',
    },
    // — Flexible page builder (reorderable)
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'textSection' },
        { type: 'imageSection' },
        { type: 'imageGridSection' },
      ],
      description: 'Build the project detail page. Drag to reorder.',
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

const aboutPageSchema = {
  name: 'servicesPage', // kept for existing data; content is the About page
  title: 'About Page',
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
      name: 'servicesIntro',
      title: 'Services Intro',
      type: 'text',
      description: 'Short intro paragraph below the services section heading',
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
      name: 'processTitle',
      title: 'My Process Title',
      type: 'string',
    },
    {
      name: 'processIntro',
      title: 'My Process Intro',
      type: 'text',
    },
    {
      name: 'processDotColor',
      title: 'Process Step Dot Color',
      type: 'string',
      description: 'Hex color for the dot next to step numbers (e.g. #6366F1). Default used if step has no dot color.',
    },
    {
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stepNumber', title: 'Step Number', type: 'string', description: 'e.g. "01" or "1"' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'emphasis', title: 'Larger tile (emphasis)', type: 'boolean', initialValue: false, description: 'Use a larger tile in the bento grid' },
            { name: 'backgroundColor', title: 'Background Color', type: 'string', description: 'Hex color (e.g. #1e1d2e, #EDEEFF). Text will be white on dark, dark on light.' },
            { name: 'dotColor', title: 'Dot Color', type: 'string', description: 'Hex color for the dot next to the number (e.g. #6366F1). Overrides section default.' },
          ],
          preview: {
            select: { title: 'title', stepNumber: 'stepNumber' },
            prepare: ({ title, stepNumber }) => ({ title: stepNumber ? `${stepNumber}. ${title}` : title }),
          },
        },
      ],
    },
    {
      name: 'valuesTitle',
      title: 'What I Care About Title',
      type: 'string',
    },
    {
      name: 'valuesItems',
      title: 'Values Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
          preview: {
            select: { title: 'title' },
            prepare: ({ title }) => ({ title: title || 'Value item' }),
          },
        },
      ],
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
      description: 'Top image in "A bit more about me" section',
    },
    {
      name: 'aboutSecondaryImage',
      title: 'About Secondary Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional second image below the main image',
    },
    {
      name: 'experienceHighlightsTitle',
      title: 'Experience Highlights Title',
      type: 'string',
    },
    {
      name: 'experienceHighlights',
      title: 'Experience Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'phrase', title: 'Phrase', type: 'string', description: 'Bold highlight (e.g. "10+ years")' },
            { name: 'description', title: 'Description', type: 'text', description: 'Line below the phrase' },
          ],
          preview: {
            select: { phrase: 'phrase' },
            prepare: ({ phrase }) => ({ title: phrase || 'Highlight' }),
          },
        },
      ],
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
      textSectionSchema,
      imageSectionSchema,
      imageGridSectionSchema,
      projectSchema,
      offeringSchema,
      testimonialSchema,
      siteSettingsSchema,
      navigationLinkSchema,
      experienceSchema,
      homePageSchema,
      aboutPageSchema,
      projectsPageSchema,
    ],
  },
}) 