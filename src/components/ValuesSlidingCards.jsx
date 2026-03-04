'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const CARD_COLORS = ['#141320', '#2E2C53', '#EDEEFF', '#6366F1']
const MAX_CARDS = 6
const CARD_PADDING = 'px-6 py-16 sm:px-12 md:px-16 md:py-24 lg:py-32'
const CARD_ROUNDED = 'rounded-3xl'

function buildRanges(n, i) {
  if (n <= 0) return { yIn: [0, 1], yOut: ['0%', '0%'], scaleIn: [0, 1], scaleOut: [1, 1], opacityIn: [0, 1], opacityOut: [1, 1] }
  const seg = 1 / n
  const pad = 0.4
  if (i === 0) {
    if (n === 1) {
      return { yIn: null, yOut: null, scaleIn: [0, 1], scaleOut: [1, 1], opacityIn: [0, 1], opacityOut: [1, 1] }
    }
    return {
      yIn: null,
      yOut: null,
      scaleIn: [0, seg * 0.2, seg * 0.5],
      scaleOut: [1, 1, 0.92],
      opacityIn: [0, seg * 0.3, seg * 0.6, Math.min(seg * 1.2, 1)],
      opacityOut: [1, 1, 0.6, 0.5],
    }
  }
  if (i >= n) {
    return { yIn: [0, 1], yOut: ['100%', '100%'], scaleIn: [0, 1], scaleOut: [0.98, 0.98], opacityIn: [0, 1], opacityOut: [0.5, 0.5] }
  }
  const slideStart = seg * (i - pad)
  const slideEnd = seg * (i + pad)
  const scaleDownStart = seg * (i + pad + 0.1)
  const scaleDownEnd = i === n - 1 ? 1 : Math.min(seg * (i + pad + 0.5), 1)
  const lastCard = i === n - 1
  return {
    yIn: [Math.max(0, slideStart - 0.02), slideEnd],
    yOut: ['100%', '0%'],
    scaleIn: [Math.max(0, slideStart - 0.02), slideEnd, scaleDownStart, scaleDownEnd],
    scaleOut: lastCard ? [0.98, 1, 1, 1] : [0.98, 1, 1, 0.92],
    opacityIn: [Math.max(0, slideStart - 0.05), slideStart + 0.1, slideEnd, scaleDownStart, scaleDownEnd + 0.05],
    opacityOut: [0.5, 0.7, 1, 1, 0.5],
  }
}

function buildIndicatorRanges(n, i) {
  if (n <= 0) return { opacityIn: [0, 1], opacityOut: [0.4, 0.4], scaleIn: [0, 1], scaleOut: [0.85, 0.85] }
  const seg = 1 / n
  const center = seg * (i + 0.5)
  const half = seg * 0.4
  return {
    opacityIn: [Math.max(0, center - half - 0.05), center - half, center + half, center + half + 0.05],
    opacityOut: [0.4, 1, 1, 0.4],
    scaleIn: [Math.max(0, center - half - 0.05), center - half, center + half, center + half + 0.05],
    scaleOut: [0.85, 1.2, 1.2, 0.85],
  }
}

function CardContent({ item, bg }) {
  const isLight = bg === CARD_COLORS[2]
  const textClass = isLight ? 'text-neutral-900' : 'text-white'
  const descClass = isLight ? 'text-neutral-600' : 'text-white/80'
  return (
    <div className={`${CARD_PADDING} flex flex-col items-center justify-center min-h-full w-full`}>
      <div className="w-full max-w-4xl mx-auto text-left">
        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.35] md:leading-[1.5] lg:leading-[1.35] ${textClass} text-left`}>
          {item.title}
        </h3>
        {item.description && (
          <p className={`mt-4 sm:mt-6 text-base sm:text-lg max-w-3xl leading-relaxed ${descClass} text-left`}>
            {item.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default function ValuesSlidingCards({ title, items = [] }) {
  const sectionRef = useRef(null)
  const n = Math.min(Math.max(items.length, 1), MAX_CARDS)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const stickyProgress = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 0, 1, 1])

  const r0 = buildRanges(n, 0)
  const card0Scale = useTransform(stickyProgress, r0.scaleIn, r0.scaleOut)
  const card0Opacity = useTransform(stickyProgress, r0.opacityIn, r0.opacityOut)

  const card1Y = useTransform(stickyProgress, buildRanges(n, 1).yIn || [0, 1], buildRanges(n, 1).yOut || ['0%', '0%'])
  const card1Scale = useTransform(stickyProgress, buildRanges(n, 1).scaleIn, buildRanges(n, 1).scaleOut)
  const card1Opacity = useTransform(stickyProgress, buildRanges(n, 1).opacityIn, buildRanges(n, 1).opacityOut)

  const card2Y = useTransform(stickyProgress, buildRanges(n, 2).yIn || [0, 1], buildRanges(n, 2).yOut || ['0%', '0%'])
  const card2Scale = useTransform(stickyProgress, buildRanges(n, 2).scaleIn, buildRanges(n, 2).scaleOut)
  const card2Opacity = useTransform(stickyProgress, buildRanges(n, 2).opacityIn, buildRanges(n, 2).opacityOut)

  const card3Y = useTransform(stickyProgress, buildRanges(n, 3).yIn || [0, 1], buildRanges(n, 3).yOut || ['0%', '0%'])
  const card3Scale = useTransform(stickyProgress, buildRanges(n, 3).scaleIn, buildRanges(n, 3).scaleOut)
  const card3Opacity = useTransform(stickyProgress, buildRanges(n, 3).opacityIn, buildRanges(n, 3).opacityOut)

  const card4Y = useTransform(stickyProgress, buildRanges(n, 4).yIn || [0, 1], buildRanges(n, 4).yOut || ['0%', '0%'])
  const card4Scale = useTransform(stickyProgress, buildRanges(n, 4).scaleIn, buildRanges(n, 4).scaleOut)
  const card4Opacity = useTransform(stickyProgress, buildRanges(n, 4).opacityIn, buildRanges(n, 4).opacityOut)

  const card5Y = useTransform(stickyProgress, buildRanges(n, 5).yIn || [0, 1], buildRanges(n, 5).yOut || ['0%', '0%'])
  const card5Scale = useTransform(stickyProgress, buildRanges(n, 5).scaleIn, buildRanges(n, 5).scaleOut)
  const card5Opacity = useTransform(stickyProgress, buildRanges(n, 5).opacityIn, buildRanges(n, 5).opacityOut)

  const ind0 = buildIndicatorRanges(n, 0)
  const ind1 = buildIndicatorRanges(n, 1)
  const ind2 = buildIndicatorRanges(n, 2)
  const ind3 = buildIndicatorRanges(n, 3)
  const ind4 = buildIndicatorRanges(n, 4)
  const ind5 = buildIndicatorRanges(n, 5)
  const indOpacity = [
    useTransform(stickyProgress, ind0.opacityIn, ind0.opacityOut),
    useTransform(stickyProgress, ind1.opacityIn, ind1.opacityOut),
    useTransform(stickyProgress, ind2.opacityIn, ind2.opacityOut),
    useTransform(stickyProgress, ind3.opacityIn, ind3.opacityOut),
    useTransform(stickyProgress, ind4.opacityIn, ind4.opacityOut),
    useTransform(stickyProgress, ind5.opacityIn, ind5.opacityOut),
  ]
  const indScale = [
    useTransform(stickyProgress, ind0.scaleIn, ind0.scaleOut),
    useTransform(stickyProgress, ind1.scaleIn, ind1.scaleOut),
    useTransform(stickyProgress, ind2.scaleIn, ind2.scaleOut),
    useTransform(stickyProgress, ind3.scaleIn, ind3.scaleOut),
    useTransform(stickyProgress, ind4.scaleIn, ind4.scaleOut),
    useTransform(stickyProgress, ind5.scaleIn, ind5.scaleOut),
  ]

  const yVals = [null, card1Y, card2Y, card3Y, card4Y, card5Y]
  const scaleVals = [card0Scale, card1Scale, card2Scale, card3Scale, card4Scale, card5Scale]
  const opacityVals = [card0Opacity, card1Opacity, card2Opacity, card3Opacity, card4Opacity, card5Opacity]

  if (!items || items.length === 0) return null

  const cards = items.slice(0, MAX_CARDS).map((item, i) => ({
    ...item,
    bg: CARD_COLORS[i % CARD_COLORS.length],
  }))

  return (
    <section
      ref={sectionRef}
      className="relative -mt-8"
      aria-label={title || 'What I care about'}
    >
      <div className="mx-auto max-w-5xl lg:max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 mb-8 md:mb-10">
        {title && (
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            {title}
          </h2>
        )}
      </div>
      <div className="h-[380vh] relative">
        <div className="sticky top-12 md:top-16 left-0 right-0 z-10 py-4 h-[75vh] min-h-[320px] md:h-[88vh] md:min-h-[520px]">
          <div className="h-full mx-auto max-w-5xl lg:max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 relative">
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 py-2 z-20"
              role="presentation"
              aria-label="Card position"
            >
              {cards.map((_, i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#6366F1] shrink-0"
                  style={{ opacity: indOpacity[i], scale: indScale[i] }}
                  aria-hidden
                />
              ))}
            </div>
            <div className="relative w-full rounded-3xl overflow-hidden h-full pr-8 sm:pr-10">
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  className={`absolute inset-0 ${CARD_ROUNDED} overflow-hidden shadow-xl origin-center`}
                  style={{
                    backgroundColor: card.bg,
                    zIndex: i + 1,
                    y: yVals[i] ?? undefined,
                    scale: scaleVals[i],
                  }}
                >
                  <motion.div className="h-full w-full flex flex-col items-center justify-center" style={{ opacity: opacityVals[i] }}>
                    <CardContent item={card} bg={card.bg} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
