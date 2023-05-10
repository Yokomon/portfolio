import { AboutData } from '@/types/About'
import { Article } from '@/types/Articles'
import { IndexData } from '@/types/Component'
import { Project } from '@/types/Project'
import { groq } from 'next-sanity'
import { clientConfig } from '../config/client-config'

export const formatSanityDate = (date: Date) =>
  new Date(date).toLocaleDateString('en-NG').replaceAll('/', '-')

export async function getProjects(): Promise<Project> {
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

export async function getProject(slug: string): Promise<Project> {
  return clientConfig.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        url,
        summary,
        "image": image.asset -> url
    }`,
    { slug },
  )
}

export async function getArticles(): Promise<Article> {
  return clientConfig.fetch(
    groq`*[_type == 'articles'][0]{
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
