'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const CARD_COLORS = {
  intro: '#141320',
  card2: '#2E2C53',
  card3: '#EDEEFF',
  card4: '#6366F1',
}

const CARDS = [
  {
    id: 'intro',
    bg: CARD_COLORS.intro,
    isIntro: true,
    text: 'I help founders and product teams design clear, usable digital experiences across Saas, apps, and the web',
  },
  {
    id: 'card2',
    bg: CARD_COLORS.card2,
    title: 'End-to-end UX & UI design',
    description: 'With end-to-end UX and UI design across web and mobile, from discovery and journey mapping to wireframes, prototypes, and build-ready interfaces — working closely with product and engineering.',
  },
  {
    id: 'card3',
    bg: CARD_COLORS.card3,
    title: 'Product strategy & problem-solving',
    description: 'Clarifying complex product requirements through research, user flows, and information architecture to support scale and long-term product growth.',
  },
  {
    id: 'card4',
    bg: CARD_COLORS.card4,
    title: 'Design systems & complex interfaces',
    description: 'Designing clear interfaces for data-heavy and AI-led products, using scalable UI patterns and design systems teams can build on.',
  },
]

// Contact-style padding and rounded corners; content centered
const CARD_PADDING = 'px-6 py-16 sm:px-12 md:px-16 md:py-24 lg:py-32'
const CARD_ROUNDED = 'rounded-3xl'

function CardContent({ card }) {
  const isLightBg = card.bg === CARD_COLORS.card3
  const textClass = isLightBg
    ? 'text-neutral-900'
    : 'text-white'
  const descClass = isLightBg
    ? 'text-neutral-600'
    : 'text-white/80'

  return (
    <div className={`${CARD_PADDING} flex flex-col items-center justify-center min-h-full`}>
      <div className="w-full max-w-4xl mx-auto text-left">
        {card.isIntro ? (
          <p className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.35] md:leading-[1.5] lg:leading-[1.35] ${textClass}`}>
            {card.text}
            <span className="inline-block ml-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#6366F1]" style={{ verticalAlign: 'baseline' }} aria-hidden />
          </p>
        ) : (
          <>
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.35] md:leading-[1.5] lg:leading-[1.35] ${textClass}`}>
              {card.title}
            </h3>
            <p className={`mt-4 sm:mt-6 text-base sm:text-lg max-w-3xl leading-relaxed ${descClass}`}>
              {card.description}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default function WhatICanHelpWith() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Sticky phase: 0 → 1 while we're in the sticky scroll range (wider range = smoother, more scroll room)
  const stickyProgress = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 0, 1, 1])

  // —— Card 1 (intro): scale down when card 2 comes on top (Portavia-style)
  const card1TextOpacity = useTransform(stickyProgress, [0, 0.12, 0.22, 0.38], [1, 1, 0.6, 0.5])
  const card1Scale = useTransform(stickyProgress, [0, 0.18, 0.35], [1, 1, 0.92])

  // —— Card 2: slides up over card 1; scale down when card 3 comes on top
  const card2Y = useTransform(stickyProgress, [0.05, 0.32], ['100%', '0%'])
  const card2Scale = useTransform(stickyProgress, [0.05, 0.32, 0.42, 0.58, 0.68], [0.98, 1, 1, 0.92, 0.92])
  const card2TextOpacity = useTransform(stickyProgress, [0.08, 0.22, 0.38, 0.52, 0.62], [0.5, 0.7, 1, 1, 0.5])

  // —— Card 3: slides up over card 2; scale down when card 4 comes on top
  const card3Y = useTransform(stickyProgress, [0.38, 0.62], ['100%', '0%'])
  const card3Scale = useTransform(stickyProgress, [0.38, 0.62, 0.72, 0.85, 0.95], [0.98, 1, 1, 0.92, 0.92])
  const card3TextOpacity = useTransform(stickyProgress, [0.35, 0.52, 0.68, 0.82, 0.92], [0.5, 0.7, 1, 1, 0.5])

  // —— Card 4: slides up over card 3; stays full scale on top
  const card4Y = useTransform(stickyProgress, [0.68, 0.92], ['100%', '0%'])
  const card4Scale = useTransform(stickyProgress, [0.68, 0.92, 1], [0.98, 1, 1])
  const card4TextOpacity = useTransform(stickyProgress, [0.65, 0.82, 0.92, 1], [0.5, 0.7, 1, 1])

  // Vertical pagination: circles – active = full opacity + scale, inactive = dimmed
  const ind1Opacity = useTransform(stickyProgress, [0, 0.2, 0.32, 0.4], [1, 1, 0.4, 0.4])
  const ind1Scale = useTransform(stickyProgress, [0, 0.2, 0.32, 0.4], [1.2, 1.2, 0.85, 0.85])
  const ind2Opacity = useTransform(stickyProgress, [0.18, 0.28, 0.48, 0.58], [0.4, 1, 1, 0.4])
  const ind2Scale = useTransform(stickyProgress, [0.18, 0.28, 0.48, 0.58], [0.85, 1.2, 1.2, 0.85])
  const ind3Opacity = useTransform(stickyProgress, [0.45, 0.58, 0.78, 0.88], [0.4, 1, 1, 0.4])
  const ind3Scale = useTransform(stickyProgress, [0.45, 0.58, 0.78, 0.88], [0.85, 1.2, 1.2, 0.85])
  const ind4Opacity = useTransform(stickyProgress, [0.72, 0.85, 1], [0.4, 1, 1])
  const ind4Scale = useTransform(stickyProgress, [0.72, 0.85, 1], [0.85, 1.2, 1.2])

  return (
    <section
      ref={sectionRef}
      className="relative -mt-16 md:-mt-24"
      aria-label="What I can help with"
    >
      {/* Tall wrapper for scroll-driven animation – works on all viewports */}
      <div className="h-[380vh] relative">
        <div
          className="sticky top-12 md:top-16 left-0 right-0 z-10 py-4 h-[75vh] min-h-[320px] md:h-[88vh] md:min-h-[520px]"
        >
          <div className="h-full mx-auto max-w-5xl lg:max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 relative">
            {/* Vertical pagination indicator – right side, circles */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 py-2 z-20"
              role="presentation"
              aria-label="Card position"
            >
              {[0, 1, 2, 3].map((i) => {
                const opacity = [ind1Opacity, ind2Opacity, ind3Opacity, ind4Opacity][i]
                const scale = [ind1Scale, ind2Scale, ind3Scale, ind4Scale][i]
                return (
                  <motion.span
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#6366F1] shrink-0"
                    style={{ opacity, scale }}
                    aria-hidden
                  />
                )
              })}
            </div>
            {/* Card stack: overflow-hidden so we don't see the next card until it slides up */}
            <div
              className="relative w-full rounded-3xl overflow-hidden h-full pr-8 sm:pr-10"
            >
              {/* Card 1 – bottom of stack; scales down when card 2 is on top */}
              <motion.div
                className={`absolute inset-0 ${CARD_ROUNDED} overflow-hidden shadow-xl origin-center`}
                style={{
                  backgroundColor: CARDS[0].bg,
                  zIndex: 1,
                  scale: card1Scale,
                }}
              >
                <motion.div className="h-full w-full flex flex-col items-center justify-center" style={{ opacity: card1TextOpacity }}>
                  <CardContent card={CARDS[0]} />
                </motion.div>
              </motion.div>

              {/* Card 2 – slides up over card 1; scales down when card 3 is on top */}
              <motion.div
                className={`absolute inset-0 ${CARD_ROUNDED} overflow-hidden shadow-xl origin-center`}
                style={{
                  backgroundColor: CARDS[1].bg,
                  zIndex: 2,
                  y: card2Y,
                  scale: card2Scale,
                }}
              >
                <motion.div className="h-full w-full flex flex-col items-center justify-center" style={{ opacity: card2TextOpacity }}>
                  <CardContent card={CARDS[1]} />
                </motion.div>
              </motion.div>

              {/* Card 3 – slides up over card 2; scales down when card 4 is on top */}
              <motion.div
                className={`absolute inset-0 ${CARD_ROUNDED} overflow-hidden shadow-xl origin-center`}
                style={{
                  backgroundColor: CARDS[2].bg,
                  zIndex: 3,
                  y: card3Y,
                  scale: card3Scale,
                }}
              >
                <motion.div className="h-full w-full flex flex-col items-center justify-center" style={{ opacity: card3TextOpacity }}>
                  <CardContent card={CARDS[2]} />
                </motion.div>
              </motion.div>

              {/* Card 4 – slides up over card 3; stays full scale */}
              <motion.div
                className={`absolute inset-0 ${CARD_ROUNDED} overflow-hidden shadow-xl origin-center`}
                style={{
                  backgroundColor: CARDS[3].bg,
                  zIndex: 4,
                  y: card4Y,
                  scale: card4Scale,
                }}
              >
                <motion.div className="h-full w-full flex flex-col items-center justify-center" style={{ opacity: card4TextOpacity }}>
                  <CardContent card={CARDS[3]} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
