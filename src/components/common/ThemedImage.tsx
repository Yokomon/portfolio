'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ImageMetadata } from 'sanity'
const MotionImage = motion(Image)

interface ThemedImageProps {
  lightImage: {
    url: string
    metadata: ImageMetadata
  }
  darkImage: {
    url: string
    metadata: ImageMetadata
  }
  initial: {
    opacity: number
  }
  sizes: string
  width: number
  height: number
  alt: string
  placeholder: 'blur' | 'empty' | undefined
  className: string
  priority?: boolean
  animate: {
    opacity: number
    transition: {
      duration: number
    }
  }
}

const ThemedImage: React.FC<ThemedImageProps> = ({ lightImage, darkImage, alt, ...props }) => {
  const staticImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  const { theme } = useTheme()

  const [blurUrl, setBlurUrl] = useState(staticImg)
  const [src, setSrc] = useState(staticImg)

  const [currentTheme, setCurrentTheme] = useState('')

  useEffect(() => {
    if (theme !== undefined) {
      setCurrentTheme(theme)
      if (theme === 'light') {
        setSrc(lightImage.url)
        setBlurUrl(lightImage.metadata.lqip as string)
      } else {
        setSrc(darkImage.url)
        setBlurUrl(darkImage.metadata.lqip as string)
      }
    }
  }, [theme])

  if (!currentTheme) return <div />

  return (
    <AnimatePresence>
      {currentTheme === 'light' ? (
        <MotionImage
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
          src={!currentTheme ? (lightImage.metadata.lqip as string) : lightImage.url}
          className='w-full h-auto'
          blurDataURL={lightImage.metadata.lqip}
          priority
        />
      ) : (
        <MotionImage
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
          className='w-full h-auto'
          blurDataURL={darkImage.metadata.lqip}
          priority
        />
      )}
    </AnimatePresence>
  )
}

export default ThemedImage
