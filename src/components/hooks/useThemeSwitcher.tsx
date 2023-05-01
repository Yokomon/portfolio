import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export enum Theme {
  light = 'light',
  dark = 'dark',
  default = 'default',
}

const useThemeSwitch: () => [Theme, Dispatch<SetStateAction<Theme>>] = () => {
  const [mode, setMode] = useState<Theme>(Theme.default)

  useEffect(() => {
    const userPref = window.localStorage.getItem('theme') as Theme

    if (userPref) {
      setMode(userPref)
    }
  }, [])

  useEffect(() => {
    if (mode === Theme.default) {
      const theme = window.localStorage.getItem('theme')
      document.documentElement.classList.add(theme as string)
    } else if (mode === Theme.dark) {
      window.localStorage.setItem('theme', Theme.dark)
      document.documentElement.classList.add(Theme.dark)
    } else {
      window.localStorage.setItem('theme', Theme.light)
      document.documentElement.classList.remove(Theme.dark)
    }
  }, [mode])

  return [mode, setMode]
}

export { useThemeSwitch }
