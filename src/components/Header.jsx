import { Fragment, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { SiLinkedin, SiDribbble } from 'react-icons/si'

import { Container } from './Container'
import { Button } from './Button'
import siteMetadata from '../data/siteMetadata'

function NavItem({ href, children }) {
  let isActive = useRouter().pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        'relative text-sm transition-colors duration-300',
        isActive
          ? 'text-neutral-900 dark:text-white'
          : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavItem({ href, children, onClick }) {
  let isActive = useRouter().pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'block py-4 text-base font-medium transition-all duration-300 ease-in-out',
        'hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900',
        isActive
          ? 'text-primary-500'
          : 'text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400'
      )}
    >
      {children}
    </Link>
  )
}

function MobileNav() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-800/90 dark:ring-white/10 dark:hover:ring-white/20"
        aria-label="Toggle Menu"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-6 w-6 stroke-neutral-900 dark:stroke-neutral-200"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            as={motion.div}
            static
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            open={isOpen}
            onClose={setIsOpen}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <Dialog.Overlay
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white px-6 py-4 shadow-xl dark:bg-neutral-900"
            >
              <div className="flex items-center justify-between">
                <Link 
                  href="/" 
                  className="transition-transform duration-300 hover:scale-105" 
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {siteMetadata.headerTitle}
                    <span className="text-[#6366f1] text-2xl ml-0.5">.</span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 transition-all duration-300 hover:bg-neutral-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:hover:bg-neutral-800"
                  aria-label="Close Menu"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-6 w-6 text-neutral-900 dark:text-neutral-200"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              
              <nav className="mt-4">
                <div className="flex flex-col space-y-2">
                  {siteMetadata.siteNavLinks.map((link) =>
                    link.name === 'Contact' ? (
                      <div key={link.href}>
                        <Button
                          href={link.href}
                          variant="headerContact"
                          className="w-full justify-center py-2.5"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.name}
                        </Button>
                      </div>
                    ) : (
                      <MobileNavItem
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </MobileNavItem>
                    )
                  )}
                </div>
              </nav>

              {/* Social Icons */}
              <div className="flex items-center space-x-6 mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <Link href={siteMetadata.socials.linkedin || '#'} className="group" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <SiLinkedin className="w-6 h-6 text-[#6366f1] group-hover:text-[#4f46e5] transition-colors duration-200" />
                </Link>
                <Link href={siteMetadata.socials.dribbble || '#'} className="group" aria-label="Dribbble" target="_blank" rel="noopener noreferrer">
                  <SiDribbble className="w-6 h-6 text-[#6366f1] group-hover:text-[#4f46e5] transition-colors duration-200" />
                </Link>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

function DesktopNav() {
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-2">
        {siteMetadata.siteNavLinks.map((link) => (
          <li key={link.href}>
            <NavItem href={link.href}>{link.name}</NavItem>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200/80 dark:border-neutral-800/80"
    >
      <div className="max-w-[2000px] mx-auto px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section - Name */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="group transition-transform duration-300 hover:scale-105"
            >
              <span className="text-neutral-800 dark:text-neutral-200 font-semibold">
                {siteMetadata.headerTitle}
                <span className="text-[#6366f1] text-2xl ml-0.5">.</span>
              </span>
            </Link>
          </div>
          
          {/* Right section - Navigation and Social Icons */}
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex items-center space-x-8">
                {siteMetadata.siteNavLinks.map((link) => (
                  <li key={link.href}>
                    {link.name === 'Contact' ? (
                      <Button href={link.href} variant="headerContact">
                        {link.name}
                      </Button>
                    ) : (
                      <NavItem href={link.href}>{link.name}</NavItem>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <Link href={siteMetadata.socials.linkedin || '#'} className="group" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <SiLinkedin className="w-6 h-6 text-[#6366f1] group-hover:text-[#4f46e5] transition-colors duration-200" />
              </Link>
              <Link href={siteMetadata.socials.dribbble || '#'} className="group" aria-label="Dribbble" target="_blank" rel="noopener noreferrer">
                <SiDribbble className="w-6 h-6 text-[#6366f1] group-hover:text-[#4f46e5] transition-colors duration-200" />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
