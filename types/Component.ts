import { AboutData } from './About'

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
}

export interface AboutProps {
  theme: string
  data: AboutData
}
