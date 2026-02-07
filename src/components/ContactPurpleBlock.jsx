import { motion } from 'framer-motion';
import siteMetadata from '../data/siteMetadata';

export default function ContactPurpleBlock({
  className = '',
  bgColor = 'bg-primary-500', // solid color, can be overridden
  title = "Transform your ideas into intuitive experiences",
  description = "Have a project in mind? I'm available for new opportunities and love designing thoughtful, user-friendly digital products, whether it's UX/UI for web and mobile apps, SaaS platforms, or something new.",
  cta = "Get in touch"
}) {
  return (
    <div className={`max-w-5xl lg:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 ${className}`}>
      <div className={`relative overflow-hidden rounded-3xl shadow-xl ${bgColor}`}>
        <div className="relative px-6 py-16 sm:px-12 md:px-16 md:py-24 lg:py-32 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl font-bold tracking-tight leading-[1.35] md:leading-[1.5] lg:leading-[1.35] text-white sm:text-4xl md:text-5xl mb-6"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 sm:mt-6 text-base sm:text-lg text-white/80 mb-10"
            >
              {description}
            </motion.p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${siteMetadata.email}`}
              className="rounded-full bg-white px-6 sm:px-8 py-3 text-base font-medium text-primary-600 shadow-sm hover:bg-white/90 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
            >
              {cta}
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
} 