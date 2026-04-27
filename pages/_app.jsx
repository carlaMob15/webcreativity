import { useEffect, useRef } from 'react'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Footer } from '../src/components/Footer'
import { Header } from '../src/components/Header'
import SEO from '../src/components/SEO'
import StructuredData from '../src/components/StructuredData'
import '../src/styles/tailwind.css'
import 'focus-visible'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)

  return (
    <>
      <SEO 
        title="Home"
        description="Carla Castillo's portfolio showcasing web development and design projects"
        canonical={`https://carlacastillo.com${router.pathname}`}
      />
      <StructuredData />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#6366f1" />
      </Head>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.asPath}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <Component previousPathname={previousPathname} {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
      <Analytics />
    </>
  )
}
