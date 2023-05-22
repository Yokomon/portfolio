import { ImageMetadata, PortableTextBlock } from 'sanity'
import { MetaProps } from './Meta'

export interface ProjectQuery {
  seo: MetaProps
  items: ProjectItems[]
}

export interface ProjectComponents {
  url: string
  featured: boolean
  name: string
  summary: PortableTextBlock[]
  image: {
    url: string
    metadata: ImageMetadata
  }
  githubUrl: string
  tools: string[]
}

export interface ProjectItems extends ProjectComponents {
  _id: string
  _createdAt: Date
}

export interface ProjectProps {
  data: ProjectComponents[]
  seo: MetaProps
}
