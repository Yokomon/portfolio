import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='dark:bg-slate-900 bg-light'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
