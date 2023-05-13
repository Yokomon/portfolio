import { MetaProps } from '@/types/Meta'
import Head from 'next/head'

export const Meta: React.FC<MetaProps> = ({
  title,
  keywords,
  description,
  ogTitle,
  ogType,
  ogUrl,
  ogImage,
}) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta property='og:title' content={ogTitle} />
      <meta property='og:type' content={ogType} />
      <meta property='og:url' content={ogUrl} />
      <meta property='og:image' itemProp='image' content={ogImage} />
      <meta name='author' content='Marow Macaulay' />
      <meta charSet='utf-8' />
      <link rel='shortcut-icon' href='/favicon.ico' />
      <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
      <link rel='icon' sizes='32x32' type='image/png' href='/favicon-32x32.png' />
      <link rel='icon' sizes='16x16' type='image/png' href='/favicon-16x16.png' />
      <meta name='google-site-verification' content='2-27SvaYcZGer5_mRoPvavWgHJKuytUQdvMCgSYhQSk' />
      <title>{title}</title>
    </Head>
  )
}
