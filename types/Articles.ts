import { ImageMetadata } from 'sanity'
import { MetaProps } from './Meta'

export type ArticleItems = {
  _id: string
  _createdAt: Date
  name: string
  slug: string
  image: {
    url: string
    metadata: ImageMetadata
  }
  url: string
  summary: string
  duration: string
}

export interface Article {
  seo: MetaProps
  items: ArticleItems[]
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
}

interface ArticleComponent {
  title: string
  date: string | Date
  link: string
}

export type { FeaturedArticlesInterface, ArticlesProps, ArticleComponent }
