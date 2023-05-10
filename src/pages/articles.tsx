import Head from 'next/head'
import React from 'react'
import Layout from '../components/Layout'
import { formatSanityDate, getArticles } from '@/sanity/schemas/sanity-utils'
import { ArticlesProps } from '@/types/Articles'
import { Article, FeaturedArticles } from '@/components/articles'
import { AnimatedText } from '@/components/common'

const articles: React.FC<ArticlesProps> = ({ articles }) => {
  return (
    <>
      <Head>
        <title>Articles | Marow Macaulay</title>
      </Head>
      <main className='w-full mb-16 dark:my-0 flex flex-col items-center min-h-screen overflow-hidden'>
        <Layout className='pt-16'>
          <AnimatedText
            text='Words are medicine to the soul!'
            className='text-[44px] sm:text-5xl lg:text-7xl mb-16'
            textWrapper='text-center'
          />
          <ul className='grid grid-cols-2 gap-16'>
            {articles.map(({ name, url, summary, image, duration }, idx) => (
              <FeaturedArticles
                link={url}
                title={name}
                imgSrc={image}
                summary={summary}
                duration={duration}
                key={idx}
              />
            ))}
          </ul>
          <h2 className='font-bold text-4xl w-full text-center my-16 mt-20 sm:mt-32 dark:text-slate-400'>
            All articles
          </h2>
          <ul>
            {articles.map(({ name, _createdAt, url }, idx) => (
              <Article key={idx} title={name} date={_createdAt} link={url} />
            ))}
          </ul>
        </Layout>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const articles = await getArticles()

  const transformedResponse = articles.map(({ _createdAt, ...article }) => ({
    _createdAt: formatSanityDate(_createdAt),
    ...article,
  }))

  return {
    props: {
      articles: transformedResponse,
    },
    revalidate: 10,
  }
}

export default articles
