import express from 'express'
import {isAdminRoute,protectRoute} from "../middlewares/authMiddleware.js"
import passport from 'passport'
import { createJWT } from '../utils/index.js';
import { registerUser,
     loginUser,
     logoutUser,
     getTeamList,
     getNotificationsList,
     updateUserProfile,
     markNotificationRead,
     changeUserpassword,
     activateUserProfile,
     deleteUserProfile,
     faceLogin,
     updateFaceData,addTeamMember} from '../controllers/userController.js'

const router =express.Router()
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.post('/add-member', protectRoute, isAdminRoute, addTeamMember);
router.get("/get-team",protectRoute,isAdminRoute,getTeamList)
router.get("/notification",protectRoute,getNotificationsList)

router.put("/profile",protectRoute,updateUserProfile)
router.put("/read-noti",protectRoute,markNotificationRead)
router.put("/change-password",protectRoute,changeUserpassword)
router.get(
     "/auth/google",
     passport.authenticate("google", { scope: ["profile", "email"] })
   );
   
router.get(
     "/auth/google/callback",
     passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }),
     (req, res) => {
       
       createJWT(res, req.user._id);
       res.redirect("http://localhost:3000/dashboard"); // Redirect to frontend/dashboard
     }
   );


router.post('/face-login', faceLogin);  
router.put('/face-data', protectRoute, updateFaceData); 
router
     .route("/:id")
     .put(protectRoute,isAdminRoute,activateUserProfile)
     .delete(protectRoute,isAdminRoute,deleteUserProfile)
export default router;
