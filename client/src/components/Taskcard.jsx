import clsx from 'clsx'
import React, { useState } from 'react'
import {MdAdminPanelSettings,
    MdAttachFile,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp,
    MdAdd
  
  } from "react-icons/md"
import { BiMessageAltDetail } from 'react-icons/bi'; 
import { useSelector } from 'react-redux'
import { BGS, formatDate, PRIOTITYSTYELS, TASK_TYPE } from '../utils'
import { FaList } from 'react-icons/fa';
import Userinfo from './Userinfo';
import AddSubTask from './AddSubTask';
import TaskDialog from './TaskDialog';
  const ICONS={
    high: <MdKeyboardDoubleArrowUp/>,
    medium: <MdKeyboardArrowUp/>,
    low: <MdKeyboardArrowDown/>

  }
export default function Taskcard({task}) {
  
    const {user} =useSelector((state)=>state.auth)
    const [open,setOpen]=useState(false)
    const id=task?._id
   
  return (<>
    <div className='w-full h-fit bg-[#272333] shadow-md p-4 rounded'>
        <div className='w-full flex justify-between'>
        <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium",
            PRIOTITYSTYELS[task?.priority])}>
                <span className='text-lg'>{ICONS[task?.priority]}</span>
                <span className='uppercase'>{task?.priority} Priority</span>
            </div>
          {<TaskDialog task={task}/>}
          </div>
       <>  
      <div className='flex items-center gap-2 '>
      <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}/>
      <h4 className='line-clamp-1 text-white'>{task?.title}</h4>
       
      </div>
      <span className="text-sm text-gray-300">
        {formatDate(new Date(task?.date))}
      </span>
    </> 
    <div className='w-full border-t border-teal-300 my-2'/>
    <div className='flex items-center justify-between mb-2'>
      <div className="flex items-center gap-3">
        <div className='flex gap-1 items-center text-sm text-gray-300'>
          <BiMessageAltDetail/>
          <span>{task?.activities?.length}</span>
        </div>
        <div className='flex gap-1 items-center text-sm text-gray-300'>
          <MdAttachFile/>
          <span>{task?.assets?.length}</span>
        </div>
        <div className='flex gap-1 items-center text-sm text-gray-300'>
          <FaList/>
          <span>{task?.subTask?.filter(subTask => subTask.completed).length}/{task?.subTask?.length}</span>

        </div>

      </div>
      <div className='flex flex-row-reverse'>
        {task?.team?.map((m,index)=>(
          <div key={index} className={clsx("w-7 h-7 rounded-full text-white flex justify-center items-center text-sm -mr-1",BGS[index%BGS?.length])}>
           <Userinfo user={m}/>
          </div>
        ))}

      </div>
    </div>
    {task?.subTask?.length>0 ?( <div className='py-4 border-t border-teal-300'>
        <h5 className='text-base line-clamp-1 text-gray-300'>{task?.subTask[0].title}</h5>
        <div className='p-4 space-x-8'>
        <span className="text-sm text-gray-300">
        {formatDate(new Date(task?.subTask[0]?.date))}
      </span>
      <span className='bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium'>
        {task?.subTask[0].tag}
      </span>
        </div>
    </div>):(
      <div className='py-4 border-t border-teal-300'>
        <span className='text-gray-300'>No Sub-Task</span>
      </div>
    )}
    <div className='w-full pb-2 '>
      <button 
      onClick={() => setOpen(true)}
      disabled={user.isAdmin ? false : true}
      className='w-full flex gap-4 items-center text-sm text-white font-semibold disabled:cursor-not-allowed disabled:text-gray-600'>
        <MdAdd className='text-lg'/>
        <span>ADD SUBTASK</span>
      </button>
    </div>
    </div>
     
    <AddSubTask open={open} setOpen={setOpen} id={id}/>
    </>
    
    
  )
}
