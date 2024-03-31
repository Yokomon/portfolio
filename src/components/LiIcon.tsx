import { motion, MotionValue } from 'framer-motion'

const LiIcon: React.FC<{ scrollYProgress: MotionValue<number> }> = ({ scrollYProgress }) => {
  return (
    <figure className='absolute -left-[50px] sm:left-2 stroke-dark dark:stroke-orange-400'>
      <svg width='75' height='75' viewBox='0 0 100 100' className='w-[60px] sm:w-[75px]'>
        <circle cx='75' cy='50' r='20' className='stroke-primary stroke-1 fill-none' />
        <motion.circle
          cx='75'
          cy='50'
          r='20'
          className='stroke-[5px] fill-light dark:fill-slate-900'
          style={{
            pathLength: scrollYProgress,
          }}
        />
        <circle cx='75' cy='50' r='10' className='stroke-1 fill-primary dark:fill-orange-500' />
      </svg>
    </figure>
  )
}

export default LiIcon
