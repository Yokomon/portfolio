import React from 'react'
import Head from 'next/head'
import { AnimatedText, FramerImage } from '@/components/common'
import Layout from '../components/Layout'
import { Skills, AnimatedNumbers } from '../components/about'
import Experience from '../components/Experience'
import { AboutProps } from '@/types/Component'
import { getAboutData } from '@/sanity/schemas/sanity-utils'
import { PortableText } from '@portabletext/react'

const about: React.FC<AboutProps> = ({ data, theme }) => {
  const { lightImage, darkImage, biography, stats, experience } = data

  return (
    <>
      <Head>
        <title>About | Marow Macaulay</title>
      </Head>
      <main className='w-full flex flex-col items-center justify-center mb-16 dark:my-0'>
        <Layout>
          <AnimatedText
            text='Passion driven by creativity!'
            textWrapper='text-center'
            className='text-4xl sm:text-5xl lg:text-7xl mt-8 mb-16'
          />
          <div className='grid grid-cols-8 gap-8 lg:gap-16 w-full'>
            <div className='flex flex-col col-span-8 lg:col-span-4 xl:col-span-3 items-start justify-start dark:text-slate-400 order-2 lg:order-1'>
              <h2 className='mb-4 text-lg font-bold uppercase text-dark/75 dark:text-slate-400'>
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
              <FramerImage
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: { duration: 1.5 },
                }}
                src={theme === 'light' ? lightImage : darkImage}
                alt='Marow Macaulay'
                width={300}
                height={100}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px): 50vw, 50vw'
                priority
                className='w-full h-auto rounded-2xl border border-dark/25 dark:border-slate-600'
              />
            </div>
            <div className='col-span-8 xl:col-span-2 flex flex-row xl:flex-col items-end justify-between my-4 dark:text-slate-400 order-3'>
              {stats.map(({ _type, value }, idx) => (
                <React.Fragment key={idx}>
                  <div className='flex flex-col items-center lg:items-end justify-center'>
                    <span className='inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>
                      <AnimatedNumbers value={value} />
                      {_type === 'clients' && '+'}
                    </span>
                    <h2 className='text-sm pt-1 sm:text-base md:text-lg text-center xl:text-xl font-medium capitalize text-dark/75 dark:text-slate-400'>
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
  }
}

export default about
