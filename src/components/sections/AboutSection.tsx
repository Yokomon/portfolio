'use client'

import { useEffect, useRef, useState } from 'react'
import { PortableText } from '@portabletext/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'

import { AboutData } from '@/types/About'
import { AnimatedNumbers } from '@/components/about'
import Skills from '@/components/about/Skills'
import { useTheme } from 'next-themes'

interface AboutSectionProps {
  data: AboutData
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  const { lightImage, darkImage, biography, stats } = data
  const { theme, resolvedTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined)
  const [isMounted, setIsMounted] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  const bioSectionRef = useRef<HTMLDivElement>(null)
  const imageSectionRef = useRef<HTMLDivElement>(null)
  const statsSectionRef = useRef<HTMLDivElement>(null)
  const skillsSectionRef = useRef<HTMLDivElement>(null)

  const bioTextRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsContainerRef = useRef<HTMLDivElement>(null)

  const [isLoaded, setIsLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -400])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const computedTheme = theme === 'system' ? resolvedTheme : theme
    setCurrentTheme(computedTheme ?? 'light')
  }, [isMounted, theme, resolvedTheme])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {  
      ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
      })

      const titleChars = titleRef.current?.querySelectorAll('.title-char')
      if (titleChars && titleChars.length > 0) {
        gsap.set(titleChars, {
          y: 80,
          opacity: 0,
          rotateX: -60,
          transformOrigin: 'center bottom',
        })

        gsap.to(titleChars, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { y: 40, opacity: 0 })

        gsap.to(subtitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      if (bioSectionRef.current && bioTextRef.current) {
        gsap.set(bioTextRef.current, {
          y: 100,
          opacity: 0,
          scale: 0.95,
        })

        gsap.to(bioTextRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bioSectionRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse',
            scrub: 0.5,
          },
        })

        gsap.to(bioSectionRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: bioSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      if (imageSectionRef.current && imageRef.current) {
        gsap.set(imageRef.current, {
          scale: 0.8,
          opacity: 0,
          rotateY: -15,
          rotateX: -15,
          filter: 'blur(5px)',
        })

        const imageTl = gsap.timeline({
          scrollTrigger: {
            trigger: imageSectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
            scrub: 1,
          },
        })

        imageTl
          .to(imageRef.current, {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power2.out',
          })
          .to(
            imageRef.current,
            {
              scale: 1.05,
              duration: 0.5,
              ease: 'power1.inOut',
            },
            '-=0.3',
          )

        gsap.to(imageSectionRef.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: imageSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      if (statsSectionRef.current && statsContainerRef.current) {
        const statElements = statsContainerRef.current.querySelectorAll('.stat-item')

        gsap.set(statsContainerRef.current, { opacity: 0, y: 60 })

        gsap.to(statsContainerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.set(statElements, {
          y: 40,
          opacity: 0,
          scale: 0.9,
        })

        gsap.to(statElements, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.to(statsSectionRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      if (skillsSectionRef.current) {
        gsap.set(skillsSectionRef.current, {
          opacity: 0,
          y: 100,
          scale: 0.95,
        })

        gsap.to(skillsSectionRef.current, {
          opacity: 1,
          y: 40,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.to(skillsSectionRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: skillsSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      gsap.to('.bg-parallax', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.float-element-1', {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        rotation: 'random(-3, 3)',
        duration: 8,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      })

      gsap.to('.float-element-2', {
        y: 'random(-30, 30)',
        x: 'random(-15, 15)',
        rotation: 'random(-5, 5)',
        duration: 12,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoaded])

  const titleText = 'Who I Am'
  const titleChars = titleText.split('')

  const activeImage = currentTheme === 'dark' ? darkImage : lightImage

  return (
    <section ref={sectionRef} id='about' className='relative w-full overflow-hidden bg-transparent'>
      <div className='bg-parallax fixed inset-0 pointer-events-none'>
        <div className='float-element-1 absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-orange-200/10 to-red-200/10 dark:from-orange-500/5 dark:to-red-500/5 rounded-full blur-xl' />
        <div className='float-element-2 absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200/10 to-purple-200/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-full blur-2xl' />
        <div className='float-element-1 absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-green-200/10 to-teal-200/10 dark:from-green-500/5 dark:to-teal-500/5 rounded-full blur-lg' />
        <div className='float-element-2 absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-pink-200/10 to-rose-200/10 dark:from-pink-500/5 dark:to-rose-500/5 rounded-full blur-xl' />
      </div>

      <motion.div
        style={{ y: parallaxY }}
        className='sticky top-0 flex items-center justify-center min-h-[50vh] px-4 sm:px-6 lg:px-8 mt-12 md:mt-48'
      >
        <div className='text-center max-w-6xl mx-auto'>
          <h2
            ref={titleRef}
            className='text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black mb-8 sm:mb-12 leading-none'
          >
            {titleChars.map((char, index) => (
              <span
                key={index}
                className='title-char inline-block bg-gradient-to-r from-black to-black/70 dark:from-orange-500 dark:to-orange-600 bg-clip-text text-transparent'
                style={{
                  transformOrigin: 'center bottom',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <p
            ref={subtitleRef}
            className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-light'
          >
            Crafting digital experiences through code and creativity
          </p>
        </div>
      </motion.div>

      <div ref={bioSectionRef} className='relative z-10 px-4 sm:px-6 lg:px-8 md:py-28'>
        <div className='max-w-4xl mx-auto'>
          <div ref={bioTextRef} className='text-center sm:text-left'>
            <div className='inline-block mb-8 sm:mb-12'>
              <div className='flex items-center justify-center sm:justify-start space-x-3'>
                <div className='w-3 h-3 bg-orange-500 rounded-full animate-pulse' />
                <span className='text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest'>
                  About Me
                </span>
              </div>
            </div>

            <div className='prose prose-lg sm:prose-xl dark:prose-invert max-w-none'>
              <PortableText
                value={biography}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className='text-lg sm:text-xl lg:text-2xl font-normal text-slate-800 dark:text-slate-200 leading-relaxed mb-6 sm:mb-8'>
                        {children}
                      </p>
                    ),
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={imageSectionRef} className='relative z-10 px-4 sm:px-6 lg:px-8 py-28'>
        <div className='max-w-2xl mx-auto'>
          <div ref={imageRef} className='relative aspect-[3/4] w-full max-w-md mx-auto'>
            <div className='relative w-full h-full rounded-3xl overflow-hidden shadow-2xl'>
              <Image
                src={activeImage.url}
                alt='Profile'
                fill
                className='object-cover'
                sizes='(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 40vw'
                priority
                quality={90}
                loading='eager'
                placeholder={activeImage.metadata?.lqip ? 'blur' : undefined}
                blurDataURL={activeImage.metadata?.lqip}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent' />
            </div>

            <div className='absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50 -z-10' />
          </div>
        </div>
      </div>

      <div ref={statsSectionRef} className='relative z-10 px-4 sm:px-6 lg:px-8 py-28'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16 sm:mb-20'>
            <div className='inline-block'>
              <div className='flex items-center justify-center space-x-3 mb-4'>
                <div className='w-3 h-3 bg-orange-500 rounded-full animate-pulse' />
                <span className='text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest'>
                  Achievements
                </span>
              </div>
            </div>
          </div>

          <div
            ref={statsContainerRef}
            className='grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 items-center justify-center place-items-center
              [@media(min-width:640px)]:[&>*:nth-child(3)]:col-span-1
              [@media(min-width:640px)]:[&>*:nth-child(3)]:col-start-auto
              [&>*:nth-child(3)]:col-span-2 [&>*:nth-child(3)]:col-start-1 [&>*:nth-child(3)]:justify-self-center'
          >
            {stats.map(({ _type, value }, idx) => (
              <div key={idx} className='stat-item text-center group'>
                <div className='text-6xl lg:text-8xl xl:text-9xl text-orange-600 font-black mb-4 sm:mb-6'>
                  <AnimatedNumbers value={value} />
                  {_type === 'clients' && '+'}
                </div>
                <div className='text-sm sm:text-base md:text-lg font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider'>
                  {_type === 'clients' ? 'Happy Clients' : _type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={skillsSectionRef} className='relative z-10 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <Skills />
        </div>
      </div>
    </section>
  )
}

export default AboutSection
