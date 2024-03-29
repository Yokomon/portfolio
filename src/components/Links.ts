import { SocialLinks } from '@/types/Links'
import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai'

const className = 'hover:scale-105 duration-300'

const socalLinks: SocialLinks[] = [
  {
    href: 'https://twitter.com/@_marow_mars_',
    icon: AiOutlineTwitter,
    fill: '#0072b1',
    className,
    linkStyles: 'w-6 mr-4',
    name: 'twitter',
  },
  {
    href: 'https://github.com/yokomon',
    icon: AiFillGithub,
    fill: '#171515',
    className: `${className} dark:fill-[#fff]`,
    linkStyles: 'w-6 mx-5',
    name: 'github',
  },
  {
    href: 'http://linkedin.com/in/marowmacaulay',
    icon: AiFillLinkedin,
    fill: '#0072b1',
    className,
    linkStyles: 'w-6 ml-4',
    name: 'linkedin',
  },
]

const mobileSocialLinks: SocialLinks[] = [
  {
    href: 'https://twitter.com/@_marow_mars_',
    icon: AiOutlineTwitter,
    fill: '#0072b1',
    className,
    linkStyles: 'w-6 mx-2 sm:mx-3',
    name: 'twitter',
  },
  {
    href: 'https://github.com/yokomon',
    icon: AiFillGithub,
    fill: '#171515',
    className: `${className} fill-[#fff] dark:fill-black`,
    linkStyles: 'w-6 mx-4 sm:mx-3',
    name: 'github',
  },
  {
    href: 'http://linkedin.com/in/marow-macaulay-68606b193',
    icon: AiFillLinkedin,
    fill: '#0072b1',
    className: 'fill-light dark:fill-[#0072b1]',
    linkStyles: 'w-6 mx-3 sm:mx-3',
    name: 'linkedin',
  },
]

export { socalLinks, mobileSocialLinks }
