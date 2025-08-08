import React from 'react'

interface DisplayProps {
    title: string;
    amount: number;
}

const Display = ({title , amount} : DisplayProps) => {
  return (
    <div className=' border bg-white border-gray-100  shadow-md rounded-md max-w-[366px] min-w-70 p-3 max-h-[100px] flex flex-col justify-between  gap-1'>
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