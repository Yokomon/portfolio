import { useEffect } from 'react'
import { useRouter } from 'next/router'

const AboutRedirect = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/#about')
  }, [router])

  return null
}

export default AboutRedirect
