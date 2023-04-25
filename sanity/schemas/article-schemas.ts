import { SanityDocs } from "./types";

const article: SanityDocs = {
  name: "articles",
  title: "Articles",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    },
    {
      name: "url",
      title: "Url",
      type: "url",
    },
    {
      name: "summary",
      title: "Summary",
      type: "string",
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
    },
  ],
};

export default article;
