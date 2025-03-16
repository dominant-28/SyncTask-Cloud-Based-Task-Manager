import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {FaList} from 'react-icons/fa'
import {MdAdd, MdGridView} from 'react-icons/md'
import {useParams} from "react-router-dom"
import  Loading from '../components/Loading'
import Title from '../components/Title'
import Button from '../components/Button'
import Tabs from '../components/Tabs'
import TaskTitle from '../components/TaskTitle'
import BoardView from '../components/BoardView'
import Table from '../components/Table'
import AddTask from '../components/AddTask'
import { useGetAllTaskQuery } from '../redux/slices/api/taskApiSlice'
const TABS=[
  {title: "Board view",icon:<MdGridView/>},
  {
    title:"List view",icon:<FaList/>
  }
]

const Task_Type={
  todo:"bg-blue-600",
  "in progress":"bg-yellow-600",
  completed:"bg-green-600"
}
export default function Tasks() {
  const params=useParams()
  const [selected,setSelected]=useState(0)
  const [open,setOpen]=useState(false);
  const status=params?.status || "";
  const searchQuery = useSelector((state) => state.search.searchQuery); 
  
  const {data,isLoading}=useGetAllTaskQuery({
    strQuery:status,isTrashed:"",search:searchQuery
  })
console.log(data)
  return  isLoading? (
    <div>
      <Loading/>
    </div>
  ):(
    <div className='w-full bg-[#211c26]'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ?`${status} Tasks` :"Tasks"}/>
        {
          !status &&<Button onClick={()=>setOpen(true)} label="Create Task" icon={<MdAdd className='text-lg'/>}
          className='flex flex-row-reverse gap-1 items-center gradient-btn text-white rounded-md py-2 2xl:py-2.5'/>

  
        }
      </div>
      <Tabs tabs={TABS} setSelected={setSelected}>
        {

          !status &&(
            <div className='w-full  flex gap-4 md:gap-x-12 py-4'>
              <TaskTitle label="TO DO" className={Task_Type.todo}/>
              <TaskTitle label="In Progress" className={Task_Type["in progress"]}/>
              <TaskTitle label="Completed" className={Task_Type.completed}/>
            </div>
          )
        } 
        
        {
         selected!==1 ? (<BoardView tasks={data?.tasks}/>): (
          <div className='w-full'>
            <Table tasks={data?.tasks}/>
          </div>
        )}
        </Tabs>

        <AddTask open={open} setOpen={setOpen}/>
    </div>
  )
}
