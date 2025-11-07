import { Meta } from '@/components/Meta'
import SplashScreen from '@/components/SplashScreen'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import { getIndexData, getAboutData, getProjects } from '@/sanity/schemas/sanity-utils'
import { IndexData } from '@/types/Component'
import { AboutData } from '@/types/About'
import { ProjectComponents } from '@/types/Project'

interface PortfolioProps {
  indexData: IndexData
  aboutData: AboutData
  projects: ProjectComponents[]
}

const Portfolio: React.FC<PortfolioProps> = ({ indexData, aboutData, projects }) => {
  const { seo } = indexData
  const { title, ogType, ogImage, description, keywords, ogTitle, ogUrl } = seo

  const handleSplashComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hasSeenSplash', 'true')
    }
  }

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
      <SplashScreen onComplete={handleSplashComplete} />
      <main className='flex flex-col text-dark w-full min-h-screen relative scroll-smooth'>
        <HeroSection indexData={indexData} />
        <AboutSection data={aboutData} />
        <ExperienceSection experience={aboutData.experience} />
        <ProjectsSection projects={projects} />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const [indexData, aboutData, projectsData] = await Promise.all([
    getIndexData(),
    getAboutData(),
    getProjects(),
  ])

  return {
    props: {
      indexData,
      aboutData,
      projects: projectsData.items,
    },
  }
}

export default Portfolio
