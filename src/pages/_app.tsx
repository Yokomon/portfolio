import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import '@/src/styles/globals.css'

import NavBar from '@/src/components/NavBar'
import { Footer } from '@/components/Footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={false} attribute='class'>
      <main
        className={`${montserrat.variable} font-mont bg-light dark:bg-slate-900 w-full min-h-screen`}
      >
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </ThemeProvider>
  )
}
