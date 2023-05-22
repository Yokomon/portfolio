import {
  SiFramer,
  SiGraphql,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import { IconType } from 'react-icons'

export const getProjectIcons: {
  [key: string]: {
    icon: IconType
    iconClass: string
  }
} = {
  typescript: {
    icon: SiTypescript,
    iconClass: 'cursor-pointer fill-[#3078C6]',
  },
  tailwind: {
    icon: SiTailwindcss,
    iconClass: 'cursor-pointer fill-[#38BDF9]',
  },
  nextjs: {
    icon: SiNextdotjs,
    iconClass: 'cursor-pointer dark:fill-white hover:animate-pulse',
  },
  vercel: {
    icon: SiVercel,
    iconClass: 'cursor-pointer dark:fill-white hover:animate-pulse',
  },
  graphql: {
    icon: SiGraphql,
    iconClass: 'cursor-pointer dark:fill-white hover:scale-110 duration-500',
  },
  framer: {
    icon: SiFramer,
    iconClass: 'cursor-pointer dark:fill-white hover:animate-spin duration-300',
  },
}
