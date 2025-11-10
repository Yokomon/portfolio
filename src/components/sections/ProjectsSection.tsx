'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillGithub } from 'react-icons/ai'
import { HiExternalLink } from 'react-icons/hi'

import { ProjectComponents } from '@/types/Project'

interface ProjectsSectionProps {
  projects: ProjectComponents[]
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const throttledMouseMove = useRef<NodeJS.Timeout | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!projectsRef.current || typeof window === 'undefined') return

    if (!ScrollTrigger) {
      console.warn('ScrollTrigger is not available')
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const cleanupFunctions: (() => void)[] = []

    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { perspective: 2000 })

      if (titleRef.current) {
        const chars = titleRef.current.textContent?.split('') || []
        titleRef.current.innerHTML = chars
          .map(
            (char, i) =>
              `<span class="inline-block opacity-0 translate-y-12 rotate-x-90 scale-75 blur-sm" style="transform-origin: center; animation-delay: ${
                i * 30
              }ms">${char === ' ' ? '&nbsp;' : char}</span>`,
          )
          .join('')

        const charElements = titleRef.current.querySelectorAll('span')

        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })

        titleTl
          .to(charElements, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: {
              each: 0.03,
              from: 'start',
            },
            ease: 'back.out(1.7)',
          })
          .to(
            charElements,
            {
              scale: 1.05,
              duration: 0.6,
              stagger: 0.02,
              ease: 'power2.inOut',
              yoyo: true,
              repeat: 1,
            },
            '-=0.3',
          )

        const handleTitleMouseMove = (e: MouseEvent) => {
          if (throttledMouseMove.current) return

          throttledMouseMove.current = setTimeout(() => {
            const rect = titleRef.current!.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const centerX = rect.width / 2
            const centerY = rect.height / 2

            gsap.to(charElements, {
              x: (x - centerX) * 0.015,
              y: (y - centerY) * 0.015,
              duration: 0.4,
              ease: 'power2.out',
              force3D: true,
            })
            throttledMouseMove.current = null
          }, 16)
        }

        const handleTitleMouseLeave = () => {
          gsap.to(charElements, {
            x: 0,
            y: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)',
          })
        }

        titleRef.current.addEventListener('mousemove', handleTitleMouseMove)
        titleRef.current.addEventListener('mouseleave', handleTitleMouseLeave)

        cleanupFunctions.push(() => {
          titleRef.current?.removeEventListener('mousemove', handleTitleMouseMove)
          titleRef.current?.removeEventListener('mouseleave', handleTitleMouseLeave)
        })
      }

      const projectCards = projectsRef.current?.querySelectorAll('.project-card')
      if (projectCards) {
        projectCards.forEach((card, index) => {
          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          })

          cardTl
            .fromTo(
              card,
              {
                opacity: 0,
                y: 100,
                scale: 0.9,
                rotationX: -15,
                force3D: true,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 1.2,
                ease: 'power3.out',
              },
            )
            .fromTo(
              card.querySelector('.card-content'),
              {
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: 'power2.out',
              },
              '-=0.8',
            )
            .fromTo(
              card.querySelector('.project-image'),
              {
                scale: 1.1,
                filter: 'brightness(0.7) contrast(0.9)',
              },
              {
                scale: 1,
                filter: 'brightness(1) contrast(1)',
                duration: 0.8,
                ease: 'power2.out',
              },
              '-=1.0',
            )

          gsap.to(card, {
            y: isMobile ? 0 : index % 2 === 0 ? -40 : -30,
            force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })

          if (!isMobile) {
            let mouseMoveTimeout: NodeJS.Timeout | null = null

            const handleMouseEnter = () => {
              gsap.to(card, {
                scale: 1.02,
                y: -10,
                duration: 0.3,
                ease: 'power2.out',
                force3D: true,
              })

              gsap.to(card.querySelector('.card-glow'), {
                opacity: 0.8,
                duration: 0.3,
                ease: 'power2.out',
              })

              gsap.to(card.querySelector('.project-image'), {
                scale: 1.03,
                duration: 0.3,
                ease: 'power2.out',
                force3D: true,
              })
            }

            const handleMouseMove = (e: MouseEvent) => {
              if (mouseMoveTimeout) return

              mouseMoveTimeout = setTimeout(() => {
                const rect = card.getBoundingClientRect()
                const x = e.clientX - rect.left
                const centerX = rect.width / 2

                gsap.to(card, {
                  rotationY: (x - centerX) * 0.002,
                  duration: 0.2,
                  ease: 'power2.out',
                  force3D: true,
                })
                mouseMoveTimeout = null
              }, 16)
            }

            const handleMouseLeave = () => {
              if (mouseMoveTimeout) {
                clearTimeout(mouseMoveTimeout)
                mouseMoveTimeout = null
              }

              gsap.to(card, {
                scale: 1,
                rotationY: 0,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
                force3D: true,
              })

              gsap.to(card.querySelector('.card-glow'), {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
              })

              gsap.to(card.querySelector('.project-image'), {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                force3D: true,
              })
            }

            card.addEventListener('mouseenter', handleMouseEnter as EventListener)
            card.addEventListener('mousemove', handleMouseMove as EventListener)
            card.addEventListener('mouseleave', handleMouseLeave)

            cleanupFunctions.push(() => {
              if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout)
              card.removeEventListener('mouseenter', handleMouseEnter as EventListener)
              card.removeEventListener('mousemove', handleMouseMove as EventListener)
              card.removeEventListener('mouseleave', handleMouseLeave)
            })
          }
        })

        gsap.fromTo(
          projectCards,
          {
            opacity: 0.7,
          },
          {
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: projectsRef.current,
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
  }, [projects, isMobile])

  return (
    <section
      ref={sectionRef}
      id='projects'
      className='relative w-full py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 overflow-hidden'
    >
      <motion.div
        style={{ y, rotateX, scale }}
        className='absolute inset-0 bg-gradient-to-br from-transparent via-orange-50/30 to-red-50/20 dark:via-orange-950/20 dark:to-red-950/15'
      />

      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-3 h-3 bg-orange-400/20 rounded-full animate-pulse' />
        <div className='absolute top-3/4 right-1/4 w-2 h-2 bg-red-400/30 rounded-full animate-pulse delay-1000' />
        <div className='absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-orange-300/25 rounded-full animate-pulse delay-500' />
        <div className='absolute top-1/3 right-1/3 w-2.5 h-2.5 bg-gradient-to-br from-orange-400/15 to-red-400/15 rounded-full animate-bounce delay-700' />
      </div>

      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
          }}
          className='absolute top-20 left-10 w-16 h-16 border border-orange-300/20 bg-gradient-to-t dark:from-orange-500/30 dark:to-red-500/10 from-black/50 to-black/20 rounded-full'
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          }}
          className='absolute top-40 right-20 w-12 h-12 bg-gradient-to-br dark:from-orange-500/30 dark:to-red-500/20 from-black/30 to-black/20 rounded-lg rotate-45'
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1400px] relative z-10'>
        <div className='mb-20 sm:mb-24 md:mb-28 lg:mb-32 xl:mb-40 text-center px-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
            className='relative'
          >
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className='absolute inset-0 -z-10 blur-3xl'
            />
            <h2 className='text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black mb-8 sm:mb-12 leading-none'>
              <span className='title-char inline-block bg-gradient-to-r from-black to-black/70 dark:from-orange-500 dark:to-orange-600 bg-clip-text text-transparent'>
                My Projects
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-dark/60 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed'
          >
            Crafting digital experiences that push boundaries and inspire innovation 🚀
          </motion.p>
        </div>

        <div
          ref={projectsRef}
          className='space-y-20 sm:space-y-24 md:space-y-28 lg:space-y-32 xl:space-y-40'
        >
          {projects.map((project, idx) => (
            <motion.article
              key={idx}
              className='project-card group relative transform-gpu'
              style={{
                opacity,
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={(e) => {
                mouseX.set(e.clientX)
                mouseY.set(e.clientY)
              }}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center ${
                  idx % 2 === 0 ? '' : 'lg:grid-flow-dense'
                }`}
              >
                <div className={`relative ${idx % 2 === 0 ? '' : 'lg:col-start-2'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className='relative'
                  >
                    {project.url ? (
                      <Link href={project.url} target='_blank'>
                        <div className='relative aspect-[16/10] rounded-3xl sm:rounded-4xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shadow-2xl group-hover:shadow-3xl transition-all duration-500'>
                          <div className='project-image absolute inset-0 transform-gpu'>
                            <Image
                              src={project.image.url}
                              alt={project.name}
                              fill
                              className='object-cover transition-transform duration-700'
                              sizes='(max-width: 768px) 100vw, 50vw'
                            />
                          </div>

                          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                        </div>
                      </Link>
                    ) : (
                      <div className='relative aspect-[16/10] rounded-3xl sm:rounded-4xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shadow-2xl group-hover:shadow-3xl transition-all duration-500'>
                        <div className='project-image absolute inset-0 transform-gpu'>
                          <Image
                            src={project.image.url}
                            alt={project.name}
                            fill
                            className='object-cover transition-transform duration-700'
                            sizes='(max-width: 768px) 100vw, 50vw'
                          />
                        </div>

                        <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                      </div>
                    )}

                    <div className='card-glow absolute -inset-3 bg-gradient-to-br from-orange-500/15 to-red-500/15 dark:from-orange-400/8 dark:to-red-400/8 rounded-3xl sm:rounded-4xl blur-xl -z-10 opacity-0 transition-opacity duration-300' />
                  </motion.div>
                </div>

                <div
                  className={`card-content space-y-6 sm:space-y-7 md:space-y-8 ${
                    idx % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'
                  }`}
                >
                  {project.featured && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
                      className='inline-block'
                    >
                      <div className='px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-400/20 dark:to-red-400/20 rounded-full border border-orange-300/30 dark:border-orange-500/30 backdrop-blur-sm'>
                        <span className='text-sm sm:text-base font-bold text-orange-600 dark:text-orange-400 tracking-wide'>
                          ⭐ FEATURED PROJECT
                        </span>
                      </div>
                    </motion.div>
                  )}

                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    {project.url ? (
                      <Link href={project.url} target='_blank'>
                        <h3 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-dark dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 group-hover:bg-clip-text transition-all duration-300 leading-tight'>
                          {project.name}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-dark dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 group-hover:bg-clip-text transition-all duration-300 leading-tight'>
                        {project.name}
                      </h3>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='text-lg sm:text-xl md:text-2xl text-dark/70 dark:text-slate-400 leading-relaxed max-w-2xl'
                  >
                    {project.summary &&
                      Array.isArray(project.summary) &&
                      project.summary.length > 0 &&
                      (project.summary[0] as any)?.children?.[0]?.text}
                  </motion.div>

                  {project.tools && project.tools.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className='flex flex-wrap gap-3 sm:gap-4'
                    >
                      {project.tools.map((tool, toolIdx) => (
                        <motion.span
                          key={toolIdx}
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.6 + toolIdx * 0.1,
                            type: 'spring',
                          }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: 'rgba(251, 146, 60, 0.1)',
                          }}
                          className='px-4 py-2 bg-white/80 dark:bg-slate-800/80 text-dark dark:text-white text-sm sm:text-base font-medium rounded-full border border-dark/10 dark:border-slate-700 backdrop-blur-sm hover:border-orange-300 dark:hover:border-orange-500 transition-all duration-300'
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className='flex flex-wrap gap-4 sm:gap-5 pt-4'
                  >
                    {project.url && (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={project.url}
                          target='_blank'
                          className='group/btn relative inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 dark:from-orange-500 dark:via-orange-600 dark:to-red-500 text-white text-base sm:text-lg font-bold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden'
                        >
                          <div className='absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300' />
                          <span className='relative z-10'>View Project</span>
                          <HiExternalLink
                            className='relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300'
                            size={20}
                          />
                        </Link>
                      </motion.div>
                    )}

                    {project.githubUrl && (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={project.githubUrl}
                          target='_blank'
                          className='group/btn relative inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white/90 dark:bg-slate-800/90 text-dark dark:text-white text-base sm:text-lg font-bold rounded-xl sm:rounded-2xl border-2 border-dark/20 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 overflow-hidden'
                        >
                          <div className='absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300' />
                          <AiFillGithub className='relative z-10' size={22} />
                          <span className='relative z-10'>Source Code</span>
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
                className='absolute -left-4 sm:-left-6 md:-left-8 lg:-left-10 xl:-left-12 top-0 text-7xl sm:text-8xl md:text-9xl lg:text-10xl xl:text-[12rem] font-black text-orange-500/10 dark:text-orange-400/10 select-none transform-gpu'
                style={{
                  transform: 'translateZ(50px)',
                  textShadow: '0 0 40px rgba(251, 146, 60, 0.3)',
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
