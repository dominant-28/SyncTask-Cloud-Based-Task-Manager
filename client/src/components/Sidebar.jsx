import React from "react";
import {MdDashboard,
    MdOutlineAddTask,
    MdOutlinePending,
    MdOutlinePendingActions,
    MdSettings,
    MdOutlineClose,
    MdTaskAlt
} from "react-icons/md"
import {FaTasks,FaTrashAlt,FaUsers} from "react-icons/fa"
import { setOpenSidebar } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
const linkData=[
    {
        label:"Dashboard",
        icon:<MdDashboard/>,
        link:"dashboard"
    }
    ,
    {
        label:"Tasks",
        icon:<FaTasks/>,
        link:"tasks"
    },
    {
        label:"Completed",
        icon:<MdTaskAlt/>,
        link:"completed/completed"
    },
    {
        label:"In Progress",
        icon:<MdOutlinePendingActions/>,
        link:"in-progress/in progress"
    },
    {
        label:"To Do",
        icon:<MdOutlinePendingActions/>,
        link:"todo/todo"
    },
    {
        label:"Team",
        icon:<FaUsers/>,
        link:"team"

    },
    {
        label:"Trash",
        icon:<FaTrashAlt/>,
        link:"trashed"
    },
    


]

const Sidebar = () => {
const {user} = useSelector((state) => state.auth);
const dispatch = useDispatch();
const Location=useLocation()
const path=Location.pathname.split("/")[1]

const sidebarlink=user?.isAdmin?linkData:linkData.slice(0,5)

const closeSideBar=()=>{
    dispatch(setOpenSidebar(false))
}
const Navlink =({el})=>{
    return (
        <Link to={el.link} onClick={closeSideBar} 
        className={clsx("w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full text-white text-base hover:bg-[#645a6e] hover:text-white",path==el.link.split("/")[0]?"bg-blue-600 text-white":"")}>
            {el.icon}
            <span >{el.label}</span>
            </Link>
    )
}
return (
    <div className="w-full h-full flex flex-col gradient-bg gap-8 p-5 ">
        <h1 className="flex gap-3 items-center">
            
                <img src="logo.png" alt="" width="55px"/>

            
            <span className="text-2xl font-bold text-white">
                SyncTask
            </span>
            <button onClick={() => closeSideBar()} className=" flex py-8 md:hidden px-5 ml-auto ">
              <MdOutlineClose size="25px" />
            </button>

        </h1>
        <div className="flex-1 flex flex-col gap-y-5 ">
          {
            sidebarlink.map ((link,index)=>(   
                <Navlink el={link} key={link.label}/>
             ))
          }
        </div>

    </div>
)
}
export default Sidebar