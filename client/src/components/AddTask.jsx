import React ,{useState,useEffect } from 'react'
import dateFormatter from '../utils'
import ModalWrapper from './ModalWrapper'
import { Dialog, DialogTitle } from '@headlessui/react'
import Textbox from "./Textbox"
import {set, useForm} from "react-hook-form"
import UserList from './UserList'
import SelectList from './SelectList'
import { BiImages } from 'react-icons/bi'
import Button from './Button'
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import { app } from '../utils/firebase'
import { useCreateTaskMutation, useUpdateTaskMutation } from '../redux/slices/api/taskApiSlice'

import { toast } from 'sonner'
const LISTS=["TODO","IN PROGRESS", "COMPLETED"]
const PRIORITY=["HIGH","MEDIUM","LOW"] 
const uploadedFileURLs = [];
export default function AddTask({ open, setOpen ,task}) {
  
    const defaultvalue={
      title:task?.title || "",
      date:dateFormatter(task?.date || new Date()),
      team:[],
      stage:"",
      priority:"",
      assets:[]
    }
    
    const {register,handleSubmit,formState:{errors}} =useForm({
      defaultValues: defaultvalue
    })
    
    
    const [team,setTeam]=useState(task?.team || [])
    const [stage,setStage]=useState(task?.stage?.toUpperCase() || LISTS[0])
    const [priority, setPriority] = useState(
      task?.priority?.toUpperCase() || PRIORITY[2]
    );
    const [assets, setAssets] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [createTask,{isLoading}]=useCreateTaskMutation()
    const [updateTask,{isLoading:isUpdating}]=useUpdateTaskMutation()
    const URLS=task?.assets?[...task.assets]:[]
   
const submitHandler=async(data)=>{
   for (const file of assets){
    setUploading(true)
    try{
      await uploadFile(file)

    }
    catch(error){
      console.log("Error uploading file:",error.message)
      return 
    }finally{
      setUploading(false)
    }
   }
    try{
      const newData={
        ...data,
        assets:[...URLS,...uploadedFileURLs],
        team,
        stage,
        priority
      }

      
      const res=task? await updateTask({...newData,id:task._id}).unwrap():await createTask(newData).unwrap();
    
      toast.success(res.message)

      setTimeout(()=>{
        setOpen(false)
       
      },500)
    }catch(err){
      toast.error(err?.data?.message || err.error)
    }}
    
    const handleSelect = (e) => {
      setAssets(e.target.files);
    };
    
    
    

    const uploadFile=async(file)=>{
      const storage=getStorage(app)
      const storageref=ref(storage,file.name)
    const uploadTask=uploadBytesResumable(storageref,file)
  return new Promise((resolve,reject)=>{
    uploadTask.on(
      "state_changed",
      (snapshot)=>{
        console.log("Uploading")
      },
      (error)=>{
        reject(error)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          uploadedFileURLs.push(downloadURL)
          resolve()
      }
    ).catch((error)=>{
      reject(error)
    })
  })
})
  }
  return (
    <>
    <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
            <DialogTitle as='h2'
                className='text-base font-bold leading-6 text-white mb-4'>
               {task ? "UPDATE TASK":"ADDTASK"}
            </DialogTitle>
            <div className='mt-2 flex flex-col gap-6'>
                <Textbox placeholder="Task Title"
                type="text" name="title" label="Task Title" 
                className="w-full rounded" 
                error={errors.title? errors.title.message :""}
                register={register("title",{required:"Title is Required"})} />
                <UserList
                setTeam={setTeam}
                team={team}
                />
                <div className='flex gap-4'>
                  <SelectList label="Task Stage" list={LISTS} 
                  selected={stage}
                  setSelected={setStage}/>
                  <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='date'
                  label='Task Date'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
              </div>
              <div className='flex gap-4'>
              <SelectList
                label='Priority Level'
                list={PRIORITY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-white hover:text-gray-400 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div>
            </div>
            <div className='bg-[#] py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label='Submit'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
                
            </div>
        </form>

    </ModalWrapper>
    </>
  )
}
