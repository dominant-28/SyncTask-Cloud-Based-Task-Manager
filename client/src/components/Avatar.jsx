import React from 'react'
import { toast } from 'sonner'
import {Menu,MenuItem,MenuItems,MenuButton ,Transition} from "@headlessui/react"
import { Fragment, useState } from 'react'
import { FaUser ,FaUserLock} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getInitials} from "../utils/index"
import { MdOutlineLogout } from 'react-icons/md'
import { useLogoutMutation } from '../redux/slices/api/authApSlice'
import { logout } from '../redux/slices/authSlice'
import AddUser from './AddUser'
import ChangePaaaword from './ChangePassword'

export default function Avatar() {
    const [Open, setOpen] = useState(false)
    const [openPassword, setOpenPassword] = useState(false)
    const {user} = useSelector((state) => state.auth);
  
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [logoutapi,{isLoading}]=useLogoutMutation()
    const handleLogout=async()=>{
       try {
         await logoutapi().unwrap()
         dispatch(logout())
         navigate('/login')
       } catch (error) {
        toast.error("Something went wrong")
       }
    }
  
  
  return (
    <>
    <div>
      <Menu as='div' className='relative inline-block text-left' >
        <div>
            <MenuButton className='w-10 h-10 2xl:w-12 2xl:h-12 items-center
            justify-center rounded-full bg-[#461959] text-white border '>
                {
                    getInitials(user?user.name:null)
                }
            </MenuButton>

        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-[#272333] shadow-2xl ring-black/5 focus:outline-none" >
            <div className="p-4">

                <MenuItem>
                {({active})=>(
                    <button className='text-white group hover:bg-gray-600 flex w-full items-center rounded-md px-2 py-2 text-base'
                    onClick={()=> setOpen(true)} >
                        <FaUser className='text-white text-xl mr-2'/>
                        Profile
                    </button>
                )}
                </MenuItem>
                <MenuItem>
                {({active})=>(
                    <button className='text-white group hover:bg-gray-600 flex w-full items-center rounded-md px-2 py-2 text-base'
                    onClick={()=> setOpenPassword(true)} >
                        <FaUserLock className='text-white text-xl mr-2'/>
                        Change Password
                    </button>
                )}
                </MenuItem>
                <MenuItem>
                {({active})=>(
                    <button className='text-red-600 hover:bg-gray-600 group flex w-full items-center rounded-md px-2 py-2 text-base'
                    onClick={handleLogout} >
                        <MdOutlineLogout className='text-white text-xl mr-2'/>
                        Logout
                    </button>
                )}
                </MenuItem>
            </div>
            </MenuItems>
        </Transition>    
      </Menu>
    </div>
     <AddUser open={Open} setOpen={setOpen} userData={user} />
     <ChangePaaaword open={openPassword} setOpen={setOpenPassword} />
    </>
  )
}
