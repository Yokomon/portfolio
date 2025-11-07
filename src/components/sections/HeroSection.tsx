'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { BsDownload, BsMouse } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import { Button } from '@/components/ui/button'
import { IndexData } from '@/types/Component'

interface HeroSectionProps {
  indexData: IndexData
}

const HeroSection: React.FC<HeroSectionProps> = ({ indexData }) => {
  const { summary, intro, darkImage, lightImage, resume } = indexData
  const { theme, resolvedTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined)
  const [isMounted, setIsMounted] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const computedTheme = theme === 'system' ? resolvedTheme : theme
    setCurrentTheme(computedTheme ?? 'light')
  }, [isMounted, theme, resolvedTheme])

  const headlineCharacters = useMemo(() => {
    const words = intro.split(' ')
    return words.map((word, wordIndex) => (
      <span key={`word-${wordIndex}`} className='inline-block whitespace-nowrap'>
        {word.split('').map((character, charIndex) => (
          <span
            key={`${character}-${wordIndex}-${charIndex}`}
            className='hero-headline-char inline-block will-change-transform bg-gradient-to-r from-black to-black/70 bg-clip-text text-transparent dark:from-orange-500 dark:to-orange-600'
          >
            {character}
          </span>
        ))}
        {wordIndex < words.length - 1 && '\u00A0'}
      </span>
    ))
  }, [intro])

  useEffect(() => {
    if (!isMounted || !heroRef.current || !currentTheme || typeof window === 'undefined') return

    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger)
    }

    const ctx = gsap.context((self) => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline.set('.hero-headline-char', { yPercent: 130, rotateX: -80, opacity: 1 })
      timeline.set('.hero-subtitle', { y: 24, opacity: 0 })
      timeline.set('.hero-cta [data-magnetic]', { y: 24, opacity: 0 })
      timeline.set('.hero-portrait', { y: 56, scale: 0.94, opacity: 0 })
      timeline.set('.hero-scroll', { y: 24, opacity: 0 })
      timeline.set('.hero-ambient', { opacity: 0 })

      timeline.fromTo('.hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0)

      timeline.to(
        '.hero-headline-char',
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.15,
          stagger: {
            amount: 0.7,
            from: 'start',
            ease: 'power3.out',
          },
        },
        0.05,
      )

      timeline.to('.hero-subtitle', { y: 0, opacity: 1, duration: 0.85 }, '-=0.55')

      timeline.to(
        '.hero-cta [data-magnetic]',
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.18 },
        '-=0.5',
      )

      timeline.to('.hero-portrait', { y: 0, opacity: 1, scale: 1, duration: 1.2 }, '-=0.95')

      timeline.to('.hero-ambient', { opacity: 1, duration: 1.15, stagger: 0.12 }, '<')

      timeline.to('.hero-scroll', { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')

      gsap.utils.toArray<HTMLElement>('.hero-gradient-bubble').forEach((bubble, index) => {
        gsap.to(bubble, {
          xPercent: index % 2 === 0 ? 16 : -16,
          yPercent: index % 2 === 0 ? -12 : 12,
          rotate: index % 2 === 0 ? 10 : -10,
          duration: 14 + index * 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      })

      if (portraitRef.current && ScrollTrigger) {
        gsap.to(portraitRef.current, {
          yPercent: -8,
          rotate: 2,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top center',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }

      const magneticElements = gsap.utils.toArray<HTMLElement>('[data-magnetic]')
      magneticElements.forEach((element) => {
        const xTo = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'expo.out' })
        const yTo = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'expo.out' })

        const handleMove = (event: MouseEvent) => {
          const bounds = element.getBoundingClientRect()
          const relativeX = event.clientX - (bounds.left + bounds.width / 2)
          const relativeY = event.clientY - (bounds.top + bounds.height / 2)

          xTo(relativeX * 0.2)
          yTo(relativeY * 0.2)
        }

        const handleLeave = () => {
          xTo(0)
          yTo(0)
        }

        element.addEventListener('mousemove', handleMove)
        element.addEventListener('mouseleave', handleLeave)

        self.add(() => {
          element.removeEventListener('mousemove', handleMove)
          element.removeEventListener('mouseleave', handleLeave)
        })
      })

      gsap.to('.hero-scroll-icon', {
        y: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 1.7,
      })

      // Portrait swing animation
      gsap.to('.hero-portrait', {
        rotation: 3,
        duration: 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [isMounted, currentTheme, intro, summary])

  const activeImage = currentTheme === 'dark' ? darkImage : lightImage

  return (
    <section
      ref={heroRef}
      id='home'
      className='relative flex min-h-screen items-center overflow-hidden bg-transparent'
    >
      <div className='pointer-events-none absolute inset-0'>
        <div className='hero-ambient hero-gradient-bubble absolute -top-32 -left-40 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_top,#f97316,transparent_68%)] opacity-70 blur-3xl dark:opacity-60' />
        <div className='hero-ambient hero-gradient-bubble absolute -bottom-36 -right-28 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_bottom,#ef4444,transparent_70%)] opacity-70 blur-3xl dark:opacity-60' />
        <div className='hero-ambient absolute inset-y-0 left-1/2 w-[55vw] -translate-x-1/2 bg-gradient-to-r from-orange-200/25 via-transparent to-red-300/20 blur-[120px] dark:from-orange-500/15 dark:to-red-500/15' />
      </div>

      <div className='relative z-10 mx-auto w-full max-w-[1440px] px-4 py-24 sm:px-6 md:px-10 md:py-28 lg:px-12 lg:py-32'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center'>
          <div className='order-2 flex flex-col gap-8 text-left lg:order-1'>
            <div className='hero-badge inline-flex w-fit items-center gap-2 rounded-full border border-orange-200/70 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-900 shadow-sm backdrop-blur-md dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-100'>
              <HiSparkles className='text-base text-orange-500 dark:text-orange-300' />
              <span>Software Engineer</span>
            </div>

            <h1 className='hero-headline font-mont text-[2.75rem] font-black leading-[1.05] tracking-tight sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem] xl:text-[4.4rem]'>
              {headlineCharacters}
            </h1>

            <p className='hero-subtitle max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-300'>
              {summary}
            </p>

            <div className='hero-cta flex flex-wrap items-center gap-4 pt-2'>
              <Button
                as='a'
                href={resume}
                download
                target='_blank'
                rel='noopener noreferrer'
                data-magnetic
                className='shadow-[0_24px_60px_-24px_rgba(249,115,22,0.65)]'
              >
                Get Resume
                <BsDownload
                  size={18}
                  className='transition-transform duration-300 group-hover:translate-y-1'
                />
              </Button>
              <Button
                as='a'
                href='mailto:marowmacaulay@gmail.com'
                variant='outline'
                data-magnetic
                className='border-2 border-orange-200/60 bg-white/90 text-slate-900 hover:border-orange-400 hover:bg-orange-50 dark:border-orange-500/40 dark:bg-transparent dark:text-white dark:hover:bg-orange-500/20'
              >
                Let&apos;s Connect
              </Button>
            </div>
          </div>

          <div className='order-1 flex justify-center lg:order-2'>
            <div ref={portraitRef} className='hero-portrait relative w-full max-w-[520px]'>
              <div className='hero-ambient absolute -inset-16 rounded-[42px] bg-[conic-gradient(from_110deg_at_50%_50%,rgba(249,115,22,0.4),rgba(239,68,68,0.25),transparent_75%)] blur-3xl' />
              <div className='relative overflow-hidden rounded-[38px] border border-white/10 bg-white/10 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.6)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_30px_90px_-45px_rgba(8,47,73,0.85)]'>
                <Image
                  src={activeImage.url}
                  alt='Profile portrait'
                  width={520}
                  height={680}
                  priority
                  className='h-full w-full object-cover'
                  sizes='(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 40vw'
                  placeholder={activeImage.metadata?.lqip ? 'blur' : undefined}
                  blurDataURL={activeImage.metadata?.lqip}
                  quality={90}
                  loading='eager'
                />
                <span className='pointer-events-none absolute inset-0 bg-gradient-to-t from-orange-500/35 via-transparent to-transparent mix-blend-multiply dark:mix-blend-soft-light' />
                <span className='pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-70' />
              </div>
              <div className='hero-ambient absolute -bottom-8 left-1/2 hidden h-32 w-[70%] -translate-x-1/2 rounded-full bg-orange-300/30 blur-3xl md:block dark:bg-orange-500/20' />
            </div>
          </div>
        </div>
      </div>

      <div className='hero-scroll absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 sm:bottom-10 sm:gap-2'>
        <span className='sm:block hidden'>Scroll to explore</span>
        <div className='hero-scroll-icon flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-110 dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/10'>
          <BsMouse size={20} className='text-slate-600 dark:text-slate-300' />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
