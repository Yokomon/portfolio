import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { Experience as ExperienceProps } from '@/types/About'
import { Details } from './about'
import { TracingBeam } from './ui/TraceBeam'

const Experience: React.FC<{ experience: ExperienceProps[] }> = ({ experience }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  })
  return (
    <div className='mb-16'>
      <h2 className='text-5xl lg:text-8xl font-bold mb-16 sm:mb-32 mt-16 text-center dark:text-white'>
        Experience
      </h2>
      <div className='w-full sm:w-[90%] lg:w-[75%] mx-auto relative'>
        <TracingBeam>
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
        </TracingBeam>
      </div>
    </div>
  )
}

export default Experience
