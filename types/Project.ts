import { PortableTextBlock } from 'sanity'

export interface Project {
  _id: string
  _createdAt: Date
  name: string
  slug: string
  image: string
  url: string
  summary: PortableTextBlock[]
  githubUrl: string
  featured: boolean
}

export interface Article {
  _id: string
  _createdAt: Date
  name: string
  slug: string
  image: string
  url: string
  summary: string
  duration: string
}

export interface FeaturedProjectProps {
  url: string
  featured: boolean
  name: string
  summary: PortableTextBlock[]
  image: string
  githubUrl: string
}

export interface ProjectProps {
  data: FeaturedProjectProps[]
}
