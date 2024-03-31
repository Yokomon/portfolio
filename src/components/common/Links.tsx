import { CustomLink as CustomLinkProps } from '@/types/Links'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const CustomLink: React.FC<CustomLinkProps> = ({ href, className, title }) => {
  const router = useRouter()
  const isActive = router.asPath.includes(title.toLowerCase()) || router.asPath === href
  return (
    <Link
      href={href}
      className={clsx({
        ['relative group dark:hover:text-orange-500/95']: true,
        [`${className}`]: className,
        ['dark:text-orange-500/95']: isActive,
        ['dark:text-white']: !isActive,
      })}
    >
      {title}
      <span
        className={clsx({
          ['h-[1px] top-6 absolute inline-block bg-dark dark:bg-orange-500 dark:h-[2px] group-hover:w-full transition-[width] ease duration-300 -bottom-1 left-0']:
            true,
          ['w-full']: isActive,
          ['w-0']: !isActive,
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
          ['h-[1px] absolute inline-block bg-slate-100 dark:bg-orange-500 dark:h-[2px] group-hover:w-full transition-[width] ease duration-300 -bottom-1 left-0']:
            true,
          ['w-full']: router.asPath.includes(title.toLowerCase()) || router.asPath === href,
          ['w-0']: router.asPath.toLowerCase() !== title.toLowerCase(),
        })}
      >
        &nbsp;
      </span>
    </button>
  )
}
