import { defineType } from 'sanity'

const article = defineType({
  name: 'articles',
  title: 'Articles',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      hidden: ({ document }) => !!document?.external,
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
      hidden: ({ document }) => !!document?.external,
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: ({ document }) => !!document?.external,
    },
    {
      name: 'ogTitle',
      title: 'OG Title',
      type: 'string',
      hidden: ({ document }) => !!document?.external,
    },
    {
      name: 'ogType',
      title: 'OG Type',
      type: 'string',
      hidden: ({ document }) => !!document?.external,
    },
    {
      name: 'ogUrl',
      title: 'OG Url',
      type: 'string',
      hidden: ({ document }) => !!document?.external,
    },
    {
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      hidden: ({ document }) => !!document?.external,
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
    },
    {
      name: 'url',
      title: 'Url',
      type: 'url',
      hidden: ({ document }) => !document?.external,
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        { type: 'image', options: { hotspot: true } },
        {
          type: 'code',
        },
      ],
      hidden: ({ document }) => !!document?.external,
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
    },
    {
      name: 'external',
      title: 'External',
      type: 'boolean',
      initialValue: false,
    },
  ],
})

export default article
