'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

import { Experience as ExperienceProps } from '@/types/About'

interface ExperienceSectionProps {
  experience: ExperienceProps[]
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!timelineRef.current || typeof window === 'undefined') return

    if (!ScrollTrigger) {
      console.warn('ScrollTrigger is not available')
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const cleanupFunctions: (() => void)[] = []

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const chars = titleRef.current.textContent?.split('') || []
        titleRef.current.innerHTML = chars
          .map(
            (char, i) =>
              `<span class="inline-block opacity-0 translate-y-8 rotate-x-90 blur-sm" style="transform-origin: center; animation-delay: ${
                i * 50
              }ms">${char === ' ' ? '&nbsp;' : char}</span>`,
          )
          .join('')

        const charElements = titleRef.current.querySelectorAll('span')

        gsap.to(charElements, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: {
            each: 0.05,
            from: 'start',
          },
          ease: 'back.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })

        const handleTitleMouseEnter = () => {
          gsap.to(charElements, {
            scale: 1.05,
            duration: 0.3,
            stagger: 0.02,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
          })
        }
        titleRef.current.addEventListener('mouseenter', handleTitleMouseEnter)

        cleanupFunctions.push(() => {
          titleRef.current?.removeEventListener('mouseenter', handleTitleMouseEnter)
        })
      }

      if (lineRef.current && !isMobile) {
        gsap.fromTo(
          lineRef.current,
          {
            scaleY: 0,
            transformOrigin: 'top',
          },
          {
            scaleY: 1,
            duration: 2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 60%',
              end: 'bottom bottom',
              scrub: 1.5,
            },
          },
        )

        const glowTl = gsap.timeline({
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom bottom',
            scrub: 1,
          },
        })

        glowTl.to(lineRef.current, {
          boxShadow: '0 0 30px rgba(251, 146, 60, 0.6)',
          duration: 1,
        })
      }

      const cards = cardsRef.current.filter(Boolean)
      if (cards.length > 0) {
        cards.forEach((card, index) => {
          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 100%',
              toggleActions: 'play none none reverse',
            },
          })

          cardTl
            .fromTo(
              card,
              {
                opacity: 0,
                scale: 0.3,
                filter: 'blur(20px)',
              },
              {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: 'power3.out',
              },
            )
            .fromTo(
              card.querySelector('.card-content'),
              {
                y: 60,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
              },
              '-=0.6',
            )
            .fromTo(
              card.querySelector('.card-decorative'),
              {
                scale: 0,
                rotation: -180,
                opacity: 0,
                rotationZ: index % 2 === 0 ? -15 : 15,
              },
              {
                scale: 1,
                rotation: 0,
                opacity: 1,
                rotationZ: 0,
                duration: 0.8,
                ease: 'back.out',
              },
              '-=0.4',
            )

          if (!isMobile) {
            const dot = card.querySelector('.timeline-dot')
            if (dot) {
              gsap.fromTo(
                dot,
                {
                  scale: 0,
                  opacity: 0,
                  rotation: 0,
                },
                {
                  scale: 1,
                  opacity: 1,
                  rotation: 360,
                  duration: 0.6,
                  ease: 'back.out',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                  },
                },
              )

              gsap.to(dot, {
                scale: 1.2,
                duration: 1,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: -1,
                delay: 1,
              })
            }
          }

          gsap.to(card, {
            y: isMobile ? 0 : index % 2 === 0 ? -40 : -60,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          })

          if (!isMobile) {
            const handleMouseEnter = () => {
              gsap.to(card.querySelector('.card-decorative'), {
                scale: 1.1,
                rotationZ: index % 2 === 0 ? -5 : 5,
                duration: 0.3,
                ease: 'circ.out',
              })
            }

            const handleMouseLeave = () => {
              gsap.to(card.querySelector('.card-decorative'), {
                scale: 1,
                rotationZ: 0,
                duration: 0.3,
                ease: 'circ.out',
              })
            }

            card.addEventListener('mouseenter', handleMouseEnter)
            card.addEventListener('mouseleave', handleMouseLeave)

            cleanupFunctions.push(() => {
              card.removeEventListener('mouseenter', handleMouseEnter)
              card.removeEventListener('mouseleave', handleMouseLeave)
            })
          }
        })

        gsap.fromTo(
          cards,
          {
            filter: 'brightness(0.5) contrast(0.8)',
          },
          {
            filter: 'brightness(1) contrast(1)',
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          },
        )
      }
    })

    return () => {
      ctx.revert()
      cleanupFunctions.forEach((cleanup) => cleanup())
    }
  }, [experience, isMobile])

  return (
    <section
      ref={sectionRef}
      id='experience'
      className='relative w-full py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 overflow-hidden'
    >
      <motion.div
        style={{ y }}
        className='absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/40 to-red-50/30 dark:via-orange-950/30 dark:to-red-950/20'
      />

      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400/30 rounded-full animate-pulse' />
        <div className='absolute top-3/4 right-1/4 w-1 h-1 bg-red-400/40 rounded-full animate-pulse delay-1000' />
        <div className='absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-orange-300/20 rounded-full animate-pulse delay-500' />
      </div>

      <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1400px] relative z-10'>
        <div className='mb-16 sm:mb-20 md:mb-24 lg:mb-32 xl:mb-40 text-center px-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
          >
            <h2 className='text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black mb-8 sm:mb-12 leading-none'>
              <span className='title-char inline-block bg-gradient-to-r from-black to-black/70 dark:from-orange-500 dark:to-orange-600 bg-clip-text text-transparent'>
                My Journey
              </span>
            </h2>
          </motion.div>
        </div>
        <div ref={timelineRef} className='relative'>
          <div className='absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/30 via-orange-500/60 to-red-500/30 dark:from-orange-400/30 dark:via-orange-400/60 dark:to-red-400/30 hidden md:block'>
            <div
              ref={lineRef}
              className='w-full h-full bg-gradient-to-b from-orange-500 via-orange-600 to-red-600 dark:from-orange-400 dark:via-orange-500 dark:to-red-500 rounded-full'
            />
          </div>

          <div className='space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28 xl:space-y-32'>
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                className={`experience-card relative ${
                  isMobile
                    ? 'flex flex-col space-y-6 gap-32'
                    : `grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center ${
                        index % 2 === 0 ? '' : 'md:grid-flow-dense'
                      }`
                }`}
                style={{ opacity }}
              >
                <div
                  className={`card-content ${
                    isMobile ? '' : index % 2 === 0 ? 'md:pr-8' : 'md:col-start-2 md:pl-8'
                  }`}
                >
                  <div className='inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-orange-100 via-orange-50 to-red-50 dark:from-orange-500/20 dark:via-orange-500/10 dark:to-red-500/10 rounded-full mb-4 sm:mb-6 border border-orange-200/50 dark:border-orange-400/30 shadow-sm'>
                    <div className='w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-3 animate-pulse' />
                    <span className='text-sm sm:text-base font-bold text-orange-900 dark:text-orange-300 tracking-wide'>
                      {exp.duration}
                    </span>
                  </div>

                  <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-dark dark:text-white mb-3 sm:mb-4 leading-tight'>
                    {exp.workTitle}
                  </h3>

                  <Link
                    href={exp.companyUrl}
                    target='_blank'
                    className='inline-flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 mb-4 sm:mb-5 transition-all duration-300 group'
                  >
                    <span className='group-hover:underline'>{exp.company}</span>
                    <svg
                      className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                      />
                    </svg>
                  </Link>

                  <div className='flex items-center gap-2 text-sm sm:text-base text-dark/60 dark:text-slate-400 mb-6 sm:mb-8'>
                    <svg
                      className='w-4 h-4 text-orange-500'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                    {exp.companyLocation}
                  </div>

                  <div className='prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none'>
                    <PortableText
                      value={exp.workSummary}
                      components={{
                        block: {
                          normal: ({ children }) => (
                            <p className='text-base sm:text-lg md:text-xl text-dark/80 dark:text-slate-300 leading-relaxed mb-4'>
                              {children}
                            </p>
                          ),
                        },
                        list: {
                          bullet: ({ children }) => (
                            <ul className='space-y-3 sm:space-y-4 mt-6 list-none'>{children}</ul>
                          ),
                        },
                        listItem: {
                          bullet: ({ children }) => (
                            <li className='text-sm sm:text-base md:text-lg text-dark/70 dark:text-slate-400 flex gap-3 sm:gap-4 items-start group'>
                              <div className='flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mt-1 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                                <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
                              </div>
                              <span className='leading-relaxed pt-1'>{children}</span>
                            </li>
                          ),
                        },
                      }}
                    />
                  </div>
                </div>

                {!isMobile && (
                  <div className='absolute left-1/2 top-8 transform -translate-x-1/2 z-10'>
                    <div className='timeline-dot relative w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 dark:from-orange-400 dark:via-orange-500 dark:to-red-500 rounded-full shadow-2xl'>
                      <div className='absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 dark:from-orange-400 dark:via-orange-500 dark:to-red-500 rounded-full animate-ping opacity-60' />
                      <div className='absolute inset-1 bg-white dark:bg-slate-900 rounded-full' />
                      <div className='absolute inset-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-full' />
                    </div>
                  </div>
                )}

                <div
                  className={`card-decorative ${
                    isMobile
                      ? 'self-center order-first'
                      : index % 2 === 0
                      ? 'md:col-start-2'
                      : 'md:col-start-1 md:row-start-1'
                  }`}
                >
                  <div className='relative p-8 sm:p-10 md:p-12 bg-gradient-to-br from-slate-200/50 via-orange-50/50 to-red-50/30 dark:from-orange-600/80 dark:via-orange-950/20 dark:to-red-950/10 rounded-3xl sm:rounded-4xl border-2 border-orange-200/50 dark:border-orange-400/20 shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-400/10 transition-all duration-500 group'>
                    <div className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-gradient-to-br from-orange-500/70 via-orange-600/15 to-red-500/20 dark:from-orange-500 dark:via-orange-500/20 dark:to-red-400/30 bg-clip-text select-none leading-none'>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 dark:from-orange-500/20 dark:via-transparent dark:to-red-500/20 rounded-3xl sm:rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                    <div className='absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-60' />
                    <div className='absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-red-400 to-orange-400 rounded-full opacity-40' />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
