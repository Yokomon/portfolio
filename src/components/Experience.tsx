import { Experience as ExperienceProps } from '@/types/About'
import { Details } from './about'
import { TracingBeam } from './ui/TraceBeam'

const Experience: React.FC<{ experience: ExperienceProps[] }> = ({ experience }) => {
  return (
    <div className='mb-8 sm:mb-12 md:mb-16'>
      <div className='w-full sm:w-[90%] lg:w-[75%] xl:w-[70%] mx-auto relative'>
        <TracingBeam>
          <ul className='w-full flex flex-col items-start justify-between ml-2 sm:ml-4 px-2 sm:px-0'>
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
