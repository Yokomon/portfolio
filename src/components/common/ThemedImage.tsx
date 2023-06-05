'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
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

  const { resolvedTheme } = useTheme()

  const [blurUrl, setBlurUrl] = useState(staticImg)
  const [src, setSrc] = useState(staticImg)

  useEffect(() => {
    if (resolvedTheme !== undefined) {
      if (resolvedTheme === 'light') {
        setSrc(lightImage.url)
        setBlurUrl(lightImage.metadata.lqip as string)
      } else {
        setSrc(darkImage.url)
        setBlurUrl(darkImage.metadata.lqip as string)
      }
    }
  }, [resolvedTheme])

  return <MotionImage alt={alt} src={src} blurDataURL={blurUrl} {...props} />
}

export default ThemedImage
