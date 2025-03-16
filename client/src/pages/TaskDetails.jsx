import React, { useState,useRef } from "react";
import clsx from "clsx";
import moment from "moment";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { usePostTaskActivityMutation, useGetSingleTaskQuery, useUpdateTaskAssetsMutation } from "../redux/slices/api/taskApiSlice";
import { tasks } from "../assets/data";
import Tabs from "../components/Tabs";
import { getInitials, PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import { use } from "react";
import Loading from "../components/Loading"
import  Button  from "../components/Button";
import {  } from "react-icons/bi"; 

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};
const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
  { title: "Workflow Editor", icon:<RxActivityLog /> } 
];

const TASKTYPEICON = {
  commented: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <MdOutlineMessage />
    </div>
  ),
  started: (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white">
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className="text-red-600">
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white">
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];
export default function TaskDetails() {
  const { id } = useParams();
  const {data,isLoading,refetch}=useGetSingleTaskQuery(id)
  const [selected, setSelected] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [showDrawIoEditor, setShowDrawIoEditor] = useState(false);
  const [workflowImage, setWorkflowImage] = useState(null);
  const iframeRef = useRef(null);
  const task = data?.task;
  const [updateTaskAssets, { isLoading: isUpdatingAssets }] = useUpdateTaskAssetsMutation();
  const handleSaveWorkflow = async () => {
    try {
      if (!workflowImage) {
        toast.error("No workflow diagram created");
        return;
      }

      // Add the workflow image to task assets
      const updatedAssets = [...(task.assets || []), workflowImage];

      
      const result = await updateTaskAssets({
        id: id,
        assets: updatedAssets
      }).unwrap();
      
      toast.success("Workflow diagram added to assets");
      refetch();
      setWorkflowImage(null);
      setSelected(0); // Navigate back to task details
    } catch (err) {
      toast.error(err.data?.message || "Failed to save workflow");
    }
  };

  const loadDiagram=() =>{
    console.log("soham")
    const drawioFrame = document.getElementById("drawioFrame");
    
    if (!drawioFrame || !drawioFrame.contentWindow) {
        console.error("Draw.io iframe not found or not loaded yet.");
        return;
    }

    const sampleDiagram = {
        action: "load",
        xml: "<mxGraphModel><root><mxCell id='0'/><mxCell id='1' parent='0'/><mxCell id='2' value='Start' style='ellipse' vertex='1' parent='1'><mxGeometry x='100' y='100' width='80' height='80' as='geometry'/></mxCell></root></mxGraphModel>"
    };

    drawioFrame.contentWindow.postMessage(JSON.stringify(sampleDiagram), "*");
}

  const handleDrawIoMessage = (event) => {
    // Handle messages from draw.io iframe
    if (event.data && event.data.length > 0) {
      try {
        const msg = JSON.parse(event.data);
        
        // When diagram is exported as PNG
        if (msg.event === 'export') {
          if (msg.data && msg.data.startsWith('data:image/png;base64,')) {
            setWorkflowImage(msg.data);
            toast.success("Workflow diagram created successfully");
          }
        }
      } catch (e) {
        // Ignore invalid messages
      }
    }
  };
  React.useEffect(() => {
    window.addEventListener('message', handleDrawIoMessage);
    return () => {
      window.removeEventListener('message', handleDrawIoMessage);
    };
  }, []);
  const exportDiagram = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.contentWindow.postMessage(JSON.stringify({
        action: 'export',
        format: 'png',
        spin: 'Exporting'
      }), '*');
    }
  };
  if(isLoading){
      return (
        <div className='py-10'>
          <Loading/>
        </div>
      )
    }
  
  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <h1 className="text-2xl text-white font-bold">{task?.title}</h1>
      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <>
            <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-[#272333] shadow-md px-8 py-8 overflow-y-auto">
              <div className="w-full md:w-1/2 space-y-8">
                <div className="flex items-center gap-5">
                  <div
                    className={clsx(
                      "flex gap-1 items-center text-base font -semibold px-3 py-1 rounded-full",
                      PRIOTITYSTYELS[task.priority],
                      bgColor[task?.priority]
                    )}
                  >
                    <span className="text-lg">{ICONS[task?.priority]}</span>
                    <span className="uppercase">{task?.priority} Priority</span>
                  </div>
                  <div className={clsx("flex items-center gap-2")}>
                    <div
                      className={clsx(
                        "w-4 h-4 rounded-full ",
                        TASK_TYPE[task.stage]
                      )}
                    />
                    <span className="text-white uppercase">{task?.stage}</span>
                  </div>
                </div>
                <p className="text-white">
                  Created At: {new Date(task?.date).toDateString()}
                </p>
                <div className="flex items-center text-white gap-8 p-4 border-y border-gray-200">
                  <div className="space-x-2">
                    <span className="font-semibold">Assets :</span>
                    <span>{task?.assets?.length}</span>
                  </div>
                  <span className="text-white">|</span>
                  <div className="space-x-2">
                    <span className="font-semibold">Sub-Task :</span>
                    <span>{task?.subTask?.length}</span>
                  </div>
                </div>
                <div className="space-y-4 py-6">
                  <p className="text-white font-semibold text-sm">
                    TASK TEAM
                  </p>
                  <div className="space-y-3">
                    {task?.team?.map((m, index) => (
                      <div
                        key={index}
                        className="flex gap-4 py-2 items-center border-t border-gray-200"
                      >
                        <div
                          className={
                            "w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600"
                          }
                        >
                          <span className="text-center">
                            {getInitials(m?.name)}
                          </span>
                        </div>
                        <div>
                          <p className="text-lg text-white font-semibold">{m?.name}</p>
                          <span className="text-white">{m.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 py-6">
                  <p className="text-white font -semibold text-sm">
                    SUB_TASK
                  </p>
                  <div className="space-y-8">
                    {task?.subTask?.map((el, index) => (
                      <div key={index} className="flex gap-3">
                        <div
                          className="w-10 h-10 flex items-center justify-center rounded-full
                bg-violet-50-200"
                        >
                          <MdTaskAlt className="text-violet-600" size={26} />
                        </div>
                        <div className="sapce-y-1">
                          <div className="flex gap-2 items-center">
                            <span className="text-sm text-white">
                              {new Date(el?.date).toDateString()}
                            </span>
                            <span className="px-2 py-0.5 text-center text-sm rounded-full  bg-violet-100 text-violet-700 font-semibold  ">
                              {el?.tag}
                            </span>
                          </div>
                          <p className="text-white">{el?.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-8">
                <p className="text-lg text-white font-semibold">ASSETS</p>
                <div className="w-full grid grid-cols-2 gap-4">
                  {task?.assets.map((el, index) => (
                    <img
                      key={index}
                      src={el}
                      alt={task.title}
                      className="w-full rounded h-20 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
                      onClick={() => setModalImage(el)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : selected==1 ?(
          <>
            <Activities activity={data?.task?.activities} id={id} refetch={refetch}/>
          </>
        ) :(
          <>
            <div className="w-full flex flex-col gap-5 bg-[#272333] shadow-md px-8 py-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg text-white font-semibold">Workflow Editor</h3>
                <div className="flex gap-3">
                  {workflowImage && (
                    <Button
                      type="button"
                      label="Save to Assets"
                      onClick={handleSaveWorkflow}
                      className="bg-green-600 text-white rounded"
                      disabled={isUpdatingAssets}
                    />
                  )}
                  <Button
                    type="button"
                    label="Export Diagram"
                    onClick={exportDiagram}
                    className="bg-blue-600 text-white rounded"
                  />
                  <button 
                  onClick={loadDiagram}
                  className="bg-blue-600 text-white rounded">Make Workflow</button>

                </div>
              </div>
              
              {workflowImage ? (
                <div className="flex flex-col gap-4">
                  <div className="border border-gray-300 rounded-md p-2">
                    <img 
                      src={workflowImage} 
                      alt="Workflow Diagram" 
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      label="Edit Diagram"
                      onClick={() => setWorkflowImage(null)}
                      className="bg-gray-600 text-white rounded"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-[70vh] border border-gray-300 rounded">
                  <iframe
                    ref={iframeRef}
                    src="https://embed.diagrams.net/?embed=1&spin=1&proto=json&saveAndExit=0"
                    width="100%"
                    height="100%"
                    id="drawioFrame"
                    frameBorder="0"
                    title="draw.io Editor"
                  ></iframe>
                </div>
              )}
            </div>
          </>
        )}
        
      </Tabs>
      {modalImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center" onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="Full View" className="max-w-3xl max-h-3xl rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}
const Activities = ({ activity, id ,refetch}) => {
  const [selected, setSelected] = useState("Started");
  const [text, setText] = useState(""); 
  const [postActivity,{isLoading}]=usePostTaskActivityMutation()
  const handleSubmit = async () => {
    try {
      const activityData={
        type: selected.toLowerCase(),
        activity:text,
      }
      const result=await postActivity({data:activityData,id:id}).unwrap()
      setText("")
      toast.success(result?.message)
      refetch()
    } catch (err) {
      toast.error(err.data.message || err.error);
    }
  }
  const Card = ({ item, isConnected }) => {
    return (
      <div className="flex space-x-4">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-10 h-10 flex items-center justify-center">
            {TASKTYPEICON[item?.type]}
          </div>
          <div className="w-full flex items-center">
            {isConnected && <div className="w-0.5 bg-gray-300 h-full" />}
          </div>
        </div>
        <div className="flex flex-col gap-y-1 mb-8">
          <p className="font-semibold text-white">{item?.by?.name || "Unknown User"}</p>
          <div className="text-white flex items-center gap-5">
            <span className="capitalize">{item?.type}</span>
            <span className="text-sm">
              {item?.date ? moment(item.date).fromNow() : "No date"}
            </span>
          </div>
          <div className="text-white">{item?.activity}</div>
        </div>
      </div>
    );
  };
  return (
    <div
      className="w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-[#272333] shadow
  rounded-md justify-between overflow-y-auto"
    >
      <div className="w-full md:w-1/2">
        <h4 className="text-white font-semibold text-lg mb-5">Activities</h4>
        <div className="w-full ">
          {activity?.map((el, index) => (
           <Card key={index} item={el} isConnected={index < activity.length - 1} />
          ))}
        </div>
      </div>
      <div className='w-full md:w-1/3'>
        <h4 className='text-white font-semibold text-lg mb-5'>
          Add Activity
        </h4>
        <div className='w-full flex flex-wrap gap-5'>
          {act_types.map((item, index) => (
            <div key={item} className='flex gap-2 items-center'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={selected === item ? true : false}
                onChange={(e) => setSelected(item)}
              />
              <p className="text-white">{item}</p>
            </div>
          ))}
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type ......'
            className='bg-[#272333] w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
          ></textarea>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              type='button'
              label='Submit'
              onClick={handleSubmit}
              className='bg-blue-600 text-white rounded'
            />
          )}
        </div>
      </div>
    </div>
  );
};

