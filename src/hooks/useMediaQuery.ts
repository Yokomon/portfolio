import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(true)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (!media.matches) {
      setMatches(false)
    }

    const listener = () => {
      if (media.matches) {
        setMatches(media.matches)
      } else {
        setMatches(false)
      }
    }

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', listener)
    }

    return () => {
      media.removeEventListener('change', listener)
    }
  }, [matches, query])

  return matches
}
