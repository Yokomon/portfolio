import React from 'react'
import Layout from '@/components/Layout'
import { formatSanityDate, getArticles } from '@/sanity/schemas/sanity-utils'
import { ArticlesProps } from '@/types/Articles'
import { Article, FeaturedArticles } from '@/components/articles'
import { AnimatedText } from '@/components/common'
import { Meta } from '@/components/Meta'

const ArticlePage: React.FC<ArticlesProps> = ({ articles }) => {
  return (
    <>
      <Meta
        description={
          'Explore a collection of informative articles on various topics. Stay updated with the latest insights, trends, and tips shared by Marow Macaulay'
        }
        title={'Articles - Marow Macaulay'}
        keywords={
          'marow, macaulay, marow macaulay, articles, blog, insights, trends, tips, information, knowledge'
        }
        ogImage={'/articles-img.jpeg'}
        ogTitle={'Articles - Marow Macaulay'}
        ogType={'website'}
        ogUrl={'https://marowmacaulay.me/articles'}
      />
      <main className='w-full mb-16 dark:my-0 flex flex-col items-center min-h-screen overflow-hidden'>
        <Layout className='pt-16'>
          <AnimatedText
            text='Words are medicine to the soul!'
            className='text-[44px] sm:text-5xl lg:text-7xl mb-16'
            centered
          />
          <ul className='grid grid-cols-2 gap-16'>
            {articles.map(({ name, url, summary, image, external, duration, slug }, idx) => (
              <FeaturedArticles
                slug={slug}
                link={url}
                title={name}
                imgSrc={image}
                summary={summary}
                duration={duration}
                key={idx}
                external={external}
              />
            ))}
          </ul>
          <h2 className='font-bold text-4xl w-full text-center my-16 mt-20 sm:mt-32 dark:text-slate-400'>
            All articles
          </h2>
          <ul>
            {articles.map(({ name, _createdAt, slug }, idx) => (
              <Article key={idx} title={name} date={_createdAt} link={slug.current} />
            ))}
          </ul>
        </Layout>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const data = await getArticles()
  const transformedResponse = data.map(({ _createdAt, ...article }) => ({
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

export default ArticlePage
