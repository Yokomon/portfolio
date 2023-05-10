import { AnimatedText } from '@/components/common'
import Layout from '@/components/Layout'
import { getProjects } from '@/sanity/schemas/sanity-utils'
import { ProjectProps } from '@/types/Project'
import { FeaturedProject } from '../components/projects'
import { Meta } from '../components/Meta'

const Projects: React.FC<ProjectProps> = ({ data, seo }) => {
  const { description, title, keywords, ogImage, ogTitle, ogType, ogUrl } = seo

  return (
    <>
      <Meta
        description={description}
        title={title}
        keywords={keywords}
        ogImage={ogImage}
        ogTitle={ogTitle}
        ogType={ogType}
        ogUrl={ogUrl}
      />
      <main className='w-full mb-16 dark:my-0 flex flex-col min-h-screen items-center'>
        <Layout className='pt-16 sm:px-12'>
          <AnimatedText
            text='Imagination Trumps Knowledge!'
            textWrapper='text-center'
            className='text-[44px] sm:text-5xl mb-8 lg:text-7xl sm:mb-16'
          />

          <div className='grid grid-cols-12 gap-x-0 gap-y-24 sm:gap-x-8 md:gap-x-12 sm:gap-y-32 md:gap-24 md:gap-y-32 my-12 sm:my-0 dark:mb-12'>
            {data.map(({ url, name, image, featured, githubUrl, summary }, idx) => (
              <div key={idx} className='col-span-12'>
                <FeaturedProject
                  url={url}
                  name={name}
                  featured={featured}
                  image={image}
                  githubUrl={githubUrl}
                  summary={summary}
                />
              </div>
            ))}
          </div>
        </Layout>
      </main>
    </>
  )
}

export default Projects

export async function getStaticProps() {
  const { items, seo } = await getProjects()
  return {
    props: {
      data: items,
      seo,
    },
    revalidate: 10,
  }
}
