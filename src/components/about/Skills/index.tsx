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

export default function Skills() {
  return (
    <>
      <h2 className='font-bold text-5xl lg:text-8xl mt-24 md:mt-64 pb-16 w-full text-center dark:text-slate-400'>
        Skills
      </h2>
      <div className='w-full relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark my-8 h-[50vh] sm:h-[60vh] md:[80vh] lg:h-screen'>
        <Skill name={'Web'} center />
        <Skill name='HTML' x='-25vw' y='2vw' icon={SiHtml5} iconClass='fill-red-600 mx-2' />
        <Skill name='ReactJS' x='-12vw' y='-10vw' icon={SiReact} iconClass='fill-blue-300 mx-2' />
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
    </>
  )
}
