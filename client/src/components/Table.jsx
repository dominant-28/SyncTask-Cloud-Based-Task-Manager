import clsx from 'clsx'
import React, { useState } from 'react'
import moment from 'moment';
import Button from './Button';
import ConfirmationDialog from './Dialog'
import { useTrashedTaskMutation } from '../redux/slices/api/taskApiSlice';
import { toast } from "sonner";

import AddTask from './AddTask';
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


const ICONS={
    high: <MdKeyboardDoubleArrowUp/>,
    medium: <MdKeyboardArrowUp/>,
    low: <MdKeyboardArrowDown/>

  }
export default function Table({tasks}) {
    const [openDialog,setOpenDialog]=useState(false)
    const [selected,setSelected]=useState(null)
    const [openEdit, setOpenEdit] = useState(false);
    const [trashTask]=useTrashedTaskMutation()
    const deleteClicks=(id)=>{
      setSelected(id)
      setOpenDialog(true)
    }
    const editTaskHandler=(el)=>{
      setOpenEdit(true)   
      setSelected(el)  
          
    }
    const deleteHandler = async() => {
      try {
        const result =await trashTask({id:selected}).unwrap()
        toast.success(result?.message)
        setTimeout(()=>{
          setOpenDialog(false)
          window.location.reload()
        },500)
      } catch (err) {
         toast.error(err?.data?.message || err.message)
      }
    };
    const Tableheader=()=>{
        return (
        <>
        <thead className='w-full border-y border-teal-300 '>
          <tr className='w-full text-white text-left'>
            <th className='py-2'>Task Title</th>
            <th className='py-2'>Priority</th>
            <th className='py-2 line-clam-1'>Created At</th>
            <th className='py-2'>Assets</th>
            <th className='py-2'>Team</th>
            <th className='py-2'>Created At</th>
                     
          </tr>
          
        </thead>
        </>
        )
      }
      
        const TableRow=({task})=>{
          return (
          <>
          <tr className='border-b border-teal-200 text-white hover:bg-gray-500'>
         <td className='p-2'>
          <div className='flex items-center gap-2'>
      
          
          <div className={clsx("w-4 h-4 rounded-full ",TASK_TYPE[task.stage])}/>
            <p className='text-base w-full line-clamp-2 text-white'> {task.title}</p>
          </div>
         </td>
         <td className='p-2'>
          <div className={clsx('flex gap-1 items-center')}>
            <span className={clsx('text-lg',PRIOTITYSTYELS[task.priority])}>{ICONS[task.priority]}</span>
            <span className='capitalize line-clamp-1'>{task.priority}</span>
          </div>
      
         </td>
         <td className='py-2'>
            <span className='=text-sm text-white'>
                {formatDate(new Date(task?.date))}
            </span>

         </td>
         <td className='py-2'>
            <div className='flex items-center gap-3'>
                <div className='flex gap-1 items-center text-sm text-white'>
                          <BiMessageAltDetail/>
                          <span>{task?.activities?.length}</span>
                        </div>
                        <div className='flex gap-1 items-center text-sm text-white'>
                          <MdAttachFile/>
                          <span>{task?.assets?.length}</span>
                        </div>
                        <div className='flex gap-1 items-center text-sm text-white'>
                          <FaList/>
                          <span>0/{task?.subTasks?.length}</span>
                        </div>
                
            </div>

         </td>
         <td className='p-2'>
        <div className='flex'>
          {task?.team?.map((m,index)=>(
            <div key={index}  className={clsx(" w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",BGS[index%BGS.length]
          )}>
            <Userinfo user={m}/>
            </div>
          ))}
      
        </div>
          
         </td>
         <td className='p-2  hidden md:block'> 
          <div className='text-base text-white'>{moment(task?.date).fromNow()}</div>
         </td>
         <td className='py-2  '>
          <div className='flex flex-column gap-5 md:flex-row justify-center align-center'>
            <Button
            className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base' label='Edit' type='button'
            onClick={()=>editTaskHandler(task)}/>
             <Button
            className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base' label='Delete' type='button'
            onClick={()=>deleteClicks(task._id)}/>
            </div>
         </td>
         
          </tr>
         </> 
         )
        }
  return (
    <>
    <div className='bg-[#272333] px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
      <div className='overflow-x-auto '>
        <table className='w-full bg-[#272333]'>
            <Tableheader/>
            <tbody>
                {
                    tasks?.map((task,index)=>(
                        <TableRow key={index} task={task}/>
                    ))
                }
            </tbody>

        </table>

      </div>
    </div>
    <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      <AddTask
           open={openEdit}
           setOpen={setOpenEdit}
           task={selected}
           key={new Date().getTime()}
         />
  </>)
}
