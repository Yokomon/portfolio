import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { GiLightBulb } from 'react-icons/gi'
import { BsDownload } from 'react-icons/bs'

import { getIndexData } from '@/sanity/schemas/sanity-utils'
import Layout from '@/components/Layout'
import { AnimatedText } from '@/components/common'
import { ComponentProps } from '@/types/Component'
import { Meta } from '@/components/Meta'

const Home: React.FC<ComponentProps> = ({ indexData }) => {
  const AnimatedImage = motion(Image)
  const { summary, intro, darkImage, lightImage, resume, seo } = indexData
  const { title, ogType, ogImage, description, keywords, ogTitle, ogUrl } = seo

  const { theme } = useTheme()

  const [currentTheme, setCurrentTheme] = useState('')

  useEffect(() => {
    // Prevent hydration errors
    if (theme) {
      setCurrentTheme(theme)
    }
  }, [theme])

  if (!currentTheme) return <div className='min-h-screen' />

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
      <main className='flex text-dark w-full min-h-screen'>
        <Layout>
          <div className='flex justify-between items-center w-full flex-col md:flex-row'>
            <div className='w-full lg:w-1/2 md:hidden lg:block'>
              <AnimatePresence>
                {currentTheme === 'light' ? (
                  <AnimatedImage
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.3 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.3 },
                    }}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px): 50vw, 50vw'
                    width={420}
                    height={600}
                    alt='Profile image'
                    src={lightImage.url}
                    blurDataURL={lightImage.metadata.lqip}
                    className='w-full h-auto my-12'
                    priority
                  />
                ) : (
                  <AnimatedImage
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.3 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.3 },
                    }}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px): 50vw, 50vw'
                    width={420}
                    height={600}
                    alt='Profile image'
                    src={darkImage.url}
                    className='w-full h-auto my-12'
                    blurDataURL={darkImage.metadata.lqip}
                    priority
                  />
                )}
              </AnimatePresence>
            </div>
            <div className='w-full lg:w-1/2 lg:p-8 md:mt-32 lg:mt-0 relative'>
              <AnimatedText
                text={intro}
                className='text-[30px] leading-8 sm:leading-none text-center sm:text-5xl lg:text-3xl xl:text-5xl sm:text-left'
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
                className='font-medium leading-[1.7] sm:leading-normal dark:text-white text-sm sm:text-base lg:text-sm xl:text-base text-center sm:text-left my-8 sm:my-0'
              >
                {summary}
              </motion.p>
              <div className='flex items-center self-start justify-center sm:justify-start my-4'>
                <Link
                  className='bg-dark border border-dark dark:border-orange-500/80 dark:text-white dark:bg-slate-900 font-semibold px-6 duration-500 hover:bg-light text-light hover:text-dark p-2 md:p-3 text-sm md:text-base rounded-lg flex items-center'
                  href={resume}
                  download={true}
                  target='_blank'
                >
                  Resume
                  <BsDownload size={24} className='hidden sm:block ml-5 dark:text-orange-600' />
                </Link>
                <Link
                  className='font-medium underline px-6 text-dark dark:text-white text-sm sm:text-base underline-offset-8 ml-6 p-3'
                  href='mailto:marowmacaulay@gmail.com'
                  target='_blank'
                >
                  Contact
                </Link>
              </div>
              <div className='absolute right-3 bottom-12 w-48 md:-bottom-[10rem] lg:-bottom-24 hidden md:inline-block lg:hidden xl:inline-block'>
                <GiLightBulb className='w-full h-auto text-yellow-300' />
              </div>
            </div>
          </div>
        </Layout>
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
    revalidate: 10,
  }
}

export default Home
