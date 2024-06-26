import React from 'react'
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
} from 'react-icons/si'

import Skill from './Skill'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'

export default function Skills() {
  const isTablet = useMediaQuery('(max-width: 1280px)')
  return (
    <>
      <h2 className='font-bold inline-block text-5xl lg:text-8xl mt-28 pb-10 sm:pb-16 w-full text-center dark:text-slate-200 z-50'>
        Skills
      </h2>
      <div className='overflow-hidden relative w-full xl:justify-center flex items-center whitespace-nowrap xl:rounded-full xl:bg-circularLight dark:xl:bg-circularDark xl:h-[70rem]'>
        <div className='flex marquee w-max xl:justify-center xl:items-center'>
          {isTablet ? null : <Skill name={'Web'} center />}
          <Skill name='HTML' x='-25rem' y='2rem' icon={SiHtml5} iconClass='fill-red-600 mx-2' />
          <Skill
            name='ReactJS'
            x='-12rem'
            y='-10rem'
            icon={SiReact}
            iconClass='fill-blue-300 mx-2'
          />
          <Skill
            name='TypeScript'
            x='20rem'
            y='12rem'
            icon={SiTypescript}
            iconClass='fill-blue-400 mx-2'
          />
          <Skill
            name='JavaScript'
            x='0'
            y='22rem'
            icon={SiJavascript}
            iconClass='fill-yellow-300 mx-3'
          />
          <Skill
            name='NodeJS'
            x='-21rem'
            y='-20rem'
            icon={SiNodedotjs}
            iconClass='fill-green-500 dark:fill-green-800 mx-2'
          />
          <Skill name='NextJS' x='20rem' y='-17rem' icon={SiNextdotjs} iconClass='mx-2' />
          <Skill
            name='Firebase'
            x='25rem'
            y='-5rem'
            icon={SiFirebase}
            iconClass='mx-2 text-orange-500'
          />
          <Skill
            name='Tailwind CSS'
            x='0'
            y='-28rem'
            iconClass='mx-2 fill-[#38BDF9]'
            icon={SiTailwindcss}
          />
          <Skill name='CSS' x='-22rem' y='12rem' icon={SiCss3} iconClass='mx-2 fill-[#244BDD]' />
        </div>
        {isTablet ? (
          <div className='flex marquee w-max'>
            <Skill name='HTML' x='-25vw' y='2vw' icon={SiHtml5} iconClass='fill-red-600 mx-2' />
            <Skill
              name='ReactJS'
              x='-12vw'
              y='-10vw'
              icon={SiReact}
              iconClass='fill-blue-300 mx-2'
            />
            <Skill
              name='TypeScript'
              x='24vw'
              y='12vw'
              icon={SiTypescript}
              iconClass='fill-blue-400 mx-2'
            />
            <Skill
              name='JavaScript'
              x='0vw'
              y='24vw'
              icon={SiJavascript}
              iconClass='fill-yellow-300 mx-3'
            />
            <Skill
              name='NodeJS'
              x='-25vw'
              y='-20vw'
              icon={SiNodedotjs}
              iconClass='fill-green-500 dark:fill-green-800 mx-2'
            />
            <Skill name='NextJS' x='22vw' y='-17vw' icon={SiNextdotjs} iconClass='mx-2' />
            <Skill
              name='Firebase'
              x='28vw'
              y='-5vw'
              icon={SiFirebase}
              iconClass='mx-2 text-orange-500'
            />
            <Skill
              name='Tailwind CSS'
              x='0vw'
              y='-28vw'
              iconClass='mx-2 fill-[#38BDF9]'
              icon={SiTailwindcss}
            />
            <Skill name='CSS' x='-25vw' y='12vw' icon={SiCss3} iconClass='mx-2 fill-[#244BDD]' />
          </div>
        ) : null}
      </div>
    </>
  )
}
