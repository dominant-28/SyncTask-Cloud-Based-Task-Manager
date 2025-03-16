import React from 'react'
import clsx from 'clsx'
import { MdAdd } from 'react-icons/md'

export default function TaskTitle({label,className}) {
  return (
    <div className='w-full h-10 md:h-12 px-2 md:px-4 border-y  border-teal-300 rounded bg-[#272333] flex items-cneter justify-between'>
        <div className='flex gap-2 items-center'>
            <div className={clsx("w-4 h-4 rounded-full",className)}/>
            <p className='text-sm md:text-base text-teal-300'>{label}</p>
        </div>
        <button onClick={onclick}>
            <MdAdd className='text-lg text-white'/>

        </button>
      
    </div>
  )
}
