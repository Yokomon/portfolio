import { Article, Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";
import { clientConfig } from "../config/client-config";

export async function getProjects(): Promise<Project> {
  const client = createClient(clientConfig);

  return client.fetch(
    groq`*[_type == "project"]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        url,
        content,
        "image": image.asset -> url
    }`
  );
}

export async function getProject(slug: string): Promise<Project> {
  const client = createClient(clientConfig);

  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        url,
        summary,
        "image": image.asset -> url
    }`,
    { slug }
  );
}

export async function getArticles(): Promise<Article> {
  const client = createClient(clientConfig);

  return client.fetch(
    groq`*[_type == 'articles']{
      _id,
      _createdAt,
      name,
      "image": image.asset -> url,
      url,
      summary,
      "slug": slug.current
    }`
  );
}
