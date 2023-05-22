import React from 'react'
import { ProjectComponents } from '@/types/Project'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { AiFillGithub } from 'react-icons/ai'
import { FramerImage } from '../common'
import { getProjectIcons } from '@/lib/getProjectIcons'

const Project: React.FC<ProjectComponents> = ({ url, name, image, featured, githubUrl }) => (
  <article className='w-full flex flex-col relative justify-between rounded-3xl border border-solid border-dark bg-light dark:bg-slate-900 dark:border-slate-300 shadow-2xl p-4 sm:p-8'>
    <div className='absolute top-1 sm:top-0 -right-1.5 sm:-right-3 -z-10 w-[101%] h-[102%] sm:h-[103%] rounded-[2rem] bg-dark dark:bg-slate-300' />
    <Link href={url} target='_blank' className='cursor-pointer overflow-hidden rounded-lg'>
      <FramerImage
        src={image.url}
        alt={name}
        className='w-full h-auto'
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        placeholder='blur'
        blurDataURL={image.metadata.lqip}
      />
    </Link>
    <div className='flex flex-col justify-between'>
      <span className='text-primary dark:text-orange-500 font-medium text-xl mt-5'>{featured}</span>
      <Link href={url} target='_blank' className='hover:underline hover:underline-offset-2'>
        <h2 className='text-lg md:text-3xl lg:text-4xl font-bold w-full text-left my-2 dark:text-slate-400'>
          {name}
        </h2>
      </Link>
      <div className='mt-2 flex items-center justify-between'>
        <Link
          href={url}
          target='_blank'
          className='rounded-lg bg-dark hover:duration-300 text-light p-2 px-6 text-lg font-semibold hover:bg-light dark:hover:text-light dark:bg-slate-900 dark:border-slate-300 hover:text-dark border border-solid border-dark'
        >
          Visit
        </Link>
        <Link href={githubUrl} target='_blank'>
          <AiFillGithub size={28} className='dark:fill-light' />
        </Link>
      </div>
    </div>
  </article>
)

const FeaturedProject: React.FC<ProjectComponents> = ({
  url,
  featured,
  name,
  summary,
  image,
  githubUrl,
  tools,
}) => {
  return (
    <article className='w-full flex flex-col sm:flex-row items-center justify-between relative rounded-2xl sm:rounded-3xl border border-solid border-dark bg-light dark:bg-slate-900 dark:border-slate-300 shadow-2xl p-4 sm:p-8'>
      <div className='absolute top-0 -right-1.5 sm:-right-3 -z-10 w-[101%] h-[101%] sm:h-[103%] rounded-[2rem] bg-dark dark:bg-slate-300' />

      <Link
        href={url}
        target='_blank'
        className='cursor-pointer overflow-hidden rounded-lg w-full border border-dark dark:border-0 sm:w-1/2'
      >
        <FramerImage
          src={image.url}
          alt={name}
          className='w-full h-full'
          whileHover={{ scale: 1.05 }}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px): 50vw, 50vw'
          priority
          width={400}
          height={250}
          transition={{ duration: 0.2 }}
          placeholder='blur'
          blurDataURL={image.metadata.lqip}
        />
      </Link>
      <div className='w-full sm:w-1/2 flex flex-col items-start justify-between px-0 sm:pl-6'>
        {featured && (
          <span className='text-primary dark:text-orange-500 font-medium text-xl mt-5'>
            Featured Project
          </span>
        )}
        <Link href={url} target='_blank' className='hover:underline hover:underline-offset-2'>
          <h2 className='text-xl md:text-3xl lg:text-4xl font-bold w-full text-left my-2 dark:text-slate-400'>
            {name}
          </h2>
        </Link>
        <PortableText
          value={summary}
          components={{
            block: {
              normal: ({ children }) => (
                <p className='my-2 font-medium text-sm sm:text-base text-dark dark:text-slate-400'>
                  {children}
                </p>
              ),
            },
          }}
        />
        <div className='flex items-center flex-wrap my-3 space-x-5'>
          <span className='dark:text-slate-400 text-sm'>Tools used:</span>
          {tools.map((tool, idx) =>
            React.createElement(getProjectIcons[tool].icon, {
              size: 24,
              className: getProjectIcons[tool].iconClass,
              key: idx,
            }),
          )}
        </div>
        <div className='mt-2 flex items-center'>
          <Link href={githubUrl} target='_blank'>
            <AiFillGithub size={28} className='dark:fill-light' />
          </Link>
          <Link
            href={url}
            target='_blank'
            className='ml-4 rounded-lg hover:duration-300 bg-dark dark:bg-slate-900 dark:border-slate-400 hover:dark:text-light text-light p-2 px-4 sm:px-6 text-base sm:text-lg font-semibold hover:bg-light hover:text-dark border border-solid border-dark'
          >
            Visit Project
          </Link>
        </div>
      </div>
    </article>
  )
}

export { Project, FeaturedProject }
