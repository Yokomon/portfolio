import { useEffect } from 'react'
import { useRouter } from 'next/router'

const ProjectsRedirect = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/#projects')
  }, [router])

  return null
}

export default ProjectsRedirect
