'use client'

import Image from 'next/image'
import { urlFor } from '../../lib/sanity'

const DEFAULT_STEP_BG = '#1e1d2e'
const DEFAULT_DOT_COLOR = '#6366F1'

/** Returns true if hex is dark (use white text). */
function isDarkHex(hex) {
  if (!hex || typeof hex !== 'string') return true
  const h = hex.replace(/^#/, '')
  if (h.length !== 6 && h.length !== 8) return true
  const r = parseInt(h.slice(0, 2), 16) / 255
  const g = parseInt(h.slice(2, 4), 16) / 255
  const b = parseInt(h.slice(4, 6), 16) / 255
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance <= 0.4
}

/**
 * Bento-style grid for "My process" steps.
 * - CMS: backgroundColor, dotColor per step; processDotColor as default for dot.
 * - Dark bg → white text; light bg → dark text. Number has dot next to it.
 */
export default function ProcessBentoSection({ title, intro, steps = [], processDotColor }) {
  if (!steps || steps.length === 0) return null
  const defaultDotColor = processDotColor || DEFAULT_DOT_COLOR

  return (
    <section className="w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-white dark:bg-neutral-950" aria-label={title || 'My process'}>
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl mb-12 md:mb-16">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl mb-4">
              {title}
            </h2>
          )}
          {intro && (
            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
          {steps.map((step, index) => {
            const hasImage = step.image && (step.image.asset?.url || step.image.asset?._ref)
            const isEmphasis = step.emphasis
            const bgHex = step.backgroundColor || DEFAULT_STEP_BG
            const dotColor = step.dotColor || defaultDotColor
            const isDark = isDarkHex(bgHex)
            const textClass = isDark ? 'text-white' : 'text-neutral-900 dark:text-neutral-100'
            const descClass = isDark ? 'text-white/85' : 'text-neutral-600 dark:text-neutral-400'

            // Emphasis (wider) only at lg+: on tablet (md) all cards stay 1 column so grid is fluid
            const tileClass = [
              'rounded-2xl overflow-hidden flex flex-col min-h-[200px]',
              isEmphasis ? 'lg:col-span-2' : '',
            ].filter(Boolean).join(' ')

            const imageUrl = hasImage
              ? (step.image.asset?.url
                ? step.image.asset.url
                : urlFor(step.image).width(800).height(500).url())
              : null

            return (
              <div
                key={index}
                className={`${tileClass} relative`}
                style={{ backgroundColor: bgHex, ...(isEmphasis ? { gridRow: 'span 1' } : {}) }}
              >
                {imageUrl ? (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={imageUrl}
                      alt={step.image?.alt || step.title || `Step ${step.stepNumber}`}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                ) : null}
                <div className="relative z-10 p-6 sm:p-8 flex flex-col flex-1 min-h-[200px] justify-end">
                  {step.stepNumber != null && step.stepNumber !== '' && (
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className={`text-4xl sm:text-5xl font-bold ${textClass} opacity-90`}>
                        {String(step.stepNumber).padStart(2, '0')}
                      </span>
                      <span
                        className="inline-block rounded-full flex-shrink-0 w-2 h-2 sm:w-2.5 sm:h-2.5 align-baseline"
                        style={{
                          backgroundColor: dotColor,
                          verticalAlign: 'baseline',
                        }}
                        aria-hidden
                      />
                    </div>
                  )}
                  <h3 className={`text-xl sm:text-2xl font-semibold ${textClass} mb-2`}>
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className={`text-sm sm:text-base leading-relaxed ${descClass} mt-auto`}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
