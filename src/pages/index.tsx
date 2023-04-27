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
          <div className='flex justify-between items-center w-full h-screen'>
            <div className='w-1/2'>
              <FramerImage
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: { duration: 1.5 },
                }}
                width={420}
                height={200}
                src={theme === 'light' ? lightImage : darkImage}
                alt={'Profile pic'}
                className='w-full h-auto'
                priority
              />
            </div>
            <div className='w-1/2 p-8'>
              <AnimatedText text={intro} />
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
                className='text-base font-medium my-4 dark:text-slate-400'
              >
                {summary}
              </motion.p>
              <div className='flex items-center self-start'>
                <Link
                  className='bg-dark border border-dark dark:border-slate-400 dark:text-slate-400 dark:bg-slate-900 font-semibold px-6 duration-500 hover:bg-light text-light hover:text-dark p-3 rounded-lg'
                  href={resume}
                  download={true}
                  target='_blank'
                >
                  Resume
                </Link>
                <Link
                  className='font-medium underline underline-offset-4 px-6 text-dark dark:text-slate-400 ml-6 p-3'
                  href='mailto:marowmacaulay@gmail.com'
                  target='_blank'
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Layout>
        <div className='absolute right-8 bottom-8 inline-block w-48'>
          <GiLightBulb size={230} className='w-full h-auto text-yellow-300' />
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
