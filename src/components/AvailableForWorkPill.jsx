import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const AVATAR_SRC = '/images/hero-avatar.jpg?v=2'
const CONTACT_HREF = '/contact'
const DEFAULT_SCROLL_THRESHOLD = 250

export function AvailableForWorkPill({ heroRef, scrollThreshold = DEFAULT_SCROLL_THRESHOLD }) {
  const [showPill, setShowPill] = useState(false)

  // Home: show when hero scrolls out of view
  useEffect(() => {
    const el = heroRef?.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowPill(!entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [heroRef])

  // Other pages: show after short scroll (e.g. 200–300px); skip when heroRef is passed (home)
  useEffect(() => {
    if (heroRef != null) return

    const threshold = scrollThreshold ?? DEFAULT_SCROLL_THRESHOLD

    const check = () => setShowPill(typeof window !== 'undefined' && window.scrollY >= threshold)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [heroRef, scrollThreshold])

  return (
    <AnimatePresence>
      {showPill && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-x-0 bottom-20 sm:bottom-6 md:bottom-8 z-40 flex justify-center px-4 sm:px-8 lg:px-12"
        >
          <div className="mx-auto w-full max-w-7xl flex justify-center">
            <Link
            href={CONTACT_HREF}
            className="group flex items-center gap-3 rounded-full bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-md border border-neutral-200 transition-colors duration-300 cursor-pointer hover:border-[#6366F1]"
            aria-label="Available for work – go to contact"
          >
            <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={AVATAR_SRC}
                alt=""
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-neutral-700 transition-colors duration-300 group-hover:text-[#6366F1]">
              Available for work
            </span>
            <StatusDot />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function StatusDot() {
  return (
    <span className="relative flex h-3 w-3 flex-shrink-0 items-center justify-center" aria-hidden>
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-emerald-500"
        animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
      <span className="relative h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
    </span>
  )
}
