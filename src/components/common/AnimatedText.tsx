import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  textWrapper?: string
}

const quote = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const singleWord = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
    },
  },
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', textWrapper }) => {
  return (
    <div
      className={`w-full mx-auto overflow-hidden flex justify-center items-center py-0 sm:py-2 ${textWrapper}`}
    >
      <motion.h1
        variants={quote}
        initial='initial'
        animate='animate'
        className={`w-full text-dark dark:text-slate-400 font-bold capitalize text-5xl ${className}`}
      >
        {text.split(' ').map((word, idx) => (
          <motion.span variants={singleWord} key={word + '_' + idx} className={'inline-block'}>
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  )
}

export default AnimatedText
