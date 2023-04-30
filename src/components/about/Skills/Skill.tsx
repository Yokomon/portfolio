import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Skill as SkillProps } from '@/types/About'

const Skill: React.FC<SkillProps> = ({ name, x, y, center, icon, iconClass }) => (
  <motion.div
    className={clsx({
      ['flex items-center text-sm justify-center sm:font-semibold text-dark sm:text-light dark:text-light font-bold rounded-full cursor-pointer absolute sm:bg-dark shadow-dark']:
        true,
      ['p-8']: center,
      ['py-2 px-4 lg:py-3 lg:px-6']: !center,
    })}
    whileHover={{ scale: 1.05 }}
    initial={{ x: 0, y: 0 }}
    whileInView={{ x, y }}
    viewport={{ once: true }}
    transition={{ duration: 1.5 }}
  >
    {icon && React.createElement(icon, { size: 24, className: iconClass })}
    {name}
  </motion.div>
)

export default Skill
