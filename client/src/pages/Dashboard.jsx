import React from 'react'
import { useGetDashboardStatsQuery } from '../redux/slices/api/taskApiSlice'
import Loading from '../components/Loading'
import {MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp
} from "react-icons/md"
import {LuClipboardCheck} from "react-icons/lu"
import {FaNewspaper,FaUsers} from "react-icons/fa"
import {FaArrowsToDot} from "react-icons/fa6"
import moment from  "moment"
import clsx from "clsx"
import Chart from '../components/Chart'
import { BGS, getInitials, PRIOTITYSTYELS, TASK_TYPE } from '../utils/index'
import Userinfo from '../components/Userinfo'
const Usertable=({users})=>{
  const TableHeader=()=>{
    return (
      <>
    <thead className='border-b border-teal-300 bg-[#272333] dark:border-teal-600'>
      <tr className='text-white px-2 text-left'>
        <th className='p-2'>FuLL Name</th>
        <th className='p-2'>Status</th>
        <th className='p-2'>Created At</th>
      </tr>
    </thead>
    </>
    )
  }
  const TableRow=({user})=>{
    return (
      <>
     <tr className='border-b border-teal-200 text-white bg-[#272333] hover:bg-gray-400'>
      <td className='py-2'>
        <div className='flex  gap-5 items-center '>
          <div className= 'w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-600'>

            <span className="text-center">{getInitials(user?.name)}</span>
          </div>
          <div>
            <p>{user.name}</p>
            <span className='text-xs text-white'>{user?.role}</span>
          </div>

        </div>
      </td>
      <td>
        <p className={clsx('w-fit px-3 py-1 rounded-full text-sm text-black',user?.isActive?"bg-blue-200":"bg-yellow-100")}>
          {user?.isActive?"Active":"Disabled"}
        </p>
      </td>
      <td className='py-2 px-4 text-sm'>{moment(user?.createdAt).fromNow()}</td>

     </tr>
     </>)
  }
  return (
    <>
    <div className='w-full md:w-2/3 bg-[#272333] h-fit px-2 md:px:2 py-4 shadow-md rounded'>
    <table className='w-full mb-5'>
      <TableHeader/>
        <tbody>
          {users.map((user,index)=>(
            <TableRow key={index+user?._id} user={user}/>
          ))}
        </tbody>
      

    </table>
    
     </div>
    </>
  )

}

const TaskTable=({tasks})=>{
  const Icons={
    high: <MdKeyboardDoubleArrowUp/>,
    medium: <MdKeyboardArrowUp/>,
    low: <MdKeyboardArrowDown/>

  }
  const Tableheader=()=>{
    return (
    <>
    
    <thead className='border-b bg-[#272333] border-teal-300'>
      <tr className='text-white text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
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
    <tr className='border-b border-teal-200 text-white bg-[#272333] hover:bg-gray-400'>
   <td className='p-2'>
    <div className='flex items-center gap-2'>

    
    <div className={clsx("w-4 h-4 rounded-full ",TASK_TYPE[task.stage])}/>
      <p className='text-base text-white'> {task.title}</p>
    </div>
   </td>
   <td className='p-2'>
    <div className={clsx('flex gap-1 items-center')}>
      <span className={clsx('text-lg',PRIOTITYSTYELS[task.priority])}>{Icons[task.priority]}</span>
      <span className='capitalize'>{task.priority}</span>
    </div>

   </td>
   <td className='p-2'
   >
  <div className='flex'>
    {task?.team.map((m,index)=>(
      <div key={index}  className={clsx(" w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",BGS[index%BGS.length]
    )}>
      <Userinfo user={m}/>
      </div>
    ))}

  </div>
    
   </td>
   <td className='p-2'> 
    <div className='text-base text-white'>{moment(task?.date).fromNow()}</div>
   </td>
    </tr>
   </> 
   )
  }

  return (
    <>
    <div className='w-full bg-[#272333] px-2 md:px-4 pt-4 shadow-md rounded'>
    <table className='w-full padding-2'> 
      <Tableheader/>
      <tbody>
        {
          tasks.map((task,id)=>(
            <TableRow key={id} task={task}/>
          ))
        }
      </tbody>
    </table>
    </div>
    </>
  )
}
export default function Dashboard() {

  const {data,isLoading}=useGetDashboardStatsQuery()
 
  if(isLoading){
    return (
      <div className='py-10'>
        <Loading/>
      </div>
    )
  }
  const totals = data?.tasks ;
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardCheck />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"]|| 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];
  const Card=({label,count,bg,icon})=>{
    return (
      <div className='w-full h-32 bg-[#272333] p-5 shadow-md rounded-md flex items-center justify-between'>
         <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-white'>{label}</p>
          <span className='text-2xl text-white font-semibold'>{count}</span>
          <span className='text-sm text-white'>{"110 last month"}</span>

         </div>
         <div className={clsx("w-10 h-10 rounded-full flex text-white items-center justify-center text-white",bg)}>{icon}</div>
      </div>
    )
  }
  return (
    <div className='h-full py-4 '>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
         {
          stats.map(({icon,bg,label,total},index)=>(
           <Card key={index} icon={icon} bg={bg} label={label} count={total} />
          ))
         }
      </div>
      <div className='w-full  my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-white font-semibold py-2'>Chart by Priority</h4>
        <Chart data={data?.groupData}/>
      </div>
      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-2'>

     
          <TaskTable tasks={data?.last10Task}/>
          <Usertable users={data?.users}/>

      </div>
      
    </div>
  )
}
