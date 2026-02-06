const siteMetadata = {
  title: 'Web Creativity Studio | Thoughtful UX & UI Design',
  author: 'Carla Castillo',
  headerTitle: 'Web Creativity Studio',
  headerSubtitle: 'Senior UX/UI Designer',
  description: 'Web Creativity Studio helps brands, artists, and founders solve complex problems through beautiful, thoughtful digital design. We craft websites, web apps, and SaaS platforms with clean UI, smart UX, and clarity at the core.',
  authorHeadline: 'Senior UX/UI Designer, passionate about creating beautiful digital experiences',
  authorAbout: "Hi, I'm Carla Castillo, a Senior UX/UI Designer with over 10 years of experience in creating beautiful and functional digital products. I specialise in user-centred design, creating intuitive interfaces that solve real user problems.",
  authorAboutExtended: "With a strong background in both design and development, I bring a unique perspective to every project. I believe in creating designs that are not only visually appealing but also highly functional and accessible. My approach combines creative thinking with technical expertise to deliver exceptional user experiences.",
  language: 'en-gb',
  theme: 'system', // system, dark or light
  siteUrl: 'https://wcwebcreativity.vercel.app', // Vercel deployment URL
  siteRepo: 'https://github.com/carlaMob15/nextjs-tailwind-portfolio',
  siteLogo: '/images/logo.png',
  image: '/images/avatar.jpg',
  socialBanner: '/images/social-banner.jpg',
  email: 'wcwebcreativity@gmail.com',
  phoneNumber: '+44 (0) 123 456 7890', // Updated to UK format
  contactTitle: 'Transform your ideas into intuitive experiences',
  contactSubtitle: "Have a project in mind? I'm available for new opportunities and love designing thoughtful, user-friendly digital products, whether it's UX/UI for web and mobile apps, SaaS platforms, or something new.",
  socials: {
    github: '',
    linkedin: 'https://www.linkedin.com/company/wcwebcreativity/',
    twitter: '',
    dribbble: 'https://dribbble.com/wcwebcreativity',
    medium: 'https://medium.com/@wcwebcreativity'
  },
  locale: 'en-GB',
  // Adding navigation links that are referenced in the Header component
  siteNavLinks: [
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/services' },
    { name: 'Contact', href: '/contact' }
  ],
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    googleAnalyticsId: '', // Add your Google Analytics ID when ready
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
    // Please add your .env file and modify it according to your selection
    provider: '',
  },
  comment: {
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: '', // supported providers: giscus, utterances, disqus
  },
}

module.exports = siteMetadata 