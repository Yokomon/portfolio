import { ImageMetadata, PortableTextBlock, Slug } from 'sanity'
import { MetaProps } from './Meta'

export interface ArticleItems extends MetaProps {
  _id: string
  _createdAt: Date
  name: string
  slug: Slug
  image: {
    url: string
    metadata: ImageMetadata
  }
  url: string
  summary: string
  duration: string
  external: boolean
  body: PortableTextBlock
}

interface ArticlesProps {
  articles: ArticleItems[]
  seo: MetaProps
}

interface FeaturedArticlesInterface {
  link: string
  imgSrc: {
    url: string
    metadata: ImageMetadata
  }
  title: string
  duration: string
  summary: string
  slug: Slug
  external: boolean
}

interface ArticleComponent {
  title: string
  date: string | Date
  link: string
}

export type { FeaturedArticlesInterface, ArticlesProps, ArticleComponent }
