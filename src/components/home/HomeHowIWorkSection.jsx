'use client'

import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Palette,
  LayoutDashboard,
  Box,
  LayoutGrid,
  Map,
  Cloud,
  Monitor,
  Smartphone,
  Accessibility,
  Search,
  Users,
  GitBranch,
  BarChart3,
  Lightbulb,
} from 'lucide-react'
import { Button } from '../Button'

const SECTION_BG = '#141320'

const ROW1_SKILLS = [
  { label: 'UX Design', Icon: LayoutDashboard },
  { label: 'UI Design', Icon: Palette },
  { label: 'Prototyping', Icon: Box },
  { label: 'Design Systems', Icon: LayoutGrid },
  { label: 'Journey mapping', Icon: Map },
  { label: 'SaaS Design', Icon: Cloud },
  { label: 'Web Design', Icon: Monitor },
]

const ROW2_SKILLS = [
  { label: 'App Design', Icon: Smartphone },
  { label: 'Accessibility', Icon: Accessibility },
  { label: 'UX Research', Icon: Search },
  { label: 'Workshops', Icon: Users },
  { label: 'Information Architecture', Icon: GitBranch },
  { label: 'Dashboards', Icon: BarChart3 },
  { label: 'Product Strategy', Icon: Lightbulb },
]

const MARQUEE_DURATION = 50
const MARQUEE_COPIES = 4

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return prefersReducedMotion
}

function ChipRow({ items, direction = 'left', reduceMotion }) {
  const duplicated = useMemo(() => Array.from({ length: MARQUEE_COPIES }, () => items).flat(), [items])
  const marqueeVariants = {
    left: {
      x: ['0%', '-25%'],
      transition: { repeat: Infinity, repeatType: 'loop', duration: MARQUEE_DURATION, ease: 'linear' },
    },
    right: {
      x: ['-25%', '0%'],
      transition: { repeat: Infinity, repeatType: 'loop', duration: MARQUEE_DURATION, ease: 'linear' },
    },
  }
  return (
    <motion.div
      className="flex items-center gap-3 shrink-0 w-max"
      animate={reduceMotion ? undefined : marqueeVariants[direction]}
    >
      {duplicated.map((item, i) => {
        const Icon = item.Icon
        return (
          <span
            key={`${item.label}-${i}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm whitespace-nowrap"
          >
            <Icon className="h-4 w-4 shrink-0 text-white/80" aria-hidden />
            {item.label}
          </span>
        )
      })}
    </motion.div>
  )
}

export default function HomeHowIWorkSection() {
  const reduceMotion = usePrefersReducedMotion()

  return (
    <section
      className="relative w-full py-24 md:py-32"
      aria-labelledby="how-i-work-heading"
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* Content – same width as Container (max-w-2xl lg:max-w-5xl) */}
      <div className="mx-auto max-w-7xl sm:px-8 lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl mb-12 md:mb-16">
            <h2
              id="how-i-work-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white"
            >
              How I work
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white/85 leading-relaxed">
              I work as a senior product designer supporting teams on complex
              products from early discovery through to delivery.
            </p>
            <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed">
              I typically join existing teams to bring clarity to messy problems
              and help move ideas into well-considered, buildable solutions. I
              work closely with product managers and engineers, designing with
              real constraints in mind and a strong focus on usability and scale.
            </p>
            <div className="mt-8">
              <Button
                variant="lightOutline"
                href="https://www.webcreativity.studio/about"
                className="px-6 py-3 text-base"
              >
                Learn more about me
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chips – full-width strip, marquee runs edge to edge (not cropped by container) */}
      <div className="relative w-full overflow-hidden mt-16 sm:mt-20 space-y-6">
        <div className="overflow-hidden">
          <ChipRow items={ROW1_SKILLS} direction="left" reduceMotion={reduceMotion} />
        </div>
        <div className="overflow-hidden">
          <ChipRow items={ROW2_SKILLS} direction="right" reduceMotion={reduceMotion} />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-y-7 left-0 w-20 sm:w-28 md:w-36 bg-gradient-to-r from-[#141320] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-y-7 right-0 w-20 sm:w-28 md:w-36 bg-gradient-to-l from-[#141320] to-transparent"
        />
      </div>
    </section>
  )
}
