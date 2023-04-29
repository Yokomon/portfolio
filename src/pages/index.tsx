import React from 'react'
import { motion } from 'framer-motion'
import { getIndexData } from '@/sanity/schemas/sanity-utils'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/Layout'
import { AnimatedText, FramerImage } from '@/components/common'
import { GiLightBulb } from 'react-icons/gi'
import { ComponentProps } from '@/types/Component'

const Home: React.FC<ComponentProps> = ({ indexData, theme }) => {
  const { summary, intro, darkImage, lightImage, resume } = indexData!
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <title>Marow Macaulay</title>
      </Head>
      <main className='flex text-dark w-full min-h-screen'>
        <Layout>
          <div className='flex justify-between items-center w-full flex-col md:flex-row'>
            <div className='w-full lg:w-1/2 md:hidden lg:block'>
              <FramerImage
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: { duration: 1.5 },
                }}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px): 50vw, 50vw'
                width={420}
                height={200}
                src={theme === 'light' ? lightImage : darkImage}
                alt={'Profile pic'}
                className='w-full h-auto my-12'
                priority
              />
            </div>
            <div className='w-full lg:w-1/2 lg:p-8 md:mt-32 lg:mt-0'>
              <AnimatedText
                text={intro}
                className='text-[30px] leading-8 sm:leading-none text-center sm:text-5xl sm:text-left'
              />
              <motion.p
                initial={{
                  opacity: 0,
                  x: 100,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 1 },
                }}
                className='font-medium leading-[1.7] sm:leading-normal dark:text-slate-400 text-sm sm:text-base text-center sm:text-left my-8 sm:my-0'
              >
                {summary}
              </motion.p>
              <div className='flex items-center self-start justify-center sm:justify-start my-4'>
                <Link
                  className='bg-dark border border-dark dark:border-slate-400 dark:text-slate-400 dark:bg-slate-900 font-semibold px-6 duration-500 hover:bg-light text-light hover:text-dark p-2 md:p-3 text-sm md:text-base rounded-lg'
                  href={resume}
                  download={true}
                  target='_blank'
                >
                  Resume
                </Link>
                <Link
                  className='font-medium underline px-6 text-dark dark:text-slate-400 text-sm sm:text-base underline-offset-8 ml-6 p-3'
                  href='mailto:marowmacaulay@gmail.com'
                  target='_blank'
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Layout>
        <div className='absolute right-3 -bottom-8 w-48 md:-bottom-18 lg:-bottom-24 hidden md:inline-block'>
          <GiLightBulb size={100} className='w-full h-auto text-yellow-300' />
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const indexData = await getIndexData()
  return {
    props: {
      indexData,
    },
  }
}

export default Home
