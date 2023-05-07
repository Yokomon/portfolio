import React, { SetStateAction, useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { mobileSocialLinks, socalLinks } from './Links'
import { HiLightBulb } from 'react-icons/hi'
import { BsMoonStars } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { Theme } from './hooks/useThemeSwitcher'
import { CustomLink, CustomMobileLink } from './common/Links'

interface NavBarProps {
  mode: Theme
  setMode: React.Dispatch<SetStateAction<Theme>>
}

const NavBar: React.FC<NavBarProps> = ({ mode, setMode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const defaultTheme = [Theme.light, Theme.default].includes(mode)

  useEffect(() => {
    // Prevent scrolling when navbar is active
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleDarkMode = () => setMode(defaultTheme ? Theme.dark : Theme.light)

  return (
    <header className='w-full px-5 sm:px-18 lg:px-32 py-8 font-medium flex items-center justify-between dark:bg-slate-900 relative'>
      <button
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
          {socalLinks.map(({ href, icon, fill, className, linkStyles }, idx) => (
            <Link href={href} target='_blank' className={linkStyles} key={idx}>
              {React.createElement(icon, { size: 35, className, fill })}
            </Link>
          ))}

          <button className='mx-8' onClick={handleDarkMode}>
            {mode === 'dark' ? (
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
            {mobileSocialLinks.map(({ href, icon, fill, className, linkStyles }, idx) => (
              <Link href={href} target='_blank' className={linkStyles} key={idx}>
                {React.createElement(icon, { size: 35, className, fill })}
              </Link>
            ))}

            <button className='mx-8 my-4' onClick={handleDarkMode}>
              {mode === 'dark' ? (
                <HiLightBulb
                  size={30}
                  className='dark:fill-yellow-400 hover:scale-105 duration-300'
                />
              ) : (
                <BsMoonStars size={26} className='fill-light hover:scale-105 duration-300' />
              )}
            </button>
          </nav>
        </motion.div>
      )}

      <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
        <Logo />
      </div>
    </header>
  )
}

export default NavBar
