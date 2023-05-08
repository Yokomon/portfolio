import { AboutData } from '@/types/About'
import { IndexData } from '@/types/Component'
import { Article, Project } from '@/types/Project'
import { groq } from 'next-sanity'
import { clientConfig } from '../config/client-config'

export const formatSanityDate = (date: Date) =>
  new Date(date).toLocaleDateString('en-NG').replaceAll('/', '-')

export async function getProjects(): Promise<Project> {
  return clientConfig.fetch(
    groq`*[_type == "project"]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        url,
        summary,
        "image": image.asset -> url,
        githubUrl,
        featured
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

export async function getArticles(): Promise<Article[]> {
  return clientConfig.fetch(
    groq`*[_type == 'articles']{
      _id,
      _createdAt,
      name,
      "image": image.asset -> url,
      url,
      summary,
      "slug": slug.current,
      duration
    }`,
  )
}

export async function getIndexData(): Promise<IndexData> {
  return clientConfig.fetch(
    groq`*[_type == 'home'][0]{
      "lightImage": lightImage.asset -> url,
      "darkImage": darkImage.asset -> url,
      "resume": resume.asset -> url,
      intro,
      summary
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
      experience
    }`,
  )
}
