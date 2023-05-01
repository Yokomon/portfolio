import Link from 'next/link'
import { motion } from 'framer-motion'

const MotionLink = motion(Link)

export const Logo = () => {
  return (
    <div className='flex items-center justify-center'>
      <MotionLink
        href={'/'}
        className='w-16 h-16 bg-dark hover:bg-orange-500 dark:bg-orange-500/70 duration-500 text-light flex items-center justify-center rounded-full text-2xl font-bold'
        whileHover={{
          scale: 1.1,
        }}
      >
        MM
      </MotionLink>
    </div>
  )
}
