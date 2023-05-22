import { AboutData } from '@/types/About'
import { ArticleItems } from '@/types/Articles'
import { IndexData } from '@/types/Component'
import { ProjectQuery } from '@/types/Project'
import { groq } from 'next-sanity'
import { clientConfig } from '../config/client-config'

export const formatSanityDate = (date: Date) =>
  new Date(date).toLocaleDateString('en-NG').replaceAll('/', '-')

export async function getProjects(): Promise<ProjectQuery> {
  return clientConfig.fetch(
    groq`*[_type == "project"][0]{
      seo{
        ...,
        "ogImage": ogImage.asset -> url 
      },
      items[]{
        ...,
      "image": image.asset -> {
        url,
        metadata
      },
      }
    }`,
  )
}

export async function getArticles(): Promise<ArticleItems[]> {
  return clientConfig.fetch(
    groq`*[_type == 'articles']{
      _id, 
      _createdAt,
      ogTitle,
      ogType,
      ogUrl,
      'ogImage': ogImage.asset -> url,
      description,
      title,
      "image": image.asset -> {
        url,
        metadata
      },
      url,
      slug,
      name,
      summary,
      duration,
      external
    }`,
  )
}

export async function getArticle(slug: string): Promise<ArticleItems[]> {
  return clientConfig.fetch(
    groq`*[_type == 'articles' && slug.current == $slug][0]{
     ...,
     'image' : image.asset -> url,
     body[]{
      ...,
      _type == 'image' => {
        ...,
        asset ->,
        metadata
      }
     },
     'ogImage': ogImage.asset -> url
    }`,
    { slug },
  )
}

export async function getIndexData(): Promise<IndexData> {
  return clientConfig.fetch(
    groq`*[_type == 'home'][0]{
      "lightImage": lightImage.asset -> {
        url,
        metadata
      },
      "darkImage": darkImage.asset -> {
        url,
        metadata
      },
      "resume": resume.asset -> url,
      intro,
      summary,
      seo{
        ...,
        "ogImage": ogImage.asset -> url 
      }
    }`,
  )
}

export async function getAboutData(): Promise<AboutData> {
  return clientConfig.fetch(
    groq`*[_type == 'about'][0]{
      "lightImage": lightImage.asset -> {
        url,
        metadata
      },
      "darkImage": darkImage.asset -> {
        url,
        metadata
      },
      _id,
      _createdAt,
      biography,
      stats,
      experience,
      seo{
        ...,
        "ogImage": ogImage.asset -> url 
      }
    }`,
  )
}
