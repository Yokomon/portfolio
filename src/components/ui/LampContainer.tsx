'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'

export const LampContainer = () => {
  const isMobile = useMediaQuery('(max-width: 425px)')
  const isTablet = useMediaQuery('(max-width: 768px)')

  return (
    <div className='translate-y-44 hidden dark:block'>
      <div className='relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0'>
        <motion.div
          initial={{ opacity: 0.5, width: '3rem' }}
          whileInView={{ opacity: 1, width: isMobile ? '9rem' : isTablet ? '20rem' : '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
          }}
          className='absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-orange-400 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]'
        >
          <div className='absolute w-[100%] left-0 dark:bg-slate-900 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]' />
          <div className='absolute w-40 h-[100%] left-0 bottom-0 dark:bg-slate-900  z-20 [mask-image:linear-gradient(to_right,white,transparent)]' />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: '3rem' }}
          whileInView={{ opacity: 1, width: isMobile ? '9rem' : isTablet ? '20rem' : '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
          }}
          className='absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-orange-400 text-white [--conic-position:from_290deg_at_center_top]'
        >
          <div className='absolute w-40 h-[100%] right-0 dark:bg-slate-900 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]' />
          <div className='absolute w-[100%] right-0 h-40 dark:bg-slate-900 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]' />
        </motion.div>
        <div className='absolute top-1/2 h-48 w-full translate-y-12 blur-2xl'></div>
        <div className='absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-3xl'></div>
        <div className='absolute inset-auto z-50 h-36 w-[20rem] sm:w-[28rem] -translate-y-1/2 rounded-full bg-orange-500 opacity-50 blur-3xl'></div>
        <motion.div
          initial={{ width: '3rem' }}
          whileInView={{ width: '16rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className='absolute inset-auto z-30 h-10 w-64 -translate-y-[6rem] rounded-full bg-orange-400 blur-2xl'
        ></motion.div>
        <motion.div
          initial={{ width: isMobile ? '3rem' : isTablet ? '12rem' : '18rem' }}
          whileInView={{ width: isMobile ? '9rem' : isTablet ? '20rem' : '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className='absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-orange-400 '
        ></motion.div>
      </div>
    </div>
  )
}
