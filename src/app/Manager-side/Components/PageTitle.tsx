import React from 'react'
interface PageTitleProps {
    title: string;
    subtitle?: string;
}

const PageTitle = ({title , subtitle} : PageTitleProps) => {
  return (
    <div className='flex flex-col gap-1 pl-20 '>
        <h1 className='text-4xl font-bold '>{title}</h1>
        <span className='text-gray-500 font-semibold '>{subtitle}</span>
    </div>
  )
}

export default PageTitle