import Link from 'next/link'
import { motion } from 'framer-motion'

const MotionLink = motion(Link)

export const Logo = () => {
  return (
    <div className='flex items-center justify-center'>
      <MotionLink
        href={'/'}
        className='w-16 h-16 bg-dark hover:bg-orange-500 dark:bg-orange-500 duration-300 hover:scale-105 text-white flex items-center justify-center rounded-full text-2xl font-bold'
      >
        MM
      </MotionLink>
    </div>
  )
}
