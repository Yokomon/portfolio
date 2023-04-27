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
  ],
}

export default Home
