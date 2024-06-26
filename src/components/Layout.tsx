import clsx from 'clsx'

interface Layout {
  children: string | JSX.Element | JSX.Element[]
  className?: string
}
const Layout: React.FC<Layout> = ({ children, className = '' }) => {
  return (
    <div
      className={clsx({
        [className]: className,
        ['w-full h-full z-0 inline-block px-8 sm:px-12 lg:px-32 xl:px-12 xl:container xl:mx-auto relative']:
          true,
      })}
    >
      {children}
    </div>
  )
}

export default Layout
