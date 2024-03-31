import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Skill as SkillProps } from '@/types/About'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'

const Skill: React.FC<SkillProps> = ({ name, x, y, center, icon, iconClass }) => {
  const isTablet = useMediaQuery('(max-width: 1280px)')

  return (
    <motion.div
      className={clsx({
        ['flex items-center text-sm justify-center sm:font-semibold text-dark xl:text-light dark:text-light font-bold rounded-full cursor-pointer xl:absolute xl:bg-dark shadow-dark']:
          true,
        ['p-8']: center,
        ['py-2 px-4 lg:py-3 lg:px-6']: !center,
      })}
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: isTablet ? 0 : x, y: isTablet ? 0 : y }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
    >
      {icon && React.createElement(icon, { size: 24, className: iconClass })}
      {name}
    </motion.div>
  )
}

export default Skill
