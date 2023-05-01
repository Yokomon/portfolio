import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { Experience as ExperienceProps } from '@/types/About'
import { Details } from './about'

const Experience: React.FC<{ experience: ExperienceProps[] }> = ({ experience }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  })
  return (
    <div className='mb-16'>
      <h2 className='text-5xl lg:text-8xl font-bold mb-16 sm:mb-32 mt-16 text-center dark:text-slate-400'>
        Experience
      </h2>
      <div className='w-full sm:w-[90%] lg:w-[75%] mx-auto relative'>
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className='absolute -left-[5px] sm:left-8 top-0 w-[2px] sm:w-[4px] h-full bg-dark dark:bg-slate-400 origin-top'
          ref={ref}
        />
        <ul className='w-full flex flex-col items-start justify-between ml-2 sm:ml-4'>
          {experience.map(
            ({ company, companyLocation, companyUrl, workSummary, workTitle, duration }, idx) => (
              <Details
                key={idx}
                company={company}
                position={workTitle}
                duration={duration}
                address={companyLocation}
                work={workSummary}
                companyLink={companyUrl}
              />
            ),
          )}
        </ul>
      </div>
    </div>
  )
}

export default Experience
