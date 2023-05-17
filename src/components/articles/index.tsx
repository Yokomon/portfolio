import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArticleComponent, FeaturedArticlesInterface } from '@/types/Articles'
import { FramerImage } from '../common'

const Article: React.FC<ArticleComponent> = ({ title, date, link }) => {
  return (
    <motion.li
      initial={{
        y: 50,
      }}
      whileInView={{
        y: 0,
        transition: { duration: 0.5, ease: 'easeInOut' },
      }}
      viewport={{ once: true }}
      className='relative w-full items-center flex flex-wrap rounded-xl border-r-4 border-b-4 p-3 my-5 justify-between bg-light text-dark first:mt-0 border border-solid border-dark dark:bg-slate-900 dark:border-slate-300'
    >
      <Link href={`articles/${link}`}>
        <h2 className='font-medium text-base mr-4 hover:underline hover:duration-500 dark:text-slate-400'>
          {title}
        </h2>
      </Link>
      <span className='text-primary dark:text-orange-500 font-semibold text-sm sm:text-base pl-0 p-2 sm:p-4'>
        {date as string}
      </span>
    </motion.li>
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
    <li className='col-span-2 sm:col-span-1 w-full p-4 bg-light border border-dark border-solid dark:bg-slate-900 dark:border-slate-300 rounded-2xl'>
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
        className=' block w-fit'
      >
        <h2 className='capitalize text-xl sm:text-2xl font-bold my-2 hover:underline dark:text-slate-400'>
          {title}
        </h2>
      </Link>
      <p className='text-sm mb-2 dark:text-slate-400'>{summary}</p>
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
    </li>
  )
}

export { FeaturedArticles, Article }
