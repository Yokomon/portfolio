import Link from 'next/link'

import { ArticleComponent, FeaturedArticlesInterface } from '@/types/Articles'
import { FramerImage } from '../common'

const Article: React.FC<ArticleComponent> = ({ title, date, link }) => {
  return (
    <li className='relative group w-full items-center flex flex-wrap rounded-xl p-3 my-5 justify-between bg-light text-dark first:mt-0 border border-solid border-dark dark:bg-slate-900 dark:border-orange-500'>
      <div className='-z-10 absolute top-0 left-0 w-full group-hover:translate-y-1 h-full duration-500 rounded-[2rem] bg-dark dark:bg-gradient-to-t dark:from-orange-500 dark:to-[50%] dark:to-slate-900' />
      <Link href={`articles/${link}`}>
        <h2 className='font-medium text-base mr-4 hover:underline hover:duration-500 dark:text-white'>
          {title}
        </h2>
      </Link>
      <span className='text-primary dark:text-orange-500 font-semibold text-sm sm:text-base pl-0 p-2 sm:p-4'>
        {date as string}
      </span>
    </li>
  )
}

const FeaturedArticles: React.FC<FeaturedArticlesInterface> = ({
  link,
  imgSrc,
  title,
  duration,
  summary,
  slug,
  external,
}) => {
  return (
    <div className='w-full group flex flex-col relative rounded-2xl sm:rounded-3xl border border-solid border-dark bg-light dark:bg-slate-900 dark:border-orange-400 p-4 py-6'>
      <div className='-z-10 absolute top-0 left-0 w-full group-hover:translate-x-1 group-hover:translate-y-1 h-full duration-500 rounded-[2rem] bg-dark dark:bg-gradient-to-t dark:from-orange-500 dark:to-[50%] dark:to-slate-900' />
      <Link
        href={link ?? `/articles/${slug.current}`}
        target={link ? '_blank' : '_self'}
        className='cursor-pointer overflow-hidden rounded-lg inline-block w-full'
      >
        <FramerImage
          src={imgSrc.url}
          alt={title}
          className='w-full h-auto'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          width={440}
          placeholder='blur'
          blurDataURL={imgSrc.metadata.lqip}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px): 50vw, 50vw'
          priority
          height={230}
        />
      </Link>
      <Link
        href={link ?? `/articles/${slug.current}`}
        target={link ? '_blank' : '_self'}
        className=' block w-fit hover:underline underline-offset-4'
      >
        <h2 className='capitalize text-xl sm:text-2xl font-bold my-2 dark:text-white'>{title}</h2>
      </Link>
      <p className='text-sm mb-2 dark:text-white'>{summary}</p>
      <div className='flex flex-wrap justify-between items-center'>
        <span className='text-primary dark:text-orange-500 text-sm sm:text-base font-semibold'>
          {duration}
        </span>
        {external && (
          <span className='px-5 py-1 rounded-sm text-sm bg-gray-400 cursor-pointer text-dark hover:bg-gray-300 duration-500'>
            External
          </span>
        )}
      </div>
    </div>
  )
}

export { FeaturedArticles, Article }
