import { IconType } from 'react-icons'
import { ImageMetadata, PortableTextBlock } from 'sanity'

export interface AnimatedNumbersProps {
  value: number
}

export interface Skill {
  name: string
  x?: string
  y?: string
  center?: boolean
  icon?: IconType
  iconClass?: string
}

enum StatTypes {
  Client = 'clients',
  Projects = 'projects',
  Years = 'years',
}

type Stats = {
  _key: string
  _type: StatTypes.Client | StatTypes.Projects | StatTypes.Years
  value: number
}

export type Experience = {
  workSummary: PortableTextBlock[]
  duration: string
  workTitle: string
  company: string
  companyUrl: string
  companyLocation: string
}

export interface AboutData {
  _id: string
  _createdAt: Date
  name: string
  darkImage: {
    url: string
    metadata: ImageMetadata
  }
  lightImage: {
    url: string
    metadata: ImageMetadata
  }
  biography: PortableTextBlock[]
  stats: Stats[]
  experience: Experience[]
}

export interface Details {
  position: string
  company: string
  companyLink: string
  duration: string
  address: string
  work: PortableTextBlock[]
}
