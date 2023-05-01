import { CustomLink as CustomLinkProps } from '@/types/Links'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const CustomLink: React.FC<CustomLinkProps> = ({ href, className, title }) => {
  const router = useRouter()

  return (
    <Link href={href} className={`${className} dark:text-slate-400 relative group`}>
      {title}
      <span
        className={clsx({
          ['h-[1px] absolute inline-block bg-dark dark:bg-orange-500 dark:h-[2px] group-hover:w-full transition-[width] ease duration-300 -bottom-1 left-0']:
            true,
          ['w-full']: router.asPath === href,
          ['w-0']: router.asPath !== href,
        })}
      >
        &nbsp;
      </span>
    </Link>
  )
}

export const CustomMobileLink: React.FC<CustomLinkProps> = ({ href, className, title, toggle }) => {
  const router = useRouter()

  const handleClick = () => {
    if (toggle !== undefined) {
      toggle()
      router.push(href)
    }
    return
  }

  return (
    <button
      className={`${className} dark:text-dark text-light relative group my-2`}
      onClick={handleClick}
    >
      {title}
      <span
        className={clsx({
          ['h-[1px] absolute inline-block bg-dark dark:bg-orange-500 dark:h-[2px] group-hover:w-full transition-[width] ease duration-300 -bottom-1 left-0']:
            true,
          ['w-full']: router.asPath === href,
          ['w-0']: router.asPath !== href,
        })}
      >
        &nbsp;
      </span>
    </button>
  )
}
