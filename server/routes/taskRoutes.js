import express from 'express'
const  router=express.Router()
import {protectRoute,isAdminRoute} from "../middlewares/authMiddleware.js"
import { createTask ,duplicateTask,postTaskActivity,dashboardStatistics,getTasks,getTask,trashTask,createSubTask,updateTask, deleteRestoreTask, updateTaskAssets } from '../controllers/taskcontroller.js'

router.post("/create",protectRoute,isAdminRoute,createTask)
 router.post("/duplicate/:id",protectRoute,isAdminRoute,duplicateTask)
router.post("/activity/:id",protectRoute,postTaskActivity)

router.get("/dashboard",protectRoute,dashboardStatistics)
router.get("/",protectRoute,getTasks)
router.get("/:id",protectRoute,getTask)

router.put("/:id",protectRoute,isAdminRoute,trashTask) 
router.put("/create-subtask/:id",protectRoute,isAdminRoute,createSubTask)
router.put("/update/:id",protectRoute,isAdminRoute,updateTask)
router.put("/updateAssets/:id",protectRoute,isAdminRoute,updateTaskAssets)
router.delete("/delete-restore/:id",
    protectRoute,isAdminRoute,deleteRestoreTask
)

export default router
    