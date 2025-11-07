'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

interface SplashScreenProps {
  onComplete: () => void
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const circlesRef = useRef<HTMLDivElement>(null)
  const ringsRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)

    if (typeof window !== 'undefined') {
      const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')

      if (hasSeenSplash) {
        setShouldShow(false)
        onComplete()
        return
      } else {
        setShouldShow(true)
      }
    }
  }, [onComplete])

  useEffect(() => {
    if (!shouldShow || !isMounted) return

    document.body.classList.add('splash-active')

    const timer = setTimeout(() => {
      if (!logoRef.current || !containerRef.current || !overlayRef.current) {
        setIsAnimating(false)
        onComplete()
        document.body.classList.remove('splash-active')
        return
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false)
          document.body.classList.remove('splash-active')
          setTimeout(() => {
            onComplete()
          }, 500)
        },
      })

      gsap.set([containerRef.current, logoRef.current, overlayRef.current], {
        willChange: 'transform, opacity',
      })

      gsap.set(containerRef.current, { perspective: 1000 })

      tl.fromTo(
        logoRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: -180,
          transformOrigin: 'center center',
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
        },
        0.1,
      )

      tl.to(
        logoRef.current,
        {
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 1,
        },
        '-=0.4',
      )

      let rings: HTMLCollection | null = null
      if (ringsRef.current && ringsRef.current.children.length > 0) {
        rings = ringsRef.current.children
        gsap.set(rings, { willChange: 'transform, opacity' })

        tl.fromTo(
          rings,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 3.5,
            opacity: 0,
            duration: 1.4,
            stagger: 0.08,
            ease: 'power2.out',
          },
          0.3,
        )
      }

      let circles: HTMLCollection | null = null
      if (circlesRef.current && circlesRef.current.children.length > 0) {
        circles = circlesRef.current.children
        gsap.set(circles, { willChange: 'transform, opacity, filter' })

        tl.to(
          circles,
          {
            scale: 6,
            opacity: 0.9,
            rotation: 180,
            duration: 0.6,
            stagger: {
              each: 0.06,
              from: 'center',
            },
            ease: 'power2.out',
          },
          '-=1.0',
        )

        tl.to(
          circles,
          {
            scale: 20,
            opacity: 0,
            rotation: 360,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power2.in',
          },
          '-=0.3',
        )
      }

      tl.to(
        overlayRef.current,
        {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 1.4,
          ease: 'power2.inOut',
        },
        '-=0.8',
      )

      tl.to(
        logoRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: -30,
          duration: 0.6,
          ease: 'power2.in',
        },
        '-=1.0',
      )

      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set([containerRef.current, logoRef.current, overlayRef.current, circles, rings], {
              willChange: 'auto',
            })
          },
        },
        '-=0.2',
      )
    }, 500)

    return () => {
      clearTimeout(timer)
      document.body.classList.remove('splash-active')
    }
  }, [shouldShow, isMounted, onComplete])

  if (!isMounted || !shouldShow) return null

  return (
    <AnimatePresence mode='wait'>
      {isAnimating && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='splash-container fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden'
        >
          <div className='absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 dark:from-orange-400 dark:via-orange-500 dark:to-red-500' />

          <div
            ref={overlayRef}
            className='absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 dark:from-orange-400 dark:via-orange-500 dark:to-red-500 z-40'
            style={{ clipPath: 'circle(150% at 50% 50%)' }}
          />

          <div ref={ringsRef} className='absolute inset-0 flex items-center justify-center z-10'>
            {[...Array(5)].map((_, i) => (
              <div
                key={`ring-${i}`}
                className='absolute w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/30'
                style={{ opacity: 0 }}
              />
            ))}
          </div>

          <div ref={circlesRef} className='absolute inset-0 flex items-center justify-center z-20'>
            {[...Array(5)].map((_, i) => (
              <div
                key={`circle-${i}`}
                className='absolute w-32 h-32 rounded-full'
                style={{
                  opacity: 0.7 - i * 0.15,
                  background: `radial-gradient(circle, rgba(255,255,255,${
                    0.4 - i * 0.08
                  }) 0%, transparent 70%)`,
                  filter: `blur(${15 + i * 5}px)`,
                }}
              />
            ))}
          </div>

          <div ref={logoRef} className='relative z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-white/30 dark:bg-white/20 rounded-full blur-3xl scale-150 animate-pulse' />
            <div className='relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 flex items-center justify-center rounded-full text-4xl sm:text-5xl md:text-6xl font-bold shadow-2xl ring-4 sm:ring-6 md:ring-8 ring-white/40 dark:ring-slate-800/40'>
              <span className='relative'>
                MM
                <div className='absolute inset-0 flex items-center justify-center text-orange-500/30 dark:text-orange-300/30 blur-sm scale-110'>
                  MM
                </div>
              </span>
            </div>
          </div>

          <div ref={particlesRef} className='absolute inset-0 overflow-hidden z-5'>
            {typeof window !== 'undefined' &&
              [...Array(20)].map((_, i) => {
                const randomX = Math.random() * 100
                const randomY = Math.random() * 100
                const size = Math.random() * 3 + 1.5
                return (
                  <motion.div
                    key={`particle-${i}`}
                    className='absolute bg-white/60 rounded-full'
                    style={{
                      left: `${randomX}%`,
                      top: `${randomY}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      willChange: 'transform, opacity',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                      y: [0, -80 - Math.random() * 60],
                    }}
                    transition={{
                      duration: 1.5 + Math.random() * 1,
                      repeat: 1,
                      delay: Math.random() * 0.5,
                      ease: 'easeOut',
                    }}
                  />
                )
              })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SplashScreen
