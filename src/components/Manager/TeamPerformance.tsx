import React from 'react'
import Title from './Title'
const data = [
    ["John Doe", "3 Assigned / Avg 2.5 days" , "3 Reviews"],
    ["Jane Smith", "5 Assigned / avg 1.2 days", "4 Reviews"],
]
const TeamPerformance = () => {
  return (
    <div className=' bg-white md:min-w-[20vw] min-w-[70vw]  flex flex-col gap-3 border border-gray-100 shadow-md rounded-md p-5' >
        <Title label="Team Performance" />
        <div>
            <div>
                {data.map((item, index) => (
                    <div key={index} className='flex justify-between items-center rounded-md mb-2'>
                        <div className='flex flex-col'>
                            <span className='text-gray-800 font-semibold'>{item[0]}</span>
                            <span className='text-gray-500 text-sm'>{item[1]}</span>
                        </div>
                        <span className='text-gray-600'>{item[2]}</span> 
                    </div>))}

            </div>
        </div>
    </div>
  )
}

export default TeamPerformance