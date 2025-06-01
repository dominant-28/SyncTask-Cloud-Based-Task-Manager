import React from 'react'
import {MdOutlineSearch} from "react-icons/md"
import {useDispatch,useSelector} from "react-redux"
import Avatar from './Avatar';
import { setOpenSidebar } from '../redux/slices/authSlice';
import NotificationPanel from "./NotificationPanel";
import { setSearchQuery } from '../redux/slices/searchSlice';
export default function Navbar() {
    const dispatch = useDispatch();
    const searchQuery=useSelector((state)=>state.search.searchQuery)
    const handleSearch=(e)=>{
      dispatch(setSearchQuery(e.target.value))
    }
  return (
    <div className="flex items-center justify-between bg-black px-4 py-2 sticky top-0 z-10 2xl:py-2 border-b border-gray-700 "> 
      <div className='flex gap-4'>
      <button className='text-2xl text-gray-500 block md:hidden' onClick={()=>dispatch(setOpenSidebar(true))} ><img src="hamberger.svg" alt="" /></button>
      <div className='w-64 2xl:w-[400px]  flex items-center py-2 px-3 border rounded-full bg-[#461959]'>
        <MdOutlineSearch className=' text-2xl'/>
        <input type="text" placeholder="Search Tasks..." value={searchQuery} onChange={handleSearch} className='w-full bg-transparent outline-none px-2'/>
         
      </div>
      </div>
      <div className='flex gap-2 items-center'>
       
      <NotificationPanel />
       <Avatar/>
      </div>
    </div>
  )
}
