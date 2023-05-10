import { ImageMetadata, PortableTextBlock } from 'sanity'
import { MetaProps } from './Meta'

export type ProjectItems = {
  _id: string
  _createdAt: Date
  name: string
  slug: string
  image: {
    url: string
    metadata: ImageMetadata
  }
  url: string
  summary: PortableTextBlock[]
  githubUrl: string
  featured: boolean
}

export interface Project {
  seo: MetaProps
  items: ProjectItems[]
}

export interface FeaturedProjectProps {
  url: string
  featured: boolean
  name: string
  summary: PortableTextBlock[]
  image: {
    url: string
    metadata: ImageMetadata
  }
  githubUrl: string
}

export interface ProjectProps {
  data: FeaturedProjectProps[]
  seo: MetaProps
}
