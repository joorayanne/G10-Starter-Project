import React from 'react'

interface DisplayProps {
    title: string;
    amount: number;
}

const Display = ({title , amount} : DisplayProps) => {
  return (
    <div className=' border bg-white border-gray-100 min-w-[20vw] shadow-md rounded-md   p-3 max-h-[100px] flex flex-col justify-between  gap-1'>
        <span 
        className='text-gray-500 text-sm font-semibold'
        >
            {title}
        </span>
        <span className=' text-4xl font-semibold text-gray-800'>
            {amount}
        </span>
    </div>
  )
}

export default Display