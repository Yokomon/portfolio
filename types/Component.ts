import { ImageMetadata } from 'sanity'
import { MetaProps } from './Meta'

export interface ComponentProps {
  indexData: IndexData
}

export interface IndexData {
  summary: string
  intro: string
  resume: string
  lightImage: {
    url: string
    metadata: ImageMetadata
  }
  darkImage: {
    url: string
    metadata: ImageMetadata
  }
  seo: MetaProps
}
