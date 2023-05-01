interface Layout {
  children: string | JSX.Element | JSX.Element[]
  className?: string
}
const Layout: React.FC<Layout> = ({ children, className = '' }) => {
  return (
    <div
      className={`w-full h-full z-0 inline-block bg-light dark:bg-slate-900 px-5 sm:px-20 xl:px-32 ${className}`}
    >
      {children}
    </div>
  )
}

export default Layout
