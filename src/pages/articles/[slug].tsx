import { getArticle, getArticles } from '@/sanity/schemas/sanity-utils'
import { AnimatedText, FramerImage } from '@/src/components/common'
import Layout from '@/src/components/Layout'
import { Meta } from '@/src/components/Meta'
import { ArticleItems } from '@/types/Articles'
import { PortableText } from '@portabletext/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

type ArticleSlug = {
  data: ArticleItems
}

const Slug = ({ data }: ArticleSlug) => {
  const { ogImage, ogTitle, ogType, ogUrl, description, title, keywords, name, body } = data
  return (
    <>
      <Meta
        description={description}
        title={title}
        ogUrl={ogUrl}
        ogImage={ogImage}
        ogTitle={ogTitle}
        ogType={ogType}
        keywords={keywords}
      />
      <main className='w-full mb-16 dark:my-0 flex flex-col items-center min-h-screen overflow-hidden'>
        <Layout className='pt-16 px-8 md:px-32 lg:px-48 xl:px-64'>
          <AnimatedText text={name} className='text-[44px] sm:text-4xl lg:text-5xl mb-4' centered />
          <PortableText
            value={body}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className='font-normal my-8 mx-auto dark:text-slate-400 text-base'>
                    {children}
                  </p>
                ),
                h1: ({ children }) => (
                  <h1 className='text-3xl font-bold dark:text-slate-400'>{children}</h1>
                ),
                h6: ({ children }) => (
                  <h6 className='text-sm font-semibold text-gray-400 text-center dark:text-slate-400'>
                    {children}
                  </h6>
                ),
              },
              types: {
                image: ({ value }) => (
                  <div className='overflow-hidden rounded-2xl'>
                    <FramerImage
                      initial={{
                        opacity: 0,
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.25 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 1.5 },
                      }}
                      src={value.asset.url}
                      alt='Marow Macaulay'
                      width={300}
                      height={350}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px): 50vw, 50vw'
                      priority
                      placeholder='blur'
                      blurDataURL={value.asset.metadata.lqip}
                      className='w-full h-auto cursor-pointer rounded-2xl border border-dark/25 dark:border-slate-600'
                    />
                  </div>
                ),
                code: ({ value }) => (
                  <SyntaxHighlighter
                    customStyle={{
                      lineHeight: '1.6',
                      fontSize: '12px',
                    }}
                    codeTagProps={{
                      style: {
                        lineHeight: 'inherit',
                        fontSize: 'inherit',
                      },
                    }}
                    style={oneDark}
                    language='javascript'
                  >
                    {value.code}
                  </SyntaxHighlighter>
                ),
              },
              list: {
                number: ({ children }) => <ol className='list-decimal'>{children}</ol>,
                bullet: ({ children }) => {
                  return <ul className='list-disc'>{children}</ul>
                },
              },
              listItem: {
                bullet: ({ children }) => (
                  <li
                    style={{ listStyleType: 'disclosure-closed' }}
                    className='pb-3 dark:text-slate-400'
                  >
                    {children}
                  </li>
                ),
                number: ({ children }) => <li className='pb-3 dark:text-slate-400'>{children}</li>,
              },
            }}
          />
        </Layout>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const data = await getArticles()
  const paths = data.map(({ slug }) => ({
    params: {
      slug: slug.current,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params
  const data = await getArticle(slug)
  return {
    props: {
      data,
    },
    revalidate: 10,
  }
}

export default Slug
