import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/next'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import '@/src/styles/globals.css'

import NavBar from '@/src/components/NavBar'
import { Footer } from '@/components/Footer'
import { SparklesCore } from '../components/ui/Sparkles'

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
        <div className='h-full w-full dark:bg-slate-900 bg-light dark:bg-dot-orange-500/20 bg-dot-black/20'>
          <div className='w-full fixed inset-0 h-screen'>
            <SparklesCore
              id='tsparticlesfullpage'
              background='transparent'
              minSize={0.3}
              maxSize={1}
              particleDensity={100}
              className='w-full h-full'
              particleColor='#FFFFFF'
            />
          </div>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
          <Analytics />
        </div>
      </main>
    </ThemeProvider>
  )
}
