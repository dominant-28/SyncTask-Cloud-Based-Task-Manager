import jwt from "jsonwebtoken"
import User from "../modals/user.js"
export const protectRoute= async(req,res,next)=>{
    try{
        let token =req.cookies.token
        if(token){
            const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
            const resp= await User.findById(decodedToken.userId).select("isAdmin email")
            req.user={
                email:resp.email,
                isAdmin:resp.isAdmin,
                userId: decodedToken.userId
            }
            next()
        }
        else{
            return res.status(401).json({status:false,message:"Not authorized .Try login again"})
        }
    }catch(error){
        console.error(error)
        return res.status(401).json({status: false,message:"Not authorized .Try login again."})
    }
}

export const isAdminRoute=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        return res.status(401).json({
            status:false,
            message:"Not authorised as admin .Try login as admin"
        })
    }
}


