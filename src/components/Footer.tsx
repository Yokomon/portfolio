import Layout from './Layout'

export const Footer = () => {
  return (
    <footer className='w-full border-t-2 border-solid border-dark dark:border-slate-400 dark:text-slate-400 font-medium text-lg'>
      <Layout className='py-4 sm:py-8 flex justify-between items-center flex-col sm:flex-row'>
        <span className='text-sm sm:text-base order-2 sm:order-1'>
          {new Date().getFullYear()} &copy; All Rights Reserved
        </span>
        <div className='text-sm md:text-base order-1 mb-5 sm:order-2 sm:mb-0'>
          Built with
          <span className=' text-primary dark:text-orange-500 text-2 xl px-1.5'>&#9825;</span>
          by Marow Macaulay
        </div>
      </Layout>
    </footer>
  )
}
