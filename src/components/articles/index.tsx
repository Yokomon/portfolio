import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArticleComponent, FeaturedArticlesInterface } from '@/types/Articles'
import { FramerImage } from '../common'

const Article: React.FC<ArticleComponent> = ({ title, date, link }) => {
  return (
    <motion.li
      initial={{
        y: 100,
      }}
      whileInView={{
        y: 0,
        transition: { duration: 0.5, ease: 'easeInOut' },
      }}
      viewport={{ once: true }}
      className='relative w-full items-center flex flex-wrap rounded-xl border-r-4 border-b-4 p-3 my-4 justify-between bg-light text-dark first:mt-0 border border-solid border-dark dark:bg-slate-900 dark:border-slate-300'
    >
      <Link href={link} target='_blank'>
        <h2 className='font-medium text-base mr-4 hover:underline hover:duration-500 dark:text-slate-400'>
          {title}
        </h2>
      </Link>
      <span className='text-primary dark:text-orange-500 font-semibold text-sm sm:text-base pl-0 p-2 sm:p-4'>
        {date as string}{' '}
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
}) => {
  return (
    <li className='col-span-2 sm:col-span-1 w-full p-4 bg-light border border-dark border-solid dark:bg-slate-900 dark:border-slate-300 rounded-2xl'>
      <Link
        href={link}
        target='_blank'
        className='cursor-pointer overflow-hidden rounded-lg inline-block w-full'
      >
        <FramerImage
          src={imgSrc}
          alt={title}
          className='w-full h-auto'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          width={440}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px): 50vw, 50vw'
          priority
          height={250}
        />
      </Link>
      <Link href={link} target='_blank' className=' block w-fit'>
        <h2 className='capitalize text-xl sm:text-2xl font-bold my-2 hover:underline dark:text-slate-400'>
          {title}
        </h2>
      </Link>
      <p className='text-sm mb-2 dark:text-slate-400'>{summary}</p>
      <span className='text-primary dark:text-orange-500 text-sm sm:text-base font-semibold'>
        {duration}
      </span>
    </li>
  )
}

export { FeaturedArticles, Article }
