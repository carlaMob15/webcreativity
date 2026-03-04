'use client'

import { useState, useCallback } from 'react'

/**
 * Accessible accordion for About page services.
 * - One item open at a time
 * - Dark section styling
 * - Icon + title + chevron in header; description in body
 */
export default function ServicesAccordion({ title, intro, services = [], getServiceIcon }) {
  const [openIndex, setOpenIndex] = useState(0)

  const handleKeyDown = useCallback(
    (e, index) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpenIndex((prev) => (prev === index ? -1 : index))
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        setOpenIndex((prev) => (prev < 0 ? 0 : Math.min(prev + 1, services.length - 1)))
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        setOpenIndex((prev) => (prev < 0 ? services.length - 1 : Math.max(prev - 1, 0)))
      }
      if (e.key === 'Home') {
        e.preventDefault()
        setOpenIndex(0)
      }
      if (e.key === 'End') {
        e.preventDefault()
        setOpenIndex(services.length - 1)
      }
    },
    [services.length]
  )

  if (!services || services.length === 0) return null

  return (
    <section
      className="relative w-full py-24 md:py-32"
      aria-label={title || 'Services'}
      style={{ backgroundColor: 'var(--services-accordion-bg, #1e1d2e)' }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-12 md:mb-16">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              {title}
            </h2>
          )}
          {intro && (
            <p className="text-white/80 text-lg leading-relaxed">{intro}</p>
          )}
        </div>
        <div className="max-w-3xl mx-auto" role="list">
          {services.map((service, index) => {
            const isOpen = openIndex === index
            const id = `service-accordion-${index}`
            const panelId = `service-panel-${index}`
            return (
              <div
                key={index}
                role="listitem"
                className="border-b border-white/15 last:border-b-0"
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    id={id}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full flex items-center gap-4 py-5 sm:py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1d2e] rounded"
                  >
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center" aria-hidden>
                      {getServiceIcon
                        ? getServiceIcon(service.iconType, service.customIcon, service.customIconImage)
                        : null}
                    </span>
                    <span className="flex-1 text-lg font-semibold text-white">
                      {service.title}
                    </span>
                    <span
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-white transition-transform duration-200"
                      aria-hidden
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={id}
                  hidden={!isOpen}
                  className="overflow-hidden transition-all duration-200"
                >
                  <div className="pb-5 sm:pb-6 pl-12 sm:pl-14 pr-0">
                    <p className="text-white/80 text-base leading-relaxed m-0">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
