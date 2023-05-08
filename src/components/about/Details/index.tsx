import { useRef } from 'react'
import { useScroll, motion } from 'framer-motion'
import { SlLocationPin } from 'react-icons/sl'
import { MdAccessTime } from 'react-icons/md'
import { PortableText } from '@portabletext/react'

import { Details as DetailsProps } from '@/types/About'
import LiIcon from '../../LiIcon'

const Details: React.FC<DetailsProps> = ({
  position,
  company,
  companyLink,
  duration,
  address,
  work,
}) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['center end', 'center center'],
  })
  return (
    <li
      ref={ref}
      className='my-8 first:mt-0 last:mb-0 w-[90%] sm:w-[50%] mx-auto fle flex-col items-center justify-between'
    >
      <LiIcon scrollYProgress={scrollYProgress} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1.2, type: 'spring' }}
      >
        <h3 className='capitalize font-bold text-lg sm:text-xl lg:text-2xl dark:text-slate-400 mb-1.5'>
          {position}
          <p>
            <a
              href={companyLink}
              target='_blank'
              className='text-primary dark:text-orange-500/75 capitalize hover:underline hover:underline-offset-4'
              rel='noreferrer'
            >
              @ {company}
            </a>
          </p>
        </h3>
        <span className='capitalize flex flex-col items-start sm:flex-row sm:items-center font-medium text-dark/75 dark:text-slate-400 text-base'>
          <span className='flex items-center'>
            <MdAccessTime className='mr-2 text-primary dark:text-orange-500' /> {duration}
          </span>
          &nbsp; | &nbsp;
          <span className='flex items-center'>
            <SlLocationPin className='mr-2 text-primary dark:text-orange-500' />
            {address}
          </span>
        </span>
        <ul className='dark:text-slate-400 my-2'>
          <PortableText
            value={work}
            components={{
              block: {
                normal: ({ children }) => (
                  <li className='dark:before:text-orange-500 before:inline-block before:font-extrabold before:content-["\2022"] before:-ml-[1em] before:w-[1em] first:mt-0 my-4'>
                    {children}
                  </li>
                ),
              },
            }}
          />
        </ul>
      </motion.div>
    </li>
  )
}

export default Details
