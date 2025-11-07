'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { HiLightBulb } from 'react-icons/hi'
import { BsMoonStars } from 'react-icons/bs'
import { gsap } from 'gsap'

import { Logo } from './Logo'
import { mobileSocialLinks, socalLinks } from './Links'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../components/ui/sheet'

const NavBar = () => {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const navRef = useRef<HTMLElement>(null)

  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 1])

  useEffect(() => {
    setMounted(true)

    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out',
        },
      )
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects']
      const scrollPosition = window.scrollY + 200

      setScrolled(window.scrollY > 50)

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault()
    const element = document.getElementById(href.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (!mounted) {
    return null
  }

  const handleDarkMode = () => {
    if (theme === 'dark') {
      setTheme('light')
      return
    }
    setTheme('dark')
  }

  return (
    <motion.header
      ref={navRef}
      style={{ opacity: navOpacity }}
      className={`fixed top-0 left-0 right-0 w-full py-4 sm:py-5 px-4 sm:px-8 lg:px-12 xl:px-16 font-medium z-30 grid grid-cols-[auto_1fr_auto] lg:flex lg:items-center lg:justify-between transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-transparent backdrop-blur-3xl shadow-lg border-b border-orange-500/10 dark:border-0'
          : 'bg-transparent border-none border-0'
      }`}
    >
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <motion.button
            aria-label='nav'
            className='flex-col justify-center items-center duration-300 flex lg:hidden relative p-2 rounded-md hover:bg-orange-500/10 dark:hover:bg-orange-400/10'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className='bg-dark focus:outline-none dark:bg-light duration-300 block h-0.5 w-6 rounded-sm -translate-y-0.5'></span>
            <span className='bg-dark focus:outline-none dark:bg-light duration-300 block h-0.5 w-6 rounded-sm my-0.5'></span>
            <span className='bg-dark focus:outline-none dark:bg-light duration-300 block h-0.5 w-6 rounded-sm translate-y-0.5'></span>
          </motion.button>
        </SheetTrigger>
        <SheetContent className='w-[300px] sm:w-[350px] bg-gradient-to-br from-white/95 to-white/90 dark:from-slate-900/95 dark:to-slate-800/90 backdrop-blur-2xl border-r border-orange-500/20 dark:border-orange-400/20 z-50 font-medium'>
          <SheetHeader className='text-left'>
            <SheetTitle className='text-2xl font-bold text-orange-600 dark:text-orange-400'>
              Portfolio Links
            </SheetTitle>
          </SheetHeader>

          <nav className='flex flex-col gap-6 mt-8'>
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: 'Projects' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={(e) => {
                  handleSmoothScroll(e, `#${id}`)
                  setSheetOpen(false)
                }}
                className='text-left hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 text-base font-semibold'
              >
                {label}
              </button>
            ))}
          </nav>

          <div className='flex items-center justify-center flex-wrap gap-4 mt-8 pt-6 border-t border-orange-500/20 dark:border-orange-400/20'>
            {mobileSocialLinks.map(({ href, icon, fill, className, name, linkStyles }, idx) => (
              <motion.a
                key={idx}
                href={href as string}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={name}
                className={`${linkStyles} hover:scale-110 transition-transform duration-300`}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {React.createElement(icon, { size: 32, className, fill })}
              </motion.a>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5 },
        }}
        className='w-full justify-between items-center hidden lg:flex'
      >
        <nav className='flex items-center gap-8'>
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'experience', label: 'Experience' },
            { id: 'projects', label: 'Projects' },
          ].map(({ id, label }) => (
            <Link key={id} href={`#${id}`}>
              <motion.span
                onClick={(e) => handleSmoothScroll(e, `#${id}`)}
                className={`relative group text-base font-semibold transition-colors duration-300 ${
                  activeSection === id
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-dark dark:text-white hover:text-orange-600 dark:hover:text-orange-400'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 transition-all duration-300 ${
                    activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                >
                  &nbsp;
                </span>
              </motion.span>
            </Link>
          ))}
        </nav>

        {/* Social Links & Theme Toggle */}
        <nav className='flex items-center gap-4'>
          {socalLinks.map(({ href, icon, fill, className, name, linkStyles }, idx) => (
            <motion.a
              href={href as string}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={name}
              className={`${linkStyles} hover:scale-110 transition-transform duration-300`}
              key={idx}
              whileHover={{ y: -3, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              {React.createElement(icon, { size: 32, className, fill })}
            </motion.a>
          ))}

          <motion.button
            className='ml-4 p-2 rounded-full hover:bg-orange-500/10 dark:hover:bg-orange-400/10 transition-colors duration-300'
            aria-label='theme'
            onClick={handleDarkMode}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === 'dark' ? (
              <HiLightBulb size={28} className='dark:fill-yellow-400' />
            ) : (
              <BsMoonStars size={24} className='fill-dark' />
            )}
          </motion.button>
        </nav>
      </motion.div>

      {/* Logo - Center */}
      <motion.div
        className='justify-self-center z-[60] lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:z-auto'
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
      >
        <Logo />
      </motion.div>

      {/* Theme Toggle - Right (Mobile) */}
      <motion.button
        className='lg:hidden p-2 rounded-full hover:bg-orange-500/10 dark:hover:bg-orange-400/10 transition-colors duration-300'
        type='button'
        aria-label='theme'
        onClick={handleDarkMode}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === 'dark' ? (
          <HiLightBulb size={32} className='dark:fill-yellow-400' />
        ) : (
          <BsMoonStars size={28} className='fill-dark' />
        )}
      </motion.button>
    </motion.header>
  )
}

export default NavBar
