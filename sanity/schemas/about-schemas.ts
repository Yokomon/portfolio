import { defineType } from 'sanity'

const About = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'lightImage',
      title: 'Light-image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
    },
    {
      name: 'darkImage',
      title: 'Dark-image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
    },
    {
      name: 'biography',
      title: 'Biography',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          name: 'clients',
          type: 'object',
          fields: [{ type: 'number', name: 'value' }],
        },
        {
          name: 'projects',
          type: 'object',
          fields: [{ type: 'number', name: 'value' }],
        },
        {
          name: 'years',
          type: 'object',
          fields: [{ type: 'number', name: 'value' }],
        },
      ],
    },
    {
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [
        {
          name: 'companyData',
          type: 'object',
          title: 'Company Data',
          fields: [
            {
              name: 'company',
              title: 'Company',
              type: 'string',
            },
            {
              type: 'string',
              name: 'companyUrl',
              title: 'Company url',
            },
            {
              name: 'companyLocation',
              title: 'Company Location',
              type: 'string',
            },
            {
              name: 'workTitle',
              title: 'Work title',
              type: 'string',
            },
            {
              name: 'workSummary',
              title: 'Work summary',
              type: 'array',
              of: [{ type: 'block', title: 'Work summary' }],
            },
            {
              name: 'duration',
              title: 'Duration',
              type: 'string',
            },
          ],
        },
      ],
    },
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
  ],
})

export default About
