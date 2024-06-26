import React from 'react'
import { PortableText } from '@portabletext/react'

import { AboutProps } from '@/types/About'
import { getAboutData } from '@/sanity/schemas/sanity-utils'
import { AnimatedText } from '@/components/common'

import Layout from '@/components/Layout'
import { Skills, AnimatedNumbers } from '@/components/about'
import Experience from '@/components/Experience'
import { Meta } from '@/components/Meta'
import ThemedImage from '@/components/common/ThemedImage'
import { LampContainer } from '../components/ui/LampContainer'

const about: React.FC<AboutProps> = ({ data }) => {
  const { lightImage, darkImage, biography, stats, experience, seo } = data
  const { title, ogType, ogImage, description, keywords, ogTitle, ogUrl } = seo

  return (
    <>
      <Meta
        description={description}
        title={title}
        keywords={keywords}
        ogImage={ogImage}
        ogTitle={ogTitle}
        ogType={ogType}
        ogUrl={ogUrl}
      />
      <main className='w-full flex flex-col items-center min-h-screen mb-16 dark:my-0'>
        <Layout>
          <LampContainer />
          <AnimatedText
            text='Passion driven by creativity!'
            className='text-4xl mt-8 sm:text-5xl lg:text-7xl z-50 mb-16'
            centered
          />
          <div className='grid grid-cols-8 gap-8 lg:gap-16 w-full'>
            <div className='flex flex-col col-span-8 lg:col-span-4 xl:col-span-3 items-start justify-start dark:text-slate-300 order-2 lg:order-1 z-50'>
              <h2 className='mb-4 text-lg font-bold uppercase text-dark/75 dark:text-slate-300'>
                My Biography
              </h2>
              <PortableText
                value={biography}
                components={{
                  block: {
                    normal: ({ children }) => <p className='font-medium my-2'>{children}</p>,
                  },
                }}
              />
            </div>
            <div className='col-span-8 lg:col-span-4 xl:col-span-3 relative h-max border-2 rounded-2xl border-solid border-dark dark:border-slate-300 p-8 order-1 lg:order-2'>
              <ThemedImage
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: { duration: 1.5 },
                }}
                lightImage={lightImage}
                darkImage={darkImage}
                alt='Marow Macaulay'
                width={300}
                height={350}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px): 50vw, 50vw'
                priority
                placeholder='blur'
                className='w-full h-auto rounded-2xl border border-dark/25 dark:border-slate-600'
              />
            </div>
            <div className='col-span-8 xl:col-span-2 flex flex-row xl:flex-col items-end justify-between my-4 dark:text-slate-300 order-3'>
              {stats.map(({ _type, value }, idx) => (
                <React.Fragment key={idx}>
                  <div className='flex flex-col items-center lg:items-end justify-center'>
                    <span className='inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>
                      <AnimatedNumbers value={value} />
                      {_type === 'clients' && '+'}
                    </span>
                    <h2 className='text-sm pt-1 sm:text-base md:text-lg text-center xl:text-xl font-medium capitalize text-dark/75 dark:text-slate-300'>
                      {_type === 'clients' ? 'Satisfied Clients' : _type}
                    </h2>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <Skills />
          <Experience experience={experience} />
        </Layout>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const data = await getAboutData()
  return {
    props: {
      data,
    },
    revalidate: 10,
  }
}

export default about
