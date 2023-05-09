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
      <meta name='viewport' content='width=device-width, initial-scale=1'></meta>
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta property='og:title' content={ogTitle} />
      <meta property='og:type' content={ogType} />
      <meta property='og:url' content={ogUrl} />
      <meta property='og:image' content={ogImage} />
      <meta charSet='utf-8'></meta>
      <link rel='icon' href='/favicon.ico'></link>
      <title>{title}</title>
    </Head>
  )
}
