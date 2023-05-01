import { Url } from 'next/dist/shared/lib/router/router'
import { IconType } from 'react-icons'

export interface SocialLinks {
  href: Url
  icon: IconType
  className: string
  fill: string
  linkStyles: string
}

export interface CustomLink {
  href: Url
  className?: string
  title: string
  toggle?: () => void
}
