import { Article } from './Project'

interface ArticlesProps {
  articles: Article[]
}

interface FeaturedArticlesInterface {
  link: string
  imgSrc: string
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
