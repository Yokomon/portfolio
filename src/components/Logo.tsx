import { motion } from 'framer-motion'

export const Logo = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='flex items-center justify-center'>
      <motion.button
        onClick={handleScrollToTop}
        className='w-12 h-12 sm:w-14 sm:h-14 bg-dark hover:bg-orange-500 dark:bg-orange-500 duration-300 hover:scale-105 text-white flex items-center justify-center rounded-full text-xl sm:text-2xl font-bold cursor-pointer'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        MM
      </motion.button>
    </div>
  )
}
