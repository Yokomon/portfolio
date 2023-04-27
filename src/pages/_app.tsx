import NavBar from '@/src/components/NavBar'
import '@/src/styles/globals.css'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
import { Footer } from '../components/Footer'
import { useThemeSwitch } from '../components/hooks/useThemeSwitcher'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
})

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useThemeSwitch()
  const componentProps = { ...pageProps, theme: mode }

  return (
    <main
      className={`${montserrat.variable} font-mont bg-light dark:bg-slate-900 w-full min-h-screen`}
    >
      <NavBar mode={mode} setMode={setMode} />
      <Component {...componentProps} />
      <Footer />
    </main>
  )
}
