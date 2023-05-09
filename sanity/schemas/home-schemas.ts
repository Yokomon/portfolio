const Home = {
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
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
      name: 'summary',
      title: 'Summary',
      type: 'string',
    },
    {
      name: 'intro',
      title: 'Intro',
      type: 'string',
    },
    {
      name: 'resume',
      title: 'Resume',
      type: 'file',
      fields: [
        {
          title: 'Description',
          name: 'description',
          type: 'string',
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
}

export default Home
