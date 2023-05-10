import { defineType } from 'sanity'
const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'Seo details',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Description',
          type: 'string',
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'ogTitle',
          title: 'OG Title',
          type: 'string',
        },
        {
          name: 'ogType',
          title: 'OG Type',
          type: 'string',
        },
        {
          name: 'ogUrl',
          title: 'OG Url',
          type: 'string',
        },
        {
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
        },
      ],
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          name: 'projectsData',
          title: 'Projects data',
          type: 'object',
          fields: [
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
            },
            {
              name: 'featured',
              title: 'Featured',
              type: 'boolean',
            },
            {
              name: 'githubUrl',
              title: 'Github',
              type: 'string',
            },
            {
              name: 'summary',
              title: 'Summary',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
        },
      ],
    },
  ],
})

export default project
