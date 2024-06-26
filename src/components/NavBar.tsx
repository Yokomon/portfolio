'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { HiLightBulb } from 'react-icons/hi'
import { BsMoonStars } from 'react-icons/bs'

import { Logo } from './Logo'
import { mobileSocialLinks, socalLinks } from './Links'

import { CustomLink, CustomMobileLink } from './common/Links'

const NavBar = () => {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Prevent scrolling when navbar is active
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted) {
    return null
  }

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleDarkMode = () => {
    if (isOpen) setIsOpen(!isOpen)
    if (theme === 'dark') {
      setTheme('light')
      return
    }
    setTheme('dark')
  }

  return (
    <header className='w-full py-8 px-8 sm:px-12 lg:px-32 xl:px-12 xl:container xl:mx-auto font-medium flex items-center justify-between relative'>
      <button
        aria-label='nav'
        className='flex-col justify-center items-center duration-300 flex lg:hidden'
        onClick={handleMenu}
      >
        <span
          className={`bg-dark focus:outline-none dark:bg-light duration-300 block h-0.5 w-6 rounded-sm ${
            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
          }`}
        ></span>
        <span
          className={`bg-dark focus:outline-none dark:bg-light duration-300 block h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
        <span
          className={`bg-dark focus:outline-none dark:bg-light duration-300 block h-0.5 w-6 rounded-sm ${
            isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
          }`}
        ></span>
      </button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5 },
        }}
        className='w-full justify-between items-center hidden lg:flex'
      >
        <nav>
          <CustomLink href={'/'} title='Home' className='mr-4' />
          <CustomLink href={'/about'} title='About' className='mx-3' />
          <CustomLink href={'/projects'} title='Projects' className='mx-3' />
          <CustomLink href={'/articles'} title='Articles' className='ml-4' />
        </nav>

        <nav className='flex items-center justify-between flex-wrap'>
          {socalLinks.map(({ href, icon, fill, className, name, linkStyles }, idx) => (
            <Link href={href} target='_blank' aria-label={name} className={linkStyles} key={idx}>
              {React.createElement(icon, { size: 35, className, fill })}
            </Link>
          ))}

          <button className='mx-8' aria-label='theme' onClick={handleDarkMode}>
            {theme === 'dark' ? (
              <HiLightBulb
                size={30}
                className='dark:fill-yellow-400 hover:scale-105 duration-300'
              />
            ) : (
              <BsMoonStars size={26} className='fill-dark hover:scale-105 duration-300' />
            )}
          </button>
        </nav>
      </motion.div>

      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.3 },
          }}
          className='min-w-[70vw] z-30 flex flex-col justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32
      '
        >
          <nav className='flex items-center justify-center flex-col'>
            <CustomMobileLink toggle={handleMenu} href={'/'} title='Home' />
            <CustomMobileLink toggle={handleMenu} href={'/about'} title='About' />
            <CustomMobileLink toggle={handleMenu} href={'/projects'} title='Projects' />
            <CustomMobileLink toggle={handleMenu} href={'/articles'} title='Articles' />
          </nav>

          <nav className='flex items-center justify-center flex-wrap mt-2'>
            {mobileSocialLinks.map(({ href, icon, fill, className, name, linkStyles }, idx) => (
              <Link href={href} target='_blank' aria-label={name} className={linkStyles} key={idx}>
                {React.createElement(icon, { size: 35, className, fill })}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}

      <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
        <Logo />
      </div>

      <button className='lg:hidden' type='button' aria-label='theme' onClick={handleDarkMode}>
        {theme === 'dark' ? (
          <HiLightBulb size={35} className='dark:fill-yellow-300 hover:scale-105 duration-300' />
        ) : (
          <BsMoonStars size={30} className='fill-dark hover:scale-105 duration-300' />
        )}
      </button>
    </header>
  )
}

export default NavBar
