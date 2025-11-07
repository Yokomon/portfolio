import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  SiHtml5,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiNextdotjs,
  SiFirebase,
  SiTailwindcss,
  SiCss3,
  SiPrisma,
  SiReactquery,
  SiJest,
  SiFramer,
} from 'react-icons/si'

const skills = [
  { name: 'HTML5', icon: SiHtml5, color: 'from-red-400 to-red-600' },
  { name: 'CSS3', icon: SiCss3, color: 'from-blue-400 to-blue-600' },
  { name: 'JavaScript', icon: SiJavascript, color: 'from-yellow-400 to-yellow-600' },
  { name: 'TypeScript', icon: SiTypescript, color: 'from-blue-500 to-blue-700' },
  { name: 'React', icon: SiReact, color: 'from-blue-400 to-cyan-500' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'from-gray-700 to-gray-900' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'from-green-400 to-green-600' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'from-cyan-400 to-cyan-600' },
  { name: 'Firebase', icon: SiFirebase, color: 'from-orange-400 to-orange-600' },
  { name: 'Prisma', icon: SiPrisma, color: 'from-purple-400 to-purple-600' },
  { name: 'React Query', icon: SiReactquery, color: 'from-pink-400 to-pink-600' },
  { name: 'Jest', icon: SiJest, color: 'from-red-400 to-red-600' },
  { name: 'Framer Motion', icon: SiFramer, color: 'from-green-400 to-green-600' },
]

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const skillsGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const titleChars = titleRef.current.querySelectorAll('.skill-title-char')
        if (titleChars.length > 0) {
          gsap.set(titleChars, {
            y: 60,
            opacity: 0,
            rotateX: -30,
            transformOrigin: 'center bottom',
          })

          gsap.to(titleChars, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          })
        }
      }

      if (skillsGridRef.current) {
        const skillCards = skillsGridRef.current.querySelectorAll('.skill-card')

        gsap.set(skillCards, {
          y: 80,
          opacity: 0,
          scale: 0.8,
          rotateY: -20,
        })

        gsap.to(skillCards, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: skillsGridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        skillCards.forEach((card, index) => {
          gsap.to(card, {
            y: 'random(-8, 8)',
            rotation: 'random(-2, 2)',
            duration: 4 + Math.random() * 4,
            ease: 'none',
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
          })
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const titleText = 'Skill Sets'

  return (
    <div ref={containerRef} className='w-full'>
      <div className='text-center mb-16 sm:mb-20'>
        <h2
          ref={titleRef}
          className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 bg-clip-text text-transparent'
        >
          {titleText.split('').map((char, index) => (
            <span
              key={index}
              className='skill-title-char inline-block bg-gradient-to-r from-black to-black/70 dark:from-orange-500 dark:to-orange-600 bg-clip-text text-transparent'
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
        <p className='text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto'>
          Technologies I use to bring ideas to life
        </p>
      </div>

      <div
        ref={skillsGridRef}
        className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8'
      >
        {skills.map((skill) => (
          <div key={skill.name} className='skill-card group'>
            <div className='relative p-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 py-5'>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 rounded-2xl  transition-opacity duration-300`}
              />

              <div className='relative z-10 flex flex-col items-center text-center space-y-4'>
                <div className='p-3 sm:p-4 bg-slate-100 dark:bg-slate-700 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform duration-300'>
                  <skill.icon className='w-8 h-8 sm:w-10 sm:h-10 text-slate-700 dark:text-slate-200' />
                </div>

                <h3 className='text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300'>
                  {skill.name}
                </h3>
              </div>

              <div className='absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10' />
            </div>
          </div>
        ))}
      </div>

      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute top-10 left-10 w-16 h-16 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-pulse' />
        <div className='absolute bottom-20 right-20 w-20 h-20 bg-pink-200/20 dark:bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000' />
        <div className='absolute top-1/2 right-10 w-12 h-12 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-lg animate-pulse delay-500' />
      </div>
    </div>
  )
}
