import React from 'react'
import {Tab,TabGroup,TabList, TabPanels} from "@headlessui/react"
function classNames(...classes){
    return classes.filter(Boolean).join(" ")
}
export default function Tabs({tabs,setSelected,children}) {
  return (
    <div className='w-full px-1 sm:px-0'>
        <TabGroup>
            <TabList className="flex space-x-6 rounded-x1 p-1">
            {
                tabs.map((tab,index)=>(
                    <Tab key={tab.title} onClick={()=>{setSelected(index)}}
                    className={({selected})=>classNames("w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-mediun leading-5 bg-[#272333] ",selected?"text-teal-300 border-b-2 border-teal-300 ":"text-white hover:text-teal-300")}>
                     {tab.icon}
                     <span>{tab.title}</span>       
                    </Tab>
                ))
            }

            </TabList>
            <TabPanels className="w-full mt-2 ">
               {children}
            </TabPanels>
        </TabGroup>
      
    </div>
  )
}
