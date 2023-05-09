import { AboutData } from './About'
import { MetaProps } from './Meta'

export interface ComponentProps {
  indexData: IndexData
  theme: string
}

export interface IndexData {
  summary: string
  intro: string
  resume: string
  lightImage: string
  darkImage: string
  seo: MetaProps
}

export interface AboutProps {
  theme: string
  data: AboutData
}
